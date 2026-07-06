import { notFound } from "next/navigation";
import { exercises } from "@/data/exercises";
import { stretches } from "@/data/stretches";
import { physioExercises } from "@/data/physio";
import { poseBySlug } from "@/data/poses";
import PoseAnimation from "@/components/pose/PoseAnimation";

/**
 * Pose authoring gallery — dev-only workbench, 404s in production builds.
 *
 * ?kind=exercise|stretch|physio  filter to one collection
 * ?slug=<movement>               frame strip + loop for a single movement
 * ?freeze=1                      static restFrames (deterministic screenshots)
 */

export const metadata = { robots: { index: false } };

const GROUPS = [
  { kind: "exercise", title: "Exercises", items: exercises },
  { kind: "stretch", title: "Stretches", items: stretches },
  { kind: "physio", title: "Physio", items: physioExercises },
] as const;

export default async function PoseGallery({
  searchParams,
}: {
  searchParams: Promise<{ kind?: string; slug?: string; freeze?: string }>;
}) {
  if (process.env.NODE_ENV === "production") notFound();
  const { kind, slug, freeze } = await searchParams;

  if (slug) return <SingleMovement slug={slug} />;

  const groups = GROUPS.filter((g) => !kind || g.kind === kind);
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      {groups.map((g) => {
        const done = g.items.filter((m) => poseBySlug.has(m.slug)).length;
        return (
          <section key={g.kind} className="mb-12">
            <h2 className="display lintel mb-6 text-3xl">
              {g.title}{" "}
              <span className="text-muted">
                {done}/{g.items.length}
              </span>
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
              {g.items.map((m) => {
                const pose = poseBySlug.get(m.slug);
                return (
                  <div
                    key={m.slug}
                    className={`card p-2 ${pose ? "" : "border-ember/60"}`}
                  >
                    <p className="mb-1 truncate text-center text-xs text-muted">
                      {m.slug}
                    </p>
                    {pose ? (
                      <PoseAnimation
                        pose={pose}
                        label={m.name}
                        freeze={freeze === "1"}
                        className="h-36"
                      />
                    ) : (
                      <div className="flex h-36 items-center justify-center text-xs text-ember">
                        missing
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function SingleMovement({ slug }: { slug: string }) {
  const all: { slug: string; name: string; steps: string[] }[] = [
    ...exercises,
    ...stretches,
    ...physioExercises,
  ];
  const movement = all.find((m) => m.slug === slug);
  const pose = poseBySlug.get(slug);
  if (!movement || !pose) {
    return (
      <p className="p-10 text-ember">
        No pose set for &quot;{slug}&quot; {movement ? "" : "(unknown movement)"}
      </p>
    );
  }
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="display lintel mb-2 text-3xl">{movement.name}</h1>
      <p className="mb-8 max-w-2xl text-sm text-muted">
        {movement.steps.join(" · ")}
      </p>
      <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {pose.frames.map((f, i) => (
          <div key={f.name} className="card p-2">
            <p className="mb-1 text-center text-xs text-muted">
              {i}: {f.name}
            </p>
            <PoseAnimation
              pose={{ ...pose, restFrame: i }}
              label={`${movement.name} — ${f.name}`}
              freeze
              className="h-44"
            />
          </div>
        ))}
      </div>
      <div className="card mx-auto max-w-sm p-4">
        <p className="mb-1 text-center text-xs text-muted">loop ({pose.loop})</p>
        <PoseAnimation pose={pose} label={movement.name} className="h-64" />
      </div>
    </div>
  );
}
