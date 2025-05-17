/**
 * Mobile Video Fix Script
 *
 * This script ensures that mobile videos play correctly and the audio button is visible.
 * It replaces the mobileVideoOptimization.js script with a more reliable implementation.
 */

(function() {
  // Only run the full script on mobile devices
  const isMobile = window.innerWidth < 768;

  // Function to ensure the audio button is visible
  function ensureAudioButton() {
    // Check if we're on mobile
    if (!isMobile) return;

    // Check if we're on the home page (has hero section)
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;

    // Ensure hero section has the correct positioning context for absolute positioning
    if (getComputedStyle(heroSection).position === 'static') {
      heroSection.style.position = 'relative';
    }

    // Check if video exists
    const video = heroSection.querySelector('video');
    if (!video) return;

    // Check if we're on a page with the mobile hero video
    // Only show the button on pages with the mobile hero video
    const isHomePage = window.location.pathname === '/' ||
                       window.location.pathname === '/index.html' ||
                       window.location.pathname === '/home';
    if (!isHomePage) return;

    // Check if button already exists
    let audioButton = document.querySelector('.permanent-audio-button');

    // If button doesn't exist, create it
    if (!audioButton) {
      console.log('Creating audio button');

      // Create button container
      audioButton = document.createElement('div');
      audioButton.className = 'permanent-audio-button';
      audioButton.setAttribute('data-exclude-optimization', 'true');
      audioButton.setAttribute('data-permanent', 'true');

      // Set button styles with explicit positioning
      audioButton.style.position = 'absolute';
      audioButton.style.bottom = '3rem';
      audioButton.style.right = '3rem';
      audioButton.style.left = 'auto'; // Explicitly clear left positioning
      audioButton.style.top = 'auto'; // Explicitly clear top positioning
      audioButton.style.width = '5rem';
      audioButton.style.height = '5rem';
      audioButton.style.zIndex = '50';
      audioButton.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
      audioButton.style.backgroundImage = 'linear-gradient(to bottom right, #000000, #333333)';
      audioButton.style.borderRadius = '50%';
      audioButton.style.display = 'flex';
      audioButton.style.alignItems = 'center';
      audioButton.style.justifyContent = 'center';
      audioButton.style.border = '2px solid rgba(255, 255, 255, 0.8)';
      audioButton.style.boxShadow = '0 0 15px rgba(255, 255, 255, 0.3)';
      audioButton.style.cursor = 'pointer';
      audioButton.style.transition = 'all 0.3s ease';
      audioButton.style.opacity = '1';
      audioButton.style.visibility = 'visible';
      audioButton.style.pointerEvents = 'auto';

      // Create initial button content (muted state)
      updateButtonContent(audioButton, true);

      // Add click event
      audioButton.addEventListener('click', function() {
        // Toggle video muted state
        video.muted = !video.muted;

        // Update button content
        updateButtonContent(audioButton, video.muted);
      });

      // Create a container for the button
      const buttonContainer = document.createElement('div');
      buttonContainer.className = 'audio-button-container';
      buttonContainer.style.position = 'absolute';
      buttonContainer.style.bottom = '0';
      buttonContainer.style.right = '0';
      buttonContainer.style.width = '100%';
      buttonContainer.style.height = '100%';
      buttonContainer.style.pointerEvents = 'none'; // Allow clicks to pass through to video
      buttonContainer.style.zIndex = '40';

      // Add button to the container
      buttonContainer.appendChild(audioButton);

      // Add container to the hero section
      heroSection.appendChild(buttonContainer);

      // Log the button position for debugging
      console.log('Audio button added to hero section at position:',
                  'bottom:', audioButton.style.bottom,
                  'right:', audioButton.style.right);
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

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      // Initial call to ensure button
      ensureAudioButton();

      // Set up periodic check to ensure button remains visible
      setInterval(ensureAudioButton, 2000);
    });
  } else {
    // DOM is already ready
    ensureAudioButton();

    // Set up periodic check to ensure button remains visible
    setInterval(ensureAudioButton, 2000);
  }

  // Listen for video events
  document.addEventListener('playing', function(e) {
    if (e.target.tagName === 'VIDEO' && e.target.closest('.hero-section')) {
      ensureAudioButton();
    }
  }, true);
})();
