"use client";

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

/**
 * A pure mobile hero component with strict control over what's displayed
 */
export default function PureMobileHero() {
  // Video reference
  const videoRef = useRef<HTMLVideoElement>(null);

  // State for tracking audio and loading
  const [isMuted, setIsMuted] = useState(true);
  const [videoReady, setVideoReady] = useState(false);

  // Optimized video setup
  useEffect(() => {
    // Reset state
    setVideoReady(false);

    const video = videoRef.current;
    if (!video) return;

    // Basic setup - must be muted for autoplay
    video.muted = true;
    video.playsInline = true;
    video.loop = true;

    // Set attributes for iOS
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');

    // Use WebM format which is much smaller and faster to load
    video.src = `/images/home/hero/mobile-video/heromobilevid.webm`;

    // Simplified event handling
    const handlePlaying = () => setVideoReady(true);

    // Add event listeners
    video.addEventListener('playing', handlePlaying);
    video.addEventListener('canplay', () => {
      // Try to play as soon as it can
      video.play().catch(e => console.error('Error playing video:', e));
    });

    // Clean up
    return () => {
      if (video) {
        video.removeEventListener('playing', handlePlaying);
        video.removeEventListener('canplay', () => {});
        video.pause();
        video.src = '';
      }
    };
  }, []);

  // Toggle mute state
  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isMuted) {
      // Unmute
      video.muted = false;
      setIsMuted(false);
    } else {
      // Mute
      video.muted = true;
      setIsMuted(true);
    }
  };

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
            quality={60}
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
        <div
          className={`fixed bottom-8 right-8 z-50 w-20 h-20 bg-gradient-to-br from-black to-gray-800 rounded-full flex items-center justify-center border-2 border-white/80 shadow-[0_0_15px_rgba(255,255,255,0.3)] cursor-pointer transition-all duration-300 hover:scale-105 ${isMuted ? 'animate-pulse' : ''}`}
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
      )}
    </div>
  );
}
