/**
 * Simple Audio Button Script
 *
 * This script adds a simple audio button to the hero section on mobile devices only.
 */

(function() {
  // Function to check if we're on mobile
  function isMobileDevice() {
    return window.innerWidth < 768;
  }

  // Exit immediately if we're on desktop
  if (!isMobileDevice()) {
    console.log('Not on mobile device, audio button will not be added');
    return;
  }

  // Wait for DOM to be ready
  document.addEventListener('DOMContentLoaded', function() {
    // Function to create and add the button
    function addAudioButton() {
      // Double-check that we're on mobile before adding the button
      if (!isMobileDevice()) {
        console.log('Not on mobile device, audio button will not be added');
        return;
      }

      console.log('Adding audio button to hero section');

      // Check if hero section exists
      const heroSection = document.querySelector('.hero-section');
      if (!heroSection) {
        console.log('Hero section not found');
        return;
      }

      // Find the video - it might be directly in the hero section or in a wrapper
      let video = heroSection.querySelector('video');

      // If not found directly, try to find it in the mobile-hero-video-wrapper
      if (!video) {
        const videoWrapper = heroSection.querySelector('.mobile-hero-video-wrapper');
        if (videoWrapper) {
          video = videoWrapper.querySelector('video');
        }
      }

      if (!video) {
        console.log('Video not found in hero section');
        return;
      }

      console.log('Found video element:', video);

      // Check if button already exists
      if (document.querySelector('.audio-button')) {
        console.log('Audio button already exists');
        return;
      }

      // Create button
      const button = document.createElement('div');
      button.className = 'audio-button';

      // Set button styles - be very explicit about positioning
      button.style.position = 'absolute';
      button.style.bottom = '5rem'; // Move up slightly (increased from 3rem)
      button.style.right = '1rem'; // Move right slightly (decreased from 3rem)
      button.style.left = 'auto'; // Explicitly clear left positioning
      button.style.top = 'auto'; // Explicitly clear top positioning
      button.style.width = '3rem';
      button.style.height = '3rem';
      button.style.zIndex = '50';

      // Log button position for debugging
      console.log('Button position:', {
        position: button.style.position,
        bottom: button.style.bottom,
        right: button.style.right,
        width: button.style.width,
        height: button.style.height
      });
      button.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
      button.style.backgroundImage = 'linear-gradient(to bottom right, #000000, #333333)';
      button.style.borderRadius = '50%';
      button.style.display = 'flex';
      button.style.alignItems = 'center';
      button.style.justifyContent = 'center';
      button.style.border = '2px solid rgba(255, 255, 255, 0.8)';
      button.style.boxShadow = '0 0 15px rgba(255, 255, 255, 0.3)';
      button.style.cursor = 'pointer';
      button.style.transition = 'all 0.3s ease';

      // Create muted content
      const muteIconContainer = document.createElement('div');
      muteIconContainer.style.position = 'relative';
      muteIconContainer.style.display = 'flex';
      muteIconContainer.style.alignItems = 'center';
      muteIconContainer.style.justifyContent = 'center';

      const iconContainer = document.createElement('div');
      iconContainer.style.width = '3rem';
      iconContainer.style.height = '3rem';
      iconContainer.style.display = 'flex';
      iconContainer.style.alignItems = 'center';
      iconContainer.style.justifyContent = 'center';

      const iconImage = document.createElement('img');
      iconImage.src = '/images/volume-muted-icon.png';
      iconImage.alt = 'Unmute';
      iconImage.style.width = '2.5rem';
      iconImage.style.height = '2.5rem';
      iconImage.style.filter = 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.7))';

      iconContainer.appendChild(iconImage);
      muteIconContainer.appendChild(iconContainer);

      const animationRing = document.createElement('div');
      animationRing.style.position = 'absolute';
      animationRing.style.inset = '0';
      animationRing.style.borderRadius = '50%';
      animationRing.style.border = '1px solid rgba(255, 255, 255, 0.3)';
      animationRing.style.animation = 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite';

      muteIconContainer.appendChild(animationRing);
      button.appendChild(muteIconContainer);

      // Add button to hero section
      heroSection.appendChild(button);

      // Log the button's position in the DOM
      console.log('Button added to hero section');
      console.log('Button parent:', button.parentNode);
      console.log('Button computed style:', {
        position: getComputedStyle(button).position,
        bottom: getComputedStyle(button).bottom,
        right: getComputedStyle(button).right
      });

      // Add click event
      button.addEventListener('click', function() {
        // Toggle video muted state
        video.muted = !video.muted;

        // Update button content
        if (video.muted) {
          // Show muted icon
          button.innerHTML = '';
          button.appendChild(muteIconContainer);
          button.style.animation = 'pulse 2s infinite';
        } else {
          // Show unmuted icon (equalizer)
          button.innerHTML = '';

          const equalizerContainer = document.createElement('div');
          equalizerContainer.style.display = 'flex';
          equalizerContainer.style.alignItems = 'center';
          equalizerContainer.style.justifyContent = 'center';

          const equalizerImage = document.createElement('img');
          equalizerImage.src = '/images/equalizer-animation.gif';
          equalizerImage.alt = 'Audio playing';
          equalizerImage.style.width = '3rem';
          equalizerImage.style.height = '3rem';
          equalizerImage.style.filter = 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.7))';

          equalizerContainer.appendChild(equalizerImage);
          button.appendChild(equalizerContainer);
          button.style.animation = 'none';
        }
      });

      // Add keyframes for animations
      if (!document.querySelector('#audio-button-animations')) {
        const style = document.createElement('style');
        style.id = 'audio-button-animations';
        style.textContent = `
          @keyframes pulse {
            0% { transform: scale(1); box-shadow: 0 0 15px rgba(255, 255, 255, 0.3); }
            50% { transform: scale(1.05); box-shadow: 0 0 20px rgba(255, 255, 255, 0.5); }
            100% { transform: scale(1); box-shadow: 0 0 15px rgba(255, 255, 255, 0.3); }
          }

          @keyframes ping {
            75%, 100% { transform: scale(1.5); opacity: 0; }
          }

          .audio-button {
            animation: pulse 2s infinite;
          }
        `;
        document.head.appendChild(style);
      }

      console.log('Audio button added to hero section');
    }

    // Add button immediately
    addAudioButton();

    // Also add button when video starts playing
    document.addEventListener('playing', function(e) {
      if (e.target.tagName === 'VIDEO' && e.target.closest('.hero-section')) {
        addAudioButton();
      }
    }, true);

    // Handle window resize events
    window.addEventListener('resize', function() {
      // If we're on desktop, remove the button if it exists
      if (!isMobileDevice()) {
        const button = document.querySelector('.audio-button');
        if (button && button.parentNode) {
          console.log('Window resized to desktop size, removing audio button');
          button.parentNode.removeChild(button);
        }
      } else {
        // If we're on mobile, add the button if it doesn't exist
        if (!document.querySelector('.audio-button')) {
          console.log('Window resized to mobile size, adding audio button');
          addAudioButton();
        }
      }
    });
  });
})();
