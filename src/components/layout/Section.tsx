"use client";

import { memo } from 'react';
import { cn } from '@/lib/utils';
import { LAYOUT } from '@/constants';

/**
 * Section variants
 */
export type SectionVariant = 'default' | 'dark' | 'light' | 'transparent';

/**
 * Props for the Section component
 */
export interface SectionProps {
  /**
   * The section content
   */
  children: React.ReactNode;
  
  /**
   * The section ID for navigation
   */
  id?: string;
  
  /**
   * The section variant that determines its appearance
   * @default "default"
   */
  variant?: SectionVariant;
  
  /**
   * Whether to use full height
   * @default false
   */
  fullHeight?: boolean;
  
  /**
   * Whether to use a container for the content
   * @default true
   */
  withContainer?: boolean;
  
  /**
   * Whether to add padding to the section
   * @default true
   */
  withPadding?: boolean;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
}

/**
 * Section Component
 *
 * A reusable section component for page layouts.
 * This component provides consistent spacing and styling for page sections.
 *
 * @param {SectionProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
const Section = memo(function Section({
  children,
  id,
  variant = 'default',
  fullHeight = false,
  withContainer = true,
  withPadding = true,
  className = '',
  containerClassName = ''
}: SectionProps) {
  // Variant classes
  const variantClasses = {
    default: 'bg-black text-white',
    dark: 'bg-[#0A0A0A] text-white',
    light: 'bg-gray-100 text-black',
    transparent: 'bg-transparent'
  };
  
  // Height classes
  const heightClass = fullHeight ? 'min-h-screen' : '';
  
  // Padding classes
  const paddingClass = withPadding ? 'py-12 md:py-16' : '';
  
  return (
    <section
      id={id}
      className={cn(
        'w-full relative',
        variantClasses[variant],
        heightClass,
        paddingClass,
        className
      )}
    >
      {withContainer ? (
        <div className={cn(
          'container mx-auto px-4 md:px-8',
          containerClassName
        )}>
          {children}
        </div>
      ) : (
        children
      )}
    </section>
  );
});

export { Section };
export default Section;
