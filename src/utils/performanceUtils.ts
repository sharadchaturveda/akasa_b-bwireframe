/**
 * Performance Utilities Module
 *
 * Utilities for performance monitoring and optimization.
 */

import { PERFORMANCE } from '@/constants';
import { optimizeImages } from './imageUtils';
import { throttle } from './functionUtils';

/**
 * Creates a performance observer for the specified entry type
 *
 * @param {string} entryType - The type of entry to observe
 * @param {Function} callback - The callback to call when entries are observed
 * @returns {PerformanceObserver | null} The performance observer or null if not supported
 */
export const createPerformanceObserver = (
  entryType: string,
  callback: (entries: PerformanceEntry[]) => void
): PerformanceObserver | null => {
  // Return null if PerformanceObserver is not supported
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
    return null;
  }
  
  try {
    // Create a performance observer
    const observer = new PerformanceObserver((entryList) => {
      callback(entryList.getEntries());
    });
    
    // Start observing the specified entry type
    observer.observe({ type: entryType, buffered: true });
    
    return observer;
  } catch (error) {
    // Log error in development
    if (process.env.NODE_ENV !== 'production') {
      console.error(`Error creating performance observer for ${entryType}:`, error);
    }
    
    return null;
  }
};

/**
 * Monitors Largest Contentful Paint (LCP)
 *
 * @param {Function} callback - Optional callback to call with LCP value
 * @returns {PerformanceObserver | null} The performance observer or null if not supported
 */
export const monitorLCP = (
  callback?: (value: number) => void
): PerformanceObserver | null => {
  return createPerformanceObserver('largest-contentful-paint', (entries) => {
    const lastEntry = entries[entries.length - 1];
    const lcp = lastEntry.startTime;
    
    // Call the callback if provided
    if (callback) {
      callback(lcp);
    }
    
    // Log in development
    if (process.env.NODE_ENV !== 'production') {
      console.log('LCP:', lcp);
    }
  });
};

/**
 * Monitors Cumulative Layout Shift (CLS)
 *
 * @param {Function} callback - Optional callback to call with CLS value
 * @returns {PerformanceObserver | null} The performance observer or null if not supported
 */
export const monitorCLS = (
  callback?: (value: number) => void
): PerformanceObserver | null => {
  let clsValue = 0;
  let clsEntries: PerformanceEntry[] = [];
  
  return createPerformanceObserver('layout-shift', (entries) => {
    for (const entry of entries) {
      // Only count layout shifts without recent user input
      if (!(entry as any).hadRecentInput) {
        clsValue += (entry as any).value;
        clsEntries.push(entry);
      }
    }
    
    // Call the callback if provided
    if (callback) {
      callback(clsValue);
    }
    
    // Log in development
    if (process.env.NODE_ENV !== 'production') {
      console.log('CLS:', clsValue);
    }
  });
};

/**
 * Monitors First Input Delay (FID)
 *
 * @param {Function} callback - Optional callback to call with FID value
 * @returns {PerformanceObserver | null} The performance observer or null if not supported
 */
export const monitorFID = (
  callback?: (value: number) => void
): PerformanceObserver | null => {
  return createPerformanceObserver('first-input', (entries) => {
    const firstEntry = entries[0];
    const fid = firstEntry.processingStart - firstEntry.startTime;
    
    // Call the callback if provided
    if (callback) {
      callback(fid);
    }
    
    // Log in development
    if (process.env.NODE_ENV !== 'production') {
      console.log('FID:', fid);
    }
  });
};

/**
 * Monitors long tasks that might cause jank
 *
 * @param {Function} callback - Optional callback to call with long task duration
 * @returns {PerformanceObserver | null} The performance observer or null if not supported
 */
