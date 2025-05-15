"use client";

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

/**
 * A simplified video hero component for mobile
 * Focused on reliable video playback with audio controls
 */
const SimpleVideoHero = () => {
  // Reference to video element
  const videoRef = useRef<HTMLVideoElement>(null);

  // State for tracking video status
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);

  // Set up video on mount
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    console.log('Setting up simple video hero');

    // Basic setup - must be muted for autoplay
    video.muted = true;
    video.playsInline = true;
    video.loop = true;
    video.autoplay = true;

    // Set attributes for iOS
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.setAttribute('muted', '');

    // Add timestamp to prevent caching
    const timestamp = new Date().getTime();
    video.src = `/images/home/hero/mobile-video/heromobilevid.mp4?v=${timestamp}`;

    // Add event listener for when video can play
    const handleCanPlay = () => {
      console.log('Video can play event triggered');
      setIsPlaying(true);
    };

    // Add event listener for when video is playing
    const handlePlaying = () => {
      console.log('Video is playing');
      setIsPlaying(true);
    };

    // Add event listeners
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('playing', handlePlaying);

    // Force load
    video.load();

    // Play with retry
    const playWithRetry = async (attempts = 0, maxAttempts = 3) => {
      try {
        console.log(`Attempting to play video (${attempts + 1}/${maxAttempts + 1})`);
        await video.play();
        console.log('Video playing successfully');
        setIsPlaying(true);

        // Show controls after video starts playing
        setTimeout(() => {
          setShowControls(true);
        }, 1000);
      } catch (error) {
        console.error('Video play error:', error);

        if (attempts < maxAttempts) {
          console.log(`Retrying in 800ms... (${attempts + 1}/${maxAttempts})`);
          setTimeout(() => playWithRetry(attempts + 1, maxAttempts), 800);
        } else {
          console.error('Failed to play video after multiple attempts');
        }
      }
    };

    // Start playing after a short delay
    const timer = setTimeout(() => playWithRetry(), 500);

    // Clean up
    return () => {
      clearTimeout(timer);
      if (video) {
        // Remove event listeners
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('playing', handlePlaying);

        // Stop video
        video.pause();
        video.src = '';
        video.load();
      }
    };
  }, []);

  // Toggle mute state
  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    console.log('Toggle mute clicked, current muted state:', video.muted);

    try {
      if (video.muted) {
        // Unmute
        video.muted = false;
        setIsMuted(false);
        console.log('Video unmuted');
      } else {
        // Mute
        video.muted = true;
        setIsMuted(true);
        console.log('Video muted');
      }
    } catch (error) {
      console.error('Error toggling mute state:', error);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Fallback image */}
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

      {/* Video element */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full"
        muted
        playsInline
        loop
        autoPlay
        controls={false}
        preload="auto"
        poster="/images/home/hero/mobile-poster.jpg"
        style={{
          objectFit: 'cover',
          zIndex: isPlaying ? 10 : 0,
        }}
        onCanPlay={() => {
          console.log('onCanPlay event fired');
          setIsPlaying(true);
        }}
        onPlaying={() => {
          console.log('onPlaying event fired');
          setIsPlaying(true);
          // Show controls after video starts playing
          setTimeout(() => {
            setShowControls(true);
          }, 1000);
        }}
      />

      {/* Mute/Unmute button - always show when video is playing */}
      {isPlaying && (
        <button
          onClick={toggleMute}
          className="absolute bottom-6 right-6 z-30 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full w-14 h-14 flex items-center justify-center focus:outline-none border-2 border-white/40 backdrop-blur-sm transition-all duration-300 ease-in-out shadow-lg"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          <div className="relative">
            {/* Label text above icon */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-medium bg-black/80 px-2 py-1 rounded whitespace-nowrap">
              {isMuted ? "Tap to unmute" : "Tap to mute"}
            </div>

            {isMuted ? (
              // Muted icon
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            ) : (
              // Unmuted icon
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            )}
          </div>
        </button>
      )}
    </div>
  );
};

export default SimpleVideoHero;
