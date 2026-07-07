import type { BlogContent } from "@/lib/types";

/**
 * Editorial gate shared by the generation script and the publish API: no
 * em-dashes, no AI-sounding stock phrases, sane lengths. A post that trips
 * any of these cannot go live, even manually.
 */

export const BANNED_PHRASES = [
  "—",
  "…",
  "delve",
  "unleash",
  "game-changer",
  "game changer",
  "revolutionize",
  "supercharge",
  "elevate your",
  "unlock your",
  "in today's fast-paced",
  "in this article",
  "in this blog post",
  "it's important to note",
  "it is important to note",
  "when it comes to",
  "look no further",
  "dive into",
  "dive in",
  "let's face it",
  "the world of",
  "a journey",
  "embark",
  "seamless",
  "robust",
  "leverage",
  "utilize",
  "furthermore,",
  "moreover,",
  "in conclusion",
  "ultimately,",
  "whether you're a",
  "whether you are a",
  "look, ",
  "🏋",
  "💪",
  "🔥",
];

export function checkBlogPost(post: {
  title: string;
  description: string;
  content: BlogContent;
}): string[] {
  const problems: string[] = [];
  const everything = JSON.stringify(post).toLowerCase();

  for (const phrase of BANNED_PHRASES) {
    if (everything.includes(phrase.toLowerCase())) {
      problems.push(`banned phrase: "${phrase}"`);
    }
  }
  if (/[!]/.test(post.title)) problems.push("exclamation mark in title");
  if (post.description.length > 160) problems.push("description over 160 chars");
  if (post.description.length < 50) problems.push("description under 50 chars");
  if (post.content.sections.length < 3) problems.push("fewer than 3 sections");

  const words = [
    post.content.intro,
    ...post.content.sections.flatMap((s) => [
      ...s.paragraphs,
      ...(s.bullets ?? []),
    ]),
  ]
    .join(" ")
    .split(/\s+/).length;
  if (words < 450) problems.push(`too short (${words} words)`);
  if (words > 1600) problems.push(`too long (${words} words)`);

  return problems;
}
