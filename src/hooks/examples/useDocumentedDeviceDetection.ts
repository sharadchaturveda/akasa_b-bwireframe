/**
 * Documented Device Detection Hook
 *
 * This file contains a fully documented device detection hook that serves as an example
 * for how hooks should be documented in the Akasa website project.
 * This hook demonstrates proper JSDoc comments, TypeScript types, and code organization.
 */

import { useState, useEffect, useCallback } from 'react';

/**
 * Options for the device detection hook
 */
interface DeviceDetectionOptions {
  /**
   * Whether to detect tablet devices separately from mobile
   * @default false
   */
  detectTablets?: boolean;

  /**
   * Maximum width in pixels to consider a device as mobile
   * @default 767
   */
  mobileMaxWidth?: number;

  /**
   * Maximum width in pixels to consider a device as tablet
   * Only used if detectTablets is true
   * @default 1024
   */
  tabletMaxWidth?: number;
}

/**
 * Return value from the useDocumentedDeviceDetection hook
 */
export interface DeviceDetectionResult {
  /**
   * Whether the current device is a mobile device
   */
  isMobile: boolean;

  /**
   * Whether the current device is a tablet device
   * Only meaningful if detectTablets option is true
   */
  isTablet: boolean;

  /**
   * Whether the current device is a desktop device
   */
  isDesktop: boolean;

  /**
   * Whether the device detection is complete
   * This is useful for showing loading states while detection is in progress
   */
  isDetectionComplete: boolean;

  /**
   * The current viewport width in pixels
   */
  viewportWidth: number;

  /**
   * The current viewport height in pixels
   */
  viewportHeight: number;
}

/**
 * Utility function to detect if the current device is a mobile device
 *
 * @param {number} mobileMaxWidth - Maximum width to consider a device as mobile
 * @returns {boolean} True if the current device is a mobile device
 */
function detectMobileDevice(mobileMaxWidth: number): boolean {
  // Return false if running on the server
  if (typeof window === 'undefined') return false;

  // Check for touch support
  const hasTouchSupport =
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    (navigator as any).msMaxTouchPoints > 0;

  // Check screen size
  const isSmallScreen = window.innerWidth <= mobileMaxWidth;

  // Check user agent for mobile devices
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobileUserAgent = /android|webos|iphone|ipod|blackberry|iemobile|opera mini/i.test(userAgent);

  // Consider it a mobile device if it has touch support and either
  // has a small screen or a mobile user agent
  return hasTouchSupport && (isSmallScreen || isMobileUserAgent);
}

/**
 * Utility function to detect if the current device is a tablet device
 *
 * @param {number} mobileMaxWidth - Maximum width to consider a device as mobile
 * @param {number} tabletMaxWidth - Maximum width to consider a device as tablet
 * @returns {boolean} True if the current device is a tablet device
 */
function detectTabletDevice(mobileMaxWidth: number, tabletMaxWidth: number): boolean {
  // Return false if running on the server
  if (typeof window === 'undefined') return false;

  // Check for touch support
  const hasTouchSupport =
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    (navigator as any).msMaxTouchPoints > 0;

  // Check screen size (larger than mobile but smaller than desktop)
  const isTabletScreen = window.innerWidth > mobileMaxWidth && window.innerWidth <= tabletMaxWidth;

  // Check user agent for tablet devices
  const userAgent = navigator.userAgent.toLowerCase();
  const isTabletUserAgent = /ipad|android(?!.*mobile)/i.test(userAgent);

  // Consider it a tablet device if it has touch support and either
  // has a tablet-sized screen or a tablet user agent
  return hasTouchSupport && (isTabletScreen || isTabletUserAgent);
}

/**
 * useDocumentedDeviceDetection Hook
 *
 * A custom hook for detecting the type of device being used (mobile, tablet, desktop).
 * This hook centralizes the device detection logic that was previously duplicated
 * across many components. It handles the initial detection and updates the state
 * when the window is resized or orientation changes.
 *
 * This hook is used throughout the application to render device-specific components
 * and apply device-specific optimizations.
 *
 * Key features:
 * - Detects mobile, tablet, and desktop devices
 * - Updates on window resize and orientation change
 * - Provides viewport dimensions
 * - Indicates when detection is complete
 *
 * Implementation details:
 * - Uses a combination of screen size, touch support, and user agent detection
 * - Debounces resize events for better performance
 * - Cleans up event listeners on unmount
 *
 * @param {DeviceDetectionOptions} options - Options for controlling device detection behavior
 * @returns {DeviceDetectionResult} An object containing the device detection state
 *
 * @example
 * // Basic usage
 * const { isMobile, isDesktop, isDetectionComplete } = useDocumentedDeviceDetection();
 *
 * if (!isDetectionComplete) {
 *   return <Loading />;
 * }
 *
 * return isMobile ? <></> : <DesktopComponent />;
 *
 * @example
 * // With custom options
 * const { isMobile, isTablet, isDesktop } = useDocumentedDeviceDetection({
 *   detectTablets: true,
 *   mobileMaxWidth: 640,
 *   tabletMaxWidth: 1024
 * });
 *
 * if (isTablet) {
 *   return <TabletComponent />;
 * } else if (isMobile) {
 *   return <></>;
 * } else {
 *   return <DesktopComponent />;
 * }
 */
export function useDocumentedDeviceDetection(
  options: DeviceDetectionOptions = {}
): DeviceDetectionResult {
  // Set default options
  const {
    detectTablets = false,
    mobileMaxWidth = 767,
    tabletMaxWidth = 1024
  } = options;

  // State for device type
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
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

      // Update viewport dimensions
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);

      // Detect device types
      const detectedMobile = detectMobileDevice(mobileMaxWidth);
      const detectedTablet = detectTablets ? detectTabletDevice(mobileMaxWidth, tabletMaxWidth) : false;
      const detectedDesktop = !detectedMobile && !detectedTablet;

      // Update state
      setIsMobile(detectedMobile);
      setIsTablet(detectedTablet);
      setIsDesktop(detectedDesktop);
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
  }, [detectTablets, mobileMaxWidth, tabletMaxWidth]);

  // Create a debounced version of the handler
  const debouncedDetectDevice = useCallback(
    debounce(detectDevice, 250),
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

  // Return the device detection state
  return {
    isMobile,
    isTablet,
    isDesktop,
    isDetectionComplete,
    viewportWidth,
    viewportHeight
  };
}

/**
 * Debounces a function to limit how often it can be called
 *
 * @param {Function} func - The function to debounce
 * @param {number} wait - The number of milliseconds to wait between calls
 * @returns {Function} The debounced function
 */
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function(this: any, ...args: Parameters<T>): void {
    const context = this;

    const later = () => {
      timeout = null;
      func.apply(context, args);
    };

    if (timeout !== null) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(later, wait);
  };
}

export default useDocumentedDeviceDetection;
