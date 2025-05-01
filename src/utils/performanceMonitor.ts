"use client";

/**
 * Utility for monitoring and optimizing web performance metrics
 */

// Track Largest Contentful Paint (LCP)
export const monitorLCP = () => {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

  try {
    // Use a try-catch block to handle potential browser compatibility issues
    try {
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        if (entries.length > 0) {
          const lcpEntry = entries[entries.length - 1];

          console.log('LCP:', lcpEntry.startTime, 'ms');

          // Report to analytics if needed
          // sendToAnalytics('lcp', lcpEntry.startTime);
        }
      });

      // Some browsers might not support this entry type
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

      return () => {
        lcpObserver.disconnect();
      };
    } catch (observerError) {
      console.warn('LCP observer not supported:', observerError);
    }
  } catch (e) {
    console.error('Error monitoring LCP:', e);
  }
};

// Track Cumulative Layout Shift (CLS)
export const monitorCLS = () => {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

  try {
    let clsValue = 0;
    let clsEntries: PerformanceEntry[] = [];

    // Use a try-catch block to handle potential browser compatibility issues
    try {
      const clsObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries() as PerformanceEntry[];

        entries.forEach(entry => {
          // Only count layout shifts without recent user input
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
            clsEntries.push(entry);
          }
        });

        console.log('Current CLS:', clsValue);

        // Report to analytics if needed
        // sendToAnalytics('cls', clsValue);
      });

      clsObserver.observe({ type: 'layout-shift', buffered: true });

      return () => {
        clsObserver.disconnect();
      };
    } catch (observerError) {
      console.warn('CLS observer not supported:', observerError);
    }
  } catch (e) {
    console.error('Error monitoring CLS:', e);
  }
};

// Track First Input Delay (FID) / Interaction to Next Paint (INP)
export const monitorInteractions = () => {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

  try {
    // Use a try-catch block to handle potential browser compatibility issues
    try {
      const interactionObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();

        entries.forEach(entry => {
          console.log('Interaction:', (entry as any).name, (entry as any).duration, 'ms');

          // Report to analytics if needed
          // sendToAnalytics('interaction', entry.duration);
        });
      });

      // Some browsers might not support this entry type
      interactionObserver.observe({ type: 'first-input', buffered: true });

      return () => {
        interactionObserver.disconnect();
      };
    } catch (observerError) {
      console.warn('Interaction observer not supported:', observerError);
    }
  } catch (e) {
    console.error('Error monitoring interactions:', e);
  }
};

// Track long tasks that might cause jank
export const monitorLongTasks = () => {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

  try {
    // Use a try-catch block to handle potential browser compatibility issues
    try {
      const longTaskObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();

        entries.forEach(entry => {
          // Log tasks longer than 50ms
          if (entry.duration > 50) {
            console.log('Long task:', entry.duration, 'ms');

            // Report to analytics if needed
            // sendToAnalytics('long-task', entry.duration);
          }
        });
      });

      // Some browsers might not support this entry type
      longTaskObserver.observe({ type: 'longtask', buffered: true });

      return () => {
        longTaskObserver.disconnect();
      };
    } catch (observerError) {
      console.warn('Long task observer not supported:', observerError);
    }
  } catch (e) {
    console.error('Error monitoring long tasks:', e);
  }
};

// Preload critical resources during idle time
export const preloadCriticalResources = (resources: { url: string, type: 'image' | 'style' | 'script' | 'font' }[]) => {
  if (typeof window === 'undefined' || !document || !document.head) return;

  try {
    const preloadResource = () => {
      resources.forEach(resource => {
        try {
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
        } catch (resourceError) {
          console.warn(`Failed to preload resource: ${resource.url}`, resourceError);
        }
      });
    };

    // Use requestIdleCallback for better performance
    if ('requestIdleCallback' in window) {
      try {
        (window as any).requestIdleCallback(preloadResource, { timeout: 2000 });
      } catch (idleCallbackError) {
        // Fallback to setTimeout if requestIdleCallback fails
        setTimeout(preloadResource, 1000);
      }
    } else {
      setTimeout(preloadResource, 1000);
    }
  } catch (e) {
    console.error('Error preloading critical resources:', e);
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
    { url: '/images/menu/chef.jpg', type: 'image' },
    { url: '/images/events/event1.jpg', type: 'image' },
    { url: '/styles/menu.css', type: 'style' },
    { url: '/styles/events.css', type: 'style' }
  ]);
};
