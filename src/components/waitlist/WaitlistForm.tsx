"use client";

import { useState } from "react";
import { useLocalStorage } from "@/lib/useLocalStorage";
import {
  DEFAULT_WAITLIST,
  STORAGE_KEYS,
  type WaitlistState,
} from "@/lib/storage";

export default function WaitlistForm() {
  const [waitlist, setWaitlist, hydrated] = useLocalStorage<WaitlistState>(
    STORAGE_KEYS.waitlist,
    DEFAULT_WAITLIST,
  );
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!data.ok) {
        setStatus("error");
        setError(data.error ?? "Something went wrong - try again.");
        return;
      }
      setWaitlist({ submitted: true, at: new Date().toISOString() });
      setStatus("idle");
    } catch {
      setStatus("error");
      setError("Network hiccup - try again in a moment.");
    }
  }

  if (hydrated && waitlist.submitted) {
    return (
      <div className="rounded-2xl border border-sage/40 bg-sage/10 p-6 text-center">
        <p className="display text-2xl text-sage">You&apos;re on the list.</p>
        <p className="mt-2 text-sm text-muted">
          We&apos;ll email you the moment Posture AI opens up. Until then, the
          whole free library is yours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
      <label htmlFor="waitlist-email" className="sr-only">
        Email address
      </label>
      <input
        id="waitlist-email"
        type="email"
        required
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 rounded-full border border-edge bg-surface-1 px-5 py-3 text-sm text-cream placeholder:text-muted focus:border-gold focus:outline-none"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-gold px-6 py-3 text-sm font-bold text-ink transition-colors hover:bg-gold-light disabled:opacity-60"
      >
        {status === "sending" ? "Joining…" : "Join the waitlist"}
      </button>
      {error && (
        <p className="text-sm text-ember sm:absolute sm:mt-14" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
