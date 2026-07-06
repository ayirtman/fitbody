import Link from "next/link";

export default function SectionHeader({
  eyebrow,
  title,
  link,
  className = "",
}: {
  eyebrow?: string;
  title: string;
  link?: { href: string; label: string };
  className?: string;
}) {
  return (
    <div className={`flex items-end justify-between gap-4 ${className}`}>
      <div>
        {eyebrow && (
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            {eyebrow}
          </p>
        )}
        <h2 className="display lintel text-3xl sm:text-4xl">{title}</h2>
      </div>
      {link && (
        <Link
          href={link.href}
          className="mb-1 shrink-0 text-sm font-medium text-gold transition-colors hover:text-gold-light"
        >
          {link.label} →
        </Link>
      )}
    </div>
  );
}
