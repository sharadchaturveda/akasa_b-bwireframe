"use client";

import { memo } from 'react';
import { cn } from '@/lib/utils';

const BUTTON_SIZES = {
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
} as const;

interface HamburgerBarProps {
  isOpen: boolean;
  color: string;
  barHeight: string;
  openTransform?: string;
  openOpacity?: number;
}

const HamburgerBar = memo(function HamburgerBar({
  isOpen,
  color,
  barHeight,
  openTransform = 'none',
  openOpacity = 1
}: HamburgerBarProps) {
  return (
    <span
      style={{
        width: '100%',
        height: barHeight,
        backgroundColor: color,
        borderRadius: '2px',
        transition: 'transform 0.3s, opacity 0.3s',
        transform: isOpen ? openTransform : 'none',
        opacity: isOpen ? openOpacity : 1
      }}
    />
  );
});

export interface HamburgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
  color?: string;
  size?: keyof typeof BUTTON_SIZES;
}

const HamburgerButton = memo(function HamburgerButton({
  isOpen,
  onClick,
  className,
  color = 'white',
  size = 'medium'
}: HamburgerButtonProps) {
  const { width, height, barHeight } = BUTTON_SIZES[size];
  const barHeightNum = parseInt(barHeight);

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
      <HamburgerBar
        isOpen={isOpen}
        color={color}
        barHeight={barHeight}
        openTransform={`translateY(${barHeightNum * 3}px) rotate(45deg)`}
      />
      <HamburgerBar
        isOpen={isOpen}
        color={color}
        barHeight={barHeight}
        openOpacity={0}
      />
      <HamburgerBar
        isOpen={isOpen}
        color={color}
        barHeight={barHeight}
        openTransform={`translateY(-${barHeightNum * 3}px) rotate(-45deg)`}
      />
    </button>
  );
});

export default HamburgerButton;
