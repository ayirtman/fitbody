import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Phase 1 waitlist stub: validates and logs to the function log (visible in
 * Vercel). Swap the log line for Resend/KV/Airtable when Phase 2 lands.
 */
export async function POST(request: Request) {
  let email: unknown;
  try {
    ({ email } = await request.json());
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid body" }, { status: 400 });
  }

  if (typeof email !== "string" || !EMAIL_RE.test(email.trim()) || email.length > 254) {
    return NextResponse.json(
      { ok: false, error: "Enter a valid email address" },
      { status: 400 },
    );
  }

  console.log(`[waitlist] ${email.trim().toLowerCase()} ${new Date().toISOString()}`);
  return NextResponse.json({ ok: true });
}
