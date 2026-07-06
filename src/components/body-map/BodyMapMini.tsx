import type { BodyView, MuscleId } from "@/lib/types";
import {
  VIEWBOX,
  MIRROR_TRANSFORM,
  SILHOUETTE_HALF,
  regionsByView,
  decorByView,
  bestViewFor,
} from "./geometry";

interface BodyMapMiniProps {
  primary: MuscleId[];
  secondary?: MuscleId[];
  /** Force a view; otherwise picks the one showing the most primary muscles */
  view?: BodyView;
  className?: string;
}

/**
 * Small, non-interactive body diagram highlighting worked muscles.
 * Server-renderable — no client JS.
 */
export default function BodyMapMini({
  primary,
  secondary = [],
  view,
  className = "",
}: BodyMapMiniProps) {
  const resolvedView = view ?? bestViewFor(primary);
  const regions = regionsByView[resolvedView];
  const decor = decorByView[resolvedView];

  function stateFor(id: MuscleId): string | undefined {
    if (primary.includes(id)) return "primary";
    if (secondary.includes(id)) return "secondary";
    return undefined;
  }

  return (
    <svg
      viewBox={VIEWBOX}
      role="img"
      aria-label={`Muscles worked (${resolvedView} view): ${primary.join(", ")}`}
      className={className}
    >
      <path className="body-silhouette" d={SILHOUETTE_HALF} />
      <path
        className="body-silhouette"
        d={SILHOUETTE_HALF}
        transform={MIRROR_TRANSFORM}
      />
      {regions.map((region) => (
        <g key={`${resolvedView}-${region.muscleId}-${region.d.slice(0, 24)}`}>
          <path
            className="muscle-plate muscle-plate-static"
            data-state={stateFor(region.muscleId)}
            d={region.d}
          />
          {region.mirror && (
            <path
              className="muscle-plate muscle-plate-static"
              data-state={stateFor(region.muscleId)}
              d={region.d}
              transform={MIRROR_TRANSFORM}
            />
          )}
        </g>
      ))}
      {decor.map((d) => (
        <path key={d} className="body-detail-line" d={d} />
      ))}
    </svg>
  );
}
