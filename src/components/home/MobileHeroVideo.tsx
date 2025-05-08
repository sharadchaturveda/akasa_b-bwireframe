"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { createUniqueVideoUrl, optimizeVideoForMobile, playVideoWithRetry } from '@/utils/videoLoader';

interface MobileHeroVideoProps {
  videoSrc: string;
  fallbackImageSrc: string;
  className?: string;
}

/**
 * A component that displays a video with a fallback image
 * Handles loading, errors, and playback more effectively
 */
const MobileHeroVideo = ({ videoSrc, fallbackImageSrc, className = '' }: MobileHeroVideoProps) => {
  // Refs for video element
  const videoRef = useRef<HTMLVideoElement>(null);

  // State for tracking video status
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(true); // Start with error state
  const [attemptedLoad, setAttemptedLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Start with loading state

  // Generate a unique video URL to bypass caching
  const uniqueVideoSrc = createUniqueVideoUrl(videoSrc);

  // Preload video when component mounts
  useEffect(() => {
    // Create a link element for preloading
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = videoSrc;
    link.as = 'video';
    link.type = 'video/mp4';

    // Add to document head
    document.head.appendChild(link);

    // Clean up
    return () => {
      document.head.removeChild(link);
    };
  }, [videoSrc]);

  // Handle video loading with more aggressive approach
  useEffect(() => {
    let mounted = true;
    let loadAttempts = 0;
    const maxAttempts = 5; // Increase max attempts

    // Force video to be visible in DOM
    const forceVideoVisibility = () => {
      if (!videoRef.current) return;

      // Force video to be visible and properly styled
      videoRef.current.style.display = 'block';
      videoRef.current.style.visibility = 'visible';
      videoRef.current.style.opacity = '1';
      videoRef.current.style.zIndex = '10';
      videoRef.current.style.objectFit = 'cover';
      videoRef.current.style.objectPosition = 'center';
      videoRef.current.style.width = '100%';
      videoRef.current.style.height = '100%';
      videoRef.current.style.position = 'absolute';
      videoRef.current.style.top = '0';
      videoRef.current.style.left = '0';
      videoRef.current.style.right = '0';
      videoRef.current.style.bottom = '0';
    };

    const attemptVideoLoad = async () => {
      if (!mounted || loadAttempts >= maxAttempts) return;

      loadAttempts++;
      setAttemptedLoad(true);

      if (!videoRef.current) return;

      try {
        // Reset video state
        videoRef.current.pause();
        videoRef.current.removeAttribute('src');
        videoRef.current.load();

        // Set new source with cache-busting
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000000);
        const uniqueUrl = `${videoSrc}?t=${timestamp}&r=${random}&attempt=${loadAttempts}`;
        videoRef.current.src = uniqueUrl;

        // Force video to be visible
        forceVideoVisibility();

        // Set video attributes
        videoRef.current.muted = true;
        videoRef.current.playsInline = true;
        videoRef.current.autoplay = true;
        videoRef.current.loop = true;
        videoRef.current.controls = false;
        videoRef.current.preload = 'auto';

        // Set attributes for mobile
        videoRef.current.setAttribute('playsinline', '');
        videoRef.current.setAttribute('webkit-playsinline', '');

        // Load video
        videoRef.current.load();

        // Try to play with retry logic
        const playPromise = videoRef.current.play();

        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              if (mounted) {
                console.log('Video playing successfully');
                setVideoLoaded(true);
                setVideoError(false);
                setIsLoading(false);

                // Force visibility again after successful play
                forceVideoVisibility();
              }
            })
            .catch((error) => {
              console.log('Video play failed, retrying...', error);
              if (mounted && loadAttempts < maxAttempts) {
                // Retry after a delay
                setTimeout(attemptVideoLoad, 1000);
              } else if (mounted) {
                setVideoError(true);
                setIsLoading(false);
              }
            });
        }
      } catch (error) {
        // Handle error
        if (mounted && loadAttempts < maxAttempts) {
          // Retry after a delay
          setTimeout(attemptVideoLoad, 1000);
        } else if (mounted) {
          // Give up and show fallback
          setVideoError(true);
          setIsLoading(false);
        }
      }
    };

    // Start loading video
    attemptVideoLoad();

    // Cleanup
    return () => {
      mounted = false;
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.src = '';
        videoRef.current.load();
      }
    };
  }, [videoSrc]);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`} style={{ display: 'block', overflow: 'hidden' }}>
      {/* Fallback image - visible during loading and when video has error */}
      <div className="absolute inset-0 z-[1]" style={{ display: (isLoading || videoError) ? 'block' : 'none' }}>
        <Image
          src={fallbackImageSrc}
          alt="Background fallback"
          fill
          priority={true}
          sizes="100vw"
          className="object-cover fallback-image opacity-100"
        />
      </div>

      {/* Video element - always rendered but conditionally displayed */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full mobile-hero-video"
          playsInline
          muted
          loop
          autoPlay
          preload="auto"
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
            width: '100%',
            height: '100%',
            maxWidth: 'none',
            minWidth: '100%',
            minHeight: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: videoLoaded && !videoError ? 2 : 0,
            display: 'block', // Always display the video element
            visibility: videoLoaded && !videoError ? 'visible' : 'hidden', // Hide it when not loaded
            opacity: 1 // Full brightness
          }}
          onError={() => setVideoError(true)}
          onCanPlay={() => {
            setVideoLoaded(true);
            setVideoError(false);
            setIsLoading(false); // Video can play now
          }}
        >
          {/* Multiple sources with different cache-busting parameters */}
          <source src={uniqueVideoSrc} type="video/mp4" />
          <source src={createUniqueVideoUrl(videoSrc)} type="video/mp4" />
          <source src={`${videoSrc}?v=${Date.now()}`} type="video/mp4" />
        </video>

      {/* No overlay needed since there's no text */}
    </div>
  );
};

export default MobileHeroVideo;
