"use client";

import { usePathname } from 'next/navigation';
import { NAVIGATION } from '@/constants';

export interface NavItem {
  name: string;
  path: string;
}

export interface NavigationResult {
  pathname: string;
  navItems: NavItem[];
  isHomePage: boolean;
}

export function useNavigation(customNavItems?: NavItem[]): NavigationResult {
  const pathname = usePathname() || '/';
  const isHomePage = pathname === '/';
  const navItems = customNavItems || getNavigationItems(pathname);

  return {
    pathname,
    navItems,
    isHomePage
  };
}

function getNavigationItems(pathname: string): NavItem[] {
  const isHomePage = pathname === '/';

  if (isHomePage) {
    return NAVIGATION.HOME_NAV_ITEMS;
  }

  return NAVIGATION.OTHER_NAV_ITEMS.filter(item => item.path !== pathname);
}
