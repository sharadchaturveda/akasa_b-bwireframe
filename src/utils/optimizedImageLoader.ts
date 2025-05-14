/**
 * Optimized Image Loader
 *
 * A utility for optimizing image loading and preventing reloads during scroll.
 * This implementation uses a single IntersectionObserver instance to handle
 * all image loading, which is more efficient than creating multiple observers.
 */

import { IMAGES } from '@/constants';

// Store observer instances to prevent recreation
let imageObserver: IntersectionObserver | null = null;
let backgroundObserver: IntersectionObserver | null = null;

// Track which images have already been processed to prevent duplicate processing
const processedImages = new Set<string>();
const processedBackgrounds = new Set<string>();

/**
 * Initialize optimized image loading
 *
 * This function sets up a single IntersectionObserver for all images
 * and applies optimizations to prevent reloading during scroll.
 */
export function initOptimizedImageLoading(): void {
  // Return early if running on the server
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  // Only initialize once
  if (imageObserver) {
    return;
  }

  // Create a single observer for all images
  imageObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;

          // Generate a unique ID for this image
          const imageId = img.src || img.id || `img-${img.getAttribute('alt')}`;

          // Skip if already processed
          if (processedImages.has(imageId)) {
            return;
          }

          // Mark as processed
          processedImages.add(imageId);

          // Handle data-src attribute if present
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }

          // Stop observing this image
          imageObserver?.unobserve(img);
        }
      });
    },
    {
      rootMargin: '500px', // Load images before they come into view
      threshold: 0.01 // Trigger when just 1% of the element is visible
    }
  );

  // Create a single observer for background images
  backgroundObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;

          // Generate a unique ID for this element
          const elementId = element.id || `bg-${element.className.replace(/\s+/g, '-')}`;

          // Skip if already processed
          if (processedBackgrounds.has(elementId)) {
            return;
          }

          // Mark as processed
          processedBackgrounds.add(elementId);

          // Handle data-background attribute if present
          if (element.dataset.background) {
            element.style.backgroundImage = element.dataset.background;
            element.removeAttribute('data-background');
          }

          // Stop observing this element
          backgroundObserver?.unobserve(element);
        }
      });
    },
    {
      rootMargin: '500px', // Load backgrounds before they come into view
      threshold: 0.01 // Trigger when just 1% of the element is visible
    }
  );

  // Apply optimizations to all images
  optimizeAllImages();
}

/**
 * Optimize all images on the page
 */
function optimizeAllImages(): void {
  // Set appropriate attributes on all images
  document.querySelectorAll('img').forEach((img, index) => {
    // Set decoding to async for all images
    if (!img.hasAttribute('decoding')) {
      img.setAttribute('decoding', 'async');
    }

    // Only observe images that aren't already loaded
    if (!img.complete && !processedImages.has(img.src)) {
      imageObserver?.observe(img);
    }
  });

  // Observe all elements with data-background attribute
  document.querySelectorAll('[data-background]').forEach((el) => {
    backgroundObserver?.observe(el);
  });
}

/**
 * Clean up observers
 */
export function cleanupImageObservers(): void {
  if (imageObserver) {
    imageObserver.disconnect();
    imageObserver = null;
  }

  if (backgroundObserver) {
    backgroundObserver.disconnect();
    backgroundObserver = null;
  }

  // Clear processed sets
  processedImages.clear();
  processedBackgrounds.clear();
}
