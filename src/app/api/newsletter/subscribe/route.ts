import { NextResponse } from "next/server";
import { normalizeEmail } from "@/lib/server/email";
import { sbFetch, supabaseConfigured } from "@/lib/server/supabase";

/**
 * Newsletter signup. Duplicate emails return ok so the endpoint can't be used
 * to probe who is subscribed. The hidden `website` field is a honeypot - bots
 * that fill it get a cheerful no-op.
 */

// Best-effort per-IP throttle. Module state survives only per warm lambda,
// which is fine: this guards against dumb loops, not determined abuse.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function throttled(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 1000) hits.clear(); // crude memory cap
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  let body: { email?: unknown; website?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid body" }, { status: 400 });
  }

  // honeypot: real users never see this field
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const email = normalizeEmail(body.email);
  if (!email) {
    return NextResponse.json(
      { ok: false, error: "Enter a valid email address" },
      { status: 400 },
    );
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (throttled(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many attempts - try again in a few minutes" },
      { status: 429 },
    );
  }

  if (!supabaseConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Newsletter isn't configured yet - try again later" },
      { status: 503 },
    );
  }

  const res = await sbFetch(
    "newsletter_subscribers?on_conflict=email",
    {
      method: "POST",
      body: JSON.stringify({ email }),
      prefer: "resolution=ignore-duplicates",
    },
  );
  if (!res.ok) {
    console.error(`[newsletter] subscribe failed: ${res.status} ${await res.text()}`);
    return NextResponse.json(
      { ok: false, error: "Something went wrong - try again" },
      { status: 502 },
    );
  }
  return NextResponse.json({ ok: true });
}
