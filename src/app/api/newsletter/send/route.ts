import { NextResponse } from "next/server";
import { sbFetch, supabaseConfigured } from "@/lib/server/supabase";
import { normalizeEmail } from "@/lib/server/email";
import { newsletterAdminAuthorized } from "@/lib/server/newsletterAuth";
import { weeklyDigest } from "@/lib/newsletter/digest";
import { getIssue, updateIssue } from "@/lib/newsletter/issues";

/**
 * Admin-only newsletter dispatch. Authenticate with the x-newsletter-secret
 * header. Content comes from one of:
 *   { issueId }                    - a stored issue from the admin studio
 *   { template: "weekly-digest" }  - the built-in digest template
 *   { subject, html }              - raw content ({{{unsubscribe}}} placeholder)
 * Add { test: true, to: "you@example.com" } to send a single preview copy to
 * one address without touching the subscriber list or issue status.
 * Full sends go via Resend's batch API, 100 recipients per call, one email
 * per subscriber so unsubscribe links stay personal.
 */

const PAGE_SIZE = 1000;
const BATCH_SIZE = 100;

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

interface ResendEmail {
  from: string;
  to: string[];
  subject: string;
  html: string;
  headers?: Record<string, string>;
}

async function resendBatch(emails: ResendEmail[]): Promise<boolean> {
  const res = await fetch("https://api.resend.com/emails/batch", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(emails),
  });
  if (!res.ok) {
    console.error(`[newsletter] batch send failed: ${res.status} ${await res.text()}`);
  }
  return res.ok;
}

export async function POST(request: Request) {
  if (!newsletterAdminAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  if (!process.env.RESEND_API_KEY || !process.env.NEWSLETTER_FROM) {
    return NextResponse.json(
      { ok: false, error: "Newsletter not configured" },
      { status: 503 },
    );
  }

  let body: {
    subject?: unknown;
    html?: unknown;
    template?: unknown;
    issueId?: unknown;
    test?: unknown;
    to?: unknown;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid body" }, { status: 400 });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://templefit.vercel.app";
  const isTest = body.test === true;
  const issueId = typeof body.issueId === "string" ? body.issueId : null;

  let subject: string;
  let html: string;
  if (issueId) {
    if (!supabaseConfigured()) {
      return NextResponse.json(
        { ok: false, error: "Newsletter not configured" },
        { status: 503 },
      );
    }
    const issue = await getIssue(issueId);
    if (!issue) {
      return NextResponse.json({ ok: false, error: "Issue not found" }, { status: 404 });
    }
    if (!isTest && issue.status === "sent") {
      return NextResponse.json(
        { ok: false, error: "Issue was already sent" },
        { status: 409 },
      );
    }
    ({ subject, html } = issue);
  } else if (body.template === "weekly-digest") {
    ({ subject, html } = weeklyDigest(siteUrl));
  } else if (typeof body.subject === "string" && typeof body.html === "string") {
    subject = body.subject;
    html = body.html;
  } else {
    return NextResponse.json(
      {
        ok: false,
        error:
          'Provide { issueId }, { template: "weekly-digest" } or { subject, html }',
      },
      { status: 400 },
    );
  }
  if (!html.includes("{{{unsubscribe}}}")) {
    html += `<p style="font-size:12px;color:#9b937f;">{{{unsubscribe}}}</p>`;
  }

  // Test mode: one copy to one address, no subscriber list, no status change.
  if (isTest) {
    const to = normalizeEmail(body.to);
    if (!to) {
      return NextResponse.json(
        { ok: false, error: "Provide a valid { to } address for a test send" },
        { status: 400 },
      );
    }
    const sent = await resendBatch([
      {
        from: process.env.NEWSLETTER_FROM,
        to: [to],
        subject: `[Test] ${subject}`,
        html: html.replaceAll(
          "{{{unsubscribe}}}",
          `<span style="color:#9b937f;">This is a test send - unsubscribe link appears here.</span>`,
        ),
      },
    ]);
    if (!sent) {
      return NextResponse.json(
        { ok: false, error: "Resend rejected the test email" },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true, test: true, sent: 1 });
  }

  if (!supabaseConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Newsletter not configured" },
      { status: 503 },
    );
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
        from: process.env.NEWSLETTER_FROM!,
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
    if (await resendBatch(emails)) {
      sent += chunk.length;
    } else {
      failed += chunk.length;
    }
  }

  if (issueId && sent > 0) {
    await updateIssue(issueId, {
      status: "sent",
      sent_at: new Date().toISOString(),
      sent_count: sent,
    });
  }

  return NextResponse.json({ ok: failed === 0, sent, failed });
}
