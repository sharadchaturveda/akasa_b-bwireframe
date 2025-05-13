"use client";

import { memo } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { NavItem } from './NavigationBase';

interface MobileNavLinkProps {
  item: NavItem;
  onClick?: () => void;
  className?: string;
}

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

export interface MobileMenuOverlayProps {
  isOpen: boolean;
  navItems: NavItem[];
  onLinkClick?: () => void;
  className?: string;
}

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
