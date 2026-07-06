import type { Recipe } from "./types";
import type { CalculatorState } from "./storage";

/**
 * Static, transparent nutrition-target formulas. No AI, no black box:
 * calories from bodyweight × activity factor, protein at 0.8 g/lb,
 * fiber at 14 g per 1000 kcal (floored at 30 g).
 */

export interface NutritionTargets {
  calories: number;
  proteinG: number;
  fiberG: number;
}

const ACTIVITY_FACTOR = { low: 13, moderate: 15, high: 17 } as const;
const GOAL_ADJUST = { maintain: 0, "lean-out": -300, build: 300 } as const;

export function computeTargets(input: CalculatorState): NutritionTargets {
  const weightLb = input.unit === "kg" ? input.weight * 2.2046 : input.weight;
  const calories = Math.round(
    (weightLb * ACTIVITY_FACTOR[input.activity] + GOAL_ADJUST[input.goal]) / 10,
  ) * 10;
  const proteinG = Math.min(200, Math.round(weightLb * 0.8));
  const fiberG = Math.max(30, Math.round((calories / 1000) * 14));
  return { calories, proteinG, fiberG };
}

export interface DayPlanSuggestion {
  breakfast: Recipe;
  lunch: Recipe;
  dinner: Recipe;
  snack?: Recipe;
  totals: { calories: number; proteinG: number; fiberG: number };
}

/**
 * Greedy day-plan builder: picks the most protein-dense recipe per meal slot,
 * then adds a snack if the protein target still isn't met.
 */
export function suggestDayPlan(
  recipes: Recipe[],
  targets: NutritionTargets,
): DayPlanSuggestion | null {
  const byDensity = (a: Recipe, b: Recipe) =>
    b.macros.proteinG / b.macros.calories - a.macros.proteinG / a.macros.calories;

  const used = new Set<string>();
  const pick = (type: string) => {
    const found = recipes
      .filter(
        (r) =>
          !used.has(r.slug) &&
          r.mealType.includes(type as Recipe["mealType"][number]),
      )
      .sort(byDensity)[0];
    if (found) used.add(found.slug);
    return found;
  };

  const breakfast = pick("breakfast");
  const lunch = pick("lunch");
  const dinner = pick("dinner");
  if (!breakfast || !lunch || !dinner) return null;

  const base = [breakfast, lunch, dinner];
  let totals = sum(base);

  let snack: Recipe | undefined;
  if (totals.proteinG < targets.proteinG) {
    snack = pick("snack");
    if (snack) totals = sum([...base, snack]);
  }

  return { breakfast, lunch, dinner, snack, totals };
}

function sum(recipes: Recipe[]) {
  return recipes.reduce(
    (acc, r) => ({
      calories: acc.calories + r.macros.calories,
      proteinG: acc.proteinG + r.macros.proteinG,
      fiberG: acc.fiberG + r.macros.fiberG,
    }),
    { calories: 0, proteinG: 0, fiberG: 0 },
  );
}
