"use client";

import { memo, useState } from 'react';
import Image from "next/image";

/**
 * A simplified mobile hero component that just uses an image
 * This is a fallback for when the video version doesn't work
 */
const SimpleMobileHero = memo(function SimpleMobileHero() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Hero image - no darkening overlay as per client request */}
      <div className="absolute inset-0 z-10">
        <Image
          src="/images/home/hero/carousel/hero1.jpg"
          alt="Akasa restaurant ambiance"
          fill
          priority
          sizes="100vw"
          quality={90}
          className="object-cover"
          style={{
            filter: 'brightness(1.15)',
            objectFit: 'cover',
            objectPosition: 'center',
            transform: 'translateZ(0)', // Force hardware acceleration
            willChange: 'transform' // Hint to browser to optimize
          }}
          onLoad={() => setIsLoaded(true)}
        />
      </div>
    </div>
  );
});

export default SimpleMobileHero;
