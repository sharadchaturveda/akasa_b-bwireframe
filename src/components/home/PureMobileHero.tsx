"use client";

import { memo } from 'react';
import Image from 'next/image';
import { useVideoPlayer } from '@/hooks/useVideoPlayer';
import { IMAGES } from '@/constants';

/**
 * AudioControlButton Component
 *
 * A button for controlling audio in the video player
 */
const AudioControlButton = memo(function AudioControlButton({
  isMuted,
  toggleMute
}: {
  isMuted: boolean;
  toggleMute: () => void;
}) {
  return (
    <div
      className={`fixed bottom-8 right-8 z-50 w-20 h-20 bg-gradient-to-br from-black to-gray-800 rounded-full
                 flex items-center justify-center border-2 border-white/80 shadow-[0_0_15px_rgba(255,255,255,0.3)]
                 cursor-pointer transition-all duration-300 hover:scale-105 ${isMuted ? 'animate-pulse' : ''}`}
      onClick={toggleMute}
      style={{
        opacity: 0.95,
        backdropFilter: 'blur(4px)'
      }}
    >
      {isMuted ? (
        // Volume muted icon
        <div className="relative flex items-center justify-center">
          {/* Custom volume icon */}
          <div className="w-12 h-12 flex items-center justify-center">
            <img
              src="/images/volume-muted-icon.png"
              alt="Unmute"
              className="w-10 h-10 drop-shadow-[0_0_3px_rgba(255,255,255,0.7)]"
            />
          </div>

          {/* Subtle ring animation */}
          <div className="absolute inset-0 rounded-full border border-white/30 animate-ping opacity-50"></div>
        </div>
      ) : (
        // Equalizer GIF for unmuted state
        <div className="flex items-center justify-center">
          <img
            src="/images/equalizer-animation.gif"
            alt="Audio playing"
            className="w-12 h-12 drop-shadow-[0_0_3px_rgba(255,255,255,0.7)]"
          />
        </div>
      )}
    </div>
  );
});

/**
 * PureMobileHero Component
 *
 * A mobile-optimized hero component with video background and audio controls.
 * Uses the useVideoPlayer hook for better code organization and reusability.
 *
 * @returns {JSX.Element} The rendered component
 */
const PureMobileHero = memo(function PureMobileHero() {
  // Use the video player hook for better organization
  const {
    videoRef,
    isReady: videoReady,
    isMuted,
    toggleMute
  } = useVideoPlayer({
    src: '/images/home/hero/mobile-video/heromobilevid.webm',
    posterSrc: '/images/home/hero/mobile-poster.jpg',
    autoplay: true,
    loop: true,
    muted: true,
    playsInline: true,
    preventCaching: true
  });

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Black background to prevent any flashing */}
      <div className="absolute inset-0 bg-black z-0"></div>

      {/* Fallback image - only shown until video is ready */}
      {!videoReady && (
        <div className="absolute inset-0 z-10">
          <Image
            src="/images/home/hero/mobile-poster.jpg"
            alt="Akasa restaurant ambiance"
            fill
            priority
            sizes="100vw"
            quality={IMAGES.LOW_QUALITY}
            className="object-cover"
          />
        </div>
      )}

      {/* Video element - only visible when ready */}
      <div className={`absolute inset-0 z-20 transition-opacity duration-500 ${videoReady ? 'opacity-100' : 'opacity-0'}`}>
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          muted
          playsInline
          loop
          autoPlay
          poster="/images/home/hero/mobile-poster.jpg"
        />
      </div>

      {/* Audio control button - only shown when video is playing */}
      {videoReady && (
        <AudioControlButton isMuted={isMuted} toggleMute={toggleMute} />
      )}
    </div>
  );
});

export default PureMobileHero;
