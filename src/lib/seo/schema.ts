import type { Exercise, PhysioExercise, Recipe, Stretch } from "@/lib/types";
import { SITE_NAME, SITE_URL } from "./site";

/**
 * schema.org JSON-LD builders. Plain objects only - rendered by
 * <JsonLd /> as a script tag. Recipes and exercises are the two content
 * types Google gives rich SERP treatment, so those carry the detail.
 */

type Schema = Record<string, unknown>;

export function webSiteSchema(): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "Free workouts, physio exercises and high-protein meal prep for working dads.",
    publisher: organizationSchema(false),
  };
}

export function organizationSchema(withContext = true): Schema {
  return {
    ...(withContext ? { "@context": "https://schema.org" } : {}),
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
  };
}

export function breadcrumbSchema(items: { name: string; href: string }[]): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.href}`,
    })),
  };
}

export function recipeSchema(recipe: Recipe): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.name,
    description: recipe.description,
    url: `${SITE_URL}/recipes/${recipe.slug}`,
    ...(recipe.image ? { image: [`${SITE_URL}${recipe.image}`] } : {}),
    author: organizationSchema(false),
    prepTime: `PT${recipe.prepMin}M`,
    cookTime: `PT${recipe.cookMin}M`,
    totalTime: `PT${recipe.prepMin + recipe.cookMin}M`,
    recipeYield: `${recipe.servings} serving${recipe.servings === 1 ? "" : "s"}`,
    recipeCategory: recipe.mealType.join(", "),
    keywords: recipe.tags.join(", "),
    nutrition: {
      "@type": "NutritionInformation",
      calories: `${recipe.macros.calories} calories`,
      proteinContent: `${recipe.macros.proteinG} g`,
      carbohydrateContent: `${recipe.macros.carbsG} g`,
      fatContent: `${recipe.macros.fatG} g`,
      fiberContent: `${recipe.macros.fiberG} g`,
      servingSize: "1 serving",
    },
    recipeIngredient: recipe.ingredients.map((i) => `${i.qty} ${i.item}`.trim()),
    recipeInstructions: recipe.steps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      text: step,
    })),
  };
}

type Movement = Exercise | Stretch | PhysioExercise;

export function howToSchema(movement: Movement, path: string): Schema {
  const equipment = movement.equipment.filter((e) => e !== "none");
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: movement.name,
    description: movement.description,
    url: `${SITE_URL}${path}`,
    totalTime: `PT${movement.timeEstimateMin}M`,
    ...(equipment.length > 0
      ? {
          tool: equipment.map((e) => ({
            "@type": "HowToTool",
            name: e.replace(/-/g, " "),
          })),
        }
      : {}),
    step: movement.steps.map((text, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      text,
    })),
    ...(movement.tips?.length ? { tip: movement.tips.join(" ") } : {}),
  };
}
