import { dbConfigured, q, setClause } from "@/lib/server/db";
import type { BlogPost } from "@/lib/types";

/**
 * Data access for blog_posts / blog_settings in Neon Postgres. Posts live in
 * the database (not data files) so publishing is an admin click, not a deploy.
 * Every reader degrades to empty results when DATABASE_URL is absent, so
 * local dev and CI builds work without credentials.
 */

const COLUMNS =
  "id,slug,title,description,category,tags,content,status,published_at,created_at";
const LIST_COLUMNS =
  "id,slug,title,description,category,tags,status,published_at,created_at";
export const PAGE_SIZE = 24;

export type BlogPostSummary = Omit<BlogPost, "content">;

const SLUG_RE = /^[a-z0-9-]{3,120}$/;

export function isBlogSlug(slug: unknown): slug is string {
  return typeof slug === "string" && SLUG_RE.test(slug);
}

export async function listPublished(
  page = 1,
  category?: string,
): Promise<{ posts: BlogPostSummary[]; total: number }> {
  if (!dbConfigured()) return { posts: [], total: 0 };
  const from = (page - 1) * PAGE_SIZE;
  const cat = category ?? null;
  const [posts, count] = await Promise.all([
    q<BlogPostSummary>(
      `select ${LIST_COLUMNS} from blog_posts
       where status = 'published' and ($1::text is null or category = $1)
       order by published_at desc limit $2 offset $3`,
      [cat, PAGE_SIZE, from],
    ),
    q<{ n: number }>(
      `select count(*)::int as n from blog_posts
       where status = 'published' and ($1::text is null or category = $1)`,
      [cat],
    ),
  ]);
  if (!posts) {
    console.error("[blog] list failed");
    return { posts: [], total: 0 };
  }
  return { posts, total: count?.[0]?.n ?? posts.length };
}

export async function latestPublished(n: number): Promise<BlogPostSummary[]> {
  if (!dbConfigured()) return [];
  return (
    (await q<BlogPostSummary>(
      `select ${LIST_COLUMNS} from blog_posts where status = 'published'
       order by published_at desc limit $1`,
      [n],
    )) ?? []
  );
}

export async function getPublished(slug: string): Promise<BlogPost | null> {
  if (!dbConfigured() || !isBlogSlug(slug)) return null;
  const rows = await q<BlogPost>(
    `select ${COLUMNS} from blog_posts where slug = $1 and status = 'published'`,
    [slug],
  );
  return rows?.[0] ?? null;
}

export async function relatedPublished(
  category: string,
  excludeSlug: string,
  n = 3,
): Promise<BlogPostSummary[]> {
  if (!dbConfigured()) return [];
  return (
    (await q<BlogPostSummary>(
      `select ${LIST_COLUMNS} from blog_posts
       where status = 'published' and category = $1 and slug <> $2
       order by published_at desc limit $3`,
      [category, isBlogSlug(excludeSlug) ? excludeSlug : "none", n],
    )) ?? []
  );
}

/** All published slugs + dates, for the sitemap. */
export async function publishedForSitemap(): Promise<
  { slug: string; published_at: string | null }[]
> {
  if (!dbConfigured()) return [];
  return (
    (await q<{ slug: string; published_at: string | null }>(
      `select slug, published_at from blog_posts
       where status = 'published' order by published_at desc`,
    )) ?? []
  );
}

// ---- admin ----------------------------------------------------------------

export async function listAdmin(
  status?: "draft" | "published",
  search?: string,
): Promise<BlogPostSummary[]> {
  const like = search ? `%${search.replace(/[\\%_]/g, "\\$&")}%` : null;
  return (
    (await q<BlogPostSummary>(
      `select ${LIST_COLUMNS} from blog_posts
       where ($1::text is null or status = $1) and ($2::text is null or title ilike $2)
       order by created_at asc limit 400`,
      [status ?? null, like],
    )) ?? []
  );
}

export async function getPostAdmin(id: string): Promise<BlogPost | null> {
  const rows = await q<BlogPost>(`select ${COLUMNS} from blog_posts where id = $1`, [id]);
  return rows?.[0] ?? null;
}

export async function setPostStatus(
  id: string,
  status: "draft" | "published",
): Promise<BlogPost | null> {
  const rows = await q<BlogPost>(
    `update blog_posts
     set status = $2::text,
         published_at = case when $2::text = 'published' then now() else null end
     where id = $1
     returning ${COLUMNS}`,
    [id, status],
  );
  return rows?.[0] ?? null;
}

export async function deletePost(id: string): Promise<boolean> {
  const rows = await q(`delete from blog_posts where id = $1 and status = 'draft'`, [id]);
  return rows !== null;
}

export async function blogCounts(): Promise<{ published: number; drafts: number }> {
  const rows = await q<{ status: string; n: number }>(
    `select status, count(*)::int as n from blog_posts group by status`,
  );
  const get = (s: string) => rows?.find((r) => r.status === s)?.n ?? 0;
  return { published: get("published"), drafts: get("draft") };
}

/**
 * Days since the most recent post was published. Returns Infinity when nothing
 * has been published yet (so the first drip fires immediately), or null if the
 * query fails. Drives the drip interval gate in the cron.
 */
export async function daysSinceLastPublish(): Promise<number | null> {
  const rows = await q<{ published_at: string | null }>(
    `select published_at from blog_posts where status = 'published'
     order by published_at desc limit 1`,
  );
  if (!rows) return null;
  const last = rows[0]?.published_at;
  if (!last) return Infinity;
  return (Date.now() - new Date(last).getTime()) / 86_400_000;
}

/** Publish the N oldest drafts (drip). Returns the published summaries. */
export async function publishNextDrafts(n: number): Promise<BlogPostSummary[]> {
  const rows = await q<BlogPostSummary>(
    `update blog_posts
     set status = 'published', published_at = now()
     where id in (select id from blog_posts where status = 'draft'
                  order by created_at asc limit $1)
     returning ${LIST_COLUMNS}`,
    [n],
  );
  return rows ?? [];
}

// ---- settings ---------------------------------------------------------------

export interface BlogSettings {
  drip_enabled: boolean;
  drip_per_day: number;
  /** Minimum days between drip runs. 1 = every day; 3 = every 3rd day. */
  drip_interval_days: number;
}

export async function getBlogSettings(): Promise<BlogSettings | null> {
  const rows = await q<Partial<BlogSettings>>(`select * from blog_settings where id = 1`);
  const row = rows?.[0];
  if (!row) return null;
  return {
    drip_enabled: row.drip_enabled ?? true,
    drip_per_day: row.drip_per_day ?? 3,
    drip_interval_days: row.drip_interval_days ?? 1,
  };
}

export async function saveBlogSettings(
  fields: Partial<BlogSettings>,
): Promise<boolean> {
  const set = setClause(fields, ["drip_enabled", "drip_per_day", "drip_interval_days"]);
  if (!set) return true;
  const rows = await q(
    `update blog_settings set ${set.sql}, updated_at = now() where id = 1`,
    set.params,
  );
  return rows !== null;
}
