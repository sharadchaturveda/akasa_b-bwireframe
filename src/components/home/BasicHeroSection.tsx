import React from 'react';
import Image from 'next/image'
;

export default function BasicHeroSection() {
  return (
    <section className="relative w-full h-screen bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image src="/images/home/hero/hero-home.jpg"
          alt="Hero background"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30 z-10"></div>
      </div>

      {/* Content Container - Using grid for clear separation */}
      <div className="absolute inset-0 grid grid-rows-[auto_1fr] gap-8">
        {/* Logo Container - Fixed at top */}
        <div className="w-full flex justify-center pt-16 md:pt-24">
          {/* Using Next.js Image component for better optimization */}
          <div className="relative w-auto h-16 md:h-20">
            <Image src="/images/brand/logo-white.png"
              alt="Akasa Logo"
              width={160}
              height={80}
              priority
              className="w-auto h-full"
            />
          </div>
        </div>

        {/* Text Content - In its own container */}
        <div className="flex flex-col items-center justify-center px-4 text-center">
          <p className="text-white/90 uppercase tracking-widest text-sm md:text-base mb-4">
            Experience
          </p>

          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-playfair italic mb-6"
              style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
            Exquisite Indian Cuisine
          </h1>
        </div>
      </div>
    </section>
  );
}



