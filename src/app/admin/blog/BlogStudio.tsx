"use client";

import { useCallback, useEffect, useState } from "react";
import type { BlogContent } from "@/lib/types";

interface PostRow {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  status: "draft" | "published";
  published_at: string | null;
  created_at: string;
}

interface Settings {
  drip_enabled: boolean;
  drip_per_day: number;
}

const SECRET_KEY = "templefit.newsletterSecret";

function fmtDate(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
}

export default function BlogStudio() {
  const [secret, setSecret] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [posts, setPosts] = useState<PostRow[]>([]);
  const [counts, setCounts] = useState<{ published: number; drafts: number } | null>(null);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<"all" | "draft" | "published">("all");
  const [search, setSearch] = useState("");
  const [preview, setPreview] = useState<{ id: string; title: string; content: BlogContent } | null>(null);

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
      const body = await api("/api/blog", {}, key);
      setPosts(body.posts as PostRow[]);
      setCounts(body.counts as { published: number; drafts: number });
      if (body.settings) setSettings(body.settings as Settings);
    },
    [api],
  );

  useEffect(() => {
    const saved = sessionStorage.getItem(SECRET_KEY);
    if (!saved) return;
    let cancelled = false;
    fetch("/api/blog", { headers: { "x-newsletter-secret": saved } })
      .then(async (res) => {
        if (cancelled || !res.ok) return;
        const body = (await res.json()) as {
          posts: PostRow[];
          counts: { published: number; drafts: number };
          settings: Settings | null;
        };
        if (cancelled) return;
        setPosts(body.posts);
        setCounts(body.counts);
        if (body.settings) setSettings(body.settings);
        setSecret(saved);
        setUnlocked(true);
      })
      .catch(() => {
        // stay on the gate
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

  const saveSettings = () =>
    run("settings", async () => {
      if (!settings) return;
      await api("/api/blog", { method: "PUT", body: JSON.stringify(settings) });
      setNotice(
        settings.drip_enabled
          ? `Drip on: ${settings.drip_per_day}/day, oldest drafts first.`
          : "Drip paused - nothing publishes until you turn it back on.",
      );
    });

  const publishNext = () =>
    run("publish-next", async () => {
      const body = await api("/api/blog", {
        method: "POST",
        body: JSON.stringify({ n: settings?.drip_per_day ?? 3 }),
      });
      const published = body.published as { title: string }[];
      setNotice(
        published.length
          ? `Published: ${published.map((p) => p.title).join(" · ")}`
          : "No drafts left to publish.",
      );
      await load();
    });

  const setStatus = (post: PostRow, status: "published" | "draft") =>
    run(`status:${post.id}`, async () => {
      await api(`/api/blog/${post.id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      setNotice(
        status === "published"
          ? `"${post.title}" is live.`
          : `"${post.title}" unpublished.`,
      );
      await load();
    });

  const remove = (post: PostRow) =>
    run(`delete:${post.id}`, async () => {
      if (!window.confirm(`Delete draft "${post.title}"? This cannot be undone.`)) return;
      await api(`/api/blog/${post.id}`, { method: "DELETE" });
      await load();
    });

  const openPreview = (post: PostRow) =>
    run(`preview:${post.id}`, async () => {
      const body = await api(`/api/blog/${post.id}`);
      const full = body.post as PostRow & { content: BlogContent };
      setPreview({ id: post.id, title: full.title, content: full.content });
    });

  if (!unlocked) {
    return (
      <form onSubmit={unlock} className="mt-10 flex max-w-md flex-col gap-3 sm:flex-row">
        <label htmlFor="blog-admin-secret" className="sr-only">
          Admin secret
        </label>
        <input
          id="blog-admin-secret"
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

  const visible = posts.filter(
    (p) =>
      (statusFilter === "all" || p.status === statusFilter) &&
      (!search.trim() || p.title.toLowerCase().includes(search.trim().toLowerCase())),
  );
  const daysLeft =
    counts && settings && settings.drip_per_day > 0
      ? Math.ceil(counts.drafts / settings.drip_per_day)
      : null;

  return (
    <div className="mt-10">
      <div className="flex flex-wrap items-center gap-6 text-sm text-muted">
        <span>
          <strong className="text-gold">{counts?.published ?? "…"}</strong> live
        </span>
        <span>
          <strong className="text-gold">{counts?.drafts ?? "…"}</strong> in the queue
        </span>
        {daysLeft !== null && settings?.drip_enabled && (
          <span>
            ~<strong className="text-gold">{daysLeft}</strong> days of content left
          </span>
        )}
      </div>

      {settings && (
        <section className="mt-6 rounded-2xl border border-edge bg-surface-1 p-6">
          <h2 className="display lintel text-2xl">Daily drip</h2>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-2 text-sm text-muted">
              <input
                type="checkbox"
                checked={settings.drip_enabled}
                onChange={(e) =>
                  setSettings({ ...settings, drip_enabled: e.target.checked })
                }
                className="h-4 w-4 accent-[#c9a227]"
              />
              Auto-publish
            </label>
            <label className="flex items-center gap-2 text-sm text-muted">
              <input
                type="number"
                min={1}
                max={20}
                value={settings.drip_per_day}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    drip_per_day: Number(e.target.value) || 1,
                  })
                }
                className="w-20 rounded-full border border-edge bg-ink px-4 py-1.5 text-sm text-cream focus:border-gold focus:outline-none"
              />
              posts per day (06:00 UTC)
            </label>
            <button
              onClick={saveSettings}
              disabled={busy === "settings"}
              className="rounded-full border border-gold px-5 py-1.5 text-sm font-bold text-gold transition-colors hover:bg-gold hover:text-ink disabled:opacity-60"
            >
              {busy === "settings" ? "Saving…" : "Save"}
            </button>
            <button
              onClick={publishNext}
              disabled={busy === "publish-next"}
              className="rounded-full bg-gold px-5 py-1.5 text-sm font-bold text-ink transition-colors hover:bg-gold-light disabled:opacity-60"
            >
              {busy === "publish-next" ? "Publishing…" : "Publish next batch now"}
            </button>
          </div>
        </section>
      )}

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

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <div className="flex gap-2">
          {(["all", "draft", "published"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setStatusFilter(f)}
              className={`rounded-full border px-4 py-1.5 text-xs transition-colors ${
                statusFilter === f
                  ? "border-gold text-gold"
                  : "border-edge text-muted hover:border-gold"
              }`}
            >
              {f === "all" ? "All" : f === "draft" ? "Drafts" : "Live"}
            </button>
          ))}
        </div>
        <input
          type="search"
          placeholder="Search titles…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-48 rounded-full border border-edge bg-surface-1 px-5 py-2 text-sm text-cream placeholder:text-muted focus:border-gold focus:outline-none"
        />
        <span className="text-xs text-muted">{visible.length} shown</span>
      </div>

      <ul className="mt-4 divide-y divide-edge">
        {visible.map((post) => (
          <li key={post.id} className="flex flex-wrap items-center gap-3 py-3">
            <span
              className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                post.status === "published"
                  ? "bg-sage/20 text-sage"
                  : "bg-gold/20 text-gold"
              }`}
            >
              {post.status === "published" ? "live" : "draft"}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-cream">
                {post.status === "published" ? (
                  <a
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    className="hover:text-gold"
                  >
                    {post.title}
                  </a>
                ) : (
                  post.title
                )}
              </p>
              <p className="text-xs text-muted">
                {post.category}
                {post.published_at ? ` · ${fmtDate(post.published_at)}` : ""}
              </p>
            </div>
            <div className="flex gap-2 text-xs">
              <button
                onClick={() => openPreview(post)}
                disabled={busy === `preview:${post.id}`}
                className="rounded-full border border-edge px-3 py-1 text-cream transition-colors hover:border-gold disabled:opacity-60"
              >
                Preview
              </button>
              {post.status === "draft" ? (
                <>
                  <button
                    onClick={() => setStatus(post, "published")}
                    disabled={busy === `status:${post.id}`}
                    className="rounded-full bg-gold px-3 py-1 font-bold text-ink transition-colors hover:bg-gold-light disabled:opacity-60"
                  >
                    Publish
                  </button>
                  <button
                    onClick={() => remove(post)}
                    disabled={busy === `delete:${post.id}`}
                    className="rounded-full border border-edge px-3 py-1 text-ember transition-colors hover:border-ember disabled:opacity-60"
                  >
                    Delete
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setStatus(post, "draft")}
                  disabled={busy === `status:${post.id}`}
                  className="rounded-full border border-edge px-3 py-1 text-cream transition-colors hover:border-gold disabled:opacity-60"
                >
                  Unpublish
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>

      {preview && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-ink/80 p-4 backdrop-blur-sm"
          onClick={() => setPreview(null)}
        >
          <div
            className="mx-auto my-8 max-w-2xl rounded-2xl border border-edge bg-surface-1 p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <h2 className="display text-2xl">{preview.title}</h2>
              <button
                onClick={() => setPreview(null)}
                className="rounded-full border border-edge px-3 py-1 text-xs text-muted hover:border-gold"
              >
                Close
              </button>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-cream/85">
              {preview.content.intro}
            </p>
            {preview.content.sections.map((s) => (
              <div key={s.heading} className="mt-6">
                <h3 className="display text-xl">{s.heading}</h3>
                {s.paragraphs.map((p, i) => (
                  <p key={i} className="mt-2 text-sm leading-relaxed text-muted">
                    {p}
                  </p>
                ))}
                {s.bullets && (
                  <ul className="mt-2 list-disc pl-5 text-sm text-muted">
                    {s.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            {preview.content.faqs && preview.content.faqs.length > 0 && (
              <div className="mt-6">
                <h3 className="display text-xl">FAQs</h3>
                {preview.content.faqs.map((f) => (
                  <p key={f.q} className="mt-2 text-sm text-muted">
                    <strong className="text-cream">{f.q}</strong> {f.a}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
