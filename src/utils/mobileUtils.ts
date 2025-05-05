/**
 * Mobile Utilities Module
 *
 * Utilities for mobile device detection and optimization.
 * Keeping mobile-specific code separate helps with maintainability and debugging.
 */

import { debounce } from './functionUtils';

// Re-export debounce from functionUtils for backward compatibility
export { debounce };

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
