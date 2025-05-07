"use client";

import { memo } from 'react';
import { cn } from '@/lib/utils';

/**
 * Props for the SectionHeading component
 */
export interface SectionHeadingProps {
  /**
   * The section title
   */
  title: string;
  
  /**
   * The section subtitle
   */
  subtitle?: string;
  
  /**
   * The section label
   */
  label?: string;
  
  /**
   * The color of the label
   * @default "text-[#E6C78B]"
   */
  labelColor?: string;
  
  /**
   * The color of the title
   * @default "text-white"
   */
  titleColor?: string;
  
  /**
   * The color of the subtitle
   * @default "text-white"
   */
  subtitleColor?: string;
  
  /**
   * Whether to show a divider
   * @default true
   */
  withDivider?: boolean;
  
  /**
   * The color of the divider
   * @default "bg-[#E6C78B]/80"
   */
  dividerColor?: string;
  
  /**
   * Whether to use animation
   * @default true
   */
  withAnimation?: boolean;
  
  /**
   * The animation delay for the label in seconds
   * @default 0.1
   */
  labelDelay?: number;
  
  /**
   * The animation delay for the subtitle in seconds
   * @default 0.1
   */
  subtitleDelay?: number;
  
  /**
   * The animation delay for the title in seconds
   * @default 0.2
   */
  titleDelay?: number;
  
  /**
   * The animation delay for the divider in seconds
   * @default 0.3
   */
  dividerDelay?: number;
  
  /**
   * The alignment of the heading
   * @default "left"
   */
  align?: 'left' | 'center' | 'right';
  
  /**
   * Additional CSS classes for the container
   */
  className?: string;
  
  /**
   * Additional CSS classes for the label
   */
  labelClassName?: string;
  
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  
  /**
   * Additional CSS classes for the subtitle
   */
  subtitleClassName?: string;
  
  /**
   * Additional CSS classes for the divider
   */
  dividerClassName?: string;
}

/**
 * SectionHeading Component
 * 
 * A component for displaying a section heading with optional label, subtitle, and divider.
 * 
 * @param {SectionHeadingProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
const SectionHeading = memo(function SectionHeading({
  title,
  subtitle,
  label,
  labelColor = "text-[#E6C78B]",
  titleColor = "text-white",
  subtitleColor = "text-white",
  withDivider = true,
  dividerColor = "bg-[#E6C78B]/80",
  withAnimation = true,
  labelDelay = 0.1,
  subtitleDelay = 0.1,
  titleDelay = 0.2,
  dividerDelay = 0.3,
  align = 'left',
  className,
  labelClassName,
  titleClassName,
  subtitleClassName,
  dividerClassName
}: SectionHeadingProps) {
  // Alignment classes
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };
  
  // Animation classes
  const animationClass = withAnimation ? 'animate-fadeSlideUp' : '';
  
  return (
    <div className={cn(alignClasses[align], className)}>
      {/* Label */}
      {label && (
        <span 
          className={cn(
            labelColor,
            "text-xs sm:text-sm tracking-widest uppercase mb-2 block font-montserrat",
            animationClass,
            labelClassName
          )}
          style={withAnimation ? { animationDelay: `${labelDelay}s` } : undefined}
        >
          {label}
        </span>
      )}
      
      {/* Subtitle (if it comes before the title) */}
      {subtitle && subtitleDelay < titleDelay && (
        <h3 
          className={cn(
            subtitleColor,
            "text-xl sm:text-2xl font-montserrat mb-2",
            animationClass,
            subtitleClassName
          )}
          style={withAnimation ? { animationDelay: `${subtitleDelay}s` } : undefined}
        >
          {subtitle}
        </h3>
      )}
      
      {/* Title */}
      <h2 
        className={cn(
          titleColor,
          "text-3xl sm:text-4xl font-playfair mb-4",
          animationClass,
          titleClassName
        )}
        style={withAnimation ? { 
          animationDelay: `${titleDelay}s`,
          textShadow: '0 2px 4px rgba(0,0,0,0.3)'
        } : { textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
      >
        {title}
      </h2>
      
      {/* Subtitle (if it comes after the title) */}
      {subtitle && subtitleDelay >= titleDelay && (
        <h3 
          className={cn(
            subtitleColor,
            "text-xl sm:text-2xl font-montserrat mb-2",
            animationClass,
            subtitleClassName
          )}
          style={withAnimation ? { animationDelay: `${subtitleDelay}s` } : undefined}
        >
          {subtitle}
        </h3>
      )}
      
      {/* Divider */}
      {withDivider && (
        <div 
          className={cn(
            dividerColor,
            "w-16 h-[1px] bg-gradient-to-r from-current to-transparent mb-4 sm:mb-6",
            animationClass,
            dividerClassName
          )}
          style={withAnimation ? { animationDelay: `${dividerDelay}s` } : undefined}
        ></div>
      )}
    </div>
  );
});

export default SectionHeading;