export const monitorLongTasks = (
  callback?: (duration: number) => void
): PerformanceObserver | null => {
  return createPerformanceObserver('longtask', (entries) => {
    entries.forEach(entry => {
      // Only log tasks longer than the threshold
      if (entry.duration > PERFORMANCE.LONG_TASK_THRESHOLD_MS) {
        // Call the callback if provided
        if (callback) {
          callback(entry.duration);
        }
        
        // Log in development
        if (process.env.NODE_ENV !== 'production') {
          console.log('Long task:', entry.duration, 'ms');
        }
      }
    });
  });
};

/**
 * Monitors user interactions
 *
 * @param {Function} callback - Optional callback to call with interaction data
 * @returns {PerformanceObserver | null} The performance observer or null if not supported
 */
export const monitorInteractions = (
  callback?: (duration: number, type: string) => void
): PerformanceObserver | null => {
  return createPerformanceObserver('event', (entries) => {
    entries.forEach(entry => {
      const interaction = entry as any;
      
      // Call the callback if provided
      if (callback) {
        callback(interaction.duration, interaction.name);
      }
      
      // Log in development
      if (process.env.NODE_ENV !== 'production') {
        console.log(`Interaction (${interaction.name}):`, interaction.duration, 'ms');
      }
    });
  });
};

/**
 * Preloads critical resources during idle time
 *
 * @param {Array<{url: string, type: 'image' | 'style' | 'script' | 'font'}>} resources - Resources to preload
 * @returns {void}
 */
export const preloadCriticalResources = (
  resources: Array<{url: string, type: 'image' | 'style' | 'script' | 'font'}>
): void => {
  // Return if running on the server
  if (typeof window === 'undefined' || !document || !document.head) return;
  
  // Function to preload resources
  const preloadResource = () => {
    resources.forEach(resource => {
      // Skip if already preloaded
      if (document.querySelector(`link[rel="preload"][href="${resource.url}"]`)) {
        return;
      }
      
      // Create preload link
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.url;
      
      // Set as attribute based on resource type
      switch (resource.type) {
        case 'image':
          link.as = 'image';
          break;
        case 'style':
          link.as = 'style';
          break;
        case 'script':
          link.as = 'script';
          break;
        case 'font':
          link.as = 'font';
          link.crossOrigin = 'anonymous';
          break;
      }
      
      // Add to document head
      document.head.appendChild(link);
    });
  };
  
  // Use requestIdleCallback for better performance
  if ('requestIdleCallback' in window) {
    try {
      window.requestIdleCallback(preloadResource, { timeout: PERFORMANCE.IDLE_CALLBACK_TIMEOUT_MS });
    } catch {
      setTimeout(preloadResource, PERFORMANCE.FALLBACK_TIMEOUT_MS);
    }
  } else {
    setTimeout(preloadResource, PERFORMANCE.FALLBACK_TIMEOUT_MS);
  }
};

/**
 * Initializes all performance monitoring
 *
 * @returns {void}
 */
export const initPerformanceMonitoring = (): void => {
  monitorLCP();
  monitorCLS();
  monitorFID();
  monitorLongTasks();
  monitorInteractions();
  
  // Optimize images
  optimizeImages();
};

/**
 * Applies performance optimizations for the page
 *
 * @returns {void}
 */
export const applyPerformanceOptimizations = (): void => {
  // Return if running on the server
  if (typeof window === 'undefined') return;
  
  // Initialize performance monitoring
  initPerformanceMonitoring();
  
  // Optimize images
  optimizeImages();
  
  // Create a throttled scroll handler
  const handleScroll = throttle(() => {
    // Re-optimize images that might have been added dynamically
    optimizeImages();
  }, 1000);
  
  // Add scroll event listener
  window.addEventListener('scroll', handleScroll);
  
  // Optimize font loading
  optimizeFontLoading();
};

/**
 * Optimizes font loading
 *
 * @returns {void}
 */
const optimizeFontLoading = (): void => {
  // Return if running on the server
  if (typeof window === 'undefined' || !document || !document.fonts) return;
  
  // Use the Font Loading API if available
  if ('fonts' in document) {
    document.fonts.ready.then(() => {
      // Add a class to the document when fonts are loaded
      document.documentElement.classList.add('fonts-loaded');
    });
  }
};
