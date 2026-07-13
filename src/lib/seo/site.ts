/**
 * Canonical site origin - override per-environment with NEXT_PUBLIC_SITE_URL.
 * The default is the production apex domain (no "www") so that a missing env
 * var can never silently point sitemap/canonical/OG URLs at the vercel.app
 * host, which Google treats as a different site and drops from the index.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://templefit.fit";

export const SITE_NAME = "TempleFit";

export const SITE_DESCRIPTION =
  "Free workouts, routines, stretches, physio exercises and high-protein meal prep built for working dads. No gym required, no fluff, 15 honest minutes at a time.";
