import type {
  Easing,
  JointMap,
  PoseFrame,
  PoseSet,
  SegmentName,
  Vec2,
} from "@/lib/pose-types";

/**
 * Shared math for the pose renderer: timeline flattening, interpolation,
 * and joint→SVG-attribute mapping. Pure functions so both the rAF loop and
 * the static SSR render use identical output.
 */

export interface TimelineStep {
  from: JointMap;
  to: JointMap;
  durationMs: number;
  easing: Easing;
}

/** Flatten frames + loop mode into steps; holds become from===to steps. */
export function buildTimeline(set: PoseSet): TimelineStep[] {
  const steps: TimelineStep[] = [];
  const push = (from: PoseFrame, to: PoseFrame, durationMs: number) => {
    if (from.holdMs) {
      steps.push({
        from: from.joints,
        to: from.joints,
        durationMs: from.holdMs,
        easing: "linear",
      });
    }
    steps.push({
      from: from.joints,
      to: to.joints,
      durationMs,
      easing: from.easing ?? "easeInOut",
    });
  };

  const f = set.frames;
  if (set.loop === "cycle") {
    for (let i = 0; i < f.length; i++) {
      push(f[i], f[(i + 1) % f.length], f[i].durationMs);
    }
  } else {
    for (let i = 0; i < f.length - 1; i++) push(f[i], f[i + 1], f[i].durationMs);
    // Reverse leg reuses the forward gap durations
    for (let i = f.length - 1; i > 0; i--) push(f[i], f[i - 1], f[i - 1].durationMs);
  }
  return steps;
}

export function ease(t: number, kind: Easing): number {
  switch (kind) {
    case "linear":
      return t;
    case "easeOut":
      return 1 - (1 - t) * (1 - t);
    case "easeInOut":
      return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
  }
}

export function lerpJoints(a: JointMap, b: JointMap, t: number): JointMap {
  if (t <= 0 || a === b) return a;
  if (t >= 1) return b;
  const out = {} as Record<keyof JointMap, Vec2>;
  for (const k in a) {
    const key = k as keyof JointMap;
    const [ax, ay] = a[key];
    const [bx, by] = b[key];
    out[key] = [ax + (bx - ax) * t, ay + (by - ay) * t];
  }
  return out;
}

const pt = ([x, y]: Vec2) => `${x.toFixed(1)},${y.toFixed(1)}`;

/** Polyline `points` strings for the five limb chains, from a joint map. */
export function segmentPoints(j: JointMap): Record<Exclude<SegmentName, "head">, string> {
  return {
    spine: [j.neck, j.chest, j.hip].map(pt).join(" "),
    armF: [j.neck, j.elbowF, j.wristF].map(pt).join(" "),
    armB: [j.neck, j.elbowB, j.wristB].map(pt).join(" "),
    legF: [j.hip, j.kneeF, j.ankleF, j.toeF].map(pt).join(" "),
    legB: [j.hip, j.kneeB, j.ankleB, j.toeB].map(pt).join(" "),
  };
}
