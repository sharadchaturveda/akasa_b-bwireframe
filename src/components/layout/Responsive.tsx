"use client";

import { memo } from 'react';
import { useDeviceDetection } from '@/hooks/useDeviceDetection';
import Loading from '@/components/ui/Loading';

/**
 * Props for the Responsive component
 */
export interface ResponsiveProps {
  /**
   * Component to render on mobile devices
   */
  mobile: React.ReactNode;
  
  /**
   * Component to render on desktop devices
   */
  desktop: React.ReactNode;
  
  /**
   * Component to render on tablet devices (optional)
   * If not provided, will use desktop component
   */
  tablet?: React.ReactNode;
  
  /**
   * Component to render while device detection is in progress
   */
  fallback?: React.ReactNode;
}

/**
 * Responsive Component
 *
 * A component that renders different content based on the device type.
 * This component uses the useDeviceDetection hook to determine the device type.
 *
 * @param {ResponsiveProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
const Responsive = memo(function Responsive({
  mobile,
  desktop,
  tablet,
  fallback
}: ResponsiveProps) {
  // Use the device detection hook
  const { isMobile, isTablet, isDetectionComplete } = useDeviceDetection({
    detectTablets: Boolean(tablet)
  });
  
  // Show fallback while detection is in progress
  if (!isDetectionComplete) {
    return fallback || <Loading />;
  }
  
  // Render based on device type
  if (isMobile) {
    return <>{mobile}</>;
  }
  
  if (isTablet && tablet) {
    return <>{tablet}</>;
  }
  
  return <>{desktop}</>;
});

export { Responsive };
export default Responsive;
