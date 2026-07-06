"use client";

import { useState } from "react";

/**
 * Email-gated free download: subscribe via the existing newsletter API,
 * then reveal the PDF link. Soft gate - the file is served from /public,
 * the trade is honest ("get the pack, join the weekly email").
 */
export default function LeadMagnetForm({
  file,
  cta,
}: {
  file: string;
  cta: string;
}) {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!data.ok) {
        setStatus("error");
        setError(data.error ?? "Something went wrong - try again.");
        return;
      }
      setStatus("done");
    } catch {
      setStatus("error");
      setError("Network hiccup - try again in a moment.");
    }
  }

  if (status === "done") {
    return (
      <div>
        <a
          href={file}
          download
          className="inline-block rounded-full bg-gold px-6 py-2.5 text-sm font-bold text-ink transition-colors hover:bg-gold-light"
        >
          Download your PDF ↓
        </a>
        <p className="mt-2 text-xs text-muted">
          You&apos;re also on the weekly email now - one useful issue a week,
          unsubscribe anytime.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
      <label htmlFor={`lead-${file}`} className="sr-only">
        Email address
      </label>
      <input
        id={`lead-${file}`}
        type="email"
        required
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 rounded-full border border-edge bg-ink px-5 py-2.5 text-sm text-cream placeholder:text-muted focus:border-gold focus:outline-none"
      />
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor={`lead-web-${file}`}>Website</label>
        <input
          id={`lead-web-${file}`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-gold px-6 py-2.5 text-sm font-bold text-ink transition-colors hover:bg-gold-light disabled:opacity-60"
      >
        {status === "sending" ? "One sec…" : cta}
      </button>
      {error && (
        <p className="text-sm text-ember" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
