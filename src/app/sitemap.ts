import type { MetadataRoute } from "next";
import {
  muscles,
  exercises,
  stretches,
  complaints,
  physioByComplaint,
  routines,
  recipes,
  mealPrepPlans,
} from "@/data";
import { guides } from "@/data/guides";
import { SITE_URL } from "@/lib/seo/site";
import { publishedForSitemap } from "@/lib/blog";

// One shared lastModified per deploy: content only changes when we ship.
const LAST_MODIFIED = new Date();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = [
    "",
    "/muscles",
    "/exercises",
    "/routines",
    "/flexibility",
    "/physio",
    "/recipes",
    "/meal-prep",
    "/nutrition",
    "/guides",
    "/blog",
    "/gear",
    "/support",
    "/sponsor",
    "/disclosure",
    "/my-temple",
    "/posture-ai",
    "/about",
  ];

  const dynamicPaths = [
    ...muscles.map((m) => `/muscles/${m.id}`),
    ...exercises.map((e) => `/exercises/${e.slug}`),
    ...stretches.map((s) => `/flexibility/${s.slug}`),
    ...complaints.map((c) => `/physio/${c.id}`),
    ...complaints.flatMap((c) =>
      physioByComplaint(c.id).map((p) => `/physio/${c.id}/${p.slug}`),
    ),
    ...routines.map((r) => `/routines/${r.slug}`),
    ...recipes.map((r) => `/recipes/${r.slug}`),
    ...mealPrepPlans.map((p) => `/meal-prep/${p.slug}`),
    ...guides.map((g) => `/guides/${g.slug}`),
  ];

  const staticEntries: MetadataRoute.Sitemap = [
    ...staticPaths,
    ...dynamicPaths,
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "weekly",
  }));

  // Blog posts live in Supabase; degrade to the static set when env is absent.
  const blogEntries: MetadataRoute.Sitemap = (await publishedForSitemap()).map(
    (post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.published_at ? new Date(post.published_at) : LAST_MODIFIED,
      changeFrequency: "monthly",
    }),
  );

  return [...staticEntries, ...blogEntries];
}
