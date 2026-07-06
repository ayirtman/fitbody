import type {
  Difficulty,
  Equipment,
  Exercise,
  MuscleId,
  Recipe,
  Stretch,
  StretchMoment,
} from "./types";

export interface MovementFilters {
  muscle?: MuscleId;
  equipment?: Equipment;
  difficulty?: Difficulty;
  maxTime?: number;
}

export function filterExercises(
  items: Exercise[],
  f: MovementFilters,
): Exercise[] {
  return items.filter(
    (e) =>
      (!f.muscle ||
        e.primaryMuscles.includes(f.muscle) ||
        e.secondaryMuscles.includes(f.muscle)) &&
      (!f.equipment || e.equipment.includes(f.equipment)) &&
      (!f.difficulty || e.difficulty === f.difficulty) &&
      (!f.maxTime || e.timeEstimateMin <= f.maxTime),
  );
}

export function filterStretches(
  items: Stretch[],
  f: MovementFilters & { moment?: StretchMoment },
): Stretch[] {
  return items.filter(
    (s) =>
      (!f.muscle ||
        s.primaryMuscles.includes(f.muscle) ||
        s.secondaryMuscles.includes(f.muscle)) &&
      (!f.difficulty || s.difficulty === f.difficulty) &&
      (!f.moment || s.bestFor.includes(f.moment)),
  );
}

export type RecipeSort = "protein" | "fiber" | "calories" | "time";

export interface RecipeFilters {
  mealType?: string;
  tag?: string;
  maxTime?: number;
  sort?: RecipeSort;
}

export function filterRecipes(items: Recipe[], f: RecipeFilters): Recipe[] {
  const filtered = items.filter(
    (r) =>
      (!f.mealType || r.mealType.includes(f.mealType as Recipe["mealType"][number])) &&
      (!f.tag || r.tags.includes(f.tag)) &&
      (!f.maxTime || r.prepMin + r.cookMin <= f.maxTime),
  );
  const sort = f.sort ?? "protein";
  return [...filtered].sort((a, b) => {
    switch (sort) {
      case "protein":
        return b.macros.proteinG - a.macros.proteinG;
      case "fiber":
        return b.macros.fiberG - a.macros.fiberG;
      case "calories":
        return a.macros.calories - b.macros.calories;
      case "time":
        return a.prepMin + a.cookMin - (b.prepMin + b.cookMin);
    }
  });
}

export const EQUIPMENT_LABELS: Record<Equipment, string> = {
  none: "No equipment",
  dumbbells: "Dumbbells",
  bands: "Bands",
  barbell: "Barbell",
  "pull-up-bar": "Pull-up bar",
};

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

export const MOMENT_LABELS: Record<StretchMoment, string> = {
  morning: "Morning",
  "post-desk": "Post-desk",
  "pre-workout": "Pre-workout",
  "post-workout": "Post-workout",
};
