/**
 * Video Utilities Module
 * 
 * Utilities for handling video-related functionality.
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
  videoElement.setAttribute('playsinline', '');
  videoElement.setAttribute('webkit-playsinline', '');
  
  // Set video style for better performance
  videoElement.style.objectFit = 'cover';
  videoElement.style.width = '100%';
  videoElement.style.height = '100%';
};
