import type { Routine } from "../lib/types";

export const routines: Routine[] = [
  {
    slug: "morning-energizer",
    name: "15-Min Morning Energizer",
    tagline:
      "Wake up your whole body before the coffee finishes brewing - no equipment, no excuses.",
    category: "quick",
    daysPerWeek: 1,
    equipment: ["none"],
    difficulty: "beginner",
    totalMinPerSession: 15,
    targetMuscles: ["quads", "chest", "glutes", "abs", "lower-back"],
    days: [
      {
        dayLabel: "The Workout",
        focus: "Full-body wake-up",
        totalMin: 15,
        blocks: [
          {
            label: "Warm-up",
            items: [
              { ref: "cat-cow", refKind: "stretch", reps: "8 slow rounds" },
              {
                ref: "worlds-greatest-stretch",
                refKind: "stretch",
                reps: "4 per side",
                holdSec: 5,
              },
            ],
          },
          {
            label: "Main",
            items: [
              {
                ref: "bodyweight-squat",
                refKind: "exercise",
                sets: 3,
                reps: "12",
                restSec: 30,
              },
              {
                ref: "push-up",
                refKind: "exercise",
                sets: 3,
                reps: "8-12",
                restSec: 30,
              },
              {
                ref: "glute-bridge",
                refKind: "exercise",
                sets: 2,
                reps: "15",
                restSec: 30,
              },
              {
                ref: "plank",
                refKind: "exercise",
                sets: 2,
                reps: "30-second hold",
                restSec: 30,
              },
              {
                ref: "standing-calf-raise",
                refKind: "exercise",
                sets: 2,
                reps: "15",
                restSec: 20,
              },
            ],
          },
          {
            label: "Cooldown",
            items: [
              { ref: "downward-dog", refKind: "stretch", holdSec: 30 },
              { ref: "childs-pose", refKind: "stretch", holdSec: 45 },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "lunch-break-full-body",
    name: "Lunch-Break Full Body",
    tagline:
      "Twenty minutes between meetings: hit every major muscle and still have time to eat.",
    category: "quick",
    daysPerWeek: 1,
    equipment: ["none", "dumbbells"],
    difficulty: "intermediate",
    totalMinPerSession: 20,
    targetMuscles: ["quads", "chest", "lats", "hamstrings", "abs"],
    days: [
      {
        dayLabel: "The Workout",
        focus: "Efficient full-body strength",
        totalMin: 20,
        blocks: [
          {
            label: "Warm-up",
            items: [
              {
                ref: "kneeling-hip-flexor-stretch",
                refKind: "stretch",
                holdSec: 30,
              },
              { ref: "cat-cow", refKind: "stretch", reps: "8 slow rounds" },
            ],
          },
          {
            label: "Main",
            items: [
              {
                ref: "goblet-squat",
                refKind: "exercise",
                sets: 3,
                reps: "10",
                restSec: 45,
              },
              {
                ref: "push-up",
                refKind: "exercise",
                sets: 3,
                reps: "10-15",
                restSec: 45,
              },
              {
                ref: "one-arm-dumbbell-row",
                refKind: "exercise",
                sets: 3,
                reps: "10 per side",
                restSec: 45,
              },
              {
                ref: "romanian-deadlift",
                refKind: "exercise",
                sets: 3,
                reps: "10",
                restSec: 45,
              },
              {
                ref: "plank",
                refKind: "exercise",
                sets: 2,
                reps: "40-second hold",
                restSec: 30,
              },
            ],
          },
          {
            label: "Cooldown",
            items: [
              { ref: "standing-quad-stretch", refKind: "stretch", holdSec: 30 },
              {
                ref: "standing-hamstring-stretch",
                refKind: "stretch",
                holdSec: 30,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "desk-warrior-reset",
    name: "Desk Warrior Reset",
    tagline:
      "Ten minutes to undo eight hours of hunching - your neck and hips will thank you.",
    category: "recovery",
    daysPerWeek: 1,
    equipment: ["none"],
    difficulty: "beginner",
    totalMinPerSession: 10,
    targetMuscles: ["neck", "upper-back", "chest", "hip-flexors", "glutes"],
    days: [
      {
        dayLabel: "The Reset",
        focus: "Post-desk posture repair",
        totalMin: 10,
        blocks: [
          {
            label: "Main",
            items: [
              { ref: "chin-tuck", refKind: "physio", reps: "10 slow reps" },
              {
                ref: "wall-angel",
                refKind: "physio",
                reps: "8 slow reps",
              },
              { ref: "upper-trap-stretch", refKind: "stretch", holdSec: 30 },
              { ref: "doorway-pec-stretch", refKind: "stretch", holdSec: 30 },
              {
                ref: "thread-the-needle",
                refKind: "stretch",
                holdSec: 20,
                reps: "3 per side",
              },
            ],
          },
          {
            label: "Cooldown",
            items: [
              {
                ref: "kneeling-hip-flexor-stretch",
                refKind: "stretch",
                holdSec: 30,
              },
              { ref: "figure-four-stretch", refKind: "stretch", holdSec: 30 },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "dad-strength-split",
    name: "3-Day Dad Strength Split",
    tagline:
      "Push, pull, and legs in three focused half-hours a week - real strength on a dad schedule.",
    category: "strength-program",
    daysPerWeek: 3,
    equipment: ["dumbbells", "pull-up-bar"],
    difficulty: "intermediate",
    totalMinPerSession: 30,
    targetMuscles: [
      "chest",
      "shoulders",
      "triceps",
      "lats",
      "upper-back",
      "biceps",
      "quads",
      "hamstrings",
      "glutes",
      "abs",
    ],
    days: [
      {
        dayLabel: "Day 1 - Push",
        focus: "Chest, shoulders, triceps",
        totalMin: 30,
        blocks: [
          {
            label: "Warm-up",
            items: [
              { ref: "doorway-pec-stretch", refKind: "stretch", holdSec: 30 },
              { ref: "cat-cow", refKind: "stretch", reps: "8 slow rounds" },
            ],
          },
          {
            label: "Main",
            items: [
              {
                ref: "incline-dumbbell-press",
                refKind: "exercise",
                sets: 3,
                reps: "8-10",
                restSec: 75,
              },
              {
                ref: "seated-dumbbell-press",
                refKind: "exercise",
                sets: 3,
                reps: "8-10",
                restSec: 75,
              },
              {
                ref: "push-up",
                refKind: "exercise",
                sets: 3,
                reps: "12-15",
                restSec: 60,
              },
              {
                ref: "lateral-raise",
                refKind: "exercise",
                sets: 3,
                reps: "12",
                restSec: 45,
              },
              {
                ref: "overhead-triceps-extension",
                refKind: "exercise",
                sets: 3,
                reps: "10-12",
                restSec: 45,
              },
            ],
          },
          {
            label: "Cooldown",
            items: [
              {
                ref: "cross-body-shoulder-stretch",
                refKind: "stretch",
                holdSec: 30,
              },
              {
                ref: "overhead-triceps-stretch",
                refKind: "stretch",
                holdSec: 30,
              },
            ],
          },
        ],
      },
      {
        dayLabel: "Day 2 - Pull",
        focus: "Back, biceps, grip",
        totalMin: 30,
        blocks: [
          {
            label: "Warm-up",
            items: [
              {
                ref: "thread-the-needle",
                refKind: "stretch",
                holdSec: 20,
                reps: "3 per side",
              },
              {
                ref: "dead-hang",
                refKind: "exercise",
                sets: 2,
                reps: "20-second hang",
                restSec: 45,
              },
            ],
          },
          {
            label: "Main",
            items: [
              {
                ref: "chin-up",
                refKind: "exercise",
                sets: 3,
                reps: "5-8",
                restSec: 90,
              },
              {
                ref: "one-arm-dumbbell-row",
                refKind: "exercise",
                sets: 3,
                reps: "10 per side",
                restSec: 60,
              },
              {
                ref: "bent-over-reverse-fly",
                refKind: "exercise",
                sets: 3,
                reps: "12",
                restSec: 45,
              },
              {
                ref: "dumbbell-curl",
                refKind: "exercise",
                sets: 3,
                reps: "10-12",
                restSec: 45,
              },
              {
                ref: "dumbbell-shrug",
                refKind: "exercise",
                sets: 2,
                reps: "12-15",
                restSec: 45,
              },
            ],
          },
          {
            label: "Cooldown",
            items: [
              { ref: "childs-pose", refKind: "stretch", holdSec: 45 },
              { ref: "wall-biceps-stretch", refKind: "stretch", holdSec: 30 },
            ],
          },
        ],
      },
      {
        dayLabel: "Day 3 - Legs + Core",
        focus: "Quads, hamstrings, glutes, trunk",
        totalMin: 30,
        blocks: [
          {
            label: "Warm-up",
            items: [
              {
                ref: "worlds-greatest-stretch",
                refKind: "stretch",
                reps: "4 per side",
                holdSec: 5,
              },
              {
                ref: "kneeling-hip-flexor-stretch",
                refKind: "stretch",
                holdSec: 30,
              },
            ],
          },
          {
            label: "Main",
            items: [
              {
                ref: "goblet-squat",
                refKind: "exercise",
                sets: 3,
                reps: "8-10",
                restSec: 90,
              },
              {
                ref: "romanian-deadlift",
                refKind: "exercise",
                sets: 3,
                reps: "10",
                restSec: 75,
              },
              {
                ref: "reverse-lunge",
                refKind: "exercise",
                sets: 3,
                reps: "8 per side",
                restSec: 60,
              },
              {
                ref: "plank",
                refKind: "exercise",
                sets: 3,
                reps: "40-second hold",
                restSec: 45,
              },
              {
                ref: "side-plank",
                refKind: "exercise",
                sets: 2,
                reps: "25-second hold per side",
                restSec: 30,
              },
            ],
          },
          {
            label: "Cooldown",
            items: [
              { ref: "figure-four-stretch", refKind: "stretch", holdSec: 30 },
              {
                ref: "standing-hamstring-stretch",
                refKind: "stretch",
                holdSec: 30,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "minimalist-dumbbell",
    name: "2-Day Minimalist Dumbbell Plan",
    tagline:
      "One pair of dumbbells, two short sessions a week - the least you can do that still works.",
    category: "strength-program",
    daysPerWeek: 2,
    equipment: ["dumbbells"],
    difficulty: "beginner",
    totalMinPerSession: 25,
    targetMuscles: [
      "quads",
      "shoulders",
      "lats",
      "glutes",
      "biceps",
      "triceps",
      "forearms",
      "abs",
    ],
    days: [
      {
        dayLabel: "Day 1 - Full Body A",
        focus: "Squat, press, row",
        totalMin: 25,
        blocks: [
          {
            label: "Warm-up",
            items: [
              { ref: "cat-cow", refKind: "stretch", reps: "8 slow rounds" },
              {
                ref: "kneeling-hip-flexor-stretch",
                refKind: "stretch",
                holdSec: 30,
              },
            ],
          },
          {
            label: "Main",
            items: [
              {
                ref: "bodyweight-squat",
                refKind: "exercise",
                sets: 3,
                reps: "12-15",
                restSec: 60,
              },
              {
                ref: "seated-dumbbell-press",
                refKind: "exercise",
                sets: 3,
                reps: "10",
                restSec: 60,
              },
              {
                ref: "one-arm-dumbbell-row",
                refKind: "exercise",
                sets: 3,
                reps: "10 per side",
                restSec: 60,
              },
              {
                ref: "farmers-carry",
                refKind: "exercise",
                sets: 3,
                reps: "30-second walk",
                restSec: 60,
              },
              {
                ref: "plank",
                refKind: "exercise",
                sets: 2,
                reps: "30-second hold",
                restSec: 30,
              },
            ],
          },
          {
            label: "Cooldown",
            items: [
              { ref: "standing-quad-stretch", refKind: "stretch", holdSec: 30 },
              { ref: "doorway-pec-stretch", refKind: "stretch", holdSec: 30 },
            ],
          },
        ],
      },
      {
        dayLabel: "Day 2 - Full Body B",
        focus: "Hinge, lunge, arms",
        totalMin: 25,
        blocks: [
          {
            label: "Warm-up",
            items: [
              {
                ref: "worlds-greatest-stretch",
                refKind: "stretch",
                reps: "4 per side",
                holdSec: 5,
              },
              {
                ref: "standing-hamstring-stretch",
                refKind: "stretch",
                holdSec: 30,
              },
            ],
          },
          {
            label: "Main",
            items: [
              {
                ref: "glute-bridge",
                refKind: "exercise",
                sets: 3,
                reps: "15",
                restSec: 45,
              },
              {
                ref: "reverse-lunge",
                refKind: "exercise",
                sets: 3,
                reps: "8 per side",
                restSec: 60,
              },
              {
                ref: "dumbbell-curl",
                refKind: "exercise",
                sets: 3,
                reps: "10-12",
                restSec: 45,
              },
              {
                ref: "overhead-triceps-extension",
                refKind: "exercise",
                sets: 3,
                reps: "10-12",
                restSec: 45,
              },
              {
                ref: "suitcase-carry",
                refKind: "exercise",
                sets: 2,
                reps: "30-second walk per side",
                restSec: 45,
              },
            ],
          },
          {
            label: "Cooldown",
            items: [
              { ref: "figure-four-stretch", refKind: "stretch", holdSec: 30 },
              { ref: "seated-forward-fold", refKind: "stretch", holdSec: 40 },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "dad-bod-kickstart",
    name: "Dad-Bod Kickstart",
    tagline:
      "Starting from zero? Three 20-minute bodyweight sessions a week is all it takes to get moving again.",
    category: "strength-program",
    daysPerWeek: 3,
    equipment: ["none"],
    difficulty: "beginner",
    totalMinPerSession: 20,
    targetMuscles: [
      "quads",
      "chest",
      "glutes",
      "abs",
      "lower-back",
      "triceps",
      "obliques",
    ],
    days: [
      {
        dayLabel: "Day 1 - Foundations",
        focus: "The big basics: squat, push, hinge",
        totalMin: 20,
        blocks: [
          {
            label: "Warm-up",
            items: [
              { ref: "cat-cow", refKind: "stretch", reps: "8 slow rounds" },
              {
                ref: "kneeling-hip-flexor-stretch",
                refKind: "stretch",
                holdSec: 30,
              },
            ],
          },
          {
            label: "Main",
            items: [
              {
                ref: "bodyweight-squat",
                refKind: "exercise",
                sets: 3,
                reps: "10-12",
                restSec: 60,
              },
              {
                ref: "push-up",
                refKind: "exercise",
                sets: 3,
                reps: "5-10",
                restSec: 60,
              },
              {
                ref: "glute-bridge",
                refKind: "exercise",
                sets: 3,
                reps: "12",
                restSec: 45,
              },
              {
                ref: "plank",
                refKind: "exercise",
                sets: 2,
                reps: "20-second hold",
                restSec: 45,
              },
            ],
          },
          {
            label: "Cooldown",
            items: [
              { ref: "standing-quad-stretch", refKind: "stretch", holdSec: 30 },
              { ref: "childs-pose", refKind: "stretch", holdSec: 45 },
            ],
          },
        ],
      },
      {
        dayLabel: "Day 2 - Control",
        focus: "Single-leg balance and core control",
        totalMin: 20,
        blocks: [
          {
            label: "Warm-up",
            items: [
              {
                ref: "worlds-greatest-stretch",
                refKind: "stretch",
                reps: "4 per side",
                holdSec: 5,
              },
              { ref: "downward-dog", refKind: "stretch", holdSec: 30 },
            ],
          },
          {
            label: "Main",
            items: [
              {
                ref: "reverse-lunge",
                refKind: "exercise",
                sets: 3,
                reps: "6-8 per side",
                restSec: 60,
              },
              {
                ref: "bench-dip",
                refKind: "exercise",
                sets: 3,
                reps: "8-10",
                restSec: 60,
              },
              {
                ref: "bird-dog",
                refKind: "exercise",
                sets: 2,
                reps: "8 per side",
                restSec: 45,
              },
              {
                ref: "dead-bug",
                refKind: "exercise",
                sets: 2,
                reps: "8 per side",
                restSec: 45,
              },
            ],
          },
          {
            label: "Cooldown",
            items: [
              { ref: "figure-four-stretch", refKind: "stretch", holdSec: 30 },
              { ref: "cobra-stretch", refKind: "stretch", holdSec: 30 },
            ],
          },
        ],
      },
      {
        dayLabel: "Day 3 - Build",
        focus: "A little more volume, front and back",
        totalMin: 20,
        blocks: [
          {
            label: "Warm-up",
            items: [
              { ref: "cat-cow", refKind: "stretch", reps: "8 slow rounds" },
              {
                ref: "standing-hamstring-stretch",
                refKind: "stretch",
                holdSec: 30,
              },
            ],
          },
          {
            label: "Main",
            items: [
              {
                ref: "bodyweight-squat",
                refKind: "exercise",
                sets: 3,
                reps: "12-15",
                restSec: 60,
              },
              {
                ref: "push-up",
                refKind: "exercise",
                sets: 3,
                reps: "6-12",
                restSec: 60,
              },
              {
                ref: "superman-hold",
                refKind: "exercise",
                sets: 2,
                reps: "15-second hold",
                restSec: 45,
              },
              {
                ref: "side-plank",
                refKind: "exercise",
                sets: 2,
                reps: "15-second hold per side",
                restSec: 45,
              },
              {
                ref: "standing-calf-raise",
                refKind: "exercise",
                sets: 2,
                reps: "15",
                restSec: 30,
              },
            ],
          },
          {
            label: "Cooldown",
            items: [
              { ref: "supine-twist", refKind: "stretch", holdSec: 30 },
              { ref: "seated-forward-fold", refKind: "stretch", holdSec: 40 },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "morning-mobility-flow",
    name: "Morning Mobility Flow",
    tagline:
      "Ten gentle minutes to unstick everything before the day gets its hands on you.",
    category: "mobility",
    daysPerWeek: 1,
    equipment: ["none"],
    difficulty: "beginner",
    totalMinPerSession: 10,
    targetMuscles: [
      "lower-back",
      "hip-flexors",
      "hamstrings",
      "upper-back",
      "abs",
      "obliques",
    ],
    days: [
      {
        dayLabel: "The Flow",
        focus: "Head-to-toe morning mobility",
        totalMin: 10,
        blocks: [
          {
            label: "Main",
            items: [
              { ref: "cat-cow", refKind: "stretch", reps: "10 slow rounds" },
              { ref: "cobra-stretch", refKind: "stretch", holdSec: 20 },
              { ref: "downward-dog", refKind: "stretch", holdSec: 30 },
              {
                ref: "worlds-greatest-stretch",
                refKind: "stretch",
                reps: "4 per side",
                holdSec: 5,
              },
              {
                ref: "thread-the-needle",
                refKind: "stretch",
                holdSec: 20,
                reps: "3 per side",
              },
              {
                ref: "side-reach-stretch",
                refKind: "stretch",
                holdSec: 15,
                reps: "2 per side",
              },
            ],
          },
          {
            label: "Cooldown",
            items: [
              { ref: "supine-twist", refKind: "stretch", holdSec: 30 },
              { ref: "childs-pose", refKind: "stretch", holdSec: 45 },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "post-desk-unwind",
    name: "Post-Desk Unwind",
    tagline:
      "Close the laptop, open the hips - twelve minutes to reverse the workday.",
    category: "mobility",
    daysPerWeek: 1,
    equipment: ["none"],
    difficulty: "beginner",
    totalMinPerSession: 12,
    targetMuscles: [
      "neck",
      "hip-flexors",
      "lower-back",
      "chest",
      "upper-back",
      "glutes",
    ],
    days: [
      {
        dayLabel: "The Unwind",
        focus: "Neck, hips, and back release after sitting",
        totalMin: 12,
        blocks: [
          {
            label: "Main",
            items: [
              {
                ref: "upper-trap-stretch",
                refKind: "stretch",
                holdSec: 30,
                reps: "1 per side",
              },
              {
                ref: "levator-scap-stretch",
                refKind: "stretch",
                holdSec: 30,
                reps: "1 per side",
              },
              { ref: "doorway-pec-stretch", refKind: "stretch", holdSec: 30 },
              {
                ref: "thread-the-needle",
                refKind: "stretch",
                holdSec: 20,
                reps: "3 per side",
              },
              {
                ref: "couch-stretch",
                refKind: "stretch",
                holdSec: 45,
                reps: "1 per side",
              },
              {
                ref: "figure-four-stretch",
                refKind: "stretch",
                holdSec: 30,
                reps: "1 per side",
              },
            ],
          },
          {
            label: "Cooldown",
            items: [
              { ref: "cat-cow", refKind: "stretch", reps: "8 slow rounds" },
              { ref: "supine-twist", refKind: "stretch", holdSec: 30 },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "weekend-warrior",
    name: "Weekend Warrior Full Body",
    tagline:
      "Got a spare 40 minutes on Saturday? Empty the tank with one big full-body session.",
    category: "quick",
    daysPerWeek: 1,
    equipment: ["dumbbells", "pull-up-bar"],
    difficulty: "advanced",
    totalMinPerSession: 40,
    targetMuscles: [
      "lats",
      "chest",
      "quads",
      "glutes",
      "hamstrings",
      "abs",
      "forearms",
      "shoulders",
    ],
    days: [
      {
        dayLabel: "The Big One",
        focus: "Heavy full-body strength and carries",
        totalMin: 40,
        blocks: [
          {
            label: "Warm-up",
            items: [
              { ref: "cat-cow", refKind: "stretch", reps: "8 slow rounds" },
              {
                ref: "worlds-greatest-stretch",
                refKind: "stretch",
                reps: "4 per side",
                holdSec: 5,
              },
              {
                ref: "jump-rope-bounce",
                refKind: "exercise",
                sets: 2,
                reps: "45 seconds",
                restSec: 30,
              },
            ],
          },
          {
            label: "Main",
            items: [
              {
                ref: "pull-up",
                refKind: "exercise",
                sets: 4,
                reps: "5-8",
                restSec: 90,
              },
              {
                ref: "incline-dumbbell-press",
                refKind: "exercise",
                sets: 4,
                reps: "8",
                restSec: 90,
              },
              {
                ref: "bulgarian-split-squat",
                refKind: "exercise",
                sets: 3,
                reps: "8 per side",
                restSec: 90,
              },
              {
                ref: "romanian-deadlift",
                refKind: "exercise",
                sets: 3,
                reps: "8-10",
                restSec: 90,
              },
              {
                ref: "hanging-knee-raise",
                refKind: "exercise",
                sets: 3,
                reps: "10-12",
                restSec: 60,
              },
              {
                ref: "farmers-carry",
                refKind: "exercise",
                sets: 3,
                reps: "40-second walk",
                restSec: 60,
              },
            ],
          },
          {
            label: "Cooldown",
            items: [
              { ref: "pigeon-stretch", refKind: "stretch", holdSec: 45 },
              { ref: "doorway-pec-stretch", refKind: "stretch", holdSec: 30 },
              {
                ref: "standing-hamstring-stretch",
                refKind: "stretch",
                holdSec: 30,
              },
            ],
          },
        ],
      },
    ],
  },
];
