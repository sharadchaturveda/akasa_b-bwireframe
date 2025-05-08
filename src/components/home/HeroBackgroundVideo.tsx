"use client";

import { memo, useRef, useEffect, useState } from 'react';
import Image from "next/image";
import { cn } from '@/lib/utils';

interface HeroBackgroundVideoProps {
  /**
   * The video source
   */
  src: string;
  
  /**
   * The fallback image source
   */
  fallbackImageSrc: string;
  
  /**
   * The fallback image alt text
   */
  fallbackImageAlt: string;
  
  /**
   * Whether to add a gradient overlay
   */
  addGradient?: boolean;
  
  /**
   * Additional CSS classes for the container
   */
  className?: string;
  
  /**
   * Additional CSS classes for the video
   */
  videoClassName?: string;
  
  /**
   * Additional CSS classes for the fallback image
   */
  fallbackImageClassName?: string;
  
  /**
   * Additional CSS classes for the gradient overlay
   */
  gradientClassName?: string;
  
  /**
   * Whether to mute the video
   */
  muted?: boolean;
  
  /**
   * Whether to loop the video
   */
  loop?: boolean;
  
  /**
   * Whether to autoplay the video
   */
  autoPlay?: boolean;
  
  /**
   * Whether to play inline
   */
  playsInline?: boolean;
}

/**
 * HeroBackgroundVideo Component
 * 
 * A component for displaying a background video in a hero section.
 * 
 * @param {HeroBackgroundVideoProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
const HeroBackgroundVideo = memo(function HeroBackgroundVideo({
  src,
  fallbackImageSrc,
  fallbackImageAlt,
  addGradient = true,
  className,
  videoClassName,
  fallbackImageClassName,
  gradientClassName,
  muted = true,
  loop = true,
  autoPlay = true,
  playsInline = true
}: HeroBackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  
  // Handle video loading and playing
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    const handleLoadedData = () => {
      setIsVideoLoaded(true);
    };
    
    const handlePlaying = () => {
      setIsVideoPlaying(true);
    };
    
    const handleError = (error: any) => {
      console.error('Video error:', error);
      setIsVideoLoaded(false);
      setIsVideoPlaying(false);
    };
    
    // Add event listeners
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('playing', handlePlaying);
    video.addEventListener('error', handleError);
    
    // Try to play the video
    if (autoPlay) {
      const playPromise = video.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error('Auto-play prevented:', error);
        });
      }
    }
    
    // Clean up event listeners
    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('playing', handlePlaying);
      video.removeEventListener('error', handleError);
    };
  }, [autoPlay]);
  
  return (
    <div className={cn(
      "absolute inset-0 z-[1]",
      className
    )}>
      {/* Fallback image (shown until video loads) */}
      {(!isVideoLoaded || !isVideoPlaying) && (
        <Image
          src={fallbackImageSrc}
          alt={fallbackImageAlt}
          fill
          priority
          sizes="100vw"
          className={cn(
            "object-cover",
            fallbackImageClassName
          )}
        />
      )}
      
      {/* Video */}
      <video
        ref={videoRef}
        className={cn(
          "absolute inset-0 w-full h-full object-cover",
          { "opacity-0": !isVideoLoaded || !isVideoPlaying },
          videoClassName
        )}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        preload="auto"
      >
        <source src={src} type="video/mp4" />
        <source src={src.replace('.mp4', '.webm')} type="video/webm" />
      </video>
      
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

export default HeroBackgroundVideo;
