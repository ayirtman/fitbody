"use client";

import { useRouter } from "next/navigation";
import type { BodyView, MuscleGroup, MuscleId } from "@/lib/types";
import BodyMap from "./BodyMap";

/** Interactive map that routes to the muscle hub on selection. */
export default function MuscleExplorer({
  muscles,
  counts,
  selected = null,
  defaultView,
  className = "",
}: {
  muscles: MuscleGroup[];
  counts?: Partial<Record<MuscleId, number>>;
  selected?: MuscleId | null;
  defaultView?: BodyView;
  className?: string;
}) {
  const router = useRouter();
  return (
    <BodyMap
      muscles={muscles}
      counts={counts}
      selected={selected}
      defaultView={defaultView}
      onSelect={(id) => router.push(`/muscles/${id}`)}
      className={className}
    />
  );
}
