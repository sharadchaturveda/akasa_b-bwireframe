"use client";

import { memo, ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Props for the BackgroundImage component
 */
export interface BackgroundImageProps {
  /**
   * The image source
   */
  src: string;
  
  /**
   * The children to render on top of the background
   */
  children: ReactNode;
  
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
   * @default "to-t"
   */
  gradientDirection?: string;
  
  /**
   * The gradient from color
   * @default "from-black/90"
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
   * The minimum height of the container
   * @default "min-h-screen"
   */
  minHeight?: string;
  
  /**
   * The height of the container
   */
  height?: string;
  
  /**
   * The width of the container
   * @default "w-full"
   */
  width?: string;
  
  /**
   * The background position
   * @default "bg-center"
   */
  position?: string;
  
  /**
   * The background size
   * @default "bg-cover"
   */
  size?: string;
  
  /**
   * Additional CSS classes for the container
   */
  className?: string;
  
  /**
   * Additional CSS classes for the overlay
   */
  overlayClassName?: string;
  
  /**
   * Additional CSS classes for the content
   */
  contentClassName?: string;
}

/**
 * BackgroundImage Component
 * 
 * A component for displaying a background image with optional overlay and gradient.
 * 
 * @param {BackgroundImageProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
const BackgroundImage = memo(function BackgroundImage({
  src,
  children,
  withOverlay = false,
  overlayColor = "bg-black/50",
  withGradientOverlay = false,
  gradientDirection = "to-t",
  gradientFromColor = "from-black/90",
  gradientViaColor = "via-black/50",
  gradientToColor = "to-black/30",
  minHeight = "min-h-screen",
  height,
  width = "w-full",
  position = "bg-center",
  size = "bg-cover",
  className,
  overlayClassName,
  contentClassName
}: BackgroundImageProps) {
  return (
    <section 
      className={cn(
        "relative overflow-hidden",
        minHeight,
        height,
        width,
        position,
        size,
        className
      )}
      style={{ backgroundImage: `url('${src}')` }}
    >
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
      
      {/* Content */}
      <div className={cn("relative z-10", contentClassName)}>
        {children}
      </div>
    </section>
  );
});

export default BackgroundImage;
