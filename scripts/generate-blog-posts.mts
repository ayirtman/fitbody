/**
 * Blog article factory. Three modes:
 *   npx tsx scripts/generate-blog-posts.mts --topics          # build scripts/blog-topics.json (350 topics)
 *   npx tsx scripts/generate-blog-posts.mts --write [--limit N]  # write articles to $BLOG_OUT_DIR as JSON
 *   npx tsx scripts/generate-blog-posts.mts --sql             # emit chunked INSERT .sql files from the JSON
 *
 * Uses claude-sonnet-5 on ANTHROPIC_API_KEY (.env.local). The style guide +
 * link catalog live in a cached system prompt, so per-article cost is mostly
 * output tokens. Every article passes the same quality gate the publish API
 * enforces (src/lib/blogQuality.ts) plus link validation; failures retry
 * once with the errors fed back, then get dropped and logged.
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import Anthropic from "@anthropic-ai/sdk";
import { exercises } from "../src/data/exercises";
import { stretches } from "../src/data/stretches";
import { complaints, physioExercises } from "../src/data/physio";
import { routines } from "../src/data/routines";
import { recipes } from "../src/data/recipes";
import { mealPrepPlans } from "../src/data/mealPrepPlans";
import { guides } from "../src/data/guides";
import { checkBlogPost } from "../src/lib/blogQuality";
import type { BlogContent } from "../src/lib/types";

// ---- env -------------------------------------------------------------------
for (const line of readFileSync(".env.local", "utf8").split("\n")) {
  const m = line.match(/^([A-Z_]+)=(.*)$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
}
if (!process.env.ANTHROPIC_API_KEY) {
  console.error("ANTHROPIC_API_KEY missing");
  process.exit(1);
}

const MODEL = "claude-sonnet-5";
const OUT_DIR = process.env.BLOG_OUT_DIR ?? ".blog-out";
const TOPICS_FILE = "scripts/blog-topics.json";
const PUBLISH_NOW = 50;
const CONCURRENCY = 6;

// Resume support: slugs already stored in the DB (from BLOG_SKIP_SLUGS, a JSON
// array file). --write skips them so a re-run only generates the missing ones;
// --sql omits them and marks everything it emits as draft (the published set
// already exists in the DB).
const SKIP_SLUGS = new Set<string>(
  process.env.BLOG_SKIP_SLUGS && existsSync(process.env.BLOG_SKIP_SLUGS)
    ? (JSON.parse(readFileSync(process.env.BLOG_SKIP_SLUGS, "utf8")) as string[])
    : [],
);
const RESUME = SKIP_SLUGS.size > 0;

const client = new Anthropic();

// ---- link catalog ------------------------------------------------------------
const CATALOG_LINES = [
  ...exercises.map((e) => `/exercises/${e.slug} - ${e.name} (exercise)`),
  ...stretches.map((s) => `/flexibility/${s.slug} - ${s.name} (stretch)`),
  ...complaints.flatMap((c) =>
    physioExercises
      .filter((p) => p.complaints.includes(c.id))
      .map((p) => `/physio/${c.id}/${p.slug} - ${p.name} (physio, ${c.name})`),
  ),
  ...complaints.map((c) => `/physio/${c.id} - ${c.name} hub`),
  ...routines.map((r) => `/routines/${r.slug} - ${r.name} (routine)`),
  ...recipes.map((r) => `/recipes/${r.slug} - ${r.name} (recipe, ${r.macros.proteinG}g protein)`),
  ...mealPrepPlans.map((m) => `/meal-prep/${m.slug} - ${m.name} (meal prep plan)`),
  ...guides.map((g) => `/guides/${g.slug} - ${g.title} (guide)`),
  "/exercises - all exercises",
  "/routines - all routines",
  "/recipes - all recipes",
  "/meal-prep - all meal prep plans",
  "/flexibility - all stretches",
  "/physio - physio hub",
  "/nutrition - protein & calorie calculator",
  "/muscles - interactive muscle map",
  "/gear - gear recommendations",
];
const VALID_HREFS = new Set(CATALOG_LINES.map((l) => l.split(" - ")[0]));

// ---- style guide (cached system prompt) ---------------------------------------
const STYLE_GUIDE = `You write short blog posts for TempleFit, a free fitness site for working dads. The author is a regular dad who trains at home, not a coach or influencer.

VOICE - this is the whole game:
- Write like a dad talking to a mate over coffee. Plain words, contractions, short sentences mixed with a few longer ones.
- Warm and direct. Zero hype, zero guilt, zero preaching. Admit tradeoffs and when something doesn't matter much.
- It's fine to use "I" occasionally for opinion ("I'd skip it") and "you" constantly.
- Specific beats general: "two sets while the pasta boils" beats "incorporate exercise into your routine".
- Never sound like marketing copy or a textbook. If a sentence could open a corporate landing page, cut it.

HARD RULES (a post breaks the build if it violates these):
- NEVER use an em-dash or en-dash. Use " - " (hyphen with spaces) instead.
- No exclamation marks. No emoji. No ellipsis character.
- Banned words/phrases (never use, any casing): delve, unleash, game-changer, revolutionize, supercharge, elevate your, unlock your, in today's fast-paced, in this article, in this blog post, it's important to note, when it comes to, look no further, dive into, dive in, let's face it, the world of, a journey, embark, seamless, robust, leverage, utilize, furthermore, moreover, in conclusion, ultimately, whether you're a.
- No medical claims. For pain topics, note that persistent or radiating pain means seeing a professional.
- Internal links: ONLY hrefs from the catalog below, exactly as written. 3 to 6 links per post via the section "links" arrays. Never invent a URL, never link externally.

LENGTH AND SHAPE:
- 650-950 words of prose total (never under 600). intro: 2-3 sentences. 4-5 sections, each 2-3 short paragraphs; bullets where they genuinely help.
- Exactly 3 FAQs: real questions people type into Google, answered straight in 2-3 sentences.
- "related": 3-5 catalog links that are the natural next step after reading.
- description: 60-155 chars, plain and specific, no clickbait.
- Headings: sentence case, plain, no colons-and-numbers listicle style.

LINK CATALOG (the only valid hrefs):
${CATALOG_LINES.join("\n")}`;

// ---- topic generation ----------------------------------------------------------
const TOPIC_MIX: { category: string; count: number; brief: string }[] = [
  {
    category: "training",
    count: 120,
    brief:
      "home training for dads 30-50: specific movement questions (form, progressions, 'why does X hurt when I Y'), garage-gym setups, training over 35/40/45, strength benchmarks, busy-week programming, kettlebell/dumbbell/bodyweight angles, grip, core, posture-adjacent strength",
  },
  {
    category: "nutrition",
    count: 110,
    brief:
      "eating for busy dads: protein and fiber questions, budget high-protein eating, meal prep problems (boredom, storage, family meals), cutting the dad bod without misery, supper-vs-snacks, coffee/beer/takeaway tradeoffs, supplement skepticism, specific food comparisons",
  },
  {
    category: "recovery",
    count: 70,
    brief:
      "desk damage and recovery: neck/back/hip/wrist niggles from office work, sleep with young kids, stretching routines, standing desks, soreness vs injury, warming up when older, active recovery, staying loose on work trips",
  },
  {
    category: "dad-life",
    count: 50,
    brief:
      "the real obstacle is life: consistency with kids, training at 9pm energy levels, workouts with toddlers around, restarting after falling off, gym vs home for parents, modelling healthy habits for kids, realistic expectations",
  },
];

async function generateTopics() {
  const existingSlugs = new Set<string>(guides.map((g) => g.slug));
  const topics: { slug: string; title: string; targetQuery: string; category: string }[] = [];

  for (const mix of TOPIC_MIX) {
    const chunks: number[] = [];
    for (let left = mix.count; left > 0; left -= 40) chunks.push(Math.min(40, left));
    for (const chunkCount of chunks) {
    console.log(`topics: ${mix.category} (${chunkCount} of ${mix.count})...`);
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 16000,
      output_config: {
        format: {
          type: "json_schema",
          schema: {
            type: "object",
            properties: {
              topics: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    slug: { type: "string", description: "kebab-case, 3-8 words" },
                    title: { type: "string", description: "the post title, plain, no colon-number listicle style, no exclamation marks" },
                    targetQuery: { type: "string", description: "the Google search this targets" },
                  },
                  required: ["slug", "title", "targetQuery"],
                  additionalProperties: false,
                },
              },
            },
            required: ["topics"],
            additionalProperties: false,
          },
        },
      },
      messages: [
        {
          role: "user",
          content: `Generate ${chunkCount} unique blog post topics for a fitness site for working dads (30-50, train at home, short on time). Theme: ${mix.brief}.

Rules: every topic targets a real long-tail Google query a dad would type. Titles are plain and human (mix of questions and statements), sentence case, never clickbait, never "X things..." listicles more than 1 in 10, no exclamation marks, no em-dashes. Slugs kebab-case. All ${chunkCount} must be clearly distinct from each other.

Avoid these existing slugs/titles: ${[...existingSlugs].slice(-260).join(", ")}`,
        },
      ],
    });
    if (response.stop_reason !== "end_turn") {
      console.error(`  chunk stopped early (${response.stop_reason}), skipping`);
      continue;
    }
    const text = response.content.find((b) => b.type === "text")?.text ?? "{}";
    const batch = JSON.parse(text) as { topics: { slug: string; title: string; targetQuery: string }[] };
    for (const t of batch.topics) {
      const slug = t.slug.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
      if (existingSlugs.has(slug)) continue;
      existingSlugs.add(slug);
      topics.push({ ...t, slug, category: mix.category });
    }
    console.log(`  total so far: ${topics.length}`);
    }
  }

  writeFileSync(TOPICS_FILE, JSON.stringify(topics, null, 2));
  console.log(`✓ ${topics.length} topics -> ${TOPICS_FILE}`);
}

// ---- article generation ----------------------------------------------------------
const ARTICLE_SCHEMA = {
  type: "object",
  properties: {
    title: { type: "string" },
    description: { type: "string" },
    tags: { type: "array", items: { type: "string" }, description: "2-4 short topical tags" },
    intro: { type: "string" },
    sections: {
      type: "array",
      items: {
        type: "object",
        properties: {
          heading: { type: "string" },
          paragraphs: { type: "array", items: { type: "string" } },
          bullets: { type: "array", items: { type: "string" } },
          links: {
            type: "array",
            items: {
              type: "object",
              properties: { label: { type: "string" }, href: { type: "string" } },
              required: ["label", "href"],
              additionalProperties: false,
            },
          },
        },
        required: ["heading", "paragraphs"],
        additionalProperties: false,
      },
    },
    faqs: {
      type: "array",
      items: {
        type: "object",
        properties: { q: { type: "string" }, a: { type: "string" } },
        required: ["q", "a"],
        additionalProperties: false,
      },
    },
    related: {
      type: "array",
      items: {
        type: "object",
        properties: { label: { type: "string" }, href: { type: "string" } },
        required: ["label", "href"],
        additionalProperties: false,
      },
    },
  },
  required: ["title", "description", "tags", "intro", "sections", "faqs", "related"],
  additionalProperties: false,
} as const;

interface Topic {
  slug: string;
  title: string;
  targetQuery: string;
  category: string;
}

interface GeneratedArticle {
  title: string;
  description: string;
  tags: string[];
  intro: string;
  sections: BlogContent["sections"];
  faqs: { q: string; a: string }[];
  related: { label: string; href: string }[];
}

function validate(article: GeneratedArticle): string[] {
  const problems = checkBlogPost({
    title: article.title,
    description: article.description,
    content: {
      intro: article.intro,
      sections: article.sections,
      faqs: article.faqs,
      related: article.related,
    },
  });
  const links = [
    ...article.related,
    ...article.sections.flatMap((s) => s.links ?? []),
  ];
  if (links.length < 2) problems.push("fewer than 2 internal links");
  for (const l of links) {
    if (!VALID_HREFS.has(l.href)) problems.push(`invalid href: ${l.href}`);
  }
  if ((article.faqs?.length ?? 0) !== 3) problems.push("needs exactly 3 FAQs");
  if (JSON.stringify(article).includes("$bp$")) problems.push("reserved token");
  return problems;
}

async function writeArticle(topic: Topic, feedback?: string): Promise<GeneratedArticle> {
  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 8000,
    output_config: { effort: "medium", format: { type: "json_schema", schema: ARTICLE_SCHEMA } },
    system: [
      {
        type: "text",
        text: STYLE_GUIDE,
        cache_control: { type: "ephemeral" },
      },
    ],
    messages: [
      {
        role: "user",
        content: `Write the post.
Title (use as-is or lightly improve): ${topic.title}
Target search query: ${topic.targetQuery}
Category: ${topic.category}
${feedback ? `\nYour previous attempt failed validation. Fix these problems and rewrite fully:\n${feedback}` : ""}`,
      },
    ],
  });
  const text = response.content.find((b) => b.type === "text")?.text;
  if (!text) throw new Error("no text in response");
  return JSON.parse(text) as GeneratedArticle;
}

async function generateArticles(limit?: number) {
  mkdirSync(OUT_DIR, { recursive: true });
  const topics = (JSON.parse(readFileSync(TOPICS_FILE, "utf8")) as Topic[]).filter(
    (t) => !SKIP_SLUGS.has(t.slug) && !existsSync(path.join(OUT_DIR, `${t.slug}.json`)),
  );
  const queue = limit ? topics.slice(0, limit) : topics;
  console.log(`writing ${queue.length} articles (concurrency ${CONCURRENCY})...`);
  let done = 0;
  let failed = 0;

  async function worker() {
    for (;;) {
      const topic = queue.shift();
      if (!topic) return;
      try {
        let article = await writeArticle(topic);
        let problems = validate(article);
        if (problems.length > 0) {
          article = await writeArticle(topic, problems.join("\n"));
          problems = validate(article);
        }
        if (problems.length > 0) {
          failed++;
          console.error(`✗ ${topic.slug}: ${problems.join("; ")}`);
          continue;
        }
        writeFileSync(
          path.join(OUT_DIR, `${topic.slug}.json`),
          JSON.stringify({ ...article, slug: topic.slug, category: topic.category }, null, 1),
        );
        done++;
        if (done % 10 === 0) console.log(`  ${done}/${queue.length + done} done`);
      } catch (err) {
        failed++;
        console.error(`✗ ${topic.slug}: ${(err as Error).message}`);
      }
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  console.log(`✓ ${done} written, ${failed} failed -> ${OUT_DIR}`);
}

// ---- SQL emission ----------------------------------------------------------------
function emitSql() {
  const topics = JSON.parse(readFileSync(TOPICS_FILE, "utf8")) as Topic[];
  const order = new Map(topics.map((t, i) => [t.slug, i]));
  const files = readdirSync(OUT_DIR)
    .filter((f) => f.endsWith(".json") && !SKIP_SLUGS.has(f.replace(".json", "")))
    .sort((a, b) => (order.get(a.replace(".json", "")) ?? 999) - (order.get(b.replace(".json", "")) ?? 999));

  const sqlDir = path.join(OUT_DIR, "sql");
  mkdirSync(sqlDir, { recursive: true });
  const CHUNK = 10;
  let fileNo = 0;
  for (let i = 0; i < files.length; i += CHUNK) {
    const rows = files.slice(i, i + CHUNK).map((f, j) => {
      const idx = i + j;
      const a = JSON.parse(readFileSync(path.join(OUT_DIR, f), "utf8"));
      const content = JSON.stringify({
        intro: a.intro,
        sections: a.sections,
        faqs: a.faqs,
        related: a.related,
      });
      const published = !RESUME && idx < PUBLISH_NOW;
      const esc = (s: string) => s.replaceAll("'", "''");
      const tags = `{${(a.tags as string[]).map((t) => `"${esc(t).replaceAll('"', "")}"`).join(",")}}`;
      return `('${esc(a.slug)}', '${esc(a.title)}', '${esc(a.description)}', '${esc(a.category)}', '${tags}', $bp$${content}$bp$::jsonb, '${published ? "published" : "draft"}', ${published ? "now()" : "null"}, now() + interval '${idx} seconds')`;
    });
    const sql = `insert into blog_posts (slug, title, description, category, tags, content, status, published_at, created_at) values\n${rows.join(",\n")}\non conflict (slug) do nothing;`;
    writeFileSync(path.join(sqlDir, `batch-${String(fileNo).padStart(3, "0")}.sql`), sql);
    fileNo++;
  }
  console.log(`✓ ${fileNo} sql batches -> ${sqlDir} (first ${PUBLISH_NOW} published)`);
}

// ---- main ----------------------------------------------------------------------
const mode = process.argv[2];
const limitArg = process.argv.indexOf("--limit");
const limit = limitArg > -1 ? Number(process.argv[limitArg + 1]) : undefined;

if (mode === "--topics") await generateTopics();
else if (mode === "--write") await generateArticles(limit);
else if (mode === "--sql") emitSql();
else {
  console.error("usage: --topics | --write [--limit N] | --sql");
  process.exit(1);
}
