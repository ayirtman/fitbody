"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Recipe } from "@/lib/types";
import { filterRecipes, type RecipeSort } from "@/lib/filters";
import RecipeCard from "./RecipeCard";

const mealTypes = ["breakfast", "lunch", "dinner", "snack"] as const;
const sorts: { value: RecipeSort; label: string }[] = [
  { value: "protein", label: "Most protein" },
  { value: "fiber", label: "Most fiber" },
  { value: "calories", label: "Lowest calories" },
  { value: "time", label: "Fastest" },
];
const tags = [
  "high-protein",
  "high-fiber",
  "15-min",
  "one-pan",
  "kid-approved",
  "freezer-friendly",
  "vegetarian",
  "budget",
];

const selectClass =
  "rounded-full border border-edge bg-surface-1 px-3.5 py-1.5 text-sm text-cream focus:border-gold focus:outline-none";

export default function RecipeLibrary({ recipes }: { recipes: Recipe[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  function setParam(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    router.replace(`${pathname}${next.size ? `?${next}` : ""}`, {
      scroll: false,
    });
  }

  const results = filterRecipes(recipes, {
    mealType: params.get("mealType") ?? undefined,
    tag: params.get("tag") ?? undefined,
    maxTime: params.get("maxTime") ? Number(params.get("maxTime")) : undefined,
    sort: (params.get("sort") as RecipeSort) ?? undefined,
  });

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <select
          aria-label="Meal type"
          className={selectClass}
          value={params.get("mealType") ?? ""}
          onChange={(e) => setParam("mealType", e.target.value)}
        >
          <option value="">All meals</option>
          {mealTypes.map((t) => (
            <option key={t} value={t}>
              {t[0].toUpperCase() + t.slice(1)}
            </option>
          ))}
        </select>
        <select
          aria-label="Tag"
          className={selectClass}
          value={params.get("tag") ?? ""}
          onChange={(e) => setParam("tag", e.target.value)}
        >
          <option value="">All tags</option>
          {tags.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <select
          aria-label="Max total time"
          className={selectClass}
          value={params.get("maxTime") ?? ""}
          onChange={(e) => setParam("maxTime", e.target.value)}
        >
          <option value="">Any time</option>
          <option value="15">≤ 15 min</option>
          <option value="20">≤ 20 min</option>
          <option value="30">≤ 30 min</option>
          <option value="45">≤ 45 min</option>
        </select>
        <select
          aria-label="Sort"
          className={selectClass}
          value={params.get("sort") ?? "protein"}
          onChange={(e) => setParam("sort", e.target.value)}
        >
          {sorts.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>
      <p className="mt-4 text-sm text-muted" aria-live="polite">
        {results.length} recipe{results.length === 1 ? "" : "s"}
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {results.map((r) => (
          <RecipeCard key={r.slug} recipe={r} />
        ))}
      </div>
      {results.length === 0 && (
        <p className="mt-8 text-muted">
          Nothing matches — loosen a filter and try again.
        </p>
      )}
    </div>
  );
}
