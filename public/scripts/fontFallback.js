// Script to handle font loading failures
(function() {
  // Check if fonts are loaded after a timeout
  setTimeout(function() {
    // Function to check if a font is loaded
    function isFontLoaded(fontFamily) {
      // Create a span with the font we want to check
      const span = document.createElement('span');
      span.style.fontFamily = fontFamily;
      span.style.fontSize = '72px';
      span.style.position = 'absolute';
      span.style.left = '-9999px';
      span.style.visibility = 'hidden';
      span.textContent = 'Font Test';
      document.body.appendChild(span);
      
      // Get the width with our test font
      const width = span.offsetWidth;
      
      // Change the font to a fallback and compare width
      span.style.fontFamily = 'serif'; // Fallback font
      const fallbackWidth = span.offsetWidth;
      
      // Clean up
      document.body.removeChild(span);
      
      // If widths are different, the font is loaded
      return width !== fallbackWidth;
    }
    
    // Check if our primary fonts are loaded
    const isPlayfairLoaded = isFontLoaded('"Playfair Display", serif');
    const isMontserratLoaded = isFontLoaded('"Montserrat", sans-serif');
    
    // If fonts failed to load, add a class to the body
    if (!isPlayfairLoaded || !isMontserratLoaded) {
      document.documentElement.classList.add('fonts-failed');
      console.log('Using fallback fonts due to loading failure');
    }
  }, 3000); // Check after 3 seconds
})();
