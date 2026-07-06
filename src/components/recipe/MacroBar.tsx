import type { Recipe } from "@/lib/types";

/**
 * Visual macro split: protein / carbs / fat share of calories, plus the
 * headline numbers. Fiber gets its own stat since it's a core app metric.
 */
export default function MacroBar({ macros }: { macros: Recipe["macros"] }) {
  const pCal = macros.proteinG * 4;
  const cCal = macros.carbsG * 4;
  const fCal = macros.fatG * 9;
  const total = pCal + cCal + fCal || 1;

  const segments = [
    { label: "Protein", cal: pCal, grams: macros.proteinG, color: "bg-gold" },
    { label: "Carbs", cal: cCal, grams: macros.carbsG, color: "bg-slate-400" },
    { label: "Fat", cal: fCal, grams: macros.fatG, color: "bg-ember" },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">
            Calories
          </p>
          <p className="display mt-0.5 text-3xl tabular-nums">
            {macros.calories}
          </p>
        </div>
        {segments.map((s) => (
          <div key={s.label}>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">
              {s.label}
            </p>
            <p className="display mt-0.5 text-3xl tabular-nums">{s.grams}g</p>
          </div>
        ))}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-sage">
            Fiber
          </p>
          <p className="display mt-0.5 text-3xl text-sage tabular-nums">
            {macros.fiberG}g
          </p>
        </div>
      </div>
      <div
        className="mt-4 flex h-2.5 overflow-hidden rounded-full"
        role="img"
        aria-label={`Calorie split: ${Math.round((pCal / total) * 100)}% protein, ${Math.round((cCal / total) * 100)}% carbs, ${Math.round((fCal / total) * 100)}% fat`}
      >
        {segments.map((s) => (
          <div
            key={s.label}
            className={s.color}
            style={{ width: `${(s.cal / total) * 100}%` }}
          />
        ))}
      </div>
      <div className="mt-2 flex gap-4 text-xs text-muted">
        <span>
          <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-gold" />
          Protein
        </span>
        <span>
          <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-slate-400" />
          Carbs
        </span>
        <span>
          <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-ember" />
          Fat
        </span>
      </div>
    </div>
  );
}
