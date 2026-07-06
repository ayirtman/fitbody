import Link from "next/link";
import {
  muscles,
  recipes,
  exerciseCountByMuscle,
  routineBySlug,
} from "@/data";
import MuscleExplorer from "@/components/body-map/MuscleExplorer";
import RoutineCard from "@/components/routine/RoutineCard";
import RecipeCard from "@/components/recipe/RecipeCard";
import SectionHeader from "@/components/ui/SectionHeader";
import StreakNudge from "@/components/progress/StreakNudge";

const quickPaths = [
  {
    href: "/routines/morning-energizer",
    title: "I have 15 minutes",
    body: "The Morning Energizer: no equipment, no excuses, out the door awake.",
    accent: "text-gold",
  },
  {
    href: "/physio/lower-back-pain",
    title: "My back hurts",
    body: "Three gentle physio moves that calm a barking lower back today.",
    accent: "text-ember",
  },
  {
    href: "/recipes?mealType=dinner&sort=protein",
    title: "High-protein dinners",
    body: "Family dinners with 35g+ of protein that kids will actually eat.",
    accent: "text-sage",
  },
];

const valueProps = [
  {
    title: "No gym required",
    body: "Most exercises need floor space and gravity. A pair of dumbbells unlocks the rest.",
  },
  {
    title: "Honest time estimates",
    body: "Every session says what it really takes. A 15-minute workout here is 15 minutes.",
  },
  {
    title: "Free. Actually free.",
    body: "No account, no paywall, no ads. Every workout, stretch and recipe — yours.",
  },
];

export default function Home() {
  const featuredRoutines = [
    "morning-energizer",
    "dad-strength-split",
    "desk-warrior-reset",
  ]
    .map((slug) => routineBySlug.get(slug))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));

  const featuredRecipes = [...recipes]
    .sort((a, b) => b.macros.proteinG - a.macros.proteinG)
    .slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 70% 40%, rgba(233,180,76,0.08), transparent)",
          }}
        />
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:py-20">
          <div className="flex flex-col justify-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              Free fitness for working dads
            </p>
            <h1 className="display mt-4 text-6xl sm:text-7xl lg:text-8xl">
              Your body is a temple.{" "}
              <span className="text-gold">Maintain it.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-muted">
              Workouts, stretches, physio moves and high-protein food — built
              for the man with 15 minutes, two kids and a desk job. Tap a
              muscle to start.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/routines"
                className="rounded-full bg-gold px-6 py-3 text-sm font-bold text-ink transition-colors hover:bg-gold-light"
              >
                Start a routine
              </Link>
              <Link
                href="/physio"
                className="rounded-full border border-edge px-6 py-3 text-sm font-semibold text-cream transition-colors hover:border-gold/40"
              >
                Fix what hurts
              </Link>
            </div>
          </div>
          <MuscleExplorer
            muscles={muscles}
            counts={exerciseCountByMuscle}
            className="h-[480px] lg:h-[560px]"
          />
        </div>
      </section>

      <StreakNudge />

      {/* Quick paths */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-4 md:grid-cols-3">
          {quickPaths.map((q) => (
            <Link key={q.href} href={q.href} className="card p-6">
              <h2 className={`display text-3xl ${q.accent}`}>{q.title}</h2>
              <p className="mt-2 text-sm text-muted">{q.body}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured routines */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <SectionHeader
          eyebrow="Start here"
          title="Routines that fit real life"
          link={{ href: "/routines", label: "All routines" }}
        />
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {featuredRoutines.map((r) => (
            <RoutineCard key={r.slug} routine={r} />
          ))}
        </div>
      </section>

      {/* Value props */}
      <section className="border-y border-edge bg-surface-1/60">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 md:grid-cols-3">
          {valueProps.map((v) => (
            <div key={v.title}>
              <h2 className="display lintel text-2xl">{v.title}</h2>
              <p className="mt-3 text-sm text-muted">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured recipes */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <SectionHeader
          eyebrow="Fuel"
          title="Protein does the heavy lifting"
          link={{ href: "/recipes", label: "All recipes" }}
        />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {featuredRecipes.map((r) => (
            <RecipeCard key={r.slug} recipe={r} />
          ))}
        </div>
      </section>

      {/* Posture AI teaser */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <div className="card relative overflow-hidden p-8 sm:p-12">
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(ellipse 50% 80% at 85% 50%, rgba(233,180,76,0.12), transparent)",
            }}
          />
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Coming soon
          </p>
          <h2 className="display mt-3 max-w-xl text-4xl sm:text-5xl">
            Posture AI: a program built from photos of{" "}
            <span className="text-gold">your</span> posture.
          </h2>
          <p className="mt-4 max-w-lg text-sm text-muted">
            Two photos, a few questions, and a personalized plan that targets
            what the desk did to you. Join the waitlist for early access — the
            free library stays free, always.
          </p>
          <Link
            href="/posture-ai"
            className="mt-6 inline-block rounded-full bg-gold px-6 py-3 text-sm font-bold text-ink transition-colors hover:bg-gold-light"
          >
            Join the waitlist
          </Link>
        </div>
      </section>
    </div>
  );
}
