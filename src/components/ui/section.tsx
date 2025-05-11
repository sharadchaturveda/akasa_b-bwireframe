/**
 * Section Component
 * 
 * A reusable component for creating consistent section layouts.
 * This component provides standardized spacing, backgrounds, and structure.
 */
import { ReactNode, memo } from 'react';
import { cn } from '@/lib/utils';

export interface SectionProps {
  /**
   * The ID of the section for navigation
   */
  id?: string;
  
  /**
   * The content of the section
   */
  children: ReactNode;
  
  /**
   * The background color or image of the section
   */
  background?: {
    /**
     * The type of background
     */
    type: 'color' | 'image' | 'gradient';
    
    /**
     * The value of the background (color code, image URL, or gradient)
     */
    value: string;
    
    /**
     * The overlay color or gradient
     */
    overlay?: string;
  };
  
  /**
   * Whether the section should take up the full height of the viewport
   * @default false
   */
  fullHeight?: boolean;
  
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  
  /**
   * Whether to use a container for the content
   * @default true
   */
  useContainer?: boolean;
  
  /**
   * Additional inline styles for the section
   */
  style?: React.CSSProperties;
}

/**
 * Section Component
 * 
 * A reusable component for creating consistent section layouts.
 * 
 * @param {SectionProps} props - The component props
 * @returns {JSX.Element} The rendered section
 */
const Section = memo(function Section({
  id,
  children,
  background,
  fullHeight = false,
  className,
  containerClassName,
  useContainer = true,
  style = {}
}: SectionProps) {
  // Determine background styles
  const backgroundStyles: React.CSSProperties = {};
  
  if (background) {
    switch (background.type) {
      case 'color':
        backgroundStyles.backgroundColor = background.value;
        break;
      case 'image':
        backgroundStyles.backgroundImage = `url(${background.value})`;
        backgroundStyles.backgroundSize = 'cover';
        backgroundStyles.backgroundPosition = 'center';
        break;
      case 'gradient':
        backgroundStyles.backgroundImage = background.value;
        break;
    }
  }
  
  // Combine styles
  const combinedStyles = {
    ...backgroundStyles,
    ...style
  };
  
  return (
    <section
      id={id}
      className={cn(
        'relative w-full py-8 md:py-12',
        fullHeight && 'min-h-screen',
        className
      )}
      style={combinedStyles}
    >
      {/* Background overlay if provided */}
      {background?.overlay && (
        <div 
          className="absolute inset-0 z-0" 
          style={{ 
            background: background.overlay 
          }}
        />
      )}
      
      {/* Section content */}
      {useContainer ? (
        <div className={cn(
          'relative z-10 container mx-auto px-4 md:px-6',
          containerClassName
        )}>
          {children}
        </div>
      ) : (
        <div className={cn('relative z-10', containerClassName)}>
          {children}
        </div>
      )}
    </section>
  );
});

export default Section;
