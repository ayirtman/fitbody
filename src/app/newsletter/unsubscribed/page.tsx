import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Unsubscribed",
  robots: { index: false },
};

export default async function UnsubscribedPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string }>;
}) {
  const { ok } = await searchParams;
  const succeeded = ok === "1";

  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
        Newsletter
      </p>
      {succeeded ? (
        <>
          <h1 className="display lintel mt-2 text-4xl">
            You&apos;re out. No hard feelings.
          </h1>
          <p className="mt-4 text-muted">
            That address won&apos;t get another email from us. The whole
            library stays free and open whenever you want it - and if you
            change your mind, the signup form at the bottom of every page
            still works.
          </p>
        </>
      ) : (
        <>
          <h1 className="display lintel mt-2 text-4xl">
            That link didn&apos;t work.
          </h1>
          <p className="mt-4 text-muted">
            The unsubscribe link may be old, already used, or incomplete. Try
            the link from your most recent email - it works even if you&apos;ve
            already unsubscribed.
          </p>
        </>
      )}
      <Link
        href="/"
        className="mt-8 inline-block rounded-full bg-gold px-6 py-3 text-sm font-bold text-ink transition-colors hover:bg-gold-light"
      >
        Back to TempleFit
      </Link>
    </div>
  );
}
