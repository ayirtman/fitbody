const variants = {
  neutral: "bg-surface-3 text-cream",
  gold: "bg-gold/15 text-gold",
  ember: "bg-ember/15 text-ember",
  sage: "bg-sage/15 text-sage",
  outline: "border border-edge text-muted",
} as const;

export type BadgeVariant = keyof typeof variants;

export default function Badge({
  children,
  variant = "neutral",
  className = "",
}: {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
