/**
 * Turns the user's weekly meal plan into an aisle-grouped shopping list.
 * Quantities are free text ("80g", "1 cup"), so no unit math is attempted:
 * identical strings collapse to "80g x 3", mixed ones are joined with " + ".
 */
import type { MealPlanState } from "./storage";
import { plannedSlugs } from "./useMealPlan";
import {
  INGREDIENT_CATEGORIES,
  categorizeIngredient,
  type IngredientCategory,
} from "./ingredientCategories";

export interface RecipeIngredients {
  slug: string;
  ingredients: { item: string; qty: string }[];
}

export interface AggregatedItem {
  /** normalized item name - also the persisted check-off key */
  key: string;
  /** first-seen original casing */
  label: string;
  qtyDisplay: string;
  category: IngredientCategory;
}

export interface ShoppingCategory {
  category: IngredientCategory;
  items: AggregatedItem[];
}

function mergeQtys(qtys: string[]): string {
  const counts = new Map<string, number>();
  for (const q of qtys) {
    const key = q.trim();
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([qty, n]) => (n > 1 ? `${qty} x ${n}` : qty))
    .join(" + ");
}

export function buildShoppingList(
  plan: MealPlanState,
  recipes: RecipeIngredients[],
): ShoppingCategory[] {
  const bySlug = new Map(recipes.map((r) => [r.slug, r]));
  const items = new Map<string, { label: string; qtys: string[] }>();

  for (const slug of plannedSlugs(plan)) {
    const recipe = bySlug.get(slug);
    if (!recipe) continue;
    for (const ing of recipe.ingredients) {
      const key = ing.item.trim().toLowerCase();
      const existing = items.get(key);
      if (existing) existing.qtys.push(ing.qty);
      else items.set(key, { label: ing.item.trim(), qtys: [ing.qty] });
    }
  }

  const grouped = new Map<IngredientCategory, AggregatedItem[]>();
  for (const [key, { label, qtys }] of items) {
    const category = categorizeIngredient(label);
    const entry: AggregatedItem = {
      key,
      label,
      qtyDisplay: mergeQtys(qtys),
      category,
    };
    const bucket = grouped.get(category);
    if (bucket) bucket.push(entry);
    else grouped.set(category, [entry]);
  }

  return INGREDIENT_CATEGORIES.filter((c) => grouped.has(c)).map(
    (category) => ({
      category,
      items: grouped
        .get(category)!
        .sort((a, b) => a.label.localeCompare(b.label)),
    }),
  );
}
