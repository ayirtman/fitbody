/**
 * Movement-demonstration pose model.
 *
 * Conventions (the contract every pose set must follow):
 * - Canvas: 200×200, y-down SVG coordinates.
 * - Floor: FLOOR_Y = 170. The renderer always draws the floor line; no joint
 *   may sit below y = 174 (validator-enforced).
 * - The figure faces RIGHT (+x) in side view. Frontal-plane moves may be
 *   authored as front view - joints are just 2D points either way.
 * - "F" joints are the near-side limb (viewer's side), "B" the far side.
 *   In symmetric side-view poses, offset far joints (-3, 0) from their twins.
 * - Bone proportions (must hold in every frame; validator checks drift):
 *   head r=9 (center ~15 above neck when standing), neck→chest 20,
 *   chest→hip 26, neck→elbow 24, elbow→wrist 20, hip→knee 26,
 *   knee→ankle 23, ankle→toe 12.
 * - Timing: one strength rep ≈ 1600–2400 ms; stretches pingPong with a
 *   hold (800–1500 ms) at end range. Default easing "easeInOut".
 */

export const POSE_CANVAS = 200;
export const FLOOR_Y = 170;

export type Vec2 = readonly [number, number];

export const JOINTS = [
  "head",
  "neck",
  "chest",
  "hip",
  "elbowF",
  "wristF",
  "elbowB",
  "wristB",
  "kneeF",
  "ankleF",
  "toeF",
  "kneeB",
  "ankleB",
  "toeB",
] as const;

export type JointName = (typeof JOINTS)[number];
export type JointMap = Record<JointName, Vec2>;

export type SegmentName = "spine" | "armF" | "armB" | "legF" | "legB" | "head";

export type StaticProp =
  | { kind: "wall"; x: number }
  | { kind: "bar"; y: number; x1?: number; x2?: number }
  | { kind: "box"; x: number; y: number; w: number; h: number }
  | { kind: "doorway"; x1: number; x2: number };

export type AttachedProp =
  | { kind: "dumbbell"; at: ("wristF" | "wristB")[] }
  | { kind: "band"; from: JointName; anchor: Vec2 };

export type PoseProp = StaticProp | AttachedProp;

export type Easing = "linear" | "easeInOut" | "easeOut";

export interface PoseFrame {
  /** Self-documenting label: "top", "bottom", "reach"… */
  name: string;
  /** ALL 14 joints, every frame - keeps lerp and validation trivial */
  joints: JointMap;
  /** Time to interpolate from THIS frame to the NEXT */
  durationMs: number;
  /** Pause at this pose before transitioning (default 0) */
  holdMs?: number;
  /** Easing for the outgoing transition (default "easeInOut") */
  easing?: Easing;
}

export interface PoseSet {
  /** Must match a movement slug */
  slug: string;
  /** >= 2 frames */
  frames: PoseFrame[];
  /**
   * "cycle": last frame transitions back to frame 0 over its durationMs
   * (mountain climber, bicycle crunch). "pingPong": plays 0→N→0 reusing gap
   * durations in reverse; the last frame's durationMs is ignored (reps,
   * stretches, holds).
   */
  loop: "cycle" | "pingPong";
  props?: PoseProp[];
  /** Segments drawn in gold - the primary movers */
  highlight?: SegmentName[];
  /** Frame shown for SSR and reduced motion (default 0) */
  restFrame?: number;
}

export function isAttachedProp(p: PoseProp): p is AttachedProp {
  return p.kind === "dumbbell" || p.kind === "band";
}
