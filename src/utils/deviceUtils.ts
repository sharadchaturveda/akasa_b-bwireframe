/**
 * Device Utilities Module
 *
 * Utilities for device detection and optimization.
 * This module provides a centralized place for all device-related utilities.
 */

import { BREAKPOINTS } from '@/constants';

/**
 * Interface for device detection options
 */
export interface DeviceDetectionOptions {
  /**
   * Whether to detect tablet devices separately from mobile
   * @default false
   */
  detectTablets?: boolean;

  /**
   * Maximum width in pixels to consider a device as mobile
   * @default 767
   */
  mobileMaxWidth?: number;

  /**
   * Maximum width in pixels to consider a device as tablet
   * Only used if detectTablets is true
   * @default 1024
   */
  tabletMaxWidth?: number;
}

/**
 * Detects if the current device is a mobile device
 *
 * This function uses a combination of user agent detection, touch support,
 * and screen size checks to determine if the current device is mobile.
 *
 * @param {DeviceDetectionOptions} options - Options for device detection
 * @returns {boolean} True if the current device is a mobile device
 */
export const isMobileDevice = (options: DeviceDetectionOptions = {}): boolean => {
  // Return false if running on the server
  if (typeof window === 'undefined') return false;

  // Set default options
  const {
    mobileMaxWidth = BREAKPOINTS.MOBILE,
  } = options;

  // Check for touch support
  const hasTouchSupport =
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    (navigator as any).msMaxTouchPoints > 0;

  // Check screen size
  const isSmallScreen = window.innerWidth <= mobileMaxWidth;

  // Check user agent for mobile devices
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobileUserAgent = /android|webos|iphone|ipod|blackberry|iemobile|opera mini/i.test(userAgent);

  // Consider it a mobile device if it has a small screen or a mobile user agent
  // We don't require touch support as some desktop devices have touch screens
  return isSmallScreen || isMobileUserAgent;
};

/**
 * Detects if the current device is a tablet device
 *
 * @param {DeviceDetectionOptions} options - Options for device detection
 * @returns {boolean} True if the current device is a tablet device
 */
export const isTabletDevice = (options: DeviceDetectionOptions = {}): boolean => {
  // Return false if running on the server
  if (typeof window === 'undefined') return false;

  // Set default options
  const {
    mobileMaxWidth = BREAKPOINTS.MOBILE,
    tabletMaxWidth = BREAKPOINTS.TABLET,
  } = options;

  // Check for touch support
  const hasTouchSupport =
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    (navigator as any).msMaxTouchPoints > 0;

  // Check screen size (larger than mobile but smaller than desktop)
  const isTabletScreen = window.innerWidth > mobileMaxWidth && window.innerWidth <= tabletMaxWidth;

  // Check user agent for tablet devices
  const userAgent = navigator.userAgent.toLowerCase();
  const isTabletUserAgent = /ipad|android(?!.*mobile)/i.test(userAgent);

  // Consider it a tablet device if it has a tablet-sized screen or a tablet user agent
  return isTabletScreen || isTabletUserAgent;
};

/**
 * Detects if the current device is a desktop device
 *
 * @param {DeviceDetectionOptions} options - Options for device detection
 * @returns {boolean} True if the current device is a desktop device
 */
export const isDesktopDevice = (options: DeviceDetectionOptions = {}): boolean => {
  // Return true if running on the server (default to desktop view)
  if (typeof window === 'undefined') return true;

  // Not mobile and not tablet
  return !isMobileDevice(options) && !isTabletDevice(options);
};

/**
 * Gets the current viewport dimensions
 *
 * @returns {{ width: number, height: number }} The viewport dimensions
 */
export const getViewportDimensions = (): { width: number, height: number } => {
  // Return default dimensions if running on the server
  if (typeof window === 'undefined') return { width: 1200, height: 800 };

  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
};

/**
 * Applies mobile-specific optimizations to the document
 */
export const applyMobileOptimizations = (): void => {
  // Return if running on the server
  if (typeof window === 'undefined' || !document) return;

  // Add mobile class to html element
  document.documentElement.classList.add('mobile-device');

  // Fix any content that might be bleeding outside the viewport
  document.documentElement.style.overflowX = 'hidden';
  document.body.style.overflowX = 'hidden';

  // Ensure proper touch behavior
  document.documentElement.style.touchAction = 'manipulation';

  // Add smooth scrolling for better mobile experience
  document.documentElement.style.scrollBehavior = 'smooth';

  // Optimize scrolling performance
  // Use type assertion to handle vendor prefixed property
  (document.documentElement.style as any)['-webkit-overflow-scrolling'] = 'touch';

  // Load mobile CSS dynamically
  if (!document.getElementById('mobile-css')) {
    const link = document.createElement('link');
    link.id = 'mobile-css';
    link.rel = 'stylesheet';
    link.href = '/mobile.css';
    document.head.appendChild(link);
  }
};

/**
 * Removes mobile-specific optimizations from the document
 */
export const removeMobileOptimizations = (): void => {
  // Return if running on the server
  if (typeof window === 'undefined' || !document) return;

  // Remove mobile class from html element
  document.documentElement.classList.remove('mobile-device');

  // Reset overflow
  document.documentElement.style.overflowX = '';
  document.body.style.overflowX = '';

  // Reset touch behavior
  document.documentElement.style.touchAction = '';

  // Reset scroll behavior
  document.documentElement.style.scrollBehavior = '';

  // Reset scrolling performance
  // Use type assertion to handle vendor prefixed property
  (document.documentElement.style as any)['-webkit-overflow-scrolling'] = '';

  // Remove mobile CSS
  const mobileCSS = document.getElementById('mobile-css');
  if (mobileCSS) {
    mobileCSS.remove();
  }
};
