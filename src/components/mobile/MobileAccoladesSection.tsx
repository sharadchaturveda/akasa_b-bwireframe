"use client";

import Link from "next/link";
import { memo } from "react";
import Image from "next/image";
import { MobilePrimaryButton } from "./MobilePrimaryButton";

/**
 * MobileAccoladesSection Component
 *
 * A mobile-optimized version of the AccoladesSection component
 * with proper layout and text handling for small screens.
 */
const MobileAccoladesSection = memo(function MobileAccoladesSection() {
  return (
    <section className="w-full relative overflow-hidden">
      {/* Background image with proper mobile sizing */}
      <div className="relative w-full h-[100vh]">
        <Image
          src="/images/home/gallery/awards.jpg"
          alt="Awards background"
          fill
          sizes="100vw"
          className="object-cover"
          quality={75}
          loading="lazy"
          style={{ objectPosition: "center" }}
        />

        {/* Enhanced overlay with gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30"></div>

        {/* Subtle animated particles */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-1 h-1 rounded-full bg-[#E6C78B] animate-float" style={{ animationDuration: '15s' }}></div>
          <div className="absolute top-1/3 left-2/3 w-1 h-1 rounded-full bg-[#E6C78B] animate-float" style={{ animationDuration: '20s' }}></div>
          <div className="absolute top-2/3 left-1/3 w-1 h-1 rounded-full bg-[#E6C78B] animate-float" style={{ animationDuration: '25s' }}></div>
        </div>

        {/* Content container - positioned at the bottom for mobile */}
        <div className="absolute bottom-0 left-0 right-0 p-6 pb-12">
          <div className="w-full max-w-[100%] mx-auto bg-black/70 p-6 rounded-lg border border-[#E6C78B]/20 shadow-2xl backdrop-blur-sm animate-fadeSlideUp">
            {/* Decorative corner accents - smaller for mobile */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#E6C78B]/30"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#E6C78B]/30"></div>

            <span className="text-[#E6C78B] text-xs tracking-widest uppercase mb-2 block font-montserrat">Awards & Recognition</span>
            <h2 className="text-2xl font-playfair mb-2 text-white break-words" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>{"Celebrated & Savored"}</h2>

            <div className="w-12 h-[1px] bg-gradient-to-r from-[#E6C78B]/80 to-transparent mb-3"></div>

            <p className="text-sm italic font-montserrat mb-4 text-white/90 break-words">{"Where spice meets soul – Indian cuisine, reimagined with passion and precision."}</p>

            <div className="flex flex-col gap-3 w-full">
              <Link href="/order" className="w-full">
                <MobilePrimaryButton className="text-center shadow-lg">
                  Order Online
                </MobilePrimaryButton>
              </Link>
              <Link href="/reservations" className="w-full">
                <MobilePrimaryButton className="text-center shadow-lg">
                  Make a Reservation
                </MobilePrimaryButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default MobileAccoladesSection;

