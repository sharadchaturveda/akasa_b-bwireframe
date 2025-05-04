/**
 * Mobile Utilities Module
 *
 * Utilities for mobile device detection and optimization.
 * Keeping mobile-specific code separate helps with maintainability and debugging.
 */

/**
 * Detects if the current device is a mobile device
 *
 * @returns {boolean} True if the device is mobile, false otherwise
 */
export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;

  return window.innerWidth < 768 ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

/**
 * Optimizes images for mobile by setting appropriate loading attributes
 *
 * @returns {void}
 */
export const optimizeImagesForMobile = (): void => {
  if (typeof document === 'undefined') return;

  const images = document.querySelectorAll('img');

  images.forEach((img, index) => {
    // Only set loading=lazy for images that are not in the viewport initially
    if (index > 2) {
      img.setAttribute('loading', 'lazy');
    }

    // Set decoding to async for all images
    img.setAttribute('decoding', 'async');

    // Add error handling
    img.onerror = () => {
      img.style.display = 'none';
    };
  });
};

/**
 * Debounce function to limit the rate at which a function can fire
 *
 * @template T - Function type
 * @param {T} func - The function to debounce
 * @param {number} wait - The time to wait in milliseconds
 * @returns {(...args: Parameters<T>) => void} A debounced version of the function
 */
export function debounce<T extends (...args: never[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
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
