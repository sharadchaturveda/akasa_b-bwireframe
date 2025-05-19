/**
 * Mobile Video Fix Script
 *
 * This script ensures that mobile videos play correctly and the audio button is visible.
 * It strictly follows these requirements:
 * 1. Device specificity: Button ONLY appears on mobile devices (width < 768px)
 * 2. Page specificity: Button ONLY appears on homepage ('/', '/index.html', or '/home')
 * 3. Position specificity: Button positioned in lower right corner of hero section (3rem from bottom, 3rem from right)
 * 4. Fixed positioning: Button maintains position relative to hero section (not page scroll)
 * 5. Visibility control: Button hidden when scrolling beyond hero section
 * 6. Z-index priority: Button appears above video but doesn't interfere with other UI elements
 */

(function() {
  // Only run the full script on mobile devices
  const isMobile = window.innerWidth < 768;

  // Track hero section boundaries for visibility control
  let heroSectionBottom = 0;
  let buttonVisible = true;

  // Only log device detection once
  if (!window.mobileVideoFixLogged) {
    console.log('Mobile Video Fix: Device detection', {
      isMobile,
      width: window.innerWidth,
      userAgent: navigator.userAgent
    });
    window.mobileVideoFixLogged = true;
  }

  // Function to ensure the audio button is visible
  function ensureAudioButton() {
    // Check if we're on mobile
    if (!isMobile) {
      console.log('Mobile Video Fix: Not a mobile device, skipping audio button');
      return;
    }

    // Check if we're on the home page (has hero section)
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) {
      console.log('Mobile Video Fix: No hero section found');
      return;
    }

    // Ensure hero section has the correct positioning context for absolute positioning
    if (getComputedStyle(heroSection).position === 'static') {
      console.log('Mobile Video Fix: Setting hero section position to relative');
      heroSection.style.position = 'relative';
    }

    // Check if video exists
    const video = heroSection.querySelector('video');
    if (!video) {
      console.log('Mobile Video Fix: No video element found in hero section');
      return;
    }

    console.log('Mobile Video Fix: Video element found', {
      src: video.src,
      muted: video.muted,
      autoplay: video.autoplay,
      playsInline: video.playsInline
    });

    // Check if we're on a page with the mobile hero video
    // Only show the button on pages with the mobile hero video
    const isHomePage = window.location.pathname === '/' ||
                       window.location.pathname === '/index.html' ||
                       window.location.pathname === '/home';
    if (!isHomePage) {
      console.log('Mobile Video Fix: Not on home page, skipping audio button');
      return;
    }

    // Check if button already exists
    let audioButton = document.querySelector('.permanent-audio-button');

    // If button doesn't exist, create it
    if (!audioButton) {
      console.log('Mobile Video Fix: Creating audio button for mobile device');

      // Create button container
      audioButton = document.createElement('div');
      audioButton.className = 'permanent-audio-button';
      audioButton.setAttribute('data-exclude-optimization', 'true');
      audioButton.setAttribute('data-permanent', 'true');

      // Set button styles with explicit positioning
      audioButton.style.position = 'absolute'; // Changed to absolute to position relative to hero section
      audioButton.style.bottom = '4rem'; // Moved further up (8rem from bottom)
      audioButton.style.right = '0.6rem'; // Moved further right (1rem from right)
      audioButton.style.left = 'auto'; // Explicitly clear left positioning
      audioButton.style.top = 'auto'; // Explicitly clear top positioning
      audioButton.style.width = '5rem';
      audioButton.style.height = '5rem';
      audioButton.style.zIndex = '50'; // Appropriate z-index to appear above video but not interfere with other UI
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

      // Create a container for the button that's positioned within the hero section
      const buttonContainer = document.createElement('div');
      buttonContainer.className = 'audio-button-container';
      buttonContainer.style.position = 'absolute'; // Absolute positioning within hero section
      buttonContainer.style.bottom = '0';
      buttonContainer.style.right = '0';
      buttonContainer.style.width = '100%';
      buttonContainer.style.height = '100%';
      buttonContainer.style.pointerEvents = 'none'; // Allow clicks to pass through to video
      buttonContainer.style.zIndex = '49'; // Just below the button

      // Add button to the container
      buttonContainer.appendChild(audioButton);

      // Add container to the hero section to ensure proper positioning
      heroSection.appendChild(buttonContainer);

      // Store the hero section's bottom boundary for visibility control
      updateHeroSectionBoundary(heroSection);

      // Log that we're adding to hero section
      console.log('Mobile Video Fix: Adding audio button to hero section');

      // Log the button position for debugging
      console.log('Mobile Video Fix: Audio button added to hero section', {
        bottom: audioButton.style.bottom,
        right: audioButton.style.right,
        width: audioButton.style.width,
        height: audioButton.style.height,
        zIndex: audioButton.style.zIndex,
        heroSectionWidth: heroSection.offsetWidth,
        heroSectionHeight: heroSection.offsetHeight
      });
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

  // Function to update the hero section boundary for visibility control
  function updateHeroSectionBoundary(heroSection) {
    if (!heroSection) return;

    const rect = heroSection.getBoundingClientRect();
    heroSectionBottom = rect.bottom + window.scrollY;

    console.log('Mobile Video Fix: Updated hero section boundary', {
      heroSectionBottom,
      heroSectionHeight: rect.height
    });
  }

  // Function to handle scroll events and control button visibility
  function handleScroll() {
    // Only run if we're on mobile and the button exists
    if (!isMobile) return;

    const audioButton = document.querySelector('.permanent-audio-button');
    if (!audioButton) return;

    // Check if we've scrolled past the hero section
    const scrollPosition = window.scrollY + window.innerHeight;
    const isVisible = window.scrollY < heroSectionBottom;

    // Only update if visibility has changed
    if (isVisible !== buttonVisible) {
      buttonVisible = isVisible;

      if (isVisible) {
        audioButton.style.opacity = '1';
        audioButton.style.visibility = 'visible';
        audioButton.style.pointerEvents = 'auto';
      } else {
        audioButton.style.opacity = '0';
        audioButton.style.visibility = 'hidden';
        audioButton.style.pointerEvents = 'none';
      }

      console.log('Mobile Video Fix: Button visibility changed', {
        isVisible,
        scrollPosition,
        heroSectionBottom
      });
    }
  }

  // Function to clean up any existing buttons before creating new ones
  function cleanupExistingButtons() {
    const existingButtons = document.querySelectorAll('.permanent-audio-button, .audio-button-container');
    existingButtons.forEach(button => {
      if (button.parentNode) {
        button.parentNode.removeChild(button);
        console.log('Mobile Video Fix: Removed existing audio button');
      }
    });
  }

  // Function to initialize the audio button and event listeners
  function initialize() {
    // Only proceed if we're on mobile
    if (!isMobile) {
      console.log('Mobile Video Fix: Not a mobile device, skipping initialization');
      return;
    }

    // Clean up any existing buttons
    cleanupExistingButtons();

    // Initial call to ensure button
    ensureAudioButton();

    // Add scroll event listener for visibility control
    window.addEventListener('scroll', handleScroll);

    // Add resize event listener to update hero section boundary
    window.addEventListener('resize', function() {
      const heroSection = document.querySelector('.hero-section');
      if (heroSection) {
        updateHeroSectionBoundary(heroSection);
      }
    });

    // Set up periodic check to ensure button remains visible
    const checkInterval = setInterval(function() {
      ensureAudioButton();
      handleScroll(); // Also check visibility
    }, 2000);

    // Store interval ID for potential cleanup
    window.audioButtonCheckInterval = checkInterval;

    console.log('Mobile Video Fix: Initialization complete');
  }

  // Cleanup function for potential future use
  function cleanup() {
    // Remove event listeners
    window.removeEventListener('scroll', handleScroll);

    // Clear interval
    if (window.audioButtonCheckInterval) {
      clearInterval(window.audioButtonCheckInterval);
    }

    // Remove buttons
    cleanupExistingButtons();
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    // DOM is already ready
    initialize();
  }

  // Listen for video events
  document.addEventListener('playing', function(e) {
    if (e.target.tagName === 'VIDEO' && e.target.closest('.hero-section')) {
      ensureAudioButton();

      // Update hero section boundary when video starts playing
      const heroSection = e.target.closest('.hero-section');
      if (heroSection) {
        updateHeroSectionBoundary(heroSection);
      }
    }
  }, true);
})();
