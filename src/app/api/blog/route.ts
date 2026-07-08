import { NextResponse } from "next/server";
import { supabaseConfigured } from "@/lib/server/supabase";
import { newsletterAdminAuthorized } from "@/lib/server/newsletterAuth";
import {
  blogCounts,
  getBlogSettings,
  listAdmin,
  publishNextDrafts,
  saveBlogSettings,
} from "@/lib/blog";

function guard(request: Request): NextResponse | null {
  if (!newsletterAdminAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  if (!supabaseConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Blog not configured" },
      { status: 503 },
    );
  }
  return null;
}

/** Admin dashboard payload: posts + counts + drip settings. */
export async function GET(request: Request) {
  const denied = guard(request);
  if (denied) return denied;
  const url = new URL(request.url);
  const status = url.searchParams.get("status");
  const q = url.searchParams.get("q") ?? undefined;
  const [posts, counts, settings] = await Promise.all([
    listAdmin(
      status === "draft" || status === "published" ? status : undefined,
      q,
    ),
    blogCounts(),
    getBlogSettings(),
  ]);
  return NextResponse.json({ ok: true, posts, counts, settings });
}

/** Update drip settings. Body: { drip_enabled?, drip_per_day?, drip_interval_days? } */
export async function PUT(request: Request) {
  const denied = guard(request);
  if (denied) return denied;
  let body: {
    drip_enabled?: unknown;
    drip_per_day?: unknown;
    drip_interval_days?: unknown;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid body" }, { status: 400 });
  }
  const fields: {
    drip_enabled?: boolean;
    drip_per_day?: number;
    drip_interval_days?: number;
  } = {};
  if (typeof body.drip_enabled === "boolean") fields.drip_enabled = body.drip_enabled;
  if (typeof body.drip_per_day === "number") {
    fields.drip_per_day = Math.min(20, Math.max(1, Math.round(body.drip_per_day)));
  }
  if (typeof body.drip_interval_days === "number") {
    fields.drip_interval_days = Math.min(30, Math.max(1, Math.round(body.drip_interval_days)));
  }
  if (Object.keys(fields).length === 0) {
    return NextResponse.json({ ok: false, error: "Nothing to update" }, { status: 400 });
  }
  if (!(await saveBlogSettings(fields))) {
    return NextResponse.json(
      { ok: false, error: "Could not save settings" },
      { status: 502 },
    );
  }
  return NextResponse.json({ ok: true, settings: await getBlogSettings() });
}

/** Publish the next N drafts immediately. Body: { n? } (default 3, max 10). */
export async function POST(request: Request) {
  const denied = guard(request);
  if (denied) return denied;
  let n = 3;
  try {
    const body = (await request.json()) as { n?: unknown };
    if (typeof body.n === "number") n = Math.min(10, Math.max(1, Math.round(body.n)));
  } catch {
    // default n
  }
  const published = await publishNextDrafts(n);
  return NextResponse.json({
    ok: true,
    published: published.map((p) => ({ slug: p.slug, title: p.title })),
  });
}
