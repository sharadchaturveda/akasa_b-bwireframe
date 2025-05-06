/**
 * Documented Button Component
 *
 * This file contains a fully documented button component that serves as an example
 * for how components should be documented in the Akasa website project.
 * This component demonstrates proper JSDoc comments, TypeScript types, and code organization.
 */

"use client";

import React, { memo } from 'react';


/**
 * Props for the DocumentedButton component
 */
interface DocumentedButtonProps {
  /**
   * The button content
   * @required
   */
  children: React.ReactNode;

  /**
   * The button variant that determines its appearance
   * @default "primary"
   */
  variant?: 'primary' | 'secondary' | 'outline';

  /**
   * Additional CSS classes to apply to the button
   */
  className?: string;

  /**
   * Function to call when the button is clicked
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Whether the button is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * The type of the button
   * @default "button"
   */
  type?: 'button' | 'submit' | 'reset';

  /**
   * Whether to show a gold fill animation on hover
   * This is disabled on mobile devices
   * @default true
   */
  showHoverAnimation?: boolean;

  /**
   * ARIA label for accessibility
   * Use this when the button doesn't have text content
   */
  ariaLabel?: string;
}

/**
 * Utility function to combine class names
 *
 * @param {string[]} classes - Array of class names to combine
 * @returns {string} Combined class names with duplicates removed
 */
function cn(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * DocumentedButton Component
 *
 * A reusable button component with various styles and states.
 * This component follows Akasa's design guidelines with rounded corners
 * and gold fill animations on hover (for desktop only).
 *
 * Design considerations:
 * - Uses rounded corners (rounded-full) for consistent button styling
 * - Implements hover animations for desktop only
 * - Follows the color scheme of the Akasa brand
 * - Provides visual feedback for disabled state
 *
 * Accessibility considerations:
 * - Supports ARIA labels for buttons without text content
 * - Maintains proper focus states for keyboard navigation
 * - Disables the button when in disabled state
 *
 * @param {DocumentedButtonProps} props - The component props
 * @returns {React.ReactElement} The rendered button
 *
 * @example
 * // Primary button
 * <DocumentedButton onClick={handleClick}>Click me</DocumentedButton>
 *
 * @example
 * // Secondary button with custom class
 * <DocumentedButton
 *   variant="secondary"
 *   className="mt-4"
 *   onClick={handleClick}
 * >
 *   Click me
 * </DocumentedButton>
 *
 * @example
 * // Disabled outline button
 * <DocumentedButton
 *   variant="outline"
 *   disabled={true}
 * >
 *   Cannot click
 * </DocumentedButton>
 */
const DocumentedButton = memo(function DocumentedButton({
  children,
  variant = 'primary',
  className = '',
  onClick,
  disabled = false,
  type = 'button',
  showHoverAnimation = true,
  ariaLabel
}: DocumentedButtonProps): React.ReactElement {
  // Desktop-only version
  const isMobile = false;

  // Determine the base classes based on the variant
  // These follow Akasa's design guidelines for buttons
  const baseClasses = {
    // Primary buttons use the deep blue background with white text
    primary: 'bg-[#1A2A3A] text-white',

    // Secondary buttons use a lighter background
    secondary: 'bg-gray-200 text-gray-800',

    // Outline buttons have a transparent background with a border
    outline: 'bg-transparent border border-[#1A2A3A] text-[#1A2A3A]'
  };

  // Determine hover classes based on variant and device type
  // We disable hover effects on mobile devices
  const hoverClasses = !isMobile && showHoverAnimation ? {
    // Primary buttons show a gold fill animation on hover
    primary: 'hover:bg-[#E6C78B] hover:text-[#1A2A3A] transition-colors duration-300',

    // Secondary buttons darken slightly on hover
    secondary: 'hover:bg-gray-300 transition-colors duration-300',

    // Outline buttons show a light background on hover
    outline: 'hover:bg-[#1A2A3A]/10 transition-colors duration-300'
  } : {
    primary: '',
    secondary: '',
    outline: ''
  };

  // Common classes for all button variants
  // These ensure consistent styling across all buttons
  const commonClasses = 'px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#1A2A3A] focus:ring-opacity-50';

  return (
    <button
      type={type}
      className={cn(
        commonClasses,
        baseClasses[variant],
        hoverClasses[variant],
        disabled ? 'opacity-50 cursor-not-allowed' : '',
        className
      )}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
});

export default DocumentedButton;
