"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  {
    href: "/",
    label: "Home",
    icon: (
      <path d="M3 11l9-8 9 8v9a1 1 0 01-1 1h-5v-6h-6v6H4a1 1 0 01-1-1v-9z" />
    ),
  },
  {
    href: "/muscles",
    label: "Muscles",
    icon: (
      <path d="M12 2c2 0 3 1.5 3 3l3 2v5c0 5-2.5 9-6 10-3.5-1-6-5-6-10V7l3-2c0-1.5 1-3 3-3z" />
    ),
  },
  {
    href: "/routines",
    label: "Routines",
    icon: (
      <path d="M4 6h2v12H4zM18 6h2v12h-2zM7 10h3v4H7zM14 10h3v4h-3zM10 11h4v2h-4z" />
    ),
  },
  {
    href: "/recipes",
    label: "Food",
    icon: (
      <path d="M7 2v8a2 2 0 002 2v10h2V2H9v6H8V2H7zm8 0c-1.5 0-3 2-3 5s1 5 2 5v10h2V2h-1z" />
    ),
  },
  {
    href: "/my-temple",
    label: "Temple",
    icon: (
      <path d="M3 5h18v3H3zM5 10h3v11H5zm5.5 0h3v11h-3zM16 10h3v11h-3z" />
    ),
  },
];

export default function MobileNav() {
  const pathname = usePathname();
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-edge bg-surface-1/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
      aria-label="Primary mobile"
    >
      <div className="flex">
        {items.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[10px] font-medium ${
                active ? "text-gold" : "text-muted"
              }`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                {item.icon}
              </svg>
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
