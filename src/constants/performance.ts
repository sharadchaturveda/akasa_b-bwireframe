/**
 * Performance Constants
 * 
 * This file contains performance-related constants used throughout the application.
 */

/**
 * Performance constants
 */
export const PERFORMANCE = {
  /**
   * Threshold for long tasks in milliseconds
   */
  LONG_TASK_THRESHOLD_MS: 50,
  
  /**
   * Timeout for requestIdleCallback in milliseconds
   */
  IDLE_CALLBACK_TIMEOUT_MS: 2000,
  
  /**
   * Fallback timeout in milliseconds
   */
  FALLBACK_TIMEOUT_MS: 1000,
  
  /**
   * Threshold for lazy loading
   */
  LAZY_LOAD_THRESHOLD: 2,
};
