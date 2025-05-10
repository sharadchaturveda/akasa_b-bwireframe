import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image'
;
import { NAVIGATION } from '@/constants';

interface MobileNavigationProps {
  navItems?: Array<{ name: string; path: string }>;
}

export default function MobileNavigation({ navItems }: MobileNavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname() || '/';

  // Determine navigation items based on current page if not provided
  const items = navItems || (
    pathname === '/'
      ? NAVIGATION.HOME_NAV_ITEMS
      : NAVIGATION.OTHER_NAV_ITEMS.filter(item => item.path !== pathname)
  );

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

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

  return (
    <>
      {/* Absolute positioned header - only visible on mobile */}
      <div
        className="md:hidden absolute top-0 left-0 w-full z-50"
        style={{
          position: 'absolute', // Keep as absolute to stay with hero section
          top: 0,
          left: 0,
          width: '100%',
          height: '80px',
          zIndex: 100,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 20px',
          backgroundColor: 'transparent'
        }}
      >
        {/* Logo */}
        <Link href="/">
          <Image src="/images/brand/logo-white.png"
            alt="Logo"
            width={200}
            height={100}
            priority={true}
            quality={80}
            style={{
              height: '100px',  // Increased from 80px to 100px
              width: 'auto',
              maxWidth: '70vw', // Ensure it doesn't overflow on very small screens
              objectFit: 'contain'
            }}
          />
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
            width: '40px',
            height: '35px',
            position: 'relative',
            zIndex: 101
          }}
        >
          <div
            style={{
              width: '100%',
              height: '5px',
              backgroundColor: 'white',
              borderRadius: '2px',
              transition: 'transform 0.3s, opacity 0.3s',
              transform: isMenuOpen ? 'translateY(15px) rotate(45deg)' : 'none'
            }}
          />
          <div
            style={{
              width: '100%',
              height: '5px',
              backgroundColor: 'white',
              borderRadius: '2px',
              transition: 'opacity 0.3s',
              opacity: isMenuOpen ? 0 : 1
            }}
          />
          <div
            style={{
              width: '100%',
              height: '5px',
              backgroundColor: 'white',
              borderRadius: '2px',
              transition: 'transform 0.3s, opacity 0.3s',
              transform: isMenuOpen ? 'translateY(-15px) rotate(-45deg)' : 'none'
            }}
          />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="md:hidden"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.95)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            zIndex: 99,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <nav style={{
            width: '100%',
            maxWidth: '400px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '30px'
          }}>
            {items.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                style={{
                  color: 'white',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  padding: '10px',
                  width: '100%',
                  textAlign: 'center'
                }}
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

