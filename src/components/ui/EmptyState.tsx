import Link from "next/link";

export default function EmptyState({
  title,
  body,
  cta,
}: {
  title: string;
  body: string;
  cta?: { href: string; label: string };
}) {
  return (
    <div className="card flex flex-col items-center px-6 py-12 text-center">
      <svg width="40" height="40" viewBox="0 0 32 32" aria-hidden="true" className="opacity-40">
        <rect x="3" y="5" width="26" height="4" rx="1.5" fill="var(--color-gold)" />
        <rect x="6" y="12" width="4.5" height="15" rx="1.5" fill="var(--color-muted)" />
        <rect x="13.75" y="12" width="4.5" height="15" rx="1.5" fill="var(--color-muted)" />
        <rect x="21.5" y="12" width="4.5" height="15" rx="1.5" fill="var(--color-muted)" />
      </svg>
      <h3 className="display mt-4 text-2xl">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-muted">{body}</p>
      {cta && (
        <Link
          href={cta.href}
          className="mt-5 rounded-full bg-gold px-5 py-2 text-sm font-semibold text-ink transition-colors hover:bg-gold-light"
        >
          {cta.label}
        </Link>
      )}
    </div>
  );
}
