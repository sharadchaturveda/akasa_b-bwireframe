"use client";

import { memo, useRef, useEffect } from 'react';
import Image from "next/image";
import { cn } from '@/lib/utils';

interface HeroImage {
  src: string;
  alt: string;
}

interface HeroCarouselBackgroundProps {
  /**
   * The images to display in the carousel
   */
  images: HeroImage[];
  
  /**
   * The interval between image changes in milliseconds
   */
  interval?: number;
  
  /**
   * Whether to add a gradient overlay
   */
  addGradient?: boolean;
  
  /**
   * Additional CSS classes for the container
   */
  className?: string;
  
  /**
   * Additional CSS classes for the images
   */
  imageClassName?: string;
  
  /**
   * Additional CSS classes for the gradient overlay
   */
  gradientClassName?: string;
}

/**
 * HeroCarouselBackground Component
 * 
 * A component for displaying a carousel of background images in a hero section.
 * 
 * @param {HeroCarouselBackgroundProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
const HeroCarouselBackground = memo(function HeroCarouselBackground({
  images,
  interval = 2000,
  addGradient = true,
  className,
  imageClassName,
  gradientClassName
}: HeroCarouselBackgroundProps) {
  // Refs to avoid state changes
  const currentImageIndexRef = useRef(0);
  const carouselIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const carouselElementsRef = useRef<HTMLDivElement[]>([]);
  
  // Set up carousel on mount
  useEffect(() => {
    // Function to start carousel
    const startCarousel = () => {
      if (carouselIntervalRef.current) {
        clearInterval(carouselIntervalRef.current);
      }
      
      // Update carousel images
      const updateCarousel = () => {
        const prevIndex = currentImageIndexRef.current;
        currentImageIndexRef.current = (prevIndex + 1) % images.length;
        
        // Update visibility
        carouselElementsRef.current.forEach((el, index) => {
          if (index === currentImageIndexRef.current) {
            el.style.opacity = '1';
            el.style.zIndex = '1';
          } else {
            el.style.opacity = '0';
            el.style.zIndex = '0';
          }
        });
      };
      
      // Set interval
      carouselIntervalRef.current = setInterval(updateCarousel, interval);
    };
    
    // Start carousel
    startCarousel();
    
    // Clean up
    return () => {
      if (carouselIntervalRef.current) {
        clearInterval(carouselIntervalRef.current);
      }
    };
  }, [images, interval]);
  
  // Store carousel elements ref
  const storeCarouselRef = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      carouselElementsRef.current[index] = el;
    }
  };
  
  return (
    <div className={cn(
      "absolute inset-0",
      className
    )}>
      {images.map((image, index) => (
        <div
          key={index}
          ref={(el) => storeCarouselRef(el, index)}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{
            opacity: index === 0 ? 1 : 0,
            zIndex: index === 0 ? 1 : 0
          }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority={index === 0}
            sizes="100vw"
            className={cn(
              "object-cover",
              imageClassName
            )}
          />
        </div>
      ))}
      
      {/* Gradient overlay */}
      {addGradient && (
        <div className={cn(
          "absolute inset-0 bg-black/40",
          gradientClassName
        )}></div>
      )}
    </div>
  );
});

export default HeroCarouselBackground;
