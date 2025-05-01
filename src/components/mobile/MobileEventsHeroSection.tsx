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
      <div className="relative w-full h-[60vh]">
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
        
        {/* Content container - centered for mobile */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          <h1 className="text-3xl font-playfair mb-3 text-white" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
            Events at Akasa
          </h1>
          
          <div className="w-16 h-[1px] bg-gradient-to-r from-[#E6C78B]/80 to-transparent mx-auto mb-4"></div>
          
          <p className="text-sm font-montserrat text-white/90 max-w-xs mx-auto">
            Create unforgettable moments with our bespoke event services, from intimate gatherings to grand celebrations.
          </p>
        </div>
      </div>
    </section>
  );
});

export default MobileEventsHeroSection;
