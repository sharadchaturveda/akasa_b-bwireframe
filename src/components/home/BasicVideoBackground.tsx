"use client";

import Image from 'next/image';

interface BasicVideoBackgroundProps {
  fallbackImageSrc: string;
}

/**
 * A basic video background component with no fancy features
 * Just a plain HTML video element with a fallback image
 */
const BasicVideoBackground = ({ fallbackImageSrc }: BasicVideoBackgroundProps) => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Fallback image - always visible underneath */}
      <div className="absolute inset-0 z-[1]">
        <Image
          src={fallbackImageSrc}
          alt="Background"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      
      {/* Video element - as basic as possible */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-[2]"
        playsInline
        muted
        loop
        autoPlay
        style={{
          objectFit: 'cover',
          width: '100%',
          height: '100%'
        }}
      >
        <source src="/images/home/hero/mobile-video/heromobilevid.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default BasicVideoBackground;
