import Link from "next/link";
import type { Routine } from "@/lib/types";
import Badge from "@/components/ui/Badge";
import BodyMapMini from "@/components/body-map/BodyMapMini";
import { DIFFICULTY_LABELS, EQUIPMENT_LABELS } from "@/lib/filters";

const difficultyVariant = {
  beginner: "sage",
  intermediate: "gold",
  advanced: "ember",
} as const;

export default function RoutineCard({ routine }: { routine: Routine }) {
  return (
    <Link href={`/routines/${routine.slug}`} className="card flex gap-4 p-5">
      <BodyMapMini
        primary={routine.targetMuscles}
        className="h-32 w-16 shrink-0"
      />
      <div className="min-w-0">
        <h3 className="display text-2xl">{routine.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted">
          {routine.tagline}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          <Badge variant="gold">
            {routine.totalMinPerSession} min
            {routine.daysPerWeek > 1 ? ` × ${routine.daysPerWeek}/wk` : ""}
          </Badge>
          <Badge variant={difficultyVariant[routine.difficulty]}>
            {DIFFICULTY_LABELS[routine.difficulty]}
          </Badge>
          <Badge variant="outline">
            {routine.equipment.map((e) => EQUIPMENT_LABELS[e]).join(" · ")}
          </Badge>
        </div>
      </div>
    </Link>
  );
}
