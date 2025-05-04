'use client';

import { memo } from "react";
import Image from "next/image";

/**
 * MobileEventsHeroSectionFixed Component
 *
 * A fixed version of the mobile events hero section with proper spacing
 * to avoid collisions with the navigation and ensure proper layout
 */
const MobileEventsHeroSectionFixed = memo(function MobileEventsHeroSectionFixed() {

  return (
    <section className="w-full h-screen relative overflow-hidden events-hero-mobile">
      {/* Background image with proper mobile sizing */}
      <div className="absolute inset-0">
        <Image
          src="/images/events/hero/hero.jpg"
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

        {/* Content container - positioned lower on the screen to avoid navigation */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          {/* Content wrapper with significant top margin to push content down */}
          <div className="mt-28">
            {/* Title with reduced font size */}
            <h1 className="text-2xl font-playfair mb-8 text-white" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
              Events at Akasa
            </h1>

            {/* Gold bar positioned below the heading with increased margin */}
            <div className="w-16 h-[1px] bg-gradient-to-r from-[#E6C78B]/80 to-transparent mx-auto mb-8 gold-bar"></div>

            {/* Description text */}
            <p className="text-sm font-montserrat text-white/90 max-w-xs mx-auto">
              Create unforgettable moments with our bespoke event services, from intimate gatherings to grand celebrations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});

export default MobileEventsHeroSectionFixed;

