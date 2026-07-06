"use client";

import Link from "next/link";
import { useLocalStorage } from "@/lib/useLocalStorage";
import {
  DEFAULT_COMPLETIONS,
  DEFAULT_FAVORITES,
  DEFAULT_MEAL_PLAN,
  STORAGE_KEYS,
  type CompletionsState,
  type FavoritesState,
  type FavoriteKind,
  type MealPlanState,
  type PlanDay,
} from "@/lib/storage";
import {
  completionsThisWeek,
  currentStreak,
  longestStreak,
} from "@/lib/streak";
import StreakCalendar from "./StreakCalendar";
import EmptyState from "@/components/ui/EmptyState";

export interface CatalogEntry {
  slug: string;
  name: string;
  href: string;
}

export type Catalog = Record<FavoriteKind, CatalogEntry[]>;

const kindTitles: Record<FavoriteKind, string> = {
  routines: "Routines",
  exercises: "Exercises",
  stretches: "Stretches",
  physio: "Physio",
  recipes: "Recipes",
};

const dayLabels: { id: PlanDay; label: string }[] = [
  { id: "mon", label: "Monday" },
  { id: "tue", label: "Tuesday" },
  { id: "wed", label: "Wednesday" },
  { id: "thu", label: "Thursday" },
  { id: "fri", label: "Friday" },
  { id: "sat", label: "Saturday" },
  { id: "sun", label: "Sunday" },
];

export default function MyTempleDashboard({ catalog }: { catalog: Catalog }) {
  const [completions] = useLocalStorage<CompletionsState>(
    STORAGE_KEYS.completions,
    DEFAULT_COMPLETIONS,
  );
  const [favorites] = useLocalStorage<FavoritesState>(
    STORAGE_KEYS.favorites,
    DEFAULT_FAVORITES,
  );
  const [mealPlan, setMealPlan] = useLocalStorage<MealPlanState>(
    STORAGE_KEYS.mealPlan,
    DEFAULT_MEAL_PLAN,
  );

  const streak = currentStreak(completions.dates);
  const longest = longestStreak(completions.dates);
  const thisWeek = completionsThisWeek(completions.dates);

  const entryFor = (kind: FavoriteKind, slug: string) =>
    catalog[kind].find((e) => e.slug === slug);

  const hasFavorites = (Object.keys(favorites) as FavoriteKind[]).some(
    (k) => favorites[k].length > 0,
  );
  const hasMealPlan = Object.values(mealPlan.week).some(
    (d) => d?.lunch || d?.dinner,
  );
  const hasTrained = completions.dates.length > 0;

  return (
    <div className="space-y-14">
      {/* Streak */}
      <section>
        <h2 className="display lintel text-3xl">The habit</h2>
        {hasTrained ? (
          <div className="mt-6 flex flex-wrap items-center gap-8">
            <div className="flex gap-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Current streak
                </p>
                <p className="display mt-1 text-5xl text-gold tabular-nums">
                  {streak}
                  <span className="text-2xl text-muted"> days</span>
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Longest
                </p>
                <p className="display mt-1 text-5xl tabular-nums">
                  {longest}
                  <span className="text-2xl text-muted"> days</span>
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                  This week
                </p>
                <p className="display mt-1 text-5xl tabular-nums">
                  {thisWeek}
                  <span className="text-2xl text-muted"> sessions</span>
                </p>
              </div>
            </div>
            <StreakCalendar dates={completions.dates} />
          </div>
        ) : (
          <div className="mt-6">
            <EmptyState
              title="No sessions yet"
              body="Finish any routine and hit “Mark today done” — your streak starts there. One honest session is all it takes."
              cta={{ href: "/routines", label: "Pick a routine" }}
            />
          </div>
        )}
      </section>

      {/* Favorites */}
      <section>
        <h2 className="display lintel text-3xl">Saved</h2>
        {hasFavorites ? (
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {(Object.keys(kindTitles) as FavoriteKind[]).map((kind) => {
              if (favorites[kind].length === 0) return null;
              return (
                <div key={kind} className="card p-5">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-gold">
                    {kindTitles[kind]}
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {favorites[kind].map((slug) => {
                      const entry = entryFor(kind, slug);
                      if (!entry) return null;
                      return (
                        <li key={slug}>
                          <Link
                            href={entry.href}
                            className="text-sm font-medium text-cream transition-colors hover:text-gold"
                          >
                            {entry.name} →
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="mt-6">
            <EmptyState
              title="Nothing saved yet"
              body="Tap “Save” on any exercise, routine or recipe and it'll be waiting for you here."
              cta={{ href: "/exercises", label: "Browse exercises" }}
            />
          </div>
        )}
      </section>

      {/* Meal plan */}
      <section>
        <div className="flex items-end justify-between gap-4">
          <h2 className="display lintel text-3xl">This week&apos;s food</h2>
          {hasMealPlan && (
            <button
              onClick={() => setMealPlan(DEFAULT_MEAL_PLAN)}
              className="text-sm font-medium text-muted transition-colors hover:text-ember"
            >
              Clear week
            </button>
          )}
        </div>
        {hasMealPlan ? (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead>
                <tr className="border-b border-edge text-xs font-semibold uppercase tracking-wider text-muted">
                  <th className="py-2 pr-4">Day</th>
                  <th className="py-2 pr-4">Lunch</th>
                  <th className="py-2">Dinner</th>
                </tr>
              </thead>
              <tbody>
                {dayLabels.map((d) => {
                  const day = mealPlan.week[d.id];
                  const lunch = day?.lunch && entryFor("recipes", day.lunch);
                  const dinner = day?.dinner && entryFor("recipes", day.dinner);
                  return (
                    <tr key={d.id} className="border-b border-edge/60">
                      <td className="py-2.5 pr-4 font-semibold text-cream">
                        {d.label}
                      </td>
                      <td className="py-2.5 pr-4">
                        {lunch ? (
                          <Link
                            href={lunch.href}
                            className="text-cream/85 hover:text-gold"
                          >
                            {lunch.name}
                          </Link>
                        ) : (
                          <span className="text-muted">—</span>
                        )}
                      </td>
                      <td className="py-2.5">
                        {dinner ? (
                          <Link
                            href={dinner.href}
                            className="text-cream/85 hover:text-gold"
                          >
                            {dinner.name}
                          </Link>
                        ) : (
                          <span className="text-muted">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="mt-6">
            <EmptyState
              title="No meals planned"
              body="Open any recipe and hit “Add to my week” to build next week's menu in two minutes."
              cta={{ href: "/recipes", label: "Browse recipes" }}
            />
          </div>
        )}
      </section>
    </div>
  );
}
