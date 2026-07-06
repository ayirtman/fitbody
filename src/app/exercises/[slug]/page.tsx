import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { exercises, exerciseBySlug, relatedExercises } from "@/data";
import MovementDetail from "@/components/exercise/MovementDetail";
import MovementCard from "@/components/exercise/MovementCard";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import GearKit from "@/components/gear/GearKit";
import JsonLd from "@/components/seo/JsonLd";
import { howToSchema } from "@/lib/seo/schema";
import { pageMeta } from "@/lib/seo/meta";

export function generateStaticParams() {
  return exercises.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const exercise = exerciseBySlug.get(slug);
  if (!exercise) return {};
  return pageMeta({
    title: exercise.name,
    description: exercise.description,
    path: `/exercises/${exercise.slug}`,
    type: "article",
  });
}

export default async function ExercisePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const exercise = exerciseBySlug.get(slug);
  if (!exercise) notFound();

  const related = relatedExercises(exercise);
  const g = exercise.setsRepsGuidance;

  return (
    <>
      <JsonLd data={howToSchema(exercise, `/exercises/${exercise.slug}`)} />
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Exercises", href: "/exercises" },
            { name: exercise.name, href: `/exercises/${exercise.slug}` },
          ]}
        />
      </div>
      <MovementDetail
        movement={exercise}
        favoriteKind="exercises"
        eyebrow="Exercise"
      >
        <section className="card grid grid-cols-3 gap-4 p-5 text-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">
              Sets
            </p>
            <p className="display mt-1 text-3xl text-gold tabular-nums">
              {g.sets}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">
              Reps
            </p>
            <p className="display mt-1 text-3xl text-gold tabular-nums">
              {g.reps}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">
              Rest
            </p>
            <p className="display mt-1 text-3xl text-gold tabular-nums">
              {g.rest}
            </p>
          </div>
          {g.tempoNote && (
            <p className="col-span-3 border-t border-edge pt-3 text-sm text-muted">
              {g.tempoNote}
            </p>
          )}
        </section>
        <GearKit equipment={exercise.equipment} />
      </MovementDetail>

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6">
          <h2 className="display lintel text-2xl">Same muscles, new angle</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {related.map((e) => (
              <MovementCard
                key={e.slug}
                movement={e}
                href={`/exercises/${e.slug}`}
              />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
