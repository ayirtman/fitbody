export type MuscleId =
  | "chest"
  | "shoulders"
  | "biceps"
  | "triceps"
  | "forearms"
  | "abs"
  | "obliques"
  | "neck"
  | "hip-flexors"
  | "quads"
  | "calves"
  | "upper-back"
  | "lats"
  | "lower-back"
  | "glutes"
  | "hamstrings";

export type BodyView = "front" | "back";

export type Equipment =
  | "none"
  | "dumbbells"
  | "bands"
  | "barbell"
  | "pull-up-bar";

export type Difficulty = "beginner" | "intermediate" | "advanced";

export type MealType = "breakfast" | "lunch" | "dinner" | "snack";

export type ComplaintId =
  | "lower-back-pain"
  | "desk-neck"
  | "tight-hips"
  | "knee-pain"
  | "shoulder-impingement"
  | "wrist-carpal";

export interface MuscleGroup {
  id: MuscleId;
  name: string;
  shortName: string;
  /** Which body-map view(s) this muscle is clickable on */
  view: BodyView | "both";
  blurb: string;
}

export interface BaseMovement {
  slug: string;
  name: string;
  description: string;
  steps: string[];
  primaryMuscles: MuscleId[];
  secondaryMuscles: MuscleId[];
  equipment: Equipment[];
  difficulty: Difficulty;
  timeEstimateMin: number;
  commonMistakes: string[];
  tips?: string[];
}

export interface Exercise extends BaseMovement {
  kind: "exercise";
  setsRepsGuidance: {
    sets: string;
    reps: string;
    rest: string;
    tempoNote?: string;
  };
}

export type StretchMoment =
  | "morning"
  | "post-desk"
  | "pre-workout"
  | "post-workout";

export interface Stretch extends BaseMovement {
  kind: "stretch";
  holdSeconds: number;
  repsPerSide?: number;
  bestFor: StretchMoment[];
}

export interface PhysioExercise extends BaseMovement {
  kind: "physio";
  complaints: ComplaintId[];
  frequency: string;
  /** Red-flag guidance rendered in a warning callout */
  stopIf: string;
}

export interface Complaint {
  id: ComplaintId;
  name: string;
  whoGetsThis: string;
  whatHelps: string;
}

export type MovementKind = "exercise" | "stretch" | "physio";

export interface RoutineItem {
  ref: string;
  refKind: MovementKind;
  sets?: number;
  reps?: string;
  restSec?: number;
  holdSec?: number;
}

export interface RoutineBlock {
  label: "Warm-up" | "Main" | "Cooldown";
  items: RoutineItem[];
}

export interface RoutineDay {
  dayLabel: string;
  focus: string;
  blocks: RoutineBlock[];
  totalMin: number;
}

export type RoutineCategory =
  | "quick"
  | "strength-program"
  | "mobility"
  | "recovery";

export interface Routine {
  slug: string;
  name: string;
  tagline: string;
  category: RoutineCategory;
  daysPerWeek: number;
  days: RoutineDay[];
  equipment: Equipment[];
  difficulty: Difficulty;
  totalMinPerSession: number;
  targetMuscles: MuscleId[];
}

export type RecipeAccent = "ember" | "gold" | "sage" | "slate";

export interface Recipe {
  slug: string;
  name: string;
  description: string;
  mealType: MealType[];
  prepMin: number;
  cookMin: number;
  servings: number;
  /** Per serving */
  macros: {
    calories: number;
    proteinG: number;
    fiberG: number;
    carbsG: number;
    fatG: number;
  };
  ingredients: { item: string; qty: string }[];
  steps: string[];
  mealPrepFriendly: boolean;
  keepsDays?: number;
  tags: string[];
  accent: RecipeAccent;
  /**
   * Public path to the dish photo, e.g. "/recipes/<slug>.webp". The validator
   * checks the file exists; cards and the detail page fall back to the accent
   * art when absent. Generate via scripts/generate-recipe-images.mjs.
   */
  image?: string;
}

export interface MealPrepPlan {
  slug: string;
  name: string;
  description: string;
  sundayTimeMin: number;
  recipes: string[];
  shoppingList: { category: string; items: string[] }[];
  cookOrder: string[];
  weekMap: { day: string; lunch: string; dinner: string }[];
  totals: { avgProteinPerDay: number; avgFiberPerDay: number };
}

export interface Faq {
  q: string;
  a: string;
}

export type GuideCategory = "training" | "nutrition" | "recovery";

export interface GuideSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  /** Related content chips rendered under the section */
  links?: { label: string; href: string }[];
}

export interface Guide {
  slug: string;
  title: string;
  /** Meta description / index blurb, <=160 chars */
  description: string;
  category: GuideCategory;
  /** Reading time in minutes */
  minutes: number;
  /** ISO date of last substantive update */
  updated: string;
  intro: string;
  sections: GuideSection[];
  faqs?: Faq[];
  related: { label: string; href: string }[];
  /** Which lead magnet CTA to show at the end, if any */
  leadMagnet?: "meal-prep" | "desk-reset";
  /** Show a gear kit for this equipment at the end, if any */
  gearEquipment?: Equipment[];
}
