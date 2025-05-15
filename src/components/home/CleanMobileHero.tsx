"use client";

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

/**
 * A clean mobile hero component with proper loading behavior
 */
export default function CleanMobileHero() {
  // Video reference
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // State for tracking audio and loading
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  
  // Set up video on mount
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    // Start in loading state
    setIsLoading(true);
    
    // Basic setup - must be muted for autoplay
    video.muted = true;
    video.playsInline = true;
    video.loop = true;
    
    // Set attributes for iOS
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    
    // Add timestamp to prevent caching
    const timestamp = new Date().getTime();
    video.src = `/images/home/hero/mobile-video/heromobilevid.mp4?v=${timestamp}`;
    
    // Handle video loaded and playing events
    const handleCanPlay = () => {
      console.log('Video can play');
    };
    
    const handlePlaying = () => {
      console.log('Video is playing');
      setIsLoading(false);
    };
    
    // Add event listeners
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('playing', handlePlaying);
    
    // Try to play the video
    const playVideo = async () => {
      try {
        await video.play();
        console.log('Video play initiated');
      } catch (error) {
        console.error('Error playing video:', error);
        // If video fails to play, exit loading state
        setIsLoading(false);
      }
    };
    
    // Play video after a short delay
    const timer = setTimeout(playVideo, 100);
    
    // Clean up
    return () => {
      clearTimeout(timer);
      if (video) {
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('playing', handlePlaying);
        video.pause();
        video.src = '';
      }
    };
  }, []);
  
  // Toggle mute state
  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    
    if (isMuted) {
      // Unmute
      video.muted = false;
      setIsMuted(false);
    } else {
      // Mute
      video.muted = true;
      setIsMuted(true);
    }
  };
  
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Loading state - just a black background */}
      {isLoading && (
        <div className="absolute inset-0 z-30 bg-black flex items-center justify-center">
          <Image
            src="/images/home/hero/mobile-poster.jpg"
            alt="Akasa restaurant ambiance"
            fill
            priority
            sizes="100vw"
            quality={60}
            className="object-cover"
          />
        </div>
      )}
      
      {/* Video element */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover z-10"
        muted
        playsInline
        loop
        autoPlay
        poster="/images/home/hero/mobile-poster.jpg"
      />
      
      {/* Audio control button - only shown when video is playing */}
      {!isLoading && (
        <div 
          className={`fixed bottom-8 right-8 z-50 w-20 h-20 bg-gradient-to-br from-black to-gray-800 rounded-full flex items-center justify-center border-2 border-white/80 shadow-[0_0_15px_rgba(255,255,255,0.3)] cursor-pointer transition-all duration-300 hover:scale-105 ${isMuted ? 'animate-pulse' : ''}`}
          onClick={toggleMute}
          style={{ 
            opacity: 0.95,
            backdropFilter: 'blur(4px)'
          }}
        >
          {isMuted ? (
            // Volume muted icon
            <div className="relative flex items-center justify-center">
              {/* Custom volume icon */}
              <div className="w-12 h-12 flex items-center justify-center">
                <img 
                  src="/images/volume-muted-icon.png" 
                  alt="Unmute" 
                  className="w-10 h-10 drop-shadow-[0_0_3px_rgba(255,255,255,0.7)]"
                />
              </div>
              
              {/* Subtle ring animation */}
              <div className="absolute inset-0 rounded-full border border-white/30 animate-ping opacity-50"></div>
            </div>
          ) : (
            // Equalizer GIF for unmuted state
            <div className="flex items-center justify-center">
              <img 
                src="/images/equalizer-animation.gif" 
                alt="Audio playing" 
                className="w-12 h-12 drop-shadow-[0_0_3px_rgba(255,255,255,0.7)]"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
