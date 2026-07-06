import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { routines, routineBySlug } from "@/data";
import { muscleById } from "@/data/muscles";
import Badge from "@/components/ui/Badge";
import BodyMapMini from "@/components/body-map/BodyMapMini";
import RoutineDayView from "@/components/routine/RoutineDayView";
import MarkDoneButton from "@/components/progress/MarkDoneButton";
import FavoriteButton from "@/components/progress/FavoriteButton";
import { DIFFICULTY_LABELS, EQUIPMENT_LABELS } from "@/lib/filters";

export function generateStaticParams() {
  return routines.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const routine = routineBySlug.get(slug);
  if (!routine) return {};
  return { title: routine.name, description: routine.tagline };
}

export default async function RoutinePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const routine = routineBySlug.get(slug);
  if (!routine) notFound();

  return (
    <article className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Routine
          </p>
          <h1 className="display lintel mt-1 text-4xl sm:text-5xl">
            {routine.name}
          </h1>
          <p className="mt-4 text-muted">{routine.tagline}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="gold">
              {routine.totalMinPerSession} min/session
            </Badge>
            {routine.daysPerWeek > 1 && (
              <Badge variant="gold">{routine.daysPerWeek} days/week</Badge>
            )}
            <Badge variant="outline">
              {DIFFICULTY_LABELS[routine.difficulty]}
            </Badge>
            <Badge variant="outline">
              {routine.equipment.map((e) => EQUIPMENT_LABELS[e]).join(" · ")}
            </Badge>
          </div>
        </div>
        <FavoriteButton kind="routines" slug={routine.slug} />
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-[260px_1fr]">
        <aside>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">
            Targets
          </h2>
          <BodyMapMini
            primary={routine.targetMuscles}
            className="mx-auto mt-4 h-72"
          />
          <div className="mt-4 flex flex-wrap gap-1.5">
            {routine.targetMuscles.map((m) => (
              <Badge key={m} variant="gold">
                {muscleById.get(m)?.shortName ?? m}
              </Badge>
            ))}
          </div>
        </aside>

        <div>
          <MarkDoneButton routineSlug={routine.slug} />
          <div className="mt-6 space-y-6">
            {routine.days.map((day) => (
              <RoutineDayView key={day.dayLabel} day={day} />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
