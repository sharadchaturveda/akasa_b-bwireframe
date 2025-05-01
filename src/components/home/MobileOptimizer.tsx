"use client";

import { useEffect } from 'react';

/**
 * Component that applies mobile-specific optimizations
 * This is a client-side only component that doesn't render anything
 */
export default function MobileOptimizer() {
  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return;

    // Function to apply mobile-specific optimizations
    const applyMobileOptimizations = () => {
      // Get the current viewport width
      const viewportWidth = window.innerWidth;

      // Apply optimizations only for mobile devices
      if (viewportWidth < 768) {
        // Fix any content that might be bleeding outside the viewport
        document.documentElement.style.overflowX = 'hidden';
        document.body.style.overflowX = 'hidden';

        // Ensure proper touch behavior
        document.documentElement.style.touchAction = 'manipulation';

        // Prevent font size inflation
        (document.documentElement.style as any)['-webkit-text-size-adjust'] = '100%';
        (document.documentElement.style as any)['-moz-text-size-adjust'] = '100%';
        (document.documentElement.style as any)['-ms-text-size-adjust'] = '100%';
        (document.documentElement.style as any)['text-size-adjust'] = '100%';

        // Add smooth scrolling for better mobile experience
        document.documentElement.style.scrollBehavior = 'smooth';

        // Fix any potential z-index issues with fixed elements
        const fixedElements = document.querySelectorAll('.fixed');
        fixedElements.forEach(el => {
          (el as HTMLElement).style.backfaceVisibility = 'hidden';
          (el as HTMLElement).style.WebkitBackfaceVisibility = 'hidden';
        });
      }
    };

    // Apply optimizations immediately
    applyMobileOptimizations();

    // Also apply optimizations on resize
    window.addEventListener('resize', applyMobileOptimizations);

    // Cleanup
    return () => {
      window.removeEventListener('resize', applyMobileOptimizations);
    };
  }, []);

  // This component doesn't render anything
  return null;
}
