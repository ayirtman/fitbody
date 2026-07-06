import Anthropic from "@anthropic-ai/sdk";
import { recipes } from "@/data/recipes";
import { exercises } from "@/data/exercises";
import { stretches } from "@/data/stretches";
import { isoWeek } from "./digest";

/**
 * Claude-written weekly issue. Feeds this week's featured recipe + movement
 * (same ISO-week rotation as the digest template) plus a compact content
 * index into claude-opus-4-8 and gets back { subject, html } via a strict
 * JSON schema, so the result is always parseable.
 */

export function claudeConfigured(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY);
}

const OUTPUT_SCHEMA = {
  type: "object",
  properties: {
    subject: {
      type: "string",
      description: "Email subject line, under 65 characters, no emoji",
    },
    html: {
      type: "string",
      description:
        "Complete email body HTML using only inline styles, containing the literal placeholder {{{unsubscribe}}} exactly once",
    },
  },
  required: ["subject", "html"],
  additionalProperties: false,
} as const;

function buildPrompt(siteUrl: string, topic: string | undefined, now: Date): string {
  const week = isoWeek(now);
  const recipe = recipes[week % recipes.length];
  const movements = [...exercises, ...stretches];
  const movement = movements[week % movements.length];
  const movementPath = exercises.some((e) => e.slug === movement.slug)
    ? `/exercises/${movement.slug}`
    : `/flexibility/${movement.slug}`;

  const moreRecipes = recipes
    .filter((r) => r.slug !== recipe.slug)
    .slice(0, 8)
    .map((r) => `- ${r.name} (${r.macros.proteinG}g protein): ${siteUrl}/recipes/${r.slug}`)
    .join("\n");
  const moreExercises = exercises
    .slice(0, 8)
    .map((e) => `- ${e.name}: ${siteUrl}/exercises/${e.slug}`)
    .join("\n");

  return `Write this week's issue of the TempleFit newsletter (week ${week}).

ABOUT TEMPLEFIT
A fitness and nutrition site for busy working dads. Tagline: "Your body is a temple." Voice: direct, warm, zero fluff, zero guilt, practical. Short sentences. No hype words, no exclamation marks, no emoji.

THIS WEEK'S FEATURED CONTENT (build the issue around these two)
Recipe: ${recipe.name}
- ${recipe.description}
- ${recipe.macros.proteinG}g protein, ${recipe.macros.calories} kcal, ready in ${recipe.prepMin + recipe.cookMin} minutes
- Link: ${siteUrl}/recipes/${recipe.slug}
Movement: ${movement.name}
- ${movement.description}
- Link: ${siteUrl}${movementPath}

MORE CONTENT YOU MAY REFERENCE (optional, pick at most 2)
${moreRecipes}
${moreExercises}
${topic ? `\nEDITOR'S TOPIC FOR THIS ISSUE (weave it in as the opening theme):\n${topic}\n` : ""}
FORMAT REQUIREMENTS
- Email HTML only, inline styles only (email clients ignore stylesheets).
- Dark theme, exact palette: background #141210, card background #1d1a16, card border #2e2a24, headings/cream text #f3ead9, body/muted text #9b937f, accent gold #c9a227, button text #141210.
- Structure: outer div with background #141210 and padding, inner div max-width 560px margin auto, font-family Arial/Helvetica.
- Open with the kicker line "TEMPLEFIT WEEKLY" (12px, letter-spacing 2px, uppercase, gold, bold), then a short punchy h1, then 2-3 sentences of intro written for a tired dad reading on his phone.
- One card per featured item (rounded 16px, padded 24px) with a gold pill-shaped CTA button linking to the page.
- Optionally one short closing tip (form cue, habit nudge, or meal-prep trick) consistent with the featured movement or recipe.
- End with a footer paragraph (12px, muted): "You're getting this because you signed up at" with a gold link to ${siteUrl}, followed by the literal placeholder {{{unsubscribe}}} - include that placeholder exactly once, exactly as written.
- All links must be absolute URLs from the content above. Do not invent URLs, facts, or numbers.`;
}

export async function generateIssue(
  siteUrl: string,
  topic?: string,
  now = new Date(),
): Promise<{ subject: string; html: string }> {
  if (!claudeConfigured()) {
    throw new Error("ANTHROPIC_API_KEY is not set");
  }
  const client = new Anthropic();
  const response = await client.messages.create({
    model: "claude-opus-4-8",
    max_tokens: 16000,
    thinking: { type: "adaptive" },
    output_config: {
      format: {
        type: "json_schema",
        schema: OUTPUT_SCHEMA,
      },
    },
    messages: [{ role: "user", content: buildPrompt(siteUrl, topic, now) }],
  });

  if (response.stop_reason !== "end_turn") {
    throw new Error(`generation stopped early: ${response.stop_reason}`);
  }
  const text = response.content.find((b) => b.type === "text")?.text;
  if (!text) throw new Error("generation returned no text");
  const issue = JSON.parse(text) as { subject: string; html: string };
  if (!issue.html.includes("{{{unsubscribe}}}")) {
    issue.html += `<p style="font-size:12px;color:#9b937f;">{{{unsubscribe}}}</p>`;
  }
  return issue;
}
