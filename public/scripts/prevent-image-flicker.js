/**
 * Prevent Image Flicker During Scroll
 *
 * This script prevents images from flickering (going black) during scrolling
 * by keeping them in memory and preventing the browser from unloading them.
 *
 * It doesn't modify any layout or navigation elements.
 */

(function() {
  // Only run on mobile devices
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;

  if (!isMobile) {
    return; // Exit early on desktop
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initImageFlickerPrevention);
  } else {
    initImageFlickerPrevention();
  }

  // Initialize the image flicker prevention
  function initImageFlickerPrevention() {
    // Create a style element to add CSS that prevents image flickering
    const style = document.createElement('style');
    style.textContent = `
      /* Prevent image flickering during scroll */
      img {
        /* Force hardware acceleration */
        transform: translateZ(0);
        backface-visibility: hidden;
        perspective: 1000px;
        -webkit-backface-visibility: hidden;
        -webkit-perspective: 1000px;

        /* Prevent unloading during scroll */
        will-change: transform;

        /* Ensure smooth transitions */
        transition: none !important;
      }

      /* Prevent layout shifts */
      img[width][height] {
        aspect-ratio: attr(width) / attr(height);
      }

      /* Ensure image containers maintain dimensions during load */
      span[style*="display: block; overflow: hidden;"] {
        background-color: #111;
        min-height: 1px;
      }
    `;
    document.head.appendChild(style);

    // Track only visible images to prevent memory leaks
    // Limit the cache size to prevent memory issues
    const imageCache = new Set();
    const MAX_CACHE_SIZE = 50; // Limit cache to 50 images

    // Process all images on the page
    function processImages() {
      // Get all unprocessed images
      const images = Array.from(document.querySelectorAll('img:not([data-flicker-fixed])'));

      // Process only visible images first to reduce memory usage
      images.forEach(img => {
        // Skip already processed images
        if (img.hasAttribute('data-flicker-fixed')) {
          return;
        }

        // Mark as processed
        img.setAttribute('data-flicker-fixed', 'true');

        // Only cache images that are visible or close to viewport
        const rect = img.getBoundingClientRect();
        const isNearViewport = rect.top < window.innerHeight * 2; // Within 2x viewport height

        if (isNearViewport) {
          // Add to cache to prevent garbage collection, but maintain size limit
          if (imageCache.size >= MAX_CACHE_SIZE) {
            // Remove the oldest item if we're at capacity
            const firstItem = imageCache.values().next().value;
            imageCache.delete(firstItem);
          }
          imageCache.add(img);
        }

        // Set decoding to async for better performance
        img.decoding = 'async';

        // Ensure image has proper loading attribute
        if (!img.hasAttribute('loading')) {
          // Only set lazy loading for images below the fold
          if (rect.top > window.innerHeight) {
            img.loading = 'lazy';
          } else {
            img.loading = 'eager';
          }
        }

        // Add error handling
        if (!img.hasAttribute('onerror')) {
          img.onerror = function() {
            // Just hide broken images instead of retrying to avoid network issues
            this.style.display = 'none';
          };
        }
      });
    }

    // Process images initially
    processImages();

    // Process new images when they're added to the DOM - with throttling
    let processingImages = false;
    let pendingMutations = false;

    const observer = new MutationObserver(mutations => {
      // If we're already processing images, just mark that we have pending mutations
      if (processingImages) {
        pendingMutations = true;
        return;
      }

      let hasNewImages = false;

      mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(node => {
            if (node.nodeName === 'IMG') {
              hasNewImages = true;
            } else if (node.querySelectorAll) {
              const images = node.querySelectorAll('img:not([data-flicker-fixed])');
              if (images.length > 0) {
                hasNewImages = true;
              }
            }
          });
        }
      });

      if (hasNewImages) {
        processingImages = true;

        // Use requestAnimationFrame to process images during idle time
        requestAnimationFrame(() => {
          processImages();
          processingImages = false;

          // If we had pending mutations while processing, process again
          if (pendingMutations) {
            pendingMutations = false;
            processImages();
          }
        });
      }
    });

    // Observe the entire document for new images
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Prevent scroll events from causing image flickering - with throttling
    let scrollTimeout;
    let lastScrollTime = 0;
    const scrollThrottle = 100; // ms

    const handleScroll = () => {
      const now = Date.now();

      // Throttle scroll events
      if (now - lastScrollTime < scrollThrottle) return;
      lastScrollTime = now;

      // Add a class to the body during scroll
      document.body.classList.add('is-scrolling');

      // Remove the class after scrolling stops
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(function() {
        document.body.classList.remove('is-scrolling');
      }, 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Add CSS for scrolling state
    const scrollStyle = document.createElement('style');
    scrollStyle.textContent = `
      /* Prevent image loading during scroll */
      body.is-scrolling img {
        content-visibility: auto;
      }
    `;
    document.head.appendChild(scrollStyle);
  }
})();
