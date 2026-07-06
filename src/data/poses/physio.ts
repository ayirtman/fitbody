import type { JointMap, PoseSet } from "@/lib/pose-types";
import { PLANK, STANDING, SUPINE, j } from "./reference";

/**
 * Pose sets for all 18 physio moves (pelvic-tilt … wrist-eccentric-extension).
 * Physio tempo is deliberately SLOW - controlled, small-range motion.
 */

/** Lying on back, hands tucked under the lumbar arch, one leg straight. */
const MCGILL_BASE: JointMap = {
  head: [60, 159],
  neck: [75, 161],
  chest: [95, 161],
  hip: [121, 161],
  elbowF: [98, 164],
  wristF: [117, 166],
  elbowB: [95, 164],
  wristB: [114, 166],
  kneeF: [140, 143],
  ankleF: [147, 165],
  toeF: [159, 165],
  kneeB: [147, 162],
  ankleB: [170, 163],
  toeB: [182, 161],
};

/** On back, both knees folded over the chest, hands holding the shins. */
const KNEE_HUG: JointMap = {
  head: [60, 159],
  neck: [75, 161],
  chest: [95, 161],
  hip: [121, 161],
  elbowF: [89, 142],
  wristF: [108, 144],
  elbowB: [86, 142],
  wristB: [105, 144],
  kneeF: [103, 142],
  ankleF: [125, 150],
  toeF: [136, 154],
  kneeB: [102, 143],
  ankleB: [122, 150],
  toeB: [133, 154],
};

/** Front view, standing tall at x=85 with back against a wall behind. */
const WALL_STAND: JointMap = {
  head: [85, 56],
  neck: [85, 71],
  chest: [85, 91],
  hip: [85, 117],
  elbowF: [109, 73],
  wristF: [111, 53],
  elbowB: [61, 73],
  wristB: [59, 53],
  kneeF: [88, 143],
  ankleF: [88, 166],
  toeF: [90, 173],
  kneeB: [82, 143],
  ankleB: [82, 166],
  toeB: [80, 173],
};

/** Face down, head to the right, arms reaching overhead along the floor. */
const PRONE_Y: JointMap = {
  head: [131, 158],
  neck: [116, 162],
  chest: [96, 163],
  hip: [70, 163],
  elbowF: [139, 157],
  wristF: [159, 153],
  elbowB: [137, 158],
  wristB: [157, 154],
  kneeF: [44, 164],
  ankleF: [21, 165],
  toeF: [9, 167],
  kneeB: [42, 163],
  ankleB: [19, 164],
  toeB: [7, 166],
};

/** Sitting tall on the floor, hands resting at the sides (front view). */
const NINETY_TORSO = {
  head: [100, 102],
  neck: [100, 117],
  chest: [100, 137],
  hip: [100, 163],
  elbowF: [104, 140],
  wristF: [106, 159],
  elbowB: [96, 140],
  wristB: [94, 159],
} satisfies Partial<JointMap>;

/** Deep supported squat, hands gripping a band anchored ahead at chest height. */
const DEEP_SQUAT: JointMap = {
  head: [95, 94],
  neck: [88, 107],
  chest: [82, 126],
  hip: [76, 150],
  elbowF: [110, 118],
  wristF: [129, 113],
  elbowB: [107, 119],
  wristB: [126, 114],
  kneeF: [102, 148],
  ankleF: [88, 166],
  toeF: [100, 168],
  kneeB: [99, 148],
  ankleB: [85, 166],
  toeB: [97, 168],
};

/** Standing tall on a low box, free (far) leg hanging off the front edge. */
const STEP_TOP: JointMap = {
  head: [102, 38],
  neck: [102, 53],
  chest: [102, 73],
  hip: [102, 99],
  elbowF: [104, 77],
  wristF: [105, 97],
  elbowB: [99, 77],
  wristB: [100, 97],
  kneeF: [101, 125],
  ankleF: [100, 148],
  toeF: [112, 150],
  kneeB: [107, 124],
  ankleB: [113, 145],
  toeB: [119, 154],
};

/** Back sliding on a wall behind, knees bent to a shallow sit. */
const WALL_SIT: JointMap = {
  head: [86, 67],
  neck: [85, 82],
  chest: [85, 102],
  hip: [85, 128],
  elbowF: [88, 105],
  wristF: [89, 125],
  elbowB: [85, 105],
  wristB: [86, 125],
  kneeF: [106, 143],
  ankleF: [104, 166],
  toeF: [116, 168],
  kneeB: [103, 143],
  ankleB: [101, 166],
  toeB: [113, 168],
};

