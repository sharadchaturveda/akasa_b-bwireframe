"use client";

import { memo } from "react";
import Image from "next/image";

/**
 * MobileEventsHeroSection Component
 *
 * A mobile-optimized version of the Events page hero section
 */
const MobileEventsHeroSection = memo(function MobileEventsHeroSection() {
  return (
    <section className="w-full relative overflow-hidden">
      {/* Background image with proper mobile sizing */}
      <div className="relative w-full h-[65vh]">
        <Image
          src="/images/events/hero.jpg"
          alt="Events at Akasa"
          fill
          sizes="100vw"
          className="object-cover"
          quality={75}
          priority
          style={{ objectPosition: "center" }}
        />

        {/* Enhanced overlay with gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40"></div>

        {/* Content container - centered for mobile with extra top padding */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 pt-24 text-center">
          {/* Added mt-12 to push content down and away from navigation */}
          <div className="mt-12">
            <h1 className="text-2xl sm:text-3xl font-playfair mb-4 text-white" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
              Events at Akasa
            </h1>

            {/* Moved the gold bar below the heading */}
            <div className="w-16 h-[1px] bg-gradient-to-r from-[#E6C78B]/80 to-transparent mx-auto mb-5"></div>

            <p className="text-sm font-montserrat text-white/90 max-w-xs mx-auto">
              Create unforgettable moments with our bespoke event services, from intimate gatherings to grand celebrations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});

export default MobileEventsHeroSection;
