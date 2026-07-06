"use client";

import { useSearchParams } from "next/navigation";
import type { Exercise } from "@/lib/types";
import { filterExercises, type MovementFilters } from "@/lib/filters";
import MovementCard from "./MovementCard";
import FilterBar from "@/components/filters/FilterBar";

export default function ExerciseLibrary({
  exercises,
}: {
  exercises: Exercise[];
}) {
  const params = useSearchParams();
  const filters: MovementFilters = {
    muscle: (params.get("muscle") as MovementFilters["muscle"]) ?? undefined,
    equipment:
      (params.get("equipment") as MovementFilters["equipment"]) ?? undefined,
    difficulty:
      (params.get("difficulty") as MovementFilters["difficulty"]) ?? undefined,
    maxTime: params.get("maxTime") ? Number(params.get("maxTime")) : undefined,
  };
  const results = filterExercises(exercises, filters);

  return (
    <div>
      <FilterBar
        config={{ muscle: true, equipment: true, difficulty: true, maxTime: true }}
      />
      <p className="mt-4 text-sm text-muted" aria-live="polite">
        {results.length} exercise{results.length === 1 ? "" : "s"}
      </p>
      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {results.map((e) => (
          <MovementCard
            key={e.slug}
            movement={e}
            href={`/exercises/${e.slug}`}
          />
        ))}
      </div>
      {results.length === 0 && (
        <p className="mt-8 text-muted">
          Nothing matches that combination — loosen a filter and try again.
        </p>
      )}
    </div>
  );
}
