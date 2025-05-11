/**
 * Breakpoints Constants
 * 
 * This file contains breakpoint values used for responsive design.
 */

/**
 * Breakpoints for responsive design in pixels
 */
export const BREAKPOINTS = {
  /**
   * Mobile breakpoint (0-767px)
   */
  MOBILE: 767,
  
  /**
   * Tablet breakpoint (768-1023px)
   */
  TABLET: 1024,
  
  /**
   * Desktop breakpoint (1024-1279px)
   */
  DESKTOP: 1280,
  
  /**
   * Large desktop breakpoint (1280px and above)
   */
  LARGE_DESKTOP: 1536,
};

/**
 * Media query strings for responsive design
 */
export const MEDIA_QUERIES = {
  /**
   * Mobile devices
   */
  MOBILE: `(max-width: ${BREAKPOINTS.MOBILE}px)`,
  
  /**
   * Tablet devices
   */
  TABLET: `(min-width: ${BREAKPOINTS.MOBILE + 1}px) and (max-width: ${BREAKPOINTS.TABLET}px)`,
  
  /**
   * Desktop devices
   */
  DESKTOP: `(min-width: ${BREAKPOINTS.TABLET + 1}px)`,
  
  /**
   * User preference for reduced motion
   */
  PREFERS_REDUCED_MOTION: '(prefers-reduced-motion: reduce)',
};
