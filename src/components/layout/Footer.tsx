import Link from "next/link";
import Logo from "./Logo";
import NewsletterForm from "@/components/newsletter/NewsletterForm";

const columns: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Train",
    links: [
      { href: "/muscles", label: "Muscle Map" },
      { href: "/exercises", label: "Exercise Library" },
      { href: "/equipment", label: "Train by Equipment" },
      { href: "/routines", label: "Routines" },
      { href: "/flexibility", label: "Flexibility" },
      { href: "/physio", label: "Physio & Pain Relief" },
      { href: "/guides", label: "Guides" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    title: "Fuel",
    links: [
      { href: "/recipes", label: "Recipes" },
      { href: "/meal-prep", label: "Meal Prep Plans" },
      { href: "/nutrition", label: "Protein & Fiber Targets" },
    ],
  },
  {
    title: "TempleFit",
    links: [
      { href: "/my-temple", label: "My Temple" },
      { href: "/posture-ai", label: "Posture AI (Coming Soon)" },
      { href: "/about", label: "About & Disclaimer" },
      { href: "/gear", label: "Gear" },
      { href: "/support", label: "Keep It Free" },
      { href: "/disclosure", label: "Disclosure" },
      { href: "/sponsor", label: "Sponsor" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-edge bg-surface-1">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_repeat(3,1fr)]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-muted">
            Your body is a temple. Maintain it - 15 honest minutes at a time.
            Built for working dads. Free, forever.
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="display lintel text-lg text-gold">{col.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted transition-colors hover:text-cream"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-edge">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="display lintel text-lg text-gold">
              The Sunday letter
            </h3>
            <p className="mt-1 max-w-sm text-sm text-muted">
              One recipe, one movement, once a week. Free, unsubscribe any
              time.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </div>
      <div className="border-t border-edge">
        <p className="mx-auto max-w-7xl px-4 py-5 text-xs text-muted sm:px-6">
          TempleFit shares general fitness education, not medical advice. If
          something hurts beyond honest effort - or pain persists - see a
          qualified professional. © {new Date().getFullYear()} TempleFit.
        </p>
      </div>
    </footer>
  );
}
