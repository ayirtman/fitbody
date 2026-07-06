"use client";

import { useState } from "react";

export interface ShoppingListItem {
  /** stable identity for check-off state */
  key: string;
  label: string;
  /** e.g. merged quantities - rendered muted after the label */
  note?: string;
}

type ItemInput = string | ShoppingListItem;

function normalize(item: ItemInput): ShoppingListItem {
  return typeof item === "string" ? { key: item, label: item } : item;
}

/**
 * Checkable shopping list. Uncontrolled by default (ephemeral, like a paper
 * list you throw away after the shop - used on meal-prep pages); pass
 * `checked` + `onToggle` to persist state, as /my-temple does.
 */
export default function ShoppingList({
  categories,
  checked,
  onToggle,
}: {
  categories: { category: string; items: ItemInput[] }[];
  checked?: ReadonlySet<string>;
  onToggle?: (key: string) => void;
}) {
  const [localChecked, setLocalChecked] = useState<Set<string>>(new Set());
  const isChecked = (key: string) =>
    checked ? checked.has(key) : localChecked.has(key);

  function toggle(key: string) {
    if (onToggle) {
      onToggle(key);
      return;
    }
    setLocalChecked((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
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
            {cat.items.map(normalize).map((item) => {
              const done = isChecked(item.key);
              return (
                <li key={item.key}>
                  <label className="flex cursor-pointer items-center gap-3 text-sm">
                    <input
                      type="checkbox"
                      checked={done}
                      onChange={() => toggle(item.key)}
                      className="h-4 w-4 accent-[var(--color-gold)]"
                    />
                    <span
                      className={
                        done ? "text-muted line-through" : "text-cream/90"
                      }
                    >
                      {item.label}
                      {item.note && (
                        <span className="text-muted"> · {item.note}</span>
                      )}
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
