"use client";

import Link from "next/link";
import { useLocalStorage } from "@/lib/useLocalStorage";
import {
  DEFAULT_COMPLETIONS,
  STORAGE_KEYS,
  todayIso,
  type CompletionsState,
} from "@/lib/storage";
import { currentStreak } from "@/lib/streak";

/** Shows only for returning users with a live streak. */
export default function StreakNudge() {
  const [completions, , hydrated] = useLocalStorage<CompletionsState>(
    STORAGE_KEYS.completions,
    DEFAULT_COMPLETIONS,
  );
  if (!hydrated) return null;

  const streak = currentStreak(completions.dates);
  if (streak === 0) return null;

  const doneToday = completions.dates.includes(todayIso());

  return (
    <Link
      href={doneToday ? "/my-temple" : "/routines"}
      className="card card-hover mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4"
    >
      <p className="text-sm text-cream/90">
        <span className="display mr-2 text-2xl text-gold tabular-nums">
          {streak}-day streak.
        </span>
        {doneToday
          ? "Today's done. See your progress →"
          : "Don't break the chain — grab 10 minutes →"}
      </p>
    </Link>
  );
}
