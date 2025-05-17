"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

/**
 * DebugVideoHero Component
 * 
 * A minimal implementation focused on reliable mobile video autoplay
 * with debugging information to help identify issues
 */
export default function DebugVideoHero() {
  // Debug state
  const [debug, setDebug] = useState({
    videoExists: false,
    autoplayAttempted: false,
    playAttempted: false,
    playSucceeded: false,
    playFailed: false,
    errorMessage: '',
    videoReady: false,
    videoPlaying: false
  });

  // Video reference
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // State for UI
  const [videoReady, setVideoReady] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Set up video on mount
  useEffect(() => {
    const video = videoRef.current;
    
    // Update debug state
    setDebug(prev => ({ ...prev, videoExists: !!video }));
    
    if (!video) return;
    
    // Event handlers
    const handleCanPlay = () => {
      console.log('Video can play');
      setVideoReady(true);
      setDebug(prev => ({ ...prev, videoReady: true }));
    };
    
    const handlePlaying = () => {
      console.log('Video is playing');
      setVideoReady(true);
      setHasError(false);
      setDebug(prev => ({ ...prev, videoPlaying: true }));
    };
    
    const handleError = (e: Event) => {
      console.error('Video error:', video.error);
      setHasError(true);
      setVideoReady(false);
      setDebug(prev => ({ 
        ...prev, 
        playFailed: true, 
        errorMessage: video.error ? `Code: ${video.error.code}, Message: ${video.error.message}` : 'Unknown error' 
      }));
    };
    
    // Add event listeners
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('playing', handlePlaying);
    video.addEventListener('error', handleError);
    
    // Try to play the video after a delay
    setTimeout(() => {
      setDebug(prev => ({ ...prev, autoplayAttempted: true }));
      
      // Check if video is already playing (autoplay worked)
      if (!video.paused) {
        setVideoReady(true);
        setHasError(false);
        setDebug(prev => ({ ...prev, playSucceeded: true }));
        return;
      }
      
      // Try to play programmatically
      try {
        setDebug(prev => ({ ...prev, playAttempted: true }));
        
        video.play()
          .then(() => {
            setVideoReady(true);
            setHasError(false);
            setDebug(prev => ({ ...prev, playSucceeded: true }));
          })
          .catch(err => {
            console.error('Error playing video:', err);
            setHasError(true);
            setVideoReady(false);
            setDebug(prev => ({ 
              ...prev, 
              playFailed: true, 
              errorMessage: err.message || 'Unknown error' 
            }));
          });
      } catch (err: any) {
        console.error('Exception playing video:', err);
        setHasError(true);
        setVideoReady(false);
        setDebug(prev => ({ 
          ...prev, 
          playFailed: true, 
          errorMessage: err.message || 'Unknown error' 
        }));
      }
    }, 1000);
    
    // Cleanup
    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('playing', handlePlaying);
      video.removeEventListener('error', handleError);
    };
  }, []);
  
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Debug overlay - always visible */}
      <div className="absolute top-0 left-0 z-50 bg-black/70 text-white p-4 text-xs max-w-[80%] overflow-auto">
        <h3 className="font-bold mb-1">Video Debug:</h3>
        <ul>
          <li>Video Element: {debug.videoExists ? '✅' : '❌'}</li>
          <li>Autoplay Attempted: {debug.autoplayAttempted ? '✅' : '❌'}</li>
          <li>Play Attempted: {debug.playAttempted ? '✅' : '❌'}</li>
          <li>Play Succeeded: {debug.playSucceeded ? '✅' : '❌'}</li>
          <li>Play Failed: {debug.playFailed ? '✅' : '❌'}</li>
          <li>Video Ready: {debug.videoReady ? '✅' : '❌'}</li>
          <li>Video Playing: {debug.videoPlaying ? '✅' : '❌'}</li>
          {debug.errorMessage && <li>Error: {debug.errorMessage}</li>}
        </ul>
      </div>
      
      {/* Fallback image */}
      <div 
        className="absolute inset-0 z-10" 
        style={{ 
          opacity: videoReady && !hasError ? 0 : 1, 
          transition: 'opacity 0.5s ease-in-out' 
        }}
      >
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
      
      {/* Video element */}
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
            transform: 'translateZ(0)',
            willChange: 'transform, opacity',
          }}
        >
          <source src="/images/home/hero/mobile-video/heromobilevid.webm" type="video/webm" />
          <source src="/images/home/hero/mobile-video/heromobilevid.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}
