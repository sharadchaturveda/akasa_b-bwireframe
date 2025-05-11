"use client";

import { memo } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { NavItem } from './NavigationBase';

/**
 * Props for the MobileNavLink component
 */
interface MobileNavLinkProps {
  /**
   * The navigation item
   */
  item: NavItem;

  /**
   * Function to call when the link is clicked
   */
  onClick?: () => void;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * MobileNavLink Component
 *
 * A navigation link component for mobile navigation.
 *
 * @param {MobileNavLinkProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
const MobileNavLink = memo(function MobileNavLink({
  item,
  onClick,
  className
}: MobileNavLinkProps) {
  return (
    <Link
      href={item.path}
      className={cn(
        "text-white text-2xl font-montserrat uppercase tracking-widest py-2 w-full text-center",
        className
      )}
      onClick={onClick}
    >
      {item.name}
    </Link>
  );
});

/**
 * Props for the MobileMenuOverlay component
 */
export interface MobileMenuOverlayProps {
  /**
   * Whether the menu is open
   */
  isOpen: boolean;

  /**
   * Navigation items to display
   */
  navItems: NavItem[];

  /**
   * Function to call when a link is clicked
   */
  onLinkClick?: () => void;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * MobileMenuOverlay Component
 *
 * An overlay component for mobile navigation.
 *
 * @param {MobileMenuOverlayProps} props - The component props
 * @returns {JSX.Element | null} The rendered component or null if not open
 */
const MobileMenuOverlay = memo(function MobileMenuOverlay({
  isOpen,
  navItems,
  onLinkClick,
  className
}: MobileMenuOverlayProps) {
  // Don't render anything if the menu is closed
  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 bg-black/95 z-40 flex flex-col items-center justify-center md:hidden",
        className
      )}
    >
      <nav className="w-full max-w-md flex flex-col items-center gap-8 px-6">
        {navItems.map((item) => (
          <MobileNavLink
            key={item.name}
            item={item}
            onClick={onLinkClick}
          />
        ))}
      </nav>
    </div>
  );
});

export default MobileMenuOverlay;
