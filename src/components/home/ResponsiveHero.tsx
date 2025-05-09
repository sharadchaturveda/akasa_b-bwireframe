"use client";

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { addVideoPreloadHints } from '@/utils/videoPreload';

// Import the basic video hero component directly
import BasicVideoHero from './BasicVideoHero';

// Dynamically import desktop hero with no SSR
const MobileHero = BasicVideoHero;

const DesktopHero = dynamic(
  () => {
    // Only import the desktop hero if we're on a desktop device
    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
      return import('./DesktopHero');
    }
    // Return an empty component if we're not on desktop
    return Promise.resolve(() => null);
  },
  { ssr: false, loading: () => null }
);

/**
 * Responsive hero section that renders the appropriate hero based on screen size
 * This ensures the mobile video is never loaded on desktop and vice versa
 */
const ResponsiveHero = () => {
  // State to track if we're on mobile
  const [isMobile, setIsMobile] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Set up screen size detection on mount
  useEffect(() => {
    // Check if we're in the browser
    if (typeof window === 'undefined') return;

    // Set initial screen size
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsDesktop(width >= 768);
    };

    // Initial check
    checkScreenSize();

    // Set up resize listener
    window.addEventListener('resize', checkScreenSize);

    // Clean up
    return () => {
      window.removeEventListener('resize', checkScreenSize);
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
};

export default ResponsiveHero;
