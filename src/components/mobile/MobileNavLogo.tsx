"use client";

import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

/**
 * MobileNavLogo Component
 *
 * A mobile-optimized navigation logo component that only shows the logo without text.
 * It can be conditionally hidden on specific pages like the homepage.
 */
const MobileNavLogo = memo(function MobileNavLogo({ hideOnHomepage = false }: { hideOnHomepage?: boolean }) {
  // Check if we're on the homepage
  const isHomepage = typeof window !== 'undefined' && (
    window.location.pathname === '/' ||
    window.location.pathname === '/index.html' ||
    window.location.pathname === ''
  );

  // Hide the logo if we're on the homepage and hideOnHomepage is true
  if (isHomepage && hideOnHomepage) {
    return null;
  }

  return (
    <Link href="/" className="flex items-center">
      <div className="relative w-12 h-12">
        <Image
          src="/images/common/logo.svg"
          alt="Akasa Logo"
          fill
          sizes="48px"
          className="object-contain"
          priority
          fetchPriority="high"
        />
      </div>
    </Link>
  );
});

export default MobileNavLogo;
