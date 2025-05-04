/**
 * Force logo size to be much larger
 * This script runs immediately to ensure the logo is properly sized
 */

// Run when the DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // Function to force logo size
  function forceLogoSize() {
    // Get all logo containers
    const logoContainers = document.querySelectorAll('.logo-container');
    if (!logoContainers.length) return;

    const viewportWidth = window.innerWidth;

    logoContainers.forEach(function(container) {
      if (viewportWidth <= 375) {
        // Extra small mobile screens
        container.style.cssText = 'width: 250px !important; height: 100px !important; max-width: 250px !important; max-height: 100px !important;';
      } else if (viewportWidth <= 767) {
        // Mobile screens
        container.style.cssText = 'width: 300px !important; height: 120px !important; max-width: 300px !important; max-height: 120px !important;';
      } else if (viewportWidth <= 1024) {
        // Tablet screens
        container.style.cssText = 'width: 450px !important; height: 180px !important; min-width: 450px !important; min-height: 180px !important;';
      } else {
        // Desktop screens
        container.style.cssText = 'width: 500px !important; height: 200px !important; min-width: 500px !important; min-height: 200px !important;';
      }

      // Force the image inside to be properly sized
      const img = container.querySelector('img');
      if (img) {
        img.style.cssText = 'width: 100% !important; height: 100% !important; object-fit: contain !important;';
      }
    });

    // Adjust hero content position for larger logo on mobile
    if (viewportWidth <= 767) {
      const heroContent = document.querySelector('.mobile-hero-content');
      if (heroContent) {
        heroContent.style.top = 'auto';
        heroContent.style.bottom = '5%';
      }
    }
  }

  // Run immediately
  forceLogoSize();

  // Also run on load and resize
  window.addEventListener('load', forceLogoSize);
  window.addEventListener('resize', forceLogoSize);
});
