import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { stretches, stretchBySlug } from "@/data";
import { MOMENT_LABELS } from "@/lib/filters";
import MovementDetail from "@/components/exercise/MovementDetail";
import Badge from "@/components/ui/Badge";

export function generateStaticParams() {
  return stretches.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const stretch = stretchBySlug.get(slug);
  if (!stretch) return {};
  return { title: stretch.name, description: stretch.description };
}

export default async function StretchPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const stretch = stretchBySlug.get(slug);
  if (!stretch) notFound();

  return (
    <MovementDetail
      movement={stretch}
      favoriteKind="stretches"
      eyebrow="Stretch"
    >
      <section className="card flex flex-wrap items-center gap-x-10 gap-y-4 p-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">
            Hold
          </p>
          <p className="display mt-1 text-3xl text-gold tabular-nums">
            {stretch.holdSeconds}s
          </p>
        </div>
        {stretch.repsPerSide && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">
              Per side
            </p>
            <p className="display mt-1 text-3xl text-gold tabular-nums">
              ×{stretch.repsPerSide}
            </p>
          </div>
        )}
        <div className="ml-auto">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">
            Best for
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {stretch.bestFor.map((m) => (
              <Badge key={m} variant="sage">
                {MOMENT_LABELS[m]}
              </Badge>
            ))}
          </div>
        </div>
      </section>
    </MovementDetail>
  );
}
