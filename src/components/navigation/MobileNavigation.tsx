'use client';

import { memo, useEffect } from 'react';
import { useNavigation, NavItem } from './NavigationBase';
import { useNavigationState } from '@/hooks/useNavigationState';
import HamburgerButton from './HamburgerButton';
import MobileMenuOverlay from './MobileMenuOverlay';
import Logo from '@/components/brand/Logo';
import { cn } from '@/lib/utils';

interface MobileHeaderProps {
  isMenuOpen: boolean;
  isScrolled: boolean;
  toggleMenu: () => void;
  className?: string;
}

const MobileHeader = memo(function MobileHeader({
  isMenuOpen,
  isScrolled,
  toggleMenu,
  className
}: MobileHeaderProps) {
  return (
    <header
      className={cn(
        "mobile-nav-header fixed top-0 left-0 w-full z-50 md:hidden flex justify-between items-center",
        isScrolled ? "bg-black/85" : "bg-transparent",
        className
      )}
      style={{
        height: '70px',
        padding: '0 20px 0 16px',
        transition: 'background-color 0.3s ease',
      }}
    >
      <Logo
        size="large"
        scale={1.1}
        opacity={1}
        priority={true}
        className="ml-3 z-10"
      />

      <HamburgerButton
        isOpen={isMenuOpen}
        onClick={toggleMenu}
        color="white"
        size="medium"
        className="mt-0"
      />
    </header>
  );
});

interface MobileNavigationProps {
  navItems?: NavItem[];
  className?: string;
}

const MobileNavigation = memo(function MobileNavigation({
  navItems: customNavItems,
  className
}: MobileNavigationProps) {
  const { navItems } = useNavigation(customNavItems);
  const { isMenuOpen, isScrolled, toggleMenu, setMenuOpen } = useNavigationState({
    scrollThreshold: 100,
    closeOnRouteChange: true,
    preventBodyScroll: true
  });

  // Add styles to hide navigation on desktop
  useEffect(() => {
    const styleId = 'mobile-nav-styles';
    const style = document.createElement('style');
    style.id = styleId;
    style.innerHTML = `
      .mobile-nav-header {
        display: flex;
      }

      @media (min-width: 768px) {
        .mobile-nav-header {
          display: none !important;
        }
      }
    `;

    document.head.appendChild(style);

    return () => {
      const styleElement = document.getElementById(styleId);
      if (styleElement) {
        document.head.removeChild(styleElement);
      }
    };
  }, []);

  return (
    <>
      <MobileHeader
        isMenuOpen={isMenuOpen}
        isScrolled={isScrolled}
        toggleMenu={toggleMenu}
        className={className}
      />

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
