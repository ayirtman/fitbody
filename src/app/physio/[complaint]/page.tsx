import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ComplaintId } from "@/lib/types";
import { complaints, complaintById, physioByComplaint } from "@/data";
import Disclaimer from "@/components/ui/Disclaimer";
import MovementCard from "@/components/exercise/MovementCard";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { pageMeta } from "@/lib/seo/meta";

export function generateStaticParams() {
  return complaints.map((c) => ({ complaint: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ complaint: string }>;
}): Promise<Metadata> {
  const { complaint } = await params;
  const c = complaintById.get(complaint as ComplaintId);
  if (!c) return {};
  return pageMeta({
    title: c.name,
    description: c.whoGetsThis,
    path: `/physio/${c.id}`,
  });
}

export default async function ComplaintPage({
  params,
}: {
  params: Promise<{ complaint: string }>;
}) {
  const { complaint } = await params;
  const id = complaint as ComplaintId;
  const c = complaintById.get(id);
  if (!c) notFound();

  const moves = physioByComplaint(id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-6">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Physio", href: "/physio" },
            { name: c.name, href: `/physio/${id}` },
          ]}
        />
      </div>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
        Physio · {c.name}
      </p>
      <h1 className="display lintel mt-1 text-4xl sm:text-5xl">{c.name}</h1>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="card p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gold">
            Sound familiar?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-cream/85">
            {c.whoGetsThis}
          </p>
        </section>
        <section className="card p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-sage">
            What helps
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-cream/85">
            {c.whatHelps}
          </p>
        </section>
      </div>

      <section className="mt-12">
        <h2 className="display lintel text-3xl">The exercises</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {moves.map((p) => (
            <MovementCard
              key={p.slug}
              movement={p}
              href={`/physio/${id}/${p.slug}`}
              kindLabel="Physio"
            />
          ))}
        </div>
      </section>

      <div className="mt-10 max-w-3xl">
        <Disclaimer compact />
      </div>
    </div>
  );
}
