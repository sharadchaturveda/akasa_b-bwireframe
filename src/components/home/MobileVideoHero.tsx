"use client";

import { memo, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const MobileVideoHero = memo(function MobileVideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [internalLog, setInternalLog] = useState<string[]>(["MVH Initializing..."]);

  const addLog = (message: string) => {
    console.log(`MobileVideoHero LOG: ${message}`);
    setInternalLog(prev => [...prev.slice(-10), message]); // Keep last 10 logs
  };

  useEffect(() => {
    addLog("useEffect triggered.");

    // Check if video files exist using fetch
    fetch('/images/home/hero/mobile-video/heromobilevid.mp4', { method: 'HEAD' })
      .then(response => {
        if (response.ok) {
          addLog(`MP4 file exists (fetch test passed): ${response.status} ${response.statusText}`);
        } else {
          addLog(`ERROR: MP4 file fetch failed: ${response.status} ${response.statusText}`);
        }
      })
      .catch(error => {
        addLog(`ERROR: MP4 file fetch exception: ${error.message}`);
      });

    fetch('/images/home/hero/mobile-video/heromobilevid.webm', { method: 'HEAD' })
      .then(response => {
        if (response.ok) {
          addLog(`WebM file exists (fetch test passed): ${response.status} ${response.statusText}`);
        } else {
          addLog(`ERROR: WebM file fetch failed: ${response.status} ${response.statusText}`);
        }
      })
      .catch(error => {
        addLog(`ERROR: WebM file fetch exception: ${error.message}`);
      });

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
      {/* --- DEBUG VISUAL CUE & LOGS --- */}
      <div style={{
        position: 'fixed', top: '30px', left: '0px', color: 'yellow',
        backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 10001, padding: '5px',
        fontSize: '10px', border: '1px solid yellow', maxHeight: '150px', overflowY: 'auto', width: '100%'
      }}>
        <p>MobileVideoHero IS ACTIVE. Logs:</p>
        {internalLog.map((log, i) => <p key={i} style={{margin:0, padding:0}}>{log}</p>)}
      </div>
      {/* --- END DEBUG VISUAL CUE --- */}

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
          className="w-full h-full object-cover"
          // Add back the attributes in JSX as well for redundancy
          muted
          playsInline
          loop
          autoPlay
          preload="auto"
          poster="/images/home/hero/mobile-video/mobile-poster.png"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            objectFit: 'cover',
            objectPosition: 'center',
            width: '100%',
            height: '100%',
            opacity: 0, // Start hidden, made visible on play
            transition: 'opacity 0.5s ease-in-out',
            backgroundColor: 'transparent',
            transform: 'translateZ(0)',
            willChange: 'opacity',
            zIndex: 30, // Ensure it's above the fallback image
          }}
        >
          {/* VERIFY THESE PATHS - they must be relative to /public */}
          <source src="/images/home/hero/mobile-video/heromobilevid.webm" type="video/webm" />
          <source src="/images/home/hero/mobile-video/heromobilevid.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Debug video indicator */}
      <div style={{
        position: 'fixed',
        bottom: '10px',
        right: '10px',
        backgroundColor: 'red',
        color: 'white',
        padding: '5px',
        fontSize: '12px',
        zIndex: 10002,
        border: '1px solid white'
      }}>
        VIDEO SHOULD BE HERE
      </div>

      {/* Direct test video - completely separate from the main video */}
      <div style={{
        position: 'fixed',
        bottom: '50px',
        right: '10px',
        width: '100px',
        height: '100px',
        backgroundColor: 'blue',
        zIndex: 10003,
        border: '2px solid white'
      }}>
        <video
          autoPlay
          muted
          playsInline
          loop
          controls
          src="/images/home/hero/mobile-video/heromobilevid.mp4"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          color: 'white',
          fontSize: '10px',
          backgroundColor: 'rgba(0,0,0,0.5)',
          padding: '2px'
        }}>
          TEST VIDEO
        </div>
      </div>
    </div>
  );
});

export default MobileVideoHero;
