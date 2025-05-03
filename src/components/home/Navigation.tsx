"use client";

import Link from "next/link";
import { memo } from "react";
import { usePathname } from "next/navigation";
import { useDeviceDetection } from "@/hooks/useDeviceDetection";
import MobileNavigation from "@/components/mobile/MobileNavigation";
import Loading from "@/components/ui/Loading";

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
      className="uppercase tracking-wider text-base font-montserrat text-white hover:text-white/80 transition-colors duration-200 relative group py-4 px-6 cursor-pointer touch-manipulation z-50 block"
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
      className="uppercase tracking-wider text-2xl font-montserrat text-white py-6 block text-center w-full touch-manipulation"
      onClick={(e) => {
        e.preventDefault();
        onClick();
        window.location.href = path;
      }}
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

  // Use the custom hook for device detection
  const { isMobile, isDetectionComplete } = useDeviceDetection();

  // Show loading state if device detection is not complete
  if (!isDetectionComplete) {
    return (
      <header className="absolute top-0 left-0 right-0 z-40 px-4 md:px-8 py-4 md:py-6">
        <div className="flex justify-center items-center h-12">
          <Loading size="small" text="Loading navigation..." />
        </div>
      </header>
    );
  }

  return (
    <header className="absolute top-0 left-0 right-0 z-40 px-4 md:px-8 py-4 md:py-6">
      {/* Desktop Navigation */}
      <div className="hidden md:flex justify-between items-center">
        {navItems.map((item) => (
          <div key={item.name} className="px-2 py-1">
            <DesktopNavLink
              name={item.name}
              path={item.path}
            />
          </div>
        ))}
      </div>

      {/* Mobile Navigation - Completely separated component */}
      <MobileNavigation navItems={navItems} />
    </header>
  );
}
