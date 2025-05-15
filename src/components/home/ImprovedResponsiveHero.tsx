"use client";

import { memo, useState, useEffect } from 'react';
import { useDeviceDetection } from '@/hooks/useDeviceDetection';
import PureMobileHero from './PureMobileHero';
import DesktopHero from './DesktopHero';

/**
 * ImprovedResponsiveHero Component - Prevents flashing of desktop content on mobile
 *
 * This component uses a two-step approach to prevent the desktop hero from
 * briefly showing on mobile devices:
 * 1. It renders a black loading screen initially
 * 2. It only renders the appropriate hero component after device detection is complete
 * 3. It uses CSS to ensure smooth transitions between states
 *
 * @returns {JSX.Element} The rendered component
 */
const ImprovedResponsiveHero = memo(function ImprovedResponsiveHero() {
  // Use the device detection hook with complete detection status
  const { isMobile, isDetectionComplete } = useDeviceDetection();

  // State to track if component is mounted (for SSR hydration issues)
  const [isMounted, setIsMounted] = useState(false);

  // Set mounted state after component mounts
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Simplified rendering logic - no function call overhead
  // Early return for loading state
  if (!isMounted || !isDetectionComplete) {
    return (
      <section className="relative w-full h-screen bg-black overflow-hidden m-0 p-0 hero-section">
        <div className="absolute inset-0 bg-black"></div>
      </section>
    );
  }

  // Directly render the appropriate component based on device type
  return (
    <section className="relative w-full h-screen bg-black overflow-hidden m-0 p-0 hero-section">
      {isMobile ? <PureMobileHero /> : <DesktopHero />}
    </section>
  );
});

export default ImprovedResponsiveHero;
