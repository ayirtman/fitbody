import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo/meta";
import { guides } from "@/data/guides";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Badge from "@/components/ui/Badge";

export const metadata: Metadata = pageMeta({
  title: "Guides",
  description:
    "Straight-talking guides for working dads: training with no time, meal prep that sticks, and undoing the damage of the desk.",
  path: "/guides",
});

const CATEGORY_LABEL = {
  training: "Training",
  nutrition: "Nutrition",
  recovery: "Recovery",
} as const;

export default function GuidesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="mb-6">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Guides", href: "/guides" },
          ]}
        />
      </div>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
        The Long Reads
      </p>
      <h1 className="display lintel mt-1 text-4xl sm:text-5xl">Guides</h1>
      <p className="mt-4 max-w-xl text-muted">
        Everything here links straight into the exercises, routines and
        recipes to act on it. No 4,000-word life stories before the point.
      </p>
      <div className="mt-10 space-y-4">
        {guides.map((g) => (
          <Link
            key={g.slug}
            href={`/guides/${g.slug}`}
            className="card block p-6 transition-colors hover:border-gold"
          >
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="gold">{CATEGORY_LABEL[g.category]}</Badge>
              <span className="text-xs text-muted">{g.minutes} min read</span>
            </div>
            <h2 className="display mt-3 text-2xl">{g.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {g.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
