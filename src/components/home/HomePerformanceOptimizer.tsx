"use client";

import { useEffect } from 'react';
import { initPerformanceMonitoring } from '@/utils/performanceMonitor';

/**
 * HomePerformanceOptimizer Component
 *
 * Applies performance optimizations for the homepage.
 * This is a client-side only component that doesn't render anything.
 *
 * @returns {null} This component doesn't render anything
 */
export default function HomePerformanceOptimizer() {
  useEffect(() => {
    // Initialize performance monitoring
    initPerformanceMonitoring();

    // Define the optimization function inside useEffect
    const applyOptimizations = () => {
      optimizeImageLoading();
      optimizeAnimations();
      optimizeScrolling();
      optimizeFontLoading();
    };

    const optimizeImageLoading = () => {
      // Add loading="lazy" to images below the fold
      document.querySelectorAll('img:not([loading])').forEach((img) => {
        const rect = img.getBoundingClientRect();
        if (rect.top > window.innerHeight) {
          img.setAttribute('loading', 'lazy');
        }
      });

      // Add fetchpriority="low" to non-critical images
      document.querySelectorAll('img:not([fetchpriority])').forEach((img) => {
        const rect = img.getBoundingClientRect();
        if (rect.top > window.innerHeight * 2) {
          img.setAttribute('fetchpriority', 'low');
        }
      });
    };

    const optimizeAnimations = () => {
      // Disable animations for users who prefer reduced motion
      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.classList.add('reduce-motion');

        // Add a style element to reduce animations
        const style = document.createElement('style');
        style.textContent = `
          .reduce-motion * {
            animation-duration: 0.001ms !important;
            transition-duration: 0.001ms !important;
          }
        `;
        document.head.appendChild(style);
      }

      // Pause animations that are not in viewport
      const animatedElements = document.querySelectorAll('.animate-fadeIn, .animate-fadeSlideUp, .animate-float');

      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-running');
            } else {
              entry.target.classList.remove('animate-running');
            }
          });
        });

        animatedElements.forEach(el => observer.observe(el));
      }
    };

    const optimizeScrolling = () => {
      // Use passive event listeners for scroll events
      let supportsPassive = false;
      try {
        const opts = Object.defineProperty({}, 'passive', {
          get: function() {
            supportsPassive = true;
            return true;
          }
        });
        window.addEventListener('test', () => {}, opts as EventListenerOptions);
        window.removeEventListener('test', () => {}, opts as EventListenerOptions);
      } catch (e) {
        // Silent catch - just means passive isn't supported
      }

      // Apply passive listeners to all scroll events
      if (supportsPassive) {
        const wheelOpts = { passive: true } as EventListenerOptions;
        window.addEventListener('wheel', () => {}, wheelOpts);
        window.addEventListener('touchstart', () => {}, wheelOpts);
      }

      // Optimize scroll performance
      document.documentElement.style.scrollBehavior = 'auto';
    };

    const optimizeFontLoading = () => {
      // Add font-display: swap to all font faces
      const style = document.createElement('style');
      style.textContent = `
        @font-face {
          font-display: swap !important;
        }
      `;
      document.head.appendChild(style);

      // Mark fonts as loaded when they are available
      if ('fonts' in document && document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
          document.documentElement.classList.add('fonts-loaded');
        }).catch(() => {
          // Silent catch - just means fonts couldn't be loaded
        });
      }
    };

    // Apply optimizations immediately
    applyOptimizations();

    // Clean up on unmount - nothing to clean up in this case
    return () => {};
  }, []);

  // This component doesn't render anything
  return null;
}
