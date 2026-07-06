"use client";

import { useSearchParams } from "next/navigation";
import type { Stretch, StretchMoment } from "@/lib/types";
import { filterStretches, type MovementFilters } from "@/lib/filters";
import MovementCard from "./MovementCard";
import FilterBar from "@/components/filters/FilterBar";

export default function StretchLibrary({ stretches }: { stretches: Stretch[] }) {
  const params = useSearchParams();
  const filters: MovementFilters & { moment?: StretchMoment } = {
    muscle: (params.get("muscle") as MovementFilters["muscle"]) ?? undefined,
    moment: (params.get("moment") as StretchMoment) ?? undefined,
  };
  const results = filterStretches(stretches, filters);

  return (
    <div>
      <FilterBar config={{ muscle: true, moment: true }} />
      <p className="mt-4 text-sm text-muted" aria-live="polite">
        {results.length} stretch{results.length === 1 ? "" : "es"}
      </p>
      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {results.map((s) => (
          <MovementCard
            key={s.slug}
            movement={s}
            href={`/flexibility/${s.slug}`}
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
