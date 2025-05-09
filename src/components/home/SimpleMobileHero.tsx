"use client";

import Image from "next/image";

/**
 * A simplified mobile hero component that just uses an image
 * This is a fallback for when the video version doesn't work
 */
const SimpleMobileHero = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/home/hero/carousel/hero1.jpg"
          alt="Akasa restaurant ambiance"
          fill
          priority
          sizes="100vw"
          quality={80}
          className="object-cover"
        />

        {/* Overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* No text overlay on mobile as per client request */}
    </div>
  );
};

export default SimpleMobileHero;
