import Link from "next/link";
import type { Movement } from "@/data";
import Badge from "@/components/ui/Badge";
import BodyMapMini from "@/components/body-map/BodyMapMini";
import { DIFFICULTY_LABELS, EQUIPMENT_LABELS } from "@/lib/filters";

const difficultyVariant = {
  beginner: "sage",
  intermediate: "gold",
  advanced: "ember",
} as const;

export default function MovementCard({
  movement,
  href,
  kindLabel,
}: {
  movement: Movement;
  href: string;
  kindLabel?: string;
}) {
  return (
    <Link href={href} className="card flex gap-4 p-4">
      <BodyMapMini
        primary={movement.primaryMuscles}
        secondary={movement.secondaryMuscles}
        className="h-28 w-14 shrink-0"
      />
      <div className="min-w-0">
        {kindLabel && (
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gold">
            {kindLabel}
          </p>
        )}
        <h3 className="display mt-0.5 truncate text-xl">{movement.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted">
          {movement.description}
        </p>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          <Badge variant={difficultyVariant[movement.difficulty]}>
            {DIFFICULTY_LABELS[movement.difficulty]}
          </Badge>
          <Badge variant="outline">
            {movement.equipment.map((e) => EQUIPMENT_LABELS[e]).join(" · ")}
          </Badge>
          <Badge variant="outline">~{movement.timeEstimateMin} min</Badge>
        </div>
      </div>
    </Link>
  );
}
