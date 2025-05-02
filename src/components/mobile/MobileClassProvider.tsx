'use client';

import { useEffect, useState } from 'react';
import { isMobileDevice } from '@/utils/mobileUtils';

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
  // State to track if component is mounted (client-side only)
  const [isMounted, setIsMounted] = useState(false);

  // Effect to handle mobile-specific functionality after initial render
  useEffect(() => {
    // Mark component as mounted
    setIsMounted(true);

    // Check if device is mobile
    const isMobile = isMobileDevice();

    if (isMobile) {
      // Apply mobile-specific classes to html element
      document.documentElement.classList.add('mobile-device');

      // Apply mobile optimizations
      applyMobileOptimizations();
    }

    // Handle resize events
    const handleResize = () => {
      const isMobileNow = isMobileDevice();

      if (isMobileNow) {
        document.documentElement.classList.add('mobile-device');
        applyMobileOptimizations();
      } else {
        document.documentElement.classList.remove('mobile-device');
      }
    };

    // Add event listeners
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Apply mobile optimizations
  const applyMobileOptimizations = () => {
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
  };

  // Simply render children - all mobile-specific logic is in effects
  return <>{children}</>;
}
