"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

/**
 * DirectVideoHero Component
 * 
 * A direct implementation that uses the video src attribute directly
 * instead of source elements
 */
export default function DirectVideoHero() {
  // Video reference
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // State for UI
  const [videoReady, setVideoReady] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Set up video on mount
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    console.log('DirectVideoHero: Setting up video');
    
    // Add timestamp to prevent caching
    const timestamp = new Date().getTime();
    video.src = `/images/home/hero/mobile-video/heromobilevid.mp4?v=${timestamp}`;
    
    // Event handlers
    const handleCanPlay = () => {
      console.log('DirectVideoHero: Video can play');
      setVideoReady(true);
    };
    
    const handlePlaying = () => {
      console.log('DirectVideoHero: Video is playing');
      setVideoReady(true);
      setHasError(false);
    };
    
    const handleError = () => {
      console.error('DirectVideoHero: Video error:', video.error);
      setHasError(true);
    };
    
    // Add event listeners
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('playing', handlePlaying);
    video.addEventListener('error', handleError);
    
    // Force load the video
    video.load();
    
    // Try to play the video after a delay
    const timer = setTimeout(() => {
      console.log('DirectVideoHero: Attempting to play video');
      
      video.play()
        .then(() => {
          console.log('DirectVideoHero: Video play promise resolved');
          setVideoReady(true);
          setHasError(false);
        })
        .catch(err => {
          console.error('DirectVideoHero: Error playing video:', err);
          setHasError(true);
        });
    }, 1000);
    
    // Cleanup
    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('playing', handlePlaying);
      video.removeEventListener('error', handleError);
      clearTimeout(timer);
    };
  }, []);
  
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Fallback image */}
      <div 
        className="absolute inset-0 z-10" 
        style={{ 
          opacity: videoReady && !hasError ? 0 : 1, 
          transition: 'opacity 0.5s ease-in-out' 
        }}
      >
        <Image
          src="/images/home/hero/carousel/hero1.jpg"
          alt="Akasa restaurant ambiance"
          fill
          priority
          sizes="100vw"
          quality={85}
          className="object-cover"
        />
      </div>
      
      {/* Video element */}
      <div className="absolute inset-0 z-20">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          muted
          playsInline
          loop
          autoPlay
          preload="auto"
          poster="/images/home/hero/carousel/hero1.jpg"
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
            width: '100%',
            height: '100%',
            filter: 'brightness(1.15)',
            opacity: videoReady && !hasError ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out',
            backgroundColor: 'transparent',
            transform: 'translateZ(0)',
            willChange: 'transform, opacity',
          }}
        />
      </div>
      
      {/* Debug info */}
      <div className="absolute bottom-4 left-4 z-50 bg-black/70 text-white p-2 text-xs">
        <p>Video Ready: {videoReady ? 'Yes' : 'No'}</p>
        <p>Has Error: {hasError ? 'Yes' : 'No'}</p>
      </div>
    </div>
  );
}
