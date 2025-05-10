"use client";

// REVIEW: Image import is unused
import Link from "next/link";
import { memo } from "react";


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
  // Desktop version
  return (
    <footer className="w-full relative py-8">
      {/* Thin separator line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/20 z-10"></div>

      {/* Background image with blur effect */}
      <div className="absolute inset-0 bg-cover bg-center blur-[2px]" style={{ backgroundImage: "url('/images/common/footer-background.jpg?quality=75&width=1200')" }}></div>

      {/* Dark overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/80"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Copyright */}
          <div className="flex items-center mb-6 md:mb-0">
            <p className="text-xs sm:text-sm text-white/60 font-montserrat">
              {"© 2025 Akasa"}
            </p>
          </div>

          {/* Navigation links */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-6 md:mb-0">
            <Link href="/" className="text-white/80 hover:text-[#E6C78B] transition-colors text-xs sm:text-sm font-montserrat py-1 px-2 touch-manipulation">Home</Link>
            <Link href="/menu" className="text-white/80 hover:text-[#E6C78B] transition-colors text-xs sm:text-sm font-montserrat py-1 px-2 touch-manipulation">Menus</Link>
            <Link href="/events" className="text-white/80 hover:text-[#E6C78B] transition-colors text-xs sm:text-sm font-montserrat py-1 px-2 touch-manipulation">Events</Link>
            <Link href="/offers" className="text-white/80 hover:text-[#E6C78B] transition-colors text-xs sm:text-sm font-montserrat py-1 px-2 touch-manipulation">Offers</Link>
            <Link href="/reservations" className="text-white/80 hover:text-[#E6C78B] transition-colors text-xs sm:text-sm font-montserrat py-1 px-2 touch-manipulation">Reservations</Link>
            <a href="https://akasa.sg/blog" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-[#E6C78B] transition-colors text-xs sm:text-sm font-montserrat py-1 px-2 touch-manipulation">Blogs</a>
          </div>

          {/* Social icons */}
          <div className="flex gap-6 sm:gap-5">
            <SocialIcon href="https://www.instagram.com/akasa.singapore/">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-[18px] sm:h-[18px]">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </SocialIcon>
            <SocialIcon href="https://www.facebook.com/akasa.singapore">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-[18px] sm:h-[18px]">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </SocialIcon>
          </div>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
