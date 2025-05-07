"use client";

import { memo, ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Props for the ContentCard component
 */
export interface ContentCardProps {
  /**
   * The children to render inside the card
   */
  children: ReactNode;
  
  /**
   * Whether to add a backdrop blur effect
   * @default true
   */
  withBackdropBlur?: boolean;
  
  /**
   * Whether to add a border
   * @default true
   */
  withBorder?: boolean;
  
  /**
   * The border color
   * @default "border-[#E6C78B]/20"
   */
  borderColor?: string;
  
  /**
   * Whether to add a shadow
   * @default true
   */
  withShadow?: boolean;
  
  /**
   * The shadow color
   * @default "shadow-2xl"
   */
  shadowColor?: string;
  
  /**
   * The background color
   * @default "bg-black/70"
   */
  backgroundColor?: string;
  
  /**
   * Whether to add animation
   * @default true
   */
  withAnimation?: boolean;
  
  /**
   * The animation type
   * @default "animate-fadeSlideUp"
   */
  animation?: string;
  
  /**
   * The maximum width of the card
   */
  maxWidth?: string;
  
  /**
   * The padding of the card
   * @default "p-8"
   */
  padding?: string;
  
  /**
   * The border radius of the card
   * @default "rounded-lg"
   */
  borderRadius?: string;
  
  /**
   * Additional CSS classes for the card
   */
  className?: string;
}

/**
 * ContentCard Component
 * 
 * A component for displaying content in a card with various styling options.
 * 
 * @param {ContentCardProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
const ContentCard = memo(function ContentCard({
  children,
  withBackdropBlur = true,
  withBorder = true,
  borderColor = "border-[#E6C78B]/20",
  withShadow = true,
  shadowColor = "shadow-2xl",
  backgroundColor = "bg-black/70",
  withAnimation = true,
  animation = "animate-fadeSlideUp",
  maxWidth,
  padding = "p-8",
  borderRadius = "rounded-lg",
  className
}: ContentCardProps) {
  return (
    <div 
      className={cn(
        "relative",
        backgroundColor,
        padding,
        borderRadius,
        withBorder && `border ${borderColor}`,
        withShadow && shadowColor,
        withBackdropBlur && "backdrop-blur-sm",
        withAnimation && animation,
        maxWidth && `max-w-${maxWidth}`,
        className
      )}
    >
      {children}
    </div>
  );
});

export default ContentCard;
