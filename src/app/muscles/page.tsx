import type { Metadata } from "next";
import { muscles } from "@/data/muscles";
import MuscleExplorer from "@/components/body-map/MuscleExplorer";
import MuscleChips from "@/components/body-map/MuscleChips";

export const metadata: Metadata = {
  title: "Muscle Map",
  description:
    "Pick a muscle, get the plan: exercises, stretches and physio moves for every muscle group, mapped on an interactive body.",
};

export default function MusclesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
        The Muscle Map
      </p>
      <h1 className="display lintel mt-1 text-4xl sm:text-5xl">
        Pick a muscle. Get the plan.
      </h1>
      <p className="mt-4 max-w-xl text-muted">
        Tap any muscle to see the exercises that build it, the stretches that
        free it, and the physio moves that fix it.
      </p>
      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_1fr]">
        <MuscleExplorer
          muscles={muscles}
          className="h-[520px] rounded-2xl border border-edge bg-surface-1/50 p-4"
        />
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">
            All muscle groups
          </h2>
          <MuscleChips muscles={muscles} className="mt-4" />
        </div>
      </div>
    </div>
  );
}
