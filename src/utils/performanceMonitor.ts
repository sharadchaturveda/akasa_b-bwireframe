"use client";

/**
 * Utility for monitoring and optimizing web performance metrics
 * Tracks Core Web Vitals and other performance metrics
 */

/**
 * Interface for LayoutShift entries
 */
interface LayoutShiftEntry extends PerformanceEntry {
  hadRecentInput: boolean;
  value: number;
}

/**
 * Interface for FirstInput entries
 */
interface FirstInputEntry extends PerformanceEntry {
  name: string;
  duration: number;
}

/**
 * Creates a performance observer with error handling
 * @param entryType The type of performance entry to observe
 * @param callback The callback to run when entries are observed
 * @returns A cleanup function to disconnect the observer
 */
const createPerformanceObserver = (
  entryType: string,
  callback: (entries: PerformanceEntry[]) => void
): (() => void) | undefined => {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

  try {
    const observer = new PerformanceObserver((entryList) => {
      callback(entryList.getEntries());
    });

    observer.observe({ type: entryType, buffered: true });

    return () => observer.disconnect();
  } catch (error) {
    // Silent catch in production
    return undefined;
  }
};

// Track Largest Contentful Paint (LCP)
export const monitorLCP = () => {
  return createPerformanceObserver('largest-contentful-paint', (entries) => {
    // We don't need to do anything with the entries in production
    // In a real app, we would send this to analytics
  });
};

// Track Cumulative Layout Shift (CLS)
export const monitorCLS = () => {
  let clsValue = 0;

  return createPerformanceObserver('layout-shift', (entries) => {
    entries.forEach(entry => {
      const layoutShift = entry as LayoutShiftEntry;
      if (!layoutShift.hadRecentInput) {
        clsValue += layoutShift.value;
      }
    });
    // We would send this to analytics in a real app
  });
};

// Track First Input Delay (FID) / Interaction to Next Paint (INP)
export const monitorInteractions = () => {
  return createPerformanceObserver('first-input', (entries) => {
    // We would send this to analytics in a real app
  });
};

// Track long tasks that might cause jank
export const monitorLongTasks = () => {
  return createPerformanceObserver('longtask', (entries) => {
    // We would send this to analytics in a real app
  });
};

// Preload critical resources during idle time
export const preloadCriticalResources = (resources: { url: string, type: 'image' | 'style' | 'script' | 'font' }[]) => {
  if (typeof window === 'undefined' || !document || !document.head) return;

  const preloadResource = () => {
    resources.forEach(resource => {
      // Skip if already preloaded
      const existingLink = document.querySelector(`link[rel="preload"][href="${resource.url}"]`);
      if (existingLink) return;

      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.url;

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

      document.head.appendChild(link);
    });
  };

  // Use requestIdleCallback for better performance
  if ('requestIdleCallback' in window) {
    try {
      window.requestIdleCallback(preloadResource, { timeout: 2000 });
    } catch {
      setTimeout(preloadResource, 1000);
    }
  } else {
    setTimeout(preloadResource, 1000);
  }
};

// Initialize all performance monitoring
export const initPerformanceMonitoring = () => {
  monitorLCP();
  monitorCLS();
  monitorInteractions();
  monitorLongTasks();

  // Preload critical resources for other pages
  preloadCriticalResources([
    { url: '/images/events/event1.jpg', type: 'image' },
    { url: '/styles/menu.css', type: 'style' },
    { url: '/styles/events.css', type: 'style' }
  ]);
};
