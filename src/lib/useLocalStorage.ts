"use client";

import { useCallback, useEffect, useState } from "react";
import { readStorage, writeStorage } from "./storage";

/**
 * Hydration-safe localStorage state: returns `fallback` on the server and on
 * first client render, then loads the stored value after mount. Syncs across
 * tabs via the `storage` event.
 */
export function useLocalStorage<T>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(fallback);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setValue(readStorage(key, fallback));
    setHydrated(true);
    const onStorage = (e: StorageEvent) => {
      if (e.key === key) setValue(readStorage(key, fallback));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
    // fallback is intentionally captured once — defaults are static constants
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const set = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved =
          typeof next === "function" ? (next as (p: T) => T)(prev) : next;
        writeStorage(key, resolved);
        return resolved;
      });
    },
    [key],
  );

  return [value, set, hydrated] as const;
}
