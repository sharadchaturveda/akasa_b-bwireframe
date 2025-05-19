"use client";

import { useEffect, memo } from "react";
import { applyScrollPerformanceOptimizations } from "@/utils/optimizedScrollUtils";

/**
 * ScrollBehavior Component
 *
 * Applies scroll optimizations to improve performance.
 * This component doesn't render anything visible.
 *
 * Uses the optimized scroll utilities for better performance.
 * Memoized to prevent unnecessary re-renders.
 *
 * @returns {null} This component doesn't render anything
 */
const ScrollBehavior = memo(function ScrollBehavior() {
  useEffect(() => {
    // Only run in the browser
    if (typeof window === 'undefined') return;

    // Apply scroll performance optimizations from our utility
    applyScrollPerformanceOptimizations();

    // No cleanup needed as the optimizations are applied globally
  }, []);

  return null;
});

export default ScrollBehavior;
