/**
 * Menu Utilities
 * 
 * This file contains utility functions for menu-related functionality.
 */

/**
 * Interface for click tracking
 */
export interface ClickTracking {
  /**
   * Timers for tracking double clicks
   */
  timers: { [key: string]: number };
  
  /**
   * Click counts for tracking double clicks
   */
  counts: { [key: string]: number };
}

/**
 * Creates a new click tracking object
 * 
 * @returns {ClickTracking} A new click tracking object
 */
export function createClickTracking(): ClickTracking {
  return {
    timers: {},
    counts: {}
  };
}

/**
 * Handles menu card click with double-click detection
 * 
 * @param {string} menuId - The ID of the menu
 * @param {string} url - The URL to navigate to on double-click
 * @param {React.MouseEvent} event - The click event
 * @param {ClickTracking} clickTracking - The click tracking object
 * @param {(menuId: string) => void} setActiveMenu - Function to set the active menu
 * @param {number} timeout - Timeout for double-click detection in milliseconds
 * @returns {void}
 */
export function handleMenuCardClick(
  menuId: string,
  url: string,
  event: React.MouseEvent,
  clickTracking: ClickTracking,
  setActiveMenu: (menuId: string) => void,
  timeout: number = 300
): void {
  // Only process if the click is directly on the card and not on a button
  if (event.target === event.currentTarget || (event.target as HTMLElement).closest('button') === null) {
    // Set this menu as active
    setActiveMenu(menuId);

    // Initialize click count if not already set
    if (!clickTracking.counts[menuId]) {
      clickTracking.counts[menuId] = 0;
    }

    // Increment click count
    clickTracking.counts[menuId]++;

    // Clear any existing timer
    if (clickTracking.timers[menuId]) {
      window.clearTimeout(clickTracking.timers[menuId]);
    }

    // If this is the second click (double-click)
    if (clickTracking.counts[menuId] === 2) {
      // Navigate to the menu page
      window.location.href = url;
      // Reset click count
      clickTracking.counts[menuId] = 0;
    } else {
      // Set a timer to reset the click count after the timeout
      clickTracking.timers[menuId] = window.setTimeout(() => {
        clickTracking.counts[menuId] = 0;
      }, timeout);
    }
  }
}

/**
 * Detects if the current device is a mobile device
 * 
 * @returns {boolean} True if the current device is a mobile device
 */
export function detectMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const isSmallScreen = window.innerWidth < 768;

  return isMobileDevice || (isTouchDevice && isSmallScreen);
}
