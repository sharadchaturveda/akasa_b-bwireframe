/**
 * Mobile Styles Utilities Module
 *
 * Utilities for handling mobile-specific styles and media queries.
 * This module provides a centralized place for all mobile style-related utilities.
 */

import { BREAKPOINTS } from '@/constants';

/**
 * Interface for media query options
 */
export interface MediaQueryOptions {
  /**
   * The minimum width in pixels
   */
  minWidth?: number;
  
  /**
   * The maximum width in pixels
   */
  maxWidth?: number;
  
  /**
   * The minimum height in pixels
   */
  minHeight?: number;
  
  /**
   * The maximum height in pixels
   */
  maxHeight?: number;
  
  /**
   * Whether to use device pixel ratio
   */
  devicePixelRatio?: number;
  
  /**
   * Whether to use orientation
   */
  orientation?: 'portrait' | 'landscape';
}

/**
 * Creates a media query string
 *
 * @param {MediaQueryOptions} options - Options for the media query
 * @returns {string} The media query string
 */
export const createMediaQuery = (options: MediaQueryOptions): string => {
  const conditions: string[] = [];
  
  if (options.minWidth !== undefined) {
    conditions.push(`(min-width: ${options.minWidth}px)`);
  }
  
  if (options.maxWidth !== undefined) {
    conditions.push(`(max-width: ${options.maxWidth}px)`);
  }
  
  if (options.minHeight !== undefined) {
    conditions.push(`(min-height: ${options.minHeight}px)`);
  }
  
  if (options.maxHeight !== undefined) {
    conditions.push(`(max-height: ${options.maxHeight}px)`);
  }
  
  if (options.devicePixelRatio !== undefined) {
    conditions.push(`(device-pixel-ratio: ${options.devicePixelRatio})`);
  }
  
  if (options.orientation !== undefined) {
    conditions.push(`(orientation: ${options.orientation})`);
  }
  
  return conditions.join(' and ');
};

/**
 * Creates a mobile media query string
 *
 * @returns {string} The mobile media query string
 */
export const createMobileMediaQuery = (): string => {
  return createMediaQuery({ maxWidth: BREAKPOINTS.MOBILE });
};

/**
 * Creates a tablet media query string
 *
 * @returns {string} The tablet media query string
 */
export const createTabletMediaQuery = (): string => {
  return createMediaQuery({
    minWidth: BREAKPOINTS.MOBILE + 1,
    maxWidth: BREAKPOINTS.TABLET
  });
};

/**
 * Creates a desktop media query string
 *
 * @returns {string} The desktop media query string
 */
export const createDesktopMediaQuery = (): string => {
  return createMediaQuery({ minWidth: BREAKPOINTS.TABLET + 1 });
};

/**
 * Adds a style element with mobile-specific styles
 *
 * @param {string} styles - The CSS styles to add
 * @param {string} id - The ID for the style element
 * @returns {HTMLStyleElement} The created style element
 */
export const addMobileStyles = (styles: string, id: string): HTMLStyleElement => {
  // Return if running on the server
  if (typeof document === 'undefined') {
    return {} as HTMLStyleElement;
  }
  
  // Check if the style element already exists
  const existingStyle = document.getElementById(id) as HTMLStyleElement;
  if (existingStyle) {
    return existingStyle;
  }
  
  // Create a new style element
  const style = document.createElement('style');
  style.id = id;
  style.innerHTML = `
    @media ${createMobileMediaQuery()} {
      ${styles}
    }
  `;
  
  // Add the style element to the document head
  document.head.appendChild(style);
  
  return style;
};

/**
 * Removes a style element
 *
 * @param {string} id - The ID of the style element to remove
 * @returns {void}
 */
export const removeMobileStyles = (id: string): void => {
  // Return if running on the server
  if (typeof document === 'undefined') {
    return;
  }
  
  // Find the style element
  const style = document.getElementById(id);
  
  // Remove the style element if it exists
  if (style) {
    document.head.removeChild(style);
  }
};
