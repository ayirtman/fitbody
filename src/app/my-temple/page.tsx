import type { Metadata } from "next";
import {
  exercises,
  stretches,
  physioExercises,
  routines,
  recipes,
} from "@/data";
import MyTempleDashboard, {
  type Catalog,
} from "@/components/progress/MyTempleDashboard";

export const metadata: Metadata = {
  title: "My Temple",
  description:
    "Your streak, your saved workouts and recipes, your week of food - all stored on your device, no account needed.",
};

export default function MyTemplePage() {
  const catalog: Catalog = {
    exercises: exercises.map((e) => ({
      slug: e.slug,
      name: e.name,
      href: `/exercises/${e.slug}`,
    })),
    stretches: stretches.map((s) => ({
      slug: s.slug,
      name: s.name,
      href: `/flexibility/${s.slug}`,
    })),
    physio: physioExercises.map((p) => ({
      slug: p.slug,
      name: p.name,
      href: `/physio/${p.complaints[0]}/${p.slug}`,
    })),
    routines: routines.map((r) => ({
      slug: r.slug,
      name: r.name,
      href: `/routines/${r.slug}`,
    })),
    recipes: recipes.map((r) => ({
      slug: r.slug,
      name: r.name,
      href: `/recipes/${r.slug}`,
    })),
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
        My Temple
      </p>
      <h1 className="display lintel mt-1 text-4xl sm:text-5xl">
        Your progress lives here.
      </h1>
      <p className="mt-4 max-w-xl text-muted">
        Streaks, saves and meal plans - stored on this device, no account, no
        tracking. Your temple, your data.
      </p>
      <div className="mt-10">
        <MyTempleDashboard catalog={catalog} />
      </div>
    </div>
  );
}
