/**
 * Minimal Supabase PostgREST client over fetch - the app only needs four
 * queries, so no SDK. Uses the service-role key; RLS has no policies, meaning
 * these route handlers are the only path to the table.
 */

export function supabaseConfigured(): boolean {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export async function sbFetch(
  pathWithQuery: string,
  init: RequestInit & { prefer?: string } = {},
): Promise<Response> {
  const url = `${process.env.SUPABASE_URL}/rest/v1/${pathWithQuery}`;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const headers: Record<string, string> = {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
    ...(init.prefer ? { Prefer: init.prefer } : {}),
    ...(init.headers as Record<string, string> | undefined),
  };
  return fetch(url, { ...init, headers });
}
