"use client";

import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { MobilePrimaryButton } from "./MobilePrimaryButton";

/**
 * MobileOffersHeroSection Component
 *
 * A mobile-optimized version of the Offers page hero section
 * Using the same content as the desktop version
 */
const MobileOffersHeroSection = memo(function MobileOffersHeroSection() {
  return (
    <section className="w-full relative overflow-hidden min-h-[80vh] flex items-center">
      {/* Background image with parallax effect - mobile optimized */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/offers/gallery5.jpg"
          alt="Offers background"
          fill
          sizes="100vw"
          className="object-cover"
          quality={70}
          priority
          loading="eager"
          style={{
            objectPosition: "center",
            opacity: 0.6
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-black/80"></div>
      </div>

      {/* Decorative elements - simplified for mobile */}
      <div className="absolute top-0 left-0 w-full h-10 bg-gradient-to-b from-black to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-black to-transparent"></div>
      <div className="absolute top-20 right-10 w-20 h-20 rounded-full bg-[#E6C78B]/10 blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-30 h-30 rounded-full bg-[#E6C78B]/5 blur-3xl"></div>

      <div className="relative z-10 px-4 w-full">
        <div className="max-w-md mx-auto text-center">
          {/* Elegant heading with decorative elements */}
          <div className="mb-6 relative">
            <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-16 h-0.5 bg-gradient-to-r from-transparent via-[#E6C78B] to-transparent"></div>
            <h1 className="text-3xl font-playfair mb-4 relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">Special Offers & Promotions</span>
              <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#E6C78B]/80 to-transparent"></div>
            </h1>
          </div>

          <p className="text-base font-montserrat text-white/90 mb-8 leading-relaxed max-w-xs mx-auto">
            {"Discover our exclusive deals and seasonal promotions designed to enhance your dining experience at Akasa."}
          </p>

          {/* Standardized button */}
          <Link href="#current-offers">
            <MobilePrimaryButton>
              View Offers
            </MobilePrimaryButton>
          </Link>

          {/* Decorative element */}
          <div className="flex justify-center mt-10">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-[#1A2A3A] opacity-30"></div>
              <svg className="w-6 h-6 text-[#E6C78B]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21.41,11.58L12.41,2.58C12.04,2.21 11.53,2 11,2H4C2.9,2 2,2.9 2,4V11C2,11.53 2.21,12.04 2.59,12.41L3,12.81C3.9,12.27 4.94,12 6,12A6,6 0 0,1 12,18C12,19.06 11.73,20.1 11.19,21L11.59,21.4C11.96,21.78 12.47,22 13,22H20C21.1,22 22,21.1 22,20V13C22,12.47 21.79,11.96 21.41,11.58M5.5,7A1.5,1.5 0 0,1 4,5.5A1.5,1.5 0 0,1 5.5,4A1.5,1.5 0 0,1 7,5.5A1.5,1.5 0 0,1 5.5,7M17.27,15.27L13,19.54L10.73,17.27C10.34,16.88 10.34,16.23 10.73,15.85C11.11,15.46 11.77,15.46 12.15,15.85L13,16.71L16.12,13.58C16.51,13.2 17.16,13.2 17.54,13.58C17.93,13.97 17.93,14.62 17.54,15L17.27,15.27Z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default MobileOffersHeroSection;
