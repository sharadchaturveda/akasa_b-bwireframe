/**
 * Image Utilities Module
 *
 * Utilities for image optimization and handling.
 */

import { IMAGES, PERFORMANCE } from '@/constants';

/**
 * Options for image optimization
 */
export interface ImageOptimizationOptions {
  /**
   * Number of images to prioritize (not lazy-loaded)
   * @default 3
   */
  priorityImageCount?: number;
  
  /**
   * Whether to add error handling to images
   * @default true
   */
  addErrorHandling?: boolean;
  
  /**
   * CSS class to apply to images on error
   * @default "hidden"
   */
  errorClass?: string;
  
  /**
   * Whether to optimize background images
   * @default true
   */
  optimizeBackgrounds?: boolean;
}

/**
 * Optimizes images for better performance
 *
 * This function applies various optimizations to images:
 * - Sets loading="lazy" for images below the fold
 * - Sets decoding="async" for all images
 * - Adds error handling for broken images
 * - Optimizes background images with data-background attributes
 *
 * @param {ImageOptimizationOptions} options - Options for image optimization
 * @returns {void}
 */
export const optimizeImages = (options: ImageOptimizationOptions = {}): void => {
  // Return early if running on the server
  if (typeof document === 'undefined') return;
  
  // Set default options
  const {
    priorityImageCount = PERFORMANCE.LAZY_LOAD_THRESHOLD,
    addErrorHandling = true,
    errorClass = 'hidden',
    optimizeBackgrounds = true
  } = options;
  
  // Optimize regular images
  optimizeRegularImages(priorityImageCount, addErrorHandling, errorClass);
  
  // Optimize background images
  if (optimizeBackgrounds) {
    optimizeBackgroundImages();
  }
};

/**
 * Optimizes regular images
 *
 * @param {number} priorityImageCount - Number of images to prioritize
 * @param {boolean} addErrorHandling - Whether to add error handling
 * @param {string} errorClass - CSS class to apply on error
 * @returns {void}
 */
const optimizeRegularImages = (
  priorityImageCount: number,
  addErrorHandling: boolean,
  errorClass: string
): void => {
  // Get all images on the page
  const images = document.querySelectorAll('img');
  
  // Process each image
  images.forEach((img, index) => {
    // Only set loading=lazy for images that are not in the initial viewport
    if (index >= priorityImageCount && !img.hasAttribute('loading')) {
      img.setAttribute('loading', 'lazy');
    }
    
    // Set decoding to async for all images
    if (!img.hasAttribute('decoding')) {
      img.setAttribute('decoding', 'async');
    }
    
    // Add fetchpriority for important images
    if (index < priorityImageCount && !img.hasAttribute('fetchpriority')) {
      img.setAttribute('fetchpriority', 'high');
    } else if (!img.hasAttribute('fetchpriority')) {
      img.setAttribute('fetchpriority', 'auto');
    }
    
    // Add error handling if enabled
    if (addErrorHandling && !img.hasAttribute('onerror')) {
      img.onerror = () => {
        // Add error class to hide or style broken images
        img.classList.add(errorClass);
        
        // Log error in development
        if (process.env.NODE_ENV !== 'production') {
          console.error(`Image failed to load: ${img.src}`);
        }
      };
    }
  });
};

/**
 * Optimizes background images
 *
 * @returns {void}
 */
const optimizeBackgroundImages = (): void => {
  // Return if IntersectionObserver is not supported
  if (!('IntersectionObserver' in window)) return;
  
  // Create an observer for lazy-loading background images
  const lazyBackgroundObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target as HTMLElement;
        if (element.dataset.background) {
          element.style.backgroundImage = element.dataset.background;
          element.removeAttribute('data-background');
          lazyBackgroundObserver.unobserve(element);
        }
      }
    });
  });
  
  // Observe all elements with data-background attribute
  document.querySelectorAll('[data-background]').forEach((el) => {
    lazyBackgroundObserver.observe(el);
  });
};

/**
 * Preloads critical images
 *
 * @param {string[]} imagePaths - Paths to critical images
 * @returns {Promise<void>} A promise that resolves when all images are loaded
 */
export const preloadCriticalImages = (imagePaths: string[]): Promise<void> => {
  // Return early if running on the server
  if (typeof window === 'undefined') return Promise.resolve();
  
  // Create a promise for each image
  const imagePromises = imagePaths.map((src) => {
    return new Promise<void>((resolve) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve();
      img.onerror = () => resolve(); // Resolve even on error to avoid blocking
    });
  });
  
  // Return a promise that resolves when all images are loaded
  return Promise.all(imagePromises).then(() => {});
};

/**
 * Marks an image as loaded
 *
 * @param {string} imageId - ID of the image element
 * @returns {void}
 */
export const markImageAsLoaded = (imageId: string): void => {
  // Return early if running on the server
  if (typeof document === 'undefined') return;
  
  // Get the image element
  const image = document.getElementById(imageId) as HTMLImageElement;
  
  // If the image exists, mark it as loaded
  if (image) {
    if (image.complete) {
      image.classList.add('loaded');
    } else {
      image.onload = () => {
        image.classList.add('loaded');
      };
    }
  }
};
