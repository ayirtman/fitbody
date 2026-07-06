import type { JointMap, Vec2 } from "@/lib/pose-types";

/**
 * Canonical base poses + authoring helper for movement demonstrations.
 *
 * READ src/lib/pose-types.ts BEFORE AUTHORING — it defines the canvas,
 * floor, joint names, and bone lengths. Quick recap:
 *
 * - 200×200 canvas, y grows DOWNWARD, floor line at y=170.
 *   Joints must stay above y=174 and inside x∈[6,194].
 * - Figure faces RIGHT in side view. "F" = near-side limb, "B" = far side
 *   (drawn dimmer). Symmetric side-view poses: B trails F by (-3, 0).
 * - Bone lengths (keep within ~±15% in EVERY frame — validated):
 *   neck→head 15 · neck→chest 20 · chest→hip 26 · neck→elbow 24 ·
 *   elbow→wrist 20 · hip→knee 26 · knee→ankle 23 · ankle→toe 12
 *
 * Author frames with `j(BASE, { overrides })`. Move as few joints as
 * possible between frames — the motion should read as one clear action.
 */

export function j(base: JointMap, overrides: Partial<Record<keyof JointMap, Vec2>>): JointMap {
  return { ...base, ...overrides };
}

/** Standing tall, arms at sides, facing right. */
export const STANDING: JointMap = {
  head: [100, 56],
  neck: [100, 71],
  chest: [100, 91],
  hip: [100, 117],
  elbowF: [102, 95],
  wristF: [103, 115],
  elbowB: [99, 95],
  wristB: [100, 115],
  kneeF: [100, 143],
  ankleF: [100, 166],
  toeF: [112, 168],
  kneeB: [97, 143],
  ankleB: [97, 166],
  toeB: [109, 168],
};

/** High plank: hands under shoulders, body a straight line, head right. */
export const PLANK: JointMap = {
  head: [144, 117],
  neck: [130, 122],
  chest: [111, 129],
  hip: [87, 138],
  elbowF: [131, 146],
  wristF: [133, 166],
  elbowB: [128, 146],
  wristB: [130, 166],
  kneeF: [63, 148],
  ankleF: [41, 156],
  toeF: [38, 168],
  kneeB: [60, 148],
  ankleB: [38, 156],
  toeB: [35, 168],
};

/** Hands and knees, back flat, facing right. */
export const QUADRUPED: JointMap = {
  head: [143, 128],
  neck: [129, 133],
  chest: [109, 135],
  hip: [83, 137],
  elbowF: [136, 156],
  wristF: [153, 166],
  elbowB: [133, 156],
  wristB: [150, 166],
  kneeF: [83, 163],
  ankleF: [60, 164],
  toeF: [48, 166],
  kneeB: [80, 163],
  ankleB: [57, 164],
  toeB: [45, 166],
};

/** Lying on back, knees bent, feet flat, head left. */
export const SUPINE: JointMap = {
  head: [60, 159],
  neck: [75, 161],
  chest: [95, 161],
  hip: [121, 161],
  elbowF: [99, 163],
  wristF: [119, 164],
  elbowB: [96, 163],
  wristB: [116, 164],
  kneeF: [140, 143],
  ankleF: [147, 165],
  toeF: [159, 165],
  kneeB: [137, 143],
  ankleB: [144, 165],
  toeB: [156, 165],
};

/** Sitting on floor, legs extended right, spine tall. */
export const SEATED: JointMap = {
  head: [85, 102],
  neck: [85, 117],
  chest: [85, 137],
  hip: [85, 163],
  elbowF: [89, 140],
  wristF: [98, 157],
  elbowB: [86, 140],
  wristB: [95, 157],
  kneeF: [110, 157],
  ankleF: [132, 162],
  toeF: [144, 160],
  kneeB: [107, 157],
  ankleB: [129, 162],
  toeB: [141, 160],
};

/**
 * Dead hang from a bar at y=26 (add `{ kind: "bar", y: 26 }` to props).
 * FRONT view — hanging moves read as a blob in side view. F = right arm/leg.
 */
export const HANGING: JointMap = {
  head: [100, 51],
  neck: [100, 66],
  chest: [100, 86],
  hip: [100, 112],
  elbowF: [108, 44],
  wristF: [114, 26],
  elbowB: [92, 44],
  wristB: [86, 26],
  kneeF: [102, 138],
  ankleF: [103, 161],
  toeF: [105, 169],
  kneeB: [98, 138],
  ankleB: [97, 161],
  toeB: [95, 169],
};
