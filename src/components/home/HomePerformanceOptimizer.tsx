"use client";

import { useEffect } from 'react';
import { initPerformanceMonitoring } from '@/utils/performanceMonitor';

/**
 * Component that applies performance optimizations for the homepage
 * This is a client-side only component that doesn't render anything
 */
export default function HomePerformanceOptimizer() {
  // Define optimization functions outside useEffect

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    // Initialize performance monitoring
    initPerformanceMonitoring();

    // Apply additional optimizations
    applyOptimizations();

    // Clean up on unmount
    return () => {
      // Remove any event listeners or observers if needed
    };
  }, []);
  const applyOptimizations = () => {
    // Optimize image loading
    optimizeImageLoading();

    // Optimize animations
    optimizeAnimations();

    // Optimize scroll performance
    optimizeScrolling();

    // Optimize font loading
    optimizeFontLoading();
  };

  const optimizeImageLoading = () => {
    try {
      // Add loading="lazy" to images below the fold
      try {
        document.querySelectorAll('img:not([loading])').forEach((img) => {
          try {
            const rect = img.getBoundingClientRect();
            if (rect.top > window.innerHeight) {
              img.setAttribute('loading', 'lazy');
            }
          } catch (imgError) {
            console.warn('Error optimizing image loading:', imgError);
          }
        });
      } catch (queryError) {
        console.warn('Error querying images for lazy loading:', queryError);
      }

      // Add fetchpriority="low" to non-critical images
      try {
        document.querySelectorAll('img:not([fetchpriority])').forEach((img) => {
          try {
            const rect = img.getBoundingClientRect();
            if (rect.top > window.innerHeight * 2) {
              img.setAttribute('fetchpriority', 'low');
            }
          } catch (imgError) {
            console.warn('Error setting fetchpriority:', imgError);
          }
        });
      } catch (queryError) {
        console.warn('Error querying images for fetchpriority:', queryError);
      }
    } catch (e) {
      console.error('Failed to optimize image loading:', e);
    }
  };

  const optimizeAnimations = () => {
    try {
      // Disable animations for users who prefer reduced motion
      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.classList.add('reduce-motion');

        // Add a style element to reduce animations
        try {
          const style = document.createElement('style');
          style.textContent = `
            .reduce-motion * {
              animation-duration: 0.001ms !important;
              transition-duration: 0.001ms !important;
            }
          `;
          document.head.appendChild(style);
        } catch (styleError) {
          console.warn('Could not add reduced motion styles:', styleError);
        }
      }

      // Pause animations that are not in viewport
      try {
        const animatedElements = document.querySelectorAll('.animate-fadeIn, .animate-fadeSlideUp, .animate-float');

        if ('IntersectionObserver' in window) {
          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              try {
                if (entry.isIntersecting) {
                  entry.target.classList.add('animate-running');
                } else {
                  entry.target.classList.remove('animate-running');
                }
              } catch (classError) {
                console.warn('Error toggling animation class:', classError);
              }
            });
          });

          animatedElements.forEach(el => observer.observe(el));
        }
      } catch (animationError) {
        console.warn('Error optimizing animations:', animationError);
      }
    } catch (e) {
      console.error('Failed to optimize animations:', e);
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
    } catch (e) {}

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
    try {
      // Add font-display: swap to all font faces
      try {
        const style = document.createElement('style');
        style.textContent = `
          @font-face {
            font-display: swap !important;
          }
        `;
        document.head.appendChild(style);
      } catch (styleError) {
        console.warn('Error adding font-display style:', styleError);
      }

      // Mark fonts as loaded when they are available
      if ('fonts' in document && document.fonts && document.fonts.ready) {
        try {
          document.fonts.ready.then(() => {
            try {
              document.documentElement.classList.add('fonts-loaded');
            } catch (classError) {
              console.warn('Error adding fonts-loaded class:', classError);
            }
          }).catch(fontError => {
            console.warn('Error waiting for fonts to load:', fontError);
          });
        } catch (fontsError) {
          console.warn('Error setting up font loading:', fontsError);
        }
      }
    } catch (e) {
      console.error('Failed to optimize font loading:', e);
    }
  };

  // This component doesn't render anything
  return null;
}
