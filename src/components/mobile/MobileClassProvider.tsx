'use client';

import { useEffect, useState, useRef } from 'react';
import { isMobileDevice } from '@/utils/mobileUtils';
import "@/styles/mobile-fixes.css";

/**
 * MobileClassProvider Component
 *
 * This component handles mobile-specific functionality in a client-side only manner
 * to avoid hydration errors. It loads mobile CSS and applies mobile optimizations
 * only after the initial render on the client.
 */
export default function MobileClassProvider({
  children
}: {
  children: React.ReactNode
}) {
  // Use refs to track initialization state to avoid re-renders
  const initializedRef = useRef(false);
  const mobileStylesLoadedRef = useRef(false);

  // Effect to handle mobile-specific functionality after initial render
  useEffect(() => {
    // Skip if already initialized to prevent duplicate processing
    if (initializedRef.current) return;
    initializedRef.current = true;

    // Function to apply mobile optimizations
    const applyMobileOptimizations = () => {
      // Skip if already loaded
      if (mobileStylesLoadedRef.current) return;
      mobileStylesLoadedRef.current = true;

      // Fix any content that might be bleeding outside the viewport
      document.documentElement.style.overflowX = 'hidden';
      document.body.style.overflowX = 'hidden';

      // Ensure proper touch behavior
      document.documentElement.style.touchAction = 'manipulation';

      // Add smooth scrolling for better mobile experience
      document.documentElement.style.scrollBehavior = 'smooth';

      // Load mobile CSS dynamically
      if (!document.getElementById('mobile-css')) {
        const link = document.createElement('link');
        link.id = 'mobile-css';
        link.rel = 'stylesheet';
        link.href = '/mobile.css';
        document.head.appendChild(link);
      }

      // Load the fix for black bar issue
      if (!document.getElementById('fix-black-bar-css')) {
        const fixLink = document.createElement('link');
        fixLink.id = 'fix-black-bar-css';
        fixLink.rel = 'stylesheet';
        fixLink.href = '/fix-black-bar.css';
        document.head.appendChild(fixLink);
      }

      // Disable hover effects specifically
      disableHoverEffects();
    };

    // Function to disable hover effects
    const disableHoverEffects = () => {
      // Add a style element with rules to disable hover effects
      const styleEl = document.createElement('style');
      styleEl.id = 'mobile-hover-disable';
      styleEl.textContent = `
        /* Disable button hover effects on mobile */
        html.mobile-device button:hover,
        html.mobile-device a:hover {
          background-color: initial !important;
          color: initial !important;
        }

        /* Ensure no hover animations on mobile */
        html.mobile-device .group-hover\\:translate-x-0,
        html.mobile-device .group:hover .transform {
          transform: translateX(-100%) !important;
        }

        /* Prevent color changes on hover for mobile */
        html.mobile-device .group:hover span,
        html.mobile-device .group-hover\\:text-black {
          color: inherit !important;
        }

        /* Remove gold fill animation completely */
        html.mobile-device .absolute.inset-0.rounded-full.bg-\\[\\#E6C78B\\] {
          display: none !important;
        }

        /* Fix for the black bar at the top */
        html.mobile-device section.h-screen {
          height: 100vh !important;
          min-height: 100vh !important;
          padding: 0 !important;
          margin: 0 !important;
        }

        /* Fix for hero images */
        html.mobile-device section.h-screen img {
          object-fit: cover !important;
        }

        /* Remove all navigation bars and overlays - except for the menu overlay */
        html.mobile-device .fixed.top-0.left-0.right-0:not(.mobile-menu-overlay) {
          background: transparent !important;
          backdrop-filter: none !important;
          border: none !important;
          box-shadow: none !important;
        }

        /* Ensure the mobile menu overlay has proper blur */
        html.mobile-device .mobile-menu-overlay {
          backdrop-filter: blur(8px) !important;
        }
      `;
      document.head.appendChild(styleEl);
    };

    // Function to check and apply mobile classes
    const checkAndApplyMobileClasses = () => {
      const isMobile = isMobileDevice();

      if (isMobile) {
        // Apply mobile-specific classes to html element
        document.documentElement.classList.add('mobile-device');
        applyMobileOptimizations();
      } else {
        document.documentElement.classList.remove('mobile-device');
      }
    };

    // Initial check
    checkAndApplyMobileClasses();

    // Debounced resize handler to avoid performance issues
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        checkAndApplyMobileClasses();
      }, 250);
    };

    // Add event listeners
    window.addEventListener('resize', handleResize);

    // Also check on orientation change for mobile devices
    window.addEventListener('orientationchange', checkAndApplyMobileClasses);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', checkAndApplyMobileClasses);
      clearTimeout(resizeTimer);
    };
  }, []);

  // Simply render children - all mobile-specific logic is in effects
  return <>{children}</>;
}
