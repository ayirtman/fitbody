import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pageMeta } from "@/lib/seo/meta";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import MovementCard from "@/components/exercise/MovementCard";
import RoutineCard from "@/components/routine/RoutineCard";
import GearKit from "@/components/gear/GearKit";
import SectionHeader from "@/components/ui/SectionHeader";
import { exercises, routines } from "@/data";
import type { Equipment } from "@/lib/types";
import { ALL_EQUIPMENT, EQUIPMENT_COPY } from "@/lib/equipment";
import { EQUIPMENT_LABELS } from "@/lib/filters";

export function generateStaticParams() {
  return ALL_EQUIPMENT.map((type) => ({ type }));
}

function isEquipment(v: string): v is Equipment {
  return (ALL_EQUIPMENT as string[]).includes(v);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>;
}): Promise<Metadata> {
  const { type } = await params;
  if (!isEquipment(type)) return {};
  return pageMeta({
    title: `${EQUIPMENT_LABELS[type]} Workouts`,
    description: EQUIPMENT_COPY[type].seo,
    path: `/equipment/${type}`,
  });
}

export default async function EquipmentHubPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  if (!isEquipment(type)) notFound();

  const copy = EQUIPMENT_COPY[type];
  const matchingExercises = exercises.filter((e) =>
    e.equipment.includes(type),
  );
  const matchingRoutines = routines.filter((r) =>
    type === "none"
      ? r.equipment.length === 1 && r.equipment[0] === "none"
      : r.equipment.includes(type),
  );
  const singleEquipmentRoutines = matchingRoutines.filter(
    (r) => r.equipment.filter((e) => e !== "none").length <= 1,
  );
  const mixedRoutines = matchingRoutines.filter(
    (r) => !singleEquipmentRoutines.includes(r),
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-6">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Equipment", href: "/equipment" },
            { name: EQUIPMENT_LABELS[type], href: `/equipment/${type}` },
          ]}
        />
      </div>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
        {EQUIPMENT_LABELS[type]}
      </p>
      <h1 className="display lintel mt-1 text-4xl sm:text-5xl">
        {copy.headline}
      </h1>
      <p className="mt-4 max-w-xl text-muted">{copy.blurb}</p>

      {singleEquipmentRoutines.length > 0 && (
        <section className="mt-12">
          <SectionHeader
            eyebrow="Just this, nothing else"
            title="Ready-made routines"
          />
          <p className="mt-3 text-sm text-muted">
            Pre-programmed sessions built around
            {type === "none"
              ? " nothing but you"
              : ` this one piece of kit`}{" "}
            - the quickest win in the building.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {singleEquipmentRoutines.map((r) => (
              <RoutineCard key={r.slug} routine={r} />
            ))}
          </div>
        </section>
      )}

      {mixedRoutines.length > 0 && (
        <section className="mt-12">
          <SectionHeader
            eyebrow="Uses this and more"
            title="Also worth a look"
          />
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {mixedRoutines.map((r) => (
              <RoutineCard key={r.slug} routine={r} />
            ))}
          </div>
        </section>
      )}

      <section className="mt-12">
        <SectionHeader
          eyebrow="Build your own"
          title={`All ${matchingExercises.length} exercises`}
        />
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {matchingExercises.map((e) => (
            <MovementCard
              key={e.slug}
              movement={e}
              href={`/exercises/${e.slug}`}
            />
          ))}
        </div>
      </section>

      {type !== "none" && (
        <div className="mt-12">
          <GearKit equipment={[type]} />
        </div>
      )}

      <p className="mt-10 text-sm text-muted">
        Got something else in the cupboard?{" "}
        <Link href="/equipment" className="font-medium text-gold hover:text-gold-light">
          Pick different equipment
        </Link>{" "}
        or browse the{" "}
        <Link href="/exercises" className="font-medium text-gold hover:text-gold-light">
          full library
        </Link>
        .
      </p>
    </div>
  );
}
