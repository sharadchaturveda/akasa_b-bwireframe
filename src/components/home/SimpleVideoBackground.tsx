"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image'
;

interface SimpleVideoBackgroundProps {
  videoSrc: string;
  fallbackImageSrc: string;
}

/**
 * A very simple video background component that uses the most basic approach possible
 */
const SimpleVideoBackground = ({ videoSrc, fallbackImageSrc }: SimpleVideoBackgroundProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Effect to handle video playback
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    // Function to handle video playback
    const handlePlayback = () => {
      if (videoElement.paused) {
        // Try to play the video
        videoElement.play().catch(error => {
          console.error('Video play error:', error);
        });
      }
    };

    // Function to reset video if it freezes
    const resetVideo = () => {
      // Get current time
      const currentTime = videoElement.currentTime;

      // If video has been playing for more than 0.5 seconds and hasn't advanced
      // in the last 2 seconds, reset it
      if (currentTime > 0.5 && currentTime === lastTime) {
        console.log('Video appears frozen, resetting...');

        // Try to use a different source
        if (currentSourceIndex < sources.length - 1) {
          currentSourceIndex++;
          const newSource = sources[currentSourceIndex];
          console.log(`Switching to source ${currentSourceIndex}: ${newSource}`);

          // Update the video source
          videoElement.src = newSource;
        }

        // Reset the video
        videoElement.pause();
        videoElement.currentTime = 0;
        videoElement.load();

        // Try to play with a slight delay
        setTimeout(() => {
          if (videoElement) {
            videoElement.play().catch(() => {
              // If still failing, hide video and show fallback
              videoElement.style.display = 'none';
            });
          }
        }, 100);
      } else if (currentTime > 0 && currentTime !== lastTime) {
        // Video is playing normally, make sure it's visible
        videoElement.style.display = 'block';
      }

      // Store current time for next check
      lastTime = currentTime;
    };

    // Define video sources to try
    const sources = [
      `/images/home/hero/mobile-video/heromobilevid.webm?v=${Date.now()}`,
      `/images/home/hero/mobile-video/heromobilevid-small.mp4?v=${Date.now()}`,
      `/images/home/hero/mobile-video/heromobilevid-compressed.mp4?v=${Date.now()}`,
      `/images/home/hero/mobile-video/heromobilevid.mp4?v=${Date.now()}`
    ];

    // Track which source we're using
    let currentSourceIndex = 0;

    // Set up video attributes
    videoElement.muted = true;
    videoElement.playsInline = true;
    videoElement.loop = true;
    videoElement.autoplay = true;

    // Add event listeners
    videoElement.addEventListener('canplay', handlePlayback);
    videoElement.addEventListener('pause', handlePlayback); // Try to resume if paused

    // Track last known time to detect freezes
    let lastTime = 0;

    // Set up interval to check if video is playing
    const playCheckInterval = setInterval(handlePlayback, 1000);

    // Set up interval to check if video is frozen
    const freezeCheckInterval = setInterval(resetVideo, 2000);

    // Clean up
    return () => {
      videoElement.removeEventListener('canplay', handlePlayback);
      videoElement.removeEventListener('pause', handlePlayback);
      clearInterval(playCheckInterval);
      clearInterval(freezeCheckInterval);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Fallback image - always visible underneath */}
      <div className="absolute inset-0 z-[1]">
        <Image src={fallbackImageSrc}
          alt="Background"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Video element - simple implementation */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover z-[2]"
        playsInline
        muted
        loop
        autoPlay
        poster={fallbackImageSrc}
        style={{
          objectFit: 'cover',
          width: '100%',
          height: '100%',
          display: 'block'
        }}
      >
        {/* Try multiple sources with different formats and sizes */}
        <source src="/images/home/hero/mobile-video/heromobilevid.webm" type="video/webm" />
        <source src={`${videoSrc}?v=${Date.now()}`} type="video/mp4" />
        <source src="/images/home/hero/mobile-video/heromobilevid-small.mp4" type="video/mp4" />
        <source src="/images/home/hero/mobile-video/heromobilevid-compressed.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default SimpleVideoBackground;


