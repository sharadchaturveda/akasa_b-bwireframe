"use client";

import { useEffect } from "react";

export default function ScrollBehavior() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Fix for scroll issues - using passive event listeners for better performance
    const fixScrollIssues = () => {
      // Use a more gentle approach to overscroll behavior
      document.body.style.overscrollBehavior = 'auto';

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
      const style = document.createElement('style');
      style.textContent = `
        * { backface-visibility: hidden; }
        .scroll-view { will-change: transform; }
        @media (prefers-reduced-motion: no-preference) {
          html { scroll-behavior: smooth; }
        }
      `;
      document.head.appendChild(style);
    };

    // Apply fixes with requestAnimationFrame for better timing
    requestAnimationFrame(fixScrollIssues);

    // Use a debounced resize handler for better performance
    let resizeTimer: number;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(fixScrollIssues, 100);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
      const buffer = document.getElementById('scroll-buffer');
      if (buffer) buffer.remove();
    };
  }, []);

  // This component doesn't render anything visible
  return null;
}
