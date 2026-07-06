import { redirect } from "next/navigation";
import { sbFetch, supabaseConfigured } from "@/lib/server/supabase";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** One-click unsubscribe from the email footer link. Always lands on a page. */
export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token") ?? "";
  let ok = false;

  if (UUID_RE.test(token) && supabaseConfigured()) {
    const res = await sbFetch(
      `newsletter_subscribers?unsubscribe_token=eq.${token}&status=eq.active`,
      {
        method: "PATCH",
        body: JSON.stringify({
          status: "unsubscribed",
          unsubscribed_at: new Date().toISOString(),
        }),
        prefer: "return=representation",
      },
    );
    if (res.ok) {
      const rows = (await res.json()) as unknown[];
      ok = rows.length > 0;
    } else {
      console.error(`[newsletter] unsubscribe failed: ${res.status}`);
    }
  }

  redirect(`/newsletter/unsubscribed?ok=${ok ? 1 : 0}`);
}
