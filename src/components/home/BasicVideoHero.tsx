"use client";

import { useRef, useEffect, memo } from 'react';
import Image from 'next/image';

/**
 * A very basic video hero component with minimal logic and optimized performance
 * Focused solely on playing the video with a fallback image
 */
const BasicVideoHero = memo(function BasicVideoHero() {
  // Reference to video element
  const videoRef = useRef<HTMLVideoElement>(null);

  // Set up video on mount
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Basic setup
    video.muted = true;
    video.playsInline = true;
    video.loop = true;

    // Try to play the video
    const playVideo = async () => {
      try {
        await video.play();
      } catch (error) {
        // Silently fail - fallback image will be shown
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
        video.load();
      }
    };
  }, []);

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
        className="absolute inset-0 w-full h-full z-10"
        muted
        playsInline
        loop
        autoPlay
        poster="/images/home/hero/mobile-poster.jpg"
        style={{
          objectFit: 'cover',
        }}
      >
        <source src="/images/home/hero/mobile-video/heromobilevid.webm" type="video/webm" />
        <source src="/images/home/hero/mobile-video/heromobilevid.mp4" type="video/mp4" />
      </video>
    </div>
  );
});

export default BasicVideoHero;
