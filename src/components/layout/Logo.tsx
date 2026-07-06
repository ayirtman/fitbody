import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="TempleFit home">
      <svg width="30" height="30" viewBox="0 0 32 32" aria-hidden="true">
        {/* temple mark: lintel beam over three pillars */}
        <rect x="3" y="5" width="26" height="4" rx="1.5" fill="var(--color-gold)" />
        <rect x="6" y="12" width="4.5" height="15" rx="1.5" fill="var(--color-cream)" />
        <rect x="13.75" y="12" width="4.5" height="15" rx="1.5" fill="var(--color-cream)" />
        <rect x="21.5" y="12" width="4.5" height="15" rx="1.5" fill="var(--color-cream)" />
      </svg>
      <span className="display text-2xl tracking-wider">
        Temple<span className="text-gold">Fit</span>
      </span>
    </Link>
  );
}
