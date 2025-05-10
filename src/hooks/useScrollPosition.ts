"use client";

import { useState, useEffect, useRef } from 'react';

/**
 * Interface for the return value of the useScrollPosition hook
 */
interface ScrollPositionResult {
  /**
   * Current vertical scroll position in pixels
   */
  scrollY: number;

  /**
   * Whether the component is mounted
   * Useful for avoiding hydration mismatches
   */
  isMounted: boolean;
}

/**
 * Custom hook to track scroll position with performance optimizations
 *
 * This hook uses requestAnimationFrame and passive event listeners
 * to optimize scroll performance. It also avoids unnecessary re-renders
 * by only updating state when the scroll position changes significantly.
 *
 * @returns {ScrollPositionResult} Current scroll position and mounted state
 */
export function useScrollPosition(): ScrollPositionResult {
  const [scrollY, setScrollY] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  // Use refs to avoid recreating the event handler on each render
  const ticking = useRef(false);
  const lastScrollY = useRef(0);
  const scrollThreshold = useRef(5); // Only update if scrolled more than 5px

  useEffect(() => {
    // Set mounted state to true after hydration
    setIsMounted(true);

    // Set initial scroll position
    setScrollY(window.scrollY);
    lastScrollY.current = window.scrollY;

    // Optimized scroll handler
    const handleScroll = () => {
      // Skip if already processing a frame
      if (ticking.current) return;

      // Check if scroll position has changed significantly
      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - lastScrollY.current) < scrollThreshold.current) {
        return;
      }

      ticking.current = true;

      // Use requestAnimationFrame for better performance
      window.requestAnimationFrame(() => {
        setScrollY(currentScrollY);
        lastScrollY.current = currentScrollY;
        ticking.current = false;
      });
    };

    // Add scroll event listener with passive option for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { scrollY, isMounted };
}
