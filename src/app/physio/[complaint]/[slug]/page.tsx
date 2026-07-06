import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ComplaintId } from "@/lib/types";
import {
  complaints,
  complaintById,
  physioBySlug,
  physioByComplaint,
} from "@/data";
import MovementDetail from "@/components/exercise/MovementDetail";
import Disclaimer from "@/components/ui/Disclaimer";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { howToSchema } from "@/lib/seo/schema";
import { pageMeta } from "@/lib/seo/meta";

export function generateStaticParams() {
  return complaints.flatMap((c) =>
    physioByComplaint(c.id).map((p) => ({ complaint: c.id, slug: p.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ complaint: string; slug: string }>;
}): Promise<Metadata> {
  const { complaint, slug } = await params;
  const move = physioBySlug.get(slug);
  if (!move) return {};
  return pageMeta({
    title: move.name,
    description: move.description,
    path: `/physio/${complaint}/${move.slug}`,
    type: "article",
  });
}

export default async function PhysioMovePage({
  params,
}: {
  params: Promise<{ complaint: string; slug: string }>;
}) {
  const { complaint, slug } = await params;
  const id = complaint as ComplaintId;
  const c = complaintById.get(id);
  const move = physioBySlug.get(slug);
  if (!c || !move || !move.complaints.includes(id)) notFound();

  return (
    <>
      <JsonLd data={howToSchema(move, `/physio/${id}/${move.slug}`)} />
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Physio", href: "/physio" },
            { name: c.name, href: `/physio/${id}` },
            { name: move.name, href: `/physio/${id}/${move.slug}` },
          ]}
        />
      </div>
      <MovementDetail
        movement={move}
        favoriteKind="physio"
        eyebrow={`Physio · ${c.name}`}
      >
        <section className="card flex flex-wrap items-center gap-x-10 gap-y-3 p-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">
              How often
            </p>
            <p className="display mt-1 text-2xl text-gold">{move.frequency}</p>
          </div>
        </section>
        <section className="rounded-xl border border-ember/40 bg-ember/10 p-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-ember">
            Stop if
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-cream/90">
            {move.stopIf}
          </p>
        </section>
      </MovementDetail>
      <div className="mx-auto max-w-7xl px-4 pb-14 sm:px-6">
        <div className="max-w-3xl">
          <Disclaimer compact />
        </div>
      </div>
    </>
  );
}
