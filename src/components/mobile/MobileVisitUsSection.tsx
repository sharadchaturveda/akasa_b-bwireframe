"use client";

import Link from "next/link";
import { memo } from "react";
import Image from "next/image";
import { MobilePrimaryButton } from "./MobilePrimaryButton";

/**
 * MobileVisitUsSection Component
 *
 * A mobile-optimized version of the VisitUsSection component
 * with proper layout and text handling for small screens.
 */
const MobileVisitUsSection = memo(function MobileVisitUsSection() {
  return (
    <section id="visit-us" className="w-full relative overflow-hidden">
      {/* Background image with proper mobile sizing */}
      <div className="relative w-full min-h-[90vh]">
        <Image
          src="/images/home/gallery/location.jpg"
          alt="Location background"
          fill
          sizes="100vw"
          className="object-cover"
          quality={75}
          loading="lazy"
          style={{ objectPosition: "center" }}
        />

        {/* Enhanced overlay with gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/40"></div>

        {/* Content container - centered for mobile */}
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="w-full max-w-[90%] bg-black/70 p-6 rounded-lg border border-[#E6C78B]/20 shadow-2xl backdrop-blur-sm animate-fadeSlideUp">
            {/* Decorative corner accents - smaller for mobile */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#E6C78B]/30"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#E6C78B]/30"></div>

            <span className="text-[#E6C78B] text-xs tracking-widest uppercase mb-2 block font-montserrat text-center">Location</span>
            <h2 className="text-2xl font-playfair mb-3 text-white text-center" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>{"Visit Us"}</h2>

            <div className="w-16 h-[1px] bg-gradient-to-r from-[#E6C78B]/80 to-transparent mx-auto mb-4"></div>

            <div className="text-center">
              <p className="text-base font-montserrat text-white/90 mb-2 break-words">{"79 Robinson Road, #01-03 Capitasky,"}</p>
              <p className="text-base font-montserrat text-white/90 mb-5 break-words">{"Tanjong Pagar, Singapore 068897"}</p>
            </div>

            <div className="flex items-center justify-center mb-5">
              <div className="w-8 h-8 rounded-full bg-[#1A2A3A]/80 flex items-center justify-center mr-3 flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#E6C78B" strokeWidth="1.5" />
                  <path d="M12 6V12L16 14" stroke="#E6C78B" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <p className="text-sm font-montserrat text-white/90 break-words">{"Monday to Saturday: 11:30am to 10:00pm"}</p>
            </div>

            <div className="flex flex-col gap-3 justify-center">
              <Link href="https://akasa.oddle.me/en_SG/" className="w-full" target="_blank" rel="noopener noreferrer">
                <MobilePrimaryButton className="uppercase text-center shadow-lg">
                  Order Online
                </MobilePrimaryButton>
              </Link>
              <Link href="/reservations" className="w-full">
                <MobilePrimaryButton className="uppercase text-center shadow-lg">
                  Reserve
                </MobilePrimaryButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default MobileVisitUsSection;

