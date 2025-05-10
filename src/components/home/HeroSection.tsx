'use client';

import Image from 'next/image'
;

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen bg-black">
      {/* Background Image using Next.js Image for better optimization */}
      <div className="absolute inset-0">
        <Image src="/images/home/hero/hero-home.jpg"
          alt="Hero background"
          fill
          priority
          sizes="100vw"
          quality={80} /* Balanced for performance and quality */
          className="object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col items-center">
        {/* Desktop Logo - Always visible on desktop */}
        <div className="hidden md:block mt-24 mb-16 relative h-[120px] w-[240px]">
          <Image src="/images/brand/logo-white.png"
            alt="Akasa Logo"
            width={240}
            height={120}
            priority
            quality={85} /* High quality for logo, balanced for performance */
            className="w-full h-full object-contain"
          />
        </div>

        {/* Text Content */}
        <div className="text-center px-4 max-w-4xl mx-auto mt-32 md:mt-0">
          <span className="block text-xs sm:text-sm md:text-base text-white/90 font-montserrat tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-2 sm:mb-3">
            Experience
          </span>

          <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white italic mb-4 sm:mb-6"
              style={{ textShadow: '0 4px 6px rgba(0, 0, 0, 0.3)', lineHeight: '1.2' }}>
            Exquisite Indian Cuisine
          </h1>
        </div>
      </div>
    </section>
  );
}




