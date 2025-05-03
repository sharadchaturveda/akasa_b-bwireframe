/**
 * Emergency JavaScript fix to force the hero text position on mobile
 * This script runs on the client side to ensure the hero text is positioned at the bottom
 */

// Run when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Only run on mobile devices
  if (window.innerWidth <= 767) {
    // Function to force the hero text position
    function forceHeroPosition() {
      // Get the hero content
      const heroContent = document.querySelector('.mobile-hero-content');
      if (heroContent) {
        // Force the hero content to the bottom of the hero section
        heroContent.style.position = 'absolute';
        heroContent.style.top = 'auto';
        heroContent.style.bottom = '10%';
        heroContent.style.left = '0';
        heroContent.style.right = '0';
        heroContent.style.transform = 'none';
        heroContent.style.marginTop = '0';
        heroContent.style.marginBottom = '0';
        heroContent.style.paddingTop = '0';
        heroContent.style.paddingBottom = '0';
        heroContent.style.zIndex = '20';
      }
    }

    // Run the fix immediately
    forceHeroPosition();

    // Also run on resize and scroll
    window.addEventListener('resize', forceHeroPosition);
    window.addEventListener('scroll', forceHeroPosition);

    // Run again after a short delay to ensure it applies after any other scripts
    setTimeout(forceHeroPosition, 500);
    setTimeout(forceHeroPosition, 1000);
    setTimeout(forceHeroPosition, 2000);
  }
});
