import type { JointMap, PoseSet } from "@/lib/pose-types";
import { HANGING, PLANK, SEATED, STANDING, SUPINE, j } from "./reference";

/**
 * Pose sets for exercises 1–24 (push-up … towel-resisted-extension).
 * push-up and dead-hang are lead-authored exemplars - match their quality.
 */

/** Reclined on a stepped bench (seat + backrest boxes), feet planted right. */
const INCLINE_BASE: JointMap = {
  head: [59, 92],
  neck: [65, 106],
  chest: [73, 124],
  hip: [84, 148],
  elbowF: [75, 127],
  wristF: [83, 109],
  elbowB: [72, 127],
  wristB: [80, 109],
  kneeF: [110, 144],
  ankleF: [115, 166],
  toeF: [127, 168],
  kneeB: [107, 144],
  ankleB: [112, 166],
  toeB: [124, 168],
};

/** Standing split stance for cable/band presses, facing right. */
const FLY_STANCE: JointMap = {
  head: [100, 56],
  neck: [100, 71],
  chest: [100, 91],
  hip: [100, 117],
  elbowF: [77, 76],
  wristF: [58, 80],
  elbowB: [74, 76],
  wristB: [55, 80],
  kneeF: [110, 141],
  ankleF: [116, 163],
  toeF: [128, 165],
  kneeB: [91, 141],
  ankleB: [83, 162],
  toeB: [94, 166],
};

/** Seated tall on a box, feet planted ahead, facing right. */
const BOX_SEAT: JointMap = {
  head: [94, 75],
  neck: [94, 90],
  chest: [94, 110],
  hip: [94, 136],
  elbowF: [100, 112],
  wristF: [103, 93],
  elbowB: [97, 112],
  wristB: [100, 93],
  kneeF: [119, 143],
  ankleF: [122, 166],
  toeF: [134, 168],
  kneeB: [116, 143],
  ankleB: [119, 166],
  toeB: [131, 168],
};

/** FRONT view standing tall - F = right limb, B = left. */
const FRONT_STAND: JointMap = {
  head: [100, 56],
  neck: [100, 71],
  chest: [100, 91],
  hip: [100, 117],
  elbowF: [108, 93],
  wristF: [112, 112],
  elbowB: [92, 93],
  wristB: [88, 112],
  kneeF: [104, 143],
  ankleF: [105, 166],
  toeF: [108, 169],
  kneeB: [96, 143],
  ankleB: [95, 166],
  toeB: [92, 169],
};

/** Hanging from the bar seen from the side, facing right. */
const SIDE_HANG: JointMap = {
  head: [104, 54],
  neck: [100, 68],
  chest: [100, 88],
  hip: [100, 114],
  elbowF: [101, 45],
  wristF: [102, 26],
  elbowB: [98, 45],
  wristB: [99, 26],
  kneeF: [101, 139],
  ankleF: [102, 161],
  toeF: [104, 169],
  kneeB: [98, 139],
  ankleB: [99, 161],
  toeB: [101, 169],
};

/** Forearm plank, head right, elbows under shoulders. */
const FOREARM_PLANK: JointMap = {
  head: [140, 136],
  neck: [126, 141],
  chest: [107, 147],
  hip: [82, 155],
  elbowF: [128, 165],
  wristF: [148, 166],
  elbowB: [125, 165],
  wristB: [145, 166],
  kneeF: [57, 162],
  ankleF: [35, 158],
  toeF: [31, 169],
  kneeB: [54, 162],
  ankleB: [32, 158],
  toeB: [28, 169],
};

/** Side plank on the left forearm, feet stacked right, top arm up. */
const SIDE_PLANK_HOLD: JointMap = {
  head: [64, 128],
  neck: [68, 142],
  chest: [87, 148],
  hip: [112, 155],
  elbowF: [70, 165],
  wristF: [88, 166],
  elbowB: [72, 119],
  wristB: [74, 99],
  kneeF: [137, 161],
  ankleF: [159, 165],
  toeF: [171, 163],
  kneeB: [135, 159],
  ankleB: [157, 163],
  toeB: [169, 161],
};

