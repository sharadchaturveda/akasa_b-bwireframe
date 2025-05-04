/**
 * Force mobile logo positioning
 * This script ensures the logo is positioned in the upper left corner on mobile for all pages except the homepage
 */

// Run immediately
(function() {
  // Function to position the logo
  function positionLogo() {
    // Check if we're on mobile
    if (window.innerWidth <= 767) {
      // Check if we're on the homepage
      const isHomepage = window.location.pathname === '/' || 
                         window.location.pathname === '/index.html' || 
                         window.location.pathname === '/index';
      
      // Only apply to non-homepage pages
      if (!isHomepage) {
        // Find all logo containers
        const logoContainers = document.querySelectorAll('.hero-logo-container');
        
        logoContainers.forEach(function(container) {
          // Position the logo in the upper left
          container.style.cssText = 'position: fixed !important; top: 10px !important; left: 10px !important; right: auto !important; z-index: 999 !important; text-align: left !important; justify-content: flex-start !important; width: auto !important;';
          
          // Adjust the logo size
          const logoElement = container.querySelector('.logo-container');
          if (logoElement) {
            if (window.innerWidth <= 375) {
              logoElement.style.cssText = 'width: 120px !important; height: 48px !important; max-width: 120px !important; max-height: 48px !important; margin: 0 !important;';
            } else {
              logoElement.style.cssText = 'width: 150px !important; height: 60px !important; max-width: 150px !important; max-height: 60px !important; margin: 0 !important;';
            }
          }
        });
      }
    }
  }
  
  // Run on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', positionLogo);
  } else {
    positionLogo();
  }
  
  // Run on window resize
  window.addEventListener('resize', positionLogo);
  
  // Run again after a short delay to ensure it applies after any other scripts
  setTimeout(positionLogo, 500);
  setTimeout(positionLogo, 1000);
  setTimeout(positionLogo, 2000);
})();
