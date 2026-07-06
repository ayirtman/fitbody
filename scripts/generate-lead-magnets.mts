/**
 * Builds the two email-gated PDF lead magnets from existing site content:
 *   public/downloads/sunday-meal-prep-pack.pdf  (meal prep plan + recipes)
 *   public/downloads/desk-reset-card.pdf        (desk warrior routine card)
 * Run: npx tsx scripts/generate-lead-magnets.mts
 */
import { mkdirSync } from "node:fs";
import { chromium } from "playwright-core";
import { mealPrepPlanBySlug, recipesForMealPlan, routineBySlug, resolveRoutineItem } from "../src/data";

const GOLD = "#b8860b";
const INK = "#1a1712";

const baseCss = `
  * { box-sizing: border-box; }
  body { font-family: Georgia, 'Times New Roman', serif; color: ${INK}; margin: 0; padding: 48px 56px; }
  h1 { font-size: 34px; margin: 0; letter-spacing: 0.5px; }
  h2 { font-size: 20px; margin: 28px 0 10px; border-bottom: 2px solid ${GOLD}; padding-bottom: 6px; }
  h3 { font-size: 15px; margin: 18px 0 6px; }
  p, li { font-size: 12.5px; line-height: 1.55; }
  .kicker { color: ${GOLD}; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; font-weight: bold; margin-bottom: 8px; }
  .sub { color: #666; font-size: 13px; margin-top: 8px; }
  .cols { column-count: 2; column-gap: 32px; }
  .card { break-inside: avoid; margin-bottom: 18px; }
  .meta { color: ${GOLD}; font-size: 11px; font-weight: bold; }
  .footer { margin-top: 32px; border-top: 1px solid #ccc; padding-top: 10px; font-size: 10px; color: #888; }
  ol, ul { padding-left: 18px; margin: 6px 0; }
`;

function shell(title: string, body: string): string {
  return `<!doctype html><html><head><meta charset="utf-8"><style>${baseCss}</style></head>
  <body><div class="kicker">TempleFit - your body is a temple</div><h1>${title}</h1>${body}
  <div class="footer">Free from templefit - workouts, physio and high-protein meal prep for working dads. Share it with a dad who needs it.</div>
  </body></html>`;
}

function mealPrepHtml(): string {
  const plan = mealPrepPlanBySlug.get("high-protein-week")!;
  const recipes = recipesForMealPlan(plan);
  let body = `<p class="sub">${plan.description} One ${plan.sundayTimeMin}-minute Sunday session, ~${plan.totals.avgProteinPerDay}g protein per day.</p>`;

  body += `<h2>Shopping list</h2><div class="cols">`;
  for (const group of plan.shoppingList) {
    body += `<div class="card"><h3>${group.category}</h3><ul>${group.items
      .map((i) => `<li>${i}</li>`)
      .join("")}</ul></div>`;
  }
  body += `</div>`;

  for (const r of recipes) {
    body += `<h2>${r.name}</h2>
      <p class="meta">${r.macros.proteinG}g protein · ${r.macros.calories} kcal · ${r.prepMin + r.cookMin} min · serves ${r.servings}${r.keepsDays ? ` · keeps ${r.keepsDays} days` : ""}</p>
      <p>${r.description}</p>
      <div class="cols">
        <div class="card"><h3>Ingredients</h3><ul>${r.ingredients
          .map((i) => `<li>${i.qty} ${i.item}</li>`)
          .join("")}</ul></div>
        <div class="card"><h3>Method</h3><ol>${r.steps
          .map((s) => `<li>${s}</li>`)
          .join("")}</ol></div>
      </div>`;
  }
  return shell("The Sunday Meal-Prep Pack", body);
}

function deskResetHtml(): string {
  const routine = routineBySlug.get("desk-warrior-reset")!;
  let body = `<p class="sub">${routine.tagline} ${routine.totalMinPerSession} minutes, no equipment. Print it, stick it next to your monitor.</p>`;
  for (const day of routine.days) {
    for (const block of day.blocks) {
      body += `<h2>${block.label}</h2>`;
      for (const item of block.items) {
        const mv = resolveRoutineItem(item);
        if (!mv) continue;
        const dose =
          item.sets && item.reps
            ? `${item.sets} × ${item.reps}`
            : item.holdSec
              ? `hold ${item.holdSec}s`
              : "";
        body += `<div class="card"><h3>${mv.name} ${dose ? `<span class="meta">- ${dose}</span>` : ""}</h3>
          <ol>${mv.steps.map((s) => `<li>${s}</li>`).join("")}</ol></div>`;
      }
    }
  }
  return shell("The Desk Reset Card", body);
}

mkdirSync("public/downloads", { recursive: true });
const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
const page = await browser.newPage();

for (const [file, html] of [
  ["sunday-meal-prep-pack.pdf", mealPrepHtml()],
  ["desk-reset-card.pdf", deskResetHtml()],
] as const) {
  await page.setContent(html, { waitUntil: "networkidle" });
  await page.pdf({
    path: `public/downloads/${file}`,
    format: "A4",
    margin: { top: "0", bottom: "0", left: "0", right: "0" },
    printBackground: true,
  });
  console.log(`✓ public/downloads/${file}`);
}
await browser.close();
