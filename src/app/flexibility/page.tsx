import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo/meta";
import { Suspense } from "react";
import { routines, stretches } from "@/data";
import StretchLibrary from "@/components/exercise/StretchLibrary";
import RoutineCard from "@/components/routine/RoutineCard";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata: Metadata = pageMeta({
  title: "Flexibility & Mobility",
  description:
    "Stretches for every muscle - by single muscle, by area, or as ready-made mobility routines for mornings and post-desk evenings.",
  path: "/flexibility",
});

export default function FlexibilityPage() {
  const mobilityRoutines = routines.filter(
    (r) => r.category === "mobility" || r.category === "recovery",
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
        Flexibility
      </p>
      <h1 className="display lintel mt-1 text-4xl sm:text-5xl">
        Undo the desk. Unlock the body.
      </h1>
      <p className="mt-4 max-w-xl text-muted">
        Target one tight muscle or flow through a full routine. Every stretch
        tells you exactly how long to hold and when it works best.
      </p>

      <section className="mt-12">
        <SectionHeader eyebrow="Ready-made" title="Mobility routines" />
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {mobilityRoutines.map((r) => (
            <RoutineCard key={r.slug} routine={r} />
          ))}
        </div>
      </section>

      <section className="mt-14">
        <SectionHeader eyebrow="One muscle at a time" title="All stretches" />
        <div className="mt-6">
          <Suspense>
            <StretchLibrary stretches={stretches} />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
