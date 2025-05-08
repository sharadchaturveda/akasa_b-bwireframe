/**
 * Utility functions for video loading and optimization
 */

/**
 * Preloads a video file to ensure it's in the browser cache
 * @param videoSrc The source URL of the video
 * @returns A promise that resolves when the video is preloaded
 */
export const preloadVideo = (videoSrc: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Create a new video element
    const video = document.createElement('video');

    // Add event listeners
    video.addEventListener('canplaythrough', () => {
      // Video is preloaded
      resolve();
    });

    video.addEventListener('error', (error) => {
      // Error loading video
      reject(error);
    });

    // Set video properties
    video.preload = 'auto';
    video.muted = true;
    video.playsInline = true;
    video.autoplay = false;
    video.style.display = 'none';
    video.src = videoSrc;

    // Start loading
    video.load();

    // Add to DOM temporarily to ensure loading
    document.body.appendChild(video);

    // Remove after 10 seconds regardless of loading status
    setTimeout(() => {
      if (document.body.contains(video)) {
        document.body.removeChild(video);
      }
    }, 10000);
  });
};

/**
 * Creates a unique URL for a video to bypass caching
 * @param videoSrc The source URL of the video
 * @returns A unique URL with cache-busting parameters
 */
export const createUniqueVideoUrl = (videoSrc: string): string => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000000);

  // Add cache-busting parameters
  if (videoSrc.includes('?')) {
    return `${videoSrc}&t=${timestamp}&r=${random}`;
  } else {
    return `${videoSrc}?t=${timestamp}&r=${random}`;
  }
};

/**
 * Optimizes a video element for mobile playback
 * @param videoElement The video element to optimize
 */
export const optimizeVideoForMobile = (videoElement: HTMLVideoElement): void => {
  if (!videoElement) return;

  // Set video properties
  videoElement.muted = true;
  videoElement.playsInline = true;
  videoElement.autoplay = true;
  videoElement.loop = true;
  videoElement.controls = false;
  videoElement.preload = 'auto';

  // Set attributes for mobile
  videoElement.setAttribute('playsinline', '');
  videoElement.setAttribute('webkit-playsinline', '');

  // Set style properties for proper display
  videoElement.style.objectFit = 'cover';
  videoElement.style.objectPosition = 'center';
  videoElement.style.width = '100%';
  videoElement.style.height = '100%';
  videoElement.style.maxWidth = 'none';
  videoElement.style.minWidth = '100%';
  videoElement.style.minHeight = '100%';

  // Disable picture-in-picture and remote playback
  videoElement.disablePictureInPicture = true;

  // Add attributes to disable controls
  videoElement.setAttribute('disableRemotePlayback', '');
  videoElement.setAttribute('controlsList', 'nodownload nofullscreen noremoteplayback');
};

/**
 * Attempts to play a video with multiple retries
 * @param videoElement The video element to play
 * @param maxAttempts Maximum number of retry attempts
 * @returns A promise that resolves when the video plays successfully
 */
export const playVideoWithRetry = async (
  videoElement: HTMLVideoElement,
  maxAttempts: number = 3
): Promise<void> => {
  let attempts = 0;

  const attemptPlay = async (): Promise<void> => {
    attempts++;

    try {
      // Ensure video is properly configured
      optimizeVideoForMobile(videoElement);

      // Attempt to play
      await videoElement.play();
      return;
    } catch (error) {
      if (attempts < maxAttempts) {
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, 1000));
        return attemptPlay();
      } else {
        throw new Error(`Failed to play video after ${maxAttempts} attempts`);
      }
    }
  };

  return attemptPlay();
};
