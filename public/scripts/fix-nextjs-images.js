/**
 * Fix Next.js Images
 *
 * This script specifically targets Next.js Image components to prevent them
 * from flickering (going black) during scrolling on mobile devices.
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
    document.addEventListener('DOMContentLoaded', fixNextJsImages);
  } else {
    fixNextJsImages();
  }

  // Fix Next.js images
  function fixNextJsImages() {
    // Find all Next.js image containers
    const nextJsImageContainers = document.querySelectorAll('span[style*="box-sizing: border-box; display: block; overflow: hidden"]');

    // Process each container
    nextJsImageContainers.forEach(container => {
      // Skip already processed containers
      if (container.hasAttribute('data-fixed')) {
        return;
      }

      // Mark as processed
      container.setAttribute('data-fixed', 'true');

      // Add styles to prevent flickering
      container.style.transform = 'translateZ(0)';
      container.style.backfaceVisibility = 'hidden';
      container.style.perspective = '1000px';
      container.style.willChange = 'transform';

      // Find the image inside the container
      const img = container.querySelector('img');
      if (img) {
        // Skip already processed images
        if (img.hasAttribute('data-fixed')) {
          return;
        }

        // Mark as processed
        img.setAttribute('data-fixed', 'true');

        // Add styles to prevent flickering
        img.style.transform = 'translateZ(0)';
        img.style.backfaceVisibility = 'hidden';
        img.style.perspective = '1000px';
        img.style.willChange = 'transform';

        // Set decoding to sync
        img.decoding = 'sync';

        // Prevent transitions
        img.style.transition = 'none';

        // Use a more efficient approach to prevent image unloading
        // Instead of caching all images, we'll just optimize the loading attributes
        img.decoding = 'async'; // async is better for performance than sync

        // Only set fetchpriority for images near the viewport
        const rect = img.getBoundingClientRect();
        if (rect.top < window.innerHeight * 1.5) {
          img.fetchPriority = 'high';
        }
      }
    });

    // Set up a mutation observer to process new images - with throttling
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
            if (node.nodeType === 1) { // Element node
              if (node.tagName === 'SPAN' &&
                  node.style &&
                  node.style.boxSizing === 'border-box' &&
                  node.style.display === 'block' &&
                  node.style.overflow === 'hidden' &&
                  !node.hasAttribute('data-fixed')) {
                hasNewImages = true;
              } else if (node.querySelectorAll) {
                const containers = node.querySelectorAll('span[style*="box-sizing: border-box; display: block; overflow: hidden"]:not([data-fixed])');
                if (containers.length > 0) {
                  hasNewImages = true;
                }
              }
            }
          });
        }
      });

      if (hasNewImages) {
        processingImages = true;

        // Use requestAnimationFrame to process images during idle time
        requestAnimationFrame(() => {
          fixNextJsImages();
          processingImages = false;

          // If we had pending mutations while processing, process again
          if (pendingMutations) {
            pendingMutations = false;
            fixNextJsImages();
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
  }
})();
