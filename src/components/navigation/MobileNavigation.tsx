'use client';

import { memo, useEffect } from 'react';
import { useNavigation } from './NavigationBase';
import { useNavigationState } from '@/hooks/useNavigationState';
import HamburgerButton from './HamburgerButton';
import MobileMenuOverlay from './MobileMenuOverlay';
import Logo from '@/components/brand/Logo';
import { cn } from '@/lib/utils';

/**
 * Props for the MobileNavigation component
 */
interface MobileNavigationProps {
  /**
   * Custom navigation items to override the default ones
   */
  navItems?: Array<{ name: string; path: string }>;

  /**
   * Additional CSS classes for the container
   */
  className?: string;
}

/**
 * MobileNavigation Component
 *
 * A navigation component for mobile devices.
 * This component is hidden on desktop devices.
 *
 * @param {MobileNavigationProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
const MobileNavigation = memo(function MobileNavigation({
  navItems: customNavItems,
  className
}: MobileNavigationProps) {
  // Use the navigation hook
  const { navItems } = useNavigation(customNavItems);

  // Use the navigation state hook
  const { isMenuOpen, isScrolled, toggleMenu, setMenuOpen } = useNavigationState({
    scrollThreshold: 100,
    closeOnRouteChange: true,
    preventBodyScroll: true
  });

  // Add media query check to completely disable on desktop
  useEffect(() => {
    // Import the utility function dynamically to avoid server-side rendering issues
    import('@/utils/mobileStyles').then(({ addMobileStyles, removeMobileStyles }) => {
      // Add styles to hide the navigation on desktop
      const styleId = 'mobile-nav-styles';
      addMobileStyles(`
        .mobile-nav-header {
          display: flex;
        }

        @media (min-width: 768px) {
          .mobile-nav-header {
            display: none !important;
          }
        }
      `, styleId);

      // Clean up on unmount
      return () => {
        removeMobileStyles(styleId);
      };
    });
  }, []);

  return (
    <>
      {/* Fixed Mobile Header - Only visible on mobile */}
      <header
        className={cn(
          "mobile-nav-header fixed top-0 left-0 w-full z-50 transition-all duration-300 md:hidden",
          className
        )}
        style={{
          height: '100px', /* Height to accommodate larger logo */
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 20px 0 16px', /* Left padding to prevent logo from hugging the edge */
          backgroundColor: isScrolled ? 'rgba(0,0,0,0.85)' : 'transparent', /* Transparent until scrolled */
          backdropFilter: isScrolled ? 'blur(8px)' : 'none', /* No blur until scrolled */
        }}
      >
        {/* Logo - adjusted position and size for mobile with increased opacity */}
        <Logo
          size="large"
          scale={1.25}
          opacity={1}
          priority={true}
          className="ml-3 z-10"
        />

        {/* Hamburger Button */}
        <HamburgerButton
          isOpen={isMenuOpen}
          onClick={toggleMenu}
          color="white"
          size="medium"
          className="mt-1" /* Adjust vertical alignment with larger logo */
        />
      </header>

      {/* Mobile Menu Overlay - Only visible on mobile */}
      <MobileMenuOverlay
        isOpen={isMenuOpen}
        navItems={navItems}
        onLinkClick={() => setMenuOpen(false)}
        className="mobile-menu-overlay"
      />
    </>
  );
});

export default MobileNavigation;



