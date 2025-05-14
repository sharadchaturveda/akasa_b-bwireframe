/**
 * Optimized Scroll Utilities
 *
 * This file contains optimized utility functions for scroll performance
 * that consolidate and improve upon existing scroll utilities.
 */

/**
 * Throttle function to limit the rate at which a function can fire
 *
 * @param func - The function to throttle
 * @param limit - The time limit in milliseconds
 * @returns A throttled function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let lastFunc: ReturnType<typeof setTimeout> | null = null;
  let lastRan = 0;

  return function(this: any, ...args: Parameters<T>): void {
    const context = this;
    const now = Date.now();

    if (now - lastRan >= limit) {
      func.apply(context, args);
      lastRan = now;
    } else {
      clearTimeout(lastFunc as ReturnType<typeof setTimeout>);
      lastFunc = setTimeout(() => {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (now - lastRan));
    }
  };
}

/**
 * Apply passive scroll listeners to improve scroll performance
 */
export function applyPassiveScrollListeners(): void {
  // Return if running on the server
  if (typeof window === 'undefined') return;

  try {
    // Test if passive is supported
    let supportsPassive = false;
    const opts = Object.defineProperty({}, 'passive', {
      get: function() {
        supportsPassive = true;
        return true;
      }
    });

    window.addEventListener('test', () => {}, opts as EventListenerOptions);
    window.removeEventListener('test', () => {}, opts as EventListenerOptions);

    // Apply passive listeners if supported
    if (supportsPassive) {
      const wheelOpts = { passive: true } as EventListenerOptions;
      window.addEventListener('wheel', () => {}, wheelOpts);
      window.addEventListener('touchstart', () => {}, wheelOpts);
      window.addEventListener('touchmove', () => {}, wheelOpts);
    }
  } catch (err) {
    // Silently fail if browser doesn't support this
  }
}

/**
 * Apply scroll performance optimizations
 */
export function applyScrollPerformanceOptimizations(): void {
  // Return if running on the server
  if (typeof window === 'undefined') return;

  // Disable smooth scrolling for better performance
  document.documentElement.style.scrollBehavior = 'auto';

  // Prevent overscroll effects
  document.body.style.overscrollBehavior = 'none';

  // Prevent horizontal overflow
  document.documentElement.style.overflowX = 'hidden';
  document.body.style.overflowX = 'hidden';

  // Apply passive scroll listeners
  applyPassiveScrollListeners();

  // Optimize scroll performance for mobile
  if (window.innerWidth < 768) {
    // Enable momentum-based scrolling on touch devices
    // Use setAttribute for non-standard CSS properties
    document.documentElement.setAttribute('style',
      document.documentElement.getAttribute('style') || '' +
      '-webkit-overflow-scrolling: touch;'
    );

    // Disable hover effects that might cause jank
    const style = document.createElement('style');
    style.textContent = `
      @media (pointer: coarse) {
        [class*="hover:"] {
          transition: none !important;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

/**
 * Create a scroll observer that fires a callback when elements enter the viewport
 * This is a more performant alternative to scroll event listeners
 *
 * @param callback - Function to call when elements enter the viewport
 * @param options - IntersectionObserver options
 * @returns IntersectionObserver instance
 */
export function createScrollObserver(
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
): IntersectionObserver | null {
  // Return null if running on the server
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null;
  }

  // Create and return the observer
  return new IntersectionObserver(callback, {
    rootMargin: '0px',
    threshold: 0,
    ...options
  });
}
