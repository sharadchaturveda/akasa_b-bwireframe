"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

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
    let ticking = false;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (ticking) return;

      const currentScrollY = window.scrollY;
      const currentIsScrolled = currentScrollY > scrollThreshold;
      const previousIsScrolled = lastScrollY > scrollThreshold;

      if (currentIsScrolled !== previousIsScrolled) {
        ticking = true;
        window.requestAnimationFrame(() => {
          setIsScrolled(currentIsScrolled);
          lastScrollY = currentScrollY;
          ticking = false;
        });
      }
    };

    setIsScrolled(window.scrollY > scrollThreshold);
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
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';

      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
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
