import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { recipes, recipeBySlug } from "@/data";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { recipeSchema } from "@/lib/seo/schema";
import { pageMeta } from "@/lib/seo/meta";
import FaqSection from "@/components/seo/FaqSection";
import { recipeFaqs } from "@/data/faqs";
import Badge from "@/components/ui/Badge";
import MacroBar from "@/components/recipe/MacroBar";
import RecipeCard from "@/components/recipe/RecipeCard";
import AddToWeekButton from "@/components/recipe/AddToWeekButton";
import FavoriteButton from "@/components/progress/FavoriteButton";

export function generateStaticParams() {
  return recipes.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const recipe = recipeBySlug.get(slug);
  if (!recipe) return {};
  return pageMeta({
    title: recipe.name,
    description: recipe.description,
    path: `/recipes/${recipe.slug}`,
    type: "article",
  });
}

export default async function RecipePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const recipe = recipeBySlug.get(slug);
  if (!recipe) notFound();

  const related = recipes
    .filter(
      (r) =>
        r.slug !== recipe.slug &&
        r.mealType.some((t) => recipe.mealType.includes(t)),
    )
    .sort((a, b) => b.macros.proteinG - a.macros.proteinG)
    .slice(0, 3);

  return (
    <article className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <JsonLd data={recipeSchema(recipe)} />
      <div className="mb-6">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Recipes", href: "/recipes" },
            { name: recipe.name, href: `/recipes/${recipe.slug}` },
          ]}
        />
      </div>
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            {recipe.mealType.join(" · ")}
          </p>
          <h1 className="display lintel mt-1 text-4xl sm:text-5xl">
            {recipe.name}
          </h1>
          <p className="mt-4 text-muted">{recipe.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="outline">Prep {recipe.prepMin} min</Badge>
            <Badge variant="outline">Cook {recipe.cookMin} min</Badge>
            <Badge variant="outline">Serves {recipe.servings}</Badge>
            {recipe.keepsDays && (
              <Badge variant="sage">Keeps {recipe.keepsDays} days</Badge>
            )}
            {recipe.tags.map((t) => (
              <Badge key={t} variant="neutral">
                {t}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex gap-3">
          <AddToWeekButton slug={recipe.slug} />
          <FavoriteButton kind="recipes" slug={recipe.slug} />
        </div>
      </header>

      {recipe.image && (
        <div className="relative mt-8 h-64 overflow-hidden rounded-2xl border border-edge sm:h-80">
          <Image
            src={recipe.image}
            alt={`${recipe.name} - ${recipe.description.split(".")[0].toLowerCase()}`}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1232px"
            className="object-cover"
          />
        </div>
      )}

      <section className="card mt-10 p-6">
        <h2 className="sr-only">Macros per serving</h2>
        <MacroBar macros={recipe.macros} />
        <p className="mt-3 text-xs text-muted">Per serving</p>
      </section>

      <div className="mt-10 grid gap-10 lg:grid-cols-[320px_1fr]">
        <section>
          <h2 className="display lintel text-2xl">Ingredients</h2>
          <ul className="mt-5 space-y-2.5">
            {recipe.ingredients.map((ing) => (
              <li
                key={ing.item}
                className="flex justify-between gap-4 border-b border-edge pb-2.5 text-sm"
              >
                <span className="text-cream/90">{ing.item}</span>
                <span className="shrink-0 text-muted tabular-nums">
                  {ing.qty}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="display lintel text-2xl">Method</h2>
          <ol className="mt-5 space-y-3">
            {recipe.steps.map((step, i) => (
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
      </div>

      <FaqSection faqs={recipeFaqs[recipe.slug]} />

      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="display lintel text-2xl">More like this</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <RecipeCard key={r.slug} recipe={r} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
