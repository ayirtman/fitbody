import type { Metadata } from "next";
import NewsletterStudio from "./NewsletterStudio";

export const metadata: Metadata = {
  title: "Newsletter Studio",
  robots: { index: false, follow: false },
};

export default function NewsletterAdminPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
        Admin
      </p>
      <h1 className="display lintel mt-1 text-4xl sm:text-5xl">
        Newsletter Studio
      </h1>
      <p className="mt-4 max-w-xl text-muted">
        Write issues with Claude, preview them, send a test to yourself, then
        send to everyone. A fresh draft is written automatically every Monday.
      </p>
      <NewsletterStudio />
    </div>
  );
}
