"use client";

import { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

/**
 * HydrationSafeImage Component
 *
 * A wrapper around Next.js Image component that prevents hydration errors
 * by delaying client-side enhancements until after hydration is complete.
 *
 * This component:
 * 1. Renders a basic Image component during server-side rendering
 * 2. Adds client-side enhancements (like loading animations) only after hydration
 * 3. Uses suppressHydrationWarning to prevent React warnings
 */
export default function HydrationSafeImage({
  className,
  style,
  onLoad,
  ...props
}: ImageProps) {
  // Track if we're hydrated (client-side only)
  const [isHydrated, setIsHydrated] = useState(false);

  // Track if the image is loaded
  const [isLoaded, setIsLoaded] = useState(false);

  // Set hydrated state after mount and check if image is already cached
  useEffect(() => {
    setIsHydrated(true);

    // Check if the image is already in the browser cache
    // Use window.Image constructor to avoid conflicts
    if (typeof window !== 'undefined') {
      const img = new window.Image();

      // Handle different src types
      if (typeof props.src === 'string') {
        img.src = props.src;
      } else if (props.src && typeof props.src === 'object' && 'src' in props.src) {
        img.src = props.src.src;
      }

      if (img.complete) {
        setIsLoaded(true);
      }
    }
  }, [props.src]);

  // Handle image load
  const handleLoad = (e: any) => {
    setIsLoaded(true);
    if (onLoad) onLoad(e);
  };

  // Combine styles
  const combinedStyles = {
    ...style,
    // Apply opacity transition only after hydration
    ...(isHydrated && {
      opacity: isLoaded ? 1 : 0.1,
      transition: 'opacity 0.3s ease-in-out',
    }),
  };

  return (
    <Image
      className={className}
      style={combinedStyles}
      onLoad={handleLoad}
      suppressHydrationWarning
      {...props}
    />
  );
}
