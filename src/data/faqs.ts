import type { Faq } from "@/lib/types";

/**
 * Hand-written FAQs for the highest-traffic pages, keyed by slug. Rendered
 * as an FAQ section + FAQPage JSON-LD (targets "People also ask"). Keys are
 * validated against the catalogs in scripts/validate-data.ts.
 */

export const movementFaqs: Record<string, Faq[]> = {
  "push-up": [
    {
      q: "How many push-ups should I be able to do?",
      a: "For most men in their 30s and 40s, 15-20 clean reps is a solid benchmark and 30+ is strong. Quality beats count: 10 full-range push-ups with a straight body line build more than 25 sagging ones.",
    },
    {
      q: "Are push-ups every day OK?",
      a: "Daily push-ups are fine if you keep most sets a few reps shy of failure. If your shoulders or elbows start complaining, drop to 3-4 days a week - muscles adapt fast but tendons need longer.",
    },
    {
      q: "My wrists hurt during push-ups. What can I do?",
      a: "Try push-up handles or dumbbells as handles to keep the wrists neutral, or do them on fists on a mat. Also warm up the wrists first - two minutes of circles and gentle stretches makes a real difference.",
    },
  ],
  plank: [
    {
      q: "How long should I hold a plank?",
      a: "Aim for 30-60 seconds with perfect form. Past a minute, you're mostly building endurance in the wrong ranges - make it harder instead: squeeze your glutes, tuck your pelvis, or lift one foot.",
    },
    {
      q: "Are planks better than sit-ups?",
      a: "For most desk workers, yes. Planks train your core to resist movement - its actual day job - without loading a spine that already spends 9 hours flexed in a chair.",
    },
    {
      q: "Why does my lower back hurt during planks?",
      a: "Your hips are sagging and your lower back is taking the load. Squeeze your glutes hard, tilt your pelvis under, and shorten the hold. A 20-second honest plank beats a 60-second saggy one.",
    },
  ],
  "bodyweight-squat": [
    {
      q: "How deep should I squat?",
      a: "As deep as you can with heels down and a neutral back - for most people that's thighs at least parallel to the floor. Depth improves quickly if you practice; the supported deep squat hold is a great assistant.",
    },
    {
      q: "Should my knees go past my toes?",
      a: "They can - that's normal, especially if you have long thighs. The old rule is outdated. What matters is that your knees track over your toes rather than caving inward, and nothing hurts.",
    },
    {
      q: "How many bodyweight squats a day are worth doing?",
      a: "Two or three sets of 15-25 most days is plenty for legs that carry kids and climb stairs without complaint. When 25 feels easy, move to goblet squats or reverse lunges rather than doing 50.",
    },
  ],
  "goblet-squat": [
    {
      q: "What weight should I start goblet squats with?",
      a: "A 8-12 kg (20-25 lb) dumbbell is right for most beginners. The counterweight in front actually makes squatting easier and deeper - if your lightest dumbbell feels heavy, do bodyweight squats to a box first.",
    },
    {
      q: "Goblet squat vs barbell squat - do I need a barbell?",
      a: "Not for a long time. Goblet squats train the same pattern, are far easier on the back, and a heavy dumbbell will challenge most dads for years. A barbell earns its place when your heaviest dumbbell feels like a warm-up.",
    },
    {
      q: "Why do my heels lift during squats?",
      a: "Usually tight calves or ankles, not weak legs. Squat with small plates or a book under your heels while you work on it, and stretch your calves at the wall most days.",
    },
  ],
  "glute-bridge": [
    {
      q: "What do glute bridges actually do?",
      a: "They wake up the muscles that sitting puts to sleep. Strong glutes take load off your lower back and knees - most people feel the difference in everyday back stiffness within a few weeks.",
    },
    {
      q: "Should I feel glute bridges in my hamstrings?",
      a: "A little is normal; cramping isn't. Move your heels closer to your hips, push through your whole foot, and think about squeezing your cheeks together rather than pushing your hips as high as possible.",
    },
    {
      q: "How do I make glute bridges harder?",
      a: "Slow down (3 seconds up, pause, 3 down), then progress to single-leg bridges, then load your hips with a dumbbell or a kid who thinks it's a ride.",
    },
  ],
  "pull-up": [
    {
      q: "I can't do a single pull-up. Where do I start?",
      a: "Dead hangs for grip, then slow negatives: jump or step to the top and lower yourself over 3-5 seconds. Add band-assisted reps when you have them, and train pulling 2-3 times a week. Most people get their first strict rep in 4-8 weeks.",
    },
    {
      q: "Pull-ups vs chin-ups - which is better?",
      a: "Chin-ups (palms toward you) are easier and hit the biceps more; pull-ups (palms away) bias the lats and upper back. Start with chin-ups, keep both once you can do 5 of each.",
    },
    {
      q: "How many pull-ups is good for a man?",
      a: "5 strict reps puts you ahead of most men; 10+ is genuinely strong at any age. If you can do 3 sets of 8, you've earned the right to add weight.",
    },
  ],
  "chin-up": [
    {
      q: "What muscles do chin-ups work?",
      a: "Lats, biceps, forearms and the muscles between your shoulder blades - essentially the entire 'undo the desk' musculature in one movement. Your core works hard too if you keep your legs still.",
    },
    {
      q: "Why are chin-ups easier than pull-ups?",
      a: "The underhand grip lets your biceps contribute fully and puts your shoulders in a stronger line of pull. That makes chin-ups the right starting point - the strength carries over.",
    },
    {
      q: "Do chin-ups build big arms?",
      a: "Yes - they're one of the best biceps builders there is, because the load (your body) is heavier than any curl you'd do. Pair them with slow negatives and your arms will notice.",
    },
  ],
  "dead-bug": [
    {
      q: "Why is the dead bug so highly recommended?",
      a: "It teaches your core to keep the spine still while your arms and legs move - the exact skill that protects your back when you lift kids, groceries and car seats. It looks easy and humbles almost everyone.",
    },
    {
      q: "I don't feel dead bugs anywhere. Am I doing them wrong?",
      a: "Almost certainly your lower back is arching off the floor. Press your back flat into the ground, exhale fully as you extend, and move slower - half the speed, twice the effect.",
    },
    {
      q: "Are dead bugs safe with lower back pain?",
      a: "They're one of the most back-friendly core exercises there is, which is why physios love them. Keep the range small at first, and stop if pain travels down a leg - that's a see-a-professional signal.",
    },
  ],
  "romanian-deadlift": [
    {
      q: "What's the difference between a Romanian deadlift and a regular deadlift?",
      a: "RDLs start from the top and lower with a soft knee bend until your hamstrings pull the brakes - the weight doesn't touch the floor. That keeps constant tension on the hamstrings and glutes with lighter weight than a floor deadlift needs.",
    },
    {
      q: "How far down should I go on RDLs?",
      a: "Only as far as your hamstrings allow with a flat back - usually mid-shin. The moment your lower back starts to round, you've gone past your range. Depth grows with flexibility; forcing it is how backs get tweaked.",
    },
    {
      q: "Are RDLs good or bad for the lower back?",
      a: "Done with a neutral spine and sensible weight, they're one of the best things you can do for long-term back resilience - strong hamstrings and glutes are your back's suspension system. Done rounded and heavy, the opposite. Form first, always.",
    },
  ],
  "reverse-lunge": [
    {
      q: "Why reverse lunges instead of forward lunges?",
      a: "Stepping backward keeps your shin more vertical and the load in your glutes rather than slamming into the front knee. Same benefits, notably friendlier on cranky knees.",
    },
    {
      q: "How do I stop wobbling during lunges?",
      a: "Widen your stance sideways a touch - think train tracks, not tightrope - and fix your eyes on a spot ahead. Balance improves within a couple of weeks of consistent practice; hold a wall or chair until then.",
    },
    {
      q: "Are lunges enough for leg day at home?",
      a: "Reverse lunges plus a hinge (glute bridges or RDLs) and a calf raise cover the legs surprisingly completely. Add a dumbbell in each hand when three sets of 10 per leg stops being interesting.",
    },
  ],
};

