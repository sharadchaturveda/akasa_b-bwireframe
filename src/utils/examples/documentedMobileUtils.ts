/**
 * Documented Mobile Utilities
 *
 * This file contains fully documented utility functions for mobile device detection
 * and optimization. These functions serve as examples for how utilities should be
 * documented in the Akasa website project.
 */

/**
 * Detects if the current device is a mobile device
 *
 * This function uses a combination of user agent detection, touch support,
 * and screen size checks to determine if the current device is mobile.
 * It's used throughout the application to render mobile-specific components
 * and apply mobile optimizations.
 *
 * Detection criteria:
 * 1. Touch support (ontouchstart, maxTouchPoints)
 * 2. Screen size (width < 768px)
 * 3. User agent string (contains mobile device identifiers)
 *
 * @returns {boolean} True if the current device is a mobile device
 * 
 * @example
 * // Check if the current device is mobile
 * const isMobile = isMobileDevice();
 * 
 * if (isMobile) {
 *   // Render mobile-specific components
 * } else {
 *   // Render desktop components
 * }
 */
export function isMobileDevice(): boolean {
  // Return false if running on the server
  if (typeof window === 'undefined') return false;
  
  // Check for touch support
  const hasTouchSupport = 
    'ontouchstart' in window || 
    navigator.maxTouchPoints > 0 ||
    (navigator as any).msMaxTouchPoints > 0;
  
  // Check screen size
  const isSmallScreen = window.innerWidth < 768;
  
  // Check user agent for mobile devices
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobileUserAgent = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
  
  // Consider it a mobile device if it has touch support and either
  // has a small screen or a mobile user agent
  return hasTouchSupport && (isSmallScreen || isMobileUserAgent);
}

/**
 * Options for the debounce function
 */
interface DebounceOptions {
  /**
   * Whether to call the function on the leading edge of the timeout
   * @default false
   */
  leading?: boolean;
  
  /**
   * Whether to call the function on the trailing edge of the timeout
   * @default true
   */
  trailing?: boolean;
}

/**
 * Debounces a function to limit how often it can be called
 *
 * This utility prevents a function from being called too frequently,
 * which is useful for event handlers like scroll or resize that can
 * fire many times in quick succession.
 *
 * Performance considerations:
 * - Reduces the number of function calls for frequently triggered events
 * - Improves performance by preventing excessive calculations
 * - Particularly important on mobile devices with limited resources
 *
 * @param {Function} func - The function to debounce
 * @param {number} wait - The number of milliseconds to wait between calls
 * @param {DebounceOptions} options - Additional options for controlling behavior
 * @returns {Function} The debounced function
 *
 * @example
 * // Debounce a resize handler to run at most once every 200ms
 * const debouncedResizeHandler = debounce(() => {
 *   // Handle resize
 * }, 200);
 * 
 * window.addEventListener('resize', debouncedResizeHandler);
 * 
 * @example
 * // Debounce with leading edge execution
 * const debouncedHandler = debounce(() => {
 *   // Handle event
 * }, 200, { leading: true, trailing: false });
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  options: DebounceOptions = {}
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  let lastArgs: Parameters<T> | null = null;
  
  // Set default options
  const { leading = false, trailing = true } = options;
  
  return function(this: any, ...args: Parameters<T>): void {
    // Store the context and arguments for later use
    const context = this;
    lastArgs = args;
    
    // Function to execute the original function
    const later = () => {
      timeout = null;
      if (trailing && lastArgs) {
        func.apply(context, lastArgs);
        lastArgs = null;
      }
    };
    
    // If we're on the leading edge and the timeout doesn't exist
    const callNow = leading && !timeout;
    
    // Clear the existing timeout
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    
    // Set a new timeout
    timeout = setTimeout(later, wait);
    
    // If we're on the leading edge, call the function immediately
    if (callNow) {
      func.apply(context, args);
      lastArgs = null;
    }
  };
}

/**
 * Options for image optimization
 */
interface ImageOptimizationOptions {
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
}

/**
 * Optimizes images for mobile devices
 *
 * This function applies various optimizations to images for mobile devices:
 * - Sets loading="lazy" for images below the fold
 * - Sets decoding="async" for all images
 * - Adds error handling for broken images
 * 
 * Performance benefits:
 * - Reduces initial page load time by lazy loading non-critical images
 * - Improves perceived performance by prioritizing visible images
 * - Prevents layout shifts from broken images
 * - Optimizes memory usage on mobile devices
 *
 * @param {ImageOptimizationOptions} options - Options for image optimization
 * @returns {void}
 * 
 * @example
 * // Optimize images with default options
 * optimizeImagesForMobile();
 * 
 * @example
 * // Optimize images with custom options
 * optimizeImagesForMobile({
 *   priorityImageCount: 5,
 *   addErrorHandling: true,
 *   errorClass: 'image-error'
 * });
 */
export function optimizeImagesForMobile(options: ImageOptimizationOptions = {}): void {
  // Return early if running on the server
  if (typeof document === 'undefined') return;
  
  // Set default options
  const {
    priorityImageCount = 3,
    addErrorHandling = true,
    errorClass = 'hidden'
  } = options;
  
  // Get all images on the page
  const images = document.querySelectorAll('img');
  
  // Process each image
  images.forEach((img, index) => {
    // Only set loading=lazy for images that are not in the initial viewport
    if (index >= priorityImageCount) {
      img.setAttribute('loading', 'lazy');
    }
    
    // Set decoding to async for all images
    img.setAttribute('decoding', 'async');
    
    // Add error handling if enabled
    if (addErrorHandling) {
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
}

/**
 * Applies mobile-specific optimizations to the page
 *
 * This function applies various optimizations for mobile devices:
 * - Fixes viewport issues
 * - Improves touch behavior
 * - Prevents font size inflation
 * - Adds smooth scrolling
 * 
 * These optimizations improve the user experience on mobile devices
 * by addressing common mobile-specific issues.
 *
 * @returns {void}
 * 
 * @example
 * // Apply mobile optimizations
 * applyMobileOptimizations();
 */
export function applyMobileOptimizations(): void {
  // Return early if running on the server
  if (typeof document === 'undefined') return;
  
  // Fix any content that might be bleeding outside the viewport
  document.documentElement.style.overflowX = 'hidden';
  document.body.style.overflowX = 'hidden';
  
  // Ensure proper touch behavior
  document.documentElement.style.touchAction = 'manipulation';
  
  // Prevent font size inflation - using CSS variables approach
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    :root {
      -webkit-text-size-adjust: 100%;
      -moz-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
      text-size-adjust: 100%;
    }
  `;
  document.head.appendChild(styleElement);
  
  // Add smooth scrolling for better mobile experience
  document.documentElement.style.scrollBehavior = 'smooth';
  
  // Optimize scrolling performance
  document.documentElement.style.webkitOverflowScrolling = 'touch';
}
