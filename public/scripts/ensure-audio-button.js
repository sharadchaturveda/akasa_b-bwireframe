/**
 * Ensure Audio Button Script
 *
 * This script ensures that the audio button for the mobile hero video
 * remains visible and functional, regardless of any optimization scripts.
 */

(function() {
  // Only run on mobile devices
  if (window.innerWidth >= 768) return;

  // Wait for DOM to be ready
  document.addEventListener('DOMContentLoaded', function() {
    // Function to create or update the audio button
    function ensureAudioButton() {
      console.log('Ensuring audio button exists and is visible');

      // Check if hero section exists
      const heroSection = document.querySelector('.hero-section');
      if (!heroSection) {
        console.log('Hero section not found, retrying in 500ms');
        setTimeout(ensureAudioButton, 500);
        return;
      }

      // Check if video exists
      const video = heroSection.querySelector('video');
      if (!video) {
        console.log('Video not found in hero section, retrying in 500ms');
        setTimeout(ensureAudioButton, 500);
        return;
      }

      // Check if button already exists
      let audioButton = document.querySelector('.permanent-audio-button');

      // If button doesn't exist, create it
      if (!audioButton) {
        console.log('Creating new audio button');

        // Create button container
        audioButton = document.createElement('div');
        audioButton.className = 'permanent-audio-button';
        audioButton.setAttribute('data-exclude-optimization', 'true');
        audioButton.setAttribute('data-permanent', 'true');

        // Set button styles
        Object.assign(audioButton.style, {
          position: 'absolute',
          bottom: '3rem',
          right: '3rem',
          width: '5rem',
          height: '5rem',
          zIndex: '9999',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          backgroundImage: 'linear-gradient(to bottom right, #000000, #333333)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px solid rgba(255, 255, 255, 0.8)',
          boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          opacity: '1',
          visibility: 'visible',
          pointerEvents: 'auto'
        });

        // Create initial button content (muted state)
        updateButtonContent(audioButton, true);

        // Add click event
        audioButton.addEventListener('click', function() {
          // Toggle video muted state
          video.muted = !video.muted;

          // Update button content
          updateButtonContent(audioButton, video.muted);
        });

        // Add button to hero section
        heroSection.appendChild(audioButton);
      } else {
        // Ensure button is visible
        audioButton.style.opacity = '1';
        audioButton.style.visibility = 'visible';
        audioButton.style.pointerEvents = 'auto';
      }
    }

    // Function to update button content based on muted state
    function updateButtonContent(button, isMuted) {
      // Clear existing content
      button.innerHTML = '';

      if (isMuted) {
        // Muted state
        const muteIconContainer = document.createElement('div');
        muteIconContainer.style.position = 'relative';
        muteIconContainer.style.display = 'flex';
        muteIconContainer.style.alignItems = 'center';
        muteIconContainer.style.justifyContent = 'center';

        // Icon container
        const iconContainer = document.createElement('div');
        iconContainer.style.width = '3rem';
        iconContainer.style.height = '3rem';
        iconContainer.style.display = 'flex';
        iconContainer.style.alignItems = 'center';
        iconContainer.style.justifyContent = 'center';

        // Icon image
        const iconImage = document.createElement('img');
        iconImage.src = '/images/volume-muted-icon.png';
        iconImage.alt = 'Unmute';
        iconImage.style.width = '2.5rem';
        iconImage.style.height = '2.5rem';
        iconImage.style.filter = 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.7))';

        // Add icon to container
        iconContainer.appendChild(iconImage);
        muteIconContainer.appendChild(iconContainer);

        // Add animation ring
        const animationRing = document.createElement('div');
        animationRing.className = 'animation-ring';
        animationRing.style.position = 'absolute';
        animationRing.style.inset = '0';
        animationRing.style.borderRadius = '50%';
        animationRing.style.border = '1px solid rgba(255, 255, 255, 0.3)';
        animationRing.style.opacity = '0.5';
        animationRing.style.animation = 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite';

        // Add ring to container
        muteIconContainer.appendChild(animationRing);

        // Add content to button
        button.appendChild(muteIconContainer);

        // Add muted class for animation
        button.classList.add('muted');
        button.style.animation = 'pulse 2s infinite';
      } else {
        // Unmuted state
        const equalizerContainer = document.createElement('div');
        equalizerContainer.style.display = 'flex';
        equalizerContainer.style.alignItems = 'center';
        equalizerContainer.style.justifyContent = 'center';

        // Equalizer image
        const equalizerImage = document.createElement('img');
        equalizerImage.src = '/images/equalizer-animation.gif';
        equalizerImage.alt = 'Audio playing';
        equalizerImage.style.width = '3rem';
        equalizerImage.style.height = '3rem';
        equalizerImage.style.filter = 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.7))';

        // Add image to container
        equalizerContainer.appendChild(equalizerImage);

        // Add content to button
        button.appendChild(equalizerContainer);

        // Remove muted class
        button.classList.remove('muted');
        button.style.animation = 'none';
      }
    }

    // Add keyframes for animations if they don't exist
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
      `;
      document.head.appendChild(style);
    }

    // Initial call to ensure button
    ensureAudioButton();

    // Set up periodic check to ensure button remains visible
    setInterval(ensureAudioButton, 2000);

    // Listen for custom events from the React component
    document.addEventListener('videoReady', function(e) {
      console.log('Video ready event received');
      ensureAudioButton();
    });

    document.addEventListener('videoPlaying', function(e) {
      console.log('Video playing event received');
      ensureAudioButton();
    });

    document.addEventListener('videoRemoved', function() {
      console.log('Video removed event received');
      // Remove the audio button if it exists
      const audioButton = document.querySelector('.permanent-audio-button');
      if (audioButton && audioButton.parentNode) {
        audioButton.parentNode.removeChild(audioButton);
      }
    });

    // Also check when video starts playing (native event)
    document.addEventListener('playing', function(e) {
      if (e.target.tagName === 'VIDEO' && e.target.closest('.hero-section')) {
        console.log('Native playing event detected');
        ensureAudioButton();
      }
    }, true);
  });
})();
