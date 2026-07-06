import Link from "next/link";
import Logo from "./Logo";

const links = [
  { href: "/muscles", label: "Muscles" },
  { href: "/exercises", label: "Exercises" },
  { href: "/routines", label: "Routines" },
  { href: "/flexibility", label: "Flexibility" },
  { href: "/physio", label: "Physio" },
];

const foodLinks = [
  { href: "/recipes", label: "Recipes" },
  { href: "/meal-prep", label: "Meal Prep" },
  { href: "/nutrition", label: "Nutrition Targets" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-edge bg-ink/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6">
        <Logo />
        <div className="ml-auto hidden items-center gap-5 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted transition-colors hover:text-cream"
            >
              {l.label}
            </Link>
          ))}
          {/* CSS-only dropdown for the food section */}
          <div className="group relative">
            <Link
              href="/recipes"
              className="flex items-center gap-1 text-sm font-medium text-muted transition-colors hover:text-cream"
            >
              Food
              <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
                <path d="M1 3l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </Link>
            <div className="invisible absolute right-0 top-full pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="card w-44 p-2">
                {foodLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="block rounded-lg px-3 py-2 text-sm text-muted hover:bg-surface-2 hover:text-cream"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <Link
            href="/my-temple"
            className="text-sm font-medium text-muted transition-colors hover:text-cream"
          >
            My Temple
          </Link>
          <Link
            href="/posture-ai"
            className="rounded-full bg-gold px-4 py-1.5 text-sm font-semibold text-ink transition-colors hover:bg-gold-light"
          >
            Posture AI
          </Link>
        </div>
        <Link
          href="/posture-ai"
          className="ml-auto rounded-full bg-gold px-4 py-1.5 text-sm font-semibold text-ink md:hidden"
        >
          Posture AI
        </Link>
      </nav>
    </header>
  );
}
