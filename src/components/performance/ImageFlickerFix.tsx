"use client";

import { useEffect } from 'react';
import { useDeviceDetection } from '@/hooks/useDeviceDetection';

/**
 * ImageFlickerFix Component
 *
 * This component fixes the issue with images flickering (going black)
 * during scrolling on mobile devices. It doesn't affect layout or navigation.
 *
 * @returns {null} This component doesn't render anything
 */
export default function ImageFlickerFix() {
  const { isMobile } = useDeviceDetection();

  useEffect(() => {
    // Only run on mobile devices
    if (!isMobile) {
      return;
    }

    // Create a style element to add CSS that prevents image flickering
    const style = document.createElement('style');
    style.textContent = `
      /* Prevent image flickering during scroll */
      img {
        /* Force hardware acceleration */
        transform: translateZ(0) !important;
        backface-visibility: hidden !important;
        -webkit-backface-visibility: hidden !important;

        /* Prevent unloading during scroll */
        will-change: transform !important;

        /* Ensure smooth transitions */
        transition: none !important;

        /* Prevent content visibility changes during scroll */
        content-visibility: visible !important;
      }

      /* Ensure Next.js image containers maintain dimensions */
      span[style*="box-sizing: border-box; display: block; overflow: hidden;"] {
        background-color: #111 !important;
        min-height: 1px !important;

        /* Force hardware acceleration */
        transform: translateZ(0) !important;

        /* Prevent unloading during scroll */
        will-change: transform !important;
      }
    `;
    document.head.appendChild(style);

    // Create a cache to keep images in memory
    const imageCache = new Set();

    // Function to fix Next.js images
    const fixNextJsImages = () => {
      // Find all Next.js image containers
      const nextJsImageContainers = document.querySelectorAll('span[style*="box-sizing: border-box; display: block; overflow: hidden"]');

      // Process each container
      nextJsImageContainers.forEach(container => {
        // Skip already processed containers
        if (container.hasAttribute('data-fixed')) {
          return;
        }

        // Mark as processed
        container.setAttribute('data-fixed', 'true');

        // Find the image inside the container
        const img = container.querySelector('img');
        if (img) {
          // Skip already processed images
          if (img.hasAttribute('data-fixed')) {
            return;
          }

          // Mark as processed
          img.setAttribute('data-fixed', 'true');

          // Set decoding to sync
          img.decoding = 'sync';

          // Keep the image in memory
          imageCache.add(img.src);
        }
      });
    };

    // Fix images initially
    fixNextJsImages();

    // Set up a mutation observer to process new images
    const observer = new MutationObserver(mutations => {
      let hasNewImages = false;

      mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1) { // Element node
              // Cast node to Element type to access tagName
              const element = node as Element;
              if (element.tagName === 'IMG') {
                hasNewImages = true;
              } else if (element.querySelectorAll) {
                const images = element.querySelectorAll('img');
                if (images.length > 0) {
                  hasNewImages = true;
                }
              }
            }
          });
        }
      });

      if (hasNewImages) {
        fixNextJsImages();
      }
    });

    // Observe the entire document for new images
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Clean up on unmount
    return () => {
      observer.disconnect();
      document.head.removeChild(style);
    };
  }, [isMobile]);

  // This component doesn't render anything
  return null;
}
