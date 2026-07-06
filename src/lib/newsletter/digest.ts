/**
 * Weekly digest email: one featured recipe and one featured movement, picked
 * deterministically by ISO week so a re-run within the same week sends the
 * same issue. Inline styles only - email clients ignore stylesheets.
 */
import { recipes } from "@/data/recipes";
import { exercises } from "@/data/exercises";
import { stretches } from "@/data/stretches";

export function isoWeek(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const day = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

const GOLD = "#c9a227";
const INK = "#141210";
const CREAM = "#f3ead9";
const MUTED = "#9b937f";

function card(title: string, body: string, href: string, cta: string): string {
  return `
    <div style="background:#1d1a16;border:1px solid #2e2a24;border-radius:16px;padding:24px;margin-top:16px;">
      <h2 style="margin:0;font-size:20px;color:${CREAM};">${title}</h2>
      <p style="margin:12px 0 16px;font-size:14px;line-height:1.6;color:${MUTED};">${body}</p>
      <a href="${href}" style="display:inline-block;background:${GOLD};color:${INK};font-weight:bold;font-size:14px;padding:10px 22px;border-radius:999px;text-decoration:none;">${cta}</a>
    </div>`;
}

export function weeklyDigest(siteUrl: string, now = new Date()) {
  const week = isoWeek(now);
  const recipe = recipes[week % recipes.length];
  const movements = [...exercises, ...stretches];
  const movement = movements[week % movements.length];
  const movementHref =
    "primaryMuscles" in movement && exercises.some((e) => e.slug === movement.slug)
      ? `${siteUrl}/exercises/${movement.slug}`
      : `${siteUrl}/flexibility/${movement.slug}`;

  const subject = `This week at TempleFit: ${recipe.name} + ${movement.name}`;
  const html = `
  <div style="background:${INK};padding:32px 16px;font-family:Arial,Helvetica,sans-serif;">
    <div style="max-width:560px;margin:0 auto;">
      <p style="margin:0;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:${GOLD};font-weight:bold;">TempleFit weekly</p>
      <h1 style="margin:8px 0 0;font-size:28px;color:${CREAM};">Your body is a temple. Here's this week's maintenance.</h1>
      ${card(
        `Eat: ${recipe.name}`,
        `${recipe.description} ${recipe.macros.proteinG}g protein, ${recipe.macros.calories} kcal, ready in ${recipe.prepMin + recipe.cookMin} minutes.`,
        `${siteUrl}/recipes/${recipe.slug}`,
        "Get the recipe",
      )}
      ${card(
        `Move: ${movement.name}`,
        movement.description,
        movementHref,
        "See how it's done",
      )}
      <p style="margin:28px 0 0;font-size:12px;line-height:1.6;color:${MUTED};">
        You're getting this because you signed up at <a href="${siteUrl}" style="color:${GOLD};">templefit</a>.
        {{{unsubscribe}}}
      </p>
    </div>
  </div>`;
  return { subject, html };
}
