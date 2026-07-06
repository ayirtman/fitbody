/**
 * Build-time content integrity checks for the hand-authored data library.
 * Run via `npm run validate` (wired into `prebuild`). Exits non-zero and
 * prints every violation when the content breaks an invariant.
 */
import { muscles } from "../src/data/muscles";

const errors: string[] = [];

function assert(cond: boolean, message: string) {
  if (!cond) errors.push(message);
}

// --- muscles ---
assert(muscles.length === 16, `expected 16 muscle groups, got ${muscles.length}`);
assert(
  new Set(muscles.map((m) => m.id)).size === muscles.length,
  "duplicate muscle ids",
);

if (errors.length) {
  console.error(`✗ Data validation failed with ${errors.length} error(s):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log("✓ Data validation passed");
