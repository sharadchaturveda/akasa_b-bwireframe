/**
 * Image Loaded Class Script
 *
 * This script adds a "loaded" class to images when they finish loading,
 * which helps with CSS transitions and prevents flickering.
 *
 * IMPORTANT: This script is designed to avoid React hydration errors by:
 * 1. Delaying execution until after hydration is complete
 * 2. Using data attributes instead of classes for tracking state
 * 3. Using inline styles instead of classes for visual effects
 */

(function() {
  // Configuration
  const config = {
    // Debug mode
    debug: false,

    // Selector for images to process
    imageSelector: 'img:not([data-no-loaded-class])',

    // Data attribute to use instead of class (to avoid hydration errors)
    loadedAttribute: 'data-img-loaded',

    // Timeout for images that never load (in milliseconds)
    loadTimeout: 10000,

    // Delay before starting to process images (to avoid hydration errors)
    initialDelay: 1000
  };

  // Log function that only works in debug mode
  const log = (message) => {
    if (config.debug) {
      console.log(`[Image Loaded Class] ${message}`);
    }
  };

  // Process all images on the page
  const processImages = () => {
    const images = document.querySelectorAll(config.imageSelector);
    log(`Processing ${images.length} images`);

    images.forEach(img => {
      // Skip already processed images
      if (img.hasAttribute(config.loadedAttribute)) {
        return;
      }

      // Apply initial styles using inline styles instead of classes
      if (!img.style.transition) {
        img.style.transition = 'opacity 0.3s ease-in-out';
      }

      // If the image is already loaded, mark it immediately
      if (img.complete) {
        img.setAttribute(config.loadedAttribute, 'true');
        img.style.opacity = '1';
        log(`Image already loaded: ${img.src}`);
      } else {
        // Set initial opacity if not already set
        if (!img.style.opacity) {
          img.style.opacity = '0.1';
        }

        // Set a timeout to mark the image even if it never loads
        const timeout = setTimeout(() => {
          if (!img.hasAttribute(config.loadedAttribute)) {
            img.setAttribute(config.loadedAttribute, 'true');
            img.style.opacity = '1';
            log(`Image load timeout: ${img.src}`);
          }
        }, config.loadTimeout);

        // Mark the image when it loads
        img.addEventListener('load', () => {
          clearTimeout(timeout);
          img.setAttribute(config.loadedAttribute, 'true');
          img.style.opacity = '1';
          log(`Image loaded: ${img.src}`);
        }, { once: true });

        // Mark the image even if it fails to load
        img.addEventListener('error', () => {
          clearTimeout(timeout);
          img.setAttribute(config.loadedAttribute, 'true');
          img.style.opacity = '1';
          log(`Image load error: ${img.src}`);
        }, { once: true });
      }
    });
  };

  // Function to initialize the script after a delay
  const initialize = () => {
    log('Initializing image loaded script');

    // Process images initially
    processImages();

    // Process new images when they're added to the DOM
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
              const images = node.querySelectorAll(config.imageSelector);
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

    // Clean up observer when page unloads
    window.addEventListener('beforeunload', () => {
      observer.disconnect();
    });
  };

  // Wait for React hydration to complete before initializing
  // This helps avoid hydration errors
  const startWithDelay = () => {
    log(`Delaying initialization for ${config.initialDelay}ms to avoid hydration errors`);
    setTimeout(initialize, config.initialDelay);
  };

  // Start the script when the DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startWithDelay);
  } else {
    startWithDelay();
  }
})();
