import { timingSafeEqual } from "node:crypto";

/**
 * Shared admin auth for the newsletter routes: compare the x-newsletter-secret
 * header against NEWSLETTER_ADMIN_SECRET in constant time.
 */
export function newsletterAdminAuthorized(request: Request): boolean {
  const secret = process.env.NEWSLETTER_ADMIN_SECRET;
  const given = request.headers.get("x-newsletter-secret");
  if (!secret || !given) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(secret);
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Vercel cron invocations carry Authorization: Bearer <CRON_SECRET>. */
export function cronAuthorized(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  const given = request.headers.get("authorization");
  if (!secret || !given) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(`Bearer ${secret}`);
  return a.length === b.length && timingSafeEqual(a, b);
}
