import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo/meta";
import LeadMagnetForm from "@/components/newsletter/LeadMagnetForm";
import { routines } from "@/data";
import RoutineCard from "@/components/routine/RoutineCard";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata: Metadata = pageMeta({
  title: "Routines",
  description:
    "Pre-built workout routines for working dads: 10-minute resets, lunch-break sessions and honest multi-day strength programs.",
  path: "/routines",
});

const sections = [
  {
    title: "Quick sessions",
    eyebrow: "In and out",
    categories: ["quick"],
    blurb: "One session, no schedule. Grab the time you have.",
  },
  {
    title: "Programs",
    eyebrow: "Build the habit",
    categories: ["strength-program"],
    blurb: "Repeat weekly. Two to three short sessions that add up fast.",
  },
  {
    title: "Mobility & recovery",
    eyebrow: "Undo the desk",
    categories: ["mobility", "recovery"],
    blurb: "Loosen what sitting tightened. No sweat required.",
  },
];

export default function RoutinesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
        Routines
      </p>
      <h1 className="display lintel mt-1 text-4xl sm:text-5xl">
        No thinking. Just training.
      </h1>
      <p className="mt-4 max-w-xl text-muted">
        Every routine is pre-programmed: what to do, in what order, for how
        long. Pick one that fits the time you actually have.
      </p>

      <p className="mt-3 text-sm text-muted">
        One kettlebell, one dumbbell, a band or nothing at all -{" "}
        <Link
          href="/equipment"
          className="font-medium text-gold hover:text-gold-light"
        >
          pick your equipment
        </Link>{" "}
        and get routines built around just that.
      </p>

      {sections.map((section) => {
        const list = routines.filter((r) =>
          section.categories.includes(r.category),
        );
        if (list.length === 0) return null;
        return (
          <section key={section.title} className="mt-14">
            <SectionHeader eyebrow={section.eyebrow} title={section.title} />
            <p className="mt-3 text-sm text-muted">{section.blurb}</p>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {list.map((r) => (
                <RoutineCard key={r.slug} routine={r} />
              ))}
            </div>
          </section>
        );
      })}

      <section className="mt-14 rounded-2xl border border-edge bg-surface-1 p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          Free download
        </p>
        <h2 className="display lintel mt-1 text-3xl">The Desk Reset Card</h2>
        <p className="mt-3 max-w-xl text-sm text-muted">
          The 10-minute desk-warrior routine as a printable card for your
          monitor or fridge. Drop your email and it&apos;s yours - you&apos;ll
          also get the weekly TempleFit issue.
        </p>
        <div className="mt-5">
          <LeadMagnetForm
            file="/downloads/desk-reset-card.pdf"
            cta="Send me the card"
          />
        </div>
      </section>
    </div>
  );
}
