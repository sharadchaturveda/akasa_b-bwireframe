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
  videoRef: React.RefObject<HTMLVideoElement>;

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

  // We'll set the video source in the useEffect

  // Function to play the video
  const play = useCallback(async () => {
    if (!videoRef.current) return;

    try {
      await videoRef.current.play();
      setIsPlaying(true);
      onPlay?.();
    } catch (error) {
      // Only log detailed error in development
      if (process.env.NODE_ENV === 'development') {
        console.error('Error playing video:', {
          name: (error as Error)?.name,
          message: (error as Error)?.message,
          error
        });
      }

      setHasError(true);

      // Create a more informative error
      const errorMessage = (error as Error)?.message || 'Unknown error';
      onError?.(new Error(`Failed to play video: ${errorMessage}`));
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

    // Set the video source
    if (preventCaching) {
      // Add cache-busting parameters
      const timestamp = Date.now();
      const random = Math.floor(Math.random() * 1000000);
      video.src = `${src}?t=${timestamp}&r=${random}`;
    } else {
      video.src = src;
    }

    // Set poster if provided
    if (posterSrc) {
      video.poster = posterSrc;
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
      // Get more detailed error information if available
      const videoElement = e.target as HTMLVideoElement;
      const errorCode = videoElement?.error?.code;
      const errorMessage = videoElement?.error?.message;

      // Only log detailed error in development
      if (process.env.NODE_ENV === 'development') {
        console.error('Video error:', {
          code: errorCode,
          message: errorMessage || 'Unknown error',
          event: e
        });
      }

      setHasError(true);
      onError?.(new Error(`Video playback error: ${errorMessage || 'Unknown error'}`));
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
        // Properly clean up video element
        video.pause();

        // Remove all sources
        while (video.firstChild) {
          video.removeChild(video.firstChild);
        }

        // Clear the src attribute and load to reset the video element
        video.src = '';
        video.removeAttribute('src');
        video.load();
      } catch (err) {
        // Silently handle any cleanup errors
        if (process.env.NODE_ENV === 'development') {
          console.warn('Error during video cleanup:', err);
        }
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
