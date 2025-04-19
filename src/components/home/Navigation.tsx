"use client";

import Link from "next/link";
import { useState, useCallback, memo } from "react";

// Navigation items - memoized outside component to prevent re-creation
const navItems = [
  { name: "HOME", path: "/" },
  { name: "MENU", path: "/menu" },
  { name: "OUR CHEF", path: "/chef" },
  { name: "RESERVATIONS", path: "/reservations" }
];

// Memoized navigation link to prevent unnecessary re-renders
const NavLink = memo(function NavLink({
  name,
  path,
  isMobile = false,
  onClick = () => {}
}: {
  name: string;
  path: string;
  isMobile?: boolean;
  onClick?: () => void;
}) {
  return isMobile ? (
    <Link
      href={path}
      className={`uppercase tracking-wider text-xl font-montserrat text-white hover:text-white/80 transition-all duration-300 relative group opacity-0 animate-fadeIn`}
      onClick={onClick}
      style={{ animationDelay: `${navItems.findIndex(item => item.name === name) * 100}ms`, animationFillMode: 'forwards' }}
    >
      {name}
      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-300"></span>
    </Link>
  ) : (
    <Link
      href={path}
      className="uppercase tracking-wider text-base font-montserrat text-white hover:text-white/80 transition-colors duration-200 relative group"
    >
      {name}
      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-300"></span>
    </Link>
  );
});

export default function Navigation() {
  // State for mobile menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Memoized toggle function to prevent re-creation on renders
  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  return (
    <header className="absolute top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 md:py-6">
      {/* Desktop Navigation */}
      <div className="hidden md:flex justify-between items-center">
        {navItems.map((item) => (
          <NavLink
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
          className="text-white p-2 rounded-md border border-white/20 flex items-center justify-center transition-all duration-300 hover:bg-white/10"
          aria-label="Toggle menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-black/95 z-40 md:hidden flex flex-col items-center justify-center transition-opacity duration-300 will-change-opacity ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        {/* Close button at top right */}
        <button
          onClick={toggleMobileMenu}
          className="absolute top-4 right-4 text-white p-3 rounded-full bg-[#1A2A3A] hover:bg-[#0A1A2A] transition-all duration-300 flex items-center justify-center shadow-lg"
          aria-label="Close menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className={`flex flex-col items-center gap-8 transition-transform duration-500 ${mobileMenuOpen ? 'translate-y-0' : 'translate-y-10'}`}>
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              name={item.name}
              path={item.path}
              isMobile={true}
              onClick={() => setMobileMenuOpen(false)}
            />
          ))}
        </div>
      </div>
    </header>
  );
}
