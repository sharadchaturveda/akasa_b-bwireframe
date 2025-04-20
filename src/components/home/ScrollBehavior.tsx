"use client";

import { useEffect } from "react";

export default function ScrollBehavior() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Fix for scroll issues - using passive event listeners for better performance
    const fixScrollIssues = () => {
      // Use a more gentle approach to overscroll behavior
      document.body.style.overscrollBehavior = 'contain';

      // Ensure the body takes up at least the full viewport height
      document.body.style.minHeight = '100vh';

      // Add a small buffer at the bottom to ensure scrolling works properly
      const footer = document.querySelector('footer');
      if (footer && !document.getElementById('scroll-buffer')) {
        const buffer = document.createElement('div');
        buffer.style.height = '1px';
        buffer.style.width = '100%';
        buffer.style.opacity = '0';
        buffer.style.pointerEvents = 'none';
        buffer.id = 'scroll-buffer';
        document.body.appendChild(buffer);
      }

      // Optimize scroll performance
      document.documentElement.style.scrollBehavior = 'auto';

      // Prevent layout thrashing during scroll
      if (!document.getElementById('scroll-optimization-styles')) {
        const style = document.createElement('style');
        style.id = 'scroll-optimization-styles';
        style.textContent = `
          /* Performance optimizations */
          * { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
          img, video { content-visibility: auto; }
          .scroll-view { will-change: transform; }

          /* Reduce paint operations */
          * { transform: translateZ(0); }

          /* Disable animations during scrolling for better performance */
          .is-scrolling * {
            animation-play-state: paused !important;
            transition: none !important;
          }

          /* Smooth scrolling only for non-reduced-motion users */
          @media (prefers-reduced-motion: no-preference) {
            html { scroll-behavior: smooth; }
          }

          /* Mobile optimization */
          @media (max-width: 640px) {
            /* Optimize touch targets for mobile */
            button, a, [role="button"] {
              min-height: 44px;
              min-width: 44px;
            }

            /* Improve mobile scrolling */
            .snap-x {
              -webkit-scroll-snap-type: x mandatory;
              scroll-snap-type: x mandatory;
              scroll-behavior: smooth;
            }

            /* Prevent content jumping during scroll */
            body {
              overflow-x: hidden;
              position: relative;
            }

            /* Optimize images for mobile */
            img {
              max-width: 100%;
              height: auto;
            }

            /* Reduce animation complexity on mobile */
            .animate-scroll {
              animation-duration: 60s !important;
            }

            /* Additional image optimizations for mobile */
            img {
              contain: content;
            }
          }
        `;
        document.head.appendChild(style);
      }

      // Fix for iOS momentum scrolling
      // Use setAttribute for non-standard CSS properties
      document.documentElement.setAttribute('style', 'overflow-scrolling: touch; -webkit-overflow-scrolling: touch;');
    };

    // Apply fixes with requestAnimationFrame for better timing
    requestAnimationFrame(fixScrollIssues);

    // Optimize scroll performance
    let lastKnownScrollPosition = 0;
    let ticking = false;

    // Throttled scroll handler to improve performance
    const handleScroll = () => {
      lastKnownScrollPosition = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Optimize for scroll - disable animations during scroll
          if (!document.body.classList.contains('is-scrolling')) {
            document.body.classList.add('is-scrolling');
          }

          ticking = false;
        });

        ticking = true;
      }
    };

    // Re-enable animations after scrolling stops
    const handleScrollEnd = () => {
      if (document.body.classList.contains('is-scrolling')) {
        document.body.classList.remove('is-scrolling');
      }
    };

    // Debounced scroll end detection
    let scrollEndTimer: number;
    const debouncedScrollEnd = () => {
      clearTimeout(scrollEndTimer);
      scrollEndTimer = window.setTimeout(handleScrollEnd, 150);
    };

    // Add scroll event listener with passive flag for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('scroll', debouncedScrollEnd, { passive: true });

    // Use a debounced resize handler for better performance
    let resizeTimer: number;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(fixScrollIssues, 100);
    };

    // Detect mobile devices for specific optimizations
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      // Prevent double-tap zoom on mobile
      document.addEventListener('touchend', (e) => {
        // Prevent zoom on double-tap for interactive elements
        const target = e.target as HTMLElement;
        if (target.tagName === 'BUTTON' || target.tagName === 'A' ||
            target.getAttribute('role') === 'button') {
          e.preventDefault();
        }
      }, { passive: false });
    }

    window.addEventListener('resize', handleResize, { passive: true });

    // Cleanup
    return () => {
      // Remove all event listeners
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', debouncedScrollEnd);

      // Clear all timers
      clearTimeout(resizeTimer);
      clearTimeout(scrollEndTimer);

      // Remove added elements
      const buffer = document.getElementById('scroll-buffer');
      if (buffer) buffer.remove();

      // Remove added styles if page is being unmounted
      const styles = document.getElementById('scroll-optimization-styles');
      if (styles) styles.remove();

      // Remove added classes
      document.body.classList.remove('is-scrolling');
    };
  }, []);

  // This component doesn't render anything visible
  return null;
}
