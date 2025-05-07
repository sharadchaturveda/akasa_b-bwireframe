"use client";

import { usePathname } from 'next/navigation';
import { memo } from 'react';
import { NAVIGATION } from '@/constants';

/**
 * Props for the NavigationBase component
 */
export interface NavigationBaseProps {
  /**
   * Custom navigation items to override the default ones
   */
  navItems?: Array<{ name: string; path: string }>;
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
  navItems: Array<{ name: string; path: string }>;
  
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
 * @param {Array<{ name: string; path: string }>} customNavItems - Optional custom navigation items
 * @returns {NavigationResult} Navigation data
 */
export function useNavigation(
  customNavItems?: Array<{ name: string; path: string }>
): NavigationResult {
  // Get current pathname
  const pathname = usePathname() || '/';
  
  // Determine if we're on the homepage
  const isHomePage = pathname === '/';
  
  // Determine navigation items based on current page
  const navItems = customNavItems || (
    isHomePage
      ? NAVIGATION.HOME_NAV_ITEMS
      : NAVIGATION.OTHER_NAV_ITEMS.filter(item => item.path !== pathname)
  );
  
  return {
    pathname,
    navItems,
    isHomePage
  };
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
