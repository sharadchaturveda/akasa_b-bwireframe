/**
 * Scroll Utilities
 * 
 * This file contains utility functions for optimizing scroll behavior
 * and performance throughout the application.
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
  let inThrottle = false;
  let lastFunc: ReturnType<typeof setTimeout> | null = null;
  let lastRan = 0;

  return function(this: any, ...args: Parameters<T>): void {
    const context = this;

    if (!inThrottle) {
      func.apply(context, args);
      lastRan = Date.now();
      inThrottle = true;

      setTimeout(() => {
        inThrottle = false;
      }, limit);
    } else {
      clearTimeout(lastFunc as ReturnType<typeof setTimeout>);
      lastFunc = setTimeout(() => {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

/**
 * Optimized scroll to element function
 * 
 * This function provides a controlled way to scroll to an element
 * without using the browser's built-in smooth scrolling, which can
 * cause performance issues.
 * 
 * @param elementId - The ID of the element to scroll to
 * @param offset - Optional offset from the top of the element (default: 0)
 * @param duration - Optional duration of the scroll animation in ms (default: 300)
 */
export function scrollToElement(
  elementId: string,
  offset: number = 0,
  duration: number = 300
): void {
  const element = document.getElementById(elementId);
  
  if (!element) {
    console.warn(`Element with ID "${elementId}" not found.`);
    return;
  }

  // Get the element's position
  const elementPosition = element.getBoundingClientRect().top + window.scrollY;
  const targetPosition = elementPosition - offset;
  
  // If user prefers reduced motion, scroll immediately without animation
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.scrollTo(0, targetPosition);
    return;
  }

  // For better performance, use a simple animation instead of smooth scrolling
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  let startTime: number | null = null;

  function step(timestamp: number) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Use easeInOutQuad easing function for natural movement
    const easeProgress = progress < 0.5
      ? 2 * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 2) / 2;
    
    window.scrollTo(0, startPosition + distance * easeProgress);
    
    if (elapsed < duration) {
      window.requestAnimationFrame(step);
    }
  }

  window.requestAnimationFrame(step);
}

/**
 * Apply passive event listeners for scroll events
 * 
 * This function adds passive event listeners to improve scroll performance
 */
export function applyPassiveScrollListeners(): void {
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
    }
  } catch (e) {
    // Silent catch - passive isn't supported
  }
}
