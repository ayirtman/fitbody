/**
 * Keyword-based store-aisle categorization for recipe ingredients. Rules are
 * ordered - the FIRST match wins - so specific overrides (e.g. "garlic powder"
 * is a spice, "sun-dried tomatoes" are pantry) must sit above the generic
 * produce rules. The validator asserts every recipe ingredient matches a
 * non-Other rule, so extend this map when adding recipes.
 */

export const INGREDIENT_CATEGORIES = [
  "Produce",
  "Meat & Fish",
  "Dairy & Eggs",
  "Grains & Bread",
  "Frozen",
  "Nuts & Seeds",
  "Spices & Condiments",
  "Pantry",
  "Other",
] as const;

export type IngredientCategory = (typeof INGREDIENT_CATEGORIES)[number];

const RULES: [RegExp, IngredientCategory][] = [
  // specific overrides first
  [/^frozen/i, "Frozen"],
  [/stock\b/i, "Pantry"],
  [/coconut milk/i, "Pantry"],
  [/peanut butter/i, "Pantry"],
  [/sun-dried|crushed tomatoes/i, "Pantry"],
  [/garlic powder|onion powder/i, "Spices & Condiments"],
  [/green beans/i, "Produce"],
  [/protein powder|baking powder/i, "Pantry"],
  [/seasoning|^salt|pepper flakes|chili (powder|flakes)|cumin|paprika|oregano|dill\b/i, "Spices & Condiments"],
  [/mustard|soy sauce|bbq sauce|salsa|vinegar/i, "Spices & Condiments"],
  // proteins
  [/chicken|turkey|beef|mince|sausage|bacon|ham\b|salmon|tuna|shrimp|deli/i, "Meat & Fish"],
  // dairy & eggs
  [/egg/i, "Dairy & Eggs"],
  [/yogurt|milk|butter|cheese|cheddar|parmesan|feta|monterey/i, "Dairy & Eggs"],
  // grains & bread
  [/rice|oats|granola|muesli|pasta|spaghetti|penne|fusilli|tortilla|wrap|pita|bread|roll|breadcrumb/i, "Grains & Bread"],
  // nuts & seeds
  [/chia|flax|seeds|nuts?\b|almond|walnut/i, "Nuts & Seeds"],
  // pantry staples
  [/beans|chickpea|lentil|olive|oil\b|honey|marinara|curry paste|corn\b|chocolate|salsa|stock/i, "Pantry"],
  // produce (broad, last)
  [/spinach|lettuce|avocado|banana|berr|potato|pepper|broccoli|carrot|tomato|cucumber|garlic|ginger|lemon|lime|onion|chive|celery|peas|vegetable mix|stir-fry/i, "Produce"],
];

export function categorizeIngredient(item: string): IngredientCategory {
  for (const [re, category] of RULES) {
    if (re.test(item)) return category;
  }
  return "Other";
}
