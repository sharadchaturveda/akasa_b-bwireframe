/**
 * Documented Featured Dishes Data
 *
 * This file contains data for Akasa's featured dishes.
 * This data is used in the Featured Dishes section on the homepage and menu page.
 * It showcases the restaurant's signature dishes with detailed information.
 */

/**
 * Represents a featured dish
 */
export interface FeaturedDish {
  /**
   * Unique identifier for the dish
   * @required
   */
  id: string;
  
  /**
   * Name of the dish
   * @required
   */
  name: string;
  
  /**
   * Price of the dish in SGD
   * @required
   */
  price: string;
  
  /**
   * Detailed description of the dish
   * Format: "Ingredient | Ingredient | Ingredient"
   * @required
   */
  description: string;
  
  /**
   * Whether the dish is vegetarian
   * Used for displaying vegetarian indicators (🟢)
   * @default false
   */
  vegetarian: boolean;
  
  /**
   * Path to the dish image
   * Should be a relative path from the public directory
   * @required
   */
  imagePath: string;
  
  /**
   * Alt text for the dish image
   * Important for accessibility
   * @required
   */
  imageAlt: string;
  
  /**
   * Chef's notes or special information about the dish
   */
  chefNotes?: string;
  
  /**
   * Tags for categorizing or filtering dishes
   */
  tags?: string[];
  
  /**
   * Whether this is a signature dish
   * Signature dishes are highlighted in the UI
   * @default false
   */
  isSignature?: boolean;
  
  /**
   * Spice level of the dish (1-5)
   * 1 = Mild, 5 = Very Spicy
   */
  spiceLevel?: number;
}

/**
 * Featured Dishes
 * 
 * This constant contains all the featured dishes for Akasa restaurant.
 * The dishes are ordered with vegetarian dishes first, followed by non-vegetarian dishes,
 * as per the restaurant's preference.
 * 
 * These dishes are showcased in the Featured Dishes section on the homepage and menu page.
 */
export const FEATURED_DISHES: FeaturedDish[] = [
  // Vegetarian dishes first
  {
    id: "dal-e-akasa",
    name: "Dal-E-Akasa",
    price: "$22",
    description: "Black Lentils | Tomato | Ginger | Garlic | Cream",
    vegetarian: true,
    imagePath: "/images/menu/featured-dishes/dal-e-akasa.jpg",
    imageAlt: "Dal-E-Akasa - Black lentil curry with cream",
    chefNotes: "Our signature dal prepared with black lentils simmered overnight for a rich, creamy texture.",
    tags: ["vegetarian", "signature", "curry"],
    isSignature: true,
    spiceLevel: 2
  },
  {
    id: "paronthia-naan",
    name: "Paronthia Naan",
    price: "$8",
    description: "Refined Flour | Butter | Herbs",
    vegetarian: true,
    imagePath: "/images/menu/featured-dishes/paronthia-naan.jpg",
    imageAlt: "Paronthia Naan - Buttery herb-infused flatbread",
    chefNotes: "Our signature naan bread with a special blend of herbs and butter.",
    tags: ["vegetarian", "signature", "bread"],
    isSignature: true,
    spiceLevel: 1
  },
  
  // Non-vegetarian dishes
  {
    id: "akasa-e-lobster",
    name: "Akasa-E-Lobster",
    price: "$72",
    description: "Whole Lobster | Tomato Gravy | Kashmiri Chilli | Ginger",
    vegetarian: false,
    imagePath: "/images/menu/featured-dishes/akasa-e-lobster.jpg",
    imageAlt: "Akasa-E-Lobster - Whole lobster in spiced tomato gravy",
    chefNotes: "Our signature lobster dish prepared with a rich tomato gravy and Kashmiri chillies.",
    tags: ["seafood", "signature", "spicy"],
    isSignature: true,
    spiceLevel: 3
  },
  {
    id: "tandoori-prawns",
    name: "Tandoori Prawns",
    price: "$32",
    description: "Tiger Prawns | Yogurt | Kashmiri Chilli | Ginger | Garlic",
    vegetarian: false,
    imagePath: "/images/menu/featured-dishes/tandoori-prawns.jpg",
    imageAlt: "Tandoori Prawns - Char-grilled tiger prawns with spices",
    chefNotes: "Succulent tiger prawns marinated in yogurt and spices, then char-grilled in our tandoor.",
    tags: ["seafood", "signature", "tandoor"],
    isSignature: true,
    spiceLevel: 3
  },
  {
    id: "akasa-e-dum-biryani",
    name: "AKASA-E-Dum Biryani",
    price: "$25",
    description: "Basmati Rice | Saffron | Whole Spices | Served with Raita",
    vegetarian: false,
    imagePath: "/images/menu/featured-dishes/akasa-e-dum-biryani.jpg",
    imageAlt: "AKASA-E-Dum Biryani - Fragrant rice dish with saffron and spices",
    chefNotes: "Our signature biryani cooked in the traditional 'dum' style with aromatic spices and saffron.",
    tags: ["rice", "signature", "aromatic"],
    isSignature: true,
    spiceLevel: 3
  },
  {
    id: "tandoori-pomfret-kebab",
    name: "Tandoori Pomfret Kebab",
    price: "$34",
    description: "Whole Pomfret | Yogurt | Spices | Lemon",
    vegetarian: false,
    imagePath: "/images/menu/featured-dishes/tandoori-pomfret-kebab.jpg",
    imageAlt: "Tandoori Pomfret Kebab - Whole fish marinated and cooked in tandoor",
    chefNotes: "Whole pomfret marinated in our special spice blend and cooked to perfection in the tandoor.",
    tags: ["seafood", "signature", "tandoor"],
    isSignature: true,
    spiceLevel: 2
  }
];

/**
 * Get featured dishes by category
 * 
 * @param {string} category - The category to filter by (e.g., "vegetarian", "signature", "seafood")
 * @returns {FeaturedDish[]} An array of featured dishes in the specified category
 */
export function getFeaturedDishesByCategory(category: string): FeaturedDish[] {
  if (category === "vegetarian") {
    return FEATURED_DISHES.filter(dish => dish.vegetarian);
  } else if (category === "signature") {
    return FEATURED_DISHES.filter(dish => dish.isSignature);
  } else {
    return FEATURED_DISHES.filter(dish => dish.tags?.includes(category));
  }
}

/**
 * Get a featured dish by ID
 * 
 * @param {string} id - The ID of the dish to retrieve
 * @returns {FeaturedDish | undefined} The featured dish with the specified ID, or undefined if not found
 */
export function getFeaturedDishById(id: string): FeaturedDish | undefined {
  return FEATURED_DISHES.find(dish => dish.id === id);
}

/**
 * Get featured dishes by spice level
 * 
 * @param {number} level - The minimum spice level (1-5)
 * @returns {FeaturedDish[]} An array of featured dishes with the specified minimum spice level
 */
export function getFeaturedDishesBySpiceLevel(level: number): FeaturedDish[] {
  return FEATURED_DISHES.filter(dish => (dish.spiceLevel || 0) >= level);
}

export default FEATURED_DISHES;
