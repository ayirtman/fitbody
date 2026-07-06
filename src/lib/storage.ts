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

export type MealSlot = "breakfast" | "lunch" | "dinner" | "snack";

/** Recipe slugs per slot. A slug appears at most once per slot but may repeat
 * across different slots/days. */
export type DayPlan = Partial<Record<MealSlot, string[]>>;

export interface MealPlanState {
  week: Partial<Record<PlanDay, DayPlan>>;
  savedAt: string | null;
}

export interface ShoppingState {
  /** Aggregated-item keys the user has checked off */
  checked: string[];
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
  mealPlan: "templefit.v2.mealPlan",
  shopping: "templefit.v1.shoppingChecked",
  waitlist: "templefit.v1.waitlist",
  calculator: "templefit.v1.calculator",
} as const;

const LEGACY_MEAL_PLAN_KEY = "templefit.v1.mealPlan";

/**
 * v1 plans held a single recipe per lunch/dinner: { lunch?: string }.
 * v2 holds arrays per slot. One-shot, client-only; removes the v1 key.
 */
export function migrateMealPlanV1() {
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem(LEGACY_MEAL_PLAN_KEY);
    if (!raw) return;
    if (!window.localStorage.getItem(STORAGE_KEYS.mealPlan)) {
      const old = JSON.parse(raw) as {
        week?: Partial<Record<PlanDay, { lunch?: string; dinner?: string }>>;
        savedAt?: string | null;
      };
      const week: MealPlanState["week"] = {};
      for (const [day, slots] of Object.entries(old.week ?? {})) {
        const plan: DayPlan = {};
        if (slots?.lunch) plan.lunch = [slots.lunch];
        if (slots?.dinner) plan.dinner = [slots.dinner];
        if (Object.keys(plan).length) week[day as PlanDay] = plan;
      }
      window.localStorage.setItem(
        STORAGE_KEYS.mealPlan,
        JSON.stringify({ week, savedAt: old.savedAt ?? null }),
      );
    }
    window.localStorage.removeItem(LEGACY_MEAL_PLAN_KEY);
  } catch {
    // corrupt v1 data - abandon it rather than crash
  }
}

export const DEFAULT_FAVORITES: FavoritesState = {
  exercises: [],
  stretches: [],
  physio: [],
  recipes: [],
  routines: [],
};

export const DEFAULT_COMPLETIONS: CompletionsState = { dates: [], byDate: {} };

export const DEFAULT_MEAL_PLAN: MealPlanState = { week: {}, savedAt: null };

export const DEFAULT_SHOPPING: ShoppingState = { checked: [] };

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
    // storage full or blocked - favorites just won't persist
  }
}

/** Local-timezone ISO day string (yyyy-mm-dd) */
export function todayIso(date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
