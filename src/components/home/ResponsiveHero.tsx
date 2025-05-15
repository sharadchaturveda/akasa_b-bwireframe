"use client";

import { memo } from 'react';
import { useDeviceDetection } from '@/hooks/useDeviceDetection';
import PureMobileHero from './PureMobileHero';
import DesktopHero from './DesktopHero';

/**
 * ResponsiveHero Component - Optimized for Performance
 *
 * A responsive hero section that renders the appropriate hero based on screen size.
 * This implementation uses a single render decision based on the device detection hook
 * to prevent unnecessary re-renders and component loading.
 *
 * @returns {JSX.Element} The rendered component
 */
const ResponsiveHero = memo(function ResponsiveHero() {
  // Use the device detection hook - single source of truth
  const { isMobile } = useDeviceDetection();

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden m-0 p-0 hero-section">
      {/* Render either mobile or desktop hero based on device detection */}
      {isMobile ? <PureMobileHero /> : <DesktopHero />}
    </section>
  );
});

export default ResponsiveHero;
