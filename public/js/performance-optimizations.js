/**
 * Performance optimizations script
 * This script helps reduce main thread work and improve Web Vitals
 */

// Execute when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // Optimize image loading
  optimizeImages();
  
  // Monitor performance
  monitorPerformance();
  
  // Optimize event handlers
  optimizeEventHandlers();
});

// Optimize image loading
function optimizeImages() {
  // Use Intersection Observer to lazy load images
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.getAttribute('data-src');
          if (src) {
            img.setAttribute('src', src);
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        }
      });
    }, {
      rootMargin: '200px 0px', // Start loading images 200px before they appear
      threshold: 0.01 // Trigger when 1% of the image is visible
    });
    
    // Find all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
}

// Monitor performance
function monitorPerformance() {
  if ('PerformanceObserver' in window) {
    // Monitor LCP
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lcpEntry = entries[entries.length - 1];
      console.log('LCP:', lcpEntry.startTime);
      
      // Report to analytics if needed
      // sendToAnalytics('lcp', lcpEntry.startTime);
    });
    
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    
    // Monitor CLS
    const clsObserver = new PerformanceObserver((entryList) => {
      let clsValue = 0;
      
      entryList.getEntries().forEach(entry => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      
      console.log('CLS:', clsValue);
      
      // Report to analytics if needed
      // sendToAnalytics('cls', clsValue);
    });
    
    clsObserver.observe({ type: 'layout-shift', buffered: true });
    
    // Monitor long tasks
    const longTaskObserver = new PerformanceObserver((entryList) => {
      entryList.getEntries().forEach(entry => {
        // Log tasks longer than 50ms
        if (entry.duration > 50) {
          console.log('Long task:', entry.duration, 'ms');
          
          // Report to analytics if needed
          // sendToAnalytics('long-task', entry.duration);
        }
      });
    });
    
    longTaskObserver.observe({ type: 'longtask', buffered: true });
  }
}

// Optimize event handlers
function optimizeEventHandlers() {
  // Debounce scroll and resize events
  let scrollTimeout;
  let resizeTimeout;
  
  window.addEventListener('scroll', () => {
    // Clear previous timeout
    clearTimeout(scrollTimeout);
    
    // Set new timeout
    scrollTimeout = setTimeout(() => {
      // Handle scroll event
      // This will only execute after scrolling has stopped for 100ms
    }, 100);
  }, { passive: true }); // Use passive event listener for better performance
  
  window.addEventListener('resize', () => {
    // Clear previous timeout
    clearTimeout(resizeTimeout);
    
    // Set new timeout
    resizeTimeout = setTimeout(() => {
      // Handle resize event
      // This will only execute after resizing has stopped for 100ms
    }, 100);
  }, { passive: true }); // Use passive event listener for better performance
}

// Preload resources during idle time
if ('requestIdleCallback' in window) {
  window.requestIdleCallback(() => {
    // Preload fonts
    const fontUrls = [
      '/_next/static/media/c9a5bc6a7c948fb0-s.p.woff2'
    ];
    
    fontUrls.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'font';
      link.type = 'font/woff2';
      link.href = url;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
    
    // Preload critical images for other pages
    const imageUrls = [
      '/images/menu/chef.jpg',
      '/images/events/event1.jpg'
    ];
    
    imageUrls.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = url + '?quality=60&width=800';
      document.head.appendChild(link);
    });
  }, { timeout: 2000 });
}
