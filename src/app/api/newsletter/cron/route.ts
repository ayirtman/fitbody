import { NextResponse } from "next/server";
import { supabaseConfigured } from "@/lib/server/supabase";
import { cronAuthorized } from "@/lib/server/newsletterAuth";
import { weeklyDigest } from "@/lib/newsletter/digest";
import { claudeConfigured, generateIssue } from "@/lib/newsletter/generate";
import { insertIssue, issueExistsThisWeek } from "@/lib/newsletter/issues";
import { getActiveSponsor, injectSponsor } from "@/lib/newsletter/sponsor";

export const maxDuration = 300;

/**
 * Weekly scheduler (vercel.json cron, Mondays 08:00 UTC). Drafts an issue for
 * review in /admin/newsletter - it never sends. Claude writes it when
 * ANTHROPIC_API_KEY is set; otherwise (or if generation fails) the digest
 * template is drafted instead so the week is never empty.
 */
export async function GET(request: Request) {
  if (!cronAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  if (!supabaseConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Newsletter not configured" },
      { status: 503 },
    );
  }
  if (await issueExistsThisWeek()) {
    return NextResponse.json({ ok: true, skipped: "issue already exists this week" });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://templefit.vercel.app";
  let subject: string;
  let html: string;
  let source: "claude" | "template" = "template";
  if (claudeConfigured()) {
    try {
      ({ subject, html } = await generateIssue(siteUrl));
      source = "claude";
    } catch (err) {
      console.error("[newsletter] cron generation failed, using template:", err);
      ({ subject, html } = weeklyDigest(siteUrl));
    }
  } else {
    ({ subject, html } = weeklyDigest(siteUrl));
  }

  const sponsor = await getActiveSponsor();
  if (sponsor) html = injectSponsor(html, sponsor);

  const issue = await insertIssue({ subject, html, source });
  if (!issue) {
    return NextResponse.json(
      { ok: false, error: "Could not save the draft" },
      { status: 502 },
    );
  }
  return NextResponse.json({
    ok: true,
    drafted: { id: issue.id, subject: issue.subject, source },
  });
}
