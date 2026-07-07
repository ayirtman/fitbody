import Link from "next/link";
import type { GuideSection } from "@/lib/types";

/**
 * Shared long-form article body: intro + sections with paragraphs, bullets
 * and related-content chips. Used by /guides/[slug] and /blog/[slug] so both
 * surfaces render identically.
 */
export default function ArticleBody({
  intro,
  sections,
}: {
  intro: string;
  sections: GuideSection[];
}) {
  return (
    <>
      <p className="mt-5 text-lg leading-relaxed text-cream/85">{intro}</p>
      {sections.map((section) => (
        <section key={section.heading} className="mt-10">
          <h2 className="display lintel text-3xl">{section.heading}</h2>
          {section.paragraphs.map((p, i) => (
            <p key={i} className="mt-4 text-sm leading-relaxed text-cream/85">
              {p}
            </p>
          ))}
          {section.bullets && (
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-cream/85">
              {section.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          )}
          {section.links && (
            <div className="mt-4 flex flex-wrap gap-2">
              {section.links.map((l) => (
                <Link
                  key={l.href + l.label}
                  href={l.href}
                  className="rounded-full border border-edge px-4 py-1.5 text-xs text-cream transition-colors hover:border-gold hover:text-gold"
                >
                  {l.label} →
                </Link>
              ))}
            </div>
          )}
        </section>
      ))}
    </>
  );
}
