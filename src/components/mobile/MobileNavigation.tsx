"use client";

import { useState, useCallback, memo } from "react";

interface MobileNavigationProps {
  navItems: Array<{ name: string; path: string }>;
}

/**
 * MobileNavLink Component
 * 
 * A mobile-optimized navigation link component with improved accessibility.
 * Optimized for touch interactions and performance.
 * 
 * @param {Object} props - Component props
 * @param {string} props.name - The name of the navigation item
 * @param {string} props.path - The path to navigate to
 * @param {Function} props.onClick - The function to call when clicked
 * @returns {JSX.Element} The rendered component
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
      className="mobile-menu-item uppercase tracking-wider text-xl sm:text-2xl font-montserrat text-white py-4 px-4 block text-center w-full touch-manipulation min-h-[60px] flex items-center justify-center overflow-hidden"
      onClick={(e) => {
        e.preventDefault();
        onClick();
        window.location.href = path;
      }}
      role="menuitem"
    >
      {name}
    </a>
  );
});

/**
 * MobileNavigation Component
 * 
 * A dedicated mobile navigation component optimized for mobile devices.
 * Handles menu toggling and body scroll locking.
 * 
 * @param {MobileNavigationProps} props - Component props
 * @returns {JSX.Element} The rendered component
 */
const MobileNavigation = memo(function MobileNavigation({ navItems }: MobileNavigationProps) {
  // State for mobile menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle menu state and body scroll
  const handleMenuState = useCallback((isOpen: boolean) => {
    // Update body styles based on menu state
    document.body.style.overflow = isOpen ? 'hidden' : '';
    document.body.style.willChange = isOpen ? 'transform' : 'auto';
    
    // Toggle body class
    if (isOpen) {
      document.body.classList.add('mobile-menu-open');
      // Force the menu to be at the top of the screen
      window.scrollTo(0, 0);
    } else {
      document.body.classList.remove('mobile-menu-open');
    }
  }, []);

  // Toggle mobile menu
  const toggleMobileMenu = useCallback(() => {
    const newState = !mobileMenuOpen;
    setMobileMenuOpen(newState);
    handleMenuState(newState);
  }, [mobileMenuOpen, handleMenuState]);

  // Close mobile menu
  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
    handleMenuState(false);
  }, [handleMenuState]);

  return (
    <div className="md:hidden w-full">
      {/* Mobile Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 z-[100] px-4 py-3">
        <div className="flex justify-end items-center">
          <button
            onClick={toggleMobileMenu}
            className="text-white p-3 rounded-full bg-black/30 flex items-center justify-center touch-manipulation min-w-[48px] min-h-[48px]"
            aria-label="Toggle menu"
            style={{ willChange: 'transform' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="mobile-menu-overlay fixed top-0 left-0 right-0 bottom-0 bg-black/90 backdrop-blur-lg z-[9999] flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          {/* Header with close button and logo */}
          <div className="flex justify-between items-center p-4 border-b border-white/10">
            <span className="text-white text-lg font-montserrat">AKASA</span>
            <button
              onClick={toggleMobileMenu}
              className="text-white p-3 rounded-full min-w-[48px] min-h-[48px] flex items-center justify-center touch-manipulation"
              aria-label="Close menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Menu items */}
          <nav className="flex flex-col items-center w-full pt-6 overflow-y-auto">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="w-full mobile-menu-item py-2"
              >
                <MobileNavLink
                  name={item.name}
                  path={item.path}
                  onClick={closeMobileMenu}
                />
              </div>
            ))}
          </nav>

          {/* Bottom padding */}
          <div className="h-16"></div>
        </div>
      )}
    </div>
  );
});

export default MobileNavigation;
