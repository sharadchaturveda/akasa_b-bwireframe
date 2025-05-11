/**
 * BackgroundImage Component
 * 
 * A reusable component for creating optimized background images.
 * This component uses next/image for better performance and optimization.
 */
import { memo } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { IMAGES } from '@/constants';

export interface BackgroundImageProps {
  /**
   * The source URL of the image
   */
  src: string;
  
  /**
   * The alt text for the image
   */
  alt: string;
  
  /**
   * Whether to prioritize loading the image
   * @default false
   */
  priority?: boolean;
  
  /**
   * The quality of the image
   * @default IMAGES.DEFAULT_QUALITY
   */
  quality?: number;
  
  /**
   * The overlay color or gradient
   */
  overlay?: string;
  
  /**
   * Additional CSS classes for the container
   */
  className?: string;
  
  /**
   * Additional CSS classes for the image
   */
  imageClassName?: string;
  
  /**
   * Additional CSS classes for the overlay
   */
  overlayClassName?: string;
  
  /**
   * The object fit property for the image
   * @default "cover"
   */
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  
  /**
   * The object position property for the image
   * @default "center"
   */
  objectPosition?: string;
  
  /**
   * The sizes attribute for the image
   * @default "100vw"
   */
  sizes?: string;
}

/**
 * BackgroundImage Component
 * 
 * A reusable component for creating optimized background images.
 * 
 * @param {BackgroundImageProps} props - The component props
 * @returns {JSX.Element} The rendered background image
 */
const BackgroundImage = memo(function BackgroundImage({
  src,
  alt,
  priority = false,
  quality = IMAGES.DEFAULT_QUALITY,
  overlay,
  className,
  imageClassName,
  overlayClassName,
  objectFit = 'cover',
  objectPosition = 'center',
  sizes = '100vw'
}: BackgroundImageProps) {
  return (
    <div className={cn('absolute inset-0 overflow-hidden', className)}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        quality={quality}
        sizes={sizes}
        className={cn(
          'object-cover',
          imageClassName
        )}
        style={{
          objectFit,
          objectPosition
        }}
      />
      
      {/* Overlay if provided */}
      {overlay && (
        <div 
          className={cn('absolute inset-0', overlayClassName)} 
          style={{ background: overlay }}
        />
      )}
    </div>
  );
});

export default BackgroundImage;
