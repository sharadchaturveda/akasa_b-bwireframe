/**
 * Navigation Constants
 *
 * This file contains navigation-related constants used throughout the application.
 */

/**
 * Navigation item type
 */
export interface NavItem {
  /**
   * The display name of the navigation item
   */
  name: string;

  /**
   * The URL path of the navigation item
   */
  path: string;
}

/**
 * Navigation items
 */
export const NAVIGATION = {
  /**
   * Navigation items for the home page
   */
  HOME_NAV_ITEMS: [
    { name: "MENUS", path: "/menu" },
    { name: "SATURDAY BRUNCH", path: "/menu/saturday-brunch" },
    { name: "Christmas/NY Eve", path: "/menu/christmas-ny-eve" },
    { name: "EVENTS", path: "/events" },
    { name: "OFFERS", path: "/offers" },
    { name: "Loyalty", path: "/loyalty-program" },
    { name: "RESERVATIONS", path: "/reservations" },
  ] as NavItem[],

  /**
   * Navigation items for other pages
   */
  OTHER_NAV_ITEMS: [
    { name: "HOME", path: "/" },
    { name: "MENUS", path: "/menu" },
    { name: "SATURDAY BRUNCH", path: "/menu/saturday-brunch" },
    { name: "Christmas/NY Eve", path: "/menu/christmas-ny-eve" },
    { name: "EVENTS", path: "/events" },
    { name: "Loyalty", path: "/loyalty-program" },
    { name: "OFFERS", path: "/offers" },
    { name: "RESERVATIONS", path: "/reservations" },
  ] as NavItem[],
};
