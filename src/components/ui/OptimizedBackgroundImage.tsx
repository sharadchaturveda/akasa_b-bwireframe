"use client";

import { memo, ReactNode } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { IMAGES } from '@/constants';

/**
 * Props for the OptimizedBackgroundImage component
 */
export interface OptimizedBackgroundImageProps {
  /**
   * The image source
   */
  src: string;

  /**
   * Alt text for the image
   */
  alt: string;

  /**
   * The children to render on top of the background
   */
  children?: ReactNode;

  /**
   * Whether to prioritize loading this image
   * @default false
   */
  priority?: boolean;

  /**
   * Image quality (1-100)
   * @default 75
   */
  quality?: number;

  /**
   * Whether to add an overlay
   * @default false
   */
  withOverlay?: boolean;

  /**
   * The overlay color
   * @default "bg-black/40"
   */
  overlayClassName?: string;

  /**
   * Whether to use a gradient overlay
   * @default false
   */
  withGradientOverlay?: boolean;

  /**
   * The gradient direction
   * @default "to-t"
   */
  gradientDirection?: string;

  /**
   * The gradient from color
   * @default "from-black/80"
   */
  gradientFromColor?: string;

  /**
   * The gradient via color
   * @default "via-black/50"
   */
  gradientViaColor?: string;

  /**
   * The gradient to color
   * @default "to-black/30"
   */
  gradientToColor?: string;

  /**
   * Object position for the image
   * @default "center"
   */
  objectPosition?: string;

  /**
   * Sizes attribute for responsive images
   * @default "100vw"
   */
  sizes?: string;

  /**
   * Additional CSS classes for the container
   */
  className?: string;

  /**
   * Additional CSS classes for the image
   */
  imageClassName?: string;

  /**
   * Additional CSS classes for the content
   */
  contentClassName?: string;
}

/**
 * OptimizedBackgroundImage Component
 *
 * An optimized component for background images using Next.js Image component.
 * This component handles image loading, optimization, and overlay styling.
 *
 * @param {OptimizedBackgroundImageProps} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const OptimizedBackgroundImage = memo(function OptimizedBackgroundImage({
  src,
  alt,
  children,
  priority = false,
  quality = IMAGES.DEFAULT_QUALITY,
  withOverlay = false,
  overlayClassName = "bg-black/40",
  withGradientOverlay = false,
  gradientDirection = "to-t",
  gradientFromColor = "from-black/80",
  gradientViaColor = "via-black/50",
  gradientToColor = "to-black/30",
  objectPosition = "center",
  sizes = "100vw",
  className = "",
  imageClassName = "",
  contentClassName = ""
}: OptimizedBackgroundImageProps) {
  return (
    <div className={cn("relative w-full h-full overflow-hidden", className)} style={{ minHeight: '300px' }}>
      {/* Background Image */}
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        quality={quality}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={cn("object-cover", imageClassName)}
        style={{ objectPosition }}
      />

      {/* Overlay */}
      {withOverlay && (
        <div
          className={cn(
            "absolute inset-0",
            withGradientOverlay
              ? `bg-gradient-${gradientDirection} ${gradientFromColor} ${gradientViaColor} ${gradientToColor}`
              : overlayClassName
          )}
        />
      )}

      {/* Content */}
      {children && (
        <div className={cn("relative z-10 h-full", contentClassName)}>
          {children}
        </div>
      )}
    </div>
  );
});

export default OptimizedBackgroundImage;
