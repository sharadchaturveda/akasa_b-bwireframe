/**
 * SectionHeading Component
 * 
 * A reusable component for creating consistent section headings.
 * This component provides standardized typography and spacing for section titles.
 */
import { memo } from 'react';
import { cn } from '@/lib/utils';

export interface SectionHeadingProps {
  /**
   * The title of the section
   */
  title: string;
  
  /**
   * The subtitle or category of the section
   */
  subtitle?: string;
  
  /**
   * The description of the section
   */
  description?: string;
  
  /**
   * Whether to center the heading
   * @default true
   */
  centered?: boolean;
  
  /**
   * Whether to show a decorative divider
   * @default true
   */
  showDivider?: boolean;
  
  /**
   * Additional CSS classes for the heading container
   */
  className?: string;
  
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  
  /**
   * Additional CSS classes for the subtitle
   */
  subtitleClassName?: string;
  
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  
  /**
   * Additional CSS classes for the divider
   */
  dividerClassName?: string;
}

/**
 * SectionHeading Component
 * 
 * A reusable component for creating consistent section headings.
 * 
 * @param {SectionHeadingProps} props - The component props
 * @returns {JSX.Element} The rendered section heading
 */
const SectionHeading = memo(function SectionHeading({
  title,
  subtitle,
  description,
  centered = true,
  showDivider = true,
  className,
  titleClassName,
  subtitleClassName,
  descriptionClassName,
  dividerClassName
}: SectionHeadingProps) {
  return (
    <div className={cn(
      'mb-8',
      centered && 'text-center',
      className
    )}>
      {/* Subtitle / Category */}
      {subtitle && (
        <span className={cn(
          'text-[#E6C78B] text-xs sm:text-sm tracking-widest uppercase mb-1 sm:mb-2 block font-montserrat',
          subtitleClassName
        )}>
          {subtitle}
        </span>
      )}
      
      {/* Title */}
      <h2 className={cn(
        'text-2xl sm:text-3xl font-playfair mb-2 sm:mb-4 text-white',
        titleClassName
      )}>
        {title}
      </h2>
      
      {/* Divider */}
      {showDivider && (
        <div className={cn(
          'w-16 sm:w-24 h-[1px] bg-gradient-to-r from-[#E6C78B]/80 to-transparent',
          centered && 'mx-auto',
          'mb-3 sm:mb-6',
          dividerClassName
        )} />
      )}
      
      {/* Description */}
      {description && (
        <p className={cn(
          'text-sm sm:text-base lg:text-lg font-montserrat text-white/90 mb-4 sm:mb-6',
          descriptionClassName
        )}>
          {description}
        </p>
      )}
    </div>
  );
});

export default SectionHeading;
