"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

/**
 * MinimalVideoHero Component
 * 
 * A very minimal implementation with direct video src
 */
export default function MinimalVideoHero() {
  // State for UI
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Fallback image - always visible */}
      <div className="absolute inset-0 z-10">
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
      
      {/* Video element - positioned on top of the image */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-20"
        muted
        playsInline
        loop
        autoPlay
        preload="auto"
        src="/images/home/hero/mobile-video/heromobilevid.mp4"
        onPlaying={() => setIsVideoPlaying(true)}
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />
      
      {/* Debug info */}
      <div className="absolute top-4 left-4 z-50 bg-black/70 text-white p-2 text-xs">
        <p>Video Playing: {isVideoPlaying ? 'Yes' : 'No'}</p>
      </div>
    </div>
  );
}