/** Hinged forward over a table, far hand supporting, near arm dangling. */
const PENDULUM_BASE: JointMap = {
  head: [125, 96],
  neck: [111, 102],
  chest: [93, 109],
  hip: [70, 118],
  elbowF: [110, 126],
  wristF: [109, 147],
  elbowB: [123, 122],
  wristB: [128, 141],
  kneeF: [72, 144],
  ankleF: [71, 166],
  toeF: [83, 168],
  kneeB: [69, 144],
  ankleB: [68, 166],
  toeB: [80, 168],
};

/** Front view, arm out to the side at shoulder height, elbow bent (tray carry). */
const NERVE_GLIDE_BASE: JointMap = {
  head: [80, 56],
  neck: [80, 71],
  chest: [80, 91],
  hip: [80, 117],
  elbowF: [104, 73],
  wristF: [102, 53],
  elbowB: [76, 95],
  wristB: [75, 115],
  kneeF: [82, 143],
  ankleF: [83, 166],
  toeF: [85, 173],
  kneeB: [78, 143],
  ankleB: [77, 166],
  toeB: [75, 173],
};

/** Seated on a bench, torso hinged forward, forearm resting along the thigh. */
const WRIST_SEAT: JointMap = {
  head: [105, 88],
  neck: [95, 99],
  chest: [88, 117],
  hip: [80, 142],
  elbowF: [103, 120],
  wristF: [119, 132],
  elbowB: [99, 121],
  wristB: [115, 129],
  kneeF: [106, 144],
  ankleF: [104, 167],
  toeF: [116, 169],
  kneeB: [103, 144],
  ankleB: [101, 167],
  toeB: [113, 169],
};

