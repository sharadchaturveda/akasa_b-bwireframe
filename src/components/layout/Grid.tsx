"use client";

import { memo } from 'react';
import { cn } from '@/lib/utils';

/**
 * Grid column counts
 */
export type GridColumns = 1 | 2 | 3 | 4 | 5 | 6 | 12;

/**
 * Grid gap sizes
 */
export type GridGap = 'none' | 'small' | 'medium' | 'large';

/**
 * Props for the Grid component
 */
export interface GridProps {
  /**
   * The grid content
   */
  children: React.ReactNode;
  
  /**
   * Number of columns on mobile
   * @default 1
   */
  mobileColumns?: GridColumns;
  
  /**
   * Number of columns on tablet
   * @default 2
   */
  tabletColumns?: GridColumns;
  
  /**
   * Number of columns on desktop
   * @default 3
   */
  desktopColumns?: GridColumns;
  
  /**
   * Gap between grid items
   * @default "medium"
   */
  gap?: GridGap;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Grid Component
 *
 * A reusable grid component for layout.
 * This component provides a responsive grid layout with configurable columns and gaps.
 *
 * @param {GridProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
const Grid = memo(function Grid({
  children,
  mobileColumns = 1,
  tabletColumns = 2,
  desktopColumns = 3,
  gap = 'medium',
  className = ''
}: GridProps) {
  // Column classes
  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
    12: 'grid-cols-12'
  };
  
  // Gap classes
  const gapClasses = {
    none: 'gap-0',
    small: 'gap-2',
    medium: 'gap-4 md:gap-6',
    large: 'gap-6 md:gap-8'
  };
  
  // Responsive column classes
  const responsiveColumnClasses = cn(
    `grid-cols-${mobileColumns}`,
    `md:grid-cols-${tabletColumns}`,
    `lg:grid-cols-${desktopColumns}`
  );
  
  return (
    <div className={cn(
      'grid',
      responsiveColumnClasses,
      gapClasses[gap],
      className
    )}>
      {children}
    </div>
  );
});

export { Grid };
export default Grid;
