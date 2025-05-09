"use client";

import { memo, useState, useEffect } from 'react';
import Image, { ImageProps, StaticImageData } from 'next/image';
import type { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { cn } from '@/lib/utils';
import { IMAGES } from '@/constants';
import { getOptimizedImageProps } from '@/utils/imageOptimization';

/**
 * Props for the OptimizedImage component
 */
export interface OptimizedImageProps extends Omit<ImageProps, 'onLoad'> {
  /**
   * Whether this is a critical image that should be prioritized
   * @default false
   */
  isCritical?: boolean;

  /**
   * Whether to show a placeholder while the image is loading
   * @default true
   */
  showPlaceholder?: boolean;

  /**
   * The color of the placeholder
   * @default "#111"
   */
  placeholderColor?: string;

  /**
   * Whether to use hardware acceleration
   * @default true
   */
  useHardwareAcceleration?: boolean;

  /**
   * Callback when the image is loaded
   */
  onImageLoad?: () => void;

  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
}

/**
 * OptimizedImage Component
 *
 * A wrapper around Next.js Image component with built-in optimizations:
 * - Shows a placeholder while the image is loading
 * - Uses hardware acceleration for better performance
 * - Handles loading state and errors
 * - Optimizes image loading based on priority
 *
 * @param {OptimizedImageProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
const OptimizedImage = memo(function OptimizedImage({
  src,
  alt,
  width,
  height,
  isCritical = false,
  showPlaceholder = true,
  placeholderColor = "#111",
  useHardwareAcceleration = true,
  onImageLoad,
  className = "",
  containerClassName = "",
  quality,
  priority,
  loading,
  sizes,
  ...props
}: OptimizedImageProps) {
  // State for tracking if the image is loaded
  const [isLoaded, setIsLoaded] = useState(false);

  // Determine image loading attributes based on criticality
  const imageLoading = loading || (isCritical ? undefined : "lazy");
  const imagePriority = priority || isCritical;
  const imageQuality = quality || (isCritical ? Number(IMAGES.HIGH_QUALITY) : Number(IMAGES.DEFAULT_QUALITY));

  // Get optimized image props
  const optimizedProps = getOptimizedImageProps({
    src,
    quality: imageQuality,
    priority: imagePriority,
  });

  // Handle image load
  const handleLoad = () => {
    setIsLoaded(true);
    if (onImageLoad) {
      onImageLoad();
    }
  };

  // Set hardware acceleration styles
  const hardwareAccelerationStyle = useHardwareAcceleration
    ? { transform: "translateZ(0)" }
    : {};

  // Effect to handle the case where the image is already cached
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if the image is already in the browser cache
    const img = new window.Image();

    // Handle different src types
    if (typeof src === 'string') {
      img.src = src;
    } else if (src && typeof src === 'object' && 'src' in src) {
      img.src = (src as StaticImageData).src;
    }

    if (img.complete) {
      handleLoad();
    }
  }, [src]);

  return (
    <div className={cn(
      "relative overflow-hidden",
      containerClassName
    )}>
      {/* Placeholder */}
      {showPlaceholder && (
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-500",
            isLoaded ? "opacity-0" : "opacity-100"
          )}
          style={{ backgroundColor: placeholderColor }}
        />
      )}

      {/* Image - Using optimized props for AVIF format */}
      <Image
        src={optimizedProps.src}
        alt={alt}
        width={width}
        height={height}
        quality={imageQuality}
        priority={imagePriority}
        loading={imageLoading}
        sizes={sizes}
        onLoad={handleLoad}
        className={cn(
          "transition-opacity duration-500",
          isLoaded ? "opacity-100" : "opacity-0",
          className
        )}
        style={{
          ...hardwareAccelerationStyle,
          ...props.style
        }}
        {...props}
      />
    </div>
  );
});

export { OptimizedImage };
export default OptimizedImage;
