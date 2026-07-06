import { NextResponse } from "next/server";
import { normalizeEmail } from "@/lib/server/email";

/**
 * Phase 1 waitlist stub: validates and logs to the function log (visible in
 * Vercel). Swap the log line for Resend/KV/Airtable when Phase 2 lands.
 */
export async function POST(request: Request) {
  let raw: unknown;
  try {
    ({ email: raw } = await request.json());
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid body" }, { status: 400 });
  }

  const email = normalizeEmail(raw);
  if (!email) {
    return NextResponse.json(
      { ok: false, error: "Enter a valid email address" },
      { status: 400 },
    );
  }

  console.log(`[waitlist] ${email} ${new Date().toISOString()}`);
  return NextResponse.json({ ok: true });
}
