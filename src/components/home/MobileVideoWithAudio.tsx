"use client";

import { memo, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

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

  // State and refs are managed directly in the DOM event handlers

  // Set up video on mount
  useEffect(() => {
    console.log('MobileVideoWithAudio: Component mounted');

    // Create a new video element to bypass the blocking script
    const video = document.createElement('video');

    // Store reference to the video element
    videoRef.current = video;

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

    // Set video style
    video.style.position = 'absolute';
    video.style.top = '0';
    video.style.left = '0';
    video.style.width = '100%';
    video.style.height = '100%';
    video.style.objectFit = 'cover';
    video.style.objectPosition = 'center';
    video.style.opacity = '0';
    video.style.transition = 'opacity 0.5s ease-in-out';
    video.style.zIndex = '20';

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
      console.error('MobileVideoWithAudio: Video error:', video.error);
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
    videoWrapper.style.position = 'absolute';
    videoWrapper.style.top = '0';
    videoWrapper.style.left = '0';
    videoWrapper.style.width = '100%';
    videoWrapper.style.height = '100%';
    videoWrapper.style.zIndex = '20';

    // Add video to wrapper
    videoWrapper.appendChild(video);

    // Add wrapper to container
    container.appendChild(videoWrapper);

    // We're now using the mobile-video-fix.js script to handle the audio button
    // This script creates a permanent audio button that won't be removed by optimization scripts
    // The button is created directly in the DOM and positioned in the lower right corner of the hero section

    // Try to play the video
    console.log('MobileVideoWithAudio: Attempting to play video');
    video.load();

    const playVideo = () => {
      video.play().then(() => {
        console.log('MobileVideoWithAudio: Video play successful');
        video.style.opacity = '1';

        // Notify that the video is playing
        document.dispatchEvent(new CustomEvent('videoPlaying', {
          detail: { videoElement: video }
        }));
      }).catch(err => {
        console.error('MobileVideoWithAudio: Video play error:', err.message);
        // Retry after a delay
        setTimeout(playVideo, 500);
      });
    };

    // Try to play after a short delay
    setTimeout(playVideo, 500);

    // Clean up on unmount
    return () => {
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
