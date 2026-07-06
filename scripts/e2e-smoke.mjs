/**
 * End-to-end smoke checks for the pose animations and the interactive
 * muscle-hub map. Requires a running server: BASE_URL=http://localhost:3100
 * (default) - `node scripts/e2e-smoke.mjs`.
 */
import { chromium } from "playwright-core";

const BASE = process.env.BASE_URL ?? "http://localhost:3100";
const DEMO_PAGES = [
  "/exercises/glute-bridge",
  "/flexibility/cobra-stretch",
  "/physio/lower-back-pain/pelvic-tilt",
];

let failures = 0;
const ok = (cond, label) => {
  console.log(`${cond ? "✓" : "✗"} ${label}`);
  if (!cond) failures++;
};

const browser = await chromium.launch({
  executablePath: "/opt/pw-browsers/chromium",
});

// --- demo present and actually animating on one page per movement kind ---
for (const path of DEMO_PAGES) {
  const page = await browser.newPage();
  await page.goto(BASE + path, { waitUntil: "networkidle" });
  const seg = page.locator('[data-pose-seg="spine"]').first();
  ok((await seg.count()) === 1, `${path}: demo figure rendered`);
  const before = await seg.getAttribute("points");
  await page.waitForTimeout(600);
  const after = await seg.getAttribute("points");
  ok(before !== after, `${path}: demo is animating`);
  await page.close();
}

// --- reduced motion: static figure + keyframe step-through ---
{
  const page = await browser.newPage({ reducedMotion: "reduce" });
  await page.goto(BASE + DEMO_PAGES[0], { waitUntil: "networkidle" });
  const seg = page.locator('[data-pose-seg="spine"]').first();
  const before = await seg.getAttribute("points");
  await page.waitForTimeout(600);
  ok(
    (await seg.getAttribute("points")) === before,
    "reduced motion: figure is static",
  );
  const steps = page.locator("button[aria-pressed]");
  ok((await steps.count()) >= 2, "reduced motion: step buttons shown");
  await steps.last().click();
  await page.waitForTimeout(100);
  ok(
    (await seg.getAttribute("points")) !== before,
    "reduced motion: stepping changes the pose",
  );
  await page.close();
}

// --- muscle hub map: selected state, view toggle, click-through ---
{
  const page = await browser.newPage();
  await page.goto(BASE + "/muscles/chest", { waitUntil: "networkidle" });
  ok(
    (await page.locator('.muscle-plate[data-state="selected"]').count()) > 0,
    "/muscles/chest: current muscle highlighted",
  );
  await page.getByRole("tab", { name: /^back$/i }).click();
  await page.waitForTimeout(300);
  const lats = page.getByRole("button", { name: /^lats/i });
  ok(await lats.isVisible(), "/muscles/chest: back view shows lats");
  await lats.click();
  await page.waitForURL("**/muscles/lats");
  ok(true, "/muscles/chest: clicking lats navigates to its hub");
  await page.close();
}

await browser.close();
if (failures) {
  console.error(`✗ ${failures} smoke check(s) failed`);
  process.exit(1);
}
console.log("✓ all smoke checks passed");
