/**
 * Video Fix Script
 *
 * This script ensures that the mobile hero video is displayed at full brightness
 * without any darkening overlays.
 */

(function() {
  // Only run on mobile devices
  if (window.innerWidth > 767) return;

  // Function to ensure video brightness
  function ensureVideoBrightness() {
    // Find all videos in the hero section
    const videos = document.querySelectorAll('.hero-section video');

    // Apply brightness to each video
    videos.forEach(video => {
      // Set inline styles for brightness
      video.style.filter = 'brightness(1.15)';
      video.style.opacity = '1';
      video.style.backgroundColor = 'transparent';

      // Fix playsinline attribute for iOS
      if (video.hasAttribute('playsinline')) {
        // Remove the lowercase attribute
        video.removeAttribute('playsinline');
      }

      // Set the correct camelCase attribute
      video.playsInline = true;

      // Remove any parent background colors
      let parent = video.parentElement;
      while (parent && parent.classList.contains('hero-section')) {
        parent.style.backgroundColor = 'transparent';
        parent = parent.parentElement;
      }

      // Remove any sibling overlays
      const siblings = Array.from(video.parentElement.children);
      siblings.forEach(sibling => {
        if (sibling !== video &&
            (sibling.classList.contains('overlay') ||
             sibling.classList.contains('hero-overlay') ||
             sibling.style.backgroundColor?.includes('rgba(0, 0, 0,'))) {
          sibling.style.opacity = '0';
          sibling.style.backgroundColor = 'transparent';
        }
      });
    });
  }

  // Run on page load
  window.addEventListener('load', ensureVideoBrightness);

  // Run after a short delay to catch dynamically loaded videos
  setTimeout(ensureVideoBrightness, 1000);
  setTimeout(ensureVideoBrightness, 3000);

  // Run on scroll to ensure it's applied after any potential reflows
  window.addEventListener('scroll', function() {
    requestAnimationFrame(ensureVideoBrightness);
  }, { passive: true });
})();
