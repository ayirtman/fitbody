import { NextResponse } from "next/server";
import { supabaseConfigured } from "@/lib/server/supabase";
import { newsletterAdminAuthorized } from "@/lib/server/newsletterAuth";
import { getSponsor, saveSponsor } from "@/lib/newsletter/sponsor";

function guard(request: Request): NextResponse | null {
  if (!newsletterAdminAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  if (!supabaseConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Newsletter not configured" },
      { status: 503 },
    );
  }
  return null;
}

export async function GET(request: Request) {
  const denied = guard(request);
  if (denied) return denied;
  const sponsor = await getSponsor();
  if (!sponsor) {
    return NextResponse.json(
      { ok: false, error: "Could not load sponsor" },
      { status: 502 },
    );
  }
  return NextResponse.json({ ok: true, sponsor });
}

export async function PUT(request: Request) {
  const denied = guard(request);
  if (denied) return denied;
  let body: { name?: unknown; url?: unknown; blurb?: unknown; active?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid body" }, { status: 400 });
  }
  const fields: Record<string, string | boolean> = {};
  if (typeof body.name === "string") fields.name = body.name.trim().slice(0, 120);
  if (typeof body.url === "string") {
    const url = body.url.trim();
    if (url && !/^https?:\/\//.test(url)) {
      return NextResponse.json(
        { ok: false, error: "Sponsor URL must start with http(s)://" },
        { status: 400 },
      );
    }
    fields.url = url;
  }
  if (typeof body.blurb === "string") fields.blurb = body.blurb.trim().slice(0, 300);
  if (typeof body.active === "boolean") fields.active = body.active;
  if (Object.keys(fields).length === 0) {
    return NextResponse.json({ ok: false, error: "Nothing to update" }, { status: 400 });
  }
  if (!(await saveSponsor(fields))) {
    return NextResponse.json(
      { ok: false, error: "Could not save sponsor" },
      { status: 502 },
    );
  }
  const sponsor = await getSponsor();
  return NextResponse.json({ ok: true, sponsor });
}
