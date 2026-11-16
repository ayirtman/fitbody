import { q, setClause } from "@/lib/server/db";

/**
 * Data access for the newsletter_issues table (drafts written by Claude or
 * the weekly-digest template, plus the sent archive). Plain parameterised
 * SQL over Neon.
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
  const rows = await q<NewsletterIssue>(
    `select ${COLUMNS} from newsletter_issues order by created_at desc limit 50`,
  );
  if (!rows) console.error("[newsletter] issue list failed");
  return rows;
}

export async function getIssue(id: string): Promise<NewsletterIssue | null> {
  if (!isIssueId(id)) return null;
  const rows = await q<NewsletterIssue>(
    `select ${COLUMNS} from newsletter_issues where id = $1`,
    [id],
  );
  if (!rows) console.error("[newsletter] issue fetch failed");
  return rows?.[0] ?? null;
}

export async function insertIssue(fields: {
  subject: string;
  html: string;
  source: NewsletterIssue["source"];
}): Promise<NewsletterIssue | null> {
  const rows = await q<NewsletterIssue>(
    `insert into newsletter_issues (subject, html, source) values ($1, $2, $3)
     returning ${COLUMNS}`,
    [fields.subject, fields.html, fields.source],
  );
  if (!rows) console.error("[newsletter] issue insert failed");
  return rows?.[0] ?? null;
}

export async function updateIssue(
  id: string,
  fields: Partial<
    Pick<NewsletterIssue, "subject" | "html" | "status" | "sent_at" | "sent_count">
  >,
): Promise<NewsletterIssue | null> {
  if (!isIssueId(id)) return null;
  const set = setClause(fields, ["subject", "html", "status", "sent_at", "sent_count"], 2);
  if (!set) return getIssue(id);
  const rows = await q<NewsletterIssue>(
    `update newsletter_issues set ${set.sql} where id = $1 returning ${COLUMNS}`,
    [id, ...set.params],
  );
  if (!rows) console.error("[newsletter] issue update failed");
  return rows?.[0] ?? null;
}

export async function deleteIssue(id: string): Promise<boolean> {
  if (!isIssueId(id)) return false;
  const rows = await q(`delete from newsletter_issues where id = $1 and status = 'draft'`, [id]);
  return rows !== null;
}

/** Active subscriber count. */
export async function countActiveSubscribers(): Promise<number | null> {
  const rows = await q<{ n: number }>(
    `select count(*)::int as n from newsletter_subscribers where status = 'active'`,
  );
  return rows?.[0]?.n ?? null;
}

/** True if an issue was already created in the current ISO week (UTC). */
export async function issueExistsThisWeek(now = new Date()): Promise<boolean> {
  // Monday 00:00 UTC of the current ISO week
  const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const day = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() - (day - 1));
  const rows = await q(
    `select id from newsletter_issues where created_at >= $1::timestamptz limit 1`,
    [d.toISOString()],
  );
  return (rows?.length ?? 0) > 0;
}
