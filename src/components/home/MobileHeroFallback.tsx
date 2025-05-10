"use client";

import Image from "next/image";

/**
 * Fallback component for the mobile hero when video fails to load
 */
const MobileHeroFallback = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-black z-[4]">
      {/* Fallback image */}
      <div className="absolute inset-0 bg-black">
        <Image
          src="/images/home/hero/carousel/hero1.jpg"
          alt="Akasa restaurant ambiance"
          fill
          priority
          sizes="100vw"
          quality={80}
          className="object-cover object-center"
        />
      </div>

      {/* Overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* No text overlay on mobile as per client request */}
    </div>
  );
};

export default MobileHeroFallback;
