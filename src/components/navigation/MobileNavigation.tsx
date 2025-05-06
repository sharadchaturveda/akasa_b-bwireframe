'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAVIGATION } from '@/constants';
import Image from 'next/image';

export default function MobileNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname() || '/';

  // Determine navigation items based on current page
  const navItems = pathname === '/'
    ? NAVIGATION.HOME_NAV_ITEMS
    : NAVIGATION.OTHER_NAV_ITEMS.filter(item => item.path !== pathname);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Handle scroll events to show/hide the header
  useEffect(() => {
    const handleScroll = () => {
      // Only show background after scrolling down 100px
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Add media query check to completely disable on desktop
  useEffect(() => {
    const checkIfMobile = () => {
      const header = document.querySelector('.mobile-nav-header');
      if (header) {
        if (window.innerWidth >= 768) { // md breakpoint is typically 768px
          header.classList.add('hidden-important');
        } else {
          header.classList.remove('hidden-important');
        }
      }
    };

    // Add the style for .hidden-important
    const style = document.createElement('style');
    style.innerHTML = '.hidden-important { display: none !important; }';
    document.head.appendChild(style);

    // Run on mount and on resize
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
      {/* Fixed Mobile Header - Only visible on mobile */}
      <header
        className="mobile-nav-header fixed top-0 left-0 w-full z-50 transition-all duration-300 md:hidden"
        style={{
          height: '100px', /* Further increased height to accommodate larger logo */
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 20px 0 16px', /* Added more left padding to prevent logo from hugging the edge */
          backgroundColor: isScrolled ? 'rgba(0,0,0,0.85)' : 'transparent', /* Transparent until scrolled */
          backdropFilter: isScrolled ? 'blur(8px)' : 'none', /* No blur until scrolled */
        }}
      >
        {/* Logo - adjusted position and size for mobile with increased opacity */}
        <Link href="/" className="relative h-[130px] w-[240px] ml-3 z-10">
          <div className="absolute inset-0 flex items-center" style={{ transform: 'translateX(0px)' }}>
            {/* No background for the logo */}

            <Image
              src="/images/brand/logo-white.png"
              alt="Logo"
              fill
              priority
              sizes="240px"
              className="object-contain object-left"
              style={{
                maxWidth: '75vw',
                transform: 'scale(1.25)',
                opacity: 1 /* Ensure full opacity */
              }}
            />
          </div>
        </Link>

        {/* Hamburger Button */}
        <button
          aria-label="Menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '30px',
            height: '24px',
            marginTop: '5px', /* Adjust vertical alignment with larger logo */
          }}
        >
          <span
            style={{
              width: '100%',
              height: '3px',
              backgroundColor: 'white',
              borderRadius: '2px',
              transition: 'transform 0.3s, opacity 0.3s',
              transform: isMenuOpen ? 'translateY(10px) rotate(45deg)' : 'none'
            }}
          />
          <span
            style={{
              width: '100%',
              height: '3px',
              backgroundColor: 'white',
              borderRadius: '2px',
              transition: 'opacity 0.3s',
              opacity: isMenuOpen ? 0 : 1
            }}
          />
          <span
            style={{
              width: '100%',
              height: '3px',
              backgroundColor: 'white',
              borderRadius: '2px',
              transition: 'transform 0.3s, opacity 0.3s',
              transform: isMenuOpen ? 'translateY(-10px) rotate(-45deg)' : 'none'
            }}
          />
        </button>
      </header>

      {/* Mobile Menu Overlay - Only visible on mobile */}
      {isMenuOpen && (
        <div
          className="mobile-menu-overlay fixed inset-0 bg-black/95 backdrop-blur-md z-40 flex flex-col items-center justify-center md:hidden"
        >
          <nav className="w-full max-w-md flex flex-col items-center gap-8 px-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className="text-white text-2xl font-montserrat uppercase tracking-widest py-2 w-full text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}



