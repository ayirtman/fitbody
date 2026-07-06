import { NextResponse } from "next/server";
import { supabaseConfigured } from "@/lib/server/supabase";
import { newsletterAdminAuthorized } from "@/lib/server/newsletterAuth";
import { countActiveSubscribers, listIssues } from "@/lib/newsletter/issues";
import { claudeConfigured } from "@/lib/newsletter/generate";

/** Admin studio dashboard payload: all issues plus the subscriber count. */
export async function GET(request: Request) {
  if (!newsletterAdminAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  if (!supabaseConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Newsletter not configured" },
      { status: 503 },
    );
  }
  const [issues, subscribers] = await Promise.all([
    listIssues(),
    countActiveSubscribers(),
  ]);
  if (issues === null) {
    return NextResponse.json(
      { ok: false, error: "Could not load issues" },
      { status: 502 },
    );
  }
  return NextResponse.json({
    ok: true,
    issues,
    subscribers,
    claude: claudeConfigured(),
  });
}
