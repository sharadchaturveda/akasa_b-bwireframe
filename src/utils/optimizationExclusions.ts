/**
 * Utility to manage components that should be excluded from performance optimizations
 */

// List of selectors for elements that should be excluded from performance optimizations
export const EXCLUDED_SELECTORS = [
  // Clean Dining Info component
  '.dining-info-container',
  '.dining-info-section-with-icon',
  '.dining-info-content',
  '.dining-info-icon',
  '.dining-info-label-value',

  // Legacy ReservationInfo component - kept for backward compatibility
  '.bg-black\\/40.backdrop-blur-sm',
  '.backdrop-blur-sm',
  '[data-exclude-optimization="true"]',
  '.content-container',
  '.icon-container',
  '.label-span',

  // Any element with inline styles that match ReservationInfo component
  '[style*="flex-grow"]',
  '[style*="flex-shrink"]'
];

/**
 * Checks if an element should be excluded from performance optimizations
 *
 * @param element The element to check
 * @returns True if the element should be excluded, false otherwise
 */
export const shouldExcludeFromOptimization = (element: Element): boolean => {
  // Check if the element matches any of the excluded selectors
  return EXCLUDED_SELECTORS.some(selector => {
    try {
      return element.matches(selector);
    } catch (e) {
      return false;
    }
  });
};

/**
 * Checks if an element or any of its ancestors should be excluded from performance optimizations
 *
 * @param element The element to check
 * @returns True if the element or any of its ancestors should be excluded, false otherwise
 */
export const isInExcludedTree = (element: Element): boolean => {
  let current: Element | null = element;

  // Check the element and all its ancestors
  while (current) {
    if (shouldExcludeFromOptimization(current)) {
      return true;
    }
    current = current.parentElement;
  }

  return false;
};
