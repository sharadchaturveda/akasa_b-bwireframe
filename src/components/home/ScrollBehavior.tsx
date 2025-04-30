"use client";

import { useEffect } from "react";

export default function ScrollBehavior() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

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

    // Apply minimal optimizations
    requestAnimationFrame(applyMinimalOptimizations);

    // Cleanup
    return () => {
      const styles = document.getElementById('minimal-scroll-styles');
      if (styles) styles.remove();
    };
  }, []);

  return null;
}