/** Crunched on the back, hands behind the head, legs mid-pedal. */
const BICYCLE_BASE: JointMap = {
  head: [65, 146],
  neck: [78, 152],
  chest: [95, 159],
  hip: [121, 161],
  elbowF: [72, 133],
  wristF: [57, 144],
  elbowB: [69, 133],
  wristB: [54, 144],
  kneeF: [143, 148],
  ankleF: [163, 158],
  toeF: [174, 158],
  kneeB: [140, 148],
  ankleB: [160, 158],
  toeB: [171, 158],
};

export const exercisePosesA: PoseSet[] = [
  {
    slug: "push-up",
    loop: "pingPong",
    highlight: ["armF", "armB"],
    frames: [
      {
        name: "top",
        joints: PLANK,
        durationMs: 900,
        holdMs: 250,
      },
      {
        // Elbows bend back, whole body line drops toward the floor as one plank
        name: "bottom",
        joints: j(PLANK, {
          head: [147, 133],
          neck: [133, 138],
          chest: [113, 143],
          hip: [88, 149],
          elbowF: [117, 158],
          elbowB: [114, 158],
          kneeF: [64, 155],
          ankleF: [45, 158],
          kneeB: [61, 155],
          ankleB: [42, 158],
        }),
        durationMs: 900,
        holdMs: 150,
      },
    ],
  },
  {
    slug: "incline-dumbbell-press",
    loop: "pingPong",
    highlight: ["armF", "armB"],
    props: [
      { kind: "box", x: 62, y: 150, w: 30, h: 20 },
      { kind: "box", x: 42, y: 118, w: 20, h: 52 },
      { kind: "dumbbell", at: ["wristF", "wristB"] },
    ],
    frames: [
      {
        // Bells racked at the shoulders, torso reclined on the bench
        name: "bottom",
        joints: INCLINE_BASE,
        durationMs: 900,
        holdMs: 150,
      },
      {
        // Press up and slightly back, perpendicular to the reclined torso
        name: "top",
        joints: j(INCLINE_BASE, {
          elbowF: [87, 96],
          wristF: [105, 88],
          elbowB: [84, 96],
          wristB: [102, 88],
        }),
        durationMs: 900,
        holdMs: 250,
      },
    ],
  },
  {
    slug: "banded-chest-fly",
    loop: "pingPong",
    highlight: ["armF", "armB"],
    restFrame: 1,
    props: [{ kind: "band", from: "wristF", anchor: [8, 84] }],
    frames: [
      {
        // Arm swept behind, band stretched
        name: "open",
        joints: FLY_STANCE,
        durationMs: 900,
        holdMs: 150,
      },
      {
        // Long arc to the front - arms squeeze together ahead of the chest
        name: "squeeze",
        joints: j(FLY_STANCE, {
          elbowF: [123, 76],
          wristF: [142, 80],
          elbowB: [120, 76],
          wristB: [139, 80],
        }),
        durationMs: 900,
        holdMs: 250,
      },
    ],
  },
  {
    slug: "pike-push-up",
    loop: "pingPong",
    highlight: ["armF", "armB"],
    frames: [
      {
        // Inverted V: hips high, hands and toes planted
        name: "top",
        joints: {
          head: [117, 138],
          neck: [122, 124],
          chest: [103, 117],
          hip: [79, 108],
          elbowF: [128, 147],
          wristF: [133, 166],
          elbowB: [125, 147],
          wristB: [130, 166],
          kneeF: [74, 133],
          ankleF: [69, 156],
          toeF: [66, 167],
          kneeB: [71, 133],
          ankleB: [66, 156],
          toeB: [63, 167],
        },
        durationMs: 900,
        holdMs: 200,
      },
      {
        // Crown of the head lowers between the hands, elbows bend back
        name: "bottom",
        joints: {
          head: [113, 155],
          neck: [117, 141],
          chest: [102, 127],
          hip: [84, 110],
          elbowF: [113, 164],
          wristF: [133, 166],
          elbowB: [110, 164],
          wristB: [130, 166],
          kneeF: [76, 135],
          ankleF: [69, 156],
          toeF: [66, 167],
          kneeB: [73, 135],
          ankleB: [66, 156],
          toeB: [63, 167],
        },
        durationMs: 900,
        holdMs: 150,
      },
    ],
  },
  {
    slug: "seated-dumbbell-press",
    loop: "pingPong",
    highlight: ["armF", "armB"],
    props: [
      { kind: "box", x: 66, y: 140, w: 32, h: 30 },
      { kind: "dumbbell", at: ["wristF", "wristB"] },
    ],
    frames: [
      {
        // Bells racked at the shoulders
        name: "rack",
        joints: BOX_SEAT,
        durationMs: 500,
        holdMs: 150,
      },
      {
        // Mid-press: elbows travel forward under the bells
        name: "drive",
        joints: j(BOX_SEAT, {
          elbowF: [116, 88],
          wristF: [119, 69],
          elbowB: [113, 88],
          wristB: [116, 69],
        }),
        durationMs: 500,
      },
      {
        // Arms locked out overhead
        name: "lockout",
        joints: j(BOX_SEAT, {
          elbowF: [97, 66],
          wristF: [99, 46],
          elbowB: [94, 66],
          wristB: [96, 46],
        }),
        durationMs: 500,
        holdMs: 250,
      },
    ],
  },
  {
    // FRONT view - the sideways arc is the whole story
    slug: "lateral-raise",
    loop: "pingPong",
    highlight: ["armF", "armB"],
    props: [{ kind: "dumbbell", at: ["wristF", "wristB"] }],
    frames: [
      {
        name: "down",
        joints: FRONT_STAND,
        durationMs: 1000,
        holdMs: 150,
      },
      {
        // Arms float out to shoulder height, wrists just below the elbows
        name: "up",
        joints: j(FRONT_STAND, {
          elbowF: [124, 73],
          wristF: [144, 76],
          elbowB: [76, 73],
          wristB: [56, 76],
        }),
        durationMs: 1000,
        holdMs: 250,
      },
    ],
  },
  {
    // FRONT view like dead-hang; chin finishes above the bar
    slug: "chin-up",
    loop: "pingPong",
    highlight: ["armF", "armB"],
    props: [{ kind: "bar", y: 26 }],
    frames: [
      {
        name: "hang",
        joints: HANGING,
        durationMs: 1000,
        holdMs: 150,
      },
      {
        // Elbows drive down and flare as the body rises to the bar
        name: "top",
        joints: j(HANGING, {
          head: [100, 34],
          neck: [100, 49],
          chest: [100, 69],
          hip: [100, 95],
          elbowF: [122, 43],
          elbowB: [78, 43],
          kneeF: [102, 121],
          ankleF: [103, 144],
          toeF: [105, 152],
          kneeB: [98, 121],
          ankleB: [97, 144],
          toeB: [95, 152],
        }),
        durationMs: 1000,
        holdMs: 300,
      },
    ],
  },
  {
    slug: "dumbbell-curl",
    loop: "pingPong",
    highlight: ["armF", "armB"],
    props: [{ kind: "dumbbell", at: ["wristF", "wristB"] }],
    frames: [
      {
        name: "down",
        joints: STANDING,
        durationMs: 450,
        holdMs: 150,
      },
      {
        // Forearm swings through horizontal - elbows stay pinned to the ribs
        name: "mid",
        joints: j(STANDING, {
          wristF: [122, 93],
          wristB: [119, 93],
        }),
        durationMs: 450,
      },
      {
        name: "up",
        joints: j(STANDING, {
          wristF: [110, 77],
          wristB: [107, 77],
        }),
        durationMs: 450,
        holdMs: 200,
      },
    ],
  },
  {
    slug: "band-hammer-curl",
    loop: "pingPong",
    highlight: ["armF", "armB"],
    props: [{ kind: "band", from: "wristF", anchor: [103, 169] }],
    frames: [
      {
        // Band pinned under the feet, arms long
        name: "down",
        joints: STANDING,
        durationMs: 500,
        holdMs: 150,
      },
      {
        name: "mid",
        joints: j(STANDING, {
          wristF: [122, 93],
          wristB: [119, 93],
        }),
        durationMs: 500,
      },
      {
        name: "up",
        joints: j(STANDING, {
          wristF: [110, 77],
          wristB: [107, 77],
        }),
        durationMs: 500,
        holdMs: 200,
      },
    ],
  },
  {
    slug: "diamond-push-up",
    loop: "pingPong",
    highlight: ["armF", "armB"],
    frames: [
      {
        // Hands together under the chest, elbows tucked
        name: "top",
        joints: j(PLANK, {
          elbowF: [128, 146],
          wristF: [127, 166],
          elbowB: [125, 146],
          wristB: [124, 166],
        }),
        durationMs: 900,
        holdMs: 250,
      },
      {
        // Same plank drop as a push-up but elbows stay glued to the ribs
        name: "bottom",
        joints: j(PLANK, {
          head: [147, 133],
          neck: [133, 138],
          chest: [113, 143],
          hip: [88, 149],
          elbowF: [112, 153],
          wristF: [127, 166],
          elbowB: [109, 153],
          wristB: [124, 166],
          kneeF: [64, 155],
          ankleF: [45, 158],
          kneeB: [61, 155],
          ankleB: [42, 158],
        }),
        durationMs: 900,
        holdMs: 150,
      },
    ],
  },
  {
    slug: "bench-dip",
    loop: "pingPong",
    highlight: ["armF", "armB"],
    props: [{ kind: "box", x: 30, y: 138, w: 34, h: 32 }],
    frames: [
      {
        // Hands on the bench edge behind, hips floated in front, legs long
        name: "top",
        joints: {
          head: [65, 79],
          neck: [66, 94],
          chest: [68, 114],
          hip: [72, 139],
          elbowF: [65, 118],
          wristF: [64, 138],
          elbowB: [62, 118],
          wristB: [61, 138],
          kneeF: [96, 144],
          ankleF: [100, 166],
          toeF: [112, 168],
          kneeB: [93, 144],
          ankleB: [97, 166],
          toeB: [109, 168],
        },
        durationMs: 900,
        holdMs: 200,
      },
      {
        // Hips sink straight down, elbows bend behind the torso
        name: "bottom",
        joints: {
          head: [66, 97],
          neck: [67, 112],
          chest: [69, 132],
          hip: [72, 155],
          elbowF: [48, 126],
          wristF: [64, 138],
          elbowB: [45, 126],
          wristB: [61, 138],
          kneeF: [94, 145],
          ankleF: [100, 166],
          toeF: [112, 168],
          kneeB: [91, 145],
          ankleB: [97, 166],
          toeB: [109, 168],
        },
        durationMs: 900,
        holdMs: 150,
      },
    ],
  },
  {
    slug: "overhead-triceps-extension",
    loop: "pingPong",
    highlight: ["armF", "armB"],
    props: [{ kind: "dumbbell", at: ["wristF"] }],
    frames: [
      {
        // Bell locked out overhead, elbows fixed by the ears
        name: "lockout",
        joints: j(STANDING, {
          elbowF: [103, 48],
          wristF: [105, 28],
          elbowB: [100, 48],
          wristB: [102, 28],
        }),
        durationMs: 500,
        holdMs: 200,
      },
      {
        // Forearm hinges back - only the elbow joint moves
        name: "mid",
        joints: j(STANDING, {
          elbowF: [103, 48],
          wristF: [89, 34],
          elbowB: [100, 48],
          wristB: [86, 34],
        }),
        durationMs: 500,
      },
      {
        name: "stretch",
        joints: j(STANDING, {
          elbowF: [103, 48],
          wristF: [86, 60],
          elbowB: [100, 48],
          wristB: [83, 60],
        }),
        durationMs: 500,
        holdMs: 250,
      },
    ],
  },
  {
    slug: "farmers-carry",
    loop: "pingPong",
    highlight: ["armF", "armB"],
    props: [{ kind: "dumbbell", at: ["wristF", "wristB"] }],
    frames: [
      {
        // March in place under load: near foot lifts
        name: "step-a",
        joints: j(STANDING, {
          kneeF: [107, 142],
          ankleF: [105, 164],
          toeF: [117, 167],
        }),
        durationMs: 600,
        holdMs: 100,
      },
      {
        // Feet swap - far foot lifts
        name: "step-b",
        joints: j(STANDING, {
          kneeB: [104, 142],
          ankleB: [102, 164],
          toeB: [114, 167],
        }),
        durationMs: 600,
        holdMs: 100,
      },
    ],
  },
  {
    slug: "towel-wring",
    loop: "pingPong",
    highlight: ["armF", "armB"],
    frames: [
      {
        // Hands stacked on the towel in front of the chest, twisting opposite ways
        name: "wring-a",
        joints: j(STANDING, {
          elbowF: [110, 92],
          wristF: [124, 84],
          elbowB: [107, 92],
          wristB: [124, 92],
        }),
        durationMs: 700,
        holdMs: 400,
      },
      {
        // Grip reverses - wrists swap heights
        name: "wring-b",
        joints: j(STANDING, {
          elbowF: [110, 92],
          wristF: [124, 92],
          elbowB: [107, 92],
          wristB: [124, 84],
        }),
        durationMs: 700,
        holdMs: 400,
      },
    ],
  },
  {
    // Forearm plank per the coaching steps
    slug: "plank",
    loop: "pingPong",
    highlight: ["spine"],
    frames: [
      {
        name: "hold",
        joints: FOREARM_PLANK,
        durationMs: 1300,
        holdMs: 500,
      },
      {
        // Breathing sway - hips float a touch, line stays rigid
        name: "breathe",
        joints: j(FOREARM_PLANK, {
          chest: [107, 145],
          hip: [82, 152],
          kneeF: [57, 160],
          kneeB: [54, 160],
        }),
        durationMs: 1300,
        holdMs: 500,
      },
    ],
  },
  {
    slug: "dead-bug",
    loop: "pingPong",
    highlight: ["spine"],
    frames: [
      {
        // Arms to the ceiling, knees stacked over hips at 90/90
        name: "start",
        joints: j(SUPINE, {
          elbowF: [79, 138],
          wristF: [81, 118],
          elbowB: [76, 138],
          wristB: [78, 118],
          kneeF: [124, 136],
          ankleF: [147, 138],
          toeF: [158, 141],
          kneeB: [121, 136],
          ankleB: [144, 138],
          toeB: [155, 141],
        }),
        durationMs: 1000,
        holdMs: 250,
      },
      {
        // Opposite arm and leg reach long and low; the other side holds
        name: "reach",
        joints: j(SUPINE, {
          elbowF: [52, 158],
          wristF: [32, 156],
          elbowB: [76, 138],
          wristB: [78, 118],
          kneeF: [146, 152],
          ankleF: [169, 148],
          toeF: [180, 145],
          kneeB: [121, 136],
          ankleB: [144, 138],
          toeB: [155, 141],
        }),
        durationMs: 1000,
        holdMs: 250,
      },
    ],
  },
  {
    // Side view hang - the knees-forward tuck reads clearly in profile
    slug: "hanging-knee-raise",
    loop: "pingPong",
    highlight: ["spine"],
    props: [{ kind: "bar", y: 26 }],
    frames: [
      {
        name: "hang",
        joints: SIDE_HANG,
        durationMs: 500,
        holdMs: 200,
      },
      {
        // Knees drive forward to hip height
        name: "mid",
        joints: j(SIDE_HANG, {
          hip: [100, 113],
          kneeF: [124, 115],
          ankleF: [124, 138],
          toeF: [126, 146],
          kneeB: [121, 115],
          ankleB: [121, 138],
          toeB: [123, 146],
        }),
        durationMs: 500,
      },
      {
        // Pelvis curls under as the knees keep rising
        name: "top",
        joints: j(SIDE_HANG, {
          hip: [99, 110],
          kneeF: [122, 99],
          ankleF: [122, 122],
          toeF: [124, 130],
          kneeB: [119, 99],
          ankleB: [119, 122],
          toeB: [121, 130],
        }),
        durationMs: 500,
        holdMs: 300,
      },
    ],
  },
  {
    slug: "side-plank",
    loop: "pingPong",
    highlight: ["spine"],
    frames: [
      {
        // Propped on the forearm, feet stacked, top arm to the ceiling
        name: "hold",
        joints: SIDE_PLANK_HOLD,
        durationMs: 1300,
        holdMs: 500,
      },
      {
        // Hips press a touch higher - the whole line lifts
        name: "lift",
        joints: j(SIDE_PLANK_HOLD, {
          chest: [87, 146],
          hip: [112, 151],
          kneeF: [137, 158],
          kneeB: [135, 156],
        }),
        durationMs: 1300,
        holdMs: 500,
      },
    ],
  },
  {
    // FRONT view - the one-sided load is the point
    slug: "suitcase-carry",
    loop: "pingPong",
    highlight: ["spine"],
    props: [{ kind: "dumbbell", at: ["wristF"] }],
    frames: [
      {
        // March in place: loaded-side foot lifts, torso stays dead level
        name: "step-a",
        joints: j(FRONT_STAND, {
          elbowB: [91, 92],
          wristB: [85, 109],
          kneeF: [104, 141],
          ankleF: [105, 162],
          toeF: [108, 165],
        }),
        durationMs: 600,
        holdMs: 100,
      },
      {
        name: "step-b",
        joints: j(FRONT_STAND, {
          elbowB: [91, 92],
          wristB: [85, 109],
          kneeB: [96, 141],
          ankleB: [95, 162],
          toeB: [92, 165],
        }),
        durationMs: 600,
        holdMs: 100,
      },
    ],
  },
  {
    // Continuous pedal - three frames around the cycle
    slug: "bicycle-crunch",
    loop: "cycle",
    highlight: ["spine"],
    frames: [
      {
        // Near knee tucked, far leg long
        name: "tuck-f",
        joints: j(BICYCLE_BASE, {
          kneeF: [135, 140],
          ankleF: [152, 155],
          toeF: [163, 158],
          kneeB: [146, 155],
          ankleB: [168, 148],
          toeB: [179, 145],
        }),
        durationMs: 500,
        easing: "linear",
      },
      {
        // Legs pass each other mid-pedal
        name: "pass",
        joints: BICYCLE_BASE,
        durationMs: 500,
        easing: "linear",
      },
      {
        // Far knee tucked, near leg long
        name: "tuck-b",
        joints: j(BICYCLE_BASE, {
          kneeF: [146, 155],
          ankleF: [168, 148],
          toeF: [179, 145],
          kneeB: [132, 140],
          ankleB: [149, 155],
          toeB: [160, 158],
        }),
        durationMs: 500,
        easing: "linear",
      },
    ],
  },
  {
    slug: "four-way-neck-isometrics",
    loop: "pingPong",
    highlight: ["head"],
    frames: [
      {
        // Palm braced on the forehead - neck pushes, nothing moves
        name: "front",
        joints: j(STANDING, {
          elbowF: [120, 71],
          wristF: [108, 55],
        }),
        durationMs: 500,
        holdMs: 800,
      },
      {
        // Hand passes over the crown
        name: "over",
        joints: j(STANDING, {
          elbowF: [112, 60],
          wristF: [100, 44],
        }),
        durationMs: 500,
      },
      {
        // Palm braced on the back of the head
        name: "back",
        joints: j(STANDING, {
          elbowF: [110, 57],
          wristF: [92, 53],
        }),
        durationMs: 500,
        holdMs: 800,
      },
    ],
  },
  {
    slug: "supine-neck-curl",
    loop: "pingPong",
    highlight: ["head"],
    frames: [
      {
        name: "rest",
        joints: SUPINE,
        durationMs: 700,
        holdMs: 150,
      },
      {
        // Chin tucks and the head floats just off the floor
        name: "curl",
        joints: j(SUPINE, { head: [62, 151] }),
        durationMs: 700,
        holdMs: 400,
      },
    ],
  },
  {
    // Band drawn behind the head stands in for the towel
    slug: "towel-resisted-extension",
    loop: "pingPong",
    highlight: ["head"],
    props: [{ kind: "band", from: "wristF", anchor: [76, 102] }],
    frames: [
      {
        // Seated tall, towel held taut at face height
        name: "set",
        joints: j(SEATED, {
          elbowF: [104, 112],
          wristF: [100, 96],
          elbowB: [101, 112],
          wristB: [97, 96],
        }),
        durationMs: 600,
        holdMs: 200,
      },
      {
        // Head presses straight back into the towel while the hands resist
        name: "press",
        joints: j(SEATED, {
          head: [81, 102],
          elbowF: [104, 112],
          wristF: [102, 96],
          elbowB: [101, 112],
          wristB: [99, 96],
        }),
        durationMs: 600,
        holdMs: 700,
      },
    ],
  },
  {
    slug: "dead-hang",
    loop: "pingPong",
    highlight: ["armF", "armB"],
    props: [{ kind: "bar", y: 26 }],
    frames: [
      {
        name: "hang",
        joints: HANGING,
        durationMs: 1400,
        holdMs: 500,
      },
      {
        // Subtle breathing sway - hips and legs drift right, grip stays fixed
        name: "sway",
        joints: j(HANGING, {
          chest: [101, 87],
          hip: [102, 113],
          kneeF: [105, 139],
          ankleF: [107, 161],
          toeF: [109, 169],
          kneeB: [101, 139],
          ankleB: [101, 161],
          toeB: [99, 169],
        }),
        durationMs: 1400,
        holdMs: 500,
      },
    ],
  },
];