export const recipeFaqs: Record<string, Faq[]> = {
  "peanut-butter-overnight-oats": [
    {
      q: "How long do overnight oats keep in the fridge?",
      a: "Four to five days in a sealed jar, which is exactly why they're a meal-prep staple - make five on Sunday and breakfast is solved until Friday. Stir before eating and add a splash of milk if they've thickened.",
    },
    {
      q: "Can I warm overnight oats up?",
      a: "Yes - 60-90 seconds in the microwave with a splash of milk. They're designed to be eaten cold, but warm peanut-butter oats in winter is a legitimate life upgrade.",
    },
    {
      q: "Are overnight oats actually good for weight management?",
      a: "They're high in fiber and protein, which keeps you full through the morning meeting marathon - the opposite of a pastry. Watch the toppings, though: honey and granola add up faster than the oats do.",
    },
  ],
  "chicken-burrito-bowls": [
    {
      q: "How long do chicken burrito bowls last meal-prepped?",
      a: "Four days refrigerated in sealed containers. Keep anything fresh - avocado, salsa - separate and add it when you eat, so day four tastes like day one.",
    },
    {
      q: "Can I freeze burrito bowls?",
      a: "The chicken, rice and beans freeze well for up to three months - portion them into freezer-safe containers. Skip freezing the corn and toppings and add those fresh after reheating.",
    },
    {
      q: "How do I reheat a burrito bowl without drying the chicken?",
      a: "Add a tablespoon of water or salsa on top before microwaving, cover loosely, and heat in 60-second bursts with a stir between. The steam keeps the chicken tender.",
    },
  ],
  "protein-pancakes": [
    {
      q: "Do protein pancakes taste like protein powder?",
      a: "Done right, no - the banana and oats carry the flavour. Use a powder you already like the taste of, and don't exceed one scoop per batch or the texture goes rubbery.",
    },
    {
      q: "Can I make protein pancake batter the night before?",
      a: "Yes - it keeps 24 hours covered in the fridge and the oats soften nicely. Give it a stir and expect slightly thicker batter; loosen with a splash of milk.",
    },
    {
      q: "Why do my protein pancakes burn so easily?",
      a: "Protein browns faster than plain flour. Cook them lower and slower than regular pancakes - medium-low heat, flip when bubbles hold their shape - and they'll come out golden, not charred.",
    },
  ],
  "slow-cooker-pulled-chicken": [
    {
      q: "Can I use frozen chicken breasts in the slow cooker?",
      a: "Food-safety guidance says no - the meat spends too long in the temperature danger zone. Thaw in the fridge overnight first; the ten minutes of planning is worth it.",
    },
    {
      q: "How long does pulled chicken keep?",
      a: "Four days in the fridge, three months in the freezer, and it freezes brilliantly in flat bags. One Sunday batch becomes wraps, bowls, quesadillas and sandwiches all week.",
    },
    {
      q: "Why did my slow-cooker chicken come out dry?",
      a: "It went too long - breasts are done at 4-5 hours on low, and every hour past that steals moisture. Shred the meat back into the cooking liquid and it recovers most of what it lost.",
    },
  ],
  "beef-and-bean-chili": [
    {
      q: "Is chili good for meal prep?",
      a: "It's arguably the perfect meal-prep food: 5 days in the fridge, 3 months in the freezer, and it genuinely tastes better on day two once the spices settle in.",
    },
    {
      q: "How can I make chili higher in protein?",
      a: "This version already leans on lean beef plus beans, which is the trick - beans add protein and fiber. Top with Greek yogurt instead of sour cream for another 5-10g per bowl.",
    },
    {
      q: "Can I make this chili in a slow cooker?",
      a: "Yes - brown the beef and onions first (don't skip it, that's the flavour), then everything into the slow cooker on low for 6-8 hours. Add the beans in the last hour so they hold their shape.",
    },
  ],
};
