"use client";

import { memo, useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

interface OptimizedAvifImageProps extends Omit<ImageProps, 'onLoad'> {
  isCritical?: boolean;
  showPlaceholder?: boolean;
  placeholderColor?: string;
  useHardwareAcceleration?: boolean;
  containerClassName?: string;
  onImageLoad?: () => void;
}

/**
 * OptimizedAvifImage Component
 *
 * A wrapper around Next.js Image component with built-in optimizations:
 * - Prioritizes AVIF format for better compression
 * - Shows a placeholder while the image is loading
 * - Uses hardware acceleration for better performance
 * - Handles loading state and errors
 * - Optimizes image loading based on priority
 *
 * @param {OptimizedAvifImageProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
const OptimizedAvifImage = memo(function OptimizedAvifImage({
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
  quality = 75,
  priority,
  loading,
  sizes,
  ...props
}: OptimizedAvifImageProps) {
  // State for tracking if the image is loaded
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Set priority based on isCritical flag
  const isPriority = priority || isCritical;
  
  // Set loading attribute based on priority
  const loadingAttr = isPriority ? undefined : loading || "lazy";

  // Handle image load event
  const handleImageLoad = () => {
    setIsLoaded(true);
    if (onImageLoad) onImageLoad();
  };

  // Handle image error
  const handleImageError = () => {
    setHasError(true);
  };

  // Apply hardware acceleration if enabled
  const hardwareAccelerationStyle = useHardwareAcceleration
    ? { transform: "translateZ(0)" }
    : {};

  // Reset error state if src changes
  useEffect(() => {
    setHasError(false);
  }, [src]);

  return (
    <div
      className={cn("relative overflow-hidden", containerClassName)}
      style={hardwareAccelerationStyle}
    >
      {/* Placeholder */}
      {showPlaceholder && !isLoaded && !hasError && (
        <div
          className="absolute inset-0 animate-pulse"
          style={{ backgroundColor: placeholderColor }}
        />
      )}

      {/* Image */}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        quality={quality}
        priority={isPriority}
        loading={loadingAttr}
        sizes={sizes}
        className={cn(
          "transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0",
          className
        )}
        onLoad={handleImageLoad}
        onError={handleImageError}
        {...props}
      />

      {/* Error Fallback */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-500">
          <span className="text-sm">Failed to load image</span>
        </div>
      )}
    </div>
  );
});

export default OptimizedAvifImage;
