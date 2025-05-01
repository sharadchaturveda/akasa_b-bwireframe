"use client";

import { useEffect } from 'react';
import { applyMobileOptimizations, optimizeImagesForMobile, debounce, isMobileDevice } from '@/utils/mobileUtils';
import '@/styles/mobile.css';

/**
 * MobileOptimizer Component
 *
 * This component applies mobile-specific optimizations without rendering anything.
 * It's designed to be included once at the top level of the application.
 */
export default function MobileOptimizer() {
  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return;

    // Apply mobile optimizations immediately
    applyMobileOptimizations();

    // Optimize images for mobile
    optimizeImagesForMobile();

    // Create a debounced resize handler
    const handleResize = debounce(() => {
      if (window.innerWidth < 768) {
        applyMobileOptimizations();
      }
    }, 200);

    // Add event listener for resize
    window.addEventListener('resize', handleResize);

    // Add event listener for orientation change
    window.addEventListener('orientationchange', () => {
      applyMobileOptimizations();
      optimizeImagesForMobile();
    });

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  // This component doesn't render anything
  return null;
}
