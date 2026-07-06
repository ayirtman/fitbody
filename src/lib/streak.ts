import { todayIso } from "./storage";

/**
 * Pure streak math over ISO yyyy-mm-dd date strings.
 * A streak is alive if the last completion was today OR yesterday — a dad who
 * trained at 11pm shouldn't see a dead streak at breakfast.
 */

function shiftDay(iso: string, delta: number): string {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(y, m - 1, d + delta);
  return todayIso(date);
}

export function currentStreak(dates: string[], today = todayIso()): number {
  const set = new Set(dates);
  let anchor = today;
  if (!set.has(anchor)) {
    anchor = shiftDay(today, -1);
    if (!set.has(anchor)) return 0;
  }
  let streak = 0;
  let cursor = anchor;
  while (set.has(cursor)) {
    streak++;
    cursor = shiftDay(cursor, -1);
  }
  return streak;
}

export function longestStreak(dates: string[]): number {
  const set = new Set(dates);
  let best = 0;
  for (const d of set) {
    if (set.has(shiftDay(d, -1))) continue; // not a streak start
    let len = 0;
    let cursor = d;
    while (set.has(cursor)) {
      len++;
      cursor = shiftDay(cursor, 1);
    }
    best = Math.max(best, len);
  }
  return best;
}

export function completionsThisWeek(dates: string[], today = todayIso()): number {
  const set = new Set(dates);
  const [y, m, d] = today.split("-").map(Number);
  const now = new Date(y, m - 1, d);
  // week starts Monday
  const dow = (now.getDay() + 6) % 7;
  let count = 0;
  for (let i = 0; i <= dow; i++) {
    if (set.has(shiftDay(today, -i))) count++;
  }
  return count;
}

/** Last N days as {iso, done} for the streak heat-strip, oldest first */
export function heatStrip(
  dates: string[],
  days: number,
  today = todayIso(),
): { iso: string; done: boolean }[] {
  const set = new Set(dates);
  const out: { iso: string; done: boolean }[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const iso = shiftDay(today, -i);
    out.push({ iso, done: set.has(iso) });
  }
  return out;
}
