"use client";

import { memo } from 'react';
import { cn } from '@/lib/utils';

/**
 * Flex directions
 */
export type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';

/**
 * Flex justify content options
 */
export type FlexJustify = 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';

/**
 * Flex align items options
 */
export type FlexAlign = 'start' | 'end' | 'center' | 'baseline' | 'stretch';

/**
 * Flex wrap options
 */
export type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

/**
 * Props for the Flex component
 */
export interface FlexProps {
  /**
   * The flex content
   */
  children: React.ReactNode;
  
  /**
   * Flex direction
   * @default "row"
   */
  direction?: FlexDirection;
  
  /**
   * Flex justify content
   * @default "start"
   */
  justify?: FlexJustify;
  
  /**
   * Flex align items
   * @default "start"
   */
  align?: FlexAlign;
  
  /**
   * Flex wrap
   * @default "nowrap"
   */
  wrap?: FlexWrap;
  
  /**
   * Gap between flex items
   * @default 0
   */
  gap?: number;
  
  /**
   * Whether to use inline-flex
   * @default false
   */
  inline?: boolean;
  
  /**
   * Whether to use full width
   * @default false
   */
  fullWidth?: boolean;
  
  /**
   * Whether to use full height
   * @default false
   */
  fullHeight?: boolean;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Flex Component
 *
 * A reusable flex component for layout.
 * This component provides a flexible layout with configurable direction, alignment, and spacing.
 *
 * @param {FlexProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
const Flex = memo(function Flex({
  children,
  direction = 'row',
  justify = 'start',
  align = 'start',
  wrap = 'nowrap',
  gap = 0,
  inline = false,
  fullWidth = false,
  fullHeight = false,
  className = ''
}: FlexProps) {
  // Direction classes
  const directionClasses = {
    row: 'flex-row',
    column: 'flex-col',
    'row-reverse': 'flex-row-reverse',
    'column-reverse': 'flex-col-reverse'
  };
  
  // Justify content classes
  const justifyClasses = {
    start: 'justify-start',
    end: 'justify-end',
    center: 'justify-center',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly'
  };
  
  // Align items classes
  const alignClasses = {
    start: 'items-start',
    end: 'items-end',
    center: 'items-center',
    baseline: 'items-baseline',
    stretch: 'items-stretch'
  };
  
  // Wrap classes
  const wrapClasses = {
    nowrap: 'flex-nowrap',
    wrap: 'flex-wrap',
    'wrap-reverse': 'flex-wrap-reverse'
  };
  
  // Width and height classes
  const widthClass = fullWidth ? 'w-full' : '';
  const heightClass = fullHeight ? 'h-full' : '';
  
  // Display class
  const displayClass = inline ? 'inline-flex' : 'flex';
  
  return (
    <div
      className={cn(
        displayClass,
        directionClasses[direction],
        justifyClasses[justify],
        alignClasses[align],
        wrapClasses[wrap],
        widthClass,
        heightClass,
        gap > 0 && `gap-${gap}`,
        className
      )}
    >
      {children}
    </div>
  );
});

export { Flex };
export default Flex;
