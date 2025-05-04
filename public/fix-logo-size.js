/**
 * Fix for logo sizing on mobile and desktop
 * This ensures the logo is properly sized on all devices
 */

document.addEventListener('DOMContentLoaded', function() {
  // Function to adjust logo size based on screen width
  function adjustLogoSize() {
    const logoContainer = document.querySelector('.logo-container');
    if (!logoContainer) return;

    const viewportWidth = window.innerWidth;

    if (viewportWidth <= 375) {
      // Extra small mobile screens
      logoContainer.style.width = '250px';
      logoContainer.style.height = '100px';
      logoContainer.style.maxWidth = '250px';
      logoContainer.style.maxHeight = '100px';
    } else if (viewportWidth <= 767) {
      // Mobile screens
      logoContainer.style.width = '300px';
      logoContainer.style.height = '120px';
      logoContainer.style.maxWidth = '300px';
      logoContainer.style.maxHeight = '120px';
    } else if (viewportWidth <= 1024) {
      // Tablet screens
      logoContainer.style.width = '450px';
      logoContainer.style.height = '180px';
      logoContainer.style.minWidth = '450px';
      logoContainer.style.minHeight = '180px';
    } else {
      // Desktop screens
      logoContainer.style.width = '500px';
      logoContainer.style.height = '200px';
      logoContainer.style.minWidth = '500px';
      logoContainer.style.minHeight = '200px';
    }

    // Apply appropriate styles based on device type
    if (viewportWidth <= 767) {
      // Mobile styles
      logoContainer.setAttribute('style', logoContainer.getAttribute('style') +
        (viewportWidth <= 375 ?
          ' max-width: 250px !important; max-height: 100px !important;' :
          ' max-width: 300px !important; max-height: 120px !important;'));
    } else {
      // Desktop styles
      logoContainer.setAttribute('style', logoContainer.getAttribute('style') +
        (viewportWidth <= 1024 ?
          ' min-width: 450px !important; min-height: 180px !important; width: 450px !important; height: 180px !important;' :
          ' min-width: 500px !important; min-height: 200px !important; width: 500px !important; height: 200px !important;'));
    }
  }

  // Run on page load
  adjustLogoSize();

  // Run on window resize
  window.addEventListener('resize', adjustLogoSize);

  // Run on orientation change
  window.addEventListener('orientationchange', adjustLogoSize);
});
