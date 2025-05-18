"use client";

import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Options for the useVideoPlayer hook
 */
export interface VideoPlayerOptions {
  /**
   * The video source URL
   */
  src: string;

  /**
   * The poster image URL to show before the video loads
   */
  posterSrc?: string;

  /**
   * Whether the video should autoplay
   * @default true
   */
  autoplay?: boolean;

  /**
   * Whether the video should loop
   * @default true
   */
  loop?: boolean;

  /**
   * Whether the video should be muted
   * @default true
   */
  muted?: boolean;

  /**
   * Whether to use playsinline attribute (required for iOS)
   * @default true
   */
  playsInline?: boolean;

  /**
   * Whether to add cache-busting to the video URL
   * @default false
   */
  preventCaching?: boolean;

  /**
   * Callback when the video starts playing
   */
  onPlay?: () => void;

  /**
   * Callback when the video is paused
   */
  onPause?: () => void;

  /**
   * Callback when the video ends
   */
  onEnded?: () => void;

  /**
   * Callback when the video fails to load
   */
  onError?: (error: Error) => void;
}

/**
 * Return value from the useVideoPlayer hook
 */
export interface VideoPlayerResult {
  /**
   * Reference to the video element
   */
  videoRef: React.RefObject<HTMLVideoElement | null>;

  /**
   * Whether the video is currently playing
   */
  isPlaying: boolean;

  /**
   * Whether the video is currently muted
   */
  isMuted: boolean;

  /**
   * Whether the video is ready to play
   */
  isReady: boolean;

  /**
   * Whether the video has failed to load
   */
  hasError: boolean;

  /**
   * Function to play the video
   */
  play: () => Promise<void>;

  /**
   * Function to pause the video
   */
  pause: () => void;

  /**
   * Function to toggle play/pause
   */
  togglePlay: () => void;

  /**
   * Function to toggle mute/unmute
   */
  toggleMute: () => void;

  /**
   * Function to mute the video
   */
  mute: () => void;

  /**
   * Function to unmute the video
   */
  unmute: () => void;
}

/**
 * Custom hook for video player functionality
 *
 * This hook provides a standardized way to handle video playback,
 * including play/pause, mute/unmute, and loading states.
 *
 * @param {VideoPlayerOptions} options - Options for the video player
 * @returns {VideoPlayerResult} Video player state and controls
 */
export function useVideoPlayer({
  src,
  posterSrc,
  autoplay = true,
  loop = true,
  muted = true,
  playsInline = true,
  preventCaching = false,
  onPlay,
  onPause,
  onEnded,
  onError
}: VideoPlayerOptions): VideoPlayerResult {
  // Create a ref for the video element
  const videoRef = useRef<HTMLVideoElement>(null);

  // State for video player
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(muted);
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Generate a unique URL to bypass caching if needed
  const videoSrc = preventCaching
    ? `${src}?nocache=${Date.now()}-${Math.random()}`
    : src;

  // Function to play the video
  const play = useCallback(async () => {
    if (!videoRef.current) return;

    try {
      await videoRef.current.play();
      setIsPlaying(true);
      onPlay?.();
    } catch (error) {
      console.error('Error playing video:', error);
      setHasError(true);
      onError?.(error as Error);
    }
  }, [onPlay, onError]);

  // Function to pause the video
  const pause = useCallback(() => {
    if (!videoRef.current) return;

    videoRef.current.pause();
    setIsPlaying(false);
    onPause?.();
  }, [onPause]);

  // Function to toggle play/pause
  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  // Function to mute the video
  const mute = useCallback(() => {
    if (!videoRef.current) return;

    videoRef.current.muted = true;
    setIsMuted(true);
  }, []);

  // Function to unmute the video
  const unmute = useCallback(() => {
    if (!videoRef.current) return;

    videoRef.current.muted = false;
    setIsMuted(false);
  }, []);

  // Function to toggle mute/unmute
  const toggleMute = useCallback(() => {
    if (isMuted) {
      unmute();
    } else {
      mute();
    }
  }, [isMuted, mute, unmute]);

  // Set up the video element when the component mounts
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Reset state
    setIsReady(false);
    setHasError(false);

    // Set video attributes
    video.muted = muted;
    video.loop = loop;
    video.playsInline = playsInline;
    video.autoplay = autoplay;

    // Set attributes for iOS
    if (playsInline) {
      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', '');
    }

    // Event handlers
    const handleCanPlay = () => {
      setIsReady(true);
      if (autoplay) {
        play();
      }
    };

    const handlePlay = () => {
      setIsPlaying(true);
      onPlay?.();
    };

    const handlePause = () => {
      setIsPlaying(false);
      onPause?.();
    };

    const handleEnded = () => {
      setIsPlaying(false);
      onEnded?.();
    };

    const handleError = (e: Event) => {
      // Log error in development mode
      if (process.env.NODE_ENV === 'development') {
        console.error('Video error occurred');
        if (video.error) {
          console.error('Video error code:', video.error.code);
          console.error('Video error message:', video.error.message);
        }
      }

      // Set error state
      setHasError(true);

      // Try to recover by reloading the video with a different source
      try {
        if (video.childElementCount > 0) {
          // If we have source elements, try to switch to MP4 if WebM failed
          const sources = video.querySelectorAll('source');
          const timestamp = Date.now();

          sources.forEach(source => {
            // Add cache busting
            if (source.src.includes('webm')) {
              source.src = `/images/home/hero/mobile-video/heromobilevid.webm?v=${timestamp}`;
            } else if (source.src.includes('mp4')) {
              source.src = `/images/home/hero/mobile-video/heromobilevid.mp4?v=${timestamp}`;
            }
          });

          // Force reload
          video.load();

          // Try to play again after a short delay
          setTimeout(() => {
            video.play().catch(err => {
              if (process.env.NODE_ENV === 'development') {
                console.error('Recovery play error:', err);
              }
            });
          }, 500);
        }
      } catch (err) {
        // Silent catch for recovery attempts
        if (process.env.NODE_ENV === 'development') {
          console.error('Recovery error:', err);
        }
      }

      // Call error callback
      onError?.(new Error('Video playback error'));
    };

    // Add event listeners
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);

    // Clean up
    return () => {
      // Remove event listeners
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);

      try {
        // Pause the video
        video.pause();

        // Handle cleanup differently based on whether we have source elements
        if (video.childElementCount > 0) {
          // If we have source elements, remove them
          while (video.firstChild) {
            video.removeChild(video.firstChild);
          }
        } else {
          // Otherwise, clear the src attribute
          video.src = '';
        }

        // Force reload
        video.load();
      } catch (err) {
        // Silent catch for cleanup errors
      }
    };
  }, [src, autoplay, loop, muted, playsInline, play, onPlay, onPause, onEnded, onError]);

  return {
    videoRef,
    isPlaying,
    isMuted,
    isReady,
    hasError,
    play,
    pause,
    togglePlay,
    toggleMute,
    mute,
    unmute
  };
}

export default useVideoPlayer;
