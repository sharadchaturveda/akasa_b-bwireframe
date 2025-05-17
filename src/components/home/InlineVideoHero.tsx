"use client";

/**
 * InlineVideoHero Component
 * 
 * The simplest possible implementation with inline video
 * No React state, no useEffect, just a direct video element
 */
export default function InlineVideoHero() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Video element with direct src */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        muted
        playsInline
        loop
        autoPlay
        preload="auto"
        src="/images/home/hero/mobile-video/heromobilevid.mp4"
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />
      
      {/* Debug indicator */}
      <div className="absolute top-4 left-4 z-50 bg-red-500 text-white p-2 text-xs font-bold">
        INLINE VIDEO ACTIVE
      </div>
    </div>
  );
}
