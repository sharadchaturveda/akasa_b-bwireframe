"use client";

import { useEffect, useState, useRef } from "react";
import { useDeviceDetection } from "@/hooks/useDeviceDetection";

/**
 * ScrollBehavior Component
 *
 * Applies scroll optimizations to improve performance.
 * This component doesn't render anything visible.
 *
 * @returns {null} This component doesn't render anything
 */
export default function ScrollBehavior() {
  // Use state to track client-side mounting to avoid hydration mismatch
  const [isMounted, setIsMounted] = useState(false);
  const { isMobile } = useDeviceDetection();
  const styleRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    // Set mounted state to true after hydration
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Only run after component is mounted on the client
    if (!isMounted) return;

    // Apply scroll optimizations
    const applyScrollOptimizations = () => {
      // Basic overscroll behavior
      document.body.style.overscrollBehavior = 'none';

      // Create or update the style element
      if (!styleRef.current) {
        const style = document.createElement('style');
        style.id = 'scroll-performance-styles';
        styleRef.current = style;
        document.head.appendChild(style);
      }

      // Set the style content based on device type
      styleRef.current.textContent = `
        /* Prevent horizontal scrolling */
        html, body {
          overflow-x: hidden;
          width: 100%;
        }

        /* Optimize critical images */
        .hero-image img {
          /* Removed content-visibility which can cause layout issues */
        }

        /* Optimize scroll behavior based on device type */
        html {
          ${isMobile
            ? 'scroll-behavior: smooth; -webkit-overflow-scrolling: touch;'
            : 'scroll-behavior: auto;'
          }
        }

        /* Optimize only critical fixed elements */
        .mobile-nav-header,
        .floating-action-buttons {
          transform: translateZ(0);
        }

        /* Ensure mobile navigation is visible and functional only on mobile */
        ${isMobile ? `
          .mobile-nav-header {
            display: flex !important;
            z-index: 50 !important;
            pointer-events: auto !important;
          }

          /* Ensure mobile menu overlay is visible and interactive */
          .mobile-menu-overlay {
            z-index: 40 !important;
            pointer-events: auto !important;
          }
        ` : ''}

        /* Optimize animations during scroll */
        @media (prefers-reduced-motion: no-preference) {
          .animate-running {
            animation-play-state: running;
          }

          .animate-paused {
            animation-play-state: paused;
          }
        }

        /* Optimize touch targets on mobile */
        ${isMobile ? `
          button, a, input, select, textarea {
            touch-action: manipulation;
          }
        ` : ''}
      `;
    };

    // Apply optimizations with requestAnimationFrame
    const animationFrameId = requestAnimationFrame(applyScrollOptimizations);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      if (styleRef.current) {
        styleRef.current.remove();
        styleRef.current = null;
      }
    };
  }, [isMounted, isMobile]);

  return null;
}
