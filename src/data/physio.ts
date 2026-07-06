import type { Complaint, PhysioExercise } from "../lib/types";

export const complaints: Complaint[] = [
  {
    id: "lower-back-pain",
    name: "Lower Back Pain",
    whoGetsThis:
      "You sit at a desk for eight hours, then bend over to pick up a toddler, a car seat, or a laundry basket - and your lower back lets you know about it. Most dads with back pain don't have anything scary going on; the back just gets stiff and deconditioned from long sitting and sudden lifting.",
    whatHelps:
      "Gentle movement beats bed rest almost every time. Reset the spine with easy positional drills, build endurance in the deep core so your back stops doing all the work, and practice hinging at the hips when you lift kids or groceries.",
  },
  {
    id: "desk-neck",
    name: "Desk Neck",
    whoGetsThis:
      "Hours of leaning toward a monitor and looking down at a phone pull your head forward and round your shoulders. By the end of the workday your neck aches, your upper traps feel like rope, and headaches can creep in from the base of the skull.",
    whatHelps:
      "Two things: undo the forward-head posture with chin tucks and shoulder-blade work, and break up long sitting with short movement snacks. Strengthening the muscles between your shoulder blades makes the good posture the easy posture.",
  },
  {
    id: "tight-hips",
    name: "Tight Hips",
    whoGetsThis:
      "Sitting all day keeps your hips locked at ninety degrees, so the muscles at the front shorten and the ones around them stop moving well. You feel it when you crouch to a kid's eye level, sit cross-legged on the floor, or stand up after a long drive and walk like a rusty robot.",
    whatHelps:
      "Move the hips through their full range every day - rotations, deep squats, and controlled switches - rather than just stretching once in a while. Frequent, gentle range-of-motion work restores the mobility that sitting steals.",
  },
  {
    id: "knee-pain",
    name: "Knee Pain",
    whoGetsThis:
      "Stairs, squatting down to the floor for the hundredth block tower, or that weekend basketball run - your knees complain, especially around or under the kneecap. It's common in dads who went from active to desk-bound and then jump back into activity on weekends.",
    whatHelps:
      "Most everyday knee pain calms down when the quads and glutes get stronger and better at controlling the leg. Slow, controlled strength work at tolerable loads teaches the knee to accept force again - total rest usually makes it weaker and crankier.",
  },
  {
    id: "shoulder-impingement",
    name: "Shoulder Impingement",
    whoGetsThis:
      "Reaching overhead - lifting a kid onto your shoulders, putting a bag in the overhead bin, painting a ceiling - pinches at the top or front of the shoulder. Rounded desk posture narrows the space the rotator cuff moves through, and the tendons get irritated.",
    whatHelps:
      "Calm it down first with gentle, pain-free motion, then fix the mechanics: strengthen the rotator cuff and the muscles that control your shoulder blade. When the blade moves well, the tendon gets its room back and overhead reaching stops hurting.",
  },
  {
    id: "wrist-carpal",
    name: "Wrist & Carpal Tunnel Symptoms",
    whoGetsThis:
      "A full day on a keyboard and mouse, then gripping bike handlebars, stroller handles, or a wiggling kid - your wrists ache, and you might get tingling or numbness in the thumb-side fingers, especially at night. Repetitive typing posture is the usual suspect.",
    whatHelps:
      "Gentle nerve and tendon gliding keeps the tissues in the carpal tunnel moving freely, and gradual strengthening of the forearm muscles builds tolerance for gripping and typing. Frequent micro-breaks from the keyboard matter as much as the exercises.",
  },
];

