import type { Metadata } from "next";
import { SITE_NAME } from "./site";

/**
 * Canonical + OpenGraph + Twitter metadata for a page in one call.
 * Relative URLs resolve against metadataBase (set in the root layout).
 * Per-recipe OG images come from the file convention
 * (recipes/[slug]/opengraph-image.tsx), which outranks config images.
 */
export function pageMeta(opts: {
  title?: string;
  description: string;
  path: string;
  type?: "website" | "article";
}): Metadata {
  const { title, description, path, type = "website" } = opts;
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      ...(title ? { title } : {}),
      description,
      url: path,
      siteName: SITE_NAME,
      type,
    },
    twitter: {
      card: "summary_large_image",
      ...(title ? { title } : {}),
      description,
    },
  };
}
