"use client";

import { useRef, useEffect, useState } from 'react';
import { preloadVideoSources } from '@/utils/videoPreload';
import MobileHeroFallback from './MobileHeroFallback';

/**
 * Mobile-only hero section with video background
 * This component is completely separate from the desktop hero
 * and will only be rendered on mobile devices
 */
const MobileHero = () => {
  // Reference to video element
  const videoRef = useRef<HTMLVideoElement>(null);

  // State to track video loading status
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(true); // Start with error state to show fallback first

  // Preload video sources
  useEffect(() => {
    // Preload both video formats
    preloadVideoSources([
      { src: '/images/home/hero/mobile-video/heromobilevid.webm', type: 'video/webm' },
      { src: '/images/home/hero/mobile-video/heromobilevid.mp4', type: 'video/mp4' }
    ]);
  }, []);

  // Set up video playback on mount
  useEffect(() => {
    // Double-check we're on mobile - if not, don't do anything
    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
      // This component should never be mounted on desktop
      return;
    }

    // Try to play the video after a short delay
    const timer = setTimeout(() => {
      const video = videoRef.current;
      if (!video) {
        return;
      }

      // Configure video for mobile playback
      video.muted = true;
      video.playsInline = true;
      video.autoplay = true;
      video.loop = true;
      video.controls = false;
      video.preload = 'auto';

      // Set attributes for iOS
      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', '');

      // Try to play the video
      video.play().then(() => {
        setVideoLoaded(true);
        setVideoError(false);
      }).catch(() => {
        setVideoError(true);
      });
    }, 500);

    // Clean up
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
      {/* Show fallback if video fails to load */}
      {videoError && <MobileHeroFallback />}

      {/* Video element */}
      {/* Only render video if we're not showing the fallback */}
      {!videoError && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          playsInline
          muted
          loop
          autoPlay
          style={{
            objectPosition: 'center',
            maxWidth: 'none',
            zIndex: videoLoaded ? 5 : 0,
            opacity: videoLoaded ? 1 : 0
          }}
          onError={() => {
            setVideoError(true);
          }}
          onCanPlay={() => {
            setVideoLoaded(true);
            setVideoError(false);
          }}
        >
          <source src="/images/home/hero/mobile-video/heromobilevid.webm" type="video/webm" />
          <source src="/images/home/hero/mobile-video/heromobilevid.mp4" type="video/mp4" />
        </video>
      )}

      {/* No text overlay on mobile as per client request */}
    </div>
  );
};

export default MobileHero;
