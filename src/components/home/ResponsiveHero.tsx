"use client";

import { useState, useEffect, memo } from 'react';
import dynamic from 'next/dynamic';
import { useDeviceDetection } from '@/hooks/useDeviceDetection';
import { BREAKPOINTS } from '@/constants';

// Import the basic video hero component directly
import BasicVideoHero from './BasicVideoHero';

// Use the basic video hero for mobile
const MobileHero = memo(BasicVideoHero);

// Dynamically import desktop hero with no SSR for better performance
const DesktopHero = dynamic(
  () => {
    // Only import the desktop hero if we're on a desktop device
    if (typeof window !== 'undefined' && window.innerWidth >= BREAKPOINTS.MOBILE) {
      return import('./DesktopHero');
    }
    // Return an empty component if we're not on desktop
    return Promise.resolve(() => null);
  },
  { ssr: false, loading: () => null }
);

/**
 * ResponsiveHero Component
 *
 * A responsive hero section that renders the appropriate hero based on screen size.
 * This ensures the mobile video is never loaded on desktop and vice versa.
 *
 * @returns {JSX.Element} The rendered component
 */
const ResponsiveHero = memo(function ResponsiveHero() {
  // Use the device detection hook for initial state
  const { isMobile: initialIsMobile } = useDeviceDetection();

  // State to track if we're on mobile or desktop
  const [isMobile, setIsMobile] = useState(initialIsMobile);
  const [isDesktop, setIsDesktop] = useState(!initialIsMobile);

  // Set up screen size detection on mount
  useEffect(() => {
    // Check if we're in the browser
    if (typeof window === 'undefined') return;

    // Set initial screen size
    const checkScreenSize = () => {
      const width = window.innerWidth;
      const newIsMobile = width < BREAKPOINTS.MOBILE;
      setIsMobile(newIsMobile);
      setIsDesktop(!newIsMobile);
    };

    // Initial check
    checkScreenSize();

    // Set up resize listener with throttling for better performance
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(checkScreenSize, 100);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Clean up
    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden m-0 p-0 hero-section">
      {/* Mobile hero - only shown on mobile */}
      {isMobile && <MobileHero />}

      {/* Desktop hero - only shown on desktop */}
      {isDesktop && <DesktopHero />}
    </section>
  );
});

export default ResponsiveHero;
