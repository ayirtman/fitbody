"use client";

import { useState } from "react";

/**
 * Checkable shopping list. Ephemeral by design — it resets on reload, like a
 * paper list you throw away after the shop.
 */
export default function ShoppingList({
  categories,
}: {
  categories: { category: string; items: string[] }[];
}) {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  function toggle(item: string) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(item)) next.delete(item);
      else next.add(item);
      return next;
    });
  }

  return (
    <div className="space-y-6">
      {categories.map((cat) => (
        <div key={cat.category}>
          <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-gold">
            {cat.category}
          </h3>
          <ul className="mt-2.5 space-y-1.5">
            {cat.items.map((item) => {
              const done = checked.has(item);
              return (
                <li key={item}>
                  <label className="flex cursor-pointer items-center gap-3 text-sm">
                    <input
                      type="checkbox"
                      checked={done}
                      onChange={() => toggle(item)}
                      className="h-4 w-4 accent-[var(--color-gold)]"
                    />
                    <span
                      className={
                        done ? "text-muted line-through" : "text-cream/90"
                      }
                    >
                      {item}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
