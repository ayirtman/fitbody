import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo/meta";

export const metadata: Metadata = pageMeta({
  title: "Keep TempleFit Free",
  description:
    "TempleFit is free and stays free. If it's helped you train, eat better or fix a nagging pain, here's how to support it.",
  path: "/support",
});

export default function SupportPage() {
  const bmc = process.env.NEXT_PUBLIC_BMC_URL;
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
        Support
      </p>
      <h1 className="display lintel mt-1 text-4xl sm:text-5xl">
        Keep TempleFit free
      </h1>
      <div className="mt-8 space-y-6 text-sm leading-relaxed text-cream/85">
        <p>
          No paywall, no account, no ads - and it stays that way. If the site
          has helped you get stronger, eat better or fix a nagging pain, here
          are three ways to give back, in order of how much they help:
        </p>
        <ol className="space-y-4">
          <li className="card p-5">
            <h2 className="font-semibold text-cream">1. Send it to one dad</h2>
            <p className="mt-2 text-muted">
              Word of mouth beats everything. One text to a friend who&apos;s
              been meaning to start is worth more than any donation.
            </p>
          </li>
          <li className="card p-5">
            <h2 className="font-semibold text-cream">
              2. Buy your gear through our links
            </h2>
            <p className="mt-2 text-muted">
              If you&apos;re buying equipment anyway, using the links on the{" "}
              <Link href="/gear" className="text-gold hover:text-gold-light">
                gear page
              </Link>{" "}
              costs you nothing extra and funds the site.
            </p>
          </li>
          <li className="card p-5">
            <h2 className="font-semibold text-cream">3. Chip in directly</h2>
            {bmc ? (
              <p className="mt-2 text-muted">
                <a
                  href={bmc}
                  target="_blank"
                  rel="noopener"
                  className="text-gold hover:text-gold-light"
                >
                  Buy the site a coffee ↗
                </a>{" "}
                - one-off, no subscription, goes straight to hosting and
                keeping the recipes coming.
              </p>
            ) : (
              <p className="mt-2 text-muted">
                Direct contributions are coming soon. For now, options 1 and 2
                are the best way to help.
              </p>
            )}
          </li>
        </ol>
        <p className="text-muted">
          Curious how the money side works?{" "}
          <Link href="/disclosure" className="text-gold hover:text-gold-light">
            Read the full disclosure
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
