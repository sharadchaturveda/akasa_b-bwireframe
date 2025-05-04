"use client";

import { useEffect, useState } from "react";

/**
 * ScrollBehavior Component
 *
 * Applies minimal scroll optimizations to improve performance.
 * This component doesn't render anything visible.
 *
 * @returns {null} This component doesn't render anything
 */
export default function ScrollBehavior() {
  // Use state to track client-side mounting to avoid hydration mismatch
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Set mounted state to true after hydration
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Only run after component is mounted on the client
    if (!isMounted) return;

    // Apply minimal scroll optimizations
    const applyScrollOptimizations = () => {
      // Basic overscroll behavior
      document.body.style.overscrollBehavior = 'none';

      // Add minimal styles for performance
      if (!document.getElementById('minimal-scroll-styles')) {
        const style = document.createElement('style');
        style.id = 'minimal-scroll-styles';
        style.textContent = `
          /* Prevent horizontal scrolling */
          html, body {
            overflow-x: hidden;
          }

          /* Optimize critical images */
          .hero-image img {
            content-visibility: auto;
          }

          /* Disable smooth scrolling for better performance */
          html {
            scroll-behavior: auto !important;
          }
        `;
        document.head.appendChild(style);
      }
    };

    // Apply optimizations with requestAnimationFrame
    const animationFrameId = requestAnimationFrame(applyScrollOptimizations);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      const styles = document.getElementById('minimal-scroll-styles');
      if (styles) styles.remove();
    };
  }, [isMounted]);

  return null;
}
