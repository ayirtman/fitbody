import Link from "next/link";
import type { RoutineDay, RoutineItem } from "@/lib/types";
import { resolveRoutineItem } from "@/data";
import Badge from "@/components/ui/Badge";

function hrefFor(item: RoutineItem): string {
  const mv = resolveRoutineItem(item);
  if (!mv) return "#";
  if (item.refKind === "exercise") return `/exercises/${mv.slug}`;
  if (item.refKind === "stretch") return `/flexibility/${mv.slug}`;
  return `/physio/${(mv as { complaints: string[] }).complaints[0]}/${mv.slug}`;
}

function prescription(item: RoutineItem): string {
  const parts: string[] = [];
  if (item.sets && item.reps) parts.push(`${item.sets} × ${item.reps}`);
  else if (item.reps) parts.push(item.reps);
  if (item.holdSec) parts.push(`hold ${item.holdSec}s`);
  if (item.restSec) parts.push(`rest ${item.restSec}s`);
  return parts.join(" · ");
}

const kindLabel = {
  exercise: "Exercise",
  stretch: "Stretch",
  physio: "Physio",
} as const;

export default function RoutineDayView({ day }: { day: RoutineDay }) {
  return (
    <div className="card overflow-hidden">
      <div className="flex items-baseline justify-between gap-4 border-b border-edge bg-surface-2/60 px-5 py-4">
        <div>
          <h3 className="display text-2xl">{day.dayLabel}</h3>
          <p className="mt-0.5 text-sm text-muted">{day.focus}</p>
        </div>
        <Badge variant="gold">{day.totalMin} min</Badge>
      </div>
      <div className="divide-y divide-edge">
        {day.blocks.map((block) => (
          <div key={block.label} className="px-5 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gold">
              {block.label}
            </p>
            <ul className="mt-3 space-y-2.5">
              {block.items.map((item, i) => {
                const mv = resolveRoutineItem(item);
                if (!mv) return null;
                return (
                  <li
                    key={`${item.ref}-${i}`}
                    className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1"
                  >
                    <Link
                      href={hrefFor(item)}
                      className="font-medium text-cream transition-colors hover:text-gold"
                    >
                      {mv.name}
                      <span className="ml-2 text-[10px] font-semibold uppercase tracking-wider text-muted">
                        {kindLabel[item.refKind]}
                      </span>
                    </Link>
                    <span className="text-sm text-muted tabular-nums">
                      {prescription(item)}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
