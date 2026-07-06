"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { FLOOR_Y, POSE_CANVAS, isAttachedProp } from "@/lib/pose-types";
import type {
  AttachedProp,
  JointMap,
  PoseSet,
  SegmentName,
  StaticProp,
} from "@/lib/pose-types";
import { buildTimeline, ease, lerpJoints, segmentPoints } from "./pose-render";
import StaticProps from "./PoseProps";

const HEAD_R = 9;

const REDUCED_MQ = "(prefers-reduced-motion: reduce)";
function subscribeReducedMotion(cb: () => void) {
  const mq = window.matchMedia(REDUCED_MQ);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
function getReducedMotion() {
  return window.matchMedia(REDUCED_MQ).matches;
}

/**
 * Animated stick-figure demonstration. Drives the SVG imperatively via
 * requestAnimationFrame + setAttribute so 90 simultaneous instances on the
 * dev gallery never touch the React render loop. Pauses when off-screen
 * (IntersectionObserver) and honors prefers-reduced-motion by swapping the
 * loop for a manual keyframe step-through.
 */
export default function PoseAnimation({
  pose,
  label,
  freeze = false,
  className = "",
}: {
  pose: PoseSet;
  /** Accessible description, e.g. the movement name */
  label: string;
  /** Render restFrame statically (deterministic screenshots) */
  freeze?: boolean;
  className?: string;
}) {
  const timeline = useMemo(() => buildTimeline(pose), [pose]);
  const restJoints = pose.frames[pose.restFrame ?? 0].joints;

  const reduced = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => false);
  const [stepIdx, setStepIdx] = useState(pose.restFrame ?? 0);

  const svgRef = useRef<SVGSVGElement>(null);
  const animate = !freeze && !reduced;

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || !animate) return;

    let raf = 0;
    let visible = true;
    let stepI = 0;
    let elapsed = 0;
    let last: number | null = null;

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (last === null) {
        last = now;
        return;
      }
      // Clamp big gaps (tab switch / observer resume) to keep motion smooth
      elapsed += Math.min(now - last, 100);
      last = now;

      let step = timeline[stepI];
      while (elapsed >= step.durationMs) {
        elapsed -= step.durationMs;
        stepI = (stepI + 1) % timeline.length;
        step = timeline[stepI];
      }
      applyJoints(
        svg,
        lerpJoints(step.from, step.to, ease(elapsed / step.durationMs, step.easing)),
      );
    };

    const start = () => {
      if (!raf) {
        last = null;
        raf = requestAnimationFrame(tick);
      }
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(svg);

    const onVis = () => {
      if (document.hidden) stop();
      else if (visible) start();
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [timeline, animate]);

  // Reduced motion: show the chosen keyframe; freeze: always restFrame
  const staticJoints = reduced
    ? pose.frames[Math.min(stepIdx, pose.frames.length - 1)].joints
    : restJoints;

  const statics = (pose.props ?? []).filter(
    (p): p is StaticProp => !isAttachedProp(p),
  );
  const attached = (pose.props ?? []).filter(isAttachedProp);
  const hl = new Set(pose.highlight ?? []);

  return (
    <div className={className}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${POSE_CANVAS} ${POSE_CANVAS}`}
        role="img"
        aria-label={`Animated demonstration: ${label}`}
        className="h-full w-full"
      >
        <line className="pose-floor" x1={14} y1={FLOOR_Y} x2={POSE_CANVAS - 14} y2={FLOOR_Y} />
        <StaticProps props={statics} />
        <FigureBody joints={staticJoints} highlight={hl} attached={attached} />
      </svg>
      {reduced && !freeze && pose.frames.length > 1 && (
        <div className="mt-2 flex flex-wrap justify-center gap-1.5">
          {pose.frames.map((f, i) => (
            <button
              key={f.name + i}
              type="button"
              onClick={() => setStepIdx(i)}
              aria-pressed={i === stepIdx}
              className={`rounded-full border px-2.5 py-0.5 text-xs capitalize transition-colors ${
                i === stepIdx
                  ? "border-gold bg-gold text-ink"
                  : "border-edge text-muted hover:border-gold/40"
              }`}
            >
              {f.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * The figure. Every animatable node carries data-pose-* markers so the rAF
 * loop can find and mutate them without refs-per-element bookkeeping.
 */
function FigureBody({
  joints,
  highlight,
  attached,
}: {
  joints: JointMap;
  highlight: Set<SegmentName>;
  attached: AttachedProp[];
}) {
  const segs = segmentPoints(joints);
  const cls = (name: SegmentName, far: boolean) =>
    `pose-limb${far ? " pose-limb-far" : ""}${highlight.has(name) ? " pose-limb-gold" : ""}`;

  return (
    <>
      {/* far side first, near side over it */}
      <polyline data-pose-seg="armB" className={cls("armB", true)} points={segs.armB} />
      <polyline data-pose-seg="legB" className={cls("legB", true)} points={segs.legB} />
      <polyline data-pose-seg="spine" className={cls("spine", false)} points={segs.spine} />
      <circle
        data-pose-head
        className={highlight.has("head") ? "pose-head pose-head-gold" : "pose-head"}
        cx={joints.head[0]}
        cy={joints.head[1]}
        r={HEAD_R}
      />
      <polyline data-pose-seg="armF" className={cls("armF", false)} points={segs.armF} />
      <polyline data-pose-seg="legF" className={cls("legF", false)} points={segs.legF} />
      {attached.map((p, i) =>
        p.kind === "band" ? (
          <line
            key={i}
            data-pose-band={p.from}
            className="pose-band"
            x1={p.anchor[0]}
            y1={p.anchor[1]}
            x2={joints[p.from][0]}
            y2={joints[p.from][1]}
          />
        ) : (
          p.at.map((wrist) => (
            <circle
              key={`${i}-${wrist}`}
              data-pose-dumbbell={wrist}
              className="pose-dumbbell"
              cx={joints[wrist][0]}
              cy={joints[wrist][1]}
              r={5}
            />
          ))
        ),
      )}
    </>
  );
}

/** Imperative frame write - mirrors FigureBody's data-pose-* markers. */
function applyJoints(svg: SVGSVGElement, j: JointMap) {
  const segs = segmentPoints(j);
  svg.querySelectorAll<SVGPolylineElement>("[data-pose-seg]").forEach((el) => {
    el.setAttribute("points", segs[el.dataset.poseSeg as keyof typeof segs]);
  });
  const head = svg.querySelector<SVGCircleElement>("[data-pose-head]");
  if (head) {
    head.setAttribute("cx", String(j.head[0]));
    head.setAttribute("cy", String(j.head[1]));
  }
  svg.querySelectorAll<SVGLineElement>("[data-pose-band]").forEach((el) => {
    const from = el.dataset.poseBand as keyof JointMap;
    el.setAttribute("x2", String(j[from][0]));
    el.setAttribute("y2", String(j[from][1]));
  });
  svg.querySelectorAll<SVGCircleElement>("[data-pose-dumbbell]").forEach((el) => {
    const at = el.dataset.poseDumbbell as keyof JointMap;
    el.setAttribute("cx", String(j[at][0]));
    el.setAttribute("cy", String(j[at][1]));
  });
}
