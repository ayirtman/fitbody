import { sbFetch, supabaseConfigured } from "@/lib/server/supabase";

/**
 * Single-row sponsor config for the weekly email's "Presented by" slot.
 * Managed from the admin studio; when inactive the block simply doesn't
 * exist. Injected at issue-creation time so drafts preview exactly what
 * subscribers will receive.
 */

export interface Sponsor {
  name: string;
  url: string;
  blurb: string;
  active: boolean;
}

export async function getSponsor(): Promise<Sponsor | null> {
  if (!supabaseConfigured()) return null;
  const res = await sbFetch(
    "newsletter_sponsor?id=eq.1&select=name,url,blurb,active",
  );
  if (!res.ok) return null;
  const rows = (await res.json()) as Sponsor[];
  return rows[0] ?? null;
}

export async function getActiveSponsor(): Promise<Sponsor | null> {
  const sponsor = await getSponsor();
  return sponsor?.active && sponsor.name && sponsor.url ? sponsor : null;
}

export async function saveSponsor(fields: Partial<Sponsor>): Promise<boolean> {
  const res = await sbFetch("newsletter_sponsor?id=eq.1", {
    method: "PATCH",
    body: JSON.stringify({ ...fields, updated_at: new Date().toISOString() }),
  });
  return res.ok;
}

/**
 * Insert the sponsor block into issue HTML right after the headline (works
 * for both the digest template and Claude-written issues, which are required
 * to open with an h1). Falls back to just above the footer.
 */
export function injectSponsor(html: string, sponsor: Sponsor): string {
  const block = sponsorHtml(sponsor);
  const afterH1 = html.indexOf("</h1>");
  if (afterH1 !== -1) {
    const cut = afterH1 + "</h1>".length;
    return html.slice(0, cut) + block + html.slice(cut);
  }
  return html.replace("{{{unsubscribe}}}", `${block} {{{unsubscribe}}}`);
}

/** Inline-styled "Presented by" block matching the email design system. */
export function sponsorHtml(sponsor: Sponsor): string {
  return `<div style="margin-top:20px;border:1px solid #2e2a24;border-radius:12px;padding:14px 18px;background:#1d1a16;">
    <p style="margin:0;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9b937f;">Presented by</p>
    <p style="margin:6px 0 0;font-size:14px;line-height:1.6;color:#f3ead9;"><a href="${sponsor.url}" style="color:#c9a227;font-weight:bold;text-decoration:none;">${sponsor.name}</a> - ${sponsor.blurb}</p>
  </div>`;
}
