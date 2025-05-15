"use client";

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

/**
 * A basic video hero component with audio controls
 */
export default function BasicVideoHeroWithAudio() {
  // Video reference
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // State for tracking audio
  const [isMuted, setIsMuted] = useState(true);
  
  // Set up video on mount
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
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
    
    // Try to play the video
    const playVideo = async () => {
      try {
        await video.play();
        console.log('Video playing successfully');
      } catch (error) {
        console.error('Error playing video:', error);
      }
    };
    
    // Play video after a short delay
    const timer = setTimeout(playVideo, 100);
    
    // Clean up
    return () => {
      clearTimeout(timer);
      if (video) {
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
      {/* Fallback image - always visible */}
      <div className="absolute inset-0">
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
      
      {/* Video element - positioned on top of the image */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover z-10"
        muted
        playsInline
        loop
        autoPlay
        poster="/images/home/hero/mobile-poster.jpg"
      />
      
      {/* Audio control button */}
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
    </div>
  );
}
