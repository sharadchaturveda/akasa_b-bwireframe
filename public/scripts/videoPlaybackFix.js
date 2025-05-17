/**
 * Video Playback Fix Script
 *
 * This script helps ensure video playback continues even when interrupted by
 * power-saving features on mobile devices, particularly iOS.
 */

(function() {
  // Only run on mobile devices
  if (window.innerWidth > 767) return;

  // Wait for DOM to be ready
  document.addEventListener('DOMContentLoaded', function() {
    // Find all video elements in the hero section
    const heroVideos = document.querySelectorAll('.hero-section video');

    if (heroVideos.length === 0) {
      console.log('No hero videos found');
      return;
    }

    console.log('VideoPlaybackFix: Found', heroVideos.length, 'hero videos');

    // Process each video
    heroVideos.forEach(function(video, index) {
      console.log('VideoPlaybackFix: Setting up video', index + 1);

      // Set essential attributes for mobile playback
      // Use property instead of attribute for React compatibility
      video.playsInline = true;
      video.muted = true;

      // Force hardware acceleration
      video.style.transform = 'translateZ(0)';
      video.style.willChange = 'transform';

      // Handle pause events (which might be caused by power saving)
      video.addEventListener('pause', function() {
        console.log('VideoPlaybackFix: Video paused - attempting to resume');

        // Only try to resume if the page is visible
        if (document.visibilityState === 'visible') {
          // Small delay before trying to play again
          setTimeout(function() {
            video.play().catch(function(err) {
              console.log('VideoPlaybackFix: Could not resume after pause:',
                err && typeof err.message === 'string' ? err.message : 'Unknown error');
            });
          }, 100);
        }
      });

      // Handle visibility change (when user returns to the tab/app)
      document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'visible') {
          console.log('VideoPlaybackFix: Page became visible - attempting to play video');

          // Try to play the video when the page becomes visible
          video.play().catch(function(err) {
            console.log('VideoPlaybackFix: Could not play on visibility change:',
              err && typeof err.message === 'string' ? err.message : 'Unknown error');
          });
        }
      });

      // Set up periodic check to ensure video is playing
      setInterval(function() {
        if (video.paused && document.visibilityState === 'visible') {
          console.log('VideoPlaybackFix: Video found paused during check, attempting to resume');

          video.play().catch(function() {
            // Silent catch
          });
        }
      }, 5000);

      // Initial play attempt
      setTimeout(function() {
        console.log('VideoPlaybackFix: Initial play attempt');

        video.play().catch(function(err) {
          console.log('VideoPlaybackFix: Initial play error:',
            err && typeof err.message === 'string' ? err.message : 'Unknown error');
        });
      }, 1000);
    });
  });

  // Handle user interaction to enable audio
  document.addEventListener('click', function() {
    const heroVideos = document.querySelectorAll('.hero-section video');

    heroVideos.forEach(function(video) {
      // Try to play the video on user interaction
      if (video.paused) {
        video.play().catch(function() {
          // Silent catch
        });
      }
    });
  }, { once: true });
})();
