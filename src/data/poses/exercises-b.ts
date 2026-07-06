import type { PoseSet } from "@/lib/pose-types";
import { STANDING, j } from "./reference";

/**
 * Pose sets for exercises 25–48 (mountain-climber … single-leg-hip-hinge).
 * bodyweight-squat is a lead-authored exemplar — match its quality.
 */
export const exercisePosesB: PoseSet[] = [
  {
    slug: "bodyweight-squat",
    loop: "pingPong",
    highlight: ["legF", "legB"],
    frames: [
      {
        // Arms reach forward as counterbalance even at the top
        name: "top",
        joints: j(STANDING, {
          elbowF: [118, 84],
          wristF: [137, 90],
          elbowB: [115, 84],
          wristB: [134, 90],
        }),
        durationMs: 1000,
        holdMs: 200,
      },
      {
        // Hips back and down, knees track over toes, torso leans slightly
        name: "bottom",
        joints: j(STANDING, {
          head: [102, 96],
          neck: [100, 111],
          chest: [96, 130],
          hip: [86, 152],
          elbowF: [118, 122],
          wristF: [137, 128],
          elbowB: [115, 122],
          wristB: [134, 128],
          kneeF: [110, 148],
          kneeB: [107, 148],
        }),
        durationMs: 1000,
        holdMs: 200,
      },
    ],
  },
];
