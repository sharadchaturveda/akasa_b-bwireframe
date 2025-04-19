"use client";

import Image from "next/image";
import { memo } from "react";

// Memoized footer logo component
const FooterLogo = memo(function FooterLogo() {
  return (
    <Image
      src="/images/logo.png"
      alt="Akasa Logo"
      width={80}
      height={80}
      loading="lazy"
      quality={80}
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
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
      {children}
    </a>
  );
});

// Memoized footer component
const Footer = memo(function Footer() {
  return (
    <footer className="h-40 w-full relative flex items-center justify-center pt-0">
      {/* Thin separator line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/20 z-10"></div>

      {/* Background image */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/footer-bg.jpg?quality=75&width=1200')" }}></div>

      {/* Dark overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10 flex flex-col items-center justify-center gap-2">
        <div className="bg-white/20 p-2 rounded-full mb-2">
          <FooterLogo />
        </div>
        <div className="flex gap-5 mb-2">
          <SocialIcon href="https://instagram.com">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </SocialIcon>
          <SocialIcon href="https://facebook.com">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
          </SocialIcon>
          <SocialIcon href="https://twitter.com">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
            </svg>
          </SocialIcon>
        </div>
        <p className="text-sm text-white/70 font-montserrat">{"© 2025 Akasa Singapore"}</p>
      </div>
    </footer>
  );
});

export default Footer;