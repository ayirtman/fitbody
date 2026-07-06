import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo/meta";
import Link from "next/link";
import { Suspense } from "react";
import { recipes } from "@/data";
import RecipeLibrary from "@/components/recipe/RecipeLibrary";

export const metadata: Metadata = pageMeta({
  title: "Recipes",
  description:
    "High-protein, high-fiber recipes a busy dad can actually cook. Filter and sort by protein, fiber, calories and time.",
  path: "/recipes",
});

export default function RecipesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Fuel
          </p>
          <h1 className="display lintel mt-1 text-4xl sm:text-5xl">
            Protein up. Fiber up.
          </h1>
          <p className="mt-4 max-w-xl text-muted">
            Every recipe pulls its weight: at least 25g of protein or 8g of
            fiber per serving, with honest prep times and minimal cleanup.
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/meal-prep"
            className="rounded-full border border-edge px-4 py-2 text-sm font-semibold text-cream transition-colors hover:border-gold/40"
          >
            Meal prep plans
          </Link>
          <Link
            href="/nutrition"
            className="rounded-full border border-edge px-4 py-2 text-sm font-semibold text-cream transition-colors hover:border-gold/40"
          >
            My targets
          </Link>
        </div>
      </div>
      <div className="mt-8">
        <Suspense>
          <RecipeLibrary recipes={recipes} />
        </Suspense>
      </div>
    </div>
  );
}
