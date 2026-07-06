"use client";

import { useState } from "react";

export default function NewsletterForm() {
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
      <p className="text-sm text-sage">
        You&apos;re in. One useful email a week - recipes, routines, no spam.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 rounded-full border border-edge bg-surface-1 px-5 py-2.5 text-sm text-cream placeholder:text-muted focus:border-gold focus:outline-none"
      />
      {/* honeypot: hidden from humans, tempting to bots */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="newsletter-website">Website</label>
        <input
          id="newsletter-website"
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
        {status === "sending" ? "Joining…" : "Subscribe"}
      </button>
      {error && (
        <p className="text-sm text-ember" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
