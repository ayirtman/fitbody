import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo/meta";
import Link from "next/link";
import { complaints, physioByComplaint } from "@/data";
import Disclaimer from "@/components/ui/Disclaimer";

export const metadata: Metadata = pageMeta({
  title: "Physio & Pain Relief",
  description:
    "Gentle, proven physio exercises for the classic working-dad complaints: lower back pain, desk neck, tight hips, knee pain, shoulder impingement and wrist trouble.",
  path: "/physio",
});

const icons: Record<string, React.ReactNode> = {
  "lower-back-pain": (
    <path d="M12 3v18M8 7c2.5 1.5 5.5 1.5 8 0M8 12c2.5 1.5 5.5 1.5 8 0M8 17c2.5 1.5 5.5 1.5 8 0" />
  ),
  "desk-neck": <path d="M12 4a4 4 0 110 8 4 4 0 010-8zM12 12v9M7 21c1-3 3-4.5 5-4.5s4 1.5 5 4.5" />,
  "tight-hips": <path d="M6 4v7a6 6 0 006 6 6 6 0 006-6V4M12 17v4" />,
  "knee-pain": <path d="M9 3v6a3 3 0 003 3 3 3 0 013 3v6M15 3v4M9 17v4" />,
  "shoulder-impingement": (
    <path d="M4 12a8 8 0 0116 0M12 12v7M8 21h8M12 4v2" />
  ),
  "wrist-carpal": <path d="M7 3v8a5 5 0 0010 0V3M12 16v5M9 21h6" />,
};

export default function PhysioPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
        Physio & Pain Relief
      </p>
      <h1 className="display lintel mt-1 text-4xl sm:text-5xl">
        Fix what hurts. Gently.
      </h1>
      <p className="mt-4 max-w-xl text-muted">
        The classic working-dad complaints, each with a set of gentle,
        physio-grade exercises you can start today. Slow, boring, effective.
      </p>

      <div className="mt-8 max-w-3xl">
        <Disclaimer />
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {complaints.map((c) => {
          const count = physioByComplaint(c.id).length;
          return (
            <Link
              key={c.id}
              href={`/physio/${c.id}`}
              className="card flex flex-col p-6"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-gold)"
                strokeWidth="1.6"
                strokeLinecap="round"
                aria-hidden="true"
              >
                {icons[c.id]}
              </svg>
              <h2 className="display mt-4 text-2xl">{c.name}</h2>
              <p className="mt-2 line-clamp-3 text-sm text-muted">
                {c.whoGetsThis}
              </p>
              <p className="mt-4 text-sm font-semibold text-gold">
                {count} exercises →
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
