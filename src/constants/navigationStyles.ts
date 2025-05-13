/**
 * Navigation Style Constants
 * 
 * This file contains style-related constants for navigation components.
 */

/**
 * Mobile header style constants
 */
export const MOBILE_HEADER = {
  /**
   * Height of the mobile header in pixels
   */
  HEIGHT: 70,
  
  /**
   * Padding for the mobile header
   */
  PADDING: '0 20px 0 16px',
  
  /**
   * Transition for the mobile header background
   */
  TRANSITION: 'background-color 0.3s ease',
};

/**
 * Hamburger button size configurations
 */
export const HAMBURGER_BUTTON_SIZES = {
  /**
   * Small hamburger button
   */
  small: {
    width: '24px',
    height: '18px',
    barHeight: '2px'
  },
  
  /**
   * Medium hamburger button
   */
  medium: {
    width: '30px',
    height: '24px',
    barHeight: '3px'
  },
  
  /**
   * Large hamburger button
   */
  large: {
    width: '36px',
    height: '30px',
    barHeight: '4px'
  }
} as const;

/**
 * Logo size configurations
 */
export const LOGO_SIZES = {
  /**
   * Small logo
   */
  small: {
    width: 120,
    height: 60
  },
  
  /**
   * Medium logo
   */
  medium: {
    width: 180,
    height: 90
  },
  
  /**
   * Large logo
   */
  large: {
    width: 240,
    height: 120
  }
} as const;

/**
 * Navigation animation constants
 */
export const NAVIGATION_ANIMATIONS = {
  /**
   * Transition duration for menu animations in milliseconds
   */
  MENU_TRANSITION_DURATION: 300,
  
  /**
   * Easing function for menu animations
   */
  MENU_TRANSITION_EASING: 'ease',
};
