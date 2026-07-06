"use client";

import { heatStrip } from "@/lib/streak";

/** 8-week heat strip, one cell per day, current week on the right. */
export default function StreakCalendar({ dates }: { dates: string[] }) {
  const days = heatStrip(dates, 56);
  const weeks: (typeof days)[] = [];
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));

  return (
    <div className="flex gap-1.5" role="img" aria-label="Training days, last 8 weeks">
      {weeks.map((week, wi) => (
        <div key={wi} className="flex flex-col gap-1.5">
          {week.map((day) => (
            <div
              key={day.iso}
              title={`${day.iso}${day.done ? " — trained" : ""}`}
              className={`h-4 w-4 rounded-[4px] ${
                day.done ? "bg-gold" : "bg-surface-2"
              }`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
