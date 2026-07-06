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

// --- meal planner v2: toggle grid, v1 migration, dashboard, shopping list ---
{
  const page = await browser.newPage();
  await page.addInitScript(() => {
    localStorage.setItem(
      "templefit.v1.mealPlan",
      JSON.stringify({
        week: { mon: { lunch: "tuna-white-bean-wraps" } },
        savedAt: "2026-01-01T00:00:00Z",
      }),
    );
  });
  await page.goto(BASE + "/recipes/chicken-burrito-bowls", {
    waitUntil: "networkidle",
  });
  await page.getByRole("button", { name: /add to my week/i }).click();
  await page.getByRole("button", { name: "Tuesday dinner" }).click();
  await page.getByRole("button", { name: "Thursday breakfast" }).click();
  ok(
    /in my week \(2\)/i.test(
      await page.getByRole("button", { name: /in my week/i }).textContent(),
    ),
    "planner: recipe added to two slots",
  );
  const migrated = await page.evaluate(() =>
    JSON.parse(localStorage.getItem("templefit.v2.mealPlan")),
  );
  const v1Gone =
    (await page.evaluate(() => localStorage.getItem("templefit.v1.mealPlan"))) ===
    null;
  ok(
    Array.isArray(migrated?.week?.mon?.lunch) &&
      migrated.week.mon.lunch[0] === "tuna-white-bean-wraps" &&
      v1Gone,
    "planner: v1 plan migrated to v2 arrays, v1 key removed",
  );

  await page.goto(BASE + "/my-temple", { waitUntil: "networkidle" });
  const headers = await page.locator("table th").allTextContents();
  ok(
    ["Breakfast", "Lunch", "Dinner", "Snack"].every((h) => headers.includes(h)),
    "/my-temple: four meal columns render",
  );
  const shopping = page.locator("#shopping-list");
  const itemCount = await shopping.locator("input[type=checkbox]").count();
  ok(itemCount > 0, "/my-temple: shopping list generated from plan");
  await shopping.locator("input[type=checkbox]").first().check();
  await page.reload({ waitUntil: "networkidle" });
  ok(
    await page
      .locator("#shopping-list input[type=checkbox]")
      .first()
      .isChecked(),
    "/my-temple: shopping check-off survives reload",
  );
  await page.getByRole("button", { name: /clear week/i }).click();
  ok(
    (await page.locator("#shopping-list input[type=checkbox]").count()) === 0,
    "/my-temple: clear week empties the shopping list",
  );
  await page.close();
}

// --- recipe card banner (photo when generated, plate SVG fallback) ---
{
  const page = await browser.newPage();
  await page.goto(BASE + "/recipes", { waitUntil: "networkidle" });
  const cards = page.locator('a[href^="/recipes/"]');
  ok((await cards.count()) >= 26, "/recipes: cards render");
  const firstBanner = cards.first().locator("img, svg").first();
  ok(await firstBanner.isVisible(), "/recipes: card banner (photo or plate art)");
  await page.close();
}

// --- newsletter form: responds even when the backend isn't configured ---
{
  const page = await browser.newPage();
  await page.goto(BASE + "/about", { waitUntil: "networkidle" });
  const form = page.locator("footer form");
  await form.locator('input[type="email"]').fill("smoke-test@example.com");
  await form.getByRole("button", { name: /subscribe/i }).click();
  await page.waitForTimeout(800);
  const feedback = await page.locator("footer").textContent();
  ok(
    /you're in|configured|went wrong|try again/i.test(feedback),
    "footer newsletter form responds (ok or graceful error)",
  );
  await page.close();
}

// --- newsletter admin studio: gate renders, wrong secret rejected ---
{
  const page = await browser.newPage();
  await page.goto(BASE + "/admin/newsletter", { waitUntil: "networkidle" });
  const gate = page.locator('input[type="password"]');
  ok(await gate.isVisible(), "/admin/newsletter: secret gate renders");
  await gate.fill("definitely-not-the-secret");
  await page.getByRole("button", { name: /unlock/i }).click();
  await page.waitForTimeout(800);
  const text = await page.locator("body").textContent();
  ok(
    /wrong secret|not configured/i.test(text),
    "/admin/newsletter: wrong secret is rejected",
  );
  await page.close();
}

await browser.close();
if (failures) {
  console.error(`✗ ${failures} smoke check(s) failed`);
  process.exit(1);
}
console.log("✓ all smoke checks passed");
