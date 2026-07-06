import type { Metadata } from "next";
import Link from "next/link";
import Disclaimer from "@/components/ui/Disclaimer";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why TempleFit exists: free, honest fitness for working dads - short sessions, real food, no upsells on the basics.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
        About TempleFit
      </p>
      <h1 className="display lintel mt-1 text-4xl sm:text-5xl">
        Your body is a temple. Nobody said it was a cathedral.
      </h1>

      <div className="mt-8 space-y-5 text-cream/85 leading-relaxed">
        <p>
          TempleFit is for the dad with a job, a commute, a mortgage and a kid
          hanging off each arm. The one who used to train, still wants to, and
          keeps getting told the answer is a 90-minute gym program and a
          subscription.
        </p>
        <p>
          It isn&apos;t. The answer is fifteen honest minutes, most days, in
          your living room. Exercises that fix what the desk breaks. Stretches
          that undo the car seat. Food with enough protein and fiber to keep
          the engine running. That&apos;s the whole system, and it&apos;s all
          here - <strong className="text-gold">free, no account, no ads,
          no AI-generated filler</strong>. Every exercise, routine and recipe
          on this site was curated and written by people, deliberately.
        </p>
        <p>
          One day soon we&apos;ll add{" "}
          <Link href="/posture-ai" className="text-gold hover:text-gold-light">
            Posture AI
          </Link>{" "}
          - a paid, personalized program built from photos of your actual
          posture. That&apos;s how the lights stay on. The free library stays
          free. That&apos;s the deal, in writing.
        </p>
      </div>

      <h2 className="display lintel mt-12 text-3xl">The fine print</h2>
      <div className="mt-6 space-y-4">
        <Disclaimer />
        <p className="text-sm leading-relaxed text-muted">
          TempleFit provides general fitness and nutrition education for
          healthy adults. It is not medical advice, physiotherapy, or a
          substitute for either. Consult a qualified professional before
          starting a new exercise program - especially if you have a medical
          condition, an injury, or pain that is sharp, worsening, or has stuck
          around longer than two weeks. Nutrition targets and recipes are
          general starting points, not prescriptions. Your data (favorites,
          streaks, meal plans) is stored only in your browser - we never see
          it.
        </p>
      </div>
    </div>
  );
}
