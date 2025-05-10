"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image'
;

interface MobileVideoBackgroundProps {
  videoUrl: string;
  fallbackImageUrl: string;
}

/**
 * A simple component that displays a video background on mobile
 * with a fallback image if the video fails to load
 */
const MobileVideoBackground = ({ videoUrl, fallbackImageUrl }: MobileVideoBackgroundProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  
  // Generate a unique URL to bypass caching
  const uniqueVideoUrl = `${videoUrl}?nocache=${Date.now()}-${Math.random()}`;
  
  useEffect(() => {
    // Create a new video element
    const video = document.createElement('video');
    
    // Set video attributes
    video.muted = true;
    video.playsInline = true;
    video.autoplay = true;
    video.loop = true;
    video.controls = false;
    video.preload = 'auto';
    video.style.position = 'absolute';
    video.style.top = '0';
    video.style.left = '0';
    video.style.width = '100%';
    video.style.height = '100%';
    video.style.objectFit = 'cover';
    video.style.zIndex = '10';
    video.style.opacity = '1';
    video.style.display = 'block';
    video.style.visibility = 'visible';
    
    // Set attributes for mobile
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    
    // Set source with cache-busting
    video.src = uniqueVideoUrl;
    
    // Add event listeners
    video.addEventListener('canplay', () => {
      console.log('Video can play');
      setVideoLoaded(true);
      setVideoFailed(false);
      
      // Replace the existing video element
      if (videoRef.current && videoRef.current.parentNode) {
        videoRef.current.parentNode.replaceChild(video, videoRef.current);
        videoRef.current = video;
      }
    });
    
    video.addEventListener('error', () => {
      console.log('Video error');
      setVideoFailed(true);
    });
    
    // Load the video
    video.load();
    
    // Try to play the video
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        console.log('Video play failed');
        setVideoFailed(true);
      });
    }
    
    // Clean up
    return () => {
      video.pause();
      video.src = '';
      video.load();
    };
  }, [uniqueVideoUrl]);
  
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
      {/* Fallback image - always visible until video loads */}
      <div 
        className="absolute inset-0 z-[1]"
        style={{ display: videoLoaded && !videoFailed ? 'none' : 'block' }}
      >
        <Image src={fallbackImageUrl}
          alt="Background"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      
      {/* Video placeholder - will be replaced by the actual video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover z-[2]"
        playsInline
        muted
        loop
        autoPlay
        preload="auto"
        style={{ 
          display: 'block',
          visibility: 'visible',
          opacity: 1
        }}
      >
        <source src={uniqueVideoUrl} type="video/mp4" />
      </video>
    </div>
  );
};

export default MobileVideoBackground;