export const physioExercises: PhysioExercise[] = [
  {
    kind: "physio",
    slug: "pelvic-tilt",
    name: "Pelvic Tilt",
    description:
      "A gentle lying drill that rocks the pelvis to mobilize the lower spine and wake up the deep abdominals - the classic first step when a stiff, achy back needs easy movement.",
    steps: [
      "Lie on your back with knees bent and feet flat on the floor, hip-width apart.",
      "Rest your arms at your sides and let your back settle into its natural arch.",
      "Exhale and gently flatten your lower back into the floor by tilting your pelvis, as if tucking your tailbone.",
      "Hold for 3-5 seconds while breathing normally.",
      "Inhale and slowly release back to the neutral starting arch.",
      "Repeat in a smooth, pain-free rocking rhythm.",
    ],
    primaryMuscles: ["lower-back"],
    secondaryMuscles: ["abs"],
    equipment: ["none"],
    difficulty: "beginner",
    timeEstimateMin: 3,
    commonMistakes: [
      "Pushing through the feet and lifting the hips instead of tilting the pelvis",
      "Holding your breath during the hold",
      "Forcing the range - this should feel like a gentle rock, not a crunch",
    ],
    complaints: ["lower-back-pain", "tight-hips"],
    frequency: "Daily, 2 sets of 10 slow reps",
    stopIf:
      "Sharp pain, pain shooting down a leg, or numbness or tingling in the legs - stop and see a professional.",
    tips: [
      "Do a set first thing in the morning before the day's lifting starts.",
    ],
  },
  {
    kind: "physio",
    slug: "mcgill-curl-up",
    name: "McGill Curl-Up",
    description:
      "A spine-sparing core exercise that builds abdominal endurance without bending the lower back - designed specifically for people whose backs don't tolerate sit-ups.",
    steps: [
      "Lie on your back with one knee bent and the other leg straight.",
      "Slide your hands under the natural arch of your lower back to support it.",
      "Keeping your neck long, lift your head and shoulders just a few centimeters off the floor - think of them rising as one unit.",
      "Hold for about 8-10 seconds while breathing steadily.",
      "Lower slowly and rest, then switch which knee is bent halfway through your set.",
    ],
    primaryMuscles: ["abs"],
    secondaryMuscles: ["lower-back"],
    equipment: ["none"],
    difficulty: "beginner",
    timeEstimateMin: 3,
    commonMistakes: [
      "Curling up high like a sit-up and flattening the lower back",
      "Jutting the chin forward and straining the neck",
      "Holding your breath instead of breathing through the hold",
    ],
    complaints: ["lower-back-pain"],
    frequency: "Daily, 3 sets of 5 holds (8-10 seconds each)",
    stopIf:
      "Sharp pain in the back, pain radiating into a leg, or numbness - stop and see a professional.",
  },
  {
    kind: "physio",
    slug: "knee-to-chest-rock",
    name: "Knee-to-Chest Rock",
    description:
      "A soothing lying stretch that gently rocks the knees toward the chest, decompressing a stiff lower back and easing tension in the glutes.",
    steps: [
      "Lie on your back on a comfortable surface with knees bent.",
      "Bring both knees up and hold them lightly behind the thighs or over the shins.",
      "Gently pull the knees toward your chest until you feel a mild stretch in the lower back.",
      "Rock slowly and softly back and forth a few centimeters, breathing deeply.",
      "Continue for 20-30 seconds, then lower one foot at a time back to the floor.",
    ],
    primaryMuscles: ["lower-back"],
    secondaryMuscles: ["glutes"],
    equipment: ["none"],
    difficulty: "beginner",
    timeEstimateMin: 2,
    commonMistakes: [
      "Yanking the knees in hard instead of easing into the stretch",
      "Lifting the head and neck off the floor",
      "Rocking fast - slow and gentle is the point",
    ],
    complaints: ["lower-back-pain"],
    frequency: "Daily, 2-3 rounds of 20-30 seconds",
    stopIf:
      "Pain that shoots down a leg, increasing numbness or tingling, or pain that worsens with the stretch - stop and see a professional.",
  },
  {
    kind: "physio",
    slug: "chin-tuck",
    name: "Chin Tuck",
    description:
      "The single best drill for forward-head desk posture: a small glide of the head straight back that re-trains the deep neck muscles that keep your head stacked over your shoulders.",
    steps: [
      "Sit or stand tall with your shoulders relaxed and eyes looking straight ahead.",
      "Without tilting your head up or down, glide your chin straight back - imagine making a gentle double chin.",
      "You should feel a light stretch at the base of the skull and gentle work at the front of the neck.",
      "Hold for 3-5 seconds, then relax back to neutral.",
      "Repeat slowly - quality over speed.",
    ],
    primaryMuscles: ["neck"],
    secondaryMuscles: [],
    equipment: ["none"],
    difficulty: "beginner",
    timeEstimateMin: 2,
    commonMistakes: [
      "Nodding the head down instead of gliding it straight back",
      "Forcing the movement so hard it strains the front of the neck",
      "Shrugging the shoulders up during the tuck",
    ],
    complaints: ["desk-neck"],
    frequency: "Daily, 3 sets of 10 - one set every couple of desk hours",
    stopIf:
      "Dizziness, pain or tingling radiating into an arm, or headaches that worsen - stop and see a professional.",
    tips: ["Set a reminder: one set every time you get up for coffee."],
  },
  {
    kind: "physio",
    slug: "wall-angel",
    name: "Wall Angel",
    description:
      "A slow snow-angel motion against a wall that opens the chest, mobilizes the shoulders, and strengthens the postural muscles between the shoulder blades.",
    steps: [
      "Stand with your back against a wall, feet a few centimeters away, lower back gently flattened.",
      "Press the back of your head, upper back, and hips lightly into the wall.",
      "Raise your arms into a goalpost shape with the backs of your hands and elbows touching the wall if you can.",
      "Slowly slide your arms up the wall as far as they go without anything peeling off.",
      "Slide back down to the goalpost position with control.",
      "Repeat slowly, keeping ribs down and breathing steady.",
    ],
    primaryMuscles: ["upper-back"],
    secondaryMuscles: ["shoulders"],
    equipment: ["none"],
    difficulty: "beginner",
    timeEstimateMin: 3,
    commonMistakes: [
      "Arching the lower back and flaring the ribs to fake more range",
      "Letting the elbows and wrists drift off the wall",
      "Rushing the slide instead of moving with control",
    ],
    complaints: ["desk-neck", "shoulder-impingement"],
    frequency: "Daily, 2 sets of 8-10 slow reps",
    stopIf:
      "Pinching pain in the shoulder that doesn't ease with a smaller range, or numbness or tingling into the arms - stop and see a professional.",
  },
  {
    kind: "physio",
    slug: "prone-y-raise",
    name: "Prone Y-Raise",
    description:
      "Lying face down and lifting the arms into a Y position strengthens the lower trapezius - the underworked muscle that pulls your shoulders back out of desk slouch.",
    steps: [
      "Lie face down with your arms overhead in a Y shape, thumbs pointing up.",
      "Rest your forehead on a rolled towel to keep your neck neutral.",
      "Gently draw your shoulder blades down and back.",
      "Lift both arms a few centimeters off the floor without lifting your chest or head.",
      "Hold for 2-3 seconds at the top, then lower slowly.",
      "Repeat with smooth, controlled reps.",
    ],
    primaryMuscles: ["upper-back"],
    secondaryMuscles: ["shoulders"],
    equipment: ["none"],
    difficulty: "beginner",
    timeEstimateMin: 3,
    commonMistakes: [
      "Shrugging the shoulders toward the ears as the arms lift",
      "Craning the neck up to look forward",
      "Lifting high and fast instead of a small, controlled raise",
    ],
    complaints: ["desk-neck"],
    frequency: "Daily or every other day, 2 sets of 10",
    stopIf:
      "Sharp shoulder or neck pain, or tingling down the arms - stop and see a professional.",
  },
  {
    kind: "physio",
    slug: "ninety-ninety-hip-switch",
    name: "90/90 Hip Switch",
    description:
      "A seated drill that rotates both hips between two ninety-degree positions, restoring internal and external hip rotation that long sitting slowly erases.",
    steps: [
      "Sit on the floor with one leg bent 90 degrees in front of you and the other bent 90 degrees to the side behind you.",
      "Sit tall with your chest up and hands lightly on the floor for balance if needed.",
      "Slowly lift both knees and rotate them together to the other side, ending in the mirror-image position.",
      "Pause and settle into the new position for a breath or two.",
      "Switch back and forth slowly and smoothly, staying within a comfortable range.",
    ],
    primaryMuscles: ["glutes"],
    secondaryMuscles: ["hip-flexors"],
    equipment: ["none"],
    difficulty: "beginner",
    timeEstimateMin: 3,
    commonMistakes: [
      "Slumping through the spine instead of sitting tall",
      "Using momentum to flop between sides",
      "Forcing the knees to the floor through pinching pain",
    ],
    complaints: ["tight-hips"],
    frequency: "Daily, 2 sets of 8-10 switches",
    stopIf:
      "Sharp pinching in the groin or hip joint that doesn't ease with a smaller range - stop and see a professional.",
    tips: ["Lean back on your hands at first if sitting tall feels impossible - the range will come."],
  },
  {
    kind: "physio",
    slug: "standing-hip-cars",
    name: "Standing Hip CARs",
    description:
      "Controlled Articular Rotations for the hip: standing on one leg, you draw the biggest slow circle you can with the other knee, lubricating the joint through its full range.",
    steps: [
      "Stand tall next to a wall or counter and hold it lightly for balance.",
      "Brace your core gently so your pelvis stays still.",
      "Lift one knee toward your chest as high as comfortable.",
      "Slowly sweep the knee out to the side, then rotate the hip so the foot trails behind you.",
      "Bring the leg back to the start, then reverse the direction of the circle.",
      "Keep the circle slow, smooth, and pain-free, then switch legs.",
    ],
    primaryMuscles: ["hip-flexors"],
    secondaryMuscles: ["glutes"],
    equipment: ["none"],
    difficulty: "beginner",
    timeEstimateMin: 3,
    commonMistakes: [
      "Letting the torso lean and twist instead of moving only the hip",
      "Rushing the circle - each rep should take several seconds",
      "Making the circle bigger than your pain-free range",
    ],
    complaints: ["tight-hips"],
    frequency: "Daily, 3 slow circles each direction, each side",
    stopIf:
      "Sharp pinching in the front of the hip or groin, or clicking with pain - stop and see a professional.",
  },
  {
    kind: "physio",
    slug: "supported-deep-squat-hold",
    name: "Supported Deep Squat Hold",
    description:
      "Holding the bottom of a squat while hanging onto a doorframe or rail takes the load off your knees and lets tight hips and ankles gradually reopen - the resting position most desk workers have lost.",
    steps: [
      "Stand facing a sturdy doorframe, rail, or heavy table and grip it at waist height.",
      "Set your feet about shoulder-width apart, toes turned slightly out.",
      "Holding on for support, slowly lower into as deep a squat as comfortable.",
      "Let your hips settle between your heels and keep your heels on the floor.",
      "Hang out and breathe deeply for 20-30 seconds, gently shifting weight side to side if it feels good.",
      "Pull lightly on your support to help yourself stand back up.",
    ],
    primaryMuscles: ["quads"],
    secondaryMuscles: ["glutes", "calves"],
    equipment: ["none"],
    difficulty: "beginner",
    timeEstimateMin: 3,
    commonMistakes: [
      "Letting the heels lift off the floor",
      "Bouncing at the bottom instead of relaxing into the hold",
      "Skipping the support and forcing depth the knees aren't ready for",
    ],
    complaints: ["tight-hips", "knee-pain"],
    frequency: "Daily, 3 holds of 20-30 seconds",
    stopIf:
      "Sharp knee pain, pinching deep in the hip, or numbness in the feet - stop and see a professional.",
  },
  {
    kind: "physio",
    slug: "terminal-knee-extension",
    name: "Terminal Knee Extension (band)",
    description:
      "A banded drill that strengthens the quad exactly where knee pain lives - the last few degrees of straightening - teaching the kneecap to track smoothly under light load.",
    steps: [
      "Anchor a resistance band at knee height and loop it behind one knee.",
      "Step back until the band has light tension, with the banded leg slightly bent.",
      "Keep your foot flat and your posture tall.",
      "Slowly straighten the knee fully against the band, squeezing the thigh muscle at the top.",
      "Hold the straight position for 2-3 seconds.",
      "Bend the knee slightly to return, and repeat with control before switching legs.",
    ],
    primaryMuscles: ["quads"],
    secondaryMuscles: [],
    equipment: ["bands"],
    difficulty: "beginner",
    timeEstimateMin: 3,
    commonMistakes: [
      "Snapping the knee back into a hard lock instead of a controlled squeeze",
      "Using a band so heavy the movement becomes jerky",
      "Letting the hips twist instead of keeping them square",
    ],
    complaints: ["knee-pain"],
    frequency: "Daily, 2 sets of 10-15 each leg",
    stopIf:
      "Sharp pain behind or under the kneecap, or swelling after the exercise - stop and see a professional.",
  },
  {
    kind: "physio",
    slug: "step-down",
    name: "Slow Step-Down",
    description:
      "Standing on a low step and lowering the other heel slowly to the floor builds the single-leg control that protects knees on stairs, hills, and playgrounds.",
    steps: [
      "Stand sideways on a low step or bottom stair, one foot on the step and the other hanging off the edge.",
      "Hold a wall or rail lightly for balance.",
      "Keeping your hips level and your knee tracking over your middle toes, slowly bend the standing knee.",
      "Lower the free heel toward the floor over about 3 seconds - tap it gently, don't rest on it.",
      "Push back up through the standing leg to the start.",
      "Complete your reps, then switch sides.",
    ],
    primaryMuscles: ["quads"],
    secondaryMuscles: ["glutes"],
    equipment: ["none"],
    difficulty: "beginner",
    timeEstimateMin: 4,
    commonMistakes: [
      "Letting the standing knee cave inward",
      "Dropping fast instead of a slow, controlled 3-second lower",
      "Leaning the torso sideways to cheat the depth",
    ],
    complaints: ["knee-pain"],
    frequency: "Every other day, 2-3 sets of 8 each leg",
    stopIf:
      "Sharp pain in the kneecap during the lower, or a knee that swells afterward - stop and see a professional.",
    tips: ["Start with the lowest step in the house and only go higher when reps feel smooth and pain-free."],
  },
  {
    kind: "physio",
    slug: "wall-sit-isometric",
    name: "Wall-Sit Isometric",
    description:
      "A static hold against the wall that loads the quads without moving the knee joint - isometrics like this can actually calm tendon and kneecap pain while rebuilding strength.",
    steps: [
      "Stand with your back flat against a wall and walk your feet out about half a meter.",
      "Slide down until your knees are bent at a comfortable angle - start shallow, around 45 degrees, not a full 90.",
      "Keep knees tracking over your toes and your whole back against the wall.",
      "Hold and breathe steadily for 20-30 seconds; the thighs should burn gently, the knees should not hurt.",
      "Slide back up the wall to stand and rest before the next hold.",
    ],
    primaryMuscles: ["quads"],
    secondaryMuscles: [],
    equipment: ["none"],
    difficulty: "beginner",
    timeEstimateMin: 4,
    commonMistakes: [
      "Sliding straight to a deep 90-degree angle before the knees are ready",
      "Letting the knees drift past the toes or cave inward",
      "Holding your breath through the burn",
    ],
    complaints: ["knee-pain"],
    frequency: "Daily, 3-4 holds of 20-30 seconds",
    stopIf:
      "Sharp or worsening kneecap pain during the hold rather than a muscle burn - stop and see a professional.",
  },
  {
    kind: "physio",
    slug: "pendulum-swing",
    name: "Pendulum Swing",
    description:
      "Letting a relaxed arm dangle and swing in small circles uses gravity to gently mobilize an irritated shoulder without any muscular effort - the classic first move for a cranky shoulder.",
    steps: [
      "Stand next to a table or chair and lean forward, supporting yourself with your good arm.",
      "Let the sore arm hang straight down, completely relaxed and heavy.",
      "Shift your body weight gently to swing the arm in small circles - the body drives the motion, not the shoulder.",
      "Circle 10 times one way, then 10 times the other.",
      "Switch to gentle forward-back and side-to-side swings.",
      "Keep everything small, slow, and pain-free.",
    ],
    primaryMuscles: ["shoulders"],
    secondaryMuscles: [],
    equipment: ["none"],
    difficulty: "beginner",
    timeEstimateMin: 2,
    commonMistakes: [
      "Actively swinging the arm with shoulder muscles instead of letting it dangle",
      "Making the circles too big too soon",
      "Tensing the neck and shrugging while leaning over",
    ],
    complaints: ["shoulder-impingement"],
    frequency: "Daily, 2-3 rounds of 10 circles each direction",
    stopIf:
      "Increasing pain during the swings, or numbness and tingling down the arm - stop and see a professional.",
  },
  {
    kind: "physio",
    slug: "band-external-rotation",
    name: "Band External Rotation",
    description:
      "The bread-and-butter rotator cuff strengthener: rotating the forearm outward against a light band builds the small muscles that keep the shoulder joint centered and pain-free overhead.",
    steps: [
      "Anchor a light band at elbow height and stand side-on so the band crosses your body.",
      "Hold the band with the far hand, elbow bent 90 degrees and pinned to your side.",
      "Tuck a rolled towel between your elbow and ribs if it helps you keep the elbow in place.",
      "Slowly rotate your forearm outward, away from your belly, as far as comfortable.",
      "Pause briefly, then return with control over 2-3 seconds.",
      "Finish your reps, then turn around and work the other arm.",
    ],
    primaryMuscles: ["shoulders"],
    secondaryMuscles: ["upper-back"],
    equipment: ["bands"],
    difficulty: "beginner",
    timeEstimateMin: 3,
    commonMistakes: [
      "Letting the elbow drift away from the ribs",
      "Using a heavy band and shrugging to compensate",
      "Rotating fast instead of slow and controlled both directions",
    ],
    complaints: ["shoulder-impingement"],
    frequency: "Every other day, 2-3 sets of 12-15 each arm",
    stopIf:
      "Sharp pinching in the shoulder during rotation, or pain radiating down the arm - stop and see a professional.",
  },
  {
    kind: "physio",
    slug: "scapular-push-up",
    name: "Scapular Push-Up",
    description:
      "A push-up-position drill with straight arms where only the shoulder blades move - it trains the serratus and mid-back muscles that give the rotator cuff a stable platform.",
    steps: [
      "Set up in a straight-arm plank on hands and toes, or on the knees for an easier version.",
      "Keep your elbows locked straight the whole time.",
      "Let your chest sink slowly toward the floor by pinching your shoulder blades together.",
      "Then push the floor away, spreading the blades apart and rounding the upper back slightly.",
      "Move slowly between the two positions, keeping the neck long and hips still.",
    ],
    primaryMuscles: ["upper-back"],
    secondaryMuscles: ["shoulders"],
    equipment: ["none"],
    difficulty: "beginner",
    timeEstimateMin: 3,
    commonMistakes: [
      "Bending the elbows and turning it into a regular push-up",
      "Sagging the hips or poking the head forward",
      "Rushing through reps without feeling the blades move",
    ],
    complaints: ["shoulder-impingement"],
    frequency: "Every other day, 2 sets of 10-12 slow reps",
    stopIf:
      "Pinching shoulder pain, or wrist pain that doesn't ease when done on fists or handles - stop and see a professional.",
  },
  {
    kind: "physio",
    slug: "median-nerve-glide",
    name: "Median Nerve Glide",
    description:
      "A gentle flossing motion for the median nerve - the one squeezed in carpal tunnel - sliding it smoothly through the wrist and arm to ease tingling and improve tolerance for typing.",
    steps: [
      "Stand or sit tall and raise the affected arm out to the side at shoulder height, elbow bent, palm facing up.",
      "Start with your wrist bent so fingers point toward your face, like carrying a tray.",
      "Slowly straighten the elbow while extending the wrist so the fingers point away and down.",
      "As the arm straightens, gently tilt your head away from that arm.",
      "Return to the start position as you tilt your head back toward the arm.",
      "Flow smoothly between positions - a gentle pull is fine, tingling is your signal to shrink the range.",
    ],
    primaryMuscles: ["forearms"],
    secondaryMuscles: [],
    equipment: ["none"],
    difficulty: "beginner",
    timeEstimateMin: 2,
    commonMistakes: [
      "Stretching hard into tingling or numbness instead of staying just short of it",
      "Holding the end position - nerves like movement, not static stretch",
      "Shrugging the shoulder up during the glide",
    ],
    complaints: ["wrist-carpal"],
    frequency: "Daily, 2 sets of 8-10 slow glides per arm",
    stopIf:
      "Tingling or numbness that increases or lingers after the exercise, or night symptoms getting worse - stop and see a professional.",
  },
  {
    kind: "physio",
    slug: "tendon-glides",
    name: "Tendon Glides",
    description:
      "A sequence of five hand positions that slides the finger tendons through the carpal tunnel one by one, keeping them moving freely and reducing stiffness from all-day typing.",
    steps: [
      "Start with your elbow bent, wrist neutral, and fingers pointing straight up.",
      "Bend the fingers into a hook fist - fingertips toward the top of the palm, knuckles straight.",
      "Return to straight, then make a full fist with the thumb outside.",
      "Return to straight, then make a tabletop position - knuckles bent 90 degrees, fingers straight.",
      "Return to straight, then touch fingertips to the base of the palm in a straight fist.",
      "Move slowly through the whole sequence, holding each shape for 2-3 seconds.",
    ],
    primaryMuscles: ["forearms"],
    secondaryMuscles: [],
    equipment: ["none"],
    difficulty: "beginner",
    timeEstimateMin: 2,
    commonMistakes: [
      "Rushing through the shapes instead of pausing in each",
      "Forcing painful end ranges - the glide should feel like motion, not strain",
      "Letting the wrist flop around instead of staying neutral",
    ],
    complaints: ["wrist-carpal"],
    frequency: "Daily, 3-5 rounds of the full sequence, each hand",
    stopIf:
      "Sharp wrist pain, or numbness and tingling that worsen during or after the sequence - stop and see a professional.",
    tips: ["Run a round during long meetings - nobody will even notice."],
  },
  {
    kind: "physio",
    slug: "wrist-eccentric-extension",
    name: "Wrist Eccentric Extension",
    description:
      "Slowly lowering a light weight with the wrist strengthens the forearm extensors on the way down - the loading pattern that helps achy, overworked mouse-and-keyboard wrists rebuild capacity.",
    steps: [
      "Sit with your forearm resting on a table or your thigh, palm facing down, hand hanging off the edge.",
      "Hold a light weight - a small dumbbell, a can of beans, or a water bottle.",
      "Use your other hand to help lift the back of your hand up as far as comfortable.",
      "Remove the helping hand and lower the weight slowly, taking 3-5 seconds on the way down.",
      "Assist back to the top again - the slow lower is the exercise.",
      "Finish your reps, then switch hands.",
    ],
    primaryMuscles: ["forearms"],
    secondaryMuscles: [],
    equipment: ["none"],
    difficulty: "beginner",
    timeEstimateMin: 3,
    commonMistakes: [
      "Lifting and lowering without assistance, which loads the sore tendons too soon",
      "Dropping the weight quickly instead of a slow 3-5 second lower",
      "Using a weight heavy enough to cause pain rather than mild effort",
    ],
    complaints: ["wrist-carpal"],
    frequency: "Every other day, 3 sets of 10 each wrist",
    stopIf:
      "Sharp pain on the top of the wrist or forearm, or tingling into the fingers - stop and see a professional.",
  },
];
