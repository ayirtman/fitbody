import type { MuscleGroup } from "@/lib/types";

export const muscles: MuscleGroup[] = [
  {
    id: "chest",
    name: "Chest (Pectorals)",
    shortName: "Chest",
    view: "front",
    blurb:
      "The pushing engine - every door held open, every kid pressed overhead. A strong chest makes daily pushing effortless.",
  },
  {
    id: "shoulders",
    name: "Shoulders (Deltoids)",
    shortName: "Shoulders",
    view: "both",
    blurb:
      "Kids on shoulders, bags in the overhead bin. Healthy delts carry the load and keep your posture tall.",
  },
  {
    id: "biceps",
    name: "Biceps",
    shortName: "Biceps",
    view: "front",
    blurb:
      "Grocery haulers and car-seat lifters. Biceps do the carrying so your back doesn't have to.",
  },
  {
    id: "triceps",
    name: "Triceps",
    shortName: "Triceps",
    view: "back",
    blurb:
      "Two-thirds of your arm and all of your push-back-up-off-the-floor strength. Don't skip them.",
  },
  {
    id: "forearms",
    name: "Forearms & Grip",
    shortName: "Forearms",
    view: "both",
    blurb:
      "Grip is dad currency: jar lids, monkey bars, wriggling toddlers. Strong forearms make everything easier to hold.",
  },
  {
    id: "abs",
    name: "Abs (Rectus Abdominis)",
    shortName: "Abs",
    view: "front",
    blurb:
      "Your built-in weight belt. A trained core protects your spine every time you lift something - or someone.",
  },
  {
    id: "obliques",
    name: "Obliques",
    shortName: "Obliques",
    view: "both",
    blurb:
      "The twist-and-carry muscles. Obliques stabilize you when life loads one side - a kid on the hip, a bag on one shoulder.",
  },
  {
    id: "neck",
    name: "Neck",
    shortName: "Neck",
    view: "both",
    blurb:
      "Eight hours of screens pull your head forward a little more each year. A resilient neck pulls it back.",
  },
  {
    id: "hip-flexors",
    name: "Hip Flexors",
    shortName: "Hip Flexors",
    view: "front",
    blurb:
      "Sitting shortens them; they return the favor by tugging your lower back. Keep them long and strong.",
  },
  {
    id: "quads",
    name: "Quadriceps",
    shortName: "Quads",
    view: "front",
    blurb:
      "Stairs, squats, standing up with a sleeping kid in your arms. Quads are your everyday horsepower.",
  },
  {
    id: "calves",
    name: "Calves",
    shortName: "Calves",
    view: "both",
    blurb:
      "The shock absorbers under every step, jump and playground sprint. Springy calves keep knees and ankles happy.",
  },
  {
    id: "upper-back",
    name: "Upper Back & Traps",
    shortName: "Upper Back",
    view: "back",
    blurb:
      "The antidote to desk hunch. A strong upper back pins your shoulders where they belong.",
  },
  {
    id: "lats",
    name: "Lats",
    shortName: "Lats",
    view: "back",
    blurb:
      "Your pulling powerhouse - lifting from the floor, rowing, hoisting kids out of the bath. Wide lats, easy life.",
  },
  {
    id: "lower-back",
    name: "Lower Back",
    shortName: "Lower Back",
    view: "back",
    blurb:
      "The most complained-about muscle group in fatherhood. Train it gently and often, and it stops complaining.",
  },
  {
    id: "glutes",
    name: "Glutes",
    shortName: "Glutes",
    view: "back",
    blurb:
      "The biggest engine you own - and the one sitting switches off. Wake the glutes and the lower back relaxes.",
  },
  {
    id: "hamstrings",
    name: "Hamstrings",
    shortName: "Hamstrings",
    view: "back",
    blurb:
      "Tight hamstrings tilt your pelvis and nag your back. Strong, supple hammies power every hinge and sprint.",
  },
];

export const muscleById = new Map(muscles.map((m) => [m.id, m]));
