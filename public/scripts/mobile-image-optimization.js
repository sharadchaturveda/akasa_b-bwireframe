/**
 * Mobile Image Optimization Script
 * 
 * This script loads mobile-specific CSS optimizations for image loading
 * only on mobile devices. It helps prevent the blank spaces and reloading
 * issues during scrolling.
 */

(function() {
  // Check if we're on a mobile device
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
  
  if (isMobile) {
    // Add mobile device class to html element
    document.documentElement.classList.add('mobile-device');
    
    // Load mobile-specific CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/mobile-image-optimization.css';
    document.head.appendChild(link);
    
    // Apply mobile-specific optimizations
    applyMobileOptimizations();
  }
  
  /**
   * Apply mobile-specific optimizations
   */
  function applyMobileOptimizations() {
    // Set viewport to prevent scaling issues
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
    }
    
    // Add passive event listeners for better performance
    try {
      const supportsPassive = false;
      const opts = Object.defineProperty({}, 'passive', {
        get: function() {
          supportsPassive = true;
          return true;
        }
      });
      
      window.addEventListener('test', null, opts);
      window.removeEventListener('test', null, opts);
      
      if (supportsPassive) {
        const wheelOpts = { passive: true };
        window.addEventListener('touchstart', function() {}, wheelOpts);
        window.addEventListener('touchmove', function() {}, wheelOpts);
        window.addEventListener('touchend', function() {}, wheelOpts);
      }
    } catch (e) {
      // Silent catch - passive isn't supported
    }
    
    // Optimize image loading
    document.addEventListener('DOMContentLoaded', function() {
      // Set appropriate attributes on all images
      document.querySelectorAll('img').forEach(function(img) {
        // Set decoding to async for all images
        if (!img.hasAttribute('decoding')) {
          img.setAttribute('decoding', 'async');
        }
        
        // Add loading=lazy for images below the fold
        if (!img.hasAttribute('loading') && !isPriority(img)) {
          img.setAttribute('loading', 'lazy');
        }
        
        // Add error handling
        if (!img.hasAttribute('onerror')) {
          img.onerror = function() {
            // Hide broken images
            this.style.display = 'none';
          };
        }
      });
    });
    
    /**
     * Check if an image is a priority image
     * 
     * @param {HTMLImageElement} img - The image element
     * @returns {boolean} Whether the image is a priority image
     */
    function isPriority(img) {
      // Check if the image has priority attribute or fetchpriority="high"
      if (img.hasAttribute('priority') || img.getAttribute('fetchpriority') === 'high') {
        return true;
      }
      
      // Check if the image is in the initial viewport with a small buffer
      const rect = img.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const buffer = 100; // Pixels to consider as "above the fold" buffer
      return rect.top < viewportHeight + buffer && rect.bottom > -buffer;
    }
  }
})();
