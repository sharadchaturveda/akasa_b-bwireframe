"use client";

import Image from "next/image";
import { memo, useEffect, useState } from "react";

/**
 * MobileHomeLogo Component
 *
 * A mobile-optimized logo component specifically for the homepage
 * with proper sizing and positioning
 */
const MobileHomeLogo = memo(function MobileHomeLogo() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="relative w-[140px] h-[140px]"
      style={{
        aspectRatio: '1/1',
        contain: 'layout'
      }}
    >
      <Image
        src="/images/common/logo.svg"
        alt="Akasa Logo"
        fill
        sizes="140px"
        className="object-contain"
        priority
        loading="eager"
        fetchPriority="high"
      />
    </div>
  );
});

export default MobileHomeLogo;
