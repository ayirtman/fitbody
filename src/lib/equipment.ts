import type { Equipment } from "./types";

/** Display order for equipment hubs and the picker. */
export const ALL_EQUIPMENT: Equipment[] = [
  "none",
  "dumbbells",
  "kettlebell",
  "bands",
  "pull-up-bar",
  "barbell",
];

export interface EquipmentCopy {
  /** H1 on the hub page */
  headline: string;
  /** Picker card + hub intro */
  blurb: string;
  /** Meta description */
  seo: string;
}

export const EQUIPMENT_COPY: Record<Equipment, EquipmentCopy> = {
  none: {
    headline: "No equipment. No excuses.",
    blurb:
      "Floor space and a few minutes. Everything here works in a living room, a hotel room or the garden.",
    seo: "Bodyweight exercises and routines that need zero equipment - train in the living room, a hotel room or the garden.",
  },
  dumbbells: {
    headline: "One dumbbell goes a long way.",
    blurb:
      "A single dumbbell in the corner covers squats, presses, rows and carries. No rack required.",
    seo: "Dumbbell exercises and single-dumbbell routines for home - squats, presses, rows and carries with one weight.",
  },
  kettlebell: {
    headline: "One bell. Whole body.",
    blurb:
      "Swings, squats, presses and carries from a single kettlebell. The most training per square metre of any kit here.",
    seo: "Kettlebell exercises and quick kettlebell routines for home - swings, cleans, presses and carries with one bell.",
  },
  bands: {
    headline: "The gym that fits in a drawer.",
    blurb:
      "Rows, presses, squats and rehab work from a band set that costs less than one gym visit.",
    seo: "Resistance band exercises and band-only routines - rows, presses, squats and prehab from a set that fits in a drawer.",
  },
  "pull-up-bar": {
    headline: "One doorway. A stronger back.",
    blurb:
      "A no-drill doorway bar unlocks the whole pulling half of training: hangs, rows of your own bodyweight, and eventually pull-ups.",
    seo: "Doorway pull-up bar exercises and routines - dead hangs, chin-ups and pull-up progressions for home.",
  },
  barbell: {
    headline: "For the garage-gym committed.",
    blurb:
      "The classic strength tool. Only worth it if you have the space - everything else on this site works without one.",
    seo: "Barbell exercises for the home garage gym - hinges and rows for when you are ready to load up.",
  },
};
