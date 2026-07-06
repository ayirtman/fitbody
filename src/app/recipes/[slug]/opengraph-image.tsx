import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import sharp from "sharp";
import { recipes, recipeBySlug } from "@/data";

/**
 * Per-recipe OG card: the dish photo full-bleed with a branded gradient
 * band carrying the name and headline macros. Falls back to a typographic
 * card for recipes without a photo.
 */

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return recipes.map((r) => ({ slug: r.slug }));
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const recipe = recipeBySlug.get(slug);
  if (!recipe) return new ImageResponse(<div />, size);

  let photo: string | null = null;
  if (recipe.image) {
    try {
      // Photos are webp, which the OG renderer can't decode - re-encode.
      const buf = await readFile(path.join(process.cwd(), "public", recipe.image));
      const jpeg = await sharp(buf)
        .resize(1200, 630, { fit: "cover" })
        .jpeg({ quality: 78 })
        .toBuffer();
      photo = `data:image/jpeg;base64,${jpeg.toString("base64")}`;
    } catch {
      // fall back to the typographic card
    }
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#141210",
          color: "#f3ead9",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {photo && (
          <img
            src={photo}
            alt=""
            width={1200}
            height={630}
            style={{ position: "absolute", inset: 0, objectFit: "cover" }}
          />
        )}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            padding: "120px 64px 44px",
            background:
              "linear-gradient(to top, rgba(20,18,16,0.96) 30%, rgba(20,18,16,0.7) 65%, rgba(20,18,16,0) 100%)",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: 3,
              color: "#c9a227",
            }}
          >
            TEMPLEFIT RECIPES
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 12,
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.05,
            }}
          >
            {recipe.name}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 16,
              fontSize: 28,
              color: "#d9d2c0",
            }}
          >
            {`${recipe.macros.proteinG}g protein · ${recipe.macros.calories} kcal · ready in ${recipe.prepMin + recipe.cookMin} min`}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
