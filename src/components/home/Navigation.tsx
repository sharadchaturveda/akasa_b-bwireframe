"use client";

import Link from "next/link";
import { useState, useCallback, memo } from "react";
import { usePathname } from "next/navigation";

// Navigation items for homepage
const homeNavItems = [
  { name: "MENUS", path: "/menu" },
  { name: "EVENTS", path: "/events" },
  { name: "OFFERS", path: "/offers" },
  { name: "RESERVATIONS", path: "/reservations" }
];

// Navigation items for other pages - includes Home link
const otherPagesNavItems = [
  { name: "HOME", path: "/" },
  { name: "MENUS", path: "/menu" },
  { name: "EVENTS", path: "/events" },
  { name: "OFFERS", path: "/offers" },
  { name: "RESERVATIONS", path: "/reservations" }
];

// Desktop navigation link
const DesktopNavLink = memo(function DesktopNavLink({ name, path }: { name: string; path: string }) {
  return (
    <Link
      href={path}
      className="uppercase tracking-wider text-base font-montserrat text-white hover:text-white/80 transition-colors duration-200 relative group py-2 px-3"
    >
      {name}
      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-300"></span>
    </Link>
  );
});

// Mobile navigation link
const MobileNavLink = memo(function MobileNavLink({
  name,
  path,
  onClick
}: {
  name: string;
  path: string;
  onClick: () => void;
}) {
  return (
    <a
      href={path}
      className="uppercase tracking-wider text-2xl font-montserrat text-white py-4 block text-center"
      onClick={onClick}
    >
      {name}
    </a>
  );
});

export default function Navigation() {
  // Get current pathname
  const pathname = usePathname() || '/';

  // Use homepage navigation items if on homepage, otherwise use other pages navigation items
  let navItems = pathname === '/' ? homeNavItems : otherPagesNavItems;

  // Filter out the current page from navigation items
  navItems = navItems.filter(item => item.path !== pathname);

  // State for mobile menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Toggle mobile menu
  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
    // Toggle body scroll
    document.body.style.overflow = !mobileMenuOpen ? 'hidden' : '';
  }, [mobileMenuOpen]);

  // Close mobile menu
  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
    document.body.style.overflow = '';
  }, []);

  return (
    <header className="absolute top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 md:py-6">
      {/* Desktop Navigation */}
      <div className="hidden md:flex justify-between items-center">
        {navItems.map((item) => (
          <DesktopNavLink
            key={item.name}
            name={item.name}
            path={item.path}
          />
        ))}
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex justify-between items-center">
        <Link href="/" className="uppercase tracking-wide text-lg font-montserrat text-white">{"Akasa"}</Link>
        <button
          onClick={toggleMobileMenu}
          className="text-white p-3 rounded-md border border-white/20 flex items-center justify-center"
          aria-label="Toggle menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* Mobile Menu - Ultra Simple Version */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
          {/* Header with close button */}
          <div className="flex justify-between items-center p-4 border-b border-white/10">
            <span className="uppercase tracking-wide text-lg font-montserrat text-white">{"Akasa"}</span>
            <button
              onClick={toggleMobileMenu}
              className="text-white p-3"
              aria-label="Close menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Menu items */}
          <div className="flex-1 flex flex-col justify-center items-center gap-6">
            {navItems.map((item) => (
              <MobileNavLink
                key={item.name}
                name={item.name}
                path={item.path}
                onClick={closeMobileMenu}
              />
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
