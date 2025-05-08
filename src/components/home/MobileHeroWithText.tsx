"use client";

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface MobileHeroWithTextProps {
  fallbackImageSrc: string;
}

/**
 * A very simple mobile hero component that shows text until video plays
 */
const MobileHeroWithText = ({ fallbackImageSrc }: MobileHeroWithTextProps) => {
  // Reference to video element
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // State to track if video is actually playing
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    
    // Function to check if video is actually playing
    const checkVideoPlaying = () => {
      // Only consider video playing if it has advanced beyond the first frame
      if (videoElement.currentTime > 0.5 && !videoElement.paused && !videoElement.ended) {
        setIsVideoPlaying(true);
      } else {
        setIsVideoPlaying(false);
      }
    };
    
    // Set up event listeners
    videoElement.addEventListener('playing', checkVideoPlaying);
    videoElement.addEventListener('pause', () => setIsVideoPlaying(false));
    videoElement.addEventListener('ended', () => setIsVideoPlaying(false));
    videoElement.addEventListener('timeupdate', checkVideoPlaying);
    
    // Check every second if video is still playing
    const interval = setInterval(() => {
      if (videoElement.paused || videoElement.ended || videoElement.currentTime < 0.5) {
        setIsVideoPlaying(false);
      }
    }, 1000);
    
    // Clean up
    return () => {
      videoElement.removeEventListener('playing', checkVideoPlaying);
      videoElement.removeEventListener('pause', () => setIsVideoPlaying(false));
      videoElement.removeEventListener('ended', () => setIsVideoPlaying(false));
      videoElement.removeEventListener('timeupdate', checkVideoPlaying);
      clearInterval(interval);
    };
  }, []);
  
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Fallback image - always visible until video plays */}
      {!isVideoPlaying && (
        <div className="absolute inset-0 z-[1]">
          {/* Background image */}
          <Image
            src={fallbackImageSrc}
            alt="Background"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-60"
          />
          
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/30 z-[1]"></div>
          
          {/* Text content - exact copy from desktop */}
          <div className="absolute inset-0 flex items-center justify-center z-[3]">
            <div className="flex flex-col items-center justify-center px-4 text-center">
              <p className="text-white/90 uppercase tracking-widest text-sm md:text-base mb-4">
                Experience
              </p>
              
              <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-playfair italic mb-6"
                  style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                Exquisite Indian Cuisine
              </h1>
              
              <div className="flex items-center w-full max-w-xs md:max-w-md justify-center mb-6">
                <div className="h-px bg-white/50 flex-1"></div>
                <div className="mx-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1" />
                    <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="h-px bg-white/50 flex-1"></div>
              </div>
              
              <p className="text-white/80 mb-8 text-sm md:text-base">
                Fine Dining at the Heart of Singapore
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Video element */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        muted
        loop
        autoPlay
        style={{
          zIndex: isVideoPlaying ? 2 : 0,
          opacity: isVideoPlaying ? 1 : 0
        }}
      >
        <source src="/images/home/hero/mobile-video/heromobilevid.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default MobileHeroWithText;
