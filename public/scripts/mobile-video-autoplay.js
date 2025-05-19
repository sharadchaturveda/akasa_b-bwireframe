/**
 * Mobile Video Autoplay Helper
 *
 * This script helps ensure videos autoplay properly on mobile devices.
 * It doesn't block any requests or interfere with desktop functionality.
 */

(function() {
  // Only run on mobile devices
  const isMobile = window.innerWidth < 768;

  if (!isMobile) {
    // On desktop, just add a class to the HTML element
    document.documentElement.classList.add('desktop');
    return;
  }

  // Add mobile class to HTML element
  document.documentElement.classList.add('mobile');

  // Function to ensure videos autoplay on mobile
  const ensureMobileVideoAutoplay = () => {
    // Find all videos with autoplay attribute
    const videos = document.querySelectorAll('video[autoplay]');

    videos.forEach(video => {
      // Skip already processed videos
      if (video.hasAttribute('data-autoplay-fixed')) {
        return;
      }

      // Mark as processed
      video.setAttribute('data-autoplay-fixed', 'true');

      // Ensure proper attributes for mobile autoplay
      video.muted = true;
      video.playsInline = true;
      video.setAttribute('playsinline', '');
      video.setAttribute('muted', '');

      // Try to play the video
      const playPromise = video.play();

      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If autoplay fails, try again when user interacts with the page
          const playVideoOnInteraction = () => {
            video.play().catch(() => {
              // If it still fails, we won't retry again
              console.log('Video autoplay failed even after user interaction');
            });

            // Remove event listeners after trying once
            document.removeEventListener('touchstart', playVideoOnInteraction);
            document.removeEventListener('click', playVideoOnInteraction);
          };

          // Add event listeners for user interaction
          document.addEventListener('touchstart', playVideoOnInteraction, { once: true });
          document.addEventListener('click', playVideoOnInteraction, { once: true });
        });
      }
    });
  };

  // Run when the DOM is ready, but delay to avoid hydration issues
  const initWithDelay = () => {
    // Delay execution to allow React hydration to complete
    setTimeout(ensureMobileVideoAutoplay, 500);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWithDelay);
  } else {
    initWithDelay();
  }

  // Also run when new content is added to the page
  const observer = new MutationObserver((mutations) => {
    let hasNewVideos = false;

    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) { // Element node
            if (node.tagName === 'VIDEO') {
              hasNewVideos = true;
            } else if (node.querySelectorAll) {
              const videos = node.querySelectorAll('video[autoplay]');
              if (videos.length > 0) {
                hasNewVideos = true;
              }
            }
          }
        });
      }
    });

    if (hasNewVideos) {
      // Delay execution to avoid conflicts with React hydration
      setTimeout(ensureMobileVideoAutoplay, 100);
    }
  });

  // Start observing the document
  observer.observe(document, {
    childList: true,
    subtree: true
  });
})();
