"use client";

import { memo, useState, useEffect } from 'react';
import { useDeviceDetection } from '@/hooks/useDeviceDetection';
import MobileVideoWithAudio from './MobileVideoWithAudio';
import DesktopHero from './DesktopHero';

/**
 * LoadingHero Component
 *
 * A simple black loading screen shown while device detection is in progress
 */
const LoadingHero = memo(function LoadingHero() {
  return (
    <div className="absolute inset-0 bg-black transition-opacity duration-500 ease-in-out"></div>
  );
});

/**
 * NewResponsiveHero Component
 *
 * A responsive hero section that renders the appropriate hero based on device type.
 * This component prevents the desktop hero from briefly showing on mobile devices
 * by using a two-step approach:
 * 1. It renders a black loading screen initially
 * 2. It only renders the appropriate hero component after device detection is complete
 *
 * @returns {JSX.Element} The rendered component
 */
const NewResponsiveHero = memo(function NewResponsiveHero() {
  // Use the device detection hook with complete detection status
  const { isMobile, isDetectionComplete } = useDeviceDetection();

  // State to track if component is mounted (for SSR hydration issues)
  const [isMounted, setIsMounted] = useState(false);

  // Set mounted state after component mounts
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden m-0 p-0 hero-section">
      {/* Show loading state until detection is complete */}
      {(!isMounted || !isDetectionComplete) && <LoadingHero />}

      {/* Render the appropriate hero once detection is complete */}
      {isMounted && isDetectionComplete && (
        isMobile ? <MobileVideoWithAudio /> : <DesktopHero />
      )}
    </section>
  );
});

export default NewResponsiveHero;
