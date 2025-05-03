'use client';

import { useEffect } from 'react';

/**
 * MobileHeroFix Component
 *
 * A component specifically designed to fix the black bar issue on mobile devices
 * by directly manipulating the DOM to ensure the hero image covers the entire screen
 */
export default function MobileHeroFix() {
  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return;

    // Function to fix the black bar issue and remove all overlays
    const fixBlackBar = () => {
      // Get the hero section
      const heroSection = document.querySelector('section.h-screen');
      if (!heroSection) return;

      // Apply direct styles to ensure it covers the entire screen and merges with the section below
      // Don't override any existing styles that might be needed for logo positioning
      heroSection.style.height = '100vh';
      heroSection.style.minHeight = '100vh';
      heroSection.style.padding = '0';
      heroSection.style.margin = '0';
      heroSection.style.marginBottom = '-1px';
      heroSection.style.position = 'relative';

      // Get the hero image container
      const heroImageContainer = heroSection.querySelector('.absolute');
      if (!heroImageContainer) return;

      // Apply direct styles to ensure it covers the entire screen
      heroImageContainer.setAttribute('style', 'position: absolute !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important; margin: 0 !important; padding: 0 !important; background: transparent !important;');

      // Get the hero image
      const heroImage = heroImageContainer.querySelector('img');
      if (!heroImage) return;

      // Apply only safe styles that don't conflict with the fill property
      heroImage.setAttribute('style', 'object-fit: cover !important; object-position: center !important;');

      // Remove any navigation bars or overlays - except for the mobile menu overlay
      const navBars = document.querySelectorAll('.fixed.top-0.left-0.right-0:not(.mobile-menu-overlay)');
      navBars.forEach(navBar => {
        navBar.setAttribute('style', 'background: transparent !important; backdrop-filter: none !important; border: none !important; box-shadow: none !important;');
      });

      // Ensure the mobile menu overlay has proper blur if it exists
      const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
      if (mobileMenuOverlay) {
        const currentStyle = mobileMenuOverlay.getAttribute('style') || '';
        mobileMenuOverlay.setAttribute('style', currentStyle + '; backdrop-filter: blur(8px) !important;');
      }

      // Remove any gradient overlays
      const gradientOverlays = document.querySelectorAll('.bg-gradient-to-b, .bg-gradient-to-t');
      gradientOverlays.forEach(overlay => {
        overlay.style.opacity = '0.3';
        overlay.style.display = 'block';
      });

      // Force the hero content to the bottom of the hero section
      const heroContent = document.querySelector('.mobile-hero-content');
      if (heroContent) {
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
    };

    // Run the fix immediately
    fixBlackBar();

    // Also run it after a short delay to ensure it applies after any other scripts
    setTimeout(fixBlackBar, 100);
    setTimeout(fixBlackBar, 500);

    // Run it on resize and orientation change
    window.addEventListener('resize', fixBlackBar);
    window.addEventListener('orientationchange', fixBlackBar);

    // Cleanup
    return () => {
      window.removeEventListener('resize', fixBlackBar);
      window.removeEventListener('orientationchange', fixBlackBar);
    };
  }, []);

  // This component doesn't render anything
  return null;
}
