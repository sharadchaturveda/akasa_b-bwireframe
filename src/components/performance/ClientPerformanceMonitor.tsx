"use client";

import { useEffect } from 'react';

export default function ClientPerformanceMonitor() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Mark the start of page load
    if (window.performance && window.performance.mark) {
      window.performance.mark('page_start');

      // Listen for when the page is fully loaded
      window.addEventListener('load', function() {
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
      });
    }

    // Defer non-critical JavaScript
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
  }, []);

  return null;
}
