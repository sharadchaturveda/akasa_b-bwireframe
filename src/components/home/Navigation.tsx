import { usePathname } from 'next/navigation';
import DesktopNavLink from './DesktopNavLink';
import { NAVIGATION } from '@/constants';

export default function Navigation() {
  // Get current pathname
  const pathname = usePathname() || '/';

  // Determine navigation items based on current page
  const navItems = pathname === '/'
    ? NAVIGATION.HOME_NAV_ITEMS
    : NAVIGATION.OTHER_NAV_ITEMS.filter(item => item.path !== pathname);

  return (
    <>
      {/* Desktop Navigation - only visible on desktop */}
      <header className="absolute top-0 left-0 right-0 z-40 px-4 md:px-8 py-4 md:py-6 hidden md:block">
        <div className="flex justify-between items-center">
          {navItems.map((item) => (
            <div key={item.name} className="px-2 py-1">
              <DesktopNavLink
                name={item.name}
                path={item.path}
              />
            </div>
          ))}
        </div>
      </header>

      {/* Mobile Navigation is now handled directly in the HeroSection component */}
    </>
  );
}
