/**
 * localStorage persistence. Keys are namespaced + versioned; every read is
 * wrapped so corrupt/missing data falls back to a sane default.
 */

export type FavoriteKind =
  | "exercises"
  | "stretches"
  | "physio"
  | "recipes"
  | "routines";

export interface FavoritesState {
  exercises: string[];
  stretches: string[];
  physio: string[];
  recipes: string[];
  routines: string[];
}

export interface CompletionEntry {
  routineSlug?: string;
}

export interface CompletionsState {
  /** ISO yyyy-mm-dd dates with at least one completed session, deduped */
  dates: string[];
  byDate: Record<string, CompletionEntry[]>;
}

export type PlanDay = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export interface MealPlanState {
  week: Partial<Record<PlanDay, { lunch?: string; dinner?: string }>>;
  savedAt: string | null;
}

export interface WaitlistState {
  submitted: boolean;
  at: string | null;
}

export interface CalculatorState {
  weight: number;
  unit: "kg" | "lb";
  activity: "low" | "moderate" | "high";
  goal: "maintain" | "lean-out" | "build";
}

export const STORAGE_KEYS = {
  favorites: "templefit.v1.favorites",
  completions: "templefit.v1.completions",
  mealPlan: "templefit.v1.mealPlan",
  waitlist: "templefit.v1.waitlist",
  calculator: "templefit.v1.calculator",
} as const;

export const DEFAULT_FAVORITES: FavoritesState = {
  exercises: [],
  stretches: [],
  physio: [],
  recipes: [],
  routines: [],
};

export const DEFAULT_COMPLETIONS: CompletionsState = { dates: [], byDate: {} };

export const DEFAULT_MEAL_PLAN: MealPlanState = { week: {}, savedAt: null };

export const DEFAULT_WAITLIST: WaitlistState = { submitted: false, at: null };

export const DEFAULT_CALCULATOR: CalculatorState = {
  weight: 85,
  unit: "kg",
  activity: "moderate",
  goal: "maintain",
};

export function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as T;
    if (parsed === null || typeof parsed !== typeof fallback) return fallback;
    return { ...fallback, ...parsed };
  } catch {
    return fallback;
  }
}

export function writeStorage<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage full or blocked — favorites just won't persist
  }
}

/** Local-timezone ISO day string (yyyy-mm-dd) */
export function todayIso(date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
