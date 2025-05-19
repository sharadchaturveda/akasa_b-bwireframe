/**
 * Chef Constants
 * 
 * This file contains constants for the chef section of the website.
 */

/**
 * Chef information
 */
export const CHEF_INFO = {
  /**
   * Chef's name
   */
  name: "Chef Akhilesh Pathak",
  
  /**
   * Chef's biography paragraphs
   */
  bio: [
    "Hailing from the vibrant culinary melting pot of Kolkata, Chef Akhilesh's culinary journey spans over two decades, initially nurtured by his mother's guidance and refined through extensive exploration of India's diverse gastronomic landscape.",
    "His philosophy is simple: respect the ingredients, honor the tradition, and push the boundaries of what's possible. Every dish at Akasa tells a story of heritage, innovation, and passion."
  ],
  
  /**
   * Chef's achievements/badges
   */
  achievements: [
    "Taste Guru",
    "Curry Architect",
    "Culinary Trendsetter"
  ]
};

/**
 * Chef section images
 */
export const CHEF_IMAGES = {
  /**
   * Background image
   */
  background: {
    src: "/images/menu/chef/background.jpg",
    alt: "Chef background",
    quality: 60
  },
  
  /**
   * Chef portrait image
   */
  portrait: {
    src: "/images/menu/chef/portrait.jpg",
    alt: "Chef Akhilesh Pathak",
    quality: 85
  }
};

/**
 * Parallax background styles
 */
export const PARALLAX_BACKGROUND_STYLES = {
  willChange: 'transform',
  transform: 'translateZ(-1px) scale(2)',
  zIndex: -1
};

/**
 * Decorative SVG for spice illustrations
 */
export const SPICE_SVG_PATH = "M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z M12 2V22M2 12H22M4.93 4.93L19.07 19.07M19.07 4.93L4.93 19.07";

/**
 * Chef section colors
 */
export const CHEF_COLORS = {
  /**
   * Gold color used throughout the section
   */
  gold: "#E6C78B",
  
  /**
   * Darker gold color
   */
  darkGold: "#D4B679",
  
  /**
   * Gold with 30% opacity
   */
  goldTransparent30: "rgba(230, 199, 139, 0.3)",
  
  /**
   * Gold with 20% opacity
   */
  goldTransparent20: "rgba(230, 199, 139, 0.2)",
  
  /**
   * Gold with 10% opacity
   */
  goldTransparent10: "rgba(230, 199, 139, 0.1)",
  
  /**
   * Dark blue background for badges
   */
  darkBlue: "#1A2A3A"
};
