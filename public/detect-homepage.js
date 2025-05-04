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

  // Also handle mobile logo positioning for non-homepage pages
  if (!isHomepage && window.innerWidth <= 767) {
    // Find all logo containers
    const logoContainers = document.querySelectorAll('.hero-logo-container');

    logoContainers.forEach(function(container) {
      // Add a class for non-homepage logo containers
      container.classList.add('non-homepage-logo-container');
    });
  }
});
