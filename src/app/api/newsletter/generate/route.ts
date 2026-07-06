import { NextResponse } from "next/server";
import { supabaseConfigured } from "@/lib/server/supabase";
import { newsletterAdminAuthorized } from "@/lib/server/newsletterAuth";
import { claudeConfigured, generateIssue } from "@/lib/newsletter/generate";
import { insertIssue } from "@/lib/newsletter/issues";
import { getActiveSponsor, injectSponsor } from "@/lib/newsletter/sponsor";

// Claude can take a minute to write a full issue.
export const maxDuration = 300;

/** Have Claude write a draft issue. Body: { topic?: string }. */
export async function POST(request: Request) {
  if (!newsletterAdminAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  if (!supabaseConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Newsletter not configured" },
      { status: 503 },
    );
  }
  if (!claudeConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Claude is not configured - set ANTHROPIC_API_KEY" },
      { status: 503 },
    );
  }

  let topic: string | undefined;
  try {
    const body = (await request.json()) as { topic?: unknown };
    if (typeof body.topic === "string" && body.topic.trim()) {
      topic = body.topic.trim().slice(0, 500);
    }
  } catch {
    // empty body is fine
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://templefit.vercel.app";
  try {
    const generated = await generateIssue(siteUrl, topic);
    const sponsor = await getActiveSponsor();
    const html = sponsor
      ? injectSponsor(generated.html, sponsor)
      : generated.html;
    const issue = await insertIssue({
      subject: generated.subject,
      html,
      source: "claude",
    });
    if (!issue) {
      return NextResponse.json(
        { ok: false, error: "Generated, but could not save the draft" },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true, issue });
  } catch (err) {
    console.error("[newsletter] generation failed:", err);
    return NextResponse.json(
      { ok: false, error: "Claude could not write the issue - try again" },
      { status: 502 },
    );
  }
}
