import { neon } from "@neondatabase/serverless";

/**
 * Neon Postgres access over HTTP (serverless-friendly, no connection pool).
 * Replaces the old Supabase PostgREST wrapper. Every query is parameterised.
 * Readers degrade to empty results when DATABASE_URL is absent, so local dev
 * and CI builds work without credentials.
 */

export function dbConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

let client: ReturnType<typeof neon> | null = null;

function normalize(value: unknown): unknown {
  // The driver parses timestamptz into Date; the app (and the old PostgREST
  // layer) deals in ISO strings.
  return value instanceof Date ? value.toISOString() : value;
}

/** Run a parameterised query. Returns rows, or null on any error (logged). */
export async function q<T = Record<string, unknown>>(
  text: string,
  params: unknown[] = [],
): Promise<T[] | null> {
  if (!dbConfigured()) return null;
  try {
    client ??= neon(process.env.DATABASE_URL!);
    const rows = (await client.query(text, params)) as Record<string, unknown>[];
    return rows.map((row) =>
      Object.fromEntries(Object.entries(row).map(([k, v]) => [k, normalize(v)])),
    ) as T[];
  } catch (err) {
    console.error(`[db] query failed: ${(err as Error).message}`);
    return null;
  }
}

/**
 * Build "col = $n, ..." for a partial update from a whitelist of columns.
 * Returns null when there is nothing to set.
 */
export function setClause(
  fields: Record<string, unknown>,
  allowed: readonly string[],
  startAt = 1,
): { sql: string; params: unknown[] } | null {
  const keys = allowed.filter((k) => fields[k] !== undefined);
  if (keys.length === 0) return null;
  return {
    sql: keys.map((k, i) => `${k} = $${startAt + i}`).join(", "),
    params: keys.map((k) => fields[k]),
  };
}
