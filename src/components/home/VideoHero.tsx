"use client";

import { memo, useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';

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
 * VideoHero Component
 *
 * A mobile-optimized hero component with video background and audio controls.
 */
const VideoHero = memo(function VideoHero() {
  // Video reference
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // State for tracking video and audio status
  const [videoReady, setVideoReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Function to toggle mute state
  const toggleMute = useCallback(() => {
    if (!videoRef.current) return;

    const newMutedState = !videoRef.current.muted;
    videoRef.current.muted = newMutedState;
    setIsMuted(newMutedState);
  }, []);

  // Set up video on mount
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    console.log('Setting up mobile hero video');

    // Basic setup - must be muted for autoplay
    video.muted = true;
    video.playsInline = true;
    video.loop = true;
    video.autoplay = true;

    // Set attributes for iOS
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.setAttribute('muted', '');

    // Set up event handlers
    const handleCanPlay = () => {
      console.log('Video can play');
      setVideoReady(true);
    };

    const handleError = (e: Event) => {
      console.error('Video error:', e);
      setHasError(true);
    };

    const handlePlaying = () => {
      console.log('Video is playing');
      setVideoReady(true);
    };

    // Add event listeners
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('playing', handlePlaying);
    video.addEventListener('error', handleError);

    // Function to attempt playback with retry logic
    const attemptPlayback = (retries = 3, delay = 300) => {
      video.play().catch(err => {
        console.error(`Error playing video (attempts left: ${retries}):`, err.message || 'Unknown error');

        if (retries > 0) {
          setTimeout(() => attemptPlayback(retries - 1, delay * 1.5), delay);
        } else {
          setHasError(true);
        }
      });
    };

    // Try to play the video after a short delay
    const timer = setTimeout(() => {
      attemptPlayback();
    }, 300);

    // Clean up
    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('playing', handlePlaying);
      video.removeEventListener('error', handleError);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Fallback image - only shown until video is ready */}
      <div className="absolute inset-0 z-10" style={{ opacity: videoReady ? 0 : 1, transition: 'opacity 0.5s ease-in-out' }}>
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

      {/* Video element */}
      <div className="absolute inset-0 z-20">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          muted
          playsInline
          loop
          autoPlay
          preload="auto"
          poster="/images/home/hero/carousel/hero1.jpg"
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
            width: '100%',
            height: '100%',
            filter: 'brightness(1.15)',
            opacity: videoReady && !hasError ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out',
            backgroundColor: 'transparent',
            transform: 'translateZ(0)', // Force hardware acceleration
            willChange: 'transform', // Hint to browser to optimize
          }}
        >
          <source src="/images/home/hero/mobile-video/heromobilevid.webm" type="video/webm" />
          <source src="/images/home/hero/mobile-video/heromobilevid.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Audio control button - only shown when video is playing */}
      {videoReady && (
        <AudioControlButton isMuted={isMuted} toggleMute={toggleMute} />
      )}
    </div>
  );
});

export default VideoHero;
