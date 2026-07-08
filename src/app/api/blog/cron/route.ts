import { NextResponse } from "next/server";
import { supabaseConfigured } from "@/lib/server/supabase";
import { cronAuthorized } from "@/lib/server/newsletterAuth";
import {
  daysSinceLastPublish,
  getBlogSettings,
  publishNextDrafts,
} from "@/lib/blog";

/**
 * Drip cron (vercel.json, 06:00 UTC daily): publishes the next N drafts so the
 * site gains fresh pages steadily instead of in one suspicious dump. The cron
 * fires every morning, but only publishes when at least drip_interval_days have
 * passed since the last post went live (1 = daily, 3 = every third day).
 * Controlled from /admin/blog.
 */
export async function GET(request: Request) {
  if (!cronAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  if (!supabaseConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Blog not configured" },
      { status: 503 },
    );
  }
  const settings = await getBlogSettings();
  if (!settings?.drip_enabled) {
    return NextResponse.json({ ok: true, skipped: "drip disabled" });
  }
  // Interval gate: with a daily cron, publish only once the interval has
  // elapsed. The 0.5-day tolerance absorbs cron jitter so an every-3-days
  // cadence lands on day 3, not day 4.
  const interval = Math.max(1, settings.drip_interval_days);
  const since = await daysSinceLastPublish();
  if (since !== null && since < interval - 0.5) {
    return NextResponse.json({
      ok: true,
      skipped: "interval not elapsed",
      daysSinceLastPublish: Math.round(since * 10) / 10,
      intervalDays: interval,
    });
  }
  const published = await publishNextDrafts(settings.drip_per_day);
  return NextResponse.json({
    ok: true,
    published: published.map((p) => p.slug),
  });
}
