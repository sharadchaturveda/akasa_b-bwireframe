"use client";

import { memo, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { COLORS } from '@/constants';

/**
 * Card variants
 */
export type CardVariant = 'default' | 'outlined' | 'elevated';

/**
 * Props for the Card component
 */
export interface CardProps {
  /**
   * The card content
   */
  children: React.ReactNode;
  
  /**
   * The card variant that determines its appearance
   * @default "default"
   */
  variant?: CardVariant;
  
  /**
   * Whether to add hover effects
   * @default true
   */
  withHoverEffect?: boolean;
  
  /**
   * Whether to add padding
   * @default true
   */
  withPadding?: boolean;
  
  /**
   * Whether to add rounded corners
   * @default true
   */
  withRoundedCorners?: boolean;
  
  /**
   * Whether the card is clickable
   * @default false
   */
  isClickable?: boolean;
  
  /**
   * Function to call when the card is clicked
   */
  onClick?: () => void;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Card Component
 *
 * A reusable card component for displaying content in a contained area.
 * This component provides consistent styling for cards.
 *
 * @param {CardProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
const Card = memo(forwardRef<HTMLDivElement, CardProps>(function Card(
  {
    children,
    variant = 'default',
    withHoverEffect = true,
    withPadding = true,
    withRoundedCorners = true,
    isClickable = false,
    onClick,
    className = ''
  },
  ref
) {
  // Variant classes
  const variantClasses = {
    default: 'bg-[#0A0A0A]',
    outlined: `bg-transparent border border-[${COLORS.DEEP_BLUE}]`,
    elevated: 'bg-[#0A0A0A] shadow-lg'
  };
  
  // Padding classes
  const paddingClass = withPadding ? 'p-6' : '';
  
  // Rounded corners classes
  const roundedClass = withRoundedCorners ? 'rounded-lg' : '';
  
  // Hover effect classes
  const hoverClass = withHoverEffect
    ? 'transition-transform duration-300 hover:transform hover:scale-[1.02]'
    : '';
  
  // Clickable classes
  const clickableClass = isClickable
    ? 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1A2A3A] focus:ring-opacity-50'
    : '';
  
  // Element type based on clickability
  const Element = isClickable ? 'button' : 'div';
  
  return (
    <Element
      ref={ref as any}
      className={cn(
        'overflow-hidden',
        variantClasses[variant],
        paddingClass,
        roundedClass,
        hoverClass,
        clickableClass,
        className
      )}
      onClick={isClickable ? onClick : undefined}
      type={isClickable ? 'button' : undefined}
    >
      {children}
    </Element>
  );
}));

export { Card };
export default Card;
