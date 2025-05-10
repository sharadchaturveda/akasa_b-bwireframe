"use client";

import { memo } from 'react';
import Image from 'next/image'
;
import { cn } from '@/lib/utils';

/**
 * Props for the AnimatedBackground component
 */
export interface AnimatedBackgroundProps {
  /**
   * The image source
   */
  src: string;

  /**
   * The image alt text
   */
  alt: string;

  /**
   * Whether the image should be animated
   */
  isAnimated?: boolean;

  /**
   * The animation scale factor
   * @default 1.05
   */
  scale?: number;

  /**
   * The animation duration in seconds
   * @default 8
   */
  duration?: number;

  /**
   * The image opacity
   * @default 0.9
   */
  opacity?: number;

  /**
   * The image quality
   * @default 75
   */
  quality?: number;

  /**
   * Whether to use priority loading
   * @default false
   */
  priority?: boolean;

  /**
   * The image sizes attribute
   */
  sizes?: string;

  /**
   * The object position
   * @default "center"
   */
  objectPosition?: string;

  /**
   * Whether to add an overlay
   * @default false
   */
  withOverlay?: boolean;

  /**
   * The overlay color
   * @default "bg-black/50"
   */
  overlayColor?: string;

  /**
   * Whether to use a gradient overlay
   * @default false
   */
  withGradientOverlay?: boolean;

  /**
   * The gradient direction
   * @default "to-br"
   */
  gradientDirection?: string;

  /**
   * The gradient from color
   * @default "from-black/70"
   */
  gradientFromColor?: string;

  /**
   * The gradient via color
   * @default "via-black/50"
   */
  gradientViaColor?: string;

  /**
   * The gradient to color
   * @default "to-black/70"
   */
  gradientToColor?: string;

  /**
   * Additional CSS classes for the container
   */
  className?: string;

  /**
   * Additional CSS classes for the image
   */
  imageClassName?: string;

  /**
   * Additional CSS classes for the overlay
   */
  overlayClassName?: string;
}

/**
 * AnimatedBackground Component
 *
 * A component for displaying an animated background image.
 *
 * @param {AnimatedBackgroundProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
const AnimatedBackground = memo(function AnimatedBackground({
  src,
  alt,
  isAnimated = true,
  scale = 1.05,
  duration = 8,
  opacity = 0.9,
  quality = 75,
  priority = false,
  sizes,
  objectPosition = "center",
  withOverlay = false,
  overlayColor = "bg-black/50",
  withGradientOverlay = false,
  gradientDirection = "to-br",
  gradientFromColor = "from-black/70",
  gradientViaColor = "via-black/50",
  gradientToColor = "to-black/70",
  className,
  imageClassName,
  overlayClassName
}: AnimatedBackgroundProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {/* Background image */}
      <Image src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={cn("object-cover", imageClassName)}
        quality={quality}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        style={{
          transform: isAnimated ? `scale(${scale})` : "scale(1)",
          transition: isAnimated ? `transform ${duration}s ease-in-out` : "none",
          opacity,
          objectPosition
        }}
      />

      {/* Overlay */}
      {withOverlay && (
        <div
          className={cn(
            "absolute inset-0",
            withGradientOverlay
              ? `bg-gradient-${gradientDirection} ${gradientFromColor} ${gradientViaColor} ${gradientToColor}`
              : overlayColor,
            overlayClassName
          )}
        ></div>
      )}
    </div>
  );
});

export default AnimatedBackground;


