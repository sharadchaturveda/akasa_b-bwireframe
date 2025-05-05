/**
 * Function Utilities Module
 *
 * Utilities for function manipulation and optimization.
 */

/**
 * Options for the debounce function
 */
export interface DebounceOptions {
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
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  options: DebounceOptions = {}
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  let lastArgs: Parameters<T> | null = null;
  let lastThis: any = null;
  
  // Set default options
  const { leading = false, trailing = true } = options;
  
  return function(this: any, ...args: Parameters<T>): void {
    // Store the context and arguments for later use
    lastThis = this;
    lastArgs = args;
    
    // Function to execute the original function
    const later = () => {
      timeout = null;
      if (trailing && lastArgs) {
        func.apply(lastThis, lastArgs);
        lastArgs = null;
        lastThis = null;
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
      func.apply(this, args);
      lastArgs = null;
      lastThis = null;
    }
  };
}

/**
 * Throttles a function to limit how often it can be called
 *
 * Unlike debounce, throttle guarantees the function is called
 * at most once every `wait` milliseconds.
 *
 * @param {Function} func - The function to throttle
 * @param {number} wait - The number of milliseconds to wait between calls
 * @returns {Function} The throttled function
 *
 * @example
 * // Throttle a scroll handler to run at most once every 100ms
 * const throttledScrollHandler = throttle(() => {
 *   // Handle scroll
 * }, 100);
 * 
 * window.addEventListener('scroll', throttledScrollHandler);
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  let lastArgs: Parameters<T> | null = null;
  let lastThis: any = null;
  let lastCallTime = 0;
  
  return function(this: any, ...args: Parameters<T>): void {
    const now = Date.now();
    
    // Store the context and arguments for later use
    lastThis = this;
    lastArgs = args;
    
    // If this is the first call or enough time has passed
    if (lastCallTime === 0 || now - lastCallTime >= wait) {
      lastCallTime = now;
      func.apply(this, args);
      lastArgs = null;
      lastThis = null;
    } else if (timeout === null) {
      // Schedule a call for when the wait time has passed
      timeout = setTimeout(() => {
        lastCallTime = Date.now();
        timeout = null;
        if (lastArgs) {
          func.apply(lastThis, lastArgs);
          lastArgs = null;
          lastThis = null;
        }
      }, wait - (now - lastCallTime));
    }
  };
}

/**
 * Creates a memoized version of a function
 *
 * The function will only be called once for each unique set of arguments,
 * and the result will be cached for subsequent calls with the same arguments.
 *
 * @param {Function} func - The function to memoize
 * @returns {Function} The memoized function
 *
 * @example
 * // Memoize an expensive calculation
 * const memoizedCalculation = memoize((a, b) => {
 *   console.log('Calculating...');
 *   return a + b;
 * });
 * 
 * memoizedCalculation(1, 2); // Logs 'Calculating...' and returns 3
 * memoizedCalculation(1, 2); // Returns 3 without logging
 */
export function memoize<T extends (...args: any[]) => any>(
  func: T
): (...args: Parameters<T>) => ReturnType<T> {
  const cache = new Map<string, ReturnType<T>>();
  
  return function(this: any, ...args: Parameters<T>): ReturnType<T> {
    // Create a key from the arguments
    const key = JSON.stringify(args);
    
    // If the result is already cached, return it
    if (cache.has(key)) {
      return cache.get(key) as ReturnType<T>;
    }
    
    // Otherwise, call the function and cache the result
    const result = func.apply(this, args);
    cache.set(key, result);
    
    return result;
  };
}
