"use client";

import { memo, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useDeviceDetection } from '@/hooks/useDeviceDetection';

// Dynamically import components with no SSR and with loading condition
const MobileHero = dynamic(
  () => {
    // Only import the mobile hero if we're on a mobile device
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return import('./MobileHero');
    }
    // Return an empty component if we're not on mobile
    return Promise.resolve(() => null);
  },
  { ssr: false, loading: () => null }
);

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
 * ResponsiveHero Component
 *
 * Responsive hero section that renders the appropriate hero based on screen size.
 * This ensures the mobile video is never loaded on desktop and vice versa.
 *
 * @returns {JSX.Element} The rendered component
 */
const ResponsiveHero = memo(function ResponsiveHero() {
  // State to track if we're on mobile
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  // Set up screen size detection on mount
  useEffect(() => {
    // Set initial screen size
    setIsMobile(window.innerWidth < 768);

    // Function to handle resize
    const handleResize = () => {
      const newIsMobile = window.innerWidth < 768;
      if (newIsMobile !== isMobile) {
        // Only update state if the value changed to avoid re-renders
        setIsMobile(newIsMobile);

        // Force reload the page on breakpoint change to ensure clean loading
        window.location.reload();
      }
    };

    // Set up resize listener
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);

  // Don't render anything until we know what device we're on
  if (isMobile === null) {
    return (
      <section className="relative w-full h-screen bg-black overflow-hidden m-0 p-0 hero-section">
        {/* Loading placeholder */}
      </section>
    );
  }

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden m-0 p-0 hero-section">
      {/* Only render the component for the current device */}
      {isMobile ? <MobileHero /> : <DesktopHero />}
    </section>
  );
});

export default ResponsiveHero;
