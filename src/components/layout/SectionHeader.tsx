"use client";

import { memo } from 'react';
import { cn } from '@/lib/utils';
import { COLORS } from '@/constants';

/**
 * Props for the SectionHeader component
 */
export interface SectionHeaderProps {
  /**
   * The section title
   */
  title: string;
  
  /**
   * The section subtitle
   */
  subtitle?: string;
  
  /**
   * Whether to center the header
   * @default true
   */
  centered?: boolean;
  
  /**
   * Whether to show a divider
   * @default true
   */
  withDivider?: boolean;
  
  /**
   * The color of the divider
   * @default COLORS.GOLD
   */
  dividerColor?: string;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  
  /**
   * Additional CSS classes for the subtitle
   */
  subtitleClassName?: string;
}

/**
 * SectionHeader Component
 *
 * A reusable section header component with title, subtitle, and divider.
 * This component provides consistent styling for section headers.
 *
 * @param {SectionHeaderProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
const SectionHeader = memo(function SectionHeader({
  title,
  subtitle,
  centered = true,
  withDivider = true,
  dividerColor = COLORS.GOLD,
  className = '',
  titleClassName = '',
  subtitleClassName = ''
}: SectionHeaderProps) {
  // Alignment classes
  const alignmentClass = centered ? 'text-center' : 'text-left';
  
  return (
    <div className={cn(
      'mb-12',
      alignmentClass,
      className
    )}>
      {/* Title */}
      <h2 className={cn(
        'text-3xl md:text-4xl font-playfair mb-4 relative inline-block',
        titleClassName
      )}>
        <span>{title}</span>
        
        {/* Divider */}
        {withDivider && (
          <div
            className="absolute -bottom-2 left-0 w-full h-0.5"
            style={{
              backgroundImage: `linear-gradient(to right, transparent, ${dividerColor}, transparent)`
            }}
          />
        )}
      </h2>
      
      {/* Subtitle */}
      {subtitle && (
        <p className={cn(
          'text-lg md:text-xl font-montserrat max-w-2xl mx-auto leading-relaxed',
          centered && 'mx-auto',
          subtitleClassName
        )}>
          {subtitle}
        </p>
      )}
    </div>
  );
});

export { SectionHeader };
export default SectionHeader;
