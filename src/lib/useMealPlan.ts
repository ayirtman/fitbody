"use client";

import { useLocalStorage } from "./useLocalStorage";
import {
  DEFAULT_MEAL_PLAN,
  STORAGE_KEYS,
  migrateMealPlanV1,
  type MealPlanState,
  type MealSlot,
  type PlanDay,
} from "./storage";

export const PLAN_DAYS: { id: PlanDay; short: string; label: string }[] = [
  { id: "mon", short: "Mon", label: "Monday" },
  { id: "tue", short: "Tue", label: "Tuesday" },
  { id: "wed", short: "Wed", label: "Wednesday" },
  { id: "thu", short: "Thu", label: "Thursday" },
  { id: "fri", short: "Fri", label: "Friday" },
  { id: "sat", short: "Sat", label: "Saturday" },
  { id: "sun", short: "Sun", label: "Sunday" },
];

export const MEAL_SLOTS: { id: MealSlot; short: string; label: string }[] = [
  { id: "breakfast", short: "B", label: "Breakfast" },
  { id: "lunch", short: "L", label: "Lunch" },
  { id: "dinner", short: "D", label: "Dinner" },
  { id: "snack", short: "S", label: "Snack" },
];

// One-shot v1 -> v2 migration, at module load so every consumer's first
// localStorage snapshot already sees the migrated plan. No-ops on the server.
migrateMealPlanV1();

export function useMealPlan() {
  return useLocalStorage<MealPlanState>(STORAGE_KEYS.mealPlan, DEFAULT_MEAL_PLAN);
}

export function isPlanned(
  plan: MealPlanState,
  day: PlanDay,
  slot: MealSlot,
  slug: string,
): boolean {
  return plan.week[day]?.[slot]?.includes(slug) ?? false;
}

/** Adds unless the slot already holds this recipe (one food per meal, max once). */
export function addToPlan(
  prev: MealPlanState,
  day: PlanDay,
  slot: MealSlot,
  slug: string,
): MealPlanState {
  const current = prev.week[day]?.[slot] ?? [];
  if (current.includes(slug)) return prev;
  return {
    week: {
      ...prev.week,
      [day]: { ...prev.week[day], [slot]: [...current, slug] },
    },
    savedAt: new Date().toISOString(),
  };
}

export function removeFromPlan(
  prev: MealPlanState,
  day: PlanDay,
  slot: MealSlot,
  slug: string,
): MealPlanState {
  const current = prev.week[day]?.[slot];
  if (!current?.includes(slug)) return prev;
  const nextSlot = current.filter((s) => s !== slug);
  const dayPlan = { ...prev.week[day] };
  if (nextSlot.length) dayPlan[slot] = nextSlot;
  else delete dayPlan[slot];
  const week = { ...prev.week };
  if (Object.keys(dayPlan).length) week[day] = dayPlan;
  else delete week[day];
  return { week, savedAt: new Date().toISOString() };
}

/** True when any slot on any day holds at least one recipe. */
export function planHasMeals(plan: MealPlanState): boolean {
  return Object.values(plan.week).some((d) =>
    Object.values(d ?? {}).some((slugs) => (slugs?.length ?? 0) > 0),
  );
}

/** Every planned slug in day/slot order, repeats included (for aggregation). */
export function plannedSlugs(plan: MealPlanState): string[] {
  const out: string[] = [];
  for (const { id: day } of PLAN_DAYS) {
    const d = plan.week[day];
    if (!d) continue;
    for (const { id: slot } of MEAL_SLOTS) {
      for (const slug of d[slot] ?? []) out.push(slug);
    }
  }
  return out;
}
