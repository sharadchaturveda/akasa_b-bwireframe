/**
 * Emergency JavaScript fix for mobile logo positioning
 * This script runs on the client side to ensure the logo doesn't overlap with hero text
 */

// Run when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Only run on mobile devices
  if (window.innerWidth <= 767) {
    // Function to fix the logo positioning
    function fixMobileLogo() {
      // Get the logo container
      const logoContainer = document.querySelector('.mobile-home-logo-container');
      if (logoContainer) {
        // Position the logo even higher on the screen
        logoContainer.style.position = 'absolute';
        logoContainer.style.top = '0.5rem'; // Reduced from 1rem to 0.5rem
        logoContainer.style.left = '0';
        logoContainer.style.right = '0';
        logoContainer.style.height = 'auto';
        logoContainer.style.paddingTop = '0';
        logoContainer.style.zIndex = '999';
        logoContainer.style.background = 'transparent';
        logoContainer.style.display = 'flex';
        logoContainer.style.justifyContent = 'center';
        logoContainer.style.alignItems = 'center';
      }

      // Get the logo itself
      const logo = document.querySelector('.relative.w-\\[140px\\].h-\\[140px\\]');
      if (logo) {
        // Make the logo smaller
        logo.style.width = '100px';
        logo.style.height = '100px';
        logo.style.maxWidth = '100px';
        logo.style.maxHeight = '100px';
      }

      // Get the hero content
      const heroContent = document.querySelector('.mobile-hero-content');
      if (heroContent) {
        // Position the hero content very low on the screen
        heroContent.style.position = 'absolute';
        heroContent.style.top = '75%'; // Position at 75% from the top - very low
        heroContent.style.transform = 'none'; // Remove the transform
        heroContent.style.left = '0';
        heroContent.style.right = '0';
        heroContent.style.marginTop = '0';
        heroContent.style.paddingTop = '0';
        heroContent.style.zIndex = '20';
      }

      // Restore the overlay gradient with reduced intensity
      const gradientOverlay = document.querySelector('.absolute.inset-0.bg-gradient-to-b.from-black\\/30.via-transparent.to-black\\/60.z-5.opacity-70');
      if (gradientOverlay) {
        gradientOverlay.style.opacity = '0.3'; // Reduced intensity
        gradientOverlay.style.display = 'block';
      }

      // Restore the bottom gradient with reduced intensity
      const bottomGradient = document.querySelector('.absolute.left-0.right-0.bottom-0.h-\\[50px\\].bg-gradient-to-t.from-black.to-transparent.z-5');
      if (bottomGradient) {
        bottomGradient.style.opacity = '0.3'; // Reduced intensity
        bottomGradient.style.display = 'block';
      }

      // Fix testimonial section background
      const testimonialSection = document.querySelector('section.w-full.relative.py-16.overflow-hidden.bg-black.mobile-container');
      if (testimonialSection) {
        // Ensure the section is properly positioned
        testimonialSection.style.position = 'relative';
        testimonialSection.style.overflow = 'hidden';

        // Fix the background image
        const testimonialBg = testimonialSection.querySelector('.absolute.inset-0.w-full.h-full');
        if (testimonialBg) {
          testimonialBg.style.position = 'absolute';
          testimonialBg.style.top = '0';
          testimonialBg.style.left = '0';
          testimonialBg.style.right = '0';
          testimonialBg.style.bottom = '0';
          testimonialBg.style.width = '100%';
          testimonialBg.style.height = '150%';
          testimonialBg.style.display = 'block';
          testimonialBg.style.opacity = '1';
          testimonialBg.style.visibility = 'visible';
          testimonialBg.style.zIndex = '1';
        }
      }
    }

    // Run the fix immediately
    fixMobileLogo();

    // Also run on resize and orientation change
    window.addEventListener('resize', fixMobileLogo);
    window.addEventListener('orientationchange', fixMobileLogo);
  }
});
