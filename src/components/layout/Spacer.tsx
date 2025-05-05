"use client";

import { memo } from 'react';
import { cn } from '@/lib/utils';

/**
 * Spacer sizes
 */
export type SpacerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';

/**
 * Props for the Spacer component
 */
export interface SpacerProps {
  /**
   * Spacer size
   * @default "md"
   */
  size?: SpacerSize;
  
  /**
   * Whether to use horizontal spacing
   * @default false
   */
  horizontal?: boolean;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Spacer Component
 *
 * A reusable spacer component for adding vertical or horizontal space.
 * This component provides consistent spacing between elements.
 *
 * @param {SpacerProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
const Spacer = memo(function Spacer({
  size = 'md',
  horizontal = false,
  className = ''
}: SpacerProps) {
  // Size classes for vertical spacing
  const verticalSizeClasses = {
    xs: 'h-2',
    sm: 'h-4',
    md: 'h-6',
    lg: 'h-8',
    xl: 'h-12',
    '2xl': 'h-16',
    '3xl': 'h-24',
    '4xl': 'h-32'
  };
  
  // Size classes for horizontal spacing
  const horizontalSizeClasses = {
    xs: 'w-2',
    sm: 'w-4',
    md: 'w-6',
    lg: 'w-8',
    xl: 'w-12',
    '2xl': 'w-16',
    '3xl': 'w-24',
    '4xl': 'w-32'
  };
  
  // Determine the size class based on direction
  const sizeClass = horizontal ? horizontalSizeClasses[size] : verticalSizeClasses[size];
  
  // Determine the flex class based on direction
  const flexClass = horizontal ? 'inline-block' : 'block';
  
  return (
    <div
      className={cn(
        flexClass,
        sizeClass,
        className
      )}
      aria-hidden="true"
    />
  );
});

export { Spacer };
export default Spacer;
