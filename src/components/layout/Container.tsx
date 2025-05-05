"use client";

import { memo } from 'react';
import { cn } from '@/lib/utils';
import { LAYOUT } from '@/constants';

/**
 * Props for the Container component
 */
export interface ContainerProps {
  /**
   * The container content
   */
  children: React.ReactNode;
  
  /**
   * Whether to add padding
   * @default true
   */
  withPadding?: boolean;
  
  /**
   * Whether to center the content
   * @default true
   */
  centered?: boolean;
  
  /**
   * Maximum width of the container
   * @default "max-w-7xl"
   */
  maxWidth?: string;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Container Component
 *
 * A reusable container component for layout.
 * This component provides consistent spacing and centering for content.
 *
 * @param {ContainerProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
const Container = memo(function Container({
  children,
  withPadding = true,
  centered = true,
  maxWidth = 'max-w-7xl',
  className = ''
}: ContainerProps) {
  // Padding classes
  const paddingClass = withPadding ? 'px-4 md:px-8' : '';
  
  // Centering classes
  const centeringClass = centered ? 'mx-auto' : '';
  
  return (
    <div className={cn(
      'w-full',
      maxWidth,
      paddingClass,
      centeringClass,
      className
    )}>
      {children}
    </div>
  );
});

export { Container };
export default Container;
