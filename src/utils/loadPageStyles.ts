/**
 * Utility to dynamically load CSS for specific pages
 * This helps minimize critical CSS by only loading what's needed for each page
 */

export const loadPageStyles = (pageName: string) => {
  if (typeof document === 'undefined') return; // Skip during SSR
  
  // Check if the stylesheet is already loaded
  const id = `page-styles-${pageName}`;
  if (document.getElementById(id)) return;
  
  // Create a new link element
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `/styles/${pageName}.css`;
  link.id = id;
  
  // Add it to the document head
  document.head.appendChild(link);
};

/**
 * Utility to preload CSS for pages that might be visited next
 * This improves performance for subsequent page navigations
 */
export const preloadPageStyles = (pageNames: string[]) => {
  if (typeof document === 'undefined') return; // Skip during SSR
  
  pageNames.forEach(pageName => {
    // Check if the stylesheet is already preloaded
    const id = `preload-styles-${pageName}`;
    if (document.getElementById(id)) return;
    
    // Create a new link element
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = `/styles/${pageName}.css`;
    link.id = id;
    
    // Add it to the document head
    document.head.appendChild(link);
  });
};
