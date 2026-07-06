import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { mealPrepPlans, mealPrepPlanBySlug, recipesForMealPlan } from "@/data";
import Badge from "@/components/ui/Badge";
import RecipeCard from "@/components/recipe/RecipeCard";
import ShoppingList from "@/components/recipe/ShoppingList";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { pageMeta } from "@/lib/seo/meta";

export function generateStaticParams() {
  return mealPrepPlans.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const plan = mealPrepPlanBySlug.get(slug);
  if (!plan) return {};
  return pageMeta({
    title: plan.name,
    description: plan.description,
    path: `/meal-prep/${plan.slug}`,
    type: "article",
  });
}

export default async function MealPrepPlanPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const plan = mealPrepPlanBySlug.get(slug);
  if (!plan) notFound();

  const planRecipes = recipesForMealPlan(plan);

  return (
    <article className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-6">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Meal Prep", href: "/meal-prep" },
            { name: plan.name, href: `/meal-prep/${plan.slug}` },
          ]}
        />
      </div>
      <header className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          Meal Prep Plan
        </p>
        <h1 className="display lintel mt-1 text-4xl sm:text-5xl">
          {plan.name}
        </h1>
        <p className="mt-4 text-muted">{plan.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="gold">{plan.sundayTimeMin} min session</Badge>
          <Badge variant="gold">
            ~{plan.totals.avgProteinPerDay}g protein/day
          </Badge>
          <Badge variant="sage">~{plan.totals.avgFiberPerDay}g fiber/day</Badge>
        </div>
      </header>

      <section className="mt-12">
        <h2 className="display lintel text-3xl">The recipes</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {planRecipes.map((r) => (
            <RecipeCard key={r.slug} recipe={r} />
          ))}
        </div>
      </section>

      <div className="mt-12 grid gap-10 lg:grid-cols-[320px_1fr]">
        <section className="card h-fit p-6">
          <h2 className="display lintel text-2xl">Shopping list</h2>
          <div className="mt-5">
            <ShoppingList categories={plan.shoppingList} />
          </div>
        </section>

        <div className="space-y-12">
          <section>
            <h2 className="display lintel text-2xl">Cook order</h2>
            <ol className="mt-5 space-y-3">
              {plan.cookOrder.map((step, i) => (
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

          <section>
            <h2 className="display lintel text-2xl">Your week</h2>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[480px] text-left text-sm">
                <thead>
                  <tr className="border-b border-edge text-xs font-semibold uppercase tracking-wider text-muted">
                    <th className="py-2 pr-4">Day</th>
                    <th className="py-2 pr-4">Lunch</th>
                    <th className="py-2">Dinner</th>
                  </tr>
                </thead>
                <tbody>
                  {plan.weekMap.map((d) => (
                    <tr key={d.day} className="border-b border-edge/60">
                      <td className="py-2.5 pr-4 font-semibold text-cream">
                        {d.day}
                      </td>
                      <td className="py-2.5 pr-4 text-cream/85">{d.lunch}</td>
                      <td className="py-2.5 text-cream/85">{d.dinner}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}
