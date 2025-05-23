/**
 * Video Utilities Module
 *
 * Utilities for handling video-related functionality.
 * This module provides functions for video loading, optimization, and playback.
 */

/**
 * Interface for video specifications
 */
export interface VideoSpecs {
  /**
   * The width of the video in pixels
   */
  width: number;

  /**
   * The height of the video in pixels
   */
  height: number;

  /**
   * The frame rate of the video in frames per second
   */
  fps: number;

  /**
   * The aspect ratio of the video (width / height)
   */
  aspectRatio: number;
}

/**
 * Hero mobile video specifications
 */
export const HERO_MOBILE_VIDEO_SPECS: VideoSpecs = {
  width: 1080,
  height: 1920,
  fps: 30,
  aspectRatio: 9 / 16 // Portrait orientation (1080 / 1920)
};

/**
 * Checks if a video element has loaded successfully
 *
 * @param videoElement - The video element to check
 * @returns True if the video has loaded successfully
 */
export const hasVideoLoaded = (videoElement: HTMLVideoElement | null): boolean => {
  if (!videoElement) return false;

  // Check if the video has loaded metadata
  return videoElement.readyState >= 2;
};

/**
 * Plays a video with error handling
 *
 * @param videoElement - The video element to play
 * @returns A promise that resolves when the video starts playing
 */
export const playVideoSafely = async (videoElement: HTMLVideoElement | null): Promise<void> => {
  if (!videoElement) return;

  try {
    // Set video properties
    videoElement.muted = true;
    videoElement.playsInline = true;
    videoElement.loop = true;

    // Play the video
    await videoElement.play();
  } catch (error) {
    console.error('Error playing video:', error);
  }
};

/**
 * Optimizes a video element for mobile playback
 *
 * @param videoElement - The video element to optimize
 */
export const optimizeVideoForMobile = (videoElement: HTMLVideoElement | null): void => {
  if (!videoElement) return;

  // Set video properties for optimal mobile playback
  videoElement.muted = true;
  videoElement.playsInline = true;
  videoElement.autoplay = true;
  videoElement.loop = true;
  videoElement.preload = 'auto';

  // Add mobile-specific attributes
  videoElement.setAttribute('playsinline', 'true');
  videoElement.setAttribute('muted', 'true');

  // Set video style for better performance
  videoElement.style.objectFit = 'cover';
  videoElement.style.width = '100%';
  videoElement.style.height = '100%';
};

/**
 * Interface for video source
 */
export interface VideoSource {
  /**
   * The URL of the video source
   */
  src: string;

  /**
   * The MIME type of the video source
   */
  type: string;
}

/**
 * Preloads video sources to improve loading performance
 *
 * @param {VideoSource[]} sources - Array of video sources to preload
 */
export const preloadVideoSources = (sources: VideoSource[]): void => {
  // Skip if running on the server
  if (typeof window === 'undefined') return;

  // Create a hidden video element for preloading
  const video = document.createElement('video');
  video.style.display = 'none';
  video.muted = true;
  video.preload = 'auto';

  // Add source elements
  sources.forEach(({ src, type }) => {
    const source = document.createElement('source');
    source.src = src;
    source.type = type;
    video.appendChild(source);
  });

  // Add to document to start preloading
  document.body.appendChild(video);

  // Remove after a short delay
  setTimeout(() => {
    document.body.removeChild(video);
  }, 3000);
};

/**
 * Adds cache-busting parameters to video sources
 *
 * @param {HTMLVideoElement} video - The video element to update
 */
export const addCacheBustingToVideoSources = (video: HTMLVideoElement | null): void => {
  if (!video) return;

  const timestamp = Date.now();
  const sources = video.querySelectorAll('source');

  sources.forEach(source => {
    const url = new URL(source.src, window.location.origin);
    url.searchParams.set('v', timestamp.toString());
    source.src = url.toString();
  });
};

/**
 * Safely logs video error information without throwing exceptions
 *
 * @param {HTMLVideoElement} video - The video element with the error
 */
export const logVideoError = (video: HTMLVideoElement | null): void => {
  if (!video) return;

  console.error('Video error occurred');

  try {
    if (video.error) {
      console.error('Video error code:', video.error.code);
      console.error('Video error message:', video.error.message);

      // Map error codes to human-readable messages
      const errorMessages = {
        1: 'MEDIA_ERR_ABORTED - The user aborted the video playback',
        2: 'MEDIA_ERR_NETWORK - A network error caused the video download to fail',
        3: 'MEDIA_ERR_DECODE - The video playback was aborted due to a corruption problem',
        4: 'MEDIA_ERR_SRC_NOT_SUPPORTED - The video format is not supported'
      };

      const errorCode = video.error.code;
      if (errorCode >= 1 && errorCode <= 4) {
        console.error('Error explanation:', errorMessages[errorCode as 1|2|3|4]);
      }
    }
  } catch (err) {
    console.error('Error while logging video error details');
  }
};
