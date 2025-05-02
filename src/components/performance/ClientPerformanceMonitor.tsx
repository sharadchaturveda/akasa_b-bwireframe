"use client";

import { useEffect } from 'react';

export default function ClientPerformanceMonitor() {
  useEffect(() => {
    // Mark the start of page load
    if (typeof window !== 'undefined' && window.performance && window.performance.mark) {
      // Use setTimeout to ensure this runs after hydration is complete
      setTimeout(() => {
        window.performance.mark('page_start');

        // Listen for when the page is fully loaded
        const handleLoad = () => {
          window.performance.mark('page_loaded');

          // Measure the time between start and load
          window.performance.measure('page_load_time', 'page_start', 'page_loaded');

          // Get the measurement
          const pageLoadMeasure = window.performance.getEntriesByName('page_load_time')[0];

          // Log the measurement (could be sent to analytics in production)
          console.log('Page load time: ' + pageLoadMeasure.duration.toFixed(2) + 'ms');

          // Measure First Contentful Paint if available
          const paintEntries = window.performance.getEntriesByType('paint');
          const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');

          if (fcpEntry) {
            console.log('First Contentful Paint: ' + fcpEntry.startTime.toFixed(2) + 'ms');
          }
        };

        // Check if the page is already loaded
        if (document.readyState === 'complete') {
          handleLoad();
        } else {
          window.addEventListener('load', handleLoad);
        }

        return () => {
          window.removeEventListener('load', handleLoad);
        };
      }, 0);
    }

    // Defer non-critical JavaScript
    if (typeof window !== 'undefined') {
      // Use setTimeout to ensure this runs after hydration is complete
      setTimeout(() => {
        const scheduleTask = window.requestIdleCallback || window.setTimeout;

        const handleDOMContentLoaded = () => {
          // Add a small delay to prioritize rendering
          scheduleTask(function() {
            // Load non-critical resources after page is interactive
            const links = document.querySelectorAll('link[data-defer]');
            for (let i = 0; i < links.length; i++) {
              const link = links[i] as HTMLLinkElement;
              if (link.getAttribute('data-href')) {
                link.setAttribute('href', link.getAttribute('data-href') || '');
                link.removeAttribute('data-defer');
              }
            }

            // Optimize image loading for visible images
            if ('IntersectionObserver' in window) {
              const lazyImageObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                  if (entry.isIntersecting) {
                    const lazyImage = entry.target as HTMLImageElement;
                    if (lazyImage.dataset.src) {
                      lazyImage.src = lazyImage.dataset.src;
                      lazyImage.removeAttribute('data-src');
                      lazyImageObserver.unobserve(lazyImage);
                    }
                  }
                });
              });

              document.querySelectorAll('img[data-src]').forEach((img) => {
                lazyImageObserver.observe(img);
              });
            }

            // Optimize background images
            if ('IntersectionObserver' in window) {
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

              document.querySelectorAll('[data-background]').forEach((el) => {
                lazyBackgroundObserver.observe(el);
              });
            }
          }, { timeout: 1000 });
        };

        // Check if DOMContentLoaded already fired
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
        } else {
          handleDOMContentLoaded();
        }

        return () => {
          document.removeEventListener('DOMContentLoaded', handleDOMContentLoaded);
        };
      }, 0);
    }
  }, []);

  return null;
}
