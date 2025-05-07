"use client";

import { memo } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

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
  navItems: Array<{ name: string; path: string }>;
  
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
  if (!isOpen) return null;
  
  return (
    <div
      className={cn(
        "fixed inset-0 bg-black/95 backdrop-blur-md z-40 flex flex-col items-center justify-center md:hidden",
        className
      )}
    >
      <nav className="w-full max-w-md flex flex-col items-center gap-8 px-6">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.path}
            className="text-white text-2xl font-montserrat uppercase tracking-widest py-2 w-full text-center"
            onClick={onLinkClick}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
});

export default MobileMenuOverlay;
