# Utility Function Documentation Template

This file provides a template for documenting utility functions in the Akasa website project. Use this template when creating new utility functions or updating existing ones.

## File Header Template

```typescript
/**
 * Utility Name
 *
 * This file contains utility functions for [specific purpose].
 * These functions are used throughout the application for [specific tasks].
 */
```

## Function Documentation Template

```typescript
/**
 * Function name
 *
 * Detailed description of what this function does.
 * Include information about:
 * - When to use this function
 * - Any important implementation details
 * - Any performance considerations
 * - Edge cases or limitations
 *
 * @param {ParamType} paramName - Description of the parameter
 * @param {AnotherType} anotherParam - Description of another parameter
 * @returns {ReturnType} Description of the return value
 *
 * @example
 * // Basic usage
 * const result = functionName(param1, param2);
 *
 * @example
 * // Advanced usage
 * const result = functionName(param1, param2, { option: value });
 */
export function functionName(
  paramName: ParamType,
  anotherParam: AnotherType,
  options?: OptionsType
): ReturnType {
  // Function implementation
}
```

## Type Documentation Template

```typescript
/**
 * Description of what this type represents
 */
export type TypeName = string | number;

/**
 * Description of what this interface represents
 */
export interface InterfaceName {
  /**
   * Description of this property
   */
  propertyName: string;
  
  /**
   * Description of this optional property
   */
  optionalProperty?: number;
}
```

## Constants Documentation Template

```typescript
/**
 * Description of what this constant represents and how it's used
 */
export const CONSTANT_NAME = 'value';

/**
 * Description of what this configuration object represents
 */
export const CONFIG = {
  /**
   * Description of this configuration property
   */
  property: 'value',
  
  /**
   * Description of this nested configuration
   */
  nested: {
    /**
     * Description of this nested property
     */
    property: 'value'
  }
};
```

## Performance Considerations Documentation

When implementing performance-sensitive functions, document the considerations:

```typescript
/**
 * Optimized function for processing large data sets
 *
 * This function uses memoization to cache results and avoid
 * redundant calculations. The time complexity is O(n) where
 * n is the size of the input array.
 *
 * Performance considerations:
 * - Uses memoization for repeated calls with the same input
 * - Avoids unnecessary array iterations
 * - Uses Set for O(1) lookups instead of array.includes()
 *
 * @param {Array<T>} data - The data to process
 * @returns {Array<R>} The processed data
 */
export function processLargeData<T, R>(data: Array<T>): Array<R> {
  // Implementation with performance optimizations
}
```

## Mobile-Specific Utility Documentation

When implementing mobile-specific utilities, document the reasoning:

```typescript
/**
 * Detects if the current device is a mobile device
 *
 * This function uses a combination of user agent detection and
 * screen size checks to determine if the current device is mobile.
 * It's used throughout the application to render mobile-specific
 * components and apply mobile optimizations.
 *
 * @returns {boolean} True if the current device is a mobile device
 */
export function isMobileDevice(): boolean {
  // Implementation
}

/**
 * Optimizes images for mobile devices
 *
 * This function applies various optimizations to images for mobile devices:
 * - Sets loading="lazy" for images below the fold
 * - Sets decoding="async" for all images
 * - Adds error handling for broken images
 *
 * @returns {void}
 */
export function optimizeImagesForMobile(): void {
  // Implementation
}
```

## Example Utility File with Documentation

```typescript
/**
 * Mobile Utilities
 *
 * This file contains utility functions for mobile device detection and optimization.
 * These functions are used throughout the application to provide a better experience
 * for mobile users.
 */

/**
 * Detects if the current device is a mobile device
 *
 * This function uses a combination of user agent detection and
 * screen size checks to determine if the current device is mobile.
 * It's used throughout the application to render mobile-specific
 * components and apply mobile optimizations.
 *
 * @returns {boolean} True if the current device is a mobile device
 */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  
  // Check for touch support
  const hasTouchSupport = 'ontouchstart' in window || 
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
 * Debounces a function to limit how often it can be called
 *
 * This utility prevents a function from being called too frequently,
 * which is useful for event handlers like scroll or resize.
 *
 * @param {Function} func - The function to debounce
 * @param {number} wait - The number of milliseconds to wait between calls
 * @returns {Function} The debounced function
 *
 * @example
 * // Debounce a resize handler to run at most once every 200ms
 * const debouncedResizeHandler = debounce(() => {
 *   // Handle resize
 * }, 200);
 * 
 * window.addEventListener('resize', debouncedResizeHandler);
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function(...args: Parameters<T>): void {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    
    timeout = setTimeout(later, wait);
  };
}

/**
 * Optimizes images for mobile devices
 *
 * This function applies various optimizations to images for mobile devices:
 * - Sets loading="lazy" for images below the fold
 * - Sets decoding="async" for all images
 * - Adds error handling for broken images
 *
 * @returns {void}
 */
export function optimizeImagesForMobile(): void {
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
}
```

## Conclusion

Following these documentation standards ensures that all utility functions are well-documented and easy to understand for new developers joining the project. Consistent documentation also makes maintenance easier and helps prevent bugs caused by misunderstanding function behavior.
