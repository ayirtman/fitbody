import { redirect } from "next/navigation";
import { dbConfigured, q } from "@/lib/server/db";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** One-click unsubscribe from the email footer link. Always lands on a page. */
export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token") ?? "";
  let ok = false;

  if (UUID_RE.test(token) && dbConfigured()) {
    const rows = await q(
      `update newsletter_subscribers
       set status = 'unsubscribed', unsubscribed_at = now()
       where unsubscribe_token = $1 and status = 'active'
       returning id`,
      [token],
    );
    ok = (rows?.length ?? 0) > 0;
  }

  redirect(`/newsletter/unsubscribed?ok=${ok ? 1 : 0}`);
}
