"use client";

import { useEffect } from 'react';
import { optimizeImagesForMobile, debounce } from '@/utils/mobileUtils';

/**
 * MobileOptimizer Component
 *
 * This component applies mobile-specific optimizations without rendering anything.
 * It's designed to be included once at the top level of the application.
 *
 * Note: Most mobile-specific functionality has been moved to MobileClassProvider
 * to avoid hydration errors. This component now only handles image optimization.
 */
export default function MobileOptimizer() {
  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return;

    // Optimize images for mobile
    optimizeImagesForMobile();

    // Create a debounced resize handler
    const handleResize = debounce(() => {
      optimizeImagesForMobile();
    }, 200);

    // Add event listener for resize
    window.addEventListener('resize', handleResize);

    // Add event listener for orientation change
    window.addEventListener('orientationchange', () => {
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
