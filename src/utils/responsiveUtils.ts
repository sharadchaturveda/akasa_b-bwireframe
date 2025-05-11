/**
 * Responsive Utilities
 * 
 * This file contains utility functions for responsive design.
 */
import { BREAKPOINTS, IMAGES } from '@/constants';

/**
 * Get the appropriate image quality based on device type
 * 
 * @param {boolean} isMobile - Whether the device is mobile
 * @param {number} mobileQuality - Quality for mobile devices
 * @param {number} desktopQuality - Quality for desktop devices
 * @returns {number} The appropriate image quality
 */
export function getResponsiveImageQuality(
  isMobile: boolean,
  mobileQuality: number = IMAGES.LOW_QUALITY,
  desktopQuality: number = IMAGES.DEFAULT_QUALITY
): number {
  return isMobile ? mobileQuality : desktopQuality;
}

/**
 * Get the appropriate image width based on device type
 * 
 * @param {boolean} isMobile - Whether the device is mobile
 * @param {number} mobileWidth - Width for mobile devices
 * @param {number} desktopWidth - Width for desktop devices
 * @returns {number} The appropriate image width
 */
export function getResponsiveImageWidth(
  isMobile: boolean,
  mobileWidth: number = 800,
  desktopWidth: number = 1200
): number {
  return isMobile ? mobileWidth : desktopWidth;
}

/**
 * Get the appropriate image URL with quality and width parameters
 * 
 * @param {string} baseUrl - The base URL of the image
 * @param {boolean} isMobile - Whether the device is mobile
 * @param {number} mobileQuality - Quality for mobile devices
 * @param {number} desktopQuality - Quality for desktop devices
 * @param {number} mobileWidth - Width for mobile devices
 * @param {number} desktopWidth - Width for desktop devices
 * @returns {string} The image URL with appropriate parameters
 */
export function getResponsiveImageUrl(
  baseUrl: string,
  isMobile: boolean,
  mobileQuality: number = IMAGES.LOW_QUALITY,
  desktopQuality: number = IMAGES.DEFAULT_QUALITY,
  mobileWidth: number = 800,
  desktopWidth: number = 1200
): string {
  const quality = getResponsiveImageQuality(isMobile, mobileQuality, desktopQuality);
  const width = getResponsiveImageWidth(isMobile, mobileWidth, desktopWidth);
  
  // Add query parameters to the URL
  const separator = baseUrl.includes('?') ? '&' : '?';
  return `${baseUrl}${separator}quality=${quality}&width=${width}`;
}

/**
 * Get the appropriate CSS class based on device type
 * 
 * @param {boolean} isMobile - Whether the device is mobile
 * @param {string} mobileClass - Class for mobile devices
 * @param {string} desktopClass - Class for desktop devices
 * @returns {string} The appropriate CSS class
 */
export function getResponsiveClass(
  isMobile: boolean,
  mobileClass: string,
  desktopClass: string
): string {
  return isMobile ? mobileClass : desktopClass;
}

/**
 * Get the appropriate value based on screen size
 * 
 * @param {number} screenWidth - The current screen width
 * @param {{ breakpoint: number; value: T }[]} breakpoints - Array of breakpoints and values
 * @param {T} defaultValue - Default value if no breakpoint matches
 * @returns {T} The appropriate value for the current screen size
 */
export function getValueByScreenSize<T>(
  screenWidth: number,
  breakpoints: { breakpoint: number; value: T }[],
  defaultValue: T
): T {
  // Sort breakpoints in descending order
  const sortedBreakpoints = [...breakpoints].sort((a, b) => b.breakpoint - a.breakpoint);
  
  // Find the first breakpoint that matches
  const match = sortedBreakpoints.find(item => screenWidth >= item.breakpoint);
  
  // Return the matching value or the default
  return match ? match.value : defaultValue;
}

/**
 * Create a throttled function that limits how often a function can be called
 * 
 * @param {Function} func - The function to throttle
 * @param {number} limit - The time limit in milliseconds
 * @returns {Function} The throttled function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false;
  let lastFunc: ReturnType<typeof setTimeout>;
  let lastRan: number;
  
  return function(this: any, ...args: Parameters<T>): void {
    if (!inThrottle) {
      func.apply(this, args);
      lastRan = Date.now();
      inThrottle = true;
      
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if (Date.now() - lastRan >= limit) {
          func.apply(this, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

/**
 * Create a debounced function that delays invoking a function until after a specified time
 * 
 * @param {Function} func - The function to debounce
 * @param {number} wait - The time to wait in milliseconds
 * @returns {Function} The debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  
  return function(this: any, ...args: Parameters<T>): void {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}
