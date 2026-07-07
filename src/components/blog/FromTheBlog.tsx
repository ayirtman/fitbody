import Link from "next/link";
import { latestPublished } from "@/lib/blog";
import SectionHeader from "@/components/ui/SectionHeader";

/** Homepage teaser: latest three posts. Renders nothing when there are none. */
export default async function FromTheBlog() {
  const posts = await latestPublished(3);
  if (posts.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <SectionHeader eyebrow="Fresh off the blog" title="A few honest minutes" />
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="card block p-5 transition-colors hover:border-gold"
          >
            <h3 className="display text-xl leading-snug">{post.title}</h3>
            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
              {post.description}
            </p>
          </Link>
        ))}
      </div>
      <Link
        href="/blog"
        className="mt-6 inline-block text-sm font-medium text-gold hover:text-gold-light"
      >
        All posts →
      </Link>
    </section>
  );
}
