"use client";

import { useRef, useEffect, useState, useCallback, memo } from 'react';
import Image from 'next/image';

/**
 * A simplified mobile video hero component with prominent unmute controls
 * Memoized to prevent unnecessary re-renders
 */
const MobileVideoWithControls = memo(function MobileVideoWithControls() {
  // Video reference
  const videoRef = useRef<HTMLVideoElement>(null);

  // State
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Set up video on mount
  useEffect(() => {
    // Only log in development mode
    if (process.env.NODE_ENV === 'development') {
      console.log('MobileVideoWithControls mounted');
    }

    const video = videoRef.current;
    if (!video) return;

    // Must start muted for autoplay to work on mobile
    video.muted = true;

    // Set up video for mobile
    video.playsInline = true;
    video.autoplay = true;
    video.loop = true;
    video.volume = 1.0; // Set volume to maximum

    // Set attributes for iOS
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.setAttribute('muted', '');

    // Add timestamp to prevent caching
    const timestamp = new Date().getTime();
    video.src = `/images/home/hero/mobile-video/heromobilevid.mp4?v=${timestamp}`;

    // Log initial state only in development mode
    if (process.env.NODE_ENV === 'development') {
      console.log('Initial video state:', {
        muted: video.muted,
        volume: video.volume,
        paused: video.paused,
        src: video.src
      });
    }

    // Add event listener for iOS audio unlock
    const unlockAudio = () => {
      // This function will be called on the first user interaction
      // It helps iOS devices to enable audio later
      if (video.muted) {
        // Just play the video to register the interaction
        video.play().catch(e => {
          if (process.env.NODE_ENV === 'development') {
            console.error('Error in unlockAudio:', e);
          }
        });
      }
    };

    // Add the unlock listener to the document
    document.addEventListener('touchstart', unlockAudio, { once: true });

    // Play the video
    const playVideo = async () => {
      try {
        await video.play();
        if (process.env.NODE_ENV === 'development') {
          console.log('Video playing successfully');
        }
        setIsVideoPlaying(true);
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Error playing video:', error);
        }
      }
    };

    // Play after a short delay
    const timer = setTimeout(playVideo, 500);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('touchstart', unlockAudio);
      if (video) {
        video.pause();
        video.src = '';
      }
    };
  }, []);

  // Toggle mute state - simplified and reliable
  // Using useCallback to prevent recreation on each render
  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) {
      console.error('Video element not found');
      return;
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('Toggle mute clicked, current state:', isMuted);
    }

    try {
      if (isMuted) {
        // Unmute - use multiple approaches for better compatibility
        video.muted = false;
        video.volume = 1.0;

        // Update state after changing video properties
        setIsMuted(false);

        // Visual feedback
        const button = document.querySelector('.mute-button');
        if (button) {
          button.classList.add('bg-green-500');
          setTimeout(() => {
            button.classList.remove('bg-green-500');
          }, 300);
        }

        if (process.env.NODE_ENV === 'development') {
          console.log('Video unmuted, new muted state:', video.muted, 'volume:', video.volume);
        }
      } else {
        // Mute
        video.muted = true;

        // Update state after changing video properties
        setIsMuted(true);
        if (process.env.NODE_ENV === 'development') {
          console.log('Video muted, new muted state:', video.muted);
        }
      }

      // Force play to ensure video continues
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(e => {
          if (process.env.NODE_ENV === 'development') {
            console.error('Error playing video after mute toggle:', e);
          }

          // If play fails, try again with user interaction
          document.addEventListener('touchstart', function playOnTouch() {
            video.play().catch(err => {
              if (process.env.NODE_ENV === 'development') {
                console.error('Play on touch failed:', err);
              }
            });
            document.removeEventListener('touchstart', playOnTouch);
          }, { once: true });
        });
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error toggling mute state:', error);
      }
    }
  }, [isMuted]);

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

      {/* Video element with direct event handlers */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        playsInline
        loop
        autoPlay
        preload="auto"
        poster="/images/home/hero/mobile-poster.jpg"
        onCanPlay={() => {
          if (process.env.NODE_ENV === 'development') {
            console.log('Video can play');
          }
        }}
        onPlaying={() => {
          if (process.env.NODE_ENV === 'development') {
            console.log('Video is playing');
          }
        }}
        onVolumeChange={() => {
          const video = videoRef.current;
          if (video) {
            if (process.env.NODE_ENV === 'development') {
              console.log('Volume changed, muted:', video.muted, 'volume:', video.volume);
            }
            // Ensure state matches actual video state
            setIsMuted(video.muted);
          }
        }}
        onClick={() => {
          // iOS often requires a direct user interaction with the video element
          toggleMute();
        }}
      />

      {/* Audio control button - always visible and prominent */}
      <div className={`fixed bottom-16 right-6 z-50 ${isMuted ? 'animate-pulse' : ''}`}>
        {/* Simple button with icon only - larger and more visible */}
        <button
          onClick={toggleMute}
          className="mute-button bg-black hover:bg-black text-white p-4 rounded-full w-16 h-16 flex items-center justify-center focus:outline-none border-2 border-white shadow-lg transition-all duration-300"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
          type="button"
        >
          {isMuted ? (
            /* Volume/speaker icon when muted - larger and more visible */
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="1.5" className="w-10 h-10">
              <path d="M11 5L6 9H2v6h4l5 4V5z" fill="white" />
              <line x1="23" y1="9" x2="17" y2="15" strokeWidth="2" />
              <line x1="17" y1="9" x2="23" y2="15" strokeWidth="2" />
            </svg>
          ) : (
            /* Animated equalizer visualization when unmuted - larger and more visible */
            <div className="flex items-center justify-center h-10 space-x-1">
              <div className="w-2 h-4 bg-white animate-eq-bar1"></div>
              <div className="w-2 h-6 bg-white animate-eq-bar2"></div>
              <div className="w-2 h-10 bg-white animate-eq-bar3"></div>
              <div className="w-2 h-5 bg-white animate-eq-bar4"></div>
              <div className="w-2 h-3 bg-white animate-eq-bar5"></div>
            </div>
          )}
        </button>
      </div>
    </div>
  );
});

export default MobileVideoWithControls;
