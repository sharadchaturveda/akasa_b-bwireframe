"use client";

import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { MobilePrimaryButton } from "./MobilePrimaryButton";

/**
 * MobileLoyaltyProgramSection Component
 *
 * A mobile-optimized version of the Offers page loyalty program section
 * Using the same content as the desktop version
 */
const MobileLoyaltyProgramSection = memo(function MobileLoyaltyProgramSection() {

  return (
    <section className="w-full bg-black py-12 relative overflow-hidden">
      {/* Background with parallax effect - mobile optimized */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/home/drink.jpg"
          alt="Loyalty Program background"
          fill
          sizes="100vw"
          className="object-cover"
          quality={60}
          loading="lazy"
          style={{
            objectPosition: "center",
            opacity: 0.4
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/90"></div>
      </div>

      {/* Decorative elements - simplified for mobile */}
      <div className="absolute top-0 left-0 w-full h-10 bg-gradient-to-b from-black to-transparent z-10"></div>
      <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-black to-transparent z-10"></div>

      <div className="px-4 relative z-10">
        {/* Loyalty Program image with fancy border and effects - mobile optimized */}
        <div className="relative group mb-8">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#E6C78B] to-[#D4B679] rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative h-[250px] overflow-hidden rounded-lg border border-[#E6C78B]/20">
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-[#E6C78B] opacity-70 z-10"></div>
            <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-[#E6C78B] opacity-70 z-10"></div>

            <Image
              src="/images/offers/gallery5.jpg"
              alt="Akasa Loyalty Program"
              fill
              sizes="100vw"
              className="object-cover"
              loading="lazy"
              quality={80}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

            {/* Loyalty badge overlay */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
              <div className="bg-[#E6C78B] text-black px-4 py-2 rounded-full text-xs font-medium shadow-lg">
                Exclusive Member Benefits
              </div>
            </div>
          </div>
        </div>

        {/* Loyalty Program description with elegant styling - mobile optimized */}
        <div className="relative mb-8">
          {/* Decorative elements */}
          <div className="absolute -top-4 left-0 w-16 h-0.5 bg-gradient-to-r from-[#E6C78B] to-transparent"></div>
          <div className="absolute -bottom-4 right-0 w-16 h-0.5 bg-gradient-to-l from-[#E6C78B] to-transparent"></div>

          <div className="p-6 bg-black/40 backdrop-blur-md border border-white/5 rounded-lg shadow-xl">
            <h2 className="text-2xl font-playfair mb-4 relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E6C78B] to-[#D4B679]">Akasa Loyalty Program</span>
              <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-[#E6C78B] to-transparent"></div>
            </h2>

            <p className="text-sm font-montserrat mb-6 text-white/90 leading-relaxed first-letter:text-xl first-letter:font-playfair first-letter:text-[#E6C78B] first-letter:mr-1 first-letter:float-left">
              {"Join our exclusive loyalty program and earn points with every visit. Redeem your points for complimentary dishes, special experiences, and unique perks available only to our loyal guests."}
            </p>
          </div>
        </div>

        {/* Fancy tier cards - mobile optimized */}
        <div className="flex flex-col gap-4 mb-8">
          {/* Silver tier */}
          <div className="group relative overflow-hidden">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#E6C78B]/0 via-[#E6C78B]/30 to-[#E6C78B]/0 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-1000"></div>
            <div className="relative bg-[#1A2A3A] p-4 rounded-lg text-center border border-white/5 transition-all duration-300 group-hover:border-[#E6C78B]/20">
              <div className="w-10 h-10 rounded-full bg-[#E6C78B]/10 flex items-center justify-center mx-auto mb-3">
                <svg className="w-5 h-5 text-[#E6C78B]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z" />
                </svg>
              </div>
              <h3 className="text-[#E6C78B] font-medium text-lg mb-1">Silver Tier</h3>
              <p className="text-xs text-white/70">After 5 visits</p>
            </div>
          </div>

          {/* Gold tier */}
          <div className="group relative overflow-hidden">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#E6C78B]/0 via-[#E6C78B]/30 to-[#E6C78B]/0 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-1000"></div>
            <div className="relative bg-[#1A2A3A] p-4 rounded-lg text-center border border-white/5 transition-all duration-300 group-hover:border-[#E6C78B]/20">
              <div className="w-10 h-10 rounded-full bg-[#E6C78B]/10 flex items-center justify-center mx-auto mb-3">
                <svg className="w-5 h-5 text-[#E6C78B]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,15.4L8.24,17.67L9.24,13.39L5.92,10.51L10.3,10.13L12,6.1L13.71,10.14L18.09,10.52L14.77,13.4L15.77,17.68L12,15.4M20,8.04L14.81,7.64L12,2.5L9.19,7.64L4,8.04L8.46,11.97L7.17,17.13L12,14.33L16.83,17.13L15.54,11.97L20,8.04Z" />
                </svg>
              </div>
              <h3 className="text-[#E6C78B] font-medium text-lg mb-1">Gold Tier</h3>
              <p className="text-xs text-white/70">After 10 visits</p>
            </div>
          </div>

          {/* Platinum tier */}
          <div className="group relative overflow-hidden">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#E6C78B]/0 via-[#E6C78B]/30 to-[#E6C78B]/0 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-1000"></div>
            <div className="relative bg-[#1A2A3A] p-4 rounded-lg text-center border border-white/5 transition-all duration-300 group-hover:border-[#E6C78B]/20">
              <div className="w-10 h-10 rounded-full bg-[#E6C78B]/10 flex items-center justify-center mx-auto mb-3">
                <svg className="w-5 h-5 text-[#E6C78B]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
                </svg>
              </div>
              <h3 className="text-[#E6C78B] font-medium text-lg mb-1">Platinum Tier</h3>
              <p className="text-xs text-white/70">After 20 visits</p>
            </div>
          </div>
        </div>

        {/* Join now button */}
        <div className="text-center">
          <Link href="/loyalty-program">
            <MobilePrimaryButton className="w-full">
              Join Now
            </MobilePrimaryButton>
          </Link>

          <p className="text-xs text-white/50 mt-4">
            Membership is free. Your tier is determined by the number of visits in a 12-month period.
          </p>
        </div>
      </div>
    </section>
  );
});

export default MobileLoyaltyProgramSection;
