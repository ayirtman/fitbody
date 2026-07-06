"use client";

import { useCallback, useEffect, useState } from "react";

interface Issue {
  id: string;
  subject: string;
  html: string;
  status: "draft" | "sent";
  source: string;
  created_at: string;
  sent_at: string | null;
  sent_count: number;
}

interface Dashboard {
  issues: Issue[];
  subscribers: number | null;
  claude: boolean;
}

const SECRET_KEY = "templefit.newsletterSecret";

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function NewsletterStudio() {
  const [secret, setSecret] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [data, setData] = useState<Dashboard | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null); // action key, e.g. "generate"
  const [topic, setTopic] = useState("");
  const [testEmail, setTestEmail] = useState("");
  const [previewId, setPreviewId] = useState<string | null>(null);

  const api = useCallback(
    async (path: string, init: RequestInit = {}, key?: string) => {
      const res = await fetch(path, {
        ...init,
        headers: {
          "Content-Type": "application/json",
          "x-newsletter-secret": key ?? secret,
          ...(init.headers as Record<string, string> | undefined),
        },
      });
      const body = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        [k: string]: unknown;
      };
      if (res.status === 401) {
        sessionStorage.removeItem(SECRET_KEY);
        setUnlocked(false);
        setData(null);
        throw new Error("Wrong secret - unlock again.");
      }
      if (!res.ok || !body.ok) {
        throw new Error(body.error ?? `Request failed (${res.status})`);
      }
      return body;
    },
    [secret],
  );

  const load = useCallback(
    async (key?: string) => {
      const body = await api("/api/newsletter/issues", {}, key);
      setData({
        issues: body.issues as Issue[],
        subscribers: body.subscribers as number | null,
        claude: body.claude as boolean,
      });
    },
    [api],
  );

  // Re-unlock from sessionStorage: plain fetch (not the api helper) so every
  // setState here happens inside the async callback, after hydration.
  useEffect(() => {
    const saved = sessionStorage.getItem(SECRET_KEY);
    if (!saved) return;
    let cancelled = false;
    fetch("/api/newsletter/issues", {
      headers: { "x-newsletter-secret": saved },
    })
      .then(async (res) => {
        if (cancelled) return;
        if (!res.ok) {
          sessionStorage.removeItem(SECRET_KEY);
          return;
        }
        const body = (await res.json()) as {
          issues: Issue[];
          subscribers: number | null;
          claude: boolean;
        };
        if (cancelled) return;
        setData({
          issues: body.issues,
          subscribers: body.subscribers,
          claude: body.claude,
        });
        setSecret(saved);
        setUnlocked(true);
      })
      .catch(() => {
        // network error - stay on the gate
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function unlock(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy("unlock");
    try {
      await load(secret);
      sessionStorage.setItem(SECRET_KEY, secret);
      setUnlocked(true);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(null);
    }
  }

  async function run(key: string, action: () => Promise<void>) {
    setError(null);
    setNotice(null);
    setBusy(key);
    try {
      await action();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(null);
    }
  }

  const generate = () =>
    run("generate", async () => {
      await api("/api/newsletter/generate", {
        method: "POST",
        body: JSON.stringify(topic.trim() ? { topic: topic.trim() } : {}),
      });
      setTopic("");
      setNotice("Claude finished a new draft.");
      await load();
    });

  const sendTest = (issue: Issue) =>
    run(`test:${issue.id}`, async () => {
      await api("/api/newsletter/send", {
        method: "POST",
        body: JSON.stringify({ issueId: issue.id, test: true, to: testEmail }),
      });
      setNotice(`Test copy of "${issue.subject}" sent to ${testEmail}.`);
    });

  const sendAll = (issue: Issue) =>
    run(`send:${issue.id}`, async () => {
      const n = data?.subscribers ?? 0;
      if (
        !window.confirm(
          `Send "${issue.subject}" to all ${n} active subscriber${n === 1 ? "" : "s"}? This cannot be undone.`,
        )
      ) {
        return;
      }
      const body = await api("/api/newsletter/send", {
        method: "POST",
        body: JSON.stringify({ issueId: issue.id }),
      });
      setNotice(`Sent to ${body.sent as number} subscriber(s).`);
      await load();
    });

  const remove = (issue: Issue) =>
    run(`delete:${issue.id}`, async () => {
      if (!window.confirm(`Delete draft "${issue.subject}"?`)) return;
      await api(`/api/newsletter/issues/${issue.id}`, { method: "DELETE" });
      await load();
    });

  const editSubject = (issue: Issue) =>
    run(`edit:${issue.id}`, async () => {
      const subject = window.prompt("New subject line:", issue.subject);
      if (!subject || subject.trim() === issue.subject) return;
      await api(`/api/newsletter/issues/${issue.id}`, {
        method: "PATCH",
        body: JSON.stringify({ subject: subject.trim() }),
      });
      await load();
    });

  if (!unlocked) {
    return (
      <form onSubmit={unlock} className="mt-10 flex max-w-md flex-col gap-3 sm:flex-row">
        <label htmlFor="admin-secret" className="sr-only">
          Admin secret
        </label>
        <input
          id="admin-secret"
          type="password"
          required
          placeholder="Admin secret"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          className="flex-1 rounded-full border border-edge bg-surface-1 px-5 py-2.5 text-sm text-cream placeholder:text-muted focus:border-gold focus:outline-none"
        />
        <button
          type="submit"
          disabled={busy === "unlock"}
          className="rounded-full bg-gold px-6 py-2.5 text-sm font-bold text-ink transition-colors hover:bg-gold-light disabled:opacity-60"
        >
          {busy === "unlock" ? "Checking…" : "Unlock"}
        </button>
        {error && (
          <p className="text-sm text-ember" role="alert">
            {error}
          </p>
        )}
      </form>
    );
  }

  return (
    <div className="mt-10">
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
        <span>
          <strong className="text-gold">{data?.subscribers ?? "…"}</strong>{" "}
          active subscribers
        </span>
        {data && !data.claude && (
          <span className="text-ember">
            ANTHROPIC_API_KEY not set - Claude generation is off
          </span>
        )}
      </div>

      <section className="mt-6 rounded-2xl border border-edge bg-surface-1 p-6">
        <h2 className="display lintel text-2xl">Write this week&apos;s issue</h2>
        <p className="mt-2 text-sm text-muted">
          Claude writes around this week&apos;s featured recipe and movement.
          Add an optional theme to steer it.
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <label htmlFor="issue-topic" className="sr-only">
            Optional theme
          </label>
          <input
            id="issue-topic"
            type="text"
            placeholder="Optional theme, e.g. getting back on track after a holiday"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="flex-1 rounded-full border border-edge bg-ink px-5 py-2.5 text-sm text-cream placeholder:text-muted focus:border-gold focus:outline-none"
          />
          <button
            onClick={generate}
            disabled={busy === "generate" || !data?.claude}
            className="rounded-full bg-gold px-6 py-2.5 text-sm font-bold text-ink transition-colors hover:bg-gold-light disabled:opacity-60"
          >
            {busy === "generate" ? "Claude is writing…" : "Generate with Claude"}
          </button>
        </div>
        {busy === "generate" && (
          <p className="mt-3 text-xs text-muted">
            This usually takes 30-60 seconds. Hang tight.
          </p>
        )}
      </section>

      {notice && (
        <p className="mt-4 text-sm text-sage" role="status">
          {notice}
        </p>
      )}
      {error && (
        <p className="mt-4 text-sm text-ember" role="alert">
          {error}
        </p>
      )}

      <div className="mt-4 flex max-w-md flex-col gap-1">
        <label htmlFor="test-email" className="text-xs text-muted">
          Test-send address
        </label>
        <input
          id="test-email"
          type="email"
          placeholder="you@example.com"
          value={testEmail}
          onChange={(e) => setTestEmail(e.target.value)}
          className="rounded-full border border-edge bg-surface-1 px-5 py-2.5 text-sm text-cream placeholder:text-muted focus:border-gold focus:outline-none"
        />
      </div>

      <section className="mt-8">
        <h2 className="display lintel text-2xl">Issues</h2>
        {data && data.issues.length === 0 && (
          <p className="mt-3 text-sm text-muted">
            No issues yet. Generate one above, or wait for Monday&apos;s
            automatic draft.
          </p>
        )}
        <ul className="mt-4 flex flex-col gap-4">
          {data?.issues.map((issue) => (
            <li
              key={issue.id}
              className="rounded-2xl border border-edge bg-surface-1 p-5"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`rounded-full px-3 py-0.5 text-xs font-bold uppercase tracking-wide ${
                    issue.status === "sent"
                      ? "bg-sage/20 text-sage"
                      : "bg-gold/20 text-gold"
                  }`}
                >
                  {issue.status}
                </span>
                <span className="text-xs text-muted">
                  {fmtDate(issue.created_at)} · written by {issue.source}
                  {issue.status === "sent" &&
                    ` · ${issue.sent_count} recipient${issue.sent_count === 1 ? "" : "s"}`}
                </span>
              </div>
              <p className="mt-2 font-semibold text-cream">{issue.subject}</p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                <button
                  onClick={() =>
                    setPreviewId(previewId === issue.id ? null : issue.id)
                  }
                  className="rounded-full border border-edge px-4 py-1.5 text-cream transition-colors hover:border-gold"
                >
                  {previewId === issue.id ? "Hide preview" : "Preview"}
                </button>
                {issue.status === "draft" && (
                  <button
                    onClick={() => editSubject(issue)}
                    disabled={busy === `edit:${issue.id}`}
                    className="rounded-full border border-edge px-4 py-1.5 text-cream transition-colors hover:border-gold disabled:opacity-60"
                  >
                    Edit subject
                  </button>
                )}
                <button
                  onClick={() => sendTest(issue)}
                  disabled={!testEmail || busy === `test:${issue.id}`}
                  className="rounded-full border border-edge px-4 py-1.5 text-cream transition-colors hover:border-gold disabled:opacity-60"
                >
                  {busy === `test:${issue.id}` ? "Sending…" : "Send test"}
                </button>
                {issue.status === "draft" && (
                  <>
                    <button
                      onClick={() => sendAll(issue)}
                      disabled={busy === `send:${issue.id}`}
                      className="rounded-full bg-gold px-4 py-1.5 font-bold text-ink transition-colors hover:bg-gold-light disabled:opacity-60"
                    >
                      {busy === `send:${issue.id}`
                        ? "Sending…"
                        : "Send to all subscribers"}
                    </button>
                    <button
                      onClick={() => remove(issue)}
                      disabled={busy === `delete:${issue.id}`}
                      className="rounded-full border border-edge px-4 py-1.5 text-ember transition-colors hover:border-ember disabled:opacity-60"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
              {previewId === issue.id && (
                <iframe
                  sandbox=""
                  title={`Preview: ${issue.subject}`}
                  srcDoc={issue.html.replaceAll(
                    "{{{unsubscribe}}}",
                    `<span style="color:#9b937f;text-decoration:underline;">Unsubscribe</span>`,
                  )}
                  className="mt-4 h-[560px] w-full rounded-xl border border-edge bg-ink"
                />
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
