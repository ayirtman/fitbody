import JsonLd from "@/components/seo/JsonLd";
import { faqPageSchema } from "@/lib/seo/schema";
import type { Faq } from "@/lib/types";

/** FAQ block with matching FAQPage JSON-LD - targets "People also ask". */
export default function FaqSection({ faqs }: { faqs?: Faq[] }) {
  if (!faqs || faqs.length === 0) return null;
  return (
    <section className="mt-14">
      <JsonLd data={faqPageSchema(faqs)} />
      <h2 className="display lintel text-3xl">Common questions</h2>
      <div className="mt-5 space-y-3">
        {faqs.map((f) => (
          <details key={f.q} className="card group p-5">
            <summary className="cursor-pointer list-none font-semibold text-cream marker:hidden">
              <span className="mr-2 text-gold transition-transform group-open:rotate-90 inline-block">
                ›
              </span>
              {f.q}
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
