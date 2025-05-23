"use client";

import { memo, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  optimizeVideoForMobile,
  logVideoError,
  addCacheBustingToVideoSources,
  VideoSource
} from '@/utils/videoUtils';

// Define video sources
const VIDEO_SOURCES: VideoSource[] = [
  {
    src: '/images/home/hero/mobile-video/heromobilevid.webm',
    type: 'video/webm'
  },
  {
    src: '/images/home/hero/mobile-video/heromobilevid.mp4',
    type: 'video/mp4'
  }
];

// Define video element styles
const VIDEO_STYLES = {
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center',
  opacity: '0',
  transition: 'opacity 0.5s ease-in-out',
  zIndex: '20',
  transform: 'translateZ(0)',
  willChange: 'opacity',
  contain: 'paint'
};

// Define video wrapper styles
const WRAPPER_STYLES = {
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  zIndex: '20',
  transform: 'translateZ(0)',
  willChange: 'transform, opacity',
  contain: 'paint'
};

/**
 * MobileVideoWithAudio Component
 *
 * A mobile-optimized hero component with video background and audio controls.
 * This component creates a video element directly in the DOM to bypass the
 * mobileVideoOptimization.js blocking script.
 */
const MobileVideoWithAudio = memo(function MobileVideoWithAudio() {
  // State for tracking video status
  const [videoReady, setVideoReady] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Reference to store the video element
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Set up video on mount
  useEffect(() => {
    console.log('MobileVideoWithAudio: Component mounted', {
      isMobile: window.innerWidth < 768,
      width: window.innerWidth,
      userAgent: navigator.userAgent
    });

    // Create a new video element to bypass the blocking script
    const video = document.createElement('video');
    videoRef.current = video;

    // Apply video attributes and styles
    optimizeVideoForMobile(video);

    // Apply additional styles not covered by the utility
    Object.entries(VIDEO_STYLES).forEach(([key, value]) => {
      video.style[key as any] = value;
    });

    // Add cache busting to prevent caching issues
    addCacheBustingToVideoSources(video);

    // Create and add sources
    VIDEO_SOURCES.forEach(({ src, type }) => {
      const source = document.createElement('source');
      source.src = src;
      source.type = type;
      video.appendChild(source);
    });

    // Add event listeners
    video.addEventListener('loadeddata', () => {
      console.log('MobileVideoWithAudio: Video loaded data');
    });

    video.addEventListener('canplay', () => {
      console.log('MobileVideoWithAudio: Video can play');
      setVideoReady(true);

      // Notify that the video is ready
      document.dispatchEvent(new CustomEvent('videoReady', {
        detail: { videoElement: video }
      }));
    });

    video.addEventListener('playing', () => {
      console.log('MobileVideoWithAudio: Video is playing');
      setVideoReady(true);
      setHasError(false);
      video.style.opacity = '1';

      // Notify that the video is playing
      document.dispatchEvent(new CustomEvent('videoPlaying', {
        detail: { videoElement: video }
      }));
    });

    video.addEventListener('error', () => {
      logVideoError(video);
      setHasError(true);
    });

    // Get the container element
    const container = document.querySelector('.hero-section');
    if (!container) {
      console.error('MobileVideoWithAudio: Hero section container not found');
      return;
    }

    // Create a wrapper for the video
    const videoWrapper = document.createElement('div');
    videoWrapper.className = 'mobile-hero-video-wrapper';

    // Apply wrapper styles
    Object.entries(WRAPPER_STYLES).forEach(([key, value]) => {
      videoWrapper.style[key as any] = value;
    });

    // Add video to wrapper and wrapper to container
    videoWrapper.appendChild(video);
    container.appendChild(videoWrapper);

    // We're now using the mobile-video-fix.js script to handle the audio button
    // This script creates a permanent audio button that won't be removed by optimization scripts
    // The button is created directly in the DOM and positioned in the lower right corner of the hero section

    // Try to play the video
    console.log('MobileVideoWithAudio: Attempting to play video');
    video.load();

    const playVideo = () => {
      // Check if the document is visible to avoid power-saving errors
      if (document.visibilityState === 'visible') {
        video.play().then(() => {
          console.log('MobileVideoWithAudio: Video play successful');
          video.style.opacity = '1';

          // Notify that the video is playing
          document.dispatchEvent(new CustomEvent('videoPlaying', {
            detail: { videoElement: video }
          }));
        }).catch(err => {
          // Don't log power-saving related errors as they're expected
          if (!err.message.includes('power') && !err.message.includes('battery')) {
            console.error('MobileVideoWithAudio: Video play error:', err.message);
          }

          // Retry after a delay, but only if the document is visible
          if (document.visibilityState === 'visible') {
            setTimeout(playVideo, 1000);
          } else {
            // Add visibility change listener to try again when document becomes visible
            const onVisibilityChange = () => {
              if (document.visibilityState === 'visible') {
                document.removeEventListener('visibilitychange', onVisibilityChange);
                setTimeout(playVideo, 500);
              }
            };
            document.addEventListener('visibilitychange', onVisibilityChange);
          }
        });
      } else {
        // Add visibility change listener to try again when document becomes visible
        const onVisibilityChange = () => {
          if (document.visibilityState === 'visible') {
            document.removeEventListener('visibilitychange', onVisibilityChange);
            setTimeout(playVideo, 500);
          }
        };
        document.addEventListener('visibilitychange', onVisibilityChange);
      }
    };

    // Try to play after a short delay
    setTimeout(playVideo, 500);

    // Add a timeout to ensure fallback image is shown if video doesn't load
    const videoLoadTimeout = setTimeout(() => {
      if (!videoReady) {
        console.warn('MobileVideoWithAudio: Video did not become ready within timeout, showing fallback image.');
        setHasError(true); // Force fallback image display
      }
    }, 7000); // 7 seconds timeout

    // Clean up on unmount
    return () => {
      clearTimeout(videoLoadTimeout); // Clear timeout if video loads or component unmounts

      // Remove video wrapper
      if (container.contains(videoWrapper)) {
        container.removeChild(videoWrapper);
      }

      // Clear video reference
      videoRef.current = null;

      // Notify that the video is being removed
      document.dispatchEvent(new CustomEvent('videoRemoved'));
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

      {/* Audio control button is created directly in the DOM */}
    </div>
  );
});

export default MobileVideoWithAudio;
