import { NextResponse } from "next/server";
import { supabaseConfigured } from "@/lib/server/supabase";
import { cronAuthorized } from "@/lib/server/newsletterAuth";
import { getBlogSettings, publishNextDrafts } from "@/lib/blog";

/**
 * Daily drip (vercel.json cron, 06:00 UTC): publishes the next N drafts so
 * the site gains fresh pages steadily instead of in one suspicious dump.
 * Controlled from /admin/blog (toggle + posts per day).
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
  const published = await publishNextDrafts(settings.drip_per_day);
  return NextResponse.json({
    ok: true,
    published: published.map((p) => p.slug),
  });
}
