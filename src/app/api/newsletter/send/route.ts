import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { sbFetch, supabaseConfigured } from "@/lib/server/supabase";
import { weeklyDigest } from "@/lib/newsletter/digest";

/**
 * Admin-only newsletter dispatch. Authenticate with the x-newsletter-secret
 * header; send either raw { subject, html } (use the {{{unsubscribe}}}
 * placeholder, or a footer link is appended) or { template: "weekly-digest" }.
 * Sends via Resend's batch API, 100 recipients per call, one email per
 * subscriber so unsubscribe links stay personal.
 */

const PAGE_SIZE = 1000;
const BATCH_SIZE = 100;

function authorized(request: Request): boolean {
  const secret = process.env.NEWSLETTER_ADMIN_SECRET;
  const given = request.headers.get("x-newsletter-secret");
  if (!secret || !given) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(secret);
  return a.length === b.length && timingSafeEqual(a, b);
}

interface Subscriber {
  email: string;
  unsubscribe_token: string;
}

async function fetchActiveSubscribers(): Promise<Subscriber[] | null> {
  const all: Subscriber[] = [];
  for (let from = 0; ; from += PAGE_SIZE) {
    const res = await sbFetch(
      "newsletter_subscribers?status=eq.active&select=email,unsubscribe_token&order=created_at.asc",
      { headers: { Range: `${from}-${from + PAGE_SIZE - 1}` } },
    );
    if (!res.ok) {
      console.error(`[newsletter] subscriber fetch failed: ${res.status}`);
      return null;
    }
    const page = (await res.json()) as Subscriber[];
    all.push(...page);
    if (page.length < PAGE_SIZE) return all;
  }
}

export async function POST(request: Request) {
  if (!authorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  if (!supabaseConfigured() || !process.env.RESEND_API_KEY || !process.env.NEWSLETTER_FROM) {
    return NextResponse.json(
      { ok: false, error: "Newsletter not configured" },
      { status: 503 },
    );
  }

  let body: { subject?: unknown; html?: unknown; template?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid body" }, { status: 400 });
  }

  let subject: string;
  let html: string;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://templefit.vercel.app";
  if (body.template === "weekly-digest") {
    ({ subject, html } = weeklyDigest(siteUrl));
  } else if (typeof body.subject === "string" && typeof body.html === "string") {
    subject = body.subject;
    html = body.html;
  } else {
    return NextResponse.json(
      { ok: false, error: 'Provide { subject, html } or { template: "weekly-digest" }' },
      { status: 400 },
    );
  }
  if (!html.includes("{{{unsubscribe}}}")) {
    html += `<p style="font-size:12px;color:#9b937f;">{{{unsubscribe}}}</p>`;
  }

  const subscribers = await fetchActiveSubscribers();
  if (subscribers === null) {
    return NextResponse.json(
      { ok: false, error: "Could not load subscribers" },
      { status: 502 },
    );
  }
  if (subscribers.length === 0) {
    return NextResponse.json({ ok: true, sent: 0, failed: 0 });
  }

  let sent = 0;
  let failed = 0;
  for (let i = 0; i < subscribers.length; i += BATCH_SIZE) {
    const chunk = subscribers.slice(i, i + BATCH_SIZE);
    const emails = chunk.map((s) => {
      const unsubUrl = `${siteUrl}/api/newsletter/unsubscribe?token=${s.unsubscribe_token}`;
      return {
        from: process.env.NEWSLETTER_FROM,
        to: [s.email],
        subject,
        html: html.replaceAll(
          "{{{unsubscribe}}}",
          `<a href="${unsubUrl}" style="color:#9b937f;">Unsubscribe</a>`,
        ),
        headers: {
          "List-Unsubscribe": `<${unsubUrl}>`,
          "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        },
      };
    });
    const res = await fetch("https://api.resend.com/emails/batch", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emails),
    });
    if (res.ok) {
      sent += chunk.length;
    } else {
      failed += chunk.length;
      console.error(`[newsletter] batch send failed: ${res.status} ${await res.text()}`);
    }
  }

  return NextResponse.json({ ok: failed === 0, sent, failed });
}
