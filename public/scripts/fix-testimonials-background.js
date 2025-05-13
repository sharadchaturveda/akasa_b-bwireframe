/**
 * Fix Testimonials Background
 * 
 * This script disables the parallax effect in the testimonials section
 * that causes the background image to move up and down during scrolling.
 */

(function() {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fixTestimonialsBackground);
  } else {
    fixTestimonialsBackground();
  }

  function fixTestimonialsBackground() {
    // Find the testimonials section
    const testimonialsSection = document.querySelector('section.w-full.relative.py-24.overflow-hidden.min-h-\\[80vh\\].bg-black');
    
    if (!testimonialsSection) {
      // Section not found, try again later
      setTimeout(fixTestimonialsBackground, 500);
      return;
    }
    
    // Find the background div
    const backgroundDiv = testimonialsSection.querySelector('.absolute.inset-0.w-full.h-full[style*="background-image"]');
    
    if (backgroundDiv) {
      // Remove any transform or transition styles
      backgroundDiv.style.transform = 'none';
      backgroundDiv.style.transition = 'none';
      
      // Add a class to identify it as fixed
      backgroundDiv.classList.add('fixed-background');
      
      // Override any future attempts to add parallax
      const originalSetProperty = backgroundDiv.style.setProperty;
      backgroundDiv.style.setProperty = function(property, value) {
        if (property === 'transform' && value.includes('translateY')) {
          // Block transform changes that include translateY
          return;
        }
        
        // Call the original method for other properties
        return originalSetProperty.apply(this, arguments);
      };
    }
    
    // Also observe for changes to catch any dynamic updates
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'attributes' && 
            mutation.attributeName === 'style' && 
            mutation.target.classList.contains('fixed-background')) {
          // If style was changed, ensure transform is still none
          const target = mutation.target;
          if (target.style.transform && target.style.transform !== 'none') {
            target.style.transform = 'none';
          }
        }
      });
    });
    
    // Start observing the background div if found
    if (backgroundDiv) {
      observer.observe(backgroundDiv, { 
        attributes: true,
        attributeFilter: ['style']
      });
    }
  }
})();
