import type { PoseSet } from "@/lib/pose-types";
import { HANGING, PLANK, j } from "./reference";

/**
 * Pose sets for exercises 1–24 (push-up … towel-resisted-extension).
 * push-up and dead-hang are lead-authored exemplars — match their quality.
 */
export const exercisePosesA: PoseSet[] = [
  {
    slug: "push-up",
    loop: "pingPong",
    highlight: ["armF", "armB"],
    frames: [
      {
        name: "top",
        joints: PLANK,
        durationMs: 900,
        holdMs: 250,
      },
      {
        // Elbows bend back, whole body line drops toward the floor as one plank
        name: "bottom",
        joints: j(PLANK, {
          head: [147, 133],
          neck: [133, 138],
          chest: [113, 143],
          hip: [88, 149],
          elbowF: [117, 158],
          elbowB: [114, 158],
          kneeF: [64, 155],
          ankleF: [45, 158],
          kneeB: [61, 155],
          ankleB: [42, 158],
        }),
        durationMs: 900,
        holdMs: 150,
      },
    ],
  },
  {
    slug: "dead-hang",
    loop: "pingPong",
    highlight: ["armF", "armB"],
    props: [{ kind: "bar", y: 26 }],
    frames: [
      {
        name: "hang",
        joints: HANGING,
        durationMs: 1400,
        holdMs: 500,
      },
      {
        // Subtle breathing sway — hips and legs drift right, grip stays fixed
        name: "sway",
        joints: j(HANGING, {
          chest: [101, 87],
          hip: [102, 113],
          kneeF: [105, 139],
          ankleF: [107, 161],
          toeF: [109, 169],
          kneeB: [101, 139],
          ankleB: [101, 161],
          toeB: [99, 169],
        }),
        durationMs: 1400,
        holdMs: 500,
      },
    ],
  },
];
