/**
 * Utility for preloading videos
 */

/**
 * Preloads a video file by adding a link element to the document head
 * @param videoSrc The source URL of the video to preload
 * @param videoType The MIME type of the video (e.g., 'video/mp4', 'video/webm')
 */
export const preloadVideoWithLink = (videoSrc: string, videoType: string = 'video/mp4'): void => {
  // Check if we're in the browser
  if (typeof document === 'undefined') return;

  // Create a link element for preloading
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = videoSrc;
  link.as = 'video';
  link.type = videoType;

  // Add to document head
  document.head.appendChild(link);
};

/**
 * Preloads a video file by creating a video element and loading it
 * @param videoSrc The source URL of the video to preload
 * @returns A promise that resolves when the video is loaded
 */
export const preloadVideoWithElement = (videoSrc: string): Promise<void> => {
  return new Promise((resolve) => {
    // Check if we're in the browser
    if (typeof document === 'undefined') {
      resolve();
      return;
    }

    // Create a video element
    const video = document.createElement('video');
    
    // Set up event listeners
    video.addEventListener('canplaythrough', () => {
      // Video is loaded
      if (document.body.contains(video)) {
        document.body.removeChild(video);
      }
      resolve();
    }, { once: true });
    
    // Set up error handler
    video.addEventListener('error', () => {
      // Error loading video
      if (document.body.contains(video)) {
        document.body.removeChild(video);
      }
      resolve(); // Resolve anyway to not block the chain
    }, { once: true });
    
    // Configure video element
    video.style.display = 'none';
    video.muted = true;
    video.preload = 'auto';
    video.src = videoSrc;
    
    // Add to DOM to start loading
    document.body.appendChild(video);
    
    // Set a timeout to remove the element if it takes too long
    setTimeout(() => {
      if (document.body.contains(video)) {
        document.body.removeChild(video);
        resolve();
      }
    }, 5000);
  });
};

/**
 * Preloads multiple video formats for the same content
 * @param sources Array of video sources with src and type
 */
export const preloadVideoSources = (sources: Array<{src: string, type: string}>): void => {
  // Check if we're in the browser
  if (typeof document === 'undefined') return;
  
  sources.forEach(source => {
    preloadVideoWithLink(source.src, source.type);
  });
};

/**
 * Adds video preload hints to the document head
 * This should be called as early as possible, ideally in a layout component
 */
export const addVideoPreloadHints = (): void => {
  // Check if we're in the browser and if we're on mobile
  if (typeof window === 'undefined') return;
  if (window.innerWidth >= 768) return; // Only for mobile
  
  // Preload the mobile hero video
  preloadVideoSources([
    { src: '/images/home/hero/mobile-video/heromobilevid.webm', type: 'video/webm' },
    { src: '/images/home/hero/mobile-video/heromobilevid.mp4', type: 'video/mp4' }
  ]);
};
