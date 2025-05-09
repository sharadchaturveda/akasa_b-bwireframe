"use client";

import { useRef, useEffect } from 'react';
import Image from 'next/image';

/**
 * A very basic video hero component with minimal logic
 * Focused solely on playing the video with a fallback image
 */
const BasicVideoHero = () => {
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
        console.log('Video playing successfully');
      } catch (error) {
        console.error('Video play failed:', error);
      }
    };

    // Play video after a short delay
    setTimeout(playVideo, 100);

    // Clean up
    return () => {
      video.pause();
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Fallback image - always visible */}
      <div className="absolute inset-0">
        <Image
          src="/images/home/hero/mobile-video/placeholder.jpg"
          alt="Akasa restaurant ambiance"
          fill
          priority
          sizes="100vw"
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
        preload="auto"
        src="/images/home/hero/mobile-video/heromobilevid.mp4"
        style={{
          objectFit: 'cover',
          width: '100%',
          height: '100%'
        }}
      ></video>

      {/* No text overlay on mobile as per client request */}
    </div>
  );
};

export default BasicVideoHero;
