"use client";

import { memo } from 'react';
import { cn } from '@/lib/utils';
import { COLORS } from '@/constants';

/**
 * Divider variants
 */
export type DividerVariant = 'solid' | 'dashed' | 'dotted' | 'gradient';

/**
 * Divider orientations
 */
export type DividerOrientation = 'horizontal' | 'vertical';

/**
 * Props for the Divider component
 */
export interface DividerProps {
  /**
   * The divider variant
   * @default "solid"
   */
  variant?: DividerVariant;
  
  /**
   * The divider orientation
   * @default "horizontal"
   */
  orientation?: DividerOrientation;
  
  /**
   * The divider color
   * @default COLORS.GOLD
   */
  color?: string;
  
  /**
   * The divider thickness
   * @default 1
   */
  thickness?: number;
  
  /**
   * The divider length (for vertical dividers)
   * @default "100%"
   */
  length?: string | number;
  
  /**
   * Whether to add margin
   * @default true
   */
  withMargin?: boolean;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Divider Component
 *
 * A reusable divider component for visual separation.
 * This component provides consistent dividers across the application.
 *
 * @param {DividerProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
const Divider = memo(function Divider({
  variant = 'solid',
  orientation = 'horizontal',
  color = COLORS.GOLD,
  thickness = 1,
  length = '100%',
  withMargin = true,
  className = ''
}: DividerProps) {
  // Variant classes
  const variantClasses = {
    solid: 'border-solid',
    dashed: 'border-dashed',
    dotted: 'border-dotted',
    gradient: ''
  };
  
  // Orientation classes
  const orientationClasses = {
    horizontal: 'w-full border-t',
    vertical: 'h-full border-l'
  };
  
  // Margin classes
  const marginClasses = withMargin
    ? orientation === 'horizontal'
      ? 'my-6'
      : 'mx-4'
    : '';
  
  // For gradient dividers
  if (variant === 'gradient') {
    const gradientStyle = orientation === 'horizontal'
      ? {
          height: `${thickness}px`,
          width: orientation === 'horizontal' ? length : `${thickness}px`,
          backgroundImage: `linear-gradient(to right, transparent, ${color}, transparent)`
        }
      : {
          width: `${thickness}px`,
          height: orientation === 'vertical' ? length : `${thickness}px`,
          backgroundImage: `linear-gradient(to bottom, transparent, ${color}, transparent)`
        };
    
    return (
      <div
        className={cn(
          marginClasses,
          className
        )}
        style={gradientStyle}
        role="separator"
        aria-orientation={orientation}
      />
    );
  }
  
  // For non-gradient dividers
  const style = {
    borderColor: color,
    borderWidth: `${thickness}px`,
    ...(orientation === 'vertical' && { height: length })
  };
  
  return (
    <div
      className={cn(
        orientationClasses[orientation],
        variantClasses[variant],
        marginClasses,
        className
      )}
      style={style}
      role="separator"
      aria-orientation={orientation}
    />
  );
});

export { Divider };
export default Divider;
