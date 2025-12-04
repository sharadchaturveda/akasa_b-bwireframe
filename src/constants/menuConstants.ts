/**
 * Menu Constants
 *
 * This file contains constants for the menu sections of the website.
 */

/**
 * Menu type interface
 */
export interface MenuType {
  /**
   * Unique identifier for the menu
   */
  id: string;

  /**
   * Display name of the menu
   */
  name: string;

  /**
   * Description of the menu
   */
  description: string;

  /**
   * Path to the menu image
   */
  image: string;

  /**
   * URL to the menu page
   */
  url: string;
}

/**
 * Available menu types
 */
export const MENU_TYPES: MenuType[] = [
  {
    id: "a-la-carte",
    name: "À La Carte",
    description: "Our signature dishes available for individual selection",
    image: "/images/menu/a-la-carte/hero/hero.jpg",
    url: "/menu/a-la-carte",
  },
  {
    id: "set-lunch",
    name: "3 Course Set Lunch",
    description: "A perfect midday dining experience with three exquisite courses",
    image: "/images/menu/set-lunch/hero/hero.jpg",
    url: "/menu/set-lunch",
  },
  {
    id: "christmas-ny-eve",
    name: "Christmas/NY Eve",
    description:
      "Celebrate the season with our exclusive Christmas/NY Eve menu, featuring special holiday dishes and drinks.",
    image: "/menus/soul-weekend-brunch/DSC06277-topaz.jpg",
    url: "/menu/christmas-ny-eve",
  },
  {
    id: "saturday-brunch",
    name: "Saturday Brunch",
    description: "Indulge in your cravings with our weekend brunch experience",
    image: "/menus/soul-weekend-brunch/DSC06273-topaz.jpg",
    url: "/menu/saturday-brunch",
  },
  {
    id: "wine-pairing",
    name: "Wine Pairing Menu",
    description: "Experience Akasa's exclusive Festive Wine Pairing Menu by Chef Akhilesh Pathak",
    image: "/images/menu/gallery5.jpg",
    url: "/menu/wine-pairing",
  },
  // {
  //   id: "soul-food",
  //   name: "Soul Food Weekends",
  //   description: "Special weekend offerings that nourish the soul",
  //   image: "/images/menu/soul-food-weekends/hero/hero.jpg",
  //   url: "/menu/soul-food-weekends",
  // },
  {
    id: "drinks",
    name: "Drinks",
    description: "Signature cocktails, fine wines, and refreshing beverages",
    image: "/images/menu/drinks/hero/hero.jpg",
    url: "/menu/drinks",
  },
  // {
  //   id: "bar-bites",
  //   name: "Chaat & Bar Bites",
  //   description: "Perfect small plates to accompany your drinks",
  //   image: "/images/menu/bar-bites/hero/hero.jpg",
  //   url: "/menu/bar-bites",
  // },

  // {
  //   id: "vegan",
  //   name: "Vegan Menu",
  //   description: "Explore our delicious plant-based options",
  //   image: "/images/menu/vegan/hero/hero.jpg",
  //   url: "/menu/vegan",
  // },
  // {
  //   id: "tasting-menu",
  //   name: "Tasting Menu",
  //   description: "A curated multi-course journey through Indian cuisine",
  //   image: "/images/menu/tasting-menu/hero/hero.jpg",
  //   url: "/menu/tasting-menu",
  // },
  {
    id: "mithai",
    name: "Mithai Menu",
    description: "Traditional Indian sweet delicacies made with authentic recipes",
    image: "/menus/soul-weekend-brunch/Akasa-41737-Edit.png",
    url: "/menu/mithai",
  },
];

/**
 * Styles for the animated background pattern
 */
export const ANIMATED_BACKGROUND_STYLE = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e6c78b' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
  backgroundSize: "60px 60px",
  animation: "slideBackground 60s linear infinite",
};

/**
 * Animation keyframes for the background pattern
 */
export const BACKGROUND_ANIMATION_KEYFRAMES = `
  @keyframes slideBackground {
    0% { background-position: 0 0; }
    100% { background-position: 100% 100%; }
  }
`;

/**
 * Double-click detection timeout in milliseconds
 */
export const DOUBLE_CLICK_TIMEOUT = 300;
