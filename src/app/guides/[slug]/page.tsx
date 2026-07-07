import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { guides, guideBySlug } from "@/data/guides";
import { pageMeta } from "@/lib/seo/meta";
import { guideArticleSchema } from "@/lib/seo/schema";
import JsonLd from "@/components/seo/JsonLd";
import ArticleBody from "@/components/article/ArticleBody";
import FaqSection from "@/components/seo/FaqSection";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import GearKit from "@/components/gear/GearKit";
import LeadMagnetForm from "@/components/newsletter/LeadMagnetForm";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = guideBySlug.get(slug);
  if (!guide) return {};
  return pageMeta({
    title: guide.title,
    description: guide.description,
    path: `/guides/${guide.slug}`,
    type: "article",
  });
}

const LEAD_MAGNETS = {
  "meal-prep": {
    title: "The Sunday Meal-Prep Pack",
    blurb:
      "The full high-protein week as a printable PDF: shopping list, every recipe, macros per serving.",
    file: "/downloads/sunday-meal-prep-pack.pdf",
    cta: "Send me the pack",
  },
  "desk-reset": {
    title: "The Desk Reset Card",
    blurb:
      "The 10-minute desk-warrior routine as a printable card for your monitor or fridge.",
    file: "/downloads/desk-reset-card.pdf",
    cta: "Send me the card",
  },
} as const;

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = guideBySlug.get(slug);
  if (!guide) notFound();

  const magnet = guide.leadMagnet ? LEAD_MAGNETS[guide.leadMagnet] : null;

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd data={guideArticleSchema(guide)} />
      <div className="mb-6">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Guides", href: "/guides" },
            { name: guide.title, href: `/guides/${guide.slug}` },
          ]}
        />
      </div>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
        Guide · {guide.minutes} min read
      </p>
      <h1 className="display lintel mt-1 text-4xl sm:text-5xl">{guide.title}</h1>
      <ArticleBody intro={guide.intro} sections={guide.sections} />

      <FaqSection faqs={guide.faqs} />

      {guide.gearEquipment && guide.gearEquipment.length > 0 && (
        <div className="mt-10">
          <GearKit equipment={guide.gearEquipment} />
        </div>
      )}

      {magnet && (
        <section className="mt-12 rounded-2xl border border-edge bg-surface-1 p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Free download
          </p>
          <h2 className="display lintel mt-1 text-3xl">{magnet.title}</h2>
          <p className="mt-3 max-w-xl text-sm text-muted">
            {magnet.blurb} Drop your email and it&apos;s yours - you&apos;ll
            also get the weekly TempleFit issue.
          </p>
          <div className="mt-5">
            <LeadMagnetForm file={magnet.file} cta={magnet.cta} />
          </div>
        </section>
      )}

      <section className="mt-12 border-t border-edge pt-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">
          Put it into practice
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {guide.related.map((l) => (
            <Link
              key={l.href + l.label}
              href={l.href}
              className="rounded-full border border-edge px-4 py-1.5 text-xs text-cream transition-colors hover:border-gold hover:text-gold"
            >
              {l.label} →
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
