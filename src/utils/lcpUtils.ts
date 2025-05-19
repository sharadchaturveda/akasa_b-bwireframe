/**
 * LCP (Largest Contentful Paint) Utilities
 * 
 * This file contains utility functions for optimizing and measuring LCP.
 */

/**
 * Options for tracking LCP
 */
export interface LCPTrackingOptions {
  /**
   * ID of the LCP element
   * @default 'lcp-image'
   */
  elementId?: string;
  
  /**
   * CSS class to add to the LCP element when loaded
   * @default 'loaded'
   */
  loadedClass?: string;
  
  /**
   * Whether to mark LCP loaded for performance measurement
   * @default true
   */
  markPerformance?: boolean;
  
  /**
   * Callback to execute when LCP is loaded
   */
  onLCPLoaded?: () => void;
}

/**
 * Tracks and optimizes the Largest Contentful Paint (LCP) element
 * 
 * This function finds the LCP element, adds a loaded class when it's loaded,
 * and marks the performance measurement.
 * 
 * @param {LCPTrackingOptions} options - Options for LCP tracking
 * @returns {() => void} A cleanup function
 */
export function trackLCPElement(options: LCPTrackingOptions = {}): () => void {
  // Set default options
  const {
    elementId = 'lcp-image',
    loadedClass = 'loaded',
    markPerformance = true,
    onLCPLoaded
  } = options;
  
  // Find the LCP element
  const lcpElement = document.getElementById(elementId) as HTMLImageElement;
  
  // If the element doesn't exist, return an empty cleanup function
  if (!lcpElement) {
    return () => {};
  }
  
  // Function to mark LCP as loaded
  const markLCPLoaded = () => {
    // Add the loaded class
    lcpElement.classList.add(loadedClass);
    
    // Mark performance if enabled
    if (markPerformance && window.performance && window.performance.mark) {
      window.performance.mark('lcp-loaded');
      
      // Measure time from navigation to LCP
      window.performance.measure('time-to-lcp', 'navigationStart', 'lcp-loaded');
      
      // Log in development
      if (process.env.NODE_ENV !== 'production') {
        const lcpMeasure = window.performance.getEntriesByName('time-to-lcp')[0];
        if (lcpMeasure) {
          console.log('LCP loaded in', lcpMeasure.duration.toFixed(2), 'ms');
        }
      }
    }
    
    // Call the callback if provided
    if (onLCPLoaded) {
      onLCPLoaded();
    }
  };
  
  // If the image is already loaded, mark it as loaded
  if (lcpElement.complete) {
    markLCPLoaded();
  } else {
    // Otherwise, add an onload handler
    lcpElement.onload = () => {
      markLCPLoaded();
    };
  }
  
  // Return a cleanup function
  return () => {
    if (lcpElement) {
      lcpElement.onload = null;
    }
  };
}

/**
 * Monitors LCP using PerformanceObserver
 * 
 * This function uses the PerformanceObserver API to monitor LCP.
 * 
 * @param {(value: number) => void} callback - Callback to execute with LCP value
 * @returns {() => void} A cleanup function
 */
export function monitorLCP(callback: (value: number) => void): () => void {
  // Return early if PerformanceObserver is not supported
  if (typeof PerformanceObserver === 'undefined') {
    return () => {};
  }
  
  // Create a performance observer for LCP
  const observer = new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    const lastEntry = entries[entries.length - 1];
    
    // Call the callback with the LCP value
    callback(lastEntry.startTime);
  });
  
  // Start observing LCP
  observer.observe({ type: 'largest-contentful-paint', buffered: true });
  
  // Return a cleanup function
  return () => {
    observer.disconnect();
  };
}
