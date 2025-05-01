"use client";

import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

/**
 * MobileFooterLogo Component
 * A mobile-optimized footer logo component
 */
const MobileFooterLogo = memo(function MobileFooterLogo() {
  return (
    <Image
      src="/images/common/logo.svg"
      alt="Akasa Logo"
      width={60}
      height={60}
      className="w-[50px] h-auto"
    />
  );
});

/**
 * MobileSocialIcon Component
 * A mobile-optimized social icon component
 */
const MobileSocialIcon = memo(function MobileSocialIcon({
  href,
  children
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-white/80 hover:text-[#E6C78B] transition-colors p-2 touch-manipulation"
    >
      {children}
    </a>
  );
});

/**
 * MobileFooter Component
 * A mobile-optimized footer component with proper text alignment and spacing
 */
const MobileFooter = memo(function MobileFooter() {
  return (
    <footer className="w-full relative py-8">
      {/* Thin separator line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/20 z-10"></div>

      {/* Background image with blur effect */}
      <div className="absolute inset-0 bg-cover bg-center blur-[2px]" style={{ backgroundImage: "url('/images/common/footer-bg.jpg?quality=75&width=800')" }}></div>

      {/* Dark overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/80"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Logo and copyright - centered on mobile */}
        <div className="flex flex-col items-center mb-6">
          <div className="mb-3">
            <MobileFooterLogo />
          </div>
          <p className="text-xs text-white/60 font-montserrat text-center">
            © 2025 Akasa
          </p>
        </div>

        {/* Navigation links - Properly spaced for mobile */}
        <div className="grid grid-cols-3 gap-y-4 justify-items-center mb-6">
          <Link href="/" className="text-white/80 hover:text-[#E6C78B] transition-colors text-xs font-montserrat py-1 touch-manipulation">
            Home
          </Link>
          <Link href="/menu" className="text-white/80 hover:text-[#E6C78B] transition-colors text-xs font-montserrat py-1 touch-manipulation">
            Menus
          </Link>
          <Link href="/events" className="text-white/80 hover:text-[#E6C78B] transition-colors text-xs font-montserrat py-1 touch-manipulation">
            Events
          </Link>
          <Link href="/offers" className="text-white/80 hover:text-[#E6C78B] transition-colors text-xs font-montserrat py-1 touch-manipulation">
            Offers
          </Link>
          <Link href="/reservations" className="text-white/80 hover:text-[#E6C78B] transition-colors text-xs font-montserrat py-1 touch-manipulation">
            Reservations
          </Link>
        </div>

        {/* Social icons - Centered and properly spaced */}
        <div className="flex justify-center gap-8">
          <MobileSocialIcon href="https://instagram.com">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </MobileSocialIcon>
          <MobileSocialIcon href="https://facebook.com">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
          </MobileSocialIcon>
          <MobileSocialIcon href="https://twitter.com">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
            </svg>
          </MobileSocialIcon>
        </div>
      </div>
    </footer>
  );
});

export default MobileFooter;
