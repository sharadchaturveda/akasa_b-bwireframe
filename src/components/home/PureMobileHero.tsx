"use client";

import { memo, useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { IMAGES } from '@/constants';
import { optimizeVideoForMobile, preloadVideoSources, logVideoError } from '@/utils/videoUtils';

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
  // Use direct video reference instead of the hook for simplicity
  const videoRef = useRef<HTMLVideoElement>(null);
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

  // Preload video sources
  useEffect(() => {
    // Preload both video formats
    preloadVideoSources([
      { src: '/images/home/hero/mobile-video/heromobilevid.webm', type: 'video/webm' },
      { src: '/images/home/hero/mobile-video/heromobilevid.mp4', type: 'video/mp4' }
    ]);
  }, []);

  // Handle video events
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    console.log('Setting up mobile hero video');

    // Optimize video for mobile playback
    optimizeVideoForMobile(video);

    // Set attributes for iOS compatibility
    // Note: We're setting these directly on the DOM element
    // even though we also have them in the JSX
    video.setAttribute('playsinline', 'true');

    // Set up event handlers
    const handleCanPlay = () => {
      console.log('Video can play');
      setVideoReady(true);
    };

    const handleError = () => {
      // Use our safe utility function to log errors
      logVideoError(video);

      setHasError(true);

      // Notify parent component about failure
      window.dispatchEvent(new Event('mobile-video-failure'));
    };

    const handlePlaying = () => {
      console.log('Video is playing');
      setVideoReady(true);
    };

    // Handle pause event - important for iOS power saving
    const handlePause = () => {
      console.log('Video paused - attempting to resume');

      // Try to resume playback if video was paused by the browser
      // This helps with iOS power saving pauses
      if (document.visibilityState !== 'hidden') {
        setTimeout(() => {
          video.play().catch(err => {
            console.log('Could not resume after pause:', err.message);
          });
        }, 100);
      }
    };

    // Handle visibility change
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        console.log('Page became visible - attempting to play video');
        video.play().catch(err => {
          console.log('Could not play on visibility change:', err.message);
        });
      }
    };

    // Add event listeners
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('playing', handlePlaying);
    video.addEventListener('error', handleError);
    video.addEventListener('pause', handlePause);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Function to attempt playback with retry logic
    const attemptPlayback = (retries = 3, delay = 300) => {
      video.play().catch(err => {
        // Safely log the error message
        console.error(`Error playing video (attempts left: ${retries}):`,
          err && typeof err.message === 'string' ? err.message : 'Unknown error');

        if (retries > 0) {
          // If error is power saving related, we'll retry
          const errorMsg = err && typeof err.message === 'string' ? err.message : '';
          if (errorMsg.includes('power') || errorMsg.includes('interrupted')) {
            console.log('Power saving error detected, retrying...');
            setTimeout(() => attemptPlayback(retries - 1, delay * 1.5), delay);
          } else if (retries === 1) {
            // Last retry failed, switch to fallback
            setHasError(true);
            window.dispatchEvent(new Event('mobile-video-failure'));
          }
        } else {
          // No more retries, switch to fallback
          setHasError(true);
          window.dispatchEvent(new Event('mobile-video-failure'));
        }
      });
    };

    // Try to play the video after a short delay
    const timer = setTimeout(() => {
      attemptPlayback();

      // Set up periodic check to ensure video is still playing
      const playbackCheckInterval = setInterval(() => {
        if (video.paused && document.visibilityState === 'visible') {
          console.log('Video found paused during check, attempting to resume');
          video.play().catch(() => {});
        }
      }, 5000);

      // Clean up interval on component unmount
      return () => clearInterval(playbackCheckInterval);
    }, 300);

    // Clean up
    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('playing', handlePlaying);
      video.removeEventListener('error', handleError);
      video.removeEventListener('pause', handlePause);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* No black overlay for better video brightness */}

      {/* Inline styles for video brightness */}
      <style jsx>{`
        video {
          filter: brightness(1.15) !important;
          opacity: 1 !important;
        }
      `}</style>

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

      {/* Video element - simplified approach */}
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
            zIndex: 1
          }}
          data-wf-ignore="true" // Webflow ignore attribute to prevent interference
          disablePictureInPicture // Prevent picture-in-picture
          disableRemotePlayback // Prevent remote playback
        >
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

export default PureMobileHero;
