"use client";

import { usePathname } from 'next/navigation';
import { memo } from 'react';
import { NAVIGATION } from '@/constants';

/**
 * Navigation item type definition
 */
export interface NavItem {
  /**
   * The display name of the navigation item
   */
  name: string;

  /**
   * The URL path of the navigation item
   */
  path: string;
}

/**
 * Props for the NavigationBase component
 */
export interface NavigationBaseProps {
  /**
   * Custom navigation items to override the default ones
   */
  navItems?: NavItem[];
}

/**
 * Result of the useNavigation hook
 */
export interface NavigationResult {
  /**
   * The current pathname
   */
  pathname: string;

  /**
   * Navigation items based on the current page
   */
  navItems: NavItem[];

  /**
   * Whether the current page is the homepage
   */
  isHomePage: boolean;
}

/**
 * Custom hook for navigation logic
 *
 * This hook centralizes the navigation logic for determining
 * which navigation items to display based on the current page.
 *
 * @param {NavItem[]} customNavItems - Optional custom navigation items
 * @returns {NavigationResult} Navigation data
 */
export function useNavigation(customNavItems?: NavItem[]): NavigationResult {
  // Get current pathname
  const pathname = usePathname() || '/';

  // Determine if we're on the homepage
  const isHomePage = pathname === '/';

  // Determine navigation items based on current page
  const navItems = customNavItems || getNavigationItems(pathname);

  return {
    pathname,
    navItems,
    isHomePage
  };
}

/**
 * Helper function to get navigation items based on the current path
 *
 * @param {string} pathname - The current path
 * @returns {NavItem[]} The navigation items to display
 */
function getNavigationItems(pathname: string): NavItem[] {
  const isHomePage = pathname === '/';

  if (isHomePage) {
    return NAVIGATION.HOME_NAV_ITEMS;
  }

  // Filter out the current page from navigation items
  return NAVIGATION.OTHER_NAV_ITEMS.filter(item => item.path !== pathname);
}

/**
 * NavigationBase Component
 *
 * A base component for navigation that handles the common logic
 * for both desktop and mobile navigation.
 *
 * This component doesn't render anything by itself but provides
 * the navigation data to its children.
 *
 * @param {NavigationBaseProps} props - The component props
 * @returns {null} This component doesn't render anything
 */
const NavigationBase = memo(function NavigationBase({
  navItems: customNavItems
}: NavigationBaseProps) {
  // Use the navigation hook
  const { pathname, navItems, isHomePage } = useNavigation(customNavItems);

  // This component doesn't render anything by itself
  return null;
});

export default NavigationBase;
