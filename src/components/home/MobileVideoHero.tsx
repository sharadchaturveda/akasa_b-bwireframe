"use client";

import { memo, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const MobileVideoHero = memo(function MobileVideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [internalLog, setInternalLog] = useState<string[]>(["MVH Initializing..."]);

  // REVIEW: Debug logging function - kept for future debugging if needed
  const addLog = (message: string) => {
    setInternalLog(prev => [...prev.slice(-10), message]); // Keep last 10 logs
  };

  useEffect(() => {
    addLog("useEffect triggered.");

    // Check if video element exists
    const video = videoRef.current;
    if (!video) {
      addLog("ERROR: videoRef.current is null or undefined.");
      return;
    }
    addLog("videoRef.current is valid.");

    // Explicitly set attributes critical for mobile autoplay
    video.muted = true;
    video.playsInline = true; // For iOS
    video.loop = true;
    video.preload = 'auto'; // Hint to browser
    video.setAttribute('webkit-playsinline', 'true'); // Older iOS

    addLog(`Video attributes set: muted=${video.muted}, playsInline=${video.playsInline}, loop=${video.loop}, preload='${video.preload}'`);
    addLog(`Video sources: ${Array.from(video.querySelectorAll('source')).map(s => s.src).join(', ')}`);


    const onCanPlay = () => {
      addLog("EVENT: canplay - Video has enough data to start playing.");
      addLog(`Video dimensions: ${video.videoWidth}x${video.videoHeight}`);
      addLog("Attempting video.play()...");
      video.play()
        .then(() => {
          addLog("SUCCESS: video.play() promise resolved. Video should be playing.");
          // Force video to be visible
          video.style.opacity = '1';
          video.style.display = 'block';
          video.style.visibility = 'visible';

          // Hide fallback image
          const fallbackImage = document.getElementById('mobile-hero-fallback-image');
          if (fallbackImage) fallbackImage.style.opacity = '0';

          // Log video state
          addLog(`Video state after play: paused=${video.paused}, currentTime=${video.currentTime}, readyState=${video.readyState}`);
        })
        .catch(error => {
          addLog(`ERROR: video.play() promise rejected: ${error.name} - ${error.message}`);
        });
    };

    const onPlaying = () => {
      addLog("EVENT: playing - Video has started playing.");
      // Force video to be visible
      video.style.opacity = '1';
      video.style.display = 'block';
      video.style.visibility = 'visible';

      // Hide fallback image
      const fallbackImage = document.getElementById('mobile-hero-fallback-image');
      if (fallbackImage) fallbackImage.style.opacity = '0';

      // Log video state
      addLog(`Video playing: paused=${video.paused}, currentTime=${video.currentTime}, readyState=${video.readyState}`);
    };

    const onError = (event: Event) => {
      let errorMsg = "EVENT: error - An error occurred.";
      if (video.error) {
        errorMsg += ` Code: ${video.error.code}, Message: ${video.error.message}`;
      } else {
        errorMsg += " video.error object is null.";
      }
      errorMsg += ` Event target: ${event.target}`;
      addLog(errorMsg);
      // Show fallback image more explicitly on error
      const fallbackImage = document.getElementById('mobile-hero-fallback-image');
      if (fallbackImage) fallbackImage.style.opacity = '1';
      video.style.opacity = '0';
    };

    const onLoadedData = () => {
      addLog("EVENT: loadeddata - First frame has loaded.");
    };

    const onStalled = () => {
      addLog("EVENT: stalled - Browser is trying to get media data, but data is unexpectedly not forthcoming.");
    };

    const onSuspend = () => {
      addLog("EVENT: suspend - Media data loading has been suspended.");
    };


    video.addEventListener('loadeddata', onLoadedData);
    video.addEventListener('canplay', onCanPlay);
    video.addEventListener('playing', onPlaying);
    video.addEventListener('error', onError);
    video.addEventListener('stalled', onStalled);
    video.addEventListener('suspend', onSuspend);

    addLog("Event listeners added. Calling video.load()...");
    try {
      video.load(); // Explicitly call load after sources are set and listeners attached
    } catch (e: any) {
      addLog(`ERROR calling video.load(): ${e.message}`);
    }


    return () => {
      addLog("Cleanup: Removing event listeners.");
      video.removeEventListener('loadeddata', onLoadedData);
      video.removeEventListener('canplay', onCanPlay);
      video.removeEventListener('playing', onPlaying);
      video.removeEventListener('error', onError);
      video.removeEventListener('stalled', onStalled);
      video.removeEventListener('suspend', onSuspend);
      // video.pause(); // Optional: pause video on unmount
      // video.src = ""; // Optional: release video resources
      // video.load();
    };
  }, []); // Empty dependency array, runs once on mount

return (
  <div
    className="relative w-full h-screen overflow-hidden bg-black"
    style={{
      transform: 'translateZ(0)',
      contain: 'paint',
      willChange: 'transform, opacity'
    }}
  >
      {/* Debug overlay removed */}

      {/* Fallback image - initially visible */}
      <div
        id="mobile-hero-fallback-image"
        className="absolute inset-0 z-10"
        style={{ opacity: 1, transition: 'opacity 0.3s ease-in-out' }}
      >
        <Image
            src="/images/home/hero/mobile-video/mobile-poster.png"
            alt="Akasa restaurant ambiance fallback"
            fill
            priority
          sizes="100vw"
          quality={80}
          className="object-cover"
          onError={(e) => addLog(`Fallback Image Error: ${e.currentTarget.currentSrc}`)}
          onLoad={() => addLog("Fallback Image Loaded Successfully.")}
        />
      </div>

      {/* Video element */}
      <div className="absolute inset-0 z-20">
        <video
          ref={videoRef}
          // Add back the attributes in JSX as well for redundancy
          muted
          playsInline
          loop
          autoPlay
          preload="auto"
          poster="/images/home/hero/mobile-video/mobile-poster.png"
          className="absolute inset-0 w-full h-full object-cover object-center transform-gpu will-change-opacity z-30"
          style={{
            opacity: 0, // Start hidden, made visible on play
            transition: 'opacity 0.5s ease-in-out',
          }}
        >
          {/* VERIFY THESE PATHS - they must be relative to /public */}
          <source src="/images/home/hero/mobile-video/heromobilevid.webm" type="video/webm" />
          <source src="/images/home/hero/mobile-video/heromobilevid.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Debug elements removed */}
    </div>
  );
});

export default MobileVideoHero;
