/**
 * Build-time content integrity checks for the hand-authored data library.
 * Run via `npm run validate` (wired into `prebuild`). Exits non-zero and
 * prints every violation when the content breaks an invariant.
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { muscles } from "../src/data/muscles";
import { exercises } from "../src/data/exercises";
import { stretches } from "../src/data/stretches";
import { complaints, physioExercises } from "../src/data/physio";
import { routines } from "../src/data/routines";
import { recipes } from "../src/data/recipes";
import { mealPrepPlans } from "../src/data/mealPrepPlans";
import { poseSets } from "../src/data/poses";
import type { BaseMovement, ComplaintId, MuscleId } from "../src/lib/types";
import { JOINTS, POSE_CANVAS, isAttachedProp } from "../src/lib/pose-types";
import type { JointName } from "../src/lib/pose-types";

const errors: string[] = [];

function assert(cond: boolean, message: string) {
  if (!cond) errors.push(message);
}

function assertUniqueSlugs(items: { slug: string }[], label: string) {
  const seen = new Set<string>();
  for (const i of items) {
    if (seen.has(i.slug)) errors.push(`${label}: duplicate slug "${i.slug}"`);
    seen.add(i.slug);
  }
}

const muscleIds = new Set<MuscleId>(muscles.map((m) => m.id));
const complaintIds = new Set<ComplaintId>(complaints.map((c) => c.id));

function assertMovement(m: BaseMovement, label: string) {
  const where = `${label} "${m.slug}"`;
  assert(m.steps.length >= 3, `${where}: needs >=3 steps`);
  assert(m.primaryMuscles.length > 0, `${where}: no primary muscles`);
  assert(m.commonMistakes.length >= 2, `${where}: needs >=2 common mistakes`);
  assert(m.description.length > 40, `${where}: description too short`);
  for (const mus of [...m.primaryMuscles, ...m.secondaryMuscles]) {
    assert(muscleIds.has(mus), `${where}: unknown muscle "${mus}"`);
  }
  assert(
    !m.primaryMuscles.some((p) => m.secondaryMuscles.includes(p)),
    `${where}: muscle listed as both primary and secondary`,
  );
  assert(m.equipment.length > 0, `${where}: equipment empty (use ["none"])`);
  assert(m.timeEstimateMin > 0, `${where}: timeEstimateMin must be positive`);
}

// --- muscles ---
assert(muscles.length === 16, `expected 16 muscle groups, got ${muscles.length}`);
assert(new Set(muscles.map((m) => m.id)).size === muscles.length, "duplicate muscle ids");

// --- collections: sizes + unique slugs ---
assert(exercises.length === 48, `expected 48 exercises, got ${exercises.length}`);
assert(stretches.length === 24, `expected 24 stretches, got ${stretches.length}`);
assert(physioExercises.length === 18, `expected 18 physio exercises, got ${physioExercises.length}`);
assert(complaints.length === 6, `expected 6 complaints, got ${complaints.length}`);
assert(routines.length === 9, `expected 9 routines, got ${routines.length}`);
assert(recipes.length === 26, `expected 26 recipes, got ${recipes.length}`);
assert(mealPrepPlans.length === 4, `expected 4 meal prep plans, got ${mealPrepPlans.length}`);

assertUniqueSlugs(exercises, "exercises");
assertUniqueSlugs(stretches, "stretches");
assertUniqueSlugs(physioExercises, "physio");
assertUniqueSlugs(routines, "routines");
assertUniqueSlugs(recipes, "recipes");
assertUniqueSlugs(mealPrepPlans, "mealPrepPlans");

// --- movement content quality ---
for (const e of exercises) assertMovement(e, "exercise");
for (const s of stretches) assertMovement(s, "stretch");
for (const p of physioExercises) assertMovement(p, "physio");

// --- coverage: every muscle trainable and stretchable ---
for (const m of muscles) {
  const exCount = exercises.filter((e) => e.primaryMuscles.includes(m.id)).length;
  const stCount = stretches.filter((s) => s.primaryMuscles.includes(m.id)).length;
  assert(exCount >= 3, `muscle "${m.id}": only ${exCount} primary exercises (need >=3)`);
  assert(stCount >= 1, `muscle "${m.id}": no primary stretch`);
}

// --- physio: complaints resolvable + coverage ---
for (const p of physioExercises) {
  assert(p.complaints.length > 0, `physio "${p.slug}": no complaints assigned`);
  for (const c of p.complaints) {
    assert(complaintIds.has(c), `physio "${p.slug}": unknown complaint "${c}"`);
  }
  assert(Boolean(p.stopIf), `physio "${p.slug}": missing stopIf guidance`);
  assert(Boolean(p.frequency), `physio "${p.slug}": missing frequency`);
}
for (const c of complaints) {
  const count = physioExercises.filter((p) => p.complaints.includes(c.id)).length;
  assert(count >= 3, `complaint "${c.id}": only ${count} physio exercises (need >=3)`);
}

// --- routines: every ref resolves; totals sane ---
const movementIndex = {
  exercise: new Set(exercises.map((e) => e.slug)),
  stretch: new Set(stretches.map((s) => s.slug)),
  physio: new Set(physioExercises.map((p) => p.slug)),
};
for (const r of routines) {
  assert(r.days.length > 0, `routine "${r.slug}": no days`);
  assert(
    r.daysPerWeek === r.days.length,
    `routine "${r.slug}": daysPerWeek (${r.daysPerWeek}) != days.length (${r.days.length})`,
  );
  for (const mus of r.targetMuscles) {
    assert(muscleIds.has(mus), `routine "${r.slug}": unknown target muscle "${mus}"`);
  }
  for (const day of r.days) {
    assert(day.blocks.length > 0, `routine "${r.slug}" day "${day.dayLabel}": no blocks`);
    for (const block of day.blocks) {
      for (const item of block.items) {
        assert(
          movementIndex[item.refKind].has(item.ref),
          `routine "${r.slug}": unresolvable ${item.refKind} ref "${item.ref}"`,
        );
      }
    }
  }
}

// --- recipes: macros internally plausible ---
for (const r of recipes) {
  const { calories, proteinG, carbsG, fatG, fiberG } = r.macros;
  const computed = proteinG * 4 + carbsG * 4 + fatG * 9;
  const drift = Math.abs(computed - calories) / calories;
  assert(
    drift <= 0.15,
    `recipe "${r.slug}": macros don't add up (label ${calories} kcal vs computed ${Math.round(computed)} kcal)`,
  );
  assert(fiberG <= carbsG, `recipe "${r.slug}": fiber exceeds carbs`);
  assert(r.ingredients.length >= 3, `recipe "${r.slug}": needs >=3 ingredients`);
  assert(r.steps.length >= 3, `recipe "${r.slug}": needs >=3 steps`);
  assert(r.mealType.length > 0, `recipe "${r.slug}": no meal type`);
  assert(r.servings > 0, `recipe "${r.slug}": servings must be positive`);
}
assert(
  recipes.filter((r) => r.prepMin + r.cookMin <= 20).length >= 8,
  "need >=8 recipes at 20 minutes or less total time",
);
assert(
  recipes.every((r) => r.macros.proteinG >= 25 || r.macros.fiberG >= 8),
  "every recipe must bring >=25g protein or >=8g fiber per serving",
);

// --- meal prep plans: recipe refs resolve ---
const recipeSlugs = new Set(recipes.map((r) => r.slug));
for (const p of mealPrepPlans) {
  assert(p.recipes.length >= 3, `plan "${p.slug}": needs >=3 recipes`);
  for (const slug of p.recipes) {
    assert(recipeSlugs.has(slug), `plan "${p.slug}": unresolvable recipe "${slug}"`);
  }
  assert(p.shoppingList.length > 0, `plan "${p.slug}": empty shopping list`);
  assert(p.cookOrder.length >= 3, `plan "${p.slug}": cook order too thin`);
  assert(p.weekMap.length === 7, `plan "${p.slug}": weekMap must cover 7 days`);
}

// --- pose sets: structure, bounds, rigid bones, full coverage ---
const ENFORCE_POSE_COVERAGE = true;

const BONES: [JointName, JointName][] = [
  ["neck", "head"],
  ["neck", "chest"],
  ["chest", "hip"],
  ["neck", "elbowF"],
  ["elbowF", "wristF"],
  ["neck", "elbowB"],
  ["elbowB", "wristB"],
  ["hip", "kneeF"],
  ["kneeF", "ankleF"],
  ["ankleF", "toeF"],
  ["hip", "kneeB"],
  ["kneeB", "ankleB"],
  ["ankleB", "toeB"],
];
const MAX_BONE_DRIFT = 1.35; // longest/shortest per bone across a set's frames
const FLOOR_LIMIT = 174;

const movementSlugs = new Set(
  [...exercises, ...stretches, ...physioExercises].map((m) => m.slug),
);
assertUniqueSlugs(poseSets, "poses");
for (const p of poseSets) {
  assert(movementSlugs.has(p.slug), `pose "${p.slug}": no matching movement`);
  assert(p.frames.length >= 2, `pose "${p.slug}": needs >=2 frames`);
  assertUniqueSlugs(
    p.frames.map((f) => ({ slug: f.name })),
    `pose "${p.slug}" frame names`,
  );
  const rest = p.restFrame ?? 0;
  assert(rest >= 0 && rest < p.frames.length, `pose "${p.slug}": restFrame out of range`);

  for (const f of p.frames) {
    assert(
      f.durationMs >= 200 && f.durationMs <= 5000,
      `pose "${p.slug}" frame "${f.name}": durationMs ${f.durationMs} outside 200-5000`,
    );
    assert((f.holdMs ?? 0) <= 4000, `pose "${p.slug}" frame "${f.name}": holdMs > 4000`);
    for (const joint of JOINTS) {
      const [x, y] = f.joints[joint];
      assert(
        x >= 6 && x <= POSE_CANVAS - 6 && y >= 6,
        `pose "${p.slug}" frame "${f.name}": ${joint} (${x},${y}) outside canvas`,
      );
      assert(
        y <= FLOOR_LIMIT,
        `pose "${p.slug}" frame "${f.name}": ${joint} through the floor (y=${y})`,
      );
    }
  }

  for (const [a, b] of BONES) {
    let min = Infinity;
    let max = 0;
    for (const f of p.frames) {
      const [ax, ay] = f.joints[a];
      const [bx, by] = f.joints[b];
      const len = Math.hypot(bx - ax, by - ay);
      min = Math.min(min, len);
      max = Math.max(max, len);
    }
    assert(
      min > 0 && max / min <= MAX_BONE_DRIFT,
      `pose "${p.slug}": bone ${a}→${b} stretches ${(max / min).toFixed(2)}× across frames (max ${MAX_BONE_DRIFT})`,
    );
  }

  for (const prop of p.props ?? []) {
    if (isAttachedProp(prop) && prop.kind === "band") {
      const [x, y] = prop.anchor;
      assert(
        x >= 0 && x <= POSE_CANVAS && y >= 0 && y <= POSE_CANVAS,
        `pose "${p.slug}": band anchor outside canvas`,
      );
    }
  }
}
// --- typography: no em-dashes in content, ever (site style: plain hyphens) ---
const contentCollections: [string, unknown][] = [
  ["muscles", muscles],
  ["exercises", exercises],
  ["stretches", stretches],
  ["physio", physioExercises],
  ["complaints", complaints],
  ["routines", routines],
  ["recipes", recipes],
  ["mealPrepPlans", mealPrepPlans],
  ["poses", poseSets],
];
for (const [label, data] of contentCollections) {
  assert(
    !JSON.stringify(data).includes("—"),
    `${label}: em-dash found in content strings - use a plain hyphen`,
  );
}
function scanForEmDash(dir: string) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) scanForEmDash(p);
    else if (entry.name.endsWith(".ts") && readFileSync(p, "utf8").includes("—")) {
      errors.push(`${p}: em-dash found - use a plain hyphen`);
    }
  }
}
scanForEmDash("src/data");

if (ENFORCE_POSE_COVERAGE) {
  const covered = new Set(poseSets.map((p) => p.slug));
  for (const slug of movementSlugs) {
    assert(covered.has(slug), `movement "${slug}" has no pose set`);
  }
}

if (errors.length) {
  console.error(`✗ Data validation failed with ${errors.length} error(s):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(
  `✓ Data validation passed - ${exercises.length} exercises, ${stretches.length} stretches, ${physioExercises.length} physio, ${routines.length} routines, ${recipes.length} recipes, ${mealPrepPlans.length} meal prep plans, ${poseSets.length}/${movementSlugs.size} poses`,
);
