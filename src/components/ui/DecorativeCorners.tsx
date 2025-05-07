"use client";

import { memo } from 'react';
import { cn } from '@/lib/utils';

/**
 * Props for the DecorativeCorners component
 */
export interface DecorativeCornersProps {
  /**
   * The color of the corners
   * @default "border-[#E6C78B]/20"
   */
  color?: string;
  
  /**
   * The size of the corners
   * @default "medium"
   */
  size?: 'small' | 'medium' | 'large' | 'responsive';
  
  /**
   * The position of the corners
   * @default "all"
   */
  position?: 'all' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top' | 'bottom' | 'left' | 'right';
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * DecorativeCorners Component
 * 
 * A component for displaying decorative corners.
 * 
 * @param {DecorativeCornersProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
const DecorativeCorners = memo(function DecorativeCorners({
  color = "border-[#E6C78B]/20",
  size = 'medium',
  position = 'all',
  className
}: DecorativeCornersProps) {
  // Size classes
  const sizeClasses = {
    small: "w-8 h-8",
    medium: "w-12 h-12",
    large: "w-16 h-16",
    responsive: "w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20"
  };
  
  // Position classes
  const shouldRenderTopLeft = ['all', 'top-left', 'top', 'left'].includes(position);
  const shouldRenderTopRight = ['all', 'top-right', 'top', 'right'].includes(position);
  const shouldRenderBottomLeft = ['all', 'bottom-left', 'bottom', 'left'].includes(position);
  const shouldRenderBottomRight = ['all', 'bottom-right', 'bottom', 'right'].includes(position);
  
  return (
    <div className={cn("absolute inset-0 pointer-events-none", className)}>
      {/* Top Left Corner */}
      {shouldRenderTopLeft && (
        <div className={cn(
          "absolute top-0 left-0 border-t border-l",
          sizeClasses[size],
          color
        )}></div>
      )}
      
      {/* Top Right Corner */}
      {shouldRenderTopRight && (
        <div className={cn(
          "absolute top-0 right-0 border-t border-r",
          sizeClasses[size],
          color
        )}></div>
      )}
      
      {/* Bottom Left Corner */}
      {shouldRenderBottomLeft && (
        <div className={cn(
          "absolute bottom-0 left-0 border-b border-l",
          sizeClasses[size],
          color
        )}></div>
      )}
      
      {/* Bottom Right Corner */}
      {shouldRenderBottomRight && (
        <div className={cn(
          "absolute bottom-0 right-0 border-b border-r",
          sizeClasses[size],
          color
        )}></div>
      )}
    </div>
  );
});

export default DecorativeCorners;
