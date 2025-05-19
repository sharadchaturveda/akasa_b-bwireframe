/**
 * Consolidated Performance Optimizations
 *
 * This script combines the essential functionality from multiple optimization scripts
 * while eliminating conflicts and redundant operations.
 */

(function() {
  // Configuration
  const config = {
    // Debug mode (set to false in production)
    debug: false,

    // Device detection
    isMobile: window.innerWidth < 768,

    // Image optimization - exclude Next.js Image components to prevent hydration errors
    imageSelector: 'img:not([data-no-optimization]):not([data-nimg])',
    loadedAttribute: 'data-img-loaded',
    imageLoadTimeout: 10000,

    // Video optimization
    videoSelector: 'video',

    // Memory management
    maxImageCache: 50,
    idleThreshold: 30000,

    // Scroll optimization
    scrollThrottle: 100
  };

  // Logging function
  const log = (message) => {
    if (config.debug) {
      console.log(`[Performance] ${message}`);
    }
  };

  // ===== IMAGE OPTIMIZATION =====

  // Process images for better performance
  const optimizeImages = () => {
    const images = document.querySelectorAll(config.imageSelector);
    log(`Processing ${images.length} images`);

    images.forEach((img) => {
      // Skip already processed images
      if (img.hasAttribute('data-optimized')) {
        return;
      }

      // Mark as processed
      img.setAttribute('data-optimized', 'true');

      // Get position relative to viewport
      const rect = img.getBoundingClientRect();
      const isAboveFold = rect.top < window.innerHeight;

      // Set loading attribute based on position
      if (!img.hasAttribute('loading')) {
        img.loading = isAboveFold ? 'eager' : 'lazy';
      }

      // Set decoding to async for better performance
      if (!img.hasAttribute('decoding')) {
        img.decoding = 'async';
      }

      // Set fetchpriority based on position
      if (!img.hasAttribute('fetchpriority')) {
        img.fetchPriority = isAboveFold ? 'high' : 'low';
      }

      // Add loaded state handling
      if (!img.hasAttribute(config.loadedAttribute)) {
        if (img.complete) {
          img.setAttribute(config.loadedAttribute, 'true');
          img.style.opacity = '1';
        } else {
          // Set initial opacity if not already set
          if (!img.style.opacity) {
            img.style.opacity = '0.1';
          }

          // Add load event listener
          img.addEventListener('load', () => {
            img.setAttribute(config.loadedAttribute, 'true');
            img.style.opacity = '1';
          }, { once: true });

          // Add error event listener
          img.addEventListener('error', () => {
            img.style.display = 'none';
          }, { once: true });

          // Set a timeout for images that never load
          setTimeout(() => {
            if (!img.hasAttribute(config.loadedAttribute)) {
              img.setAttribute(config.loadedAttribute, 'true');
              img.style.opacity = '1';
            }
          }, config.imageLoadTimeout);
        }
      }
    });
  };

  // ===== VIDEO OPTIMIZATION =====

  // Optimize videos for better performance
  const optimizeVideos = () => {
    const videos = document.querySelectorAll(config.videoSelector);
    log(`Processing ${videos.length} videos`);

    videos.forEach((video) => {
      // Skip already processed videos
      if (video.hasAttribute('data-optimized')) {
        return;
      }

      // Mark as processed
      video.setAttribute('data-optimized', 'true');

      // Ensure proper attributes for mobile autoplay
      video.playsInline = true;
      video.setAttribute('playsinline', '');

      // Only apply these optimizations on mobile
      if (config.isMobile) {
        // Ensure video plays on mobile
        if (video.autoplay) {
          // Try to play the video
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              // If autoplay fails, try again when user interacts with the page
              const playVideoOnInteraction = () => {
                video.play();
                document.removeEventListener('touchstart', playVideoOnInteraction);
                document.removeEventListener('click', playVideoOnInteraction);
              };

              document.addEventListener('touchstart', playVideoOnInteraction, { once: true });
              document.addEventListener('click', playVideoOnInteraction, { once: true });
            });
          }
        }
      }
    });
  };

  // ===== SCROLL OPTIMIZATION =====

  // Optimize scroll performance
  const optimizeScroll = () => {
    // Disable smooth scrolling for better performance
    document.documentElement.style.scrollBehavior = 'auto';

    // Prevent overscroll effects
    document.body.style.overscrollBehavior = 'none';

    // Prevent horizontal overflow
    document.documentElement.style.overflowX = 'hidden';
    document.body.style.overflowX = 'hidden';

    // Throttle scroll events
    let lastScrollTime = 0;
    let scrollTimeout;

    const handleScroll = () => {
      const now = Date.now();

      // Throttle scroll events
      if (now - lastScrollTime < config.scrollThrottle) return;
      lastScrollTime = now;

      // Add a class to the body during scroll
      document.body.classList.add('is-scrolling');

      // Remove the class after scrolling stops
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        document.body.classList.remove('is-scrolling');

        // Re-optimize images that might have been added dynamically
        optimizeImages();
      }, 100);
    };

    // Add passive scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
  };

  // ===== MEMORY MANAGEMENT =====

  // Clean up memory when the page is idle
  const setupMemoryCleanup = () => {
    let lastActivityTime = Date.now();

    // Track user activity
    const trackActivity = () => {
      lastActivityTime = Date.now();
    };

    // Add event listeners for user activity
    ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'].forEach(eventType => {
      window.addEventListener(eventType, trackActivity, { passive: true });
    });

    // Check for idle state periodically
    setInterval(() => {
      const isIdle = Date.now() - lastActivityTime > config.idleThreshold;

      if (isIdle) {
        log('User is idle, running cleanup');

        // Run garbage collection if available
        if (window.gc) {
          window.gc();
        }
      }
    }, 10000);
  };

  // ===== INITIALIZATION =====

  // Initialize all optimizations
  const initialize = () => {
    log('Initializing performance optimizations');

    // Optimize images
    optimizeImages();

    // Optimize videos
    optimizeVideos();

    // Optimize scroll
    optimizeScroll();

    // Set up memory cleanup
    setupMemoryCleanup();

    // Set up mutation observer to process new elements
    const observer = new MutationObserver((mutations) => {
      let hasNewImages = false;
      let hasNewVideos = false;

      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) { // Element node
              if (node.tagName === 'IMG') {
                hasNewImages = true;
              } else if (node.tagName === 'VIDEO') {
                hasNewVideos = true;
              } else if (node.querySelectorAll) {
                const images = node.querySelectorAll('img');
                const videos = node.querySelectorAll('video');

                if (images.length > 0) {
                  hasNewImages = true;
                }

                if (videos.length > 0) {
                  hasNewVideos = true;
                }
              }
            }
          });
        }
      });

      if (hasNewImages) {
        optimizeImages();
      }

      if (hasNewVideos) {
        optimizeVideos();
      }
    });

    // Start observing the document
    observer.observe(document, {
      childList: true,
      subtree: true
    });
  };

  // Run initialization when the DOM is ready and after hydration is complete
  // Delay initialization to prevent hydration errors with Next.js
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      // Delay initialization to allow React hydration to complete
      setTimeout(initialize, 500);
    });
  } else {
    // Delay initialization to allow React hydration to complete
    setTimeout(initialize, 500);
  }
})();
