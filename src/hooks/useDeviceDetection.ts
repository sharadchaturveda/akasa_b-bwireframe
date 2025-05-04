"use client";

import { useState, useEffect, useCallback } from "react";
import { isMobileDevice, debounce } from "@/utils/mobileUtils";

/**
 * Interface for the return value of the useDeviceDetection hook
 */
interface DeviceDetectionResult {
  /** Whether the current device is a mobile device */
  isMobile: boolean;
  /** Whether the device detection has completed */
  isDetectionComplete: boolean;
}

/**
 * Custom hook for detecting mobile devices
 *
 * This hook centralizes the mobile detection logic that was previously
 * duplicated across many components. It handles the initial detection
 * and updates the state when the window is resized or orientation changes.
 *
 * @returns {DeviceDetectionResult} An object containing the device detection state
 *
 * @example
 * ```tsx
 * const { isMobile, isDetectionComplete } = useDeviceDetection();
 *
 * if (!isDetectionComplete) {
 *   return <Loading />;
 * }
 *
 * return isMobile ? <MobileComponent /> : <DesktopComponent />;
 * ```
 */
export function useDeviceDetection(): DeviceDetectionResult {
  const [isMobile, setIsMobile] = useState(false);
  const [isDetectionComplete, setIsDetectionComplete] = useState(false);

  // Create a memoized handler for device detection
  const detectDevice = useCallback(() => {
    try {
      const detected = isMobileDevice();
      setIsMobile(detected);
      setIsDetectionComplete(true);
    } catch (error) {
      // Silent error in production
      if (process.env.NODE_ENV !== 'production') {
        console.error("Error detecting device:", error);
      }
      // Default to desktop view if detection fails
      setIsMobile(false);
      setIsDetectionComplete(true);
    }
  }, []);

  // Create a debounced version of the handler
  const debouncedDetectDevice = useCallback(
    debounce(detectDevice, 250),
    [detectDevice]
  );

  // Handle orientation change
  const handleOrientationChange = useCallback(() => {
    detectDevice();
  }, [detectDevice]);

  useEffect(() => {
    // Set initial state
    detectDevice();

    // Add event listeners
    window.addEventListener('resize', debouncedDetectDevice);
    window.addEventListener('orientationchange', handleOrientationChange);

    // Cleanup
    return () => {
      window.removeEventListener('resize', debouncedDetectDevice);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, [detectDevice, debouncedDetectDevice, handleOrientationChange]);

  return { isMobile, isDetectionComplete };
}
