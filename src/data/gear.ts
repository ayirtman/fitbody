import type { Equipment } from "@/lib/types";

/**
 * Curated gear the site recommends. Links are Amazon search URLs (no
 * invented product IDs) tagged with NEXT_PUBLIC_AMAZON_TAG when set, so
 * they work untagged today and monetize the moment the Associates account
 * exists. Every render site shows an affiliate disclosure.
 */

export interface GearItem {
  id: string;
  name: string;
  why: string;
  category: "training" | "kitchen";
  /** Which movement equipment this item covers, if any. */
  equipment?: Equipment;
  /** Amazon search query. */
  search: string;
}

export const gear: GearItem[] = [
  {
    id: "adjustable-dumbbells",
    name: "Adjustable dumbbell pair",
    why: "One pair replaces a rack. The single best purchase for a garage or spare-corner setup.",
    category: "training",
    equipment: "dumbbells",
    search: "adjustable dumbbells pair",
  },
  {
    id: "resistance-bands",
    name: "Loop resistance band set",
    why: "Under 20 bucks, fits in a drawer, covers warm-ups, rows and assistance work.",
    category: "training",
    equipment: "bands",
    search: "resistance loop bands set",
  },
  {
    id: "pull-up-bar",
    name: "Doorway pull-up bar",
    why: "No drilling, holds your bodyweight, unlocks the whole pulling half of this library.",
    category: "training",
    equipment: "pull-up-bar",
    search: "doorway pull up bar no screws",
  },
  {
    id: "barbell-set",
    name: "Barbell and plate set",
    why: "Only if you're building a proper home gym - everything here works without one.",
    category: "training",
    equipment: "barbell",
    search: "barbell weight plate set home gym",
  },
  {
    id: "exercise-mat",
    name: "Thick exercise mat",
    why: "Your knees and spine will thank you on floor work. Thicker than a yoga mat.",
    category: "training",
    search: "thick exercise mat home workout",
  },
  {
    id: "meal-prep-containers",
    name: "Glass meal-prep containers",
    why: "Survive the microwave, the dishwasher and the bottom of a work bag. Buy once.",
    category: "kitchen",
    search: "glass meal prep containers set",
  },
  {
    id: "kitchen-scale",
    name: "Digital kitchen scale",
    why: "The difference between guessing your protein and knowing it. Used in every recipe here.",
    category: "kitchen",
    search: "digital kitchen scale grams",
  },
  {
    id: "slow-cooker",
    name: "Slow cooker",
    why: "Load it Sunday morning, lift the lid on a week of chili and pulled chicken.",
    category: "kitchen",
    search: "slow cooker 6 quart",
  },
];

export function gearUrl(item: GearItem): string {
  const tag = process.env.NEXT_PUBLIC_AMAZON_TAG;
  const base = `https://www.amazon.com/s?k=${encodeURIComponent(item.search)}`;
  return tag ? `${base}&tag=${encodeURIComponent(tag)}` : base;
}

export function gearForEquipment(equipment: Equipment[]): GearItem[] {
  return gear.filter(
    (g) => g.equipment && equipment.includes(g.equipment),
  );
}
