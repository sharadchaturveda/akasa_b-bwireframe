/**
 * Layout Utilities Module
 *
 * Utilities for layout and responsive design.
 * This module provides a centralized place for all layout-related utilities.
 */

import { BREAKPOINTS } from '@/constants';

/**
 * Options for responsive layout
 */
export interface ResponsiveOptions {
  /**
   * Mobile breakpoint in pixels
   * @default 767
   */
  mobileBreakpoint?: number;
  
  /**
   * Tablet breakpoint in pixels
   * @default 1024
   */
  tabletBreakpoint?: number;
  
  /**
   * Desktop breakpoint in pixels
   * @default 1280
   */
  desktopBreakpoint?: number;
}

/**
 * Checks if the current viewport is mobile
 *
 * @param {ResponsiveOptions} options - Responsive options
 * @returns {boolean} True if the viewport is mobile
 */
export const isMobileViewport = (options: ResponsiveOptions = {}): boolean => {
  // Return false if running on the server
  if (typeof window === 'undefined') return false;
  
  const { mobileBreakpoint = BREAKPOINTS.MOBILE } = options;
  return window.innerWidth <= mobileBreakpoint;
};

/**
 * Checks if the current viewport is tablet
 *
 * @param {ResponsiveOptions} options - Responsive options
 * @returns {boolean} True if the viewport is tablet
 */
export const isTabletViewport = (options: ResponsiveOptions = {}): boolean => {
  // Return false if running on the server
  if (typeof window === 'undefined') return false;
  
  const {
    mobileBreakpoint = BREAKPOINTS.MOBILE,
    tabletBreakpoint = BREAKPOINTS.TABLET
  } = options;
  
  return window.innerWidth > mobileBreakpoint && window.innerWidth <= tabletBreakpoint;
};

/**
 * Checks if the current viewport is desktop
 *
 * @param {ResponsiveOptions} options - Responsive options
 * @returns {boolean} True if the viewport is desktop
 */
export const isDesktopViewport = (options: ResponsiveOptions = {}): boolean => {
  // Return true if running on the server (default to desktop)
  if (typeof window === 'undefined') return true;
  
  const { tabletBreakpoint = BREAKPOINTS.TABLET } = options;
  return window.innerWidth > tabletBreakpoint;
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
    height: window.innerHeight
  };
};

/**
 * Gets the current scroll position
 *
 * @returns {{ x: number, y: number }} The scroll position
 */
export const getScrollPosition = (): { x: number, y: number } => {
  // Return default position if running on the server
  if (typeof window === 'undefined') return { x: 0, y: 0 };
  
  return {
    x: window.scrollX || window.pageXOffset,
    y: window.scrollY || window.pageYOffset
  };
};

/**
 * Gets the element's position relative to the viewport
 *
 * @param {HTMLElement} element - The element to get the position of
 * @returns {DOMRect} The element's position
 */
export const getElementPosition = (element: HTMLElement): DOMRect => {
  return element.getBoundingClientRect();
};

/**
 * Checks if an element is in the viewport
 *
 * @param {HTMLElement} element - The element to check
 * @param {number} threshold - The threshold for visibility (0-1)
 * @returns {boolean} True if the element is in the viewport
 */
export const isElementInViewport = (element: HTMLElement, threshold = 0): boolean => {
  const rect = getElementPosition(element);
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
  
  // Calculate the visible area
  const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
  const visibleWidth = Math.min(rect.right, viewportWidth) - Math.max(rect.left, 0);
  const visibleArea = visibleHeight * visibleWidth;
  const elementArea = rect.height * rect.width;
  
  // Calculate the visible percentage
  const visiblePercentage = elementArea > 0 ? visibleArea / elementArea : 0;
  
  return visiblePercentage > threshold;
};

/**
 * Scrolls to an element smoothly
 *
 * @param {string} elementId - The ID of the element to scroll to
 * @param {number} offset - Offset from the top of the element in pixels
 * @param {number} duration - Duration of the scroll animation in milliseconds
 * @returns {void}
 */
export const scrollToElement = (
  elementId: string,
  offset = 0,
  duration = 500
): void => {
  // Return if running on the server
  if (typeof document === 'undefined') return;
  
  const element = document.getElementById(elementId);
  if (!element) return;
  
  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
  const targetPosition = elementPosition - offset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime: number | null = null;
  
  const animateScroll = (currentTime: number) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const easeInOutCubic = progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;
    
    window.scrollTo(0, startPosition + distance * easeInOutCubic);
    
    if (timeElapsed < duration) {
      requestAnimationFrame(animateScroll);
    }
  };
  
  requestAnimationFrame(animateScroll);
};

export default {
  isMobileViewport,
  isTabletViewport,
  isDesktopViewport,
  getViewportDimensions,
  getScrollPosition,
  getElementPosition,
  isElementInViewport,
  scrollToElement
};
