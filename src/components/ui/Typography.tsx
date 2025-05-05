"use client";

import { memo, forwardRef } from 'react';
import { cn } from '@/lib/utils';

/**
 * Typography variants
 */
export type TypographyVariant = 
  | 'h1' 
  | 'h2' 
  | 'h3' 
  | 'h4' 
  | 'h5' 
  | 'h6' 
  | 'subtitle1' 
  | 'subtitle2' 
  | 'body1' 
  | 'body2' 
  | 'caption' 
  | 'overline';

/**
 * Typography colors
 */
export type TypographyColor = 
  | 'default' 
  | 'primary' 
  | 'secondary' 
  | 'accent' 
  | 'muted' 
  | 'white' 
  | 'black';

/**
 * Typography alignments
 */
export type TypographyAlign = 'left' | 'center' | 'right' | 'justify';

/**
 * Props for the Typography component
 */
export interface TypographyProps {
  /**
   * The typography content
   */
  children: React.ReactNode;
  
  /**
   * The typography variant
   * @default "body1"
   */
  variant?: TypographyVariant;
  
  /**
   * The typography color
   * @default "default"
   */
  color?: TypographyColor;
  
  /**
   * The typography alignment
   * @default "left"
   */
  align?: TypographyAlign;
  
  /**
   * Whether to use a custom component
   * @default undefined
   */
  component?: React.ElementType;
  
  /**
   * Whether to truncate text with ellipsis
   * @default false
   */
  truncate?: boolean;
  
  /**
   * Whether to use a serif font
   * @default false
   */
  serif?: boolean;
  
  /**
   * Whether to use a monospace font
   * @default false
   */
  mono?: boolean;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Typography Component
 *
 * A reusable typography component for text styling.
 * This component provides consistent typography styling across the application.
 *
 * @param {TypographyProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
const Typography = memo(forwardRef<HTMLElement, TypographyProps>(function Typography(
  {
    children,
    variant = 'body1',
    color = 'default',
    align = 'left',
    component,
    truncate = false,
    serif = false,
    mono = false,
    className = '',
    ...props
  },
  ref
) {
  // Variant classes
  const variantClasses = {
    h1: 'text-4xl md:text-5xl font-bold',
    h2: 'text-3xl md:text-4xl font-bold',
    h3: 'text-2xl md:text-3xl font-bold',
    h4: 'text-xl md:text-2xl font-bold',
    h5: 'text-lg md:text-xl font-bold',
    h6: 'text-base md:text-lg font-bold',
    subtitle1: 'text-xl font-medium',
    subtitle2: 'text-lg font-medium',
    body1: 'text-base',
    body2: 'text-sm',
    caption: 'text-xs',
    overline: 'text-xs uppercase tracking-wider'
  };
  
  // Color classes
  const colorClasses = {
    default: 'text-white',
    primary: 'text-[#1A2A3A]',
    secondary: 'text-[#E6C78B]',
    accent: 'text-blue-500',
    muted: 'text-white/70',
    white: 'text-white',
    black: 'text-black'
  };
  
  // Alignment classes
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify'
  };
  
  // Font family classes
  const fontFamilyClass = serif 
    ? 'font-playfair' 
    : mono 
      ? 'font-mono' 
      : 'font-montserrat';
  
  // Truncate class
  const truncateClass = truncate ? 'truncate' : '';
  
  // Determine the component to render
  const Component = component || getDefaultComponent(variant);
  
  return (
    <Component
      ref={ref}
      className={cn(
        variantClasses[variant],
        colorClasses[color],
        alignClasses[align],
        fontFamilyClass,
        truncateClass,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}));

/**
 * Get the default component for a typography variant
 *
 * @param {TypographyVariant} variant - The typography variant
 * @returns {React.ElementType} The default component
 */
function getDefaultComponent(variant: TypographyVariant): React.ElementType {
  switch (variant) {
    case 'h1':
      return 'h1';
    case 'h2':
      return 'h2';
    case 'h3':
      return 'h3';
    case 'h4':
      return 'h4';
    case 'h5':
      return 'h5';
    case 'h6':
      return 'h6';
    case 'subtitle1':
    case 'subtitle2':
      return 'h6';
    case 'body1':
    case 'body2':
      return 'p';
    case 'caption':
      return 'span';
    case 'overline':
      return 'span';
    default:
      return 'p';
  }
}

export { Typography };
export default Typography;
