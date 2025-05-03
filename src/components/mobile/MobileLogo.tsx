"use client";

import Image from "next/image";
import { memo } from "react";

/**
 * MobileLogo Component
 *
 * A mobile-optimized logo component with proper sizing and positioning
 */
const MobileLogo = memo(function MobileLogo() {
  return (
    <div
      className="relative w-[80px] h-[80px]"
      style={{
        aspectRatio: '1/1',
        contain: 'layout'
      }}
    >
      <Image
        src="/images/common/logo.svg"
        alt="Akasa Logo"
        fill
        sizes="80px"
        className="object-contain"
        priority
        loading="eager"
        fetchPriority="high"
      />
    </div>
  );
});

export default MobileLogo;
