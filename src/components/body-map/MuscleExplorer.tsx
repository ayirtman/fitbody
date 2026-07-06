"use client";

import { useRouter } from "next/navigation";
import type { MuscleGroup, MuscleId } from "@/lib/types";
import BodyMap from "./BodyMap";

/** Interactive map that routes to the muscle hub on selection. */
export default function MuscleExplorer({
  muscles,
  counts,
  className = "",
}: {
  muscles: MuscleGroup[];
  counts?: Partial<Record<MuscleId, number>>;
  className?: string;
}) {
  const router = useRouter();
  return (
    <BodyMap
      muscles={muscles}
      counts={counts}
      onSelect={(id) => router.push(`/muscles/${id}`)}
      className={className}
    />
  );
}
