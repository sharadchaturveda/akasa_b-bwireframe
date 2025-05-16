"use client";

import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Image item for the carousel
 */
export interface CarouselImage {
  /**
   * The image source URL
   */
  src: string;
  
  /**
   * The image alt text
   */
  alt: string;
}

/**
 * Options for the useImageCarousel hook
 */
export interface ImageCarouselOptions {
  /**
   * The images to display in the carousel
   */
  images: CarouselImage[];
  
  /**
   * The interval between image transitions in milliseconds
   * @default 3000
   */
  interval?: number;
  
  /**
   * The duration of the transition animation in milliseconds
   * @default 1000
   */
  transitionDuration?: number;
  
  /**
   * Whether to autoplay the carousel
   * @default true
   */
  autoplay?: boolean;
  
  /**
   * Whether to loop the carousel
   * @default true
   */
  loop?: boolean;
  
  /**
   * The initial image index
   * @default 0
   */
  initialIndex?: number;
  
  /**
   * Callback when the active image changes
   */
  onImageChange?: (index: number) => void;
}

/**
 * Return value from the useImageCarousel hook
 */
export interface ImageCarouselResult {
  /**
   * The current image index
   */
  currentIndex: number;
  
  /**
   * The images to display in the carousel
   */
  images: CarouselImage[];
  
  /**
   * Function to go to the next image
   */
  nextImage: () => void;
  
  /**
   * Function to go to the previous image
   */
  prevImage: () => void;
  
  /**
   * Function to go to a specific image
   */
  goToImage: (index: number) => void;
  
  /**
   * Function to start the autoplay
   */
  startAutoplay: () => void;
  
  /**
   * Function to stop the autoplay
   */
  stopAutoplay: () => void;
  
  /**
   * Whether the carousel is currently autoplaying
   */
  isAutoplaying: boolean;
  
  /**
   * The transition duration in milliseconds
   */
  transitionDuration: number;
  
  /**
   * Function to register a carousel element ref
   */
  registerElementRef: (el: HTMLElement | null, index: number) => void;
}

/**
 * Custom hook for image carousel functionality
 * 
 * This hook provides a standardized way to handle image carousels,
 * including autoplay, transitions, and navigation.
 * 
 * @param {ImageCarouselOptions} options - Options for the image carousel
 * @returns {ImageCarouselResult} Image carousel state and controls
 */
export function useImageCarousel({
  images,
  interval = 3000,
  transitionDuration = 1000,
  autoplay = true,
  loop = true,
  initialIndex = 0,
  onImageChange
}: ImageCarouselOptions): ImageCarouselResult {
  // State for carousel
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isAutoplaying, setIsAutoplaying] = useState(autoplay);
  
  // Refs
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const elementRefsRef = useRef<(HTMLElement | null)[]>([]);
  
  // Function to register a carousel element ref
  const registerElementRef = useCallback((el: HTMLElement | null, index: number) => {
    if (el) {
      elementRefsRef.current[index] = el;
    }
  }, []);
  
  // Function to update the visibility of carousel elements
  const updateElementVisibility = useCallback(() => {
    elementRefsRef.current.forEach((el, index) => {
      if (!el) return;
      
      if (index === currentIndex) {
        el.style.opacity = '1';
        el.style.zIndex = '1';
      } else {
        el.style.opacity = '0';
        el.style.zIndex = '0';
      }
    });
  }, [currentIndex]);
  
  // Function to go to a specific image
  const goToImage = useCallback((index: number) => {
    // Ensure the index is within bounds
    let newIndex = index;
    
    if (index < 0) {
      newIndex = loop ? images.length - 1 : 0;
    } else if (index >= images.length) {
      newIndex = loop ? 0 : images.length - 1;
    }
    
    setCurrentIndex(newIndex);
    onImageChange?.(newIndex);
  }, [images.length, loop, onImageChange]);
  
  // Function to go to the next image
  const nextImage = useCallback(() => {
    goToImage(currentIndex + 1);
  }, [currentIndex, goToImage]);
  
  // Function to go to the previous image
  const prevImage = useCallback(() => {
    goToImage(currentIndex - 1);
  }, [currentIndex, goToImage]);
  
  // Function to start the autoplay
  const startAutoplay = useCallback(() => {
    // Clear any existing timer
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
    }
    
    // Set up a new timer
    autoplayTimerRef.current = setInterval(() => {
      nextImage();
    }, interval);
    
    setIsAutoplaying(true);
  }, [interval, nextImage]);
  
  // Function to stop the autoplay
  const stopAutoplay = useCallback(() => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
    
    setIsAutoplaying(false);
  }, []);
  
  // Start or stop autoplay when the autoplay prop changes
  useEffect(() => {
    if (autoplay) {
      startAutoplay();
    } else {
      stopAutoplay();
    }
    
    // Clean up
    return () => {
      stopAutoplay();
    };
  }, [autoplay, startAutoplay, stopAutoplay]);
  
  // Update element visibility when the current index changes
  useEffect(() => {
    updateElementVisibility();
  }, [currentIndex, updateElementVisibility]);
  
  return {
    currentIndex,
    images,
    nextImage,
    prevImage,
    goToImage,
    startAutoplay,
    stopAutoplay,
    isAutoplaying,
    transitionDuration,
    registerElementRef
  };
}

export default useImageCarousel;
