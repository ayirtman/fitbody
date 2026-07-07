import type { Metadata } from "next";
import Link from "next/link";
import { listPublished, PAGE_SIZE } from "@/lib/blog";
import { pageMeta } from "@/lib/seo/meta";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Badge from "@/components/ui/Badge";

export const revalidate = 900;

const CATEGORY_LABEL: Record<string, string> = {
  training: "Training",
  nutrition: "Nutrition",
  recovery: "Recovery",
  "dad-life": "Dad Life",
};

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string }>;
}): Promise<Metadata> {
  const { page, category } = await searchParams;
  const n = Math.max(1, Number(page) || 1);
  const suffix = [
    category && CATEGORY_LABEL[category] ? ` - ${CATEGORY_LABEL[category]}` : "",
    n > 1 ? ` - Page ${n}` : "",
  ].join("");
  const query = [
    category ? `category=${category}` : "",
    n > 1 ? `page=${n}` : "",
  ]
    .filter(Boolean)
    .join("&");
  return pageMeta({
    title: `Blog${suffix}`,
    description:
      "Short, honest reads on training, eating and staying pain-free as a busy dad. New posts most days.",
    path: `/blog${query ? `?${query}` : ""}`,
  });
}

function fmtDate(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string }>;
}) {
  const { page, category } = await searchParams;
  const pageNum = Math.max(1, Number(page) || 1);
  const cat = category && CATEGORY_LABEL[category] ? category : undefined;
  const { posts, total } = await listPublished(pageNum, cat);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const pageHref = (p: number) => {
    const params = [cat ? `category=${cat}` : "", p > 1 ? `page=${p}` : ""]
      .filter(Boolean)
      .join("&");
    return `/blog${params ? `?${params}` : ""}`;
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="mb-6">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Blog", href: "/blog" },
          ]}
        />
      </div>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
        The Blog
      </p>
      <h1 className="display lintel mt-1 text-4xl sm:text-5xl">
        Short reads for busy dads
      </h1>
      <p className="mt-4 max-w-xl text-muted">
        Training, food and fixing what hurts - a few honest minutes at a time.
        New posts most days.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        <Link
          href="/blog"
          className={`rounded-full border px-4 py-1.5 text-xs transition-colors ${!cat ? "border-gold text-gold" : "border-edge text-muted hover:border-gold hover:text-gold"}`}
        >
          All
        </Link>
        {Object.entries(CATEGORY_LABEL).map(([id, label]) => (
          <Link
            key={id}
            href={`/blog?category=${id}`}
            className={`rounded-full border px-4 py-1.5 text-xs transition-colors ${cat === id ? "border-gold text-gold" : "border-edge text-muted hover:border-gold hover:text-gold"}`}
          >
            {label}
          </Link>
        ))}
      </div>

      {posts.length === 0 ? (
        <p className="mt-10 text-sm text-muted">
          Nothing here yet - first posts are on the way.
        </p>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="card block p-5 transition-colors hover:border-gold"
            >
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="gold">{CATEGORY_LABEL[post.category] ?? post.category}</Badge>
                <span className="text-xs text-muted">
                  {fmtDate(post.published_at)}
                </span>
              </div>
              <h2 className="display mt-3 text-xl leading-snug">{post.title}</h2>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
                {post.description}
              </p>
            </Link>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <nav aria-label="Pagination" className="mt-10 flex items-center gap-3 text-sm">
          {pageNum > 1 && (
            <Link
              href={pageHref(pageNum - 1)}
              className="rounded-full border border-edge px-4 py-1.5 text-cream transition-colors hover:border-gold"
            >
              ← Newer
            </Link>
          )}
          <span className="text-muted">
            Page {pageNum} of {totalPages}
          </span>
          {pageNum < totalPages && (
            <Link
              href={pageHref(pageNum + 1)}
              className="rounded-full border border-edge px-4 py-1.5 text-cream transition-colors hover:border-gold"
            >
              Older →
            </Link>
          )}
        </nav>
      )}
    </div>
  );
}
