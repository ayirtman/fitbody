import type {
  Complaint,
  ComplaintId,
  Exercise,
  MealPrepPlan,
  MovementKind,
  MuscleId,
  PhysioExercise,
  Recipe,
  Routine,
  RoutineItem,
  Stretch,
} from "@/lib/types";
import { muscles, muscleById } from "./muscles";
import { exercises } from "./exercises";
import { stretches } from "./stretches";
import { complaints, physioExercises } from "./physio";
import { routines } from "./routines";
import { recipes } from "./recipes";
import { mealPrepPlans } from "./mealPrepPlans";

export {
  muscles,
  muscleById,
  exercises,
  stretches,
  complaints,
  physioExercises,
  routines,
  recipes,
  mealPrepPlans,
};

export const exerciseBySlug = new Map(exercises.map((e) => [e.slug, e]));
export const stretchBySlug = new Map(stretches.map((s) => [s.slug, s]));
export const physioBySlug = new Map(physioExercises.map((p) => [p.slug, p]));
export const routineBySlug = new Map(routines.map((r) => [r.slug, r]));
export const recipeBySlug = new Map(recipes.map((r) => [r.slug, r]));
export const mealPrepPlanBySlug = new Map(mealPrepPlans.map((p) => [p.slug, p]));
export const complaintById = new Map(complaints.map((c) => [c.id, c]));

export type Movement = Exercise | Stretch | PhysioExercise;

export function movementBySlug(
  kind: MovementKind,
  slug: string,
): Movement | undefined {
  if (kind === "exercise") return exerciseBySlug.get(slug);
  if (kind === "stretch") return stretchBySlug.get(slug);
  return physioBySlug.get(slug);
}

export function resolveRoutineItem(item: RoutineItem): Movement | undefined {
  return movementBySlug(item.refKind, item.ref);
}

function byMuscle<T extends Movement>(
  items: T[],
  muscle: MuscleId,
  includeSecondary = true,
): T[] {
  return items.filter(
    (i) =>
      i.primaryMuscles.includes(muscle) ||
      (includeSecondary && i.secondaryMuscles.includes(muscle)),
  );
}

export const exercisesByMuscle = (m: MuscleId, includeSecondary = true) =>
  byMuscle(exercises, m, includeSecondary);
export const stretchesByMuscle = (m: MuscleId, includeSecondary = true) =>
  byMuscle(stretches, m, includeSecondary);
export const physioByMuscle = (m: MuscleId, includeSecondary = true) =>
  byMuscle(physioExercises, m, includeSecondary);

export function physioByComplaint(c: ComplaintId): PhysioExercise[] {
  return physioExercises.filter((p) => p.complaints.includes(c));
}

/** Exercise count per muscle (primary only) - powers body-map hover labels */
export const exerciseCountByMuscle: Record<MuscleId, number> = Object.fromEntries(
  muscles.map((m) => [
    m.id,
    exercises.filter((e) => e.primaryMuscles.includes(m.id)).length,
  ]),
) as Record<MuscleId, number>;

export function relatedExercises(ex: Exercise, limit = 3): Exercise[] {
  return exercises
    .filter(
      (e) =>
        e.slug !== ex.slug &&
        e.primaryMuscles.some((m) => ex.primaryMuscles.includes(m)),
    )
    .slice(0, limit);
}

export function routineMovements(routine: Routine): Movement[] {
  const seen = new Set<string>();
  const out: Movement[] = [];
  for (const day of routine.days) {
    for (const block of day.blocks) {
      for (const item of block.items) {
        const mv = resolveRoutineItem(item);
        if (mv && !seen.has(`${item.refKind}:${mv.slug}`)) {
          seen.add(`${item.refKind}:${mv.slug}`);
          out.push(mv);
        }
      }
    }
  }
  return out;
}

export function recipesForMealPlan(plan: MealPrepPlan): Recipe[] {
  return plan.recipes
    .map((slug) => recipeBySlug.get(slug))
    .filter((r): r is Recipe => Boolean(r));
}

export function complaintForMuscle(m: MuscleId): Complaint[] {
  return complaints.filter((c) =>
    physioByComplaint(c.id).some(
      (p) => p.primaryMuscles.includes(m) || p.secondaryMuscles.includes(m),
    ),
  );
}
