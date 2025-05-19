// Check if we're on desktop
if (window.innerWidth >= 768) {
  // Create a style element to hide mobile elements
  var style = document.createElement('style');
  style.innerHTML = '.mobile-only { display: none !important; }';
  document.head.appendChild(style);

  // Instead of blocking all fetch requests, we'll just log them
  console.log('Desktop device detected, mobile video optimizations disabled');
}

// Function to ensure video plays on mobile
function ensureMobileVideoPlays() {
  if (window.innerWidth >= 768) return; // Only run on mobile

  // Create a video element
  const video = document.createElement('video');
  video.muted = true;
  video.playsInline = true;
  video.autoplay = true;
  video.loop = true;
  video.preload = 'auto';

  // Use WebM format first
  const source = document.createElement('source');
  source.src = '/images/home/hero/mobile-video/heromobilevid.webm?nocache=' + Date.now();
  source.type = 'video/webm';
  video.appendChild(source);

  video.style.position = 'absolute';
  video.style.top = '0';
  video.style.left = '0';
  video.style.width = '100%';
  video.style.height = '100%';
  video.style.objectFit = 'cover';
  video.style.zIndex = '10';
  video.style.opacity = '0'; // Hide it

  // Add to body temporarily to trigger autoplay
  document.body.appendChild(video);

  // Function to play video with retry - limit retries to prevent infinite loops
  let retryCount = 0;
  const maxRetries = 3;

  function playVideo() {
    if (retryCount >= maxRetries) {
      console.log('Max video play retries reached, giving up');
      cleanup();
      return;
    }

    retryCount++;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(function(error) {
        console.log('Video play failed, retrying...', error);
        // If autoplay fails, try again after a short delay
        setTimeout(playVideo, 100);
      });
    }
  }

  // Cleanup function to ensure video is removed
  function cleanup() {
    if (document.body.contains(video)) {
      // Remove event listeners
      video.oncanplay = null;
      video.onplay = null;
      video.onerror = null;

      // Stop the video and remove it
      video.pause();
      video.src = '';
      video.load();
      document.body.removeChild(video);
    }
  }

  // Try to play
  playVideo();

  // Remove after 1 second regardless of play status
  setTimeout(cleanup, 1000);
}

// Run on page load
if (document.readyState === 'complete') {
  ensureMobileVideoPlays();
} else {
  window.addEventListener('load', ensureMobileVideoPlays);
}
