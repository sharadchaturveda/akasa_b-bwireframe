/**
 * Mobile Video Helper Utilities
 *
 * This file contains utility functions to help with mobile video playback issues.
 */

/**
 * Creates a URL with a cache-busting parameter
 * @param url The original URL
 * @returns The URL with a cache-busting parameter
 */
export const createNoCacheUrl = (url: string): string => {
  const timestamp = Date.now();
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}v=${timestamp}`;
};

/**
 * Prepares a video element for mobile autoplay
 * @param videoElement The video element to prepare
 */
export const prepareVideoForMobile = (videoElement: HTMLVideoElement | null): void => {
  if (!videoElement) return;

  // Set required attributes for mobile autoplay
  videoElement.muted = true;
  videoElement.playsInline = true;
  videoElement.autoplay = true;
  videoElement.loop = true;
  videoElement.preload = 'auto';

  // Set attributes for iOS
  videoElement.setAttribute('playsinline', '');
  videoElement.setAttribute('webkit-playsinline', '');
  videoElement.setAttribute('muted', '');

  // Force load the video
  videoElement.load();
};

/**
 * Attempts to play a video with retries
 * @param videoElement The video element to play
 * @param onSuccess Callback for successful play
 * @param onError Callback for failed play after all retries
 * @param maxRetries Maximum number of retry attempts
 * @param retryDelay Delay between retries in milliseconds
 * @returns A cleanup function to cancel any pending retries
 */
export const playVideoWithRetries = (
  videoElement: HTMLVideoElement | null,
  onSuccess: () => void,
  onError: () => void,
  maxRetries = 3,
  retryDelay = 1000
): (() => void) => {
  if (!videoElement) return () => {};

  let retryCount = 0;
  let timeoutId: NodeJS.Timeout | null = null;

  const attemptPlay = async () => {
    if (!videoElement) return;

    try {
      await videoElement.play();
      onSuccess();
    } catch (error) {

      if (retryCount < maxRetries) {
        retryCount++;
        timeoutId = setTimeout(attemptPlay, retryDelay);
      } else {
        onError();
      }
    }
  };

  // Start the first attempt
  timeoutId = setTimeout(attemptPlay, 100);

  // Return cleanup function
  return () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  };
};

/**
 * Checks if the device is iOS
 * @returns True if the device is iOS, false otherwise
 */
export const isIOS = (): boolean => {
  if (typeof navigator === 'undefined') return false;

  return /iPad|iPhone|iPod/.test(navigator.userAgent) &&
         !(window as any).MSStream;
};

/**
 * Checks if the browser is Safari
 * @returns True if the browser is Safari, false otherwise
 */
export const isSafari = (): boolean => {
  if (typeof navigator === 'undefined') return false;

  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
};
