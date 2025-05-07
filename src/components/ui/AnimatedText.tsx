"use client";

import { memo, ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Animation types
 */
export type AnimationType = 'fadeIn' | 'fadeSlideUp' | 'float';

/**
 * Props for the AnimatedText component
 */
export interface AnimatedTextProps {
  /**
   * The text content
   */
  children: ReactNode;
  
  /**
   * The animation type
   * @default "fadeSlideUp"
   */
  animation?: AnimationType;
  
  /**
   * The animation delay in seconds
   * @default 0
   */
  delay?: number;
  
  /**
   * The animation duration in seconds
   * @default 0.8
   */
  duration?: number;
  
  /**
   * The HTML element to render
   * @default "p"
   */
  as?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * AnimatedText Component
 * 
 * A component for displaying animated text.
 * 
 * @param {AnimatedTextProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
const AnimatedText = memo(function AnimatedText({
  children,
  animation = 'fadeSlideUp',
  delay = 0,
  duration = 0.8,
  as = 'p',
  className
}: AnimatedTextProps) {
  // Animation classes
  const animationClasses = {
    fadeIn: 'animate-fadeIn',
    fadeSlideUp: 'animate-fadeSlideUp',
    float: 'animate-float'
  };
  
  // Create the style object
  const style: React.CSSProperties = {
    animationDelay: `${delay}s`
  };
  
  // Add duration if it's not the default
  if (duration !== 0.8) {
    style.animationDuration = `${duration}s`;
  }
  
  // Create the component
  const Component = as;
  
  return (
    <Component
      className={cn(animationClasses[animation], className)}
      style={style}
    >
      {children}
    </Component>
  );
});

export default AnimatedText;
