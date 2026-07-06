import type { BodyView, MuscleId } from "@/lib/types";

/**
 * Hand-authored "athletic poster" figure. All geometry lives on a 220x460
 * canvas, bilaterally symmetric around x=110. Paired regions are authored as
 * the LEFT half only and rendered twice (direct + mirrored) so the figure is
 * always perfectly symmetric.
 */
export const VIEWBOX = "0 0 220 460";

export const MIRROR_TRANSFORM = "translate(220,0) scale(-1,1)";

export interface MuscleRegion {
  muscleId: MuscleId;
  /** Path for the left half (or the full path when `mirror` is false) */
  d: string;
  /** Render a mirrored twin across the x=110 axis */
  mirror: boolean;
}

/**
 * Left half of the body silhouette (head → outside of arm → hand → inner arm
 * → torso → outside of leg → foot → inner leg → crotch), closed along the
 * center line. Rendered twice with no stroke so the seam disappears.
 */
export const SILHOUETTE_HALF = `
  M110,12
  C 97,12 88,21 88,34
  C 88,44 92,52 98,56
  L 99,62
  C 99,68 94,71 85,74
  C 70,78 59,84 56,94
  C 52,106 50,122 48,138
  C 45,154 41,174 38,194
  C 35,202 34,210 37,216
  C 40,224 47,224 49,215
  C 53,201 57,185 60,168
  C 63,151 66,124 70,104
  L 74,98
  C 76,112 78,132 79,150
  C 80,168 82,182 84,196
  C 81,206 79,216 80,226
  C 76,252 74,282 78,312
  C 80,334 85,348 88,354
  C 85,374 84,398 88,420
  C 89,430 90,438 91,442
  L 86,448
  C 84,453 88,456 94,455
  L 102,451
  C 104,447 104,442 102,438
  C 100,420 100,400 100,382
  C 100,364 102,352 104,346
  C 107,322 107,292 106,262
  C 106,246 108,234 110,226
  Z
`;

/* ------------------------------ FRONT VIEW ------------------------------ */

export const frontRegions: MuscleRegion[] = [
  {
    // sternocleidomastoid / front neck — single midline plate
    muscleId: "neck",
    mirror: false,
    d: "M101,57 C 104,60 116,60 119,57 C 121,62 122,67 122,71 C 115,75 105,75 98,71 C 98,67 99,62 101,57 Z",
  },
  {
    // pectoral plate, left
    muscleId: "chest",
    mirror: true,
    d: "M109,78 C 98,76 84,77 77,83 C 73,91 74,103 80,111 C 88,118 102,119 109,114 C 111,103 111,89 109,78 Z",
  },
  {
    // deltoid cap, left
    muscleId: "shoulders",
    mirror: true,
    d: "M75,81 C 72,74 64,71 59,76 C 55,82 54,92 56,100 C 58,105 62,107 65,104 C 67,96 70,87 75,81 Z",
  },
  {
    // biceps, left
    muscleId: "biceps",
    mirror: true,
    d: "M56,104 C 52,112 50,126 51,140 C 54,148 63,150 68,144 C 70,131 70,116 68,106 C 64,101 58,100 56,104 Z",
  },
  {
    // forearm, left (front)
    muscleId: "forearms",
    mirror: true,
    d: "M49,150 C 45,162 41,180 39,196 C 41,204 49,206 53,200 C 57,184 61,166 63,152 C 59,146 52,146 49,150 Z",
  },
  {
    // rectus abdominis — midline column
    muscleId: "abs",
    mirror: false,
    d: "M96,121 C 101,117 119,117 124,121 C 127,142 127,170 123,192 C 118,198 102,198 97,192 C 93,170 93,142 96,121 Z",
  },
  {
    // obliques, left strip
    muscleId: "obliques",
    mirror: true,
    d: "M93,126 C 87,128 82,134 81,144 C 80,160 82,176 86,189 C 89,193 93,191 93,186 C 91,166 91,146 93,126 Z",
  },
  {
    // hip flexor wedge, left
    muscleId: "hip-flexors",
    mirror: true,
    d: "M94,198 C 88,199 83,204 82,211 C 88,220 98,226 107,229 C 107,220 103,206 98,199 Z",
  },
  {
    // quadriceps, left
    muscleId: "quads",
    mirror: true,
    d: "M83,222 C 77,242 76,272 79,302 C 81,322 86,336 92,340 C 99,336 103,322 103,302 L 103,244 C 100,230 90,220 83,222 Z",
  },
  {
    // calf (front/inner), left
    muscleId: "calves",
    mirror: true,
    d: "M87,356 C 83,372 83,396 86,416 C 89,424 96,424 98,416 C 100,394 99,370 96,356 C 93,350 89,350 87,356 Z",
  },
];

