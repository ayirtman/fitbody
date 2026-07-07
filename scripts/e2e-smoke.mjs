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

// --- SEO: JSON-LD parses and breadcrumbs render on detail pages ---
{
  const page = await browser.newPage();

  await page.goto(BASE + "/recipes/chicken-burrito-bowls", {
    waitUntil: "networkidle",
  });
  const blocks = await page
    .locator('script[type="application/ld+json"]')
    .allTextContents();
  const parsed = blocks.map((b) => JSON.parse(b));
  const recipeLd = parsed.find((p) => p["@type"] === "Recipe");
  ok(
    Boolean(
      recipeLd &&
        recipeLd.recipeIngredient?.length > 0 &&
        recipeLd.recipeInstructions?.length > 0 &&
        recipeLd.nutrition?.calories &&
        recipeLd.image?.length > 0,
    ),
    "/recipes/[slug]: Recipe JSON-LD complete",
  );
  ok(
    parsed.some((p) => p["@type"] === "BreadcrumbList"),
    "/recipes/[slug]: BreadcrumbList JSON-LD present",
  );
  ok(
    await page.locator('nav[aria-label="Breadcrumb"]').isVisible(),
    "/recipes/[slug]: breadcrumb trail renders",
  );

  await page.goto(BASE + "/exercises/push-up", { waitUntil: "networkidle" });
  const exBlocks = await page
    .locator('script[type="application/ld+json"]')
    .allTextContents();
  const exParsed = exBlocks.map((b) => JSON.parse(b));
  const howTo = exParsed.find((p) => p["@type"] === "HowTo");
  ok(
    Boolean(howTo && howTo.step?.length > 0 && howTo.totalTime),
    "/exercises/[slug]: HowTo JSON-LD complete",
  );
  const canonical = await page
    .locator('link[rel="canonical"]')
    .getAttribute("href");
  ok(
    Boolean(canonical?.endsWith("/exercises/push-up")),
    "/exercises/[slug]: canonical URL set",
  );
  await page.close();
}

// --- content moat: FAQ schema on recipe, guide article + Article schema ---
{
  const page = await browser.newPage();

  await page.goto(BASE + "/recipes/chicken-burrito-bowls", {
    waitUntil: "networkidle",
  });
  const recipeLd = (
    await page.locator('script[type="application/ld+json"]').allTextContents()
  ).map((b) => JSON.parse(b));
  const faqLd = recipeLd.find((p) => p["@type"] === "FAQPage");
  ok(
    Boolean(faqLd && faqLd.mainEntity?.length >= 3),
    "/recipes/[slug]: FAQPage JSON-LD present",
  );

  await page.goto(BASE + "/guides", { waitUntil: "networkidle" });
  ok(
    (await page.locator('a[href^="/guides/"]').count()) >= 6,
    "/guides: index lists all guides",
  );

  await page.goto(BASE + "/guides/meal-prep-for-the-week-in-2-hours", {
    waitUntil: "networkidle",
  });
  const guideLd = (
    await page.locator('script[type="application/ld+json"]').allTextContents()
  ).map((b) => JSON.parse(b));
  ok(
    guideLd.some((p) => p["@type"] === "Article"),
    "/guides/[slug]: Article JSON-LD present",
  );
  ok(
    guideLd.some((p) => p["@type"] === "FAQPage"),
    "/guides/[slug]: guide FAQ schema present",
  );
  ok(
    await page.getByText("Sunday Meal-Prep Pack").first().isVisible(),
    "/guides/[slug]: lead magnet renders on guide",
  );
  const guideLinks = await page.locator('article a[href^="/recipes/"], article a[href^="/meal-prep/"]').count();
  ok(guideLinks >= 3, "/guides/[slug]: internal content links present");
  await page.close();
}

// --- revenue rails: gear kit targeting, gear page, lead magnet, support ---
{
  const page = await browser.newPage();

  await page.goto(BASE + "/exercises/incline-dumbbell-press", {
    waitUntil: "networkidle",
  });
  ok(
    (await page.getByText("The kit").count()) > 0,
    "/exercises: gear kit shows on equipment movement",
  );
  const sponsored = await page.locator('a[rel~="sponsored"]').count();
  ok(sponsored > 0, "/exercises: gear links carry rel=sponsored");

  await page.goto(BASE + "/exercises/push-up", { waitUntil: "networkidle" });
  ok(
    (await page.getByText("The kit").count()) === 0,
    "/exercises: no gear kit on bodyweight movement",
  );

  await page.goto(BASE + "/gear", { waitUntil: "networkidle" });
  ok(
    (await page.locator('a[rel~="sponsored"]').count()) >= 8,
    "/gear: curated list renders with sponsored links",
  );

  await page.goto(BASE + "/meal-prep", { waitUntil: "networkidle" });
  ok(
    await page.getByText("Sunday Meal-Prep Pack").first().isVisible(),
    "/meal-prep: lead magnet band renders",
  );

  await page.goto(BASE + "/support", { waitUntil: "networkidle" });
  ok(
    await page.getByText("Keep TempleFit free").first().isVisible(),
    "/support: tip jar page renders",
  );
  await page.close();
}

// --- blog: index, unknown slug 404, feed, admin gate ---
{
  const page = await browser.newPage();

  await page.goto(BASE + "/blog", { waitUntil: "networkidle" });
  const blogBody = await page.locator("body").textContent();
  ok(
    /short reads for busy dads/i.test(blogBody),
    "/blog: index renders (posts or empty state)",
  );

  const missing = await page.goto(BASE + "/blog/definitely-not-a-real-post");
  ok(missing.status() === 404, "/blog/[slug]: unknown slug returns 404");

  const feed = await page.request.get(BASE + "/feed.xml");
  const feedText = await feed.text();
  ok(
    feed.ok() && feedText.startsWith("<?xml") && feedText.includes("<rss"),
    "/feed.xml: well-formed RSS envelope",
  );

  await page.goto(BASE + "/admin/blog", { waitUntil: "networkidle" });
  ok(
    await page.locator('input[type="password"]').isVisible(),
    "/admin/blog: secret gate renders",
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