export const physioPoses: PoseSet[] = [
  {
    slug: "pelvic-tilt",
    loop: "pingPong",
    highlight: ["spine"],
    frames: [
      {
        // Natural lumbar arch, knees bent, feet flat
        name: "neutral",
        joints: SUPINE,
        durationMs: 2000,
        holdMs: 500,
      },
      {
        // Tailbone tucks: pelvis rocks up and the low back flattens down
        name: "tilt",
        joints: j(SUPINE, {
          hip: [118, 155],
          kneeF: [138, 142],
          kneeB: [136, 142],
        }),
        durationMs: 2000,
        holdMs: 600,
      },
    ],
  },
  {
    slug: "mcgill-curl-up",
    loop: "pingPong",
    highlight: ["spine"],
    frames: [
      {
        // Hands under the arch, one knee bent, one leg long
        name: "rest",
        joints: MCGILL_BASE,
        durationMs: 2000,
        holdMs: 400,
      },
      {
        // Head and shoulders rise a few centimeters as one stiff unit
        name: "lift",
        joints: j(MCGILL_BASE, {
          head: [63, 151],
          neck: [76, 158],
        }),
        durationMs: 2000,
        holdMs: 800,
      },
    ],
  },
  {
    slug: "knee-to-chest-rock",
    loop: "pingPong",
    highlight: ["spine"],
    frames: [
      {
        // Knees held over the chest, gentle stretch
        name: "hold",
        joints: KNEE_HUG,
        durationMs: 2000,
        holdMs: 400,
      },
      {
        // Soft rock: knees ease a few centimeters closer, pelvis curls up
        name: "rock",
        joints: j(KNEE_HUG, {
          hip: [118, 157],
          kneeF: [96, 140],
          ankleF: [118, 148],
          toeF: [129, 152],
          kneeB: [95, 141],
          ankleB: [115, 148],
          toeB: [126, 152],
          elbowF: [86, 141],
          wristF: [104, 143],
          elbowB: [83, 141],
          wristB: [101, 143],
        }),
        durationMs: 2000,
        holdMs: 400,
      },
    ],
  },
  {
    slug: "chin-tuck",
    loop: "pingPong",
    highlight: ["head", "spine"],
    frames: [
      {
        // Relaxed desk posture, head drifted slightly forward
        name: "forward",
        joints: j(STANDING, { head: [103, 57] }),
        durationMs: 1800,
        holdMs: 400,
      },
      {
        // Chin glides straight BACK - same height, gentle double chin
        name: "tucked",
        joints: j(STANDING, { head: [95, 56], neck: [99, 71] }),
        durationMs: 1800,
        holdMs: 700,
      },
    ],
  },
  {
    slug: "wall-angel",
    loop: "pingPong",
    highlight: ["armF", "armB"],
    props: [{ kind: "wall", x: 72 }],
    frames: [
      {
        // Goalpost: elbows at shoulder height, forearms up along the wall
        name: "goalpost",
        joints: WALL_STAND,
        durationMs: 2200,
        holdMs: 400,
      },
      {
        // Slow slide up into a Y without anything peeling off the wall
        name: "reach",
        joints: j(WALL_STAND, {
          elbowF: [102, 54],
          wristF: [110, 36],
          elbowB: [68, 54],
          wristB: [60, 36],
        }),
        durationMs: 2200,
        holdMs: 400,
      },
    ],
  },
  {
    slug: "prone-y-raise",
    loop: "pingPong",
    highlight: ["armF", "armB"],
    frames: [
      {
        // Face down, arms overhead in a Y, thumbs up, forehead down
        name: "rest",
        joints: PRONE_Y,
        durationMs: 2000,
        holdMs: 300,
      },
      {
        // Arms float a few centimeters up - chest and head stay down
        name: "lift",
        joints: j(PRONE_Y, {
          elbowF: [137, 151],
          wristF: [155, 141],
          elbowB: [135, 152],
          wristB: [153, 142],
        }),
        durationMs: 2000,
        holdMs: 500,
      },
    ],
  },
  {
    slug: "ninety-ninety-hip-switch",
    loop: "pingPong",
    highlight: ["legF", "legB"],
    frames: [
      {
        // Settled 90/90 with both knees pointing left
        name: "left",
        joints: j(SUPINE, {
          ...NINETY_TORSO,
          kneeF: [75, 157],
          ankleF: [56, 169],
          toeF: [45, 166],
          kneeB: [77, 168],
          ankleB: [97, 172],
          toeB: [108, 169],
        }),
        durationMs: 2200,
        holdMs: 700,
      },
      {
        // Mid-switch: knees swivel up through the centre, feet skim the floor
        name: "lift",
        joints: j(SUPINE, {
          ...NINETY_TORSO,
          kneeF: [96, 139],
          ankleF: [82, 155],
          toeF: [72, 150],
          kneeB: [105, 140],
          ankleB: [119, 156],
          toeB: [129, 151],
        }),
        durationMs: 2200,
        holdMs: 150,
      },
      {
        // Mirror-image 90/90 with both knees pointing right
        name: "right",
        joints: j(SUPINE, {
          ...NINETY_TORSO,
          kneeF: [125, 157],
          ankleF: [144, 169],
          toeF: [155, 166],
          kneeB: [123, 168],
          ankleB: [103, 172],
          toeB: [92, 169],
        }),
        durationMs: 2200,
        holdMs: 700,
      },
    ],
  },
  {
    slug: "standing-hip-cars",
    loop: "cycle",
    highlight: ["legF"],
    props: [{ kind: "wall", x: 134 }],
    frames: [
      {
        // Standing tall, fingertips on the wall ahead for balance
        name: "stand",
        joints: j(STANDING, { elbowF: [112, 90], wristF: [131, 95] }),
        durationMs: 1800,
      },
      {
        // Knee lifts toward the chest
        name: "lift",
        joints: j(STANDING, {
          elbowF: [112, 90],
          wristF: [131, 95],
          kneeF: [118, 99],
          ankleF: [121, 122],
          toeF: [127, 132],
        }),
        durationMs: 1400,
      },
      {
        // Top of the circle - knee at its highest, sweeping around
        name: "top",
        joints: j(STANDING, {
          elbowF: [112, 90],
          wristF: [131, 95],
          kneeF: [110, 93],
          ankleF: [111, 116],
          toeF: [117, 126],
        }),
        durationMs: 2400,
      },
      {
        // Hip rotates through - leg trails behind before returning under
        name: "sweep",
        joints: j(STANDING, {
          elbowF: [112, 90],
          wristF: [131, 95],
          kneeF: [88, 140],
          ankleF: [72, 155],
          toeF: [61, 150],
        }),
        durationMs: 1800,
      },
    ],
  },
  {
    slug: "supported-deep-squat-hold",
    loop: "pingPong",
    highlight: ["legF", "legB"],
    props: [{ kind: "band", from: "wristF", anchor: [162, 84] }],
    frames: [
      {
        // Deep squat, heels down, hanging lightly off the support
        name: "hold",
        joints: DEEP_SQUAT,
        durationMs: 2400,
        holdMs: 500,
      },
      {
        // Breathe and let the hips settle a touch lower between the heels
        name: "settle",
        joints: j(DEEP_SQUAT, {
          head: [93, 99],
          neck: [86, 112],
          chest: [81, 131],
          hip: [76, 155],
          elbowF: [108, 122],
          wristF: [128, 114],
          elbowB: [105, 123],
          wristB: [125, 115],
          kneeF: [103, 151],
          kneeB: [100, 151],
        }),
        durationMs: 2400,
        holdMs: 800,
      },
    ],
  },
  {
    slug: "terminal-knee-extension",
    loop: "pingPong",
    highlight: ["legF"],
    props: [{ kind: "band", from: "kneeF", anchor: [172, 140] }],
    frames: [
      {
        // Band behind the knee, banded leg softly bent
        name: "soft",
        joints: j(STANDING, {
          kneeF: [108, 141],
          ankleF: [102, 165],
          toeF: [114, 167],
        }),
        durationMs: 1900,
        holdMs: 300,
      },
      {
        // Quad squeezes the knee back to fully straight against the band
        name: "locked",
        joints: j(STANDING, {
          kneeF: [101, 143],
          ankleF: [101, 166],
          toeF: [113, 168],
        }),
        durationMs: 1900,
        holdMs: 700,
      },
    ],
  },
  {
    slug: "step-down",
    loop: "pingPong",
    highlight: ["legF"],
    props: [{ kind: "box", x: 84, y: 152, w: 28, h: 18 }],
    frames: [
      {
        // Tall on the box, free foot hovering off the edge
        name: "top",
        joints: STEP_TOP,
        durationMs: 2400,
        holdMs: 400,
      },
      {
        // Standing knee bends, hips sit back, free heel taps the floor
        name: "tap",
        joints: j(STEP_TOP, {
          head: [102, 50],
          neck: [100, 65],
          chest: [98, 84],
          hip: [95, 109],
          elbowF: [102, 89],
          wristF: [103, 109],
          elbowB: [97, 89],
          wristB: [98, 109],
          kneeF: [110, 128],
          kneeB: [106, 132],
          ankleB: [114, 153],
          toeB: [119, 163],
        }),
        durationMs: 2400,
        holdMs: 300,
      },
    ],
  },
  {
    slug: "wall-sit-isometric",
    loop: "pingPong",
    highlight: ["legF", "legB"],
    props: [{ kind: "wall", x: 76 }],
    frames: [
      {
        // Back on the wall, knees at a comfortable shallow bend
        name: "hold",
        joints: WALL_SIT,
        durationMs: 2600,
        holdMs: 800,
      },
      {
        // Slow controlled slide a few centimeters deeper, then breathe
        name: "settle",
        joints: j(WALL_SIT, {
          head: [86, 74],
          neck: [85, 89],
          chest: [85, 109],
          hip: [85, 135],
          elbowF: [88, 112],
          wristF: [89, 132],
          elbowB: [85, 112],
          wristB: [86, 132],
          kneeF: [110, 146],
          kneeB: [107, 146],
        }),
        durationMs: 2600,
        holdMs: 800,
      },
    ],
  },
  {
    slug: "pendulum-swing",
    loop: "cycle",
    highlight: ["armF"],
    props: [{ kind: "box", x: 118, y: 141, w: 44, h: 29 }],
    frames: [
      {
        // Arm dangles heavy; body sway drifts it forward
        name: "front",
        joints: j(PENDULUM_BASE, { elbowF: [113, 125], wristF: [118, 144] }),
        durationMs: 1500,
      },
      {
        // Passing through the bottom of the small circle
        name: "bottom",
        joints: j(PENDULUM_BASE, { elbowF: [110, 126], wristF: [109, 147] }),
        durationMs: 1500,
      },
      {
        // Drifting back behind the shoulder
        name: "back",
        joints: j(PENDULUM_BASE, { elbowF: [107, 125], wristF: [100, 144] }),
        durationMs: 1500,
      },
      {
        // Far side of the circle, arm floats slightly up
        name: "round",
        joints: j(PENDULUM_BASE, { elbowF: [110, 124], wristF: [109, 143] }),
        durationMs: 1500,
      },
    ],
  },
  {
    slug: "band-external-rotation",
    loop: "pingPong",
    highlight: ["armF"],
    props: [{ kind: "band", from: "wristF", anchor: [12, 98] }],
    frames: [
      {
        // Elbow pinned to the ribs, forearm across the belly (front view)
        name: "across",
        joints: j(STANDING, {
          elbowF: [104, 95],
          wristF: [86, 100],
          elbowB: [96, 95],
          wristB: [95, 115],
          kneeF: [103, 143],
          ankleF: [104, 166],
          toeF: [107, 172],
          kneeB: [97, 143],
          ankleB: [96, 166],
          toeB: [93, 172],
        }),
        durationMs: 2000,
        holdMs: 300,
      },
      {
        // Forearm rotates out against the band - elbow never leaves the side
        name: "open",
        joints: j(STANDING, {
          elbowF: [104, 95],
          wristF: [122, 92],
          elbowB: [96, 95],
          wristB: [95, 115],
          kneeF: [103, 143],
          ankleF: [104, 166],
          toeF: [107, 172],
          kneeB: [97, 143],
          ankleB: [96, 166],
          toeB: [93, 172],
        }),
        durationMs: 2000,
        holdMs: 500,
      },
    ],
  },
  {
    slug: "scapular-push-up",
    loop: "pingPong",
    highlight: ["spine"],
    frames: [
      {
        // Straight-arm plank, blades spread, upper back gently rounded
        name: "spread",
        joints: PLANK,
        durationMs: 2000,
        holdMs: 400,
      },
      {
        // Elbows stay locked; only the chest sinks as the blades pinch
        name: "pinch",
        joints: j(PLANK, {
          head: [144, 120],
          neck: [130, 125],
          chest: [111, 136],
        }),
        durationMs: 2000,
        holdMs: 400,
      },
    ],
  },
  {
    slug: "median-nerve-glide",
    loop: "pingPong",
    highlight: ["armF"],
    frames: [
      {
        // "Carrying a tray": arm out to the side, wrist back toward the face
        name: "tray",
        joints: NERVE_GLIDE_BASE,
        durationMs: 2400,
        holdMs: 250,
      },
      {
        // Elbow straightens, fingers reach away, head tilts gently away
        name: "reach",
        joints: j(NERVE_GLIDE_BASE, {
          head: [75, 57],
          wristF: [123, 80],
        }),
        durationMs: 2400,
        holdMs: 250,
      },
    ],
  },
  {
    slug: "tendon-glides",
    loop: "pingPong",
    highlight: ["armF"],
    frames: [
      {
        // Elbow bent at the side, wrist neutral, fingers pointing up
        name: "fingers up",
        joints: j(STANDING, { elbowF: [104, 95], wristF: [110, 76] }),
        durationMs: 1500,
        holdMs: 600,
      },
      {
        // Hook fist - the hand starts to curl forward
        name: "hook",
        joints: j(STANDING, { elbowF: [104, 95], wristF: [117, 80] }),
        durationMs: 1500,
        holdMs: 600,
      },
      {
        // Full fist - wrist curled the rest of the way through the glide
        name: "fist",
        joints: j(STANDING, { elbowF: [104, 95], wristF: [123, 89] }),
        durationMs: 1500,
        holdMs: 700,
      },
    ],
  },
  {
    slug: "wrist-eccentric-extension",
    loop: "pingPong",
    highlight: ["armF"],
    props: [
      { kind: "box", x: 58, y: 146, w: 34, h: 24 },
      { kind: "dumbbell", at: ["wristF"] },
    ],
    frames: [
      {
        // Forearm on the thigh, helper hand assists the weight to the top
        name: "lifted",
        joints: WRIST_SEAT,
        durationMs: 3000,
        holdMs: 400,
      },
      {
        // The exercise: 3-5 second slow lower of the back of the hand
        name: "lowered",
        joints: j(WRIST_SEAT, { wristF: [107, 139] }),
        durationMs: 3000,
        holdMs: 300,
      },
    ],
  },
];