/** Non-interactive detail strokes, front view (rendered over plates) */
export const frontDecor: string[] = [
  // ab segmentation
  "M96,140 L124,140",
  "M95,158 L125,158",
  "M96,176 L124,176",
  // pec split (center line)
  "M110,78 L110,116",
];

/* ------------------------------- BACK VIEW ------------------------------ */

export const backRegions: MuscleRegion[] = [
  {
    // neck / upper traps column
    muscleId: "neck",
    mirror: false,
    d: "M102,56 C 106,59 114,59 118,56 C 120,62 121,68 121,73 C 114,76 106,76 99,73 C 99,68 100,62 102,56 Z",
  },
  {
    // trapezius / upper back, left half (diamond from neck to mid-spine)
    muscleId: "upper-back",
    mirror: true,
    d: "M109,77 C 100,77 88,79 79,84 C 88,90 99,97 104,109 C 107,117 109,124 109,130 L 109,77 Z",
  },
  {
    // rear deltoid cap, left
    muscleId: "shoulders",
    mirror: true,
    d: "M76,82 C 73,75 64,72 59,77 C 55,83 54,93 56,101 C 58,106 62,108 65,105 C 67,97 71,88 76,82 Z",
  },
  {
    // triceps, left
    muscleId: "triceps",
    mirror: true,
    d: "M56,105 C 52,113 50,127 51,141 C 54,149 63,151 68,145 C 70,132 70,117 68,107 C 64,102 58,101 56,105 Z",
  },
  {
    // forearm, left (back)
    muscleId: "forearms",
    mirror: true,
    d: "M49,151 C 45,163 41,181 39,197 C 41,205 49,207 53,201 C 57,185 61,167 63,153 C 59,147 52,147 49,151 Z",
  },
  {
    // latissimus, left
    muscleId: "lats",
    mirror: true,
    d: "M78,90 C 80,104 84,122 92,138 C 97,148 103,154 108,157 L 108,112 C 102,101 92,93 78,90 Z",
  },
  {
    // erector spinae / lower back — midline column
    muscleId: "lower-back",
    mirror: false,
    d: "M99,152 C 104,149 116,149 121,152 C 123,166 123,182 120,196 C 114,200 106,200 100,196 C 97,182 97,166 99,152 Z",
  },
  {
    // glutes, left
    muscleId: "glutes",
    mirror: true,
    d: "M108,202 C 97,199 86,203 81,213 C 78,226 83,238 93,242 C 103,244 108,237 109,228 L 108,202 Z",
  },
  {
    // hamstrings, left
    muscleId: "hamstrings",
    mirror: true,
    d: "M82,248 C 78,268 78,296 82,320 C 85,333 90,341 95,341 C 101,337 103,322 103,306 L 103,254 C 96,246 87,244 82,248 Z",
  },
  {
    // gastrocnemius, left
    muscleId: "calves",
    mirror: true,
    d: "M85,354 C 81,371 81,395 85,415 C 88,424 96,425 99,416 C 101,393 100,369 97,354 C 93,347 88,347 85,354 Z",
  },
];

/** Non-interactive detail strokes, back view */
export const backDecor: string[] = [
  // spine line
  "M110,77 L110,148",
  // glute split
  "M110,204 L110,240",
];

export const regionsByView: Record<BodyView, MuscleRegion[]> = {
  front: frontRegions,
  back: backRegions,
};

export const decorByView: Record<BodyView, string[]> = {
  front: frontDecor,
  back: backDecor,
};

/** Which views can show a given muscle (derived from the region tables) */
export const viewsForMuscle: Record<MuscleId, BodyView[]> = (() => {
  const map = {} as Record<MuscleId, BodyView[]>;
  for (const view of ["front", "back"] as const) {
    for (const r of regionsByView[view]) {
      (map[r.muscleId] ??= []).push(view);
    }
  }
  return map;
})();

/** Pick the view that shows the most of the given muscles (front wins ties) */
export function bestViewFor(muscleIds: MuscleId[]): BodyView {
  let front = 0;
  let back = 0;
  for (const id of muscleIds) {
    const views = viewsForMuscle[id] ?? [];
    if (views.includes("front")) front++;
    if (views.includes("back")) back++;
  }
  return back > front ? "back" : "front";
}
