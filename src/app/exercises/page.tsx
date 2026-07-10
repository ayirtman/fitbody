import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo/meta";
import { Suspense } from "react";
import { exercises } from "@/data";
import ExerciseLibrary from "@/components/exercise/ExerciseLibrary";

export const metadata: Metadata = pageMeta({
  title: "Exercise Library",
  description:
    "Exercises for every muscle group - bodyweight, dumbbell, kettlebell and band - filterable by equipment, difficulty and time.",
  path: "/exercises",
});

export default function ExercisesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
        Exercise Library
      </p>
      <h1 className="display lintel mt-1 text-4xl sm:text-5xl">
        Every muscle. Covered.
      </h1>
      <p className="mt-4 max-w-xl text-muted">
        {`${exercises.length} exercises with honest time estimates. Filter by
        what you have and how long you've got - most need nothing but floor
        space.`}
      </p>
      <p className="mt-3 text-sm text-muted">
        Only got one bit of kit?{" "}
        <Link
          href="/equipment"
          className="font-medium text-gold hover:text-gold-light"
        >
          Pick your equipment
        </Link>{" "}
        and see everything that works with it.
      </p>
      <div className="mt-8">
        <Suspense>
          <ExerciseLibrary exercises={exercises} />
        </Suspense>
      </div>
    </div>
  );
}
