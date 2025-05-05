"use client";

import { memo } from 'react';
import { cn } from '@/lib/utils';

/**
 * Props for the AspectRatio component
 */
export interface AspectRatioProps {
  /**
   * The content to render
   */
  children: React.ReactNode;
  
  /**
   * The aspect ratio (width/height)
   * @default 1 (square)
   */
  ratio?: number;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * AspectRatio Component
 *
 * A reusable component for maintaining a specific aspect ratio.
 * This component is useful for images, videos, and other media.
 *
 * @param {AspectRatioProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
const AspectRatio = memo(function AspectRatio({
  children,
  ratio = 1,
  className = ''
}: AspectRatioProps) {
  return (
    <div
      className={cn(
        'relative w-full',
        className
      )}
      style={{
        paddingBottom: `${(1 / ratio) * 100}%`
      }}
    >
      <div className="absolute inset-0">
        {children}
      </div>
    </div>
  );
});

export { AspectRatio };
export default AspectRatio;
