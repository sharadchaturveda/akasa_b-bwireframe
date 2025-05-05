"use client";

import { useState, useEffect, useCallback } from "react";
import {
  isMobileDevice,
  isTabletDevice,
  isDesktopDevice,
  getViewportDimensions,
  applyMobileOptimizations,
  removeMobileOptimizations,
  DeviceDetectionOptions
} from "@/utils/deviceUtils";
import { debounce } from "@/utils/functionUtils";
import { ANIMATIONS } from "@/constants";

/**
 * Interface for the return value of the useDeviceDetection hook
 */
export interface DeviceDetectionResult {
  /** Whether the current device is a mobile device */
  isMobile: boolean;

  /** Whether the current device is a tablet device */
  isTablet: boolean;

  /** Whether the current device is a desktop device */
  isDesktop: boolean;

  /** Whether the device detection has completed */
  isDetectionComplete: boolean;

  /** The current viewport width */
  viewportWidth: number;

  /** The current viewport height */
  viewportHeight: number;
}

/**
 * Custom hook for detecting device type
 *
 * This hook centralizes the device detection logic and handles
 * updates when the window is resized or orientation changes.
 *
 * @param {DeviceDetectionOptions} options - Options for device detection
 * @returns {DeviceDetectionResult} An object containing the device detection state
 *
 * @example
 * ```tsx
 * const { isMobile, isTablet, isDesktop, isDetectionComplete } = useDeviceDetection();
 *
 * if (!isDetectionComplete) {
 *   return <Loading />;
 * }
 *
 * if (isMobile) {
 *   return <MobileComponent />;
 * } else if (isTablet) {
 *   return <TabletComponent />;
 * } else {
 *   return <DesktopComponent />;
 * }
 * ```
 */
export function useDeviceDetection(options: DeviceDetectionOptions = {}): DeviceDetectionResult {
  // State for device type
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true); // Default to desktop
  const [isDetectionComplete, setIsDetectionComplete] = useState(false);

  // State for viewport dimensions
  const [viewportWidth, setViewportWidth] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);

  // Create a memoized handler for device detection
  const detectDevice = useCallback(() => {
    try {
      // Skip detection on the server
      if (typeof window === 'undefined') {
        setIsDetectionComplete(true);
        return;
      }

      // Get viewport dimensions
      const { width, height } = getViewportDimensions();
      setViewportWidth(width);
      setViewportHeight(height);

      // Detect device types
      const detectedMobile = isMobileDevice(options);
      const detectedTablet = options.detectTablets ? isTabletDevice(options) : false;
      const detectedDesktop = !detectedMobile && !detectedTablet;

      // Update state
      setIsMobile(detectedMobile);
      setIsTablet(detectedTablet);
      setIsDesktop(detectedDesktop);

      // Apply or remove mobile optimizations
      if (detectedMobile) {
        applyMobileOptimizations();
      } else {
        removeMobileOptimizations();
      }

      // Mark detection as complete
      setIsDetectionComplete(true);
    } catch (error) {
      // Silent error in production
      if (process.env.NODE_ENV !== 'production') {
        console.error("Error detecting device:", error);
      }

      // Default to desktop view if detection fails
      setIsMobile(false);
      setIsTablet(false);
      setIsDesktop(true);
      setIsDetectionComplete(true);
    }
  }, [options]);

  // Create a debounced version of the handler
  const debouncedDetectDevice = useCallback(
    debounce(detectDevice, ANIMATIONS.DEBOUNCE_MS),
    [detectDevice]
  );

  // Handle orientation change
  const handleOrientationChange = useCallback(() => {
    detectDevice();
  }, [detectDevice]);

  // Initialize detection and set up event listeners
  useEffect(() => {
    // Initial detection
    detectDevice();

    // Add event listeners for window resize and orientation change
    window.addEventListener('resize', debouncedDetectDevice);
    window.addEventListener('orientationchange', handleOrientationChange);

    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener('resize', debouncedDetectDevice);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, [debouncedDetectDevice, handleOrientationChange, detectDevice]);

  return {
    isMobile,
    isTablet,
    isDesktop,
    isDetectionComplete,
    viewportWidth,
    viewportHeight
  };
}
