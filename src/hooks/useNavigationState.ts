"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Options for the useNavigationState hook
 */
export interface NavigationStateOptions {
  /**
   * Threshold in pixels for when to consider the page scrolled
   * @default 100
   */
  scrollThreshold?: number;

  /**
   * Whether to close the menu when the route changes
   * @default true
   */
  closeOnRouteChange?: boolean;

  /**
   * Whether to prevent body scroll when the menu is open
   * @default true
   */
  preventBodyScroll?: boolean;
}

/**
 * Result of the useNavigationState hook
 */
export interface NavigationStateResult {
  /**
   * Whether the menu is open
   */
  isMenuOpen: boolean;

  /**
   * Whether the page has been scrolled past the threshold
   */
  isScrolled: boolean;

  /**
   * Function to toggle the menu open/closed
   */
  toggleMenu: () => void;

  /**
   * Function to set the menu state
   */
  setMenuOpen: (isOpen: boolean) => void;
}

/**
 * Custom hook for managing navigation state
 *
 * This hook handles common navigation state like menu open/close,
 * scroll position tracking, and body scroll locking.
 *
 * @param {NavigationStateOptions} options - Options for the hook
 * @returns {NavigationStateResult} Navigation state and functions
 */
export function useNavigationState(
  options: NavigationStateOptions = {}
): NavigationStateResult {
  // Set default options
  const {
    scrollThreshold = 100,
    closeOnRouteChange = true,
    preventBodyScroll = true
  } = options;

  // State for menu and scroll
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Get current pathname for route change detection
  const pathname = usePathname();

  // Toggle menu function
  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  // Close menu when route changes
  useEffect(() => {
    if (closeOnRouteChange) {
      setIsMenuOpen(false);
    }
  }, [pathname, closeOnRouteChange]);

  // Handle scroll events to show/hide the header with performance optimizations
  useEffect(() => {
    // Use refs to avoid recreating the event handler on each render
    let ticking = false;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      // Skip if already processing a frame
      if (ticking) return;

      // Only update state if the scroll position has changed significantly
      const currentScrollY = window.scrollY;
      const currentIsScrolled = currentScrollY > scrollThreshold;
      const previousIsScrolled = lastScrollY > scrollThreshold;

      // Only update if the scrolled state has changed
      if (currentIsScrolled !== previousIsScrolled) {
        ticking = true;

        // Use requestAnimationFrame for better performance
        window.requestAnimationFrame(() => {
          setIsScrolled(currentIsScrolled);
          lastScrollY = currentScrollY;
          ticking = false;
        });
      }
    };

    // Set initial scroll state
    setIsScrolled(window.scrollY > scrollThreshold);

    // Add scroll event listener with passive option for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollThreshold]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (!preventBodyScroll) return;

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen, preventBodyScroll]);

  return {
    isMenuOpen,
    isScrolled,
    toggleMenu,
    setMenuOpen: setIsMenuOpen
  };
}

export default useNavigationState;
