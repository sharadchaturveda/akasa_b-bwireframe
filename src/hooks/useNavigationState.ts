"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackScrollPosition, preventBodyScrolling } from '@/utils/scrollUtils';

export interface NavigationStateOptions {
  scrollThreshold?: number;
  closeOnRouteChange?: boolean;
  preventBodyScroll?: boolean;
}

export interface NavigationStateResult {
  isMenuOpen: boolean;
  isScrolled: boolean;
  toggleMenu: () => void;
  setMenuOpen: (isOpen: boolean) => void;
}

/**
 * Custom hook for managing navigation state
 *
 * This hook handles menu open/close state, scroll position tracking,
 * and body scroll locking when the menu is open.
 *
 * @param {NavigationStateOptions} options - Configuration options
 * @returns {NavigationStateResult} Navigation state and controls
 */
export function useNavigationState(
  options: NavigationStateOptions = {}
): NavigationStateResult {
  const {
    scrollThreshold = 100,
    closeOnRouteChange = true,
    preventBodyScroll = true
  } = options;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  // Close menu when route changes
  useEffect(() => {
    if (closeOnRouteChange) {
      setIsMenuOpen(false);
    }
  }, [pathname, closeOnRouteChange]);

  // Handle scroll events with performance optimizations
  useEffect(() => {
    // Use the trackScrollPosition utility to handle scroll events
    const cleanup = trackScrollPosition(setIsScrolled, {
      threshold: scrollThreshold,
      useRAF: true
    });

    return cleanup;
  }, [scrollThreshold]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (!preventBodyScroll) return;

    // Use the preventBodyScrolling utility to handle body scroll locking
    const cleanup = preventBodyScrolling(isMenuOpen);

    return cleanup;
  }, [isMenuOpen, preventBodyScroll]);

  return {
    isMenuOpen,
    isScrolled,
    toggleMenu,
    setMenuOpen: setIsMenuOpen
  };
}

export default useNavigationState;
