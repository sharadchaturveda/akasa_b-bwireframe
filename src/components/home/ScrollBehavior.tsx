"use client";

import { useEffect, useState } from "react";

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

    // Minimal scroll optimizations
    const applyMinimalOptimizations = () => {
      // Basic overscroll behavior
      document.body.style.overscrollBehavior = 'none';

      // Add minimal styles for performance
      if (!document.getElementById('minimal-scroll-styles')) {
        const style = document.createElement('style');
        style.id = 'minimal-scroll-styles';
        style.textContent = `
          /* Only essential optimizations */
          html, body {
            overflow-x: hidden;
          }

          /* Optimize critical images only */
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

    // Apply minimal optimizations with requestAnimationFrame to ensure it runs after paint
    const animationFrameId = requestAnimationFrame(applyMinimalOptimizations);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      const styles = document.getElementById('minimal-scroll-styles');
      if (styles) styles.remove();
    };
  }, [isMounted]); // Only run when isMounted changes to true

  return null;
}
