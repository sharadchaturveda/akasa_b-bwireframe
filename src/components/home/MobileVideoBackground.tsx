"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface MobileVideoBackgroundProps {
  videoUrl: string;
  fallbackImageUrl: string;
}

/**
 * A simple component that displays a video background on mobile
 * with a fallback image if the video fails to load
 */
const MobileVideoBackground = ({ videoUrl, fallbackImageUrl }: MobileVideoBackgroundProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  // Generate a unique URL to bypass caching
  const uniqueVideoUrl = `${videoUrl}?nocache=${Date.now()}-${Math.random()}`;

  useEffect(() => {
    // Create a new video element
    const video = document.createElement('video');

    // Set video attributes
    video.muted = true;
    video.playsInline = true;
    video.autoplay = true;
    video.loop = true;
    video.controls = false;
    video.preload = 'auto';

    // Apply styles as a single className via cssText for better performance
    video.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;z-index:10;opacity:1;display:block;visibility:visible';

    // Set attributes for mobile
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');

    // Set source with cache-busting
    video.src = uniqueVideoUrl;

    // Add event listeners
    video.addEventListener('canplay', () => {
      setVideoLoaded(true);
      setVideoFailed(false);

      // Replace the existing video element
      if (videoRef.current && videoRef.current.parentNode) {
        videoRef.current.parentNode.replaceChild(video, videoRef.current);
        videoRef.current = video;
      }
    });

    video.addEventListener('error', () => {
      setVideoFailed(true);
    });

    // Load the video
    video.load();

    // Try to play the video
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        setVideoFailed(true);
      });
    }

    // Clean up
    return () => {
      video.pause();
      video.src = '';
      video.load();
    };
  }, [uniqueVideoUrl]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
      {/* Fallback image - always visible until video loads */}
      <div
        className="absolute inset-0 z-[1]"
        style={{ display: videoLoaded && !videoFailed ? 'none' : 'block' }}
      >
        <Image src={fallbackImageUrl}
          alt="Background"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Video placeholder - will be replaced by the actual video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover z-[2]"
        playsInline
        muted
        loop
        autoPlay
        preload="auto"
      >
        <source src={uniqueVideoUrl} type="video/mp4" />
      </video>
    </div>
  );
};

export default MobileVideoBackground;