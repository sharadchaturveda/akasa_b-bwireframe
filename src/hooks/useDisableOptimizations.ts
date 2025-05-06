import { useEffect, useRef } from 'react';

/**
 * Custom hook to disable performance optimizations for a specific component
 *
 * @param options Configuration options
 * @returns A ref to be attached to the component's root element
 */
/**
 * NOTE: This hook is now deprecated and will be removed in a future update.
 * The new clean dining info component doesn't need optimization disabling.
 */
export function useDisableOptimizations(options: {
  disableMutationObservers?: boolean;
  disableAnimations?: boolean;
  disableLayoutOptimizations?: boolean;
} = {}) {
  console.log('useDisableOptimizations is deprecated - using clean component instead');

  const {
    disableMutationObservers = true,
    disableAnimations = true,
    disableLayoutOptimizations = true
  } = options;

  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    if (!ref.current) return;

    // Mark the element as excluded from optimizations
    ref.current.setAttribute('data-exclude-optimization', 'true');

    // Disable animations if requested
    if (disableAnimations) {
      ref.current.style.animation = 'none';
      ref.current.style.transition = 'none';

      // Apply to all children as well
      const elements = ref.current.querySelectorAll('*');
      elements.forEach(el => {
        (el as HTMLElement).style.animation = 'none';
        (el as HTMLElement).style.transition = 'none';
      });
    }

    // Disable layout optimizations if requested
    if (disableLayoutOptimizations) {
      // Remove any will-change properties
      ref.current.style.willChange = 'auto';

      // Apply to all children as well
      const elements = ref.current.querySelectorAll('*');
      elements.forEach(el => {
        (el as HTMLElement).style.willChange = 'auto';
      });
    }

    // Find and disconnect any MutationObservers targeting this element
    if (disableMutationObservers && typeof window !== 'undefined' && window.MutationObserver) {
      // We can't directly access MutationObservers targeting our element,
      // but we can create a temporary style change to detect them
      const originalDisplay = ref.current.style.display;

      // Make a temporary style change
      ref.current.style.display = originalDisplay;

      // The style change might trigger MutationObservers, which might
      // try to revert our changes or apply their own optimizations

      // We'll apply our own MutationObserver to detect and block other observers
      const observer = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
            // Reapply our exclusion attribute in case it was removed
            (mutation.target as HTMLElement).setAttribute('data-exclude-optimization', 'true');
          }
        });
      });

      // Start observing
      observer.observe(ref.current, {
        attributes: true,
        attributeFilter: ['style', 'class'],
        subtree: true
      });

      // Clean up
      return () => {
        if (observer && observer.disconnect) {
          observer.disconnect();
        }
      };
    }
  }, [disableMutationObservers, disableAnimations, disableLayoutOptimizations]);

  return ref;
}
