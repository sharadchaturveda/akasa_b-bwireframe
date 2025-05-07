"use client";

import { memo } from 'react';
import { cn } from '@/lib/utils';

/**
 * Props for the HamburgerButton component
 */
export interface HamburgerButtonProps {
  /**
   * Whether the menu is open
   */
  isOpen: boolean;
  
  /**
   * Function to call when the button is clicked
   */
  onClick: () => void;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * The color of the button
   * @default "white"
   */
  color?: string;
  
  /**
   * The size of the button
   * @default "medium"
   */
  size?: 'small' | 'medium' | 'large';
}

/**
 * HamburgerButton Component
 * 
 * A button component for toggling a mobile menu.
 * 
 * @param {HamburgerButtonProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
const HamburgerButton = memo(function HamburgerButton({
  isOpen,
  onClick,
  className,
  color = 'white',
  size = 'medium'
}: HamburgerButtonProps) {
  // Size configuration
  const sizeConfig = {
    small: {
      width: '24px',
      height: '18px',
      barHeight: '2px'
    },
    medium: {
      width: '30px',
      height: '24px',
      barHeight: '3px'
    },
    large: {
      width: '36px',
      height: '30px',
      barHeight: '4px'
    }
  };
  
  const { width, height, barHeight } = sizeConfig[size];
  
  return (
    <button
      aria-label={isOpen ? "Close menu" : "Open menu"}
      onClick={onClick}
      className={cn("focus:outline-none", className)}
      style={{
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width,
        height
      }}
    >
      <span
        style={{
          width: '100%',
          height: barHeight,
          backgroundColor: color,
          borderRadius: '2px',
          transition: 'transform 0.3s, opacity 0.3s',
          transform: isOpen ? `translateY(${parseInt(barHeight) * 3}px) rotate(45deg)` : 'none'
        }}
      />
      <span
        style={{
          width: '100%',
          height: barHeight,
          backgroundColor: color,
          borderRadius: '2px',
          transition: 'opacity 0.3s',
          opacity: isOpen ? 0 : 1
        }}
      />
      <span
        style={{
          width: '100%',
          height: barHeight,
          backgroundColor: color,
          borderRadius: '2px',
          transition: 'transform 0.3s, opacity 0.3s',
          transform: isOpen ? `translateY(-${parseInt(barHeight) * 3}px) rotate(-45deg)` : 'none'
        }}
      />
    </button>
  );
});

export default HamburgerButton;
