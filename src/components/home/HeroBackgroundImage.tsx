"use client";

import { memo } from 'react';
import Image from "next/image";
import { cn } from '@/lib/utils';

interface HeroBackgroundImageProps {
  /**
   * The image source
   */
  src: string;
  
  /**
   * The image alt text
   */
  alt: string;
  
  /**
   * Whether to add a gradient overlay
   */
  addGradient?: boolean;
  
  /**
   * Additional CSS classes for the container
   */
  className?: string;
  
  /**
   * Additional CSS classes for the image
   */
  imageClassName?: string;
  
  /**
   * Additional CSS classes for the gradient overlay
   */
  gradientClassName?: string;
  
  /**
   * Image priority
   */
  priority?: boolean;
}

/**
 * HeroBackgroundImage Component
 * 
 * A component for displaying a background image in a hero section.
 * 
 * @param {HeroBackgroundImageProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
const HeroBackgroundImage = memo(function HeroBackgroundImage({
  src,
  alt,
  addGradient = true,
  className,
  imageClassName,
  gradientClassName,
  priority = true
}: HeroBackgroundImageProps) {
  return (
    <div className={cn(
      "absolute inset-0 z-[1]",
      className
    )}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="100vw"
        className={cn(
          "object-cover",
          imageClassName
        )}
      />
      
      {addGradient && (
        <div className={cn(
          "absolute inset-0 bg-black/40",
          gradientClassName
        )}></div>
      )}
    </div>
  );
});

export default HeroBackgroundImage;
