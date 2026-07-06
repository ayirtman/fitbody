"use client";

import type { Recipe } from "@/lib/types";
import { useLocalStorage } from "@/lib/useLocalStorage";
import {
  DEFAULT_CALCULATOR,
  STORAGE_KEYS,
  type CalculatorState,
} from "@/lib/storage";
import { computeTargets, suggestDayPlan } from "@/lib/nutritionMath";
import RecipeCard from "@/components/recipe/RecipeCard";

const activities: { id: CalculatorState["activity"]; label: string; hint: string }[] = [
  { id: "low", label: "Mostly desk", hint: "Sitting most of the day" },
  { id: "moderate", label: "On my feet some", hint: "Walks, chores, chasing kids" },
  { id: "high", label: "Active", hint: "Training or physical work most days" },
];

const goals: { id: CalculatorState["goal"]; label: string }[] = [
  { id: "lean-out", label: "Lean out" },
  { id: "maintain", label: "Maintain" },
  { id: "build", label: "Build" },
];

export default function TargetCalculator({ recipes }: { recipes: Recipe[] }) {
  const [input, setInput] = useLocalStorage<CalculatorState>(
    STORAGE_KEYS.calculator,
    DEFAULT_CALCULATOR,
  );

  const weightValid = input.weight >= 40 && input.weight <= 500;
  const targets = computeTargets(
    weightValid ? input : { ...input, weight: DEFAULT_CALCULATOR.weight, unit: "kg" },
  );
  const plan = suggestDayPlan(recipes, targets);

  return (
    <div>
      <div className="card grid gap-6 p-6 md:grid-cols-3">
        <div>
          <label
            htmlFor="weight"
            className="text-xs font-semibold uppercase tracking-wider text-muted"
          >
            Bodyweight
          </label>
          <div className="mt-2 flex items-center gap-2">
            <input
              id="weight"
              type="number"
              min={40}
              max={500}
              value={Number.isFinite(input.weight) ? input.weight : ""}
              onChange={(e) =>
                setInput((p) => ({ ...p, weight: Number(e.target.value) }))
              }
              className="w-24 rounded-xl border border-edge bg-surface-2 px-3 py-2 text-lg font-semibold text-cream tabular-nums focus:border-gold focus:outline-none"
            />
            <div className="flex rounded-full border border-edge p-0.5">
              {(["kg", "lb"] as const).map((u) => (
                <button
                  key={u}
                  onClick={() => setInput((p) => ({ ...p, unit: u }))}
                  aria-pressed={input.unit === u}
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    input.unit === u ? "bg-gold text-ink" : "text-muted"
                  }`}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>
          {!weightValid && (
            <p className="mt-2 text-xs text-ember">
              Enter a weight between 40 and 500 - using a default meanwhile.
            </p>
          )}
        </div>

        <fieldset>
          <legend className="text-xs font-semibold uppercase tracking-wider text-muted">
            Typical day
          </legend>
          <div className="mt-2 space-y-1.5">
            {activities.map((a) => (
              <button
                key={a.id}
                onClick={() => setInput((p) => ({ ...p, activity: a.id }))}
                aria-pressed={input.activity === a.id}
                className={`block w-full rounded-xl border px-3 py-2 text-left text-sm transition-colors ${
                  input.activity === a.id
                    ? "border-gold bg-gold/10 text-cream"
                    : "border-edge text-muted hover:border-gold/40"
                }`}
              >
                <span className="font-semibold">{a.label}</span>
                <span className="block text-xs opacity-70">{a.hint}</span>
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-xs font-semibold uppercase tracking-wider text-muted">
            Goal
          </legend>
          <div className="mt-2 space-y-1.5">
            {goals.map((g) => (
              <button
                key={g.id}
                onClick={() => setInput((p) => ({ ...p, goal: g.id }))}
                aria-pressed={input.goal === g.id}
                className={`block w-full rounded-xl border px-3 py-2 text-left text-sm font-semibold transition-colors ${
                  input.goal === g.id
                    ? "border-gold bg-gold/10 text-cream"
                    : "border-edge text-muted hover:border-gold/40"
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="card p-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">
            Daily calories
          </p>
          <p className="display mt-2 text-5xl tabular-nums">
            {targets.calories}
          </p>
        </div>
        <div className="card border-gold/30 p-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-gold">
            Protein target
          </p>
          <p className="display mt-2 text-5xl text-gold tabular-nums">
            {targets.proteinG}g
          </p>
        </div>
        <div className="card border-sage/30 p-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-sage">
            Fiber target
          </p>
          <p className="display mt-2 text-5xl text-sage tabular-nums">
            {targets.fiberG}g
          </p>
        </div>
      </div>

      {plan && (
        <section className="mt-12">
          <h2 className="display lintel text-3xl">A day that gets you there</h2>
          <p className="mt-3 text-sm text-muted">
            Straight from the recipe library - this combination lands at{" "}
            <strong className="text-gold">{plan.totals.proteinG}g protein</strong>,{" "}
            <strong className="text-sage">{plan.totals.fiberG}g fiber</strong> and{" "}
            <strong className="text-cream">{plan.totals.calories} kcal</strong>{" "}
            before sides and snacks.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <RecipeCard recipe={plan.breakfast} />
            <RecipeCard recipe={plan.lunch} />
            <RecipeCard recipe={plan.dinner} />
            {plan.snack && <RecipeCard recipe={plan.snack} />}
          </div>
        </section>
      )}
    </div>
  );
}
