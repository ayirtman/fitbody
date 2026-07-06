"use client";

import { useLocalStorage } from "@/lib/useLocalStorage";
import {
  DEFAULT_FAVORITES,
  STORAGE_KEYS,
  type FavoriteKind,
  type FavoritesState,
} from "@/lib/storage";

export default function FavoriteButton({
  kind,
  slug,
  className = "",
}: {
  kind: FavoriteKind;
  slug: string;
  className?: string;
}) {
  const [favorites, setFavorites, hydrated] = useLocalStorage<FavoritesState>(
    STORAGE_KEYS.favorites,
    DEFAULT_FAVORITES,
  );
  const active = hydrated && favorites[kind].includes(slug);

  function toggle() {
    setFavorites((prev) => {
      const list = prev[kind];
      return {
        ...prev,
        [kind]: list.includes(slug)
          ? list.filter((s) => s !== slug)
          : [...list, slug],
      };
    });
  }

  return (
    <button
      onClick={toggle}
      aria-pressed={active}
      className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
        active
          ? "border-gold bg-gold/15 text-gold"
          : "border-edge text-muted hover:border-gold/40 hover:text-cream"
      } ${className}`}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d="M12 21s-7.5-4.7-10-9.3C.6 8.4 2.6 4.5 6.4 4.5c2.2 0 3.9 1.2 5.6 3.3 1.7-2.1 3.4-3.3 5.6-3.3 3.8 0 5.8 3.9 4.4 7.2C19.5 16.3 12 21 12 21z" />
      </svg>
      {active ? "Saved" : "Save"}
    </button>
  );
}
