"use client";

import { useState, useCallback, memo } from "react";
import Link from "next/link";
import MobileNavLogo from "./MobileNavLogo";

interface MobileNavigationProps {
  navItems: Array<{ name: string; path: string }>;
}

/**
 * MobileNavLink Component
 * A mobile-optimized navigation link component
 */
const MobileNavLink = memo(function MobileNavLink({
  name,
  path,
  onClick,
}: {
  name: string;
  path: string;
  onClick: () => void;
}) {
  return (
    <a
      href={path}
      className="mobile-menu-item uppercase tracking-wider text-xl sm:text-2xl font-montserrat text-white py-4 block text-center w-full touch-manipulation"
      onClick={(e) => {
        e.preventDefault();
        onClick();
        // Use window.location for more reliable navigation on mobile
        window.location.href = path;
      }}
    >
      {name}
    </a>
  );
});

/**
 * MobileNavigation Component
 * A dedicated mobile navigation component
 */
const MobileNavigation = memo(function MobileNavigation({ navItems }: MobileNavigationProps) {
  // State for mobile menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Toggle mobile menu with performance optimizations
  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
    // Toggle body scroll with will-change for better performance
    if (!mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.willChange = 'transform';

      // Force the menu to be at the top of the screen
      window.scrollTo(0, 0);

      // Add a class to the body to prevent scrolling
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.style.overflow = '';
      document.body.style.willChange = 'auto';

      // Remove the class from the body
      document.body.classList.remove('mobile-menu-open');
    }
  }, [mobileMenuOpen]);

  // Close mobile menu with performance optimizations
  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
    document.body.style.overflow = '';
    document.body.style.willChange = 'auto';

    // Remove the class from the body
    document.body.classList.remove('mobile-menu-open');
  }, []);

  return (
    <div className="md:hidden w-full">
      {/* Mobile Navigation Bar */}
      <div className="flex justify-between items-center">
        <MobileNavLogo />
        <button
          onClick={toggleMobileMenu}
          className="text-white p-3 rounded-md border border-white/20 flex items-center justify-center touch-manipulation"
          aria-label="Toggle menu"
          style={{ willChange: 'transform' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay - Fixed positioning at the top of the screen */}
      {mobileMenuOpen && (
        <div
          className="mobile-menu-overlay fixed top-0 left-0 right-0 bottom-0 bg-black/95 z-[9999] flex flex-col"
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
        >
          {/* Header with close button and logo */}
          <div className="flex justify-between items-center p-4 border-b border-white/10">
            <span className="text-white text-lg font-montserrat">AKASA</span>
            <button
              onClick={toggleMobileMenu}
              className="text-white p-3 touch-manipulation"
              aria-label="Close menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Menu items at the top instead of centered */}
          <div className="flex flex-col items-center w-full pt-4 overflow-y-auto">
            {navItems.map((item, index) => (
              <div
                key={item.name}
                className="w-full mobile-menu-item"
              >
                <MobileNavLink
                  name={item.name}
                  path={item.path}
                  onClick={closeMobileMenu}
                />
              </div>
            ))}
          </div>

          {/* Bottom padding to ensure last item is fully visible */}
          <div className="h-8"></div>
        </div>
      )}
    </div>
  );
});

export default MobileNavigation;
