import type { Metadata } from "next";
import { recipes } from "@/data";
import TargetCalculator from "@/components/nutrition/TargetCalculator";

export const metadata: Metadata = {
  title: "Protein & Fiber Targets",
  description:
    "Work out your daily protein, fiber and calorie targets with a transparent formula - then see recipes that hit them.",
};

export default function NutritionPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
        Nutrition Targets
      </p>
      <h1 className="display lintel mt-1 text-4xl sm:text-5xl">
        Know your numbers.
      </h1>
      <p className="mt-4 max-w-xl text-muted">
        No AI, no black box - a transparent formula: calories from bodyweight
        and activity, protein at 0.8g per pound, fiber at 14g per 1,000
        calories. Honest numbers you can actually hit.
      </p>
      <div className="mt-8">
        <TargetCalculator recipes={recipes} />
      </div>
      <p className="mt-10 max-w-2xl text-xs text-muted">
        These are general starting points for healthy adults, not medical or
        dietary advice. If you have a medical condition or specific dietary
        needs, talk to a professional before changing how you eat.
      </p>
    </div>
  );
}
