/**
 * Memory Cleanup Script
 * 
 * This script helps clean up memory and resources when the page is idle
 * to prevent memory leaks and improve overall performance.
 */

(function() {
  // Configuration
  const config = {
    // How often to check for idle state (in milliseconds)
    idleCheckInterval: 10000,
    
    // How long the user needs to be idle before cleanup (in milliseconds)
    idleThreshold: 30000,
    
    // Maximum number of images to keep in memory
    maxImageCache: 50,
    
    // Debug mode
    debug: false
  };
  
  // State
  let lastActivityTime = Date.now();
  let isCleanupRunning = false;
  let idleCheckTimer = null;
  
  // Log function that only works in debug mode
  const log = (message) => {
    if (config.debug) {
      console.log(`[Memory Cleanup] ${message}`);
    }
  };
  
  // Track user activity
  const trackActivity = () => {
    lastActivityTime = Date.now();
  };
  
  // Check if the user is idle
  const isIdle = () => {
    return Date.now() - lastActivityTime > config.idleThreshold;
  };
  
  // Clean up memory
  const cleanupMemory = () => {
    if (isCleanupRunning) return;
    isCleanupRunning = true;
    
    log('Starting memory cleanup');
    
    try {
      // Clean up image caches
      cleanupImageCaches();
      
      // Clean up mutation observers
      cleanupMutationObservers();
      
      // Run garbage collection if available
      runGarbageCollection();
      
      log('Memory cleanup complete');
    } catch (error) {
      log(`Error during cleanup: ${error.message}`);
    } finally {
      isCleanupRunning = false;
    }
  };
  
  // Clean up image caches
  const cleanupImageCaches = () => {
    // Clean up global image cache if it exists
    if (window._imageCache && window._imageCache instanceof Set) {
      log(`Image cache before cleanup: ${window._imageCache.size} items`);
      
      // Keep only the most recent images up to the maximum
      if (window._imageCache.size > config.maxImageCache) {
        const imagesToKeep = Array.from(window._imageCache).slice(-config.maxImageCache);
        window._imageCache.clear();
        imagesToKeep.forEach(img => window._imageCache.add(img));
      }
      
      log(`Image cache after cleanup: ${window._imageCache.size} items`);
    }
  };
  
  // Clean up mutation observers
  const cleanupMutationObservers = () => {
    // Nothing to do here - observers are managed by their respective scripts
  };
  
  // Run garbage collection if available
  const runGarbageCollection = () => {
    if (window.gc) {
      log('Running garbage collection');
      window.gc();
    }
  };
  
  // Start idle check timer
  const startIdleCheck = () => {
    // Clear any existing timer
    if (idleCheckTimer) {
      clearInterval(idleCheckTimer);
    }
    
    // Start a new timer
    idleCheckTimer = setInterval(() => {
      if (isIdle()) {
        log('User is idle, running cleanup');
        cleanupMemory();
      }
    }, config.idleCheckInterval);
  };
  
  // Initialize
  const init = () => {
    log('Initializing memory cleanup');
    
    // Track user activity
    ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'].forEach(eventType => {
      window.addEventListener(eventType, trackActivity, { passive: true });
    });
    
    // Start idle check
    startIdleCheck();
    
    // Clean up when the page is hidden
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        log('Page hidden, running cleanup');
        cleanupMemory();
      }
    });
    
    // Clean up before unload
    window.addEventListener('beforeunload', () => {
      log('Page unloading, running cleanup');
      cleanupMemory();
    });
  };
  
  // Initialize when the DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
