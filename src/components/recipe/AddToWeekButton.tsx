"use client";

import { useState } from "react";
import { useLocalStorage } from "@/lib/useLocalStorage";
import {
  DEFAULT_MEAL_PLAN,
  STORAGE_KEYS,
  type MealPlanState,
  type PlanDay,
} from "@/lib/storage";

const days: { id: PlanDay; label: string }[] = [
  { id: "mon", label: "Mon" },
  { id: "tue", label: "Tue" },
  { id: "wed", label: "Wed" },
  { id: "thu", label: "Thu" },
  { id: "fri", label: "Fri" },
  { id: "sat", label: "Sat" },
  { id: "sun", label: "Sun" },
];

export default function AddToWeekButton({ slug }: { slug: string }) {
  const [, setPlan] = useLocalStorage<MealPlanState>(
    STORAGE_KEYS.mealPlan,
    DEFAULT_MEAL_PLAN,
  );
  const [open, setOpen] = useState(false);
  const [added, setAdded] = useState<string | null>(null);

  function add(day: PlanDay, slot: "lunch" | "dinner") {
    setPlan((prev) => ({
      week: {
        ...prev.week,
        [day]: { ...prev.week[day], [slot]: slug },
      },
      savedAt: new Date().toISOString(),
    }));
    setAdded(`${days.find((d) => d.id === day)?.label} ${slot}`);
    setOpen(false);
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="rounded-full bg-gold px-5 py-2.5 text-sm font-bold text-ink transition-colors hover:bg-gold-light"
      >
        {added ? `✓ Added to ${added}` : "Add to my week"}
      </button>
      {open && (
        <div className="card absolute left-0 top-full z-20 mt-2 w-64 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">
            Pick a day & slot
          </p>
          <div className="mt-3 space-y-1.5">
            {days.map((d) => (
              <div key={d.id} className="flex items-center gap-2">
                <span className="w-9 text-sm text-muted">{d.label}</span>
                <button
                  onClick={() => add(d.id, "lunch")}
                  className="flex-1 rounded-full border border-edge px-2 py-1 text-xs text-cream hover:border-gold/50"
                >
                  Lunch
                </button>
                <button
                  onClick={() => add(d.id, "dinner")}
                  className="flex-1 rounded-full border border-edge px-2 py-1 text-xs text-cream hover:border-gold/50"
                >
                  Dinner
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
