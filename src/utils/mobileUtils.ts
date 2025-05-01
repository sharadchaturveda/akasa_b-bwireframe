/**
 * Mobile Utilities Module
 *
 * This module contains utilities specifically for mobile optimization.
 * Keeping mobile-specific code separate helps with maintainability and debugging.
 */

/**
 * Detects if the current device is a mobile device
 * @returns boolean indicating if the device is mobile
 */
export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;

  return window.innerWidth < 768 ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

/**
 * Applies mobile-specific optimizations to the document
 */
export const applyMobileOptimizations = (): void => {
  if (typeof document === 'undefined') return;

  // Fix any content that might be bleeding outside the viewport
  document.documentElement.style.overflowX = 'hidden';
  document.body.style.overflowX = 'hidden';

  // Ensure proper touch behavior
  document.documentElement.style.touchAction = 'manipulation';

  // Prevent font size inflation
  document.documentElement.style.textSizeAdjust = '100%';

  // Add smooth scrolling for better mobile experience
  document.documentElement.style.scrollBehavior = 'smooth';

  // Fix any potential z-index issues with fixed elements
  const fixedElements = document.querySelectorAll('.fixed');
  fixedElements.forEach(el => {
    (el as HTMLElement).style.backfaceVisibility = 'hidden';
    (el as HTMLElement).style.WebkitBackfaceVisibility = 'hidden';
  });

  // Apply passive event listeners for better scrolling performance
  const supportsPassive = checkPassiveSupport();
  if (supportsPassive) {
    const wheelOpt = { passive: true } as EventListenerOptions;
    window.addEventListener('touchstart', () => {}, wheelOpt);
    window.addEventListener('touchmove', () => {}, wheelOpt);
    window.addEventListener('wheel', () => {}, wheelOpt);
  }
};

/**
 * Checks if the browser supports passive event listeners
 * @returns boolean indicating if passive event listeners are supported
 */
const checkPassiveSupport = (): boolean => {
  let supportsPassive = false;
  try {
    const opts = Object.defineProperty({}, 'passive', {
      get: function() {
        supportsPassive = true;
        return true;
      }
    });
    window.addEventListener('testPassive', () => {}, opts);
    window.removeEventListener('testPassive', () => {}, opts);
  } catch (e) {}

  return supportsPassive;
};

/**
 * Optimizes images for mobile by setting appropriate loading attributes
 */
export const optimizeImagesForMobile = (): void => {
  if (typeof document === 'undefined') return;

  const images = document.querySelectorAll('img');
  images.forEach((img, index) => {
    // Only set loading=lazy for images that are not in the viewport initially
    if (index > 2) {
      img.loading = 'lazy';
    }

    // Set decoding to async for all images
    img.decoding = 'async';

    // Add error handling
    img.onerror = () => {
      img.style.display = 'none';
    };
  });
};

/**
 * Debounce function to limit the rate at which a function can fire
 * @param func The function to debounce
 * @param wait The time to wait in milliseconds
 * @returns A debounced version of the function
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
};
