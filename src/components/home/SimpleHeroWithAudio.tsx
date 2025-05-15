"use client";

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

/**
 * A simple hero component with audio controls
 */
export default function SimpleHeroWithAudio() {
  // Video reference
  const videoRef = useRef<HTMLVideoElement>(null);

  // State
  const [isMuted, setIsMuted] = useState(true);

  // Set up video on mount
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Reset video ready state
    setVideoReady(false);

    // Must start muted for autoplay
    video.muted = true;
    video.playsInline = true;
    video.loop = true;
    video.autoplay = true;

    // Set attributes for iOS
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');

    // Add timestamp to prevent caching
    const timestamp = new Date().getTime();
    video.src = `/images/home/hero/mobile-video/heromobilevid.mp4?v=${timestamp}`;

    // Track if component is mounted
    let isMounted = true;

    // Play the video with proper handling of promises
    const playVideo = async () => {
      if (!isMounted || !video) return;

      try {
        // Store the play promise
        const playPromise = video.play();

        // Only if we have a promise (modern browsers)
        if (playPromise !== undefined) {
          await playPromise; // Wait for it to resolve
          console.log('Video playing successfully');

          // Note: We don't set videoReady here - we'll do that in the onCanPlay event
          // This ensures the video has actually loaded frames before we show it
        }
      } catch (error) {
        // Only log if still mounted
        if (isMounted) {
          console.error('Error playing video:', error);
        }
      }
    };

    // Start playing after a short delay
    const timer = setTimeout(playVideo, 300);

    // Clean up function
    return () => {
      // Mark as unmounted first
      isMounted = false;

      // Reset video ready state
      setVideoReady(false);

      // Clear the timeout
      clearTimeout(timer);

      // Only if video exists
      if (video) {
        // Don't set src to empty string as it can cause errors
        video.pause();
        video.removeAttribute('src');
        video.load();
      }
    };
  }, []);

  // Toggle mute state with proper promise handling
  const toggleMute = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      if (isMuted) {
        // Unmute - first ensure video is playing
        const playPromise = video.play();

        // If we have a promise, wait for it to resolve before changing mute state
        if (playPromise !== undefined) {
          await playPromise;
        }

        // Now it's safe to unmute
        video.muted = false;
        setIsMuted(false);
        console.log('Video unmuted successfully');
      } else {
        // Mute - no need to wait for play promise as we're just muting
        video.muted = true;
        setIsMuted(true);
        console.log('Video muted successfully');
      }
    } catch (error) {
      console.error('Error toggling mute state:', error);

      // If there was an error, ensure the UI state matches reality
      if (video) {
        setIsMuted(video.muted);
      }
    }
  };

  // State to track if video is ready to display
  const [videoReady, setVideoReady] = useState(false);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Fallback image - always visible until video is ready */}
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

      {/* Video element - hidden until ready */}
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${videoReady ? 'opacity-100 z-20' : 'opacity-0 z-0'}`}
        muted
        playsInline
        loop
        autoPlay
        preload="auto"
        poster="/images/home/hero/mobile-poster.jpg"
        onCanPlay={() => {
          // Only set video as ready once it can play
          setTimeout(() => setVideoReady(true), 100);
        }}
      />

      {/* Fixed audio button - only shown when video is ready */}
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
          // Volume muted icon with glow effect - no text
          <div className="relative flex items-center justify-center">
            {/* Custom volume icon placeholder - replace with your image */}
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
