"use client";

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

interface BasicVideoBackgroundProps {
  fallbackImageSrc: string;
}

/**
 * A basic video background component with no fancy features
 * Just a plain HTML video element with a fallback image
 */
const BasicVideoBackground = ({ fallbackImageSrc }: BasicVideoBackgroundProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);

  // Track video loading and playing state
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setVideoLoaded(true);
    };

    const handlePlaying = () => {
      setVideoPlaying(true);
    };

    const handleError = () => {
      setVideoLoaded(false);
      setVideoPlaying(false);
    };

    // Handle pause or stall events
    const handlePause = () => {
      // Only set videoPlaying to false if it's actually paused
      // and not just waiting for more data
      if (video.paused && !video.ended && video.currentTime > 0) {
        setVideoPlaying(false);
      }
    };

    const handleStalled = () => {
      // Don't immediately set to not playing, as it might just be buffering
      setTimeout(() => {
        if (video.paused) {
          setVideoPlaying(false);
        }
      }, 500);
    };

    // Add event listeners
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('playing', handlePlaying);
    video.addEventListener('error', handleError);
    video.addEventListener('pause', handlePause);
    video.addEventListener('stalled', handleStalled);

    // Set up a timer to check if video is actually progressing
    let lastTime = 0;
    const progressCheckInterval = setInterval(() => {
      if (video.currentTime > 0 && video.currentTime !== lastTime) {
        // Video is progressing normally
        lastTime = video.currentTime;
        setVideoPlaying(true);
      } else if (video.currentTime > 0 && video.currentTime === lastTime) {
        // Video is frozen but not paused
        if (video.readyState < 3) {  // HAVE_FUTURE_DATA = 3
          // Video is probably buffering, don't change state yet
        } else {
          // Video is frozen but has enough data, try to restart it
          video.currentTime = 0;
          video.play().catch(() => {});
        }
      }
    }, 1000);

    // Clean up
    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('playing', handlePlaying);
      video.removeEventListener('error', handleError);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('stalled', handleStalled);
      clearInterval(progressCheckInterval);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Fallback image - only visible when video is not playing */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          opacity: videoPlaying ? 0 : 1,
          transition: 'opacity 0.5s ease-in-out'
        }}
      >
        <Image src={fallbackImageSrc}
          alt="Background"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60"
        />

        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30 z-[1]"></div>
      </div>

      {/* Text content - only visible when video is not playing - Exact copy from desktop */}
      {!videoPlaying && (
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
      )}

      {/* Video element - as basic as possible */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover z-[2]"
        playsInline
        muted
        loop
        autoPlay
        style={{
          opacity: videoPlaying ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out'
        }}
      >
        <source src="/images/home/hero/mobile-video/heromobilevid.webm" type="video/webm" />
        <source src="/images/home/hero/mobile-video/heromobilevid.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default BasicVideoBackground;

