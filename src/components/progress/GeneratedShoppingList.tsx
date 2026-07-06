"use client";

import { useLocalStorage } from "@/lib/useLocalStorage";
import {
  DEFAULT_SHOPPING,
  STORAGE_KEYS,
  type ShoppingState,
} from "@/lib/storage";
import { useMealPlan } from "@/lib/useMealPlan";
import {
  buildShoppingList,
  type RecipeIngredients,
} from "@/lib/shoppingList";
import ShoppingList from "@/components/recipe/ShoppingList";
import EmptyState from "@/components/ui/EmptyState";

/**
 * Aisle-grouped shopping list generated from the weekly meal plan. Check-offs
 * persist in localStorage until the week is cleared.
 */
export default function GeneratedShoppingList({
  recipes,
}: {
  recipes: RecipeIngredients[];
}) {
  const [plan] = useMealPlan();
  const [shopping, setShopping] = useLocalStorage<ShoppingState>(
    STORAGE_KEYS.shopping,
    DEFAULT_SHOPPING,
  );

  const categories = buildShoppingList(plan, recipes);
  const total = categories.reduce((n, c) => n + c.items.length, 0);
  const checked = new Set(shopping.checked);

  function toggle(key: string) {
    setShopping((prev) => ({
      checked: prev.checked.includes(key)
        ? prev.checked.filter((k) => k !== key)
        : [...prev.checked, key],
    }));
  }

  return (
    <section id="shopping-list">
      <div className="flex items-end justify-between gap-4">
        <h2 className="display lintel text-3xl">Shopping list</h2>
        {total > 0 && (
          <p className="text-sm text-muted">
            <span className="tabular-nums">
              {categories.reduce(
                (n, c) => n + c.items.filter((i) => checked.has(i.key)).length,
                0,
              )}
            </span>
            /<span className="tabular-nums">{total}</span> in the cart
          </p>
        )}
      </div>
      {total > 0 ? (
        <>
          <p className="mt-2 text-sm text-muted">
            Built from your week above - every planned meal&apos;s ingredients,
            combined. Check things off as you shop; it remembers until you
            clear the week.
          </p>
          <div className="card mt-6 p-6">
            <ShoppingList
              categories={categories.map((c) => ({
                category: c.category,
                items: c.items.map((i) => ({
                  key: i.key,
                  label: i.label,
                  note: i.qtyDisplay,
                })),
              }))}
              checked={checked}
              onToggle={toggle}
            />
          </div>
        </>
      ) : (
        <div className="mt-6">
          <EmptyState
            title="Nothing to buy yet"
            body="Plan a few meals and your shopping list writes itself - ingredients combined across the week, grouped by aisle."
            cta={{ href: "/recipes", label: "Browse recipes" }}
          />
        </div>
      )}
    </section>
  );
}
