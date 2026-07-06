"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { muscles } from "@/data/muscles";
import {
  DIFFICULTY_LABELS,
  EQUIPMENT_LABELS,
  MOMENT_LABELS,
} from "@/lib/filters";

export interface FilterConfig {
  muscle?: boolean;
  equipment?: boolean;
  difficulty?: boolean;
  maxTime?: boolean;
  moment?: boolean;
}

const selectClass =
  "rounded-full border border-edge bg-surface-1 px-3.5 py-1.5 text-sm text-cream focus:border-gold focus:outline-none";

/**
 * URL-synced filter controls. Values live in search params so quick links can
 * deep-link into a pre-filtered library.
 */
export default function FilterBar({ config }: { config: FilterConfig }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  function setParam(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    router.replace(`${pathname}${next.size ? `?${next}` : ""}`, {
      scroll: false,
    });
  }

  const hasActive = ["muscle", "equipment", "difficulty", "maxTime", "moment"]
    .some((k) => params.has(k));

  return (
    <div className="flex flex-wrap items-center gap-2">
      {config.muscle && (
        <select
          aria-label="Filter by muscle"
          className={selectClass}
          value={params.get("muscle") ?? ""}
          onChange={(e) => setParam("muscle", e.target.value)}
        >
          <option value="">All muscles</option>
          {muscles.map((m) => (
            <option key={m.id} value={m.id}>
              {m.shortName}
            </option>
          ))}
        </select>
      )}
      {config.equipment && (
        <select
          aria-label="Filter by equipment"
          className={selectClass}
          value={params.get("equipment") ?? ""}
          onChange={(e) => setParam("equipment", e.target.value)}
        >
          <option value="">Any equipment</option>
          {Object.entries(EQUIPMENT_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      )}
      {config.difficulty && (
        <select
          aria-label="Filter by difficulty"
          className={selectClass}
          value={params.get("difficulty") ?? ""}
          onChange={(e) => setParam("difficulty", e.target.value)}
        >
          <option value="">Any level</option>
          {Object.entries(DIFFICULTY_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      )}
      {config.moment && (
        <select
          aria-label="Filter by moment"
          className={selectClass}
          value={params.get("moment") ?? ""}
          onChange={(e) => setParam("moment", e.target.value)}
        >
          <option value="">Any time of day</option>
          {Object.entries(MOMENT_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      )}
      {config.maxTime && (
        <select
          aria-label="Filter by time"
          className={selectClass}
          value={params.get("maxTime") ?? ""}
          onChange={(e) => setParam("maxTime", e.target.value)}
        >
          <option value="">Any duration</option>
          <option value="3">≤ 3 min</option>
          <option value="5">≤ 5 min</option>
          <option value="10">≤ 10 min</option>
        </select>
      )}
      {hasActive && (
        <button
          onClick={() => router.replace(pathname, { scroll: false })}
          className="text-sm font-medium text-gold hover:text-gold-light"
        >
          Clear
        </button>
      )}
    </div>
  );
}
