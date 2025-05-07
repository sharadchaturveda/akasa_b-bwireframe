"use client";

import { useState, useEffect, useRef, useCallback, RefObject } from 'react';

/**
 * Options for the useIntersectionObserver hook
 */
export interface IntersectionObserverOptions {
  /**
   * The root element to use as the viewport
   * @default null (browser viewport)
   */
  root?: Element | null;

  /**
   * Margin around the root element
   * @default "0px"
   */
  rootMargin?: string;

  /**
   * Threshold(s) at which to trigger the callback
   * @default 0.1
   */
  threshold?: number | number[];

  /**
   * Whether to disconnect the observer after the element is intersected
   * @default true
   */
  disconnectOnIntersect?: boolean;

  /**
   * Whether to start observing immediately
   * @default true
   */
  startObserving?: boolean;
}

/**
 * Result of the useIntersectionObserver hook
 */
export interface IntersectionObserverResult {
  /**
   * Whether the element is intersecting with the viewport
   */
  isIntersecting: boolean;

  /**
   * The intersection ratio (0-1)
   */
  intersectionRatio: number;

  /**
   * Function to start observing
   */
  startObserving: () => void;

  /**
   * Function to stop observing
   */
  stopObserving: () => void;

  /**
   * The ref to attach to the element
   */
  ref: RefObject<Element | null>;
}

/**
 * Custom hook for using the Intersection Observer API
 *
 * This hook makes it easy to detect when an element enters or exits the viewport.
 *
 * @param {IntersectionObserverOptions} options - Options for the intersection observer
 * @returns {IntersectionObserverResult} The intersection observer result
 *
 * @example
 * ```tsx
 * const { isIntersecting, ref } = useIntersectionObserver({
 *   threshold: 0.5,
 *   disconnectOnIntersect: true
 * });
 *
 * return (
 *   <div ref={ref}>
 *     {isIntersecting ? 'Element is visible' : 'Element is not visible'}
 *   </div>
 * );
 * ```
 */
export function useIntersectionObserver(
  options: IntersectionObserverOptions = {}
): IntersectionObserverResult {
  // Set default options
  const {
    root = null,
    rootMargin = '0px',
    threshold = 0.1,
    disconnectOnIntersect = true,
    startObserving: initialStartObserving = true
  } = options;

  // State for tracking intersection
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [intersectionRatio, setIntersectionRatio] = useState(0);

  // Ref for the element to observe
  const ref = useRef<Element>(null);

  // Ref for the observer instance
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Ref for tracking whether we're observing
  const isObservingRef = useRef(initialStartObserving);

  // Function to start observing
  const startObserving = () => {
    isObservingRef.current = true;

    // If we have an element and we're in the browser, create and connect the observer
    if (ref.current && typeof IntersectionObserver !== 'undefined') {
      setupObserver();
    }
  };

  // Function to stop observing (defined first to avoid circular dependencies)
  const stopObserving = useCallback(() => {
    isObservingRef.current = false;

    // Disconnect the observer if it exists
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
  }, []);

  // Function to set up the observer (memoized to avoid dependency cycle)
  const setupObserver = useCallback(() => {
    // Disconnect any existing observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Create a new observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Get the first entry (we're only observing one element)
        const entry = entries[0];

        // Update state based on intersection
        setIsIntersecting(entry.isIntersecting);
        setIntersectionRatio(entry.intersectionRatio);

        // Disconnect if the element is intersecting and we want to disconnect
        if (entry.isIntersecting && disconnectOnIntersect) {
          stopObserving();
        }
      },
      { root, rootMargin, threshold }
    );

    // Start observing the element
    if (ref.current && isObservingRef.current) {
      observerRef.current.observe(ref.current);
    }
  }, [root, rootMargin, threshold, disconnectOnIntersect, stopObserving]);

  // Set up the observer when the component mounts or when the options change
  useEffect(() => {
    // Only run in the browser
    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    // If we have an element and we're supposed to be observing, set up the observer
    if (ref.current && isObservingRef.current) {
      setupObserver();
    }

    // Clean up the observer when the component unmounts
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [root, rootMargin, threshold, disconnectOnIntersect, setupObserver]);

  return {
    isIntersecting,
    intersectionRatio,
    startObserving,
    stopObserving,
    ref
  };
}

export default useIntersectionObserver;
