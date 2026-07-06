import Link from "next/link";
import type { Movement } from "@/data";
import { muscleById } from "@/data/muscles";
import type { FavoriteKind } from "@/lib/storage";
import Badge from "@/components/ui/Badge";
import BodyMapMini from "@/components/body-map/BodyMapMini";
import FavoriteButton from "@/components/progress/FavoriteButton";
import { DIFFICULTY_LABELS, EQUIPMENT_LABELS } from "@/lib/filters";

const difficultyVariant = {
  beginner: "sage",
  intermediate: "gold",
  advanced: "ember",
} as const;

/**
 * Shared detail layout for exercises, stretches and physio moves.
 * Kind-specific info (sets/reps, hold time, frequency) renders via children.
 */
export default function MovementDetail({
  movement,
  favoriteKind,
  eyebrow,
  children,
}: {
  movement: Movement;
  favoriteKind: FavoriteKind;
  eyebrow: string;
  children?: React.ReactNode;
}) {
  return (
    <article className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            {eyebrow}
          </p>
          <h1 className="display lintel mt-1 text-4xl sm:text-5xl">
            {movement.name}
          </h1>
          <p className="mt-4 text-muted">{movement.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant={difficultyVariant[movement.difficulty]}>
              {DIFFICULTY_LABELS[movement.difficulty]}
            </Badge>
            <Badge variant="outline">
              {movement.equipment.map((e) => EQUIPMENT_LABELS[e]).join(" · ")}
            </Badge>
            <Badge variant="outline">~{movement.timeEstimateMin} min</Badge>
          </div>
        </div>
        <FavoriteButton kind={favoriteKind} slug={movement.slug} />
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-[280px_1fr]">
        <aside>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">
            Muscles worked
          </h2>
          <BodyMapMini
            primary={movement.primaryMuscles}
            secondary={movement.secondaryMuscles}
            className="mx-auto mt-4 h-72"
          />
          <div className="mt-4 flex flex-wrap gap-1.5">
            {movement.primaryMuscles.map((m) => (
              <Link key={m} href={`/muscles/${m}`}>
                <Badge variant="gold">{muscleById.get(m)?.shortName ?? m}</Badge>
              </Link>
            ))}
            {movement.secondaryMuscles.map((m) => (
              <Link key={m} href={`/muscles/${m}`}>
                <Badge variant="outline">
                  {muscleById.get(m)?.shortName ?? m}
                </Badge>
              </Link>
            ))}
          </div>
        </aside>

        <div className="space-y-8">
          {children}

          <section>
            <h2 className="display lintel text-2xl">How to do it</h2>
            <ol className="mt-5 space-y-3">
              {movement.steps.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="display flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-2 text-base text-gold">
                    {i + 1}
                  </span>
                  <p className="pt-1 text-sm leading-relaxed text-cream/90">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          <section className="rounded-xl border border-ember/25 bg-ember/5 p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-ember">
              Common mistakes
            </h2>
            <ul className="mt-3 space-y-2">
              {movement.commonMistakes.map((m) => (
                <li key={m} className="flex gap-2 text-sm text-cream/85">
                  <span aria-hidden="true" className="text-ember">
                    ✕
                  </span>
                  {m}
                </li>
              ))}
            </ul>
          </section>

          {movement.tips && movement.tips.length > 0 && (
            <section className="rounded-xl border border-sage/25 bg-sage/5 p-5">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-sage">
                Dad tips
              </h2>
              <ul className="mt-3 space-y-2">
                {movement.tips.map((t) => (
                  <li key={t} className="flex gap-2 text-sm text-cream/85">
                    <span aria-hidden="true" className="text-sage">
                      ✓
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </article>
  );
}
