import { sbFetch } from "@/lib/server/supabase";

/**
 * Data access for the newsletter_issues table (drafts written by Claude or
 * the weekly-digest template, plus the sent archive). Same raw-PostgREST
 * approach as the subscribers table.
 */

export interface NewsletterIssue {
  id: string;
  subject: string;
  html: string;
  status: "draft" | "sent";
  source: "claude" | "template" | "manual";
  created_at: string;
  sent_at: string | null;
  sent_count: number;
}

const COLUMNS = "id,subject,html,status,source,created_at,sent_at,sent_count";
const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isIssueId(id: unknown): id is string {
  return typeof id === "string" && UUID_RE.test(id);
}

export async function listIssues(): Promise<NewsletterIssue[] | null> {
  const res = await sbFetch(
    `newsletter_issues?select=${COLUMNS}&order=created_at.desc&limit=50`,
  );
  if (!res.ok) {
    console.error(`[newsletter] issue list failed: ${res.status}`);
    return null;
  }
  return (await res.json()) as NewsletterIssue[];
}

export async function getIssue(id: string): Promise<NewsletterIssue | null> {
  if (!isIssueId(id)) return null;
  const res = await sbFetch(`newsletter_issues?id=eq.${id}&select=${COLUMNS}`);
  if (!res.ok) {
    console.error(`[newsletter] issue fetch failed: ${res.status}`);
    return null;
  }
  const rows = (await res.json()) as NewsletterIssue[];
  return rows[0] ?? null;
}

export async function insertIssue(fields: {
  subject: string;
  html: string;
  source: NewsletterIssue["source"];
}): Promise<NewsletterIssue | null> {
  const res = await sbFetch("newsletter_issues", {
    method: "POST",
    body: JSON.stringify(fields),
    prefer: "return=representation",
  });
  if (!res.ok) {
    console.error(
      `[newsletter] issue insert failed: ${res.status} ${await res.text()}`,
    );
    return null;
  }
  const rows = (await res.json()) as NewsletterIssue[];
  return rows[0] ?? null;
}

export async function updateIssue(
  id: string,
  fields: Partial<
    Pick<NewsletterIssue, "subject" | "html" | "status" | "sent_at" | "sent_count">
  >,
): Promise<NewsletterIssue | null> {
  if (!isIssueId(id)) return null;
  const res = await sbFetch(`newsletter_issues?id=eq.${id}`, {
    method: "PATCH",
    body: JSON.stringify(fields),
    prefer: "return=representation",
  });
  if (!res.ok) {
    console.error(`[newsletter] issue update failed: ${res.status}`);
    return null;
  }
  const rows = (await res.json()) as NewsletterIssue[];
  return rows[0] ?? null;
}

export async function deleteIssue(id: string): Promise<boolean> {
  if (!isIssueId(id)) return false;
  const res = await sbFetch(`newsletter_issues?id=eq.${id}&status=eq.draft`, {
    method: "DELETE",
  });
  return res.ok;
}

/** Active subscriber count via a PostgREST HEAD request. */
export async function countActiveSubscribers(): Promise<number | null> {
  const res = await sbFetch(
    "newsletter_subscribers?status=eq.active&select=id",
    { method: "HEAD", prefer: "count=exact" },
  );
  if (!res.ok) return null;
  const range = res.headers.get("content-range"); // e.g. "0-2/3" or "*/0"
  const total = range?.split("/")[1];
  const n = total ? Number(total) : NaN;
  return Number.isFinite(n) ? n : null;
}

/** True if an issue was already created in the current ISO week (UTC). */
export async function issueExistsThisWeek(now = new Date()): Promise<boolean> {
  // Monday 00:00 UTC of the current ISO week
  const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const day = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() - (day - 1));
  const res = await sbFetch(
    `newsletter_issues?created_at=gte.${d.toISOString()}&select=id&limit=1`,
  );
  if (!res.ok) return false;
  const rows = (await res.json()) as { id: string }[];
  return rows.length > 0;
}
