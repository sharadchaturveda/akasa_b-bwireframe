"use client";

import { useEffect, useState } from "react";
import { useDeviceDetection } from "@/hooks/useDeviceDetection";
import { applyScrollPerformanceOptimizations } from "@/utils/optimizedScrollUtils";

/**
 * ScrollBehavior Component
 *
 * Applies scroll optimizations to improve performance.
 * This component doesn't render anything visible.
 *
 * Uses the optimized scroll utilities for better performance.
 *
 * @returns {null} This component doesn't render anything
 */
export default function ScrollBehavior() {
  // Use state to track client-side mounting to avoid hydration mismatch
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Set mounted state to true after hydration
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Only run after component is mounted on the client
    if (!isMounted) return;

    // Apply scroll performance optimizations from our utility
    applyScrollPerformanceOptimizations();

    // No cleanup needed as the optimizations are applied globally
  }, [isMounted]);

  return null;
}
