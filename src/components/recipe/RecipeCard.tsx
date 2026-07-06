import Image from "next/image";
import Link from "next/link";
import type { Recipe } from "@/lib/types";
import Badge from "@/components/ui/Badge";

const accentArt: Record<Recipe["accent"], string> = {
  ember: "from-ember/50 via-ember/15",
  gold: "from-gold/50 via-gold/15",
  sage: "from-sage/50 via-sage/15",
  slate: "from-slate-500/50 via-slate-500/15",
};

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const time = recipe.prepMin + recipe.cookMin;
  return (
    <Link href={`/recipes/${recipe.slug}`} className="card overflow-hidden">
      <div
        className={`relative h-28 bg-gradient-to-br to-transparent ${accentArt[recipe.accent]}`}
      >
        {recipe.image ? (
          <>
            <Image
              src={recipe.image}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
            {/* scrim so the badges stay legible over the photo */}
            <div
              className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-ink/80 to-transparent"
              aria-hidden="true"
            />
          </>
        ) : (
          /* plate motif */
          <svg
            viewBox="0 0 100 100"
            className="absolute -right-4 -top-6 h-36 w-36 opacity-25"
            aria-hidden="true"
          >
            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" />
            <circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="50" cy="50" r="4" fill="currentColor" />
          </svg>
        )}
        <div className="absolute bottom-3 left-4 flex gap-2">
          <Badge variant="gold">{recipe.macros.proteinG}g protein</Badge>
          <Badge variant="sage">{recipe.macros.fiberG}g fiber</Badge>
        </div>
      </div>
      <div className="p-4">
        <h3 className="display truncate text-xl">{recipe.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted">
          {recipe.description}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
          <span className="tabular-nums">{recipe.macros.calories} kcal</span>
          <span aria-hidden="true">·</span>
          <span className="tabular-nums">{time} min</span>
          {recipe.mealPrepFriendly && (
            <>
              <span aria-hidden="true">·</span>
              <span className="text-sage">Prep-friendly</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
