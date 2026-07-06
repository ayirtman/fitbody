"use client";

import { useState } from "react";
import {
  MEAL_SLOTS,
  PLAN_DAYS,
  addToPlan,
  isPlanned,
  removeFromPlan,
  useMealPlan,
} from "@/lib/useMealPlan";
import type { MealSlot, PlanDay } from "@/lib/storage";

export default function AddToWeekButton({ slug }: { slug: string }) {
  const [plan, setPlan] = useMealPlan();
  const [open, setOpen] = useState(false);
  const [lastAction, setLastAction] = useState<string | null>(null);

  const plannedCount = PLAN_DAYS.reduce(
    (n, d) =>
      n +
      MEAL_SLOTS.filter((s) => isPlanned(plan, d.id, s.id, slug)).length,
    0,
  );

  function toggle(day: PlanDay, slot: MealSlot) {
    const dayLabel = PLAN_DAYS.find((d) => d.id === day)?.short;
    const slotLabel = MEAL_SLOTS.find((s) => s.id === slot)?.label.toLowerCase();
    if (isPlanned(plan, day, slot, slug)) {
      setPlan((prev) => removeFromPlan(prev, day, slot, slug));
      setLastAction(`Removed from ${dayLabel} ${slotLabel}`);
    } else {
      setPlan((prev) => addToPlan(prev, day, slot, slug));
      setLastAction(`Added to ${dayLabel} ${slotLabel}`);
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="rounded-full bg-gold px-5 py-2.5 text-sm font-bold text-ink transition-colors hover:bg-gold-light"
      >
        {plannedCount > 0
          ? `In my week (${plannedCount}) ✓`
          : "Add to my week"}
      </button>
      {open && (
        <div className="card absolute left-0 top-full z-20 mt-2 w-72 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">
            Tap a meal to add or remove
          </p>
          <div className="mt-3 space-y-1.5">
            <div className="flex items-center gap-1.5">
              <span className="w-9" aria-hidden="true" />
              {MEAL_SLOTS.map((s) => (
                <span
                  key={s.id}
                  className="flex-1 text-center text-[10px] font-semibold uppercase tracking-wider text-muted"
                  aria-hidden="true"
                >
                  {s.short}
                </span>
              ))}
            </div>
            {PLAN_DAYS.map((d) => (
              <div key={d.id} className="flex items-center gap-1.5">
                <span className="w-9 text-sm text-muted">{d.short}</span>
                {MEAL_SLOTS.map((s) => {
                  const active = isPlanned(plan, d.id, s.id, slug);
                  return (
                    <button
                      key={s.id}
                      onClick={() => toggle(d.id, s.id)}
                      aria-pressed={active}
                      aria-label={`${d.label} ${s.label.toLowerCase()}`}
                      className={`flex-1 rounded-full border px-1 py-1 text-xs transition-colors ${
                        active
                          ? "border-gold bg-gold/20 font-bold text-gold"
                          : "border-edge text-cream hover:border-gold/50"
                      }`}
                    >
                      {active ? "✓" : "+"}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
          <p className="mt-3 min-h-4 text-xs text-sage" aria-live="polite">
            {lastAction}
          </p>
        </div>
      )}
    </div>
  );
}
