import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo/meta";

export const metadata: Metadata = pageMeta({
  title: "Affiliate Disclosure",
  description:
    "How TempleFit stays free: affiliate links, newsletter sponsorships and reader support - and what we will never do.",
  path: "/disclosure",
});

export default function DisclosurePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
        Disclosure
      </p>
      <h1 className="display lintel mt-1 text-4xl sm:text-5xl">
        How TempleFit stays free
      </h1>
      <div className="mt-8 space-y-6 text-sm leading-relaxed text-cream/85">
        <p>
          Every workout, recipe, routine and physio guide on this site is free,
          with no account and no paywall. Keeping it that way costs money, so
          here is exactly how the site earns:
        </p>
        <div className="card p-5">
          <h2 className="font-semibold text-cream">Affiliate links</h2>
          <p className="mt-2 text-muted">
            Some links to gear (marked and always on gear modules or the{" "}
            <Link href="/gear" className="text-gold hover:text-gold-light">
              gear page
            </Link>
            ) are affiliate links. If you buy through them, we earn a small
            commission from the retailer. The price you pay does not change.
            We only list things we&apos;d tell a friend to buy, and most of
            this site requires no equipment at all.
          </p>
        </div>
        <div className="card p-5">
          <h2 className="font-semibold text-cream">Newsletter sponsorships</h2>
          <p className="mt-2 text-muted">
            The weekly email occasionally carries a single, clearly labelled
            &quot;Presented by&quot; sponsor. Sponsors never influence which
            exercises, recipes or advice we publish.
          </p>
        </div>
        <div className="card p-5">
          <h2 className="font-semibold text-cream">Reader support</h2>
          <p className="mt-2 text-muted">
            Some readers chip in directly on the{" "}
            <Link href="/support" className="text-gold hover:text-gold-light">
              support page
            </Link>
            . That&apos;s it - no tricks.
          </p>
        </div>
        <p>
          What we will never do: display ad networks, selling your email
          address, paywalling the basics, or recommending gear we don&apos;t
          believe in. If a link earns us money, it&apos;s labelled.
        </p>
      </div>
    </div>
  );
}
