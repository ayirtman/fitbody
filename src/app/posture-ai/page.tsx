import type { Metadata } from "next";
import WaitlistForm from "@/components/waitlist/WaitlistForm";

export const metadata: Metadata = {
  title: "Posture AI — Coming Soon",
  description:
    "AI posture analysis is coming: snap two photos, answer a few questions, get a training program built for your body. Join the waitlist.",
};

const features = [
  {
    title: "Photo posture scan",
    body: "Two photos — front and side. The AI reads shoulder tilt, pelvic position, forward head and more, the way a good physio's eye would.",
    icon: (
      <path d="M4 7h3l2-2h6l2 2h3v12H4zM12 10a3.5 3.5 0 110 7 3.5 3.5 0 010-7z" />
    ),
  },
  {
    title: "A few honest questions",
    body: "Where it hurts, what you sit on all day, what equipment you own, how many minutes you really have. No 40-page intake form.",
    icon: <path d="M12 4a8 8 0 018 8c0 4.4-3.6 8-8 8H4l2.4-2.4A8 8 0 0112 4zM9 10h6M9 13h4" />,
  },
  {
    title: "Your program, not a template",
    body: "A week-by-week plan targeting your imbalances, built from the same exercise library you already know — and it adapts as you progress.",
    icon: (
      <path d="M5 4v16M5 8c3 0 4-2 7-2s4 2 7 2v8c-3 0-4-2-7-2s-4 2-7 2" />
    ),
  },
];

export default function PostureAiPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
          Phase 2 · Coming Soon
        </p>
        <h1 className="display mx-auto mt-3 max-w-3xl text-5xl sm:text-7xl">
          A program built for <span className="text-gold">your</span> body.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-muted">
          The free library treats every dad the same. Posture AI won&apos;t: it
          looks at how you actually stand, asks a few sharp questions, and
          builds a personalized program to straighten what the desk bent.
        </p>
      </div>

      {/* posture scan illustration */}
      <div className="mx-auto mt-14 max-w-sm">
        <svg viewBox="0 0 320 200" role="img" aria-label="Posture scan illustration">
          <rect x="0" y="0" width="320" height="200" rx="16" fill="var(--color-surface-1)" />
          {/* scan lines */}
          <line x1="40" y1="30" x2="280" y2="30" stroke="var(--color-gold)" strokeWidth="0.6" opacity="0.35" />
          <line x1="40" y1="70" x2="280" y2="70" stroke="var(--color-gold)" strokeWidth="0.6" opacity="0.35" />
          <line x1="40" y1="110" x2="280" y2="110" stroke="var(--color-gold)" strokeWidth="0.6" opacity="0.35" />
          <line x1="40" y1="150" x2="280" y2="150" stroke="var(--color-gold)" strokeWidth="0.6" opacity="0.35" />
          {/* side-view slouched figure */}
          <g stroke="var(--color-muted)" strokeWidth="3" fill="none" strokeLinecap="round">
            <circle cx="118" cy="42" r="12" />
            <path d="M115 54 C 108 70 106 88 110 108 L 110 150 M110 108 L 96 150" />
            <path d="M112 66 C 122 74 130 84 132 96" />
          </g>
          {/* corrected figure */}
          <g stroke="var(--color-gold)" strokeWidth="3" fill="none" strokeLinecap="round">
            <circle cx="208" cy="36" r="12" />
            <path d="M208 48 L 208 108 L 208 150 M208 108 L 196 150" />
            <path d="M208 62 C 218 70 224 80 226 92" />
          </g>
          {/* angle markers */}
          <g fill="var(--color-ember)" fontSize="9" fontFamily="monospace">
            <text x="72" y="46">-14°</text>
            <text x="86" y="92">+9°</text>
          </g>
          <g fill="var(--color-sage)" fontSize="9" fontFamily="monospace">
            <text x="236" y="40">0°</text>
            <text x="236" y="92">0°</text>
          </g>
          <text x="96" y="182" fill="var(--color-muted)" fontSize="10">Now</text>
          <text x="192" y="182" fill="var(--color-gold)" fontSize="10">12 weeks in</text>
        </svg>
      </div>

      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {features.map((f) => (
          <div key={f.title} className="card p-6">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-gold)"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {f.icon}
            </svg>
            <h2 className="display mt-4 text-2xl">{f.title}</h2>
            <p className="mt-2 text-sm text-muted">{f.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className="display text-3xl">Be first through the door.</h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted">
          Waitlist members get early access and founding pricing. Everything
          else on TempleFit stays free — that&apos;s the deal.
        </p>
        <div className="relative mt-6">
          <WaitlistForm />
        </div>
      </div>
    </div>
  );
}
