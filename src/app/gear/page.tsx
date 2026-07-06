import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo/meta";
import { gear, gearUrl } from "@/data/gear";
import Breadcrumbs from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = pageMeta({
  title: "Gear That Earns Its Place",
  description:
    "The short list of home-gym and kitchen gear TempleFit actually recommends - what to buy first, what to skip, and why most of this site needs none of it.",
  path: "/gear",
});

const SECTIONS = [
  {
    category: "training" as const,
    title: "Training",
    intro:
      "Honest order of operations: floor space is free, a mat and bands cost less than one month of a gym you won't visit, and a pull-up bar unlocks more than anything else at its price. Dumbbells and barbells come later, if ever.",
  },
  {
    category: "kitchen" as const,
    title: "Kitchen",
    intro:
      "Meal prep lives or dies on logistics, not recipes. Containers that survive real life and a scale that ends protein guesswork do more than any supplement.",
  },
];

export default function GearPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="mb-6">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Gear", href: "/gear" },
          ]}
        />
      </div>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
        The short list
      </p>
      <h1 className="display lintel mt-1 text-4xl sm:text-5xl">
        Gear that earns its place
      </h1>
      <p className="mt-4 text-muted">
        Almost everything on TempleFit needs zero equipment - that&apos;s the
        point. This is the short list for when you want to level up, in the
        order we&apos;d actually buy it.
      </p>

      {SECTIONS.map((section) => (
        <section key={section.category} className="mt-12">
          <h2 className="display lintel text-3xl">{section.title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {section.intro}
          </p>
          <ul className="mt-6 space-y-4">
            {gear
              .filter((g) => g.category === section.category)
              .map((item) => (
                <li key={item.id} className="card p-5">
                  <a
                    href={gearUrl(item)}
                    target="_blank"
                    rel="sponsored nofollow noopener"
                    className="group block"
                  >
                    <p className="font-semibold text-cream transition-colors group-hover:text-gold">
                      {item.name} ↗
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {item.why}
                    </p>
                  </a>
                </li>
              ))}
          </ul>
        </section>
      ))}

      <p className="mt-12 border-t border-edge pt-5 text-xs leading-relaxed text-muted">
        Links on this page are affiliate links: if you buy through them,
        TempleFit earns a small commission at no extra cost to you. It&apos;s
        one of the ways the site stays free.{" "}
        <Link href="/disclosure" className="underline hover:text-gold">
          Full disclosure
        </Link>
      </p>
    </div>
  );
}
