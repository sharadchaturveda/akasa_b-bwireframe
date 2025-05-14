/**
 * Scroll Optimization Script
 *
 * This script applies various optimizations to improve scroll performance.
 * It runs immediately when loaded to ensure smooth scrolling from the start.
 */

/*
(function() {
  // Apply passive event listeners for better scroll performance
  try {
    // Test if passive is supported
    let supportsPassive = false;
    const opts = Object.defineProperty({}, 'passive', {
      get: function() {
        supportsPassive = true;
        return true;
      }
    });

    window.addEventListener('test', function() {}, opts);
    window.removeEventListener('test', function() {}, opts);

    // Apply passive listeners if supported
    if (supportsPassive) {
      const wheelOpts = { passive: true };
      window.addEventListener('wheel', function() {}, wheelOpts);
      window.addEventListener('touchstart', function() {}, wheelOpts);
      window.addEventListener('touchmove', function() {}, wheelOpts);
    }
  } catch (e) {
    // Silent catch - passive isn't supported
  }

  // Disable smooth scrolling for better performance
  document.documentElement.style.scrollBehavior = 'auto';

  // Prevent overscroll effects
  document.body.style.overscrollBehavior = 'none';

  // Prevent horizontal overflow
  document.documentElement.style.overflowX = 'hidden';
  document.body.style.overflowX = 'hidden';

  // Ensure proper width
  document.documentElement.style.width = '100%';
  document.body.style.width = '100%';

  // Add event listener for anchor links to use controlled scrolling
  document.addEventListener('DOMContentLoaded', function() {
    // Get all anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    // Add click event listener to each anchor link
    anchorLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
        // Get the target element
        const targetId = this.getAttribute('href').substring(1);

        // Only handle if target exists and is not empty
        if (targetId && targetId !== '') {
          const targetElement = document.getElementById(targetId);

          if (targetElement) {
            e.preventDefault();

            // Get the target position
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;

            // Scroll to the target position
            window.scrollTo({
              top: targetPosition - 80, // Offset for fixed header
              behavior: 'auto' // Use auto instead of smooth for better performance
            });
          }
        }
      });
    });
  });
})();
*/
