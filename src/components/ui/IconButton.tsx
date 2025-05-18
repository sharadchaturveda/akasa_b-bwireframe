"use client";

import { memo, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import Icon, { IconName } from '@/components/ui/icon';
import { COLORS } from '@/constants';

/**
 * IconButton sizes
 */
export type IconButtonSize = 'small' | 'medium' | 'large';

/**
 * IconButton variants
 */
export type IconButtonVariant = 'default' | 'outline' | 'ghost';

/**
 * Props for the IconButton component
 */
export interface IconButtonProps {
  /**
   * The icon name to display
   */
  icon: IconName;

  /**
   * The button size
   * @default "medium"
   */
  size?: IconButtonSize;

  /**
   * The button variant
   * @default "default"
   */
  variant?: IconButtonVariant;

  /**
   * The icon color
   * @default "#E6C78B" (gold)
   */
  iconColor?: string;

  /**
   * The icon size in pixels
   */
  iconSize?: number;

  /**
   * The icon stroke width
   * @default 2
   */
  strokeWidth?: number;

  /**
   * Whether the button is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether to show hover animation
   * @default true
   */
  showHoverAnimation?: boolean;

  /**
   * The aria-label for accessibility
   */
  ariaLabel?: string;

  /**
   * Additional CSS classes for the button
   */
  className?: string;

  /**
   * Additional CSS classes for the icon
   */
  iconClassName?: string;

  /**
   * onClick handler for the button
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

/**
 * IconButton Component
 *
 * A button with an icon and consistent styling.
 * This component handles different sizes, variants, and hover effects.
 *
 * @param {IconButtonProps} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const IconButton = memo(forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton({
  icon,
  size = 'medium',
  variant = 'default',
  iconColor = COLORS.GOLD,
  iconSize,
  strokeWidth = 2,
  disabled = false,
  showHoverAnimation = true,
  ariaLabel,
  className = '',
  iconClassName = '',
  onClick
}, ref) {
  // Size classes
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-10 h-10',
    large: 'w-12 h-12'
  };

  // Variant classes
  const variantClasses = {
    default: 'bg-[#1A2A3A] text-white hover:bg-[#0A1A2A]',
    outline: 'bg-transparent border border-[#E6C78B]/30 text-white hover:bg-[#1A2A3A]/20',
    ghost: 'bg-transparent text-white hover:bg-[#1A2A3A]/20'
  };

  // Determine icon size based on button size if not explicitly provided
  const defaultIconSizes = {
    small: 16,
    medium: 20,
    large: 24
  };

  const finalIconSize = iconSize || defaultIconSizes[size];

  // Hover animation classes
  const hoverAnimationClass = showHoverAnimation && !disabled
    ? 'transition-transform duration-300 hover:scale-105'
    : '';

  // Disabled classes
  const disabledClass = disabled
    ? 'opacity-50 cursor-not-allowed'
    : 'cursor-pointer';

  return (
    <button
      ref={ref}
      className={cn(
        'flex items-center justify-center rounded-full',
        sizeClasses[size],
        variantClasses[variant],
        hoverAnimationClass,
        disabledClass,
        className
      )}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      aria-label={ariaLabel || `${icon} button`}
      type="button"
    >
      <Icon
        name={icon}
        size={finalIconSize}
        color={iconColor}
        strokeWidth={strokeWidth}
        className={iconClassName}
      />
    </button>
  );
}));

export default IconButton;
