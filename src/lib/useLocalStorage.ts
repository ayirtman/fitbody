"use client";

import { useCallback, useSyncExternalStore } from "react";
import { readStorage, writeStorage } from "./storage";

/**
 * localStorage as an external store: the server (and first client render)
 * sees `fallback`, then React swaps in the stored value after hydration.
 * Writes notify subscribers in this tab; the `storage` event covers other
 * tabs. Snapshots are cached per key so getSnapshot stays referentially
 * stable between writes.
 */

const listeners = new Map<string, Set<() => void>>();
const cache = new Map<string, { raw: string | null; value: unknown }>();

function emit(key: string) {
  listeners.get(key)?.forEach((cb) => cb());
}

function subscribeTo(key: string, cb: () => void) {
  let set = listeners.get(key);
  if (!set) {
    set = new Set();
    listeners.set(key, set);
  }
  set.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === key) cb();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    set.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

function snapshot<T>(key: string, fallback: T): T {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(key);
  } catch {
    // blocked storage - treat as empty
  }
  const cached = cache.get(key);
  if (cached && cached.raw === raw) return cached.value as T;
  const value = readStorage(key, fallback);
  cache.set(key, { raw, value });
  return value;
}

export function useLocalStorage<T>(key: string, fallback: T) {
  const subscribe = useCallback(
    (cb: () => void) => subscribeTo(key, cb),
    [key],
  );

  const value = useSyncExternalStore(
    subscribe,
    () => snapshot(key, fallback),
    () => fallback,
  );

  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  const set = useCallback(
    (next: T | ((prev: T) => T)) => {
      const prev = snapshot(key, fallback);
      const resolved =
        typeof next === "function" ? (next as (p: T) => T)(prev) : next;
      writeStorage(key, resolved);
      emit(key);
    },
    // fallback is a module-level constant at every call site
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [key],
  );

  return [value, set, hydrated] as const;
}
