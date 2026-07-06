import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo/meta";
import LeadMagnetForm from "@/components/newsletter/LeadMagnetForm";
import Link from "next/link";
import { mealPrepPlans, recipesForMealPlan } from "@/data";
import Badge from "@/components/ui/Badge";

export const metadata: Metadata = pageMeta({
  title: "Meal Prep Plans",
  description:
    "Batch-cooking plans that turn one focused cooking session into a week of high-protein lunches and dinners.",
  path: "/meal-prep",
});

export default function MealPrepPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
        Meal Prep
      </p>
      <h1 className="display lintel mt-1 text-4xl sm:text-5xl">
        Cook once. Eat all week.
      </h1>
      <p className="mt-4 max-w-xl text-muted">
        One focused session - shopping list, cook order, container map - and
        your weekday food decisions are already made.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {mealPrepPlans.map((plan) => {
          const planRecipes = recipesForMealPlan(plan);
          return (
            <Link
              key={plan.slug}
              href={`/meal-prep/${plan.slug}`}
              className="card p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <h2 className="display text-3xl">{plan.name}</h2>
                <Badge variant="gold">{plan.sundayTimeMin} min</Badge>
              </div>
              <p className="mt-2 text-sm text-muted">{plan.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="gold">
                  ~{plan.totals.avgProteinPerDay}g protein/day
                </Badge>
                <Badge variant="sage">
                  ~{plan.totals.avgFiberPerDay}g fiber/day
                </Badge>
                <Badge variant="outline">{planRecipes.length} recipes</Badge>
              </div>
              <p className="mt-4 text-sm text-muted">
                {planRecipes.map((r) => r.name).join(" · ")}
              </p>
            </Link>
          );
        })}
      </div>

      <section className="mt-14 rounded-2xl border border-edge bg-surface-1 p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          Free download
        </p>
        <h2 className="display lintel mt-1 text-3xl">
          The Sunday Meal-Prep Pack
        </h2>
        <p className="mt-3 max-w-xl text-sm text-muted">
          The full high-protein week as a printable PDF: shopping list,
          every recipe, macros per serving. Drop your email and it&apos;s
          yours - you&apos;ll also get the weekly TempleFit issue.
        </p>
        <div className="mt-5">
          <LeadMagnetForm
            file="/downloads/sunday-meal-prep-pack.pdf"
            cta="Send me the pack"
          />
        </div>
      </section>
    </div>
  );
}
