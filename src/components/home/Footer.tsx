"use client";

import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

// Memoized footer logo component
const FooterLogo = memo(function FooterLogo() {
  return (
    <Image
      src="/images/logo.svg"
      alt="Akasa Logo"
      width={80}
      height={80}
      className="w-[60px] h-auto"
    />
  );
});

// Memoized social icon component
const SocialIcon = memo(function SocialIcon({
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
      className="text-white/80 hover:text-[#E6C78B] transition-colors"
    >
      {children}
    </a>
  );
});

// Memoized footer component
const Footer = memo(function Footer() {
  return (
    <footer className="w-full relative py-8">
      {/* Thin separator line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/20 z-10"></div>

      {/* Background image with blur effect */}
      <div className="absolute inset-0 bg-cover bg-center blur-[2px]" style={{ backgroundImage: "url('/images/footer-bg.jpg?quality=75&width=1200')" }}></div>

      {/* Dark overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/80"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Logo and copyright */}
          <div className="flex items-center mb-4 md:mb-0">
            <div className="mr-4">
              <FooterLogo />
            </div>
            <p className="text-sm text-white/60 font-montserrat">
              {"© 2025 Akasa"}
            </p>
          </div>

          {/* Navigation links */}
          <div className="flex flex-wrap justify-center gap-6 mb-4 md:mb-0">
            <Link href="/" className="text-white/80 hover:text-[#E6C78B] transition-colors text-sm font-montserrat">Home</Link>
            <Link href="/menu" className="text-white/80 hover:text-[#E6C78B] transition-colors text-sm font-montserrat">Menus</Link>
            <Link href="/events" className="text-white/80 hover:text-[#E6C78B] transition-colors text-sm font-montserrat">Events</Link>
            <Link href="/offers" className="text-white/80 hover:text-[#E6C78B] transition-colors text-sm font-montserrat">Offers</Link>
            <Link href="/reservations" className="text-white/80 hover:text-[#E6C78B] transition-colors text-sm font-montserrat">Reservations</Link>
          </div>

          {/* Social icons */}
          <div className="flex gap-5">
            <SocialIcon href="https://instagram.com">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </SocialIcon>
            <SocialIcon href="https://facebook.com">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </SocialIcon>
            <SocialIcon href="https://twitter.com">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </SocialIcon>
          </div>
        </div>
      </div>
    </footer>
  );
});

export default Footer;