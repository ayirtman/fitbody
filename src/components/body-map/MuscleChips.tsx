import Link from "next/link";
import type { MuscleGroup, MuscleId } from "@/lib/types";

/**
 * Chip-grid twin of the body map — the touch/screen-reader-friendly way to
 * browse muscles, and the fallback for tiny screens.
 */
export default function MuscleChips({
  muscles,
  selected,
  counts,
  className = "",
}: {
  muscles: MuscleGroup[];
  selected?: MuscleId | null;
  counts?: Partial<Record<MuscleId, number>>;
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {muscles.map((m) => {
        const active = selected === m.id;
        return (
          <Link
            key={m.id}
            href={`/muscles/${m.id}`}
            aria-current={active ? "page" : undefined}
            className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
              active
                ? "border-gold bg-gold text-ink"
                : "border-edge bg-surface-1 text-muted hover:border-gold/40 hover:text-cream"
            }`}
          >
            {m.shortName}
            {counts?.[m.id] != null && (
              <span className={active ? "text-ink/60" : "text-muted/60"}>
                {" "}
                {counts[m.id]}
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
}
