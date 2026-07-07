import { sbFetch, supabaseConfigured } from "@/lib/server/supabase";
import type { BlogPost } from "@/lib/types";

/**
 * Data access for blog_posts / blog_settings in Supabase. Posts live in the
 * database (not data files) so publishing is an admin click, not a deploy.
 * Every reader degrades to empty results when Supabase env is absent, so
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
  if (!supabaseConfigured()) return { posts: [], total: 0 };
  const from = (page - 1) * PAGE_SIZE;
  const filter = category ? `&category=eq.${encodeURIComponent(category)}` : "";
  const res = await sbFetch(
    `blog_posts?status=eq.published${filter}&select=${LIST_COLUMNS}&order=published_at.desc`,
    {
      headers: { Range: `${from}-${from + PAGE_SIZE - 1}`, Prefer: "count=exact" },
    },
  );
  if (!res.ok && res.status !== 206) {
    console.error(`[blog] list failed: ${res.status}`);
    return { posts: [], total: 0 };
  }
  const total = Number(res.headers.get("content-range")?.split("/")[1] ?? 0);
  const posts = (await res.json()) as BlogPostSummary[];
  return { posts, total: Number.isFinite(total) ? total : posts.length };
}

export async function latestPublished(n: number): Promise<BlogPostSummary[]> {
  if (!supabaseConfigured()) return [];
  const res = await sbFetch(
    `blog_posts?status=eq.published&select=${LIST_COLUMNS}&order=published_at.desc&limit=${n}`,
  );
  if (!res.ok) return [];
  return (await res.json()) as BlogPostSummary[];
}

export async function getPublished(slug: string): Promise<BlogPost | null> {
  if (!supabaseConfigured() || !isBlogSlug(slug)) return null;
  const res = await sbFetch(
    `blog_posts?slug=eq.${slug}&status=eq.published&select=${COLUMNS}`,
  );
  if (!res.ok) return null;
  const rows = (await res.json()) as BlogPost[];
  return rows[0] ?? null;
}

export async function relatedPublished(
  category: string,
  excludeSlug: string,
  n = 3,
): Promise<BlogPostSummary[]> {
  if (!supabaseConfigured()) return [];
  const res = await sbFetch(
    `blog_posts?status=eq.published&category=eq.${encodeURIComponent(category)}&slug=neq.${excodeSafe(excludeSlug)}&select=${LIST_COLUMNS}&order=published_at.desc&limit=${n}`,
  );
  if (!res.ok) return [];
  return (await res.json()) as BlogPostSummary[];
}

function excodeSafe(slug: string): string {
  return isBlogSlug(slug) ? slug : "none";
}

/** All published slugs + dates, for the sitemap. */
export async function publishedForSitemap(): Promise<
  { slug: string; published_at: string | null }[]
> {
  if (!supabaseConfigured()) return [];
  const all: { slug: string; published_at: string | null }[] = [];
  for (let from = 0; ; from += 1000) {
    const res = await sbFetch(
      `blog_posts?status=eq.published&select=slug,published_at&order=published_at.desc`,
      { headers: { Range: `${from}-${from + 999}` } },
    );
    if (!res.ok && res.status !== 206) return all;
    const page = (await res.json()) as { slug: string; published_at: string | null }[];
    all.push(...page);
    if (page.length < 1000) return all;
  }
}

// ---- admin ----------------------------------------------------------------

export async function listAdmin(
  status?: "draft" | "published",
  search?: string,
): Promise<BlogPostSummary[]> {
  const filters = [
    status ? `status=eq.${status}` : "",
    search ? `title=ilike.*${encodeURIComponent(search.replaceAll("*", ""))}*` : "",
  ]
    .filter(Boolean)
    .join("&");
  const res = await sbFetch(
    `blog_posts?select=${LIST_COLUMNS}${filters ? `&${filters}` : ""}&order=created_at.asc&limit=400`,
  );
  if (!res.ok) return [];
  return (await res.json()) as BlogPostSummary[];
}

export async function getPostAdmin(id: string): Promise<BlogPost | null> {
  const res = await sbFetch(`blog_posts?id=eq.${id}&select=${COLUMNS}`);
  if (!res.ok) return null;
  const rows = (await res.json()) as BlogPost[];
  return rows[0] ?? null;
}

export async function setPostStatus(
  id: string,
  status: "draft" | "published",
): Promise<BlogPost | null> {
  const res = await sbFetch(`blog_posts?id=eq.${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      status,
      published_at: status === "published" ? new Date().toISOString() : null,
    }),
    prefer: "return=representation",
  });
  if (!res.ok) return null;
  const rows = (await res.json()) as BlogPost[];
  return rows[0] ?? null;
}

export async function deletePost(id: string): Promise<boolean> {
  const res = await sbFetch(`blog_posts?id=eq.${id}&status=eq.draft`, {
    method: "DELETE",
  });
  return res.ok;
}

export async function blogCounts(): Promise<{ published: number; drafts: number }> {
  const count = async (status: string) => {
    const res = await sbFetch(`blog_posts?status=eq.${status}&select=id`, {
      method: "HEAD",
      prefer: "count=exact",
    });
    const n = Number(res.headers.get("content-range")?.split("/")[1] ?? 0);
    return Number.isFinite(n) ? n : 0;
  };
  const [published, drafts] = await Promise.all([count("published"), count("draft")]);
  return { published, drafts };
}

/** Publish the N oldest drafts (drip). Returns the published summaries. */
export async function publishNextDrafts(n: number): Promise<BlogPostSummary[]> {
  const res = await sbFetch(
    `blog_posts?status=eq.draft&select=id&order=created_at.asc&limit=${n}`,
  );
  if (!res.ok) return [];
  const ids = ((await res.json()) as { id: string }[]).map((r) => r.id);
  const out: BlogPostSummary[] = [];
  for (const id of ids) {
    const post = await setPostStatus(id, "published");
    if (post) out.push(post);
  }
  return out;
}

// ---- settings ---------------------------------------------------------------

export interface BlogSettings {
  drip_enabled: boolean;
  drip_per_day: number;
}

export async function getBlogSettings(): Promise<BlogSettings | null> {
  const res = await sbFetch(
    "blog_settings?id=eq.1&select=drip_enabled,drip_per_day",
  );
  if (!res.ok) return null;
  const rows = (await res.json()) as BlogSettings[];
  return rows[0] ?? null;
}

export async function saveBlogSettings(
  fields: Partial<BlogSettings>,
): Promise<boolean> {
  const res = await sbFetch("blog_settings?id=eq.1", {
    method: "PATCH",
    body: JSON.stringify({ ...fields, updated_at: new Date().toISOString() }),
  });
  return res.ok;
}
