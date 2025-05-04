"use client";

import { useEffect } from 'react';
import { optimizeImagesForMobile, debounce } from '@/utils/mobileUtils';

/**
 * MobileOptimizer Component
 *
 * Applies mobile-specific optimizations without rendering anything.
 * Handles image optimization for mobile devices.
 *
 * @returns {null} This component doesn't render anything
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

    // Create a handler for orientation change
    const handleOrientationChange = () => {
      optimizeImagesForMobile();
    };

    // Add event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  // This component doesn't render anything
  return null;
}
