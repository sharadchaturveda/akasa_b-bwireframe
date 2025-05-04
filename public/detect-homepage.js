/**
 * Detect if we're on the homepage and add a class to the body
 * This is used for mobile logo positioning
 */

document.addEventListener('DOMContentLoaded', function() {
  // Check if we're on the homepage
  const isHomepage = window.location.pathname === '/' ||
                     window.location.pathname === '/index.html' ||
                     window.location.pathname === '/index';

  // Add the appropriate class to the body
  if (isHomepage) {
    document.body.classList.add('homepage');
  } else {
    document.body.classList.add('not-homepage');
  }

  // More aggressive handling of logo positioning
  if (window.innerWidth <= 767) {
    // Find all logo containers
    const logoContainers = document.querySelectorAll('.hero-logo-container');

    logoContainers.forEach(function(container) {
      if (!isHomepage) {
        // Position the logo in the upper left for non-homepage pages
        container.style.position = 'fixed';
        container.style.top = '10px';
        container.style.left = '10px';
        container.style.right = 'auto';
        container.style.zIndex = '999';
        container.style.textAlign = 'left';
        container.style.justifyContent = 'flex-start';
        container.style.width = 'auto';

        // Adjust the logo size
        const logoElement = container.querySelector('.logo-container');
        if (logoElement) {
          if (window.innerWidth <= 375) {
            logoElement.style.width = '120px';
            logoElement.style.height = '48px';
            logoElement.style.maxWidth = '120px';
            logoElement.style.maxHeight = '48px';
          } else {
            logoElement.style.width = '150px';
            logoElement.style.height = '60px';
            logoElement.style.maxWidth = '150px';
            logoElement.style.maxHeight = '60px';
          }
          logoElement.style.margin = '0';
        }
      }
    });
  }

  // Run again after a short delay to ensure it applies after any other scripts
  setTimeout(function() {
    if (!isHomepage && window.innerWidth <= 767) {
      const logoContainers = document.querySelectorAll('.hero-logo-container');
      logoContainers.forEach(function(container) {
        container.style.position = 'fixed';
        container.style.top = '10px';
        container.style.left = '10px';
      });
    }
  }, 500);
});
