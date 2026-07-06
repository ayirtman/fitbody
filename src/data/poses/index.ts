import type { PoseSet } from "@/lib/pose-types";
import { exercisePosesA } from "./exercises-a";
import { exercisePosesB } from "./exercises-b";
import { stretchPoses } from "./stretches";
import { physioPoses } from "./physio";

export const poseSets: PoseSet[] = [
  ...exercisePosesA,
  ...exercisePosesB,
  ...stretchPoses,
  ...physioPoses,
];

export const poseBySlug: ReadonlyMap<string, PoseSet> = new Map(
  poseSets.map((p) => [p.slug, p]),
);
