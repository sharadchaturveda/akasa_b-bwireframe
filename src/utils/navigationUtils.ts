/**
 * Navigation Utilities
 * 
 * This file contains utility functions for navigation-related functionality.
 */

/**
 * Injects mobile navigation styles into the document head
 * 
 * @returns {() => void} A cleanup function to remove the styles
 */
export function injectMobileNavStyles(): () => void {
  const styleId = 'mobile-nav-styles';
  
  // Check if styles already exist to prevent duplicates
  if (document.getElementById(styleId)) {
    return () => {}; // Return empty cleanup if already exists
  }
  
  const style = document.createElement('style');
  style.id = styleId;
  style.innerHTML = `
    .mobile-nav-header {
      display: flex;
    }

    @media (min-width: 768px) {
      .mobile-nav-header {
        display: none !important;
      }
    }
  `;

  document.head.appendChild(style);

  // Return cleanup function
  return () => {
    const styleElement = document.getElementById(styleId);
    if (styleElement) {
      document.head.removeChild(styleElement);
    }
  };
}

/**
 * Prevents body scrolling when a modal or overlay is open
 * 
 * @param {boolean} preventScroll - Whether to prevent scrolling
 * @returns {() => void} A cleanup function to restore scrolling
 */
export function preventBodyScroll(preventScroll: boolean): () => void {
  if (!preventScroll) {
    return () => {}; // Return empty cleanup if not preventing scroll
  }
  
  // Store the current scroll position
  const scrollY = window.scrollY;
  
  // Prevent scrolling
  document.body.style.overflow = 'hidden';
  document.body.style.position = 'fixed';
  document.body.style.width = '100%';
  document.body.style.top = `-${scrollY}px`;
  
  // Return cleanup function
  return () => {
    // Restore scrolling
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
    document.body.style.top = '';
    
    // Restore scroll position
    window.scrollTo(0, scrollY);
  };
}
