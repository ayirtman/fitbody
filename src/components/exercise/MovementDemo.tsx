import { poseBySlug } from "@/data/poses";
import PoseAnimation from "@/components/pose/PoseAnimation";

/** Animated demonstration card; renders nothing for uncovered movements. */
export default function MovementDemo({
  slug,
  name,
}: {
  slug: string;
  name: string;
}) {
  const pose = poseBySlug.get(slug);
  if (!pose) return null;
  return (
    <div className="card p-4">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gold">
        Demonstration
      </p>
      <PoseAnimation pose={pose} label={name} className="h-56 sm:h-64" />
    </div>
  );
}
