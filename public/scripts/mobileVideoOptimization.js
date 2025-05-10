// Check if we're on desktop
if (window.innerWidth >= 768) {
  // Create a style element to hide mobile elements
  var style = document.createElement('style');
  style.innerHTML = '.mobile-only { display: none !important; }';
  document.head.appendChild(style);

  // Block requests for mobile video files
  var originalFetch = window.fetch;
  window.fetch = function(url, options) {
    if (typeof url === 'string' && url.includes('heromobilevid')) {
      console.log('Blocked fetch request for mobile video:', url);
      return Promise.reject(new Error('Mobile video blocked on desktop'));
    }
    return originalFetch(url, options);
  };

  // Block video element loading
  var originalCreateElement = document.createElement;
  document.createElement = function(tagName) {
    var element = originalCreateElement.call(document, tagName);
    if (tagName.toLowerCase() === 'video') {
      // Override the load method
      var originalLoad = element.load;
      element.load = function() {
        if (window.innerWidth >= 768) {
          console.log('Blocked video loading on desktop');
          return;
        }
        return originalLoad.apply(this, arguments);
      };
    }
    return element;
  };
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

  // Function to play video with retry
  function playVideo() {
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(function() {
        // If autoplay fails, try again after a short delay
        setTimeout(playVideo, 100);
      });
    }
  }

  // Try to play
  playVideo();

  // Remove after 1 second
  setTimeout(function() {
    if (document.body.contains(video)) {
      document.body.removeChild(video);
    }
  }, 1000);
}

// Run on page load
if (document.readyState === 'complete') {
  ensureMobileVideoPlays();
} else {
  window.addEventListener('load', ensureMobileVideoPlays);
}
