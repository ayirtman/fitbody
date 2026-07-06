"use client";

import { useLocalStorage } from "@/lib/useLocalStorage";
import {
  DEFAULT_COMPLETIONS,
  STORAGE_KEYS,
  todayIso,
  type CompletionsState,
} from "@/lib/storage";
import { currentStreak } from "@/lib/streak";

export default function MarkDoneButton({
  routineSlug,
}: {
  routineSlug: string;
}) {
  const [completions, setCompletions, hydrated] =
    useLocalStorage<CompletionsState>(
      STORAGE_KEYS.completions,
      DEFAULT_COMPLETIONS,
    );

  const today = todayIso();
  const doneToday =
    hydrated &&
    (completions.byDate[today] ?? []).some((e) => e.routineSlug === routineSlug);
  const streak = hydrated ? currentStreak(completions.dates) : 0;

  function markDone() {
    setCompletions((prev) => {
      const entries = prev.byDate[today] ?? [];
      if (entries.some((e) => e.routineSlug === routineSlug)) return prev;
      return {
        dates: prev.dates.includes(today) ? prev.dates : [...prev.dates, today],
        byDate: { ...prev.byDate, [today]: [...entries, { routineSlug }] },
      };
    });
  }

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={markDone}
        disabled={doneToday}
        className={`rounded-full px-6 py-2.5 text-sm font-bold transition-colors ${
          doneToday
            ? "cursor-default bg-sage/20 text-sage"
            : "bg-gold text-ink hover:bg-gold-light"
        }`}
      >
        {doneToday ? "✓ Done today" : "Mark today done"}
      </button>
      {streak > 0 && (
        <p className="text-sm text-muted">
          <span className="display text-xl text-gold tabular-nums">
            {streak}
          </span>{" "}
          day streak
        </p>
      )}
    </div>
  );
}
