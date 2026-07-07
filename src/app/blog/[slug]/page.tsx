import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublished, relatedPublished } from "@/lib/blog";
import { pageMeta } from "@/lib/seo/meta";
import { articleSchema, faqPageSchema } from "@/lib/seo/schema";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import ArticleBody from "@/components/article/ArticleBody";
import GearKit from "@/components/gear/GearKit";
import NewsletterForm from "@/components/newsletter/NewsletterForm";

// Posts are published from the admin studio without a deploy; ISR keeps
// pages static-fast while picking up new publishes within the hour.
export const revalidate = 3600;
export const dynamicParams = true;

export function generateStaticParams() {
  // Nothing at build time - posts render on first request, then cache.
  return [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublished(slug);
  if (!post) return {};
  return pageMeta({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    type: "article",
  });
}

function fmtDate(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPublished(slug);
  if (!post) notFound();

  const related = await relatedPublished(post.category, post.slug);

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd
        data={articleSchema({
          title: post.title,
          description: post.description,
          path: `/blog/${post.slug}`,
          published: post.published_at ?? post.created_at,
        })}
      />
      <div className="mb-6">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Blog", href: "/blog" },
            { name: post.title, href: `/blog/${post.slug}` },
          ]}
        />
      </div>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
        Blog · {fmtDate(post.published_at)}
      </p>
      <h1 className="display lintel mt-1 text-4xl sm:text-5xl">{post.title}</h1>

      <ArticleBody intro={post.content.intro} sections={post.content.sections} />

      {post.content.faqs && post.content.faqs.length > 0 && (
        <section className="mt-14">
          <JsonLd data={faqPageSchema(post.content.faqs)} />
          <h2 className="display lintel text-3xl">Common questions</h2>
          <div className="mt-5 space-y-3">
            {post.content.faqs.map((f) => (
              <details key={f.q} className="card group p-5">
                <summary className="cursor-pointer list-none font-semibold text-cream">
                  <span className="mr-2 inline-block text-gold transition-transform group-open:rotate-90">
                    ›
                  </span>
                  {f.q}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {post.category === "training" && (
        <div className="mt-10">
          <GearKit equipment={["dumbbells", "bands"]} />
        </div>
      )}

      {post.content.related.length > 0 && (
        <section className="mt-12 border-t border-edge pt-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">
            Put it into practice
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {post.content.related.map((l) => (
              <Link
                key={l.href + l.label}
                href={l.href}
                className="rounded-full border border-edge px-4 py-1.5 text-xs text-cream transition-colors hover:border-gold hover:text-gold"
              >
                {l.label} →
              </Link>
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">
            More from the blog
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/blog/${r.slug}`}
                className="card block p-4 transition-colors hover:border-gold"
              >
                <p className="text-sm font-semibold leading-snug text-cream">
                  {r.title}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mt-12 rounded-2xl border border-edge bg-surface-1 p-8">
        <h2 className="display lintel text-2xl">One useful email a week</h2>
        <p className="mt-2 max-w-xl text-sm text-muted">
          A recipe, a movement and a nudge - written fresh every Monday for
          dads who train at home. No spam, unsubscribe anytime.
        </p>
        <div className="mt-4">
          <NewsletterForm />
        </div>
      </section>
    </article>
  );
}
