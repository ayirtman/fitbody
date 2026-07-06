import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { MuscleId } from "@/lib/types";
import {
  muscles,
  muscleById,
  exercisesByMuscle,
  stretchesByMuscle,
  physioByMuscle,
  exerciseCountByMuscle,
} from "@/data";
import MuscleExplorer from "@/components/body-map/MuscleExplorer";
import MuscleChips from "@/components/body-map/MuscleChips";
import { bestViewFor } from "@/components/body-map/geometry";
import MovementCard from "@/components/exercise/MovementCard";

export function generateStaticParams() {
  return muscles.map((m) => ({ muscle: m.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ muscle: string }>;
}): Promise<Metadata> {
  const { muscle } = await params;
  const group = muscleById.get(muscle as MuscleId);
  if (!group) return {};
  return {
    title: group.name,
    description: `Exercises, stretches and physio moves for your ${group.shortName.toLowerCase()}. ${group.blurb}`,
  };
}

export default async function MusclePage({
  params,
}: {
  params: Promise<{ muscle: string }>;
}) {
  const { muscle } = await params;
  const id = muscle as MuscleId;
  const group = muscleById.get(id);
  if (!group) notFound();

  const exList = exercisesByMuscle(id);
  const stList = stretchesByMuscle(id);
  const phList = physioByMuscle(id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
        <aside>
          <MuscleExplorer
            key={id}
            muscles={muscles}
            counts={exerciseCountByMuscle}
            selected={id}
            defaultView={bestViewFor([id])}
            className="mx-auto h-96"
          />
          <p className="mt-2 text-center text-xs text-muted">
            Tap any muscle to jump to it
          </p>
        </aside>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Muscle Group
          </p>
          <h1 className="display lintel mt-1 text-4xl sm:text-5xl">
            {group.name}
          </h1>
          <p className="mt-4 max-w-xl text-muted">{group.blurb}</p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted">
            <span>
              <strong className="text-gold">{exList.length}</strong> exercises
            </span>
            <span>
              <strong className="text-gold">{stList.length}</strong> stretches
            </span>
            {phList.length > 0 && (
              <span>
                <strong className="text-gold">{phList.length}</strong> physio
                moves
              </span>
            )}
          </div>
          <MuscleChips muscles={muscles} selected={id} className="mt-8" />
        </div>
      </div>

      <section className="mt-14">
        <h2 className="display lintel text-3xl">Build it</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {exList.map((e) => (
            <MovementCard
              key={e.slug}
              movement={e}
              href={`/exercises/${e.slug}`}
              kindLabel="Exercise"
            />
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="display lintel text-3xl">Free it up</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {stList.map((s) => (
            <MovementCard
              key={s.slug}
              movement={s}
              href={`/flexibility/${s.slug}`}
              kindLabel="Stretch"
            />
          ))}
        </div>
      </section>

      {phList.length > 0 && (
        <section className="mt-14">
          <h2 className="display lintel text-3xl">Fix what hurts</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {phList.map((p) => (
              <MovementCard
                key={p.slug}
                movement={p}
                href={`/physio/${p.complaints[0]}/${p.slug}`}
                kindLabel="Physio"
              />
            ))}
          </div>
          <p className="mt-4 text-xs text-muted">
            Physio moves are general education, not medical advice.{" "}
            <Link href="/physio" className="text-gold hover:text-gold-light">
              Read the full guidance →
            </Link>
          </p>
        </section>
      )}
    </div>
  );
}
