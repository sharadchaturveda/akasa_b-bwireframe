"use client";

import { useEffect } from 'react';
import { initPerformanceMonitoring } from '@/utils/performanceMonitor';
import { isInExcludedTree } from '@/utils/optimizationExclusions';

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
    // Only run in browser environment
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    // Check if we're on the reservations page or if the dining-info-container is present
    const isReservationsPage = window.location.pathname.includes('/reservations');
    const hasDiningInfo = document.querySelector('.dining-info-container') !== null;

    // If we're on the reservations page or have the dining info component, don't apply any optimizations
    if (isReservationsPage || hasDiningInfo) {
      // Skip optimizations for reservations page or dining info
      return;
    }

    // Initialize performance monitoring only if no ReservationInfo component
    initPerformanceMonitoring();

    // Define the optimization function inside useEffect
    const applyOptimizations = () => {
      optimizeImageLoading();
      optimizeAnimations();
      optimizeScrolling();
      optimizeFontLoading();
    };

    const optimizeImageLoading = () => {
      // Only run in browser environment
      if (typeof window === 'undefined' || typeof document === 'undefined') {
        return;
      }

      // Double-check for dining info component before applying optimizations
      if (document.querySelector('.dining-info-container') !== null) {
        // Skip image optimizations for dining info component
        return;
      }

      // Add loading="lazy" to images below the fold
      document.querySelectorAll('img:not([loading])').forEach((img) => {
        // Skip elements that should be excluded from optimization
        if (isInExcludedTree(img)) return;

        const rect = img.getBoundingClientRect();
        if (rect.top > window.innerHeight) {
          img.setAttribute('loading', 'lazy');
        }
      });

      // Add fetchpriority="low" to non-critical images
      document.querySelectorAll('img:not([fetchpriority])').forEach((img) => {
        // Skip elements that should be excluded from optimization
        if (isInExcludedTree(img)) return;

        const rect = img.getBoundingClientRect();
        if (rect.top > window.innerHeight * 2) {
          img.setAttribute('fetchpriority', 'low');
        }
      });
    };

    const optimizeAnimations = () => {
      // Only run in browser environment
      if (typeof window === 'undefined' || typeof document === 'undefined') {
        return;
      }

      // Double-check for dining info component before applying optimizations
      if (document.querySelector('.dining-info-container') !== null) {
        // Skip animation optimizations for dining info component
        return;
      }

      // Disable animations for users who prefer reduced motion
      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.classList.add('reduce-motion');

        // Add a style element to reduce animations, but exclude ReservationInfo
        const style = document.createElement('style');
        style.textContent = `
          .reduce-motion *:not([data-exclude-optimization="true"]) {
            animation-duration: 0.001ms !important;
            transition-duration: 0.001ms !important;
          }

          /* Explicitly preserve animations in ReservationInfo */
          .reduce-motion [data-exclude-optimization="true"] * {
            animation-duration: initial !important;
            transition-duration: initial !important;
          }
        `;
        document.head.appendChild(style);
      }

      // Pause animations that are not in viewport
      const animatedElements = document.querySelectorAll('.animate-fadeIn, .animate-fadeSlideUp, .animate-float');

      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            // Skip elements that should be excluded from optimization
            if (isInExcludedTree(entry.target)) return;

            // Double-check if this element is part of ReservationInfo
            if (entry.target.closest('.bg-black\\/40.backdrop-blur-sm') ||
                entry.target.closest('[data-exclude-optimization="true"]')) {
              return;
            }

            if (entry.isIntersecting) {
              entry.target.classList.add('animate-running');
            } else {
              entry.target.classList.remove('animate-running');
            }
          });
        });

        // Only observe elements that aren't excluded from optimization
        animatedElements.forEach(el => {
          if (!isInExcludedTree(el) &&
              !el.closest('.bg-black\\/40.backdrop-blur-sm') &&
              !el.closest('[data-exclude-optimization="true"]')) {
            observer.observe(el);
          }
        });
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
