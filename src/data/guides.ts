import type { Guide } from "@/lib/types";

/**
 * Long-form SEO guides targeting dad-specific long-tail queries. Every link
 * is validated against the content catalogs in scripts/validate-data.ts, so
 * a broken href fails the build.
 */
export const guides: Guide[] = [
  {
    slug: "home-workout-for-busy-dads-no-equipment",
    title: "The No-Equipment Home Workout Plan for Busy Dads",
    description:
      "A realistic no-equipment home workout plan for busy dads. 15-minute bodyweight sessions, a simple weekly structure, and tactics for staying consistent.",
    category: "training",
    minutes: 5,
    updated: "2026-07-06",
    intro:
      "You don't need a gym, a rack, or a spare hour. You need a plan that survives a normal week with kids, work, and a body that's tired by 9pm. This guide gives you a bodyweight-only structure you can run in your living room, plus the tactics that keep it going when life doesn't cooperate.",
    sections: [
      {
        heading: "Why 15 minutes beats zero",
        paragraphs: [
          "The biggest mistake busy dads make is all-or-nothing thinking. If you can't do a full hour, you skip the day. Skip enough days and you're starting over every month.",
          "Fifteen focused minutes, three or four times a week, builds real strength and keeps the habit alive. Consistency compounds. A short session you actually do beats the perfect session you keep postponing.",
        ],
      },
      {
        heading: "A simple weekly structure",
        paragraphs: [
          "You don't need a complicated split. You need three or four short sessions that hit your whole body across the week. Here's a structure that works for most dads starting out.",
          "Rest days aren't wasted days. Walk, play with the kids, stretch. Your muscles grow between sessions, not during them.",
        ],
        bullets: [
          "Monday: push and core - 15 minutes",
          "Wednesday: legs and glutes - 15 minutes",
          "Friday: full body - 15 minutes",
          "Weekend (optional): a longer session or a family walk",
        ],
      },
      {
        heading: "The movements that do the work",
        paragraphs: [
          "Bodyweight training works when you pick movements that cover the big patterns: push, squat, hinge, and core. These five cover almost everything and need zero equipment.",
          "Do 3 rounds of each session's movements. Aim for 8 to 15 reps per set, or 30 to 45 seconds for holds. Rest just long enough to keep good form.",
        ],
        bullets: [
          "Push-ups for chest, shoulders, and arms",
          "Bodyweight squats for legs",
          "Reverse lunges for single-leg strength and balance",
          "Glute bridges for your posterior chain and lower back",
          "Planks for a core that holds up under real life",
        ],
        links: [
          { label: "Push-up", href: "/exercises/push-up" },
          { label: "Bodyweight squat", href: "/exercises/bodyweight-squat" },
          { label: "Reverse lunge", href: "/exercises/reverse-lunge" },
          { label: "Glute bridge", href: "/exercises/glute-bridge" },
          { label: "Plank", href: "/exercises/plank" },
        ],
      },
      {
        heading: "How to progress without equipment",
        paragraphs: [
          "No weights doesn't mean no progression. First, add reps. When you hit the top of a rep range with clean form, add a rep next session.",
          "Then make the movement harder. Slow the lowering phase to three seconds. Move to tougher variations: diamond push-ups, Bulgarian split squats, single-leg glute bridges. Same 15 minutes, more work done.",
          "Track it somewhere. A note on your phone is enough. Seeing last week's numbers is the cheapest motivation there is.",
        ],
      },
      {
        heading: "Staying consistent when kids and fatigue win",
        paragraphs: [
          "Kids will interrupt you mid-set. Let them. Treat interruptions as rest periods, not reasons to quit. A workout with three pauses still counts.",
          "If 9pm energy is the problem, stop planning 9pm workouts. Train before the house wakes up, or grab 15 minutes at lunch. Match the plan to your actual energy, not your ideal self.",
          "If you're new to training or have an injury history, check with a doctor or physio before you start. Then start small and stay boringly consistent.",
        ],
        bullets: [
          "Lay out your workout space the night before",
          "Attach training to an existing habit, like right after school drop-off",
          "Have a 5-minute fallback: one round of everything still counts",
          "Never miss twice in a row",
        ],
        links: [
          { label: "Dad Bod Kickstart routine", href: "/routines/dad-bod-kickstart" },
        ],
      },
    ],
    faqs: [
      {
        q: "Can you actually get in shape with no equipment?",
        a: "Yes. Bodyweight training builds strength and muscle if you progress it: more reps, slower tempo, harder variations. Equipment speeds things up later, but it's not required to start.",
      },
      {
        q: "How many days a week should a busy dad work out?",
        a: "Three short sessions a week is the sweet spot for most dads starting out. It's enough to build strength and easy enough to sustain. Add a fourth day once three feels automatic.",
      },
      {
        q: "Is 15 minutes a day enough exercise?",
        a: "For building the habit and a solid strength base, yes. Fifteen focused minutes of hard sets beats an hour of scrolling between machines. You can extend sessions later as goals grow.",
      },
    ],
    related: [
      { label: "Dad Bod Kickstart routine", href: "/routines/dad-bod-kickstart" },
      { label: "Morning Energizer routine", href: "/routines/morning-energizer" },
      { label: "Weekend Warrior routine", href: "/routines/weekend-warrior" },
      { label: "Browse all exercises", href: "/exercises" },
    ],
  },
  {
    slug: "15-minute-workouts-that-actually-work",
    title: "15-Minute Workouts That Actually Work (For Men With No Time)",
    description:
      "Do 15-minute workouts actually work? Yes, if you train hard and smart. The case for short sessions, three ready-made workouts, and when you need more.",
    category: "training",
    minutes: 5,
    updated: "2026-07-06",
    intro:
      "Most men don't quit training because it's hard. They quit because the plan demands time they don't have. Fifteen minutes is enough to get stronger, if you spend those minutes right. Here's the honest case for short workouts, three sessions you can run today, and where the limits are.",
    sections: [
      {
        heading: "The honest case for short sessions",
        paragraphs: [
          "Research on training volume keeps pointing the same way: hard sets drive results, and you can fit meaningful hard sets into a short window. You don't need an hour to challenge a muscle. You need a few sets taken close to your limit.",
          "Short sessions also fix the real problem, which is adherence. A 15-minute workout survives a work deadline, a sick kid, and a bad night's sleep. The hour-long plan usually doesn't.",
        ],
      },
      {
        heading: "Intensity beats duration",
        paragraphs: [
          "A short workout only works if it's dense. Cut the scrolling, cut the three-minute rests, cut the warm-up theater. Two minutes of mobility, then straight into work sets.",
          "Aim for sets that leave two or three reps in the tank. Pair exercises that don't compete, like a squat with a row, so one muscle rests while the other works. That's how 15 minutes holds 10 to 12 honest sets.",
        ],
      },
      {
        heading: "Three ready-made 15-minute sessions",
        paragraphs: [
          "You don't need to design anything. These three sessions rotate well across a week: one bodyweight, one dumbbell, one you can do in work clothes at lunch.",
          "Run each as a circuit for three or four rounds. Move briskly between exercises, rest a minute between rounds, and keep your form honest.",
        ],
        bullets: [
          "Session 1 - Morning Energizer: a bodyweight circuit to start the day switched on",
          "Session 2 - Minimalist Dumbbell: one pair of dumbbells, full body, nothing wasted",
          "Session 3 - Lunch Break Full Body: no sweat-soaked shirt, back at your desk on time",
        ],
        links: [
          { label: "Morning Energizer routine", href: "/routines/morning-energizer" },
          { label: "Minimalist Dumbbell routine", href: "/routines/minimalist-dumbbell" },
          { label: "Lunch Break Full Body routine", href: "/routines/lunch-break-full-body" },
        ],
      },
      {
        heading: "Build your own from three movements",
        paragraphs: [
          "Prefer to freestyle it? Pick one lower-body, one pull, and one hinge, then circuit them. A goblet squat, a one-arm row, and a Romanian deadlift cover most of your body in one loop.",
          "Do 8 to 12 reps of each, back to back, for four rounds. When all rounds feel controlled, go heavier or slow the lowering phase.",
        ],
        links: [
          { label: "Goblet squat", href: "/exercises/goblet-squat" },
          { label: "One-arm dumbbell row", href: "/exercises/one-arm-dumbbell-row" },
          { label: "Romanian deadlift", href: "/exercises/romanian-deadlift" },
        ],
      },
      {
        heading: "When 15 minutes is not enough",
        paragraphs: [
          "Be honest about goals. If you want general strength, energy, and a body that keeps up with your kids, short sessions deliver. If you're chasing a big deadlift or serious muscle size, you'll eventually need longer sessions and heavier loads.",
          "Short workouts also can't out-train a bad week of eating or four hours of sleep. Treat them as the anchor, not the whole strategy. And if you're returning from injury, get cleared by a professional before pushing intensity.",
        ],
      },
    ],
    faqs: [
      {
        q: "Are 15-minute workouts effective for building muscle?",
        a: "Yes, for beginners and intermediates, if the sets are hard and you progress the load or reps over time. Advanced lifters chasing maximum size will need more weekly volume.",
      },
      {
        q: "Is it better to work out 15 minutes every day or an hour twice a week?",
        a: "For most busy men, frequent short sessions win. They're easier to sustain, spread the stimulus across the week, and build a daily habit. The best schedule is the one you'll actually keep.",
      },
      {
        q: "Should I do cardio or weights in a 15-minute workout?",
        a: "Weights, done as a brisk circuit. You get the strength stimulus and your heart rate stays up, so you're covering both. Add dedicated cardio on other days if you have time.",
      },
    ],
    related: [
      { label: "Minimalist Dumbbell routine", href: "/routines/minimalist-dumbbell" },
      { label: "Lunch Break Full Body routine", href: "/routines/lunch-break-full-body" },
      { label: "All routines", href: "/routines" },
      { label: "High-Protein Week meal prep", href: "/meal-prep/high-protein-week" },
    ],
    gearEquipment: ["dumbbells"],
  },
  {
    slug: "dad-strength-basics-five-movements",
    title: "Dad Strength: The Only 5 Movements You Actually Need",
    description:
      "Push, pull, squat, hinge, carry. The five movement patterns every dad over 30 needs, why each one matters in real life, and how to progress them.",
    category: "training",
    minutes: 5,
    updated: "2026-07-06",
    intro:
      "Strength training looks complicated from the outside. It isn't. Almost everything your body does, from lifting a toddler to hauling groceries, comes down to five patterns: push, pull, squat, hinge, and carry. Train those five and you've covered what matters. Here's each one, why it earns its place, and where to start.",
    sections: [
      {
        heading: "Push: getting yourself and things off the ground",
        paragraphs: [
          "Pushing is how you get off the floor after wrestling the kids, and how you press the stroller into the trunk. It builds your chest, shoulders, and triceps in one motion.",
          "Start with the push-up. It's free, it scales, and it doubles as core work. When you can do 15 to 20 clean reps, add load with an incline dumbbell press or move to harder push-up variations.",
        ],
        links: [{ label: "Push-up", href: "/exercises/push-up" }],
      },
      {
        heading: "Pull: the pattern most dads skip",
        paragraphs: [
          "Desks and phones pull your shoulders forward all day. Pulling exercises drag them back. A strong upper back fixes posture, protects your shoulders, and fills out a t-shirt more than any curl.",
          "If you have a pull-up bar, start with dead hangs and work toward pull-ups. Can't do one yet? That's normal. Rows build the same muscles from an easier angle while you get there.",
        ],
        links: [
          { label: "Pull-up", href: "/exercises/pull-up" },
          { label: "One-arm dumbbell row", href: "/exercises/one-arm-dumbbell-row" },
        ],
      },
      {
        heading: "Squat: the foundation of keeping up",
        paragraphs: [
          "Every time you crouch to kid height, get off the couch, or climb stairs with a child on your back, you're squatting. Strong legs are the difference between playing on the floor and watching from the sofa.",
          "Master the bodyweight squat first: full depth, heels down, chest up. Then grab a dumbbell and switch to goblet squats. The front-loaded weight actually makes your form better, not worse.",
        ],
        links: [{ label: "Goblet squat", href: "/exercises/goblet-squat" }],
      },
      {
        heading: "Hinge: the back-saver",
        paragraphs: [
          "The hinge is bending at the hips with a flat back. It's how you should pick up the car seat, the laundry basket, and the kid who fell asleep on the floor. Most tweaked backs come from skipping this pattern, then loading it badly in real life.",
          "The Romanian deadlift teaches it with dumbbells and builds your hamstrings and glutes. Go light first and feel the stretch in the back of your legs. If you have existing back pain, get it checked by a physio before loading the movement.",
        ],
        links: [{ label: "Romanian deadlift", href: "/exercises/romanian-deadlift" }],
      },
      {
        heading: "Carry: strength you use every single day",
        paragraphs: [
          "Carrying is the most honest test of dad strength. Groceries in one trip. A sleeping kid up the stairs. A car seat through a parking lot. No gym exercise transfers to real life more directly.",
          "Farmer's carries are simple: pick up two heavy dumbbells, stand tall, and walk. They build grip, traps, core, and toughness at once. Start with 30-second walks and add weight when it stops feeling heavy.",
        ],
        links: [{ label: "Farmer's carry", href: "/exercises/farmers-carry" }],
      },
      {
        heading: "Putting the five together",
        paragraphs: [
          "You don't need a movement per day. Hit all five patterns two or three times a week and you're training more completely than most gym regulars. One exercise per pattern, three sets each, done in about 30 minutes.",
          "Progress slowly and log your numbers. Add a rep or a small amount of weight most weeks. That quiet accumulation is where dad strength actually comes from.",
        ],
        links: [{ label: "Dad Strength Split routine", href: "/routines/dad-strength-split" }],
      },
    ],
    faqs: [
      {
        q: "What are the most important exercises for men over 30?",
        a: "One exercise from each pattern: a push like push-ups, a pull like rows or pull-ups, a squat, a hinge like the Romanian deadlift, and a loaded carry. Those five cover most of what your body needs.",
      },
      {
        q: "Can I build strength with just dumbbells and a pull-up bar?",
        a: "Yes. A pair of adjustable dumbbells and a doorway bar cover all five patterns for years of progress. A barbell helps later if you chase heavier lifts, but it's not required.",
      },
      {
        q: "How long does it take to build noticeable strength?",
        a: "Most men feel stronger within three to four weeks and see visible changes around eight to twelve weeks of consistent training. Strength comes fast at first. Stay patient and keep adding small amounts.",
      },
    ],
    related: [
      { label: "Dad Strength Split routine", href: "/routines/dad-strength-split" },
      { label: "Minimalist Dumbbell routine", href: "/routines/minimalist-dumbbell" },
      { label: "Weekend Warrior routine", href: "/routines/weekend-warrior" },
      { label: "Browse all exercises", href: "/exercises" },
    ],
    gearEquipment: ["dumbbells", "pull-up-bar"],
  },
  {
    slug: "meal-prep-for-the-week-in-2-hours",
    title: "Meal Prep for the Whole Week in 2 Hours",
    description:
      "A simple Sunday meal prep system for beginners. Cook a full week of meals in 2 hours with parallel cooking, smart storage, and zero fancy skills.",
    category: "nutrition",
    minutes: 5,
    updated: "2026-07-06",
    intro:
      "You do not need to love cooking to meal prep. You need a system that runs three things at once and gets you out of the kitchen in two hours. This guide gives you that system, tells you what to cook, and covers the storage rules that keep it all safe. One Sunday session, five days of sorted food.",
    sections: [
      {
        heading: "Why 2 hours is enough",
        paragraphs: [
          "Most beginners fail at meal prep because they cook one dish at a time. Roast the chicken, wait, then rice, wait, then vegetables. That turns a two-hour job into a four-hour slog and you never do it again.",
          "The fix is parallel cooking. Your oven, your hob, and your chopping board are three separate workers. Keep all three busy at once and the whole week comes together while you stand in one kitchen listening to a podcast.",
        ],
      },
      {
        heading: "The system: oven, hob, cold assembly",
        paragraphs: [
          "Start with the oven, because it works unattended. Load it with the slow stuff first: chicken thighs, roast vegetables, egg muffins. Set a timer and forget it.",
          "While the oven runs, use the hob for grains and one-pot dishes. Rice, a pot of chili, a soup. These need a stir every ten minutes, not your full attention.",
          "Between stirs, do the cold assembly. Wash fruit, portion yogurt bowls, chop snack vegetables, roll protein balls. By the time the oven timer goes, everything else is already boxed.",
        ],
        bullets: [
          "0:00 - oven on, protein and veg in",
          "0:10 - grains and one-pot dish on the hob",
          "0:20 to 1:20 - cold assembly between stirs",
          "1:20 to 2:00 - everything out, cooled, boxed",
        ],
      },
      {
        heading: "What to actually cook",
        paragraphs: [
          "Do not invent a menu from scratch every week. Pick a plan and repeat it until you are bored, then swap one dish. Boring food that gets eaten beats exciting food that gets planned.",
          "A solid beginner week: one oven protein, one hob one-pot, one grain, one grab-and-go breakfast, one snack. Our ready-made plans map this out portion by portion, and the recipes below are all built to survive four days in the fridge.",
        ],
        links: [
          { label: "The Sunday Power Hour plan", href: "/meal-prep/sunday-power-hour" },
          { label: "High-Protein Week plan", href: "/meal-prep/high-protein-week" },
          { label: "Chicken burrito bowls", href: "/recipes/chicken-burrito-bowls" },
          { label: "Beef and bean chili", href: "/recipes/beef-and-bean-chili" },
          { label: "Veggie egg muffins", href: "/recipes/veggie-egg-muffins" },
        ],
      },
      {
        heading: "Containers and storage rules",
        paragraphs: [
          "Cool food before you seal it. Leave boxes open on the counter for 30 to 60 minutes, then lid and fridge. Sealing hot food traps steam and shortens shelf life.",
          "Glass containers with clip lids are worth the money. They survive the microwave, do not stain, and stack. Buy one size so everything fits together like Lego.",
        ],
        bullets: [
          "Cooked chicken, beef, rice: 3 to 4 days in the fridge",
          "Soups, chili, stews: 4 days in the fridge, 3 months frozen",
          "Cooked rice: cool within an hour, fridge straight after, reheat piping hot",
          "Anything for day 5: freeze it on Sunday, thaw the night before",
        ],
      },
      {
        heading: "Beginner mistakes to skip",
        paragraphs: [
          "Mistake one: prepping food you do not like. If you hate dry chicken breast, prep thighs and chili instead. Compliance beats optimisation every time.",
          "Mistake two: seasoning everything the same. Cook proteins plain-ish and vary the sauce through the week. Same chicken, three different meals.",
          "Mistake three: skipping snacks. The prep that saves you is not lunch. It is the 4pm moment when a boxed snack stops a petrol station meal deal.",
        ],
      },
      {
        heading: "How to stay consistent",
        paragraphs: [
          "Anchor the session to something fixed. Same time every Sunday, right after the kids' swimming or before the football kicks off. A floating plan is a cancelled plan.",
          "Track nothing except one question: did I run out of prepped food before Friday? If yes, cook one extra portion of everything next week. That is the whole feedback loop.",
        ],
        links: [{ label: "All meal prep plans", href: "/meal-prep" }],
      },
    ],
    faqs: [
      {
        q: "How long does meal prep last in the fridge?",
        a: "Most cooked meals keep 3 to 4 days in a fridge at 5C or below. Cook Sunday, eat Monday to Thursday, and freeze anything meant for Friday. When in doubt, smell it and bin it.",
      },
      {
        q: "Is it safe to meal prep chicken for 5 days?",
        a: "Four days is the safe ceiling for cooked chicken in the fridge. For day five, freeze a portion on prep day and move it to the fridge the night before.",
      },
      {
        q: "Can you freeze meal prep meals?",
        a: "Yes. Soups, chili, cooked meats and rice all freeze well for 2 to 3 months. Cool fully first, label with the date, and reheat until piping hot all the way through.",
      },
    ],
    related: [
      { label: "High-Protein Week plan", href: "/meal-prep/high-protein-week" },
      { label: "Slow cooker pulled chicken", href: "/recipes/slow-cooker-pulled-chicken" },
      { label: "No-bake protein balls", href: "/recipes/no-bake-protein-balls" },
      { label: "Nutrition basics and calculator", href: "/nutrition" },
    ],
    leadMagnet: "meal-prep",
  },
  {
    slug: "how-much-protein-do-dads-actually-need",
    title: "How Much Protein Do You Actually Need? (A Dad's Guide)",
    description:
      "How much protein per day for men who train, in plain numbers. Real food examples, cheap sources, and the myths you can stop worrying about.",
    category: "nutrition",
    minutes: 5,
    updated: "2026-07-06",
    intro:
      'Protein advice online swings between "you barely need any" and "drink four shakes a day." Both are wrong. The research is actually pretty settled, and the numbers are simple enough to remember. Here is what a training dad actually needs, what it looks like on a plate, and how to hit it without spending a fortune.',
    sections: [
      {
        heading: "The honest numbers",
        paragraphs: [
          "If you lift weights and want to build or keep muscle, aim for 1.6 to 2.2 grams of protein per kilogram of bodyweight per day. For an 85kg dad, that is roughly 135 to 185 grams. Anywhere in that range works, so pick the low end and stop stressing.",
          "If you are mostly sedentary, you need less. Around 1.2 g/kg keeps a desk-bound body ticking over. But if you are reading this site, you are probably training, so budget for the higher range.",
          "Punch your own weight into our calculator and it will do the maths, then split the total across your day.",
        ],
        links: [{ label: "Protein and calorie calculator", href: "/nutrition" }],
      },
      {
        heading: "Why it matters more after 30",
        paragraphs: [
          "From your 30s onward, you slowly lose muscle unless you actively fight for it. The process is gradual, but it compounds. Less muscle means a slower metabolism, weaker joints, and a harder time carrying kids, shopping, and yourself up the stairs at 60.",
          "Two things push back: resistance training and enough protein. Older muscle is also a bit less responsive to each meal, which is one more reason the 1.6 g/kg floor matters more at 38 than it did at 22.",
        ],
      },
      {
        heading: "What 150g looks like in real food",
        paragraphs: [
          "Big daily numbers feel impossible until you split them into meals. Aim for 30 to 40 grams per meal plus one decent snack, and the total takes care of itself.",
          "A sample day: eggs and cottage cheese on toast for breakfast, a chicken and rice lunch, Greek yogurt with fruit mid-afternoon, and turkey meatballs for dinner. That is around 150 grams without a single shake.",
        ],
        bullets: [
          "Breakfast: cottage cheese scramble on toast - about 35g",
          "Lunch: chicken burrito bowl - about 40g",
          "Snack: Greek yogurt power bowl - about 25g",
          "Dinner: turkey meatballs marinara with pasta - about 45g",
        ],
        links: [
          { label: "Cottage cheese scramble on toast", href: "/recipes/cottage-cheese-scramble-on-toast" },
          { label: "Greek yogurt power bowl", href: "/recipes/greek-yogurt-power-bowl" },
          { label: "Turkey meatballs marinara", href: "/recipes/turkey-meatballs-marinara" },
        ],
      },
      {
        heading: "Cheap protein that actually works",
        paragraphs: [
          "Protein does not have to mean steak and supplements. The cheapest sources per gram are the boring staples your gran cooked with, and most of them meal prep beautifully.",
          "Build your weekly shop around three or four of these and the cost per meal drops fast.",
        ],
        bullets: [
          "Eggs - versatile, cheap, roughly 6g each",
          "Chicken thighs - cheaper than breast, harder to ruin",
          "Tinned tuna and sardines - shelf-stable and instant",
          "Greek yogurt and cottage cheese - snacks that do real work",
          "Lentils and beans - protein plus fiber for pennies",
          "Whey protein - not required, but the cheapest cost per gram if you like it",
        ],
        links: [{ label: "High-protein egg fried rice", href: "/recipes/high-protein-egg-fried-rice" }],
      },
      {
        heading: "The myths you can drop",
        paragraphs: [
          '"Protein wrecks your kidneys." In healthy people, intakes in the 1.6 to 2.2 g/kg range have not been shown to cause kidney damage. The caveat is real though: if you have an existing kidney condition, talk to your doctor before raising your intake. That is not us covering ourselves, it is genuinely different for you.',
          '"Your body can only absorb 30g per meal." Your body absorbs almost all of it; larger meals just digest more slowly. Spreading protein out is convenient, not mandatory.',
          '"You need protein within 30 minutes of training." The anabolic window is more like a garage door. Your daily total matters far more than the clock.',
        ],
        links: [{ label: "High-Protein Week meal plan", href: "/meal-prep/high-protein-week" }],
      },
    ],
    faqs: [
      {
        q: "Is 100g of protein a day enough to build muscle?",
        a: "For a smaller man, close. For most dads over 75kg who train, it is a bit short of the 1.6 g/kg research floor. It still beats the average intake, so treat 100g as a good start, not the finish line.",
      },
      {
        q: "Can you eat too much protein?",
        a: "For healthy people, intakes well above 2.2 g/kg appear safe but offer no extra muscle benefit, so you are mostly buying expensive urine. If you have kidney disease, consult your doctor first. This is general guidance, not medical advice.",
      },
      {
        q: "Do protein shakes count as real protein?",
        a: "Yes. Whey is just filtered milk protein and counts fully toward your daily total. Food first is still smart because it brings fiber and micronutrients, but a shake is a legitimate tool on busy days.",
      },
    ],
    related: [
      { label: "Nutrition basics and calculator", href: "/nutrition" },
      { label: "All high-protein recipes", href: "/recipes" },
      { label: "High-Protein Week plan", href: "/meal-prep/high-protein-week" },
      { label: "No-bake protein balls", href: "/recipes/no-bake-protein-balls" },
    ],
  },
  {
    slug: "desk-worker-posture-fix-guide",
    title: "The Desk Worker's Guide to Fixing Your Posture",
    description:
      "Fix desk posture with a 10-minute daily routine. What sitting does to your chest, hips and back, plus setup tweaks and the exercises that reverse it.",
    category: "recovery",
    minutes: 5,
    updated: "2026-07-06",
    intro:
      "Nine hours at a desk will not break you, but it will slowly reshape you. Tight chest, forward head, hips that complain when you stand up. The good news: the fix is boring, short, and daily. Ten minutes of the right work beats an hour of occasional stretching. Here is the full plan.",
    sections: [
      {
        heading: "What 9 hours of sitting actually does",
        paragraphs: [
          "Sitting puts your body in one shape for most of the day. The muscles held short adapt by tightening: your chest, the front of your hips, the front of your neck. The muscles held long and unused get lazy: your upper back, your glutes.",
          'The result is the classic desk profile. Rounded shoulders, head drifting toward the screen, a lower back doing work your glutes should handle. None of this is permanent damage, and your spine is not "crushed." It is just an adaptation, and adaptations reverse when you give the body a new input.',
        ],
      },
      {
        heading: "The daily 10-minute counter-routine",
        paragraphs: [
          "The formula is simple: stretch what sitting shortened, wake up what sitting switched off. Two stretches for the front, two drills for the back of the body. Do it at lunch or straight after your last meeting, same time every day.",
          "Start with a doorway pec stretch and a couch stretch, about a minute per side each. Then chin tucks to reset your head position and wall angels to get the upper back working. That is the core of it. If you want it pre-built, run our Desk Warrior Reset routine and just follow along.",
        ],
        links: [
          { label: "Doorway pec stretch", href: "/flexibility/doorway-pec-stretch" },
          { label: "Couch stretch", href: "/flexibility/couch-stretch" },
          { label: "Chin tuck", href: "/physio/desk-neck/chin-tuck" },
          { label: "Wall angel", href: "/physio/desk-neck/wall-angel" },
          { label: "Desk Warrior Reset routine", href: "/routines/desk-warrior-reset" },
        ],
      },
      {
        heading: "Desk setup basics",
        paragraphs: [
          "No chair fixes bad hours, but a decent setup lowers the daily dose of bad position. You do not need a standing desk or a 600 pound chair. You need the screen and your arms in roughly the right place.",
          "The bigger lever is movement. The best posture is the next posture, so break up sitting every 30 to 45 minutes, even if it is just standing for a phone call.",
        ],
        bullets: [
          "Top of the screen at eye level, an arm's length away",
          "Elbows around 90 degrees, shoulders relaxed, not shrugged",
          "Feet flat on the floor, hips slightly above knees",
          "Laptop users: external keyboard, laptop raised on books",
          "Set a timer to stand and move every 30 to 45 minutes",
        ],
      },
      {
        heading: "Strengthen the back side",
        paragraphs: [
          "Stretching buys you range. Strength keeps it. If your upper back and glutes stay weak, your body drifts back to the slump within an hour of any stretch.",
          "Twice a week, add pulling and hip work: band pull-aparts and reverse flys for the upper back, glute bridges for the hips. A pair of resistance bands is enough to cover all of it at home in ten minutes.",
        ],
        links: [
          { label: "Band pull-apart", href: "/exercises/band-pull-apart" },
          { label: "Glute bridge", href: "/exercises/glute-bridge" },
        ],
      },
      {
        heading: "When to see a professional",
        paragraphs: [
          "Stiffness, mild ache after long days, and tension that eases with movement are normal desk-body complaints. This guide handles those. It is general fitness advice, not medical advice.",
          "See a doctor or physio if you have pain that radiates down an arm or leg, numbness or tingling, pain that wakes you at night, or anything that gets steadily worse over a few weeks. A professional can rule out the serious stuff and tailor the boring stuff.",
        ],
      },
    ],
    faqs: [
      {
        q: "How long does it take to fix rounded shoulders?",
        a: "With daily stretching and two strength sessions a week, most people feel a difference in 2 to 4 weeks and see a visible change in 2 to 3 months. Consistency matters far more than intensity.",
      },
      {
        q: "Do posture correctors and braces work?",
        a: "Not as a fix. A brace holds you in position but does none of the strengthening, so nothing changes when it comes off. Use the ten-minute routine instead and let your own muscles do the bracing.",
      },
      {
        q: "Is sitting all day really that bad for you?",
        a: "Long sitting is a dose problem, not a death sentence. The issues come from unbroken hours and zero counter-movement. Break it up regularly, train a couple of times a week, and a desk job is entirely survivable.",
      },
    ],
    related: [
      { label: "Desk neck: full physio hub", href: "/physio/desk-neck" },
      { label: "Post-Desk Unwind routine", href: "/routines/post-desk-unwind" },
      { label: "All flexibility stretches", href: "/flexibility" },
      { label: "Lower back pain hub", href: "/physio/lower-back-pain" },
    ],
    leadMagnet: "desk-reset",
    gearEquipment: ["bands"],
  },
];

export const guideBySlug = new Map(guides.map((g) => [g.slug, g]));
