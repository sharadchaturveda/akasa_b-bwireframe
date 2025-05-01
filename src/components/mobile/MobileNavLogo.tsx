"use client";

import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

/**
 * MobileNavLogo Component
 * 
 * A mobile-optimized navigation logo component that only shows the logo without text.
 */
const MobileNavLogo = memo(function MobileNavLogo() {
  return (
    <Link href="/" className="flex items-center">
      <div className="relative w-8 h-8">
        <Image
          src="/images/common/logo.svg"
          alt="Akasa Logo"
          fill
          sizes="32px"
          className="object-contain"
          priority
          fetchPriority="high"
        />
      </div>
    </Link>
  );
});

export default MobileNavLogo;
