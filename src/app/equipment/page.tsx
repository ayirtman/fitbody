import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo/meta";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Badge from "@/components/ui/Badge";
import { exercises, routines } from "@/data";
import { ALL_EQUIPMENT, EQUIPMENT_COPY } from "@/lib/equipment";
import { EQUIPMENT_LABELS } from "@/lib/filters";

export const metadata: Metadata = pageMeta({
  title: "Train With What You Have",
  description:
    "Pick your equipment - or none at all - and get every exercise and routine that works with it. Nobody has a gym at home; you don't need one.",
  path: "/equipment",
});

export default function EquipmentPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-6">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Equipment", href: "/equipment" },
          ]}
        />
      </div>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
        Train with what you have
      </p>
      <h1 className="display lintel mt-1 text-4xl sm:text-5xl">
        Nobody has a gym at home.
      </h1>
      <p className="mt-4 max-w-xl text-muted">
        You don&apos;t need one. Pick what&apos;s in your cupboard - or nothing
        at all - and we&apos;ll show you every exercise and routine that works
        with it.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {ALL_EQUIPMENT.map((eq) => {
          const exerciseCount = exercises.filter((e) =>
            e.equipment.includes(eq),
          ).length;
          const routineCount = routines.filter((r) =>
            eq === "none"
              ? r.equipment.length === 1 && r.equipment[0] === "none"
              : r.equipment.includes(eq),
          ).length;
          return (
            <Link
              key={eq}
              href={`/equipment/${eq}`}
              className="card flex flex-col p-6"
            >
              <h2 className="display text-2xl">{EQUIPMENT_LABELS[eq]}</h2>
              <p className="mt-2 flex-1 text-sm text-muted">
                {EQUIPMENT_COPY[eq].blurb}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                <Badge variant="gold">{exerciseCount} exercises</Badge>
                {routineCount > 0 && (
                  <Badge variant="outline">
                    {routineCount} routine{routineCount === 1 ? "" : "s"}
                  </Badge>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
