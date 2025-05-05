"use client";

import { memo, useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

/**
 * Props for the InView component
 */
export interface InViewProps {
  /**
   * The content to render
   */
  children: React.ReactNode;
  
  /**
   * Function to call when the component enters the viewport
   */
  onEnter?: () => void;
  
  /**
   * Function to call when the component leaves the viewport
   */
  onLeave?: () => void;
  
  /**
   * Whether to only trigger once
   * @default false
   */
  once?: boolean;
  
  /**
   * The threshold for intersection
   * @default 0.1
   */
  threshold?: number;
  
  /**
   * The root margin for intersection
   * @default "0px"
   */
  rootMargin?: string;
  
  /**
   * Whether to add animation classes
   * @default false
   */
  animate?: boolean;
  
  /**
   * The animation to use
   * @default "fade-in"
   */
  animation?: 'fade-in' | 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in' | 'zoom-out';
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * InView Component
 *
 * A component that detects when it enters the viewport.
 * This component uses the Intersection Observer API.
 *
 * @param {InViewProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
const InView = memo(function InView({
  children,
  onEnter,
  onLeave,
  once = false,
  threshold = 0.1,
  rootMargin = '0px',
  animate = false,
  animation = 'fade-in',
  className = ''
}: InViewProps) {
  // State for tracking if the component is in view
  const [isInView, setIsInView] = useState(false);
  
  // Ref for the component
  const ref = useRef<HTMLDivElement>(null);
  
  // Animation classes
  const animationClasses = {
    'fade-in': 'opacity-0 transition-opacity duration-500',
    'fade-up': 'opacity-0 translate-y-8 transition-all duration-500',
    'fade-down': 'opacity-0 -translate-y-8 transition-all duration-500',
    'fade-left': 'opacity-0 translate-x-8 transition-all duration-500',
    'fade-right': 'opacity-0 -translate-x-8 transition-all duration-500',
    'zoom-in': 'opacity-0 scale-95 transition-all duration-500',
    'zoom-out': 'opacity-0 scale-105 transition-all duration-500'
  };
  
  // In-view classes
  const inViewClasses = {
    'fade-in': 'opacity-100',
    'fade-up': 'opacity-100 translate-y-0',
    'fade-down': 'opacity-100 translate-y-0',
    'fade-left': 'opacity-100 translate-x-0',
    'fade-right': 'opacity-100 translate-x-0',
    'zoom-in': 'opacity-100 scale-100',
    'zoom-out': 'opacity-100 scale-100'
  };
  
  // Set up the intersection observer
  useEffect(() => {
    // Return if running on the server or if the ref is not set
    if (typeof window === 'undefined' || !ref.current) return;
    
    // Create the observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update the state
        const isNowInView = entry.isIntersecting;
        setIsInView(isNowInView);
        
        // Call the callbacks
        if (isNowInView) {
          onEnter?.();
          
          // Unobserve if only triggering once
          if (once) {
            observer.unobserve(entry.target);
          }
        } else {
          onLeave?.();
        }
      },
      {
        threshold,
        rootMargin
      }
    );
    
    // Start observing
    observer.observe(ref.current);
    
    // Clean up
    return () => {
      observer.disconnect();
    };
  }, [onEnter, onLeave, once, threshold, rootMargin]);
  
  return (
    <div
      ref={ref}
      className={cn(
        animate && animationClasses[animation],
        animate && isInView && inViewClasses[animation],
        className
      )}
    >
      {children}
    </div>
  );
});

export { InView };
export default InView;
