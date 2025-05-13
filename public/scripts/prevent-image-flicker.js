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
    
    // Track all images to prevent them from being garbage collected
    const imageCache = new Set();
    
    // Process all images on the page
    function processImages() {
      document.querySelectorAll('img').forEach(img => {
        // Skip already processed images
        if (img.hasAttribute('data-flicker-fixed')) {
          return;
        }
        
        // Mark as processed
        img.setAttribute('data-flicker-fixed', 'true');
        
        // Add to cache to prevent garbage collection
        imageCache.add(img);
        
        // Set decoding to sync to prevent flickering
        img.decoding = 'sync';
        
        // Ensure image has proper loading attribute
        if (!img.hasAttribute('loading')) {
          // Only set lazy loading for images below the fold
          const rect = img.getBoundingClientRect();
          if (rect.top > window.innerHeight) {
            img.loading = 'lazy';
          } else {
            img.loading = 'eager';
          }
        }
        
        // Add error handling
        if (!img.hasAttribute('onerror')) {
          img.onerror = function() {
            // Retry loading once
            const src = this.src;
            this.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
            setTimeout(() => {
              if (this) this.src = src;
            }, 500);
          };
        }
      });
    }
    
    // Process images initially
    processImages();
    
    // Process new images when they're added to the DOM
    const observer = new MutationObserver(mutations => {
      let hasNewImages = false;
      
      mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(node => {
            if (node.nodeName === 'IMG') {
              hasNewImages = true;
            } else if (node.querySelectorAll) {
              const images = node.querySelectorAll('img');
              if (images.length > 0) {
                hasNewImages = true;
              }
            }
          });
        }
      });
      
      if (hasNewImages) {
        processImages();
      }
    });
    
    // Observe the entire document for new images
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    // Prevent scroll events from causing image flickering
    let scrollTimeout;
    window.addEventListener('scroll', function() {
      // Add a class to the body during scroll
      document.body.classList.add('is-scrolling');
      
      // Remove the class after scrolling stops
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(function() {
        document.body.classList.remove('is-scrolling');
      }, 100);
    }, { passive: true });
    
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
