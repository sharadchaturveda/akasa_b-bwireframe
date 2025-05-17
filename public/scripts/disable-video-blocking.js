/**
 * This script disables the video blocking functionality from mobileVideoOptimization.js
 * It should be loaded BEFORE mobileVideoOptimization.js
 */

// Use a self-executing function to avoid global variable conflicts
(function() {
  // Set a flag to indicate that we're disabling video blocking
  window.__VIDEO_BLOCKING_DISABLED__ = true;

  // Create a MutationObserver to watch for script elements being added to the page
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(function(node) {
          // Check if the added node is a script element
          if (node.tagName === 'SCRIPT' && node.src && node.src.includes('mobileVideoOptimization.js')) {
            // Prevent the script from loading
            node.type = 'text/plain';
            console.log('Prevented mobileVideoOptimization.js from loading');
          }
        });
      }
    });
  });

  // Start observing the document
  observer.observe(document, {
    childList: true,
    subtree: true
  });

  console.log('Video blocking has been disabled for debugging purposes');
})();
