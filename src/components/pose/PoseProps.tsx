import { FLOOR_Y, POSE_CANVAS } from "@/lib/pose-types";
import type { StaticProp } from "@/lib/pose-types";

/** Scene furniture that never moves - rendered once, outside the rAF loop. */
export default function StaticProps({ props }: { props: StaticProp[] }) {
  return (
    <>
      {props.map((p, i) => {
        switch (p.kind) {
          case "wall":
            return (
              <line
                key={i}
                className="pose-prop"
                x1={p.x}
                y1={20}
                x2={p.x}
                y2={FLOOR_Y}
              />
            );
          case "bar":
            return (
              <line
                key={i}
                className="pose-prop"
                x1={p.x1 ?? 40}
                y1={p.y}
                x2={p.x2 ?? POSE_CANVAS - 40}
                y2={p.y}
              />
            );
          case "box":
            return (
              <rect
                key={i}
                className="pose-prop-fill"
                x={p.x}
                y={p.y}
                width={p.w}
                height={p.h}
                rx={3}
              />
            );
          case "doorway":
            return (
              <g key={i} className="pose-prop">
                <line x1={p.x1} y1={20} x2={p.x1} y2={FLOOR_Y} />
                <line x1={p.x2} y1={20} x2={p.x2} y2={FLOOR_Y} />
              </g>
            );
        }
      })}
    </>
  );
}
