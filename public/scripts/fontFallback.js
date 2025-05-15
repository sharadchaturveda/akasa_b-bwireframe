// Simplified script to handle font loading failures
(function() {
  // Use the native font loading API if available
  if ('fonts' in document) {
    // Add fonts-failed class by default
    document.documentElement.classList.add('fonts-failed');

    // Remove the class if fonts load successfully
    Promise.all([
      document.fonts.load('1em "Playfair Display"'),
      document.fonts.load('1em "Montserrat"')
    ]).then(() => {
      document.documentElement.classList.remove('fonts-failed');
    }).catch(() => {
      // Keep the fonts-failed class if loading fails
      console.log('Using fallback fonts due to loading failure');
    });
  } else {
    // Fallback for browsers that don't support the Font Loading API
    // Just use system fonts immediately
    document.documentElement.classList.add('fonts-failed');
  }
})();
