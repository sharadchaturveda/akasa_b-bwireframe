"use client";

import { memo } from 'react';
import Link from 'next/link';
import { useNavigation, NavItem } from './NavigationBase';
import { cn } from '@/lib/utils';

/**
 * Props for the NavLink component
 */
interface NavLinkProps {
  /**
   * The navigation item
   */
  item: NavItem;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * NavLink Component
 *
 * A reusable navigation link component.
 *
 * @param {NavLinkProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
const NavLink = memo(function NavLink({
  item,
  className
}: NavLinkProps) {
  return (
    <Link
      href={item.path}
      className={cn(
        "text-white text-sm md:text-base font-montserrat tracking-widest uppercase hover:opacity-70 transition-opacity duration-300",
        className
      )}
    >
      {item.name}
    </Link>
  );
});

/**
 * Props for the DesktopNavigation component
 */
export interface DesktopNavigationProps {
  /**
   * Custom navigation items to override the default ones
   */
  navItems?: NavItem[];

  /**
   * Additional CSS classes for the container
   */
  className?: string;
}

/**
 * DesktopNavigation Component
 *
 * A navigation component for desktop devices.
 * This component is hidden on mobile devices.
 *
 * @param {DesktopNavigationProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
const DesktopNavigation = memo(function DesktopNavigation({
  navItems: customNavItems,
  className
}: DesktopNavigationProps) {
  // Use the navigation hook
  const { navItems } = useNavigation(customNavItems);

  return (
    <header className={cn(
      "absolute top-0 left-0 right-0 z-40 px-4 md:px-8 py-4 md:py-6 hidden md:block",
      className
    )}>
      <nav className="flex justify-between items-center">
        {navItems.map((item) => (
          <div key={item.name} className="px-2 py-1">
            <NavLink item={item} />
          </div>
        ))}
      </nav>
    </header>
  );
});

export default DesktopNavigation;
