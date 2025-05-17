"use client";

import { useRef, useEffect, useState, memo } from 'react';
import Image from 'next/image';
import { prepareVideoForMobile, playVideoWithRetries, createNoCacheUrl } from '@/utils/mobileVideoHelper';

/**
 * A video hero component with mute/unmute functionality
 * Optimized for performance and mobile autoplay compatibility
 */
const BasicVideoHero = memo(function BasicVideoHero() {
  // Reference to video element
  const videoRef = useRef<HTMLVideoElement>(null);

  // State for tracking video and audio status
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [showControls, setShowControls] = useState(false);

  // Set up video on mount
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Log for debugging
    console.log('Setting up mobile hero video');

    // Ensure the video has a valid src
    if (!video.src || video.src === '') {
      // Set the src directly with cache busting
      const timestamp = new Date().getTime();
      video.src = `/images/home/hero/mobile-video/heromobilevid.mp4?v=${timestamp}`;
    }

    // Prepare video for mobile playback
    prepareVideoForMobile(video);

    // Force load the video
    video.load();

    // Function to handle successful play
    const handlePlaySuccess = () => {
      console.log('Video playing successfully');
      setIsPlaying(true);
      setVideoLoaded(true);

      // Show controls after a short delay
      setTimeout(() => {
        setShowControls(true);
      }, 1000);
    };

    // Function to handle video error
    const handleError = () => {
      console.error('Video error occurred');
      if (video.error) {
        console.error('Video error code:', video.error.code);
        console.error('Video error message:', video.error.message);
      }
    };

    // Function to handle when video can play
    const handleCanPlay = () => {
      console.log('Video can play event triggered');
      setVideoLoaded(true);
    };

    // Function to handle when video is loaded
    const handleLoadedData = () => {
      console.log('Video loaded data event triggered');
      setVideoLoaded(true);
    };

    // Add event listeners
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('playing', handlePlaySuccess);
    video.addEventListener('error', handleError);

    // Check if the video file exists before attempting to play
    const checkVideoExists = async () => {
      try {
        // Try to fetch the video file to check if it exists
        const response = await fetch(video.src, { method: 'HEAD' });
        if (response.ok) {
          console.log('Video file exists, attempting to play');
          // Use our utility to play the video with retries
          return playVideoWithRetries(
            video,
            handlePlaySuccess,
            () => console.log('Failed to play video after retries'),
            5, // More retries
            800  // Slightly faster retry
          );
        } else {
          console.error('Video file not found:', video.src);
          return () => {}; // Return empty cleanup function
        }
      } catch (error) {
        console.error('Error checking video file:', error);
        return () => {}; // Return empty cleanup function
      }
    };

    // Start the video check and play process
    const videoCheckPromise = checkVideoExists();

    // Clean up
    return () => {
      // Cancel any pending video check
      if (videoCheckPromise && typeof videoCheckPromise.then === 'function') {
        videoCheckPromise.then(cleanup => {
          if (typeof cleanup === 'function') {
            cleanup();
          }
        });
      }

      // Clean up event listeners
      if (video) {
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('loadeddata', handleLoadedData);
        video.removeEventListener('playing', handlePlaySuccess);
        video.removeEventListener('error', handleError);
        video.pause();
        video.src = '';
        video.load();
      }
    };
  }, []);

  // Function to toggle mute state
  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.muted) {
      // Unmute the video
      video.muted = false;
      setIsMuted(false);
    } else {
      // Mute the video
      video.muted = true;
      setIsMuted(true);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Fallback image - always visible until video loads */}
      <div className="absolute inset-0" style={{ zIndex: videoLoaded ? 0 : 10 }}>
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

      {/* Video element - positioned on top of the image once loaded */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full"
        muted
        playsInline
        loop
        autoPlay
        preload="auto"
        poster="/images/home/hero/mobile-poster.jpg"
        src="/images/home/hero/mobile-video/heromobilevid.mp4"
        style={{
          objectFit: 'cover',
          zIndex: videoLoaded ? 10 : 0,
          opacity: videoLoaded ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out'
        }}
      ></video>

      {/* Debug info - only visible during development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-20 left-4 z-30 bg-black/70 text-white p-2 text-xs rounded">
          <p>Video loaded: {videoLoaded ? 'Yes' : 'No'}</p>
          <p>Is playing: {isPlaying ? 'Yes' : 'No'}</p>
          <p>Is muted: {isMuted ? 'Yes' : 'No'}</p>
        </div>
      )}

      {/* Mute/Unmute button - only shown when video is playing and controls are visible */}
      {videoLoaded && (
        <button
          onClick={toggleMute}
          className={`absolute bottom-6 right-6 z-20 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full w-12 h-12 flex items-center justify-center focus:outline-none border border-white/20 backdrop-blur-sm transition-all duration-500 ease-in-out ${showControls ? 'opacity-70 hover:opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? (
            // Muted icon (volume off)
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
          ) : (
            // Unmuted icon (volume on)
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          )}
        </button>
      )}
    </div>
  );
});

export default BasicVideoHero;
