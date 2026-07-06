"use client";

import { useMemo, useRef, useState } from "react";
import type { BodyView, MuscleId } from "@/lib/types";
import type { MuscleGroup } from "@/lib/types";
import {
  VIEWBOX,
  MIRROR_TRANSFORM,
  SILHOUETTE_HALF,
  regionsByView,
  decorByView,
} from "./geometry";

interface BodyMapProps {
  muscles: MuscleGroup[];
  selected?: MuscleId | null;
  onSelect?: (id: MuscleId) => void;
  view?: BodyView;
  onViewChange?: (view: BodyView) => void;
  /** Initial view when uncontrolled (default "front") */
  defaultView?: BodyView;
  /** Optional exercise counts shown in the hover chip */
  counts?: Partial<Record<MuscleId, number>>;
  className?: string;
}

export default function BodyMap({
  muscles,
  selected = null,
  onSelect,
  view: controlledView,
  onViewChange,
  defaultView = "front",
  counts,
  className = "",
}: BodyMapProps) {
  const [internalView, setInternalView] = useState<BodyView>(defaultView);
  const view = controlledView ?? internalView;
  const setView = (v: BodyView) => {
    setInternalView(v);
    onViewChange?.(v);
  };

  const [hovered, setHovered] = useState<MuscleId | null>(null);
  const [chipPos, setChipPos] = useState<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const nameById = useMemo(
    () => new Map(muscles.map((m) => [m.id, m.shortName])),
    [muscles],
  );

  const regions = regionsByView[view];
  const decor = decorByView[view];

  function stateFor(id: MuscleId): string | undefined {
    if (selected === id) return "selected";
    return undefined;
  }

  function handleMove(e: React.MouseEvent) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setChipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  const hoveredLabel =
    hovered &&
    `${nameById.get(hovered) ?? hovered}${
      counts?.[hovered] != null ? ` · ${counts[hovered]} exercises` : ""
    }`;

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div
        className="absolute left-1/2 top-0 z-10 flex -translate-x-1/2 rounded-full border border-edge bg-surface-1 p-1"
        role="tablist"
        aria-label="Body view"
      >
        {(["front", "back"] as const).map((v) => (
          <button
            key={v}
            role="tab"
            aria-selected={view === v}
            onClick={() => setView(v)}
            className={`rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wider transition-colors ${
              view === v ? "bg-gold text-ink" : "text-muted hover:text-cream"
            }`}
          >
            {v}
          </button>
        ))}
      </div>

      {hoveredLabel && chipPos && (
        <div
          className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-full border border-gold/40 bg-surface-1 px-3 py-1 text-xs font-semibold text-gold"
          style={{ left: chipPos.x, top: chipPos.y - 10 }}
        >
          {hoveredLabel}
        </div>
      )}

      <svg
        key={view}
        viewBox={VIEWBOX}
        role="group"
        aria-label={`Muscle map, ${view} view`}
        className="fade-in mx-auto h-full w-auto max-w-full pt-10"
        onMouseMove={handleMove}
        onMouseLeave={() => {
          setHovered(null);
          setChipPos(null);
        }}
      >
        <path className="body-silhouette" d={SILHOUETTE_HALF} />
        <path
          className="body-silhouette"
          d={SILHOUETTE_HALF}
          transform={MIRROR_TRANSFORM}
        />

        {regions.map((region) => {
          const label = `${nameById.get(region.muscleId) ?? region.muscleId}${
            counts?.[region.muscleId] != null
              ? ` - ${counts[region.muscleId]} exercises`
              : ""
          }`;
          const shared = {
            className: "muscle-plate",
            "data-state": stateFor(region.muscleId),
            "data-hovered": hovered === region.muscleId || undefined,
            onMouseEnter: () => setHovered(region.muscleId),
            onMouseLeave: () =>
              setHovered((h) => (h === region.muscleId ? null : h)),
            onClick: () => onSelect?.(region.muscleId),
          } as const;
          return (
            <g key={`${view}-${region.muscleId}-${region.d.slice(0, 24)}`}>
              <path
                {...shared}
                d={region.d}
                role="button"
                tabIndex={0}
                aria-label={label}
                aria-pressed={selected === region.muscleId}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelect?.(region.muscleId);
                  }
                }}
              />
              {region.mirror && (
                <path
                  {...shared}
                  d={region.d}
                  transform={MIRROR_TRANSFORM}
                  aria-hidden="true"
                />
              )}
            </g>
          );
        })}

        {decor.map((d) => (
          <path key={d} className="body-detail-line" d={d} />
        ))}
      </svg>
    </div>
  );
}
