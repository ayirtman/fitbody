import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo/meta";

export const metadata: Metadata = pageMeta({
  title: "Sponsor the Newsletter",
  description:
    "Put your brand in front of busy dads who train at home and cook high-protein food - one clearly-labelled sponsor slot per weekly issue.",
  path: "/sponsor",
});

export default function SponsorPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
        Sponsorship
      </p>
      <h1 className="display lintel mt-1 text-4xl sm:text-5xl">
        Sponsor the TempleFit weekly
      </h1>
      <div className="mt-8 space-y-6 text-sm leading-relaxed text-cream/85">
        <p>
          Once a week, TempleFit lands in the inbox of men who train at home,
          meal-prep on Sundays and fix their desk posture between meetings.
          They signed up on a site with no ads and no fluff - which is exactly
          why the one sponsor slot works.
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="card p-5 text-center">
            <p className="display text-3xl text-gold">1</p>
            <p className="mt-1 text-xs text-muted">
              sponsor slot per issue, clearly labelled
            </p>
          </div>
          <div className="card p-5 text-center">
            <p className="display text-3xl text-gold">Dads 28-45</p>
            <p className="mt-1 text-xs text-muted">
              home training, nutrition, desk-job recovery
            </p>
          </div>
          <div className="card p-5 text-center">
            <p className="display text-3xl text-gold">Weekly</p>
            <p className="mt-1 text-xs text-muted">
              every Monday, written fresh each week
            </p>
          </div>
        </div>
        <div className="card p-5">
          <h2 className="font-semibold text-cream">The format</h2>
          <p className="mt-2 text-muted">
            A single &quot;Presented by&quot; block near the top of the issue:
            your name, one honest sentence, one link. No banners, no tracking
            pixels beyond standard email opens, and we only take sponsors
            whose products we&apos;d let our readers buy without wincing -
            fitness gear, food, tools for busy parents.
          </p>
        </div>
        <p>
          Interested? Email{" "}
          <a
            href="mailto:batuayirtman@gmail.com?subject=TempleFit%20newsletter%20sponsorship"
            className="text-gold hover:text-gold-light"
          >
            batuayirtman@gmail.com
          </a>{" "}
          with who you are and what you&apos;d like to promote, and we&apos;ll
          reply with current audience numbers and pricing.
        </p>
        <p className="text-xs text-muted">
          Sponsors never influence editorial content.{" "}
          <Link href="/disclosure" className="underline hover:text-gold">
            Read our disclosure
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
