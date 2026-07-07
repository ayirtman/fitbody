import type { Metadata } from "next";
import Link from "next/link";
import BlogStudio from "./BlogStudio";

export const metadata: Metadata = {
  title: "Blog Studio",
  robots: { index: false, follow: false },
};

export default function BlogAdminPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
        Admin ·{" "}
        <Link href="/admin/newsletter" className="underline hover:text-gold-light">
          Newsletter Studio
        </Link>
      </p>
      <h1 className="display lintel mt-1 text-4xl sm:text-5xl">Blog Studio</h1>
      <p className="mt-4 max-w-xl text-muted">
        Preview drafts, publish with one click, and control the daily drip.
        The cron publishes the oldest drafts first, every morning.
      </p>
      <BlogStudio />
    </div>
  );
}
