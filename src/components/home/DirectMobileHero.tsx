"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

/**
 * DirectMobileHero Component
 *
 * A direct implementation of the mobile hero with video background
 * that bypasses the mobileVideoOptimization.js blocking
 */
export default function DirectMobileHero() {
  // Video reference
  const videoRef = useRef<HTMLVideoElement>(null);

  // State for tracking video status
  const [videoReady, setVideoReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string[]>(['Initializing...']);

  // REVIEW: Debug logging function - kept for future debugging if needed
  const addDebugInfo = (info: string) => {
    setDebugInfo(prev => [...prev.slice(-9), info]);
  };

  // Set up video on mount
  useEffect(() => {
    addDebugInfo('Component mounted');

    // Create a new video element to bypass the blocking script
    const video = document.createElement('video');

    // Set video attributes
    video.muted = true;
    video.playsInline = true;
    video.autoplay = true;
    video.loop = true;
    video.preload = 'auto';

    // Set attributes for iOS
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.setAttribute('muted', '');

    // Set video style using cssText for better performance
    video.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;';

    // Add timestamp to prevent caching
    const timestamp = new Date().getTime();

    // Create sources
    const webmSource = document.createElement('source');
    webmSource.src = `/images/home/hero/mobile-video/heromobilevid.webm?t=${timestamp}`;
    webmSource.type = 'video/webm';

    const mp4Source = document.createElement('source');
    mp4Source.src = `/images/home/hero/mobile-video/heromobilevid.mp4?t=${timestamp}`;
    mp4Source.type = 'video/mp4';

    // Add sources to video
    video.appendChild(webmSource);
    video.appendChild(mp4Source);

    // Add event listeners
    video.addEventListener('loadeddata', () => {
      addDebugInfo('Video loaded data');
    });

    video.addEventListener('canplay', () => {
      addDebugInfo('Video can play');
      setVideoReady(true);
    });

    video.addEventListener('playing', () => {
      addDebugInfo('Video is playing');
      setVideoReady(true);
      setHasError(false);
    });

    video.addEventListener('error', () => {
      addDebugInfo(`Video error: ${video.error?.code || 'unknown'}`);
      setHasError(true);
    });

    // Get the container element
    const container = document.querySelector('.hero-section');
    if (!container) {
      addDebugInfo('Error: Hero section container not found');
      return;
    }

    // Create a wrapper for the video
    const videoWrapper = document.createElement('div');
    videoWrapper.className = 'direct-mobile-hero-video-wrapper';
    videoWrapper.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;z-index:20;';

    // Add video to wrapper
    videoWrapper.appendChild(video);

    // Add wrapper to container
    container.appendChild(videoWrapper);

    // Try to play the video
    addDebugInfo('Attempting to play video');
    video.load();

    const playVideo = () => {
      video.play().then(() => {
        addDebugInfo('Video play successful');
      }).catch(err => {
        addDebugInfo(`Video play error: ${err.message}`);
        // Retry after a delay
        setTimeout(playVideo, 500);
      });
    };

    // Try to play after a short delay
    setTimeout(playVideo, 500);

    // Clean up on unmount
    return () => {
      if (container.contains(videoWrapper)) {
        container.removeChild(videoWrapper);
      }
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

      {/* Debug info removed */}
    </div>
  );
}
