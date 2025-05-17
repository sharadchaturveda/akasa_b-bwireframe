/**
 * Audio Button Fix Script
 * 
 * This script creates a fixed audio button in the lower right corner of the screen
 * that is only visible when the hero section is in view.
 */

(function() {
  // Only run on mobile devices
  if (window.innerWidth >= 768) return;
  
  // Wait for DOM to be ready
  document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the home page
    const isHomePage = window.location.pathname === '/' || 
                       window.location.pathname === '/index.html' || 
                       window.location.pathname === '/home';
    if (!isHomePage) return;
    
    // Check if hero section exists
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;
    
    // Check if video exists
    const video = heroSection.querySelector('video');
    if (!video) return;
    
    // Create the audio button
    const audioButton = document.createElement('div');
    audioButton.id = 'fixed-audio-button';
    audioButton.setAttribute('data-exclude-optimization', 'true');
    
    // Set button styles
    Object.assign(audioButton.style, {
      position: 'fixed',
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
      opacity: '0', // Start hidden
      visibility: 'hidden',
      pointerEvents: 'none'
    });
    
    // Create muted state content
    function createMutedContent() {
      audioButton.innerHTML = '';
      audioButton.classList.add('muted');
      
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
      animationRing.className = 'animation-ring';
      animationRing.style.position = 'absolute';
      animationRing.style.inset = '0';
      animationRing.style.borderRadius = '50%';
      animationRing.style.border = '1px solid rgba(255, 255, 255, 0.3)';
      animationRing.style.opacity = '0.5';
      animationRing.style.animation = 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite';
      
      muteIconContainer.appendChild(animationRing);
      audioButton.appendChild(muteIconContainer);
      audioButton.style.animation = 'pulse 2s infinite';
    }
    
    // Create unmuted state content
    function createUnmutedContent() {
      audioButton.innerHTML = '';
      audioButton.classList.remove('muted');
      
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
      audioButton.appendChild(equalizerContainer);
      audioButton.style.animation = 'none';
    }
    
    // Initial state is muted
    createMutedContent();
    
    // Add click event
    audioButton.addEventListener('click', function() {
      video.muted = !video.muted;
      if (video.muted) {
        createMutedContent();
      } else {
        createUnmutedContent();
      }
    });
    
    // Add button to body
    document.body.appendChild(audioButton);
    
    // Add keyframes for animations
    const style = document.createElement('style');
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
    
    // Function to check if hero section is visible
    function checkHeroVisibility() {
      const heroRect = heroSection.getBoundingClientRect();
      const isHeroVisible = heroRect.top < window.innerHeight && heroRect.bottom > 0;
      
      if (isHeroVisible) {
        audioButton.style.opacity = '1';
        audioButton.style.visibility = 'visible';
        audioButton.style.pointerEvents = 'auto';
      } else {
        audioButton.style.opacity = '0';
        audioButton.style.visibility = 'hidden';
        audioButton.style.pointerEvents = 'none';
      }
    }
    
    // Check visibility on scroll
    window.addEventListener('scroll', checkHeroVisibility, { passive: true });
    
    // Initial check
    checkHeroVisibility();
    
    // Check when video starts playing
    video.addEventListener('playing', function() {
      checkHeroVisibility();
    });
    
    // Log for debugging
    console.log('Audio button fix script loaded');
  });
})();
