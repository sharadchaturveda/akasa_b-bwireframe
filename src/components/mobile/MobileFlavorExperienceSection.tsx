"use client";

import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { MobilePrimaryButton } from "./MobilePrimaryButton";

/**
 * MobileFlavorExperienceSection Component
 *
 * A mobile-optimized version of the Menu page flavor experience section
 * Using the same content as the desktop version
 */
const MobileFlavorExperienceSection = memo(function MobileFlavorExperienceSection() {

  return (
    <section className="w-full bg-black py-12 relative overflow-hidden">
      {/* Background with overlay - simplified for mobile */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      {/* Decorative elements - simplified for mobile */}
      <div className="absolute top-0 left-0 w-full h-10 bg-gradient-to-b from-black to-transparent z-10"></div>
      <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-black to-transparent z-10"></div>

      <div className="relative z-10 px-4">
        {/* Left Side - Experience the Flavors - mobile optimized */}
        <div className="mb-8">
          {/* Background image with parallax effect */}
          <div className="relative h-48 w-full mb-4 overflow-hidden rounded-lg">
            <Image
              src="/images/home/philosophy/background.jpg"
              alt="Culinary journey"
              fill
              sizes="100vw"
              className="object-cover"
              quality={75}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>

            {/* Content overlay */}
            <div className="absolute inset-0 flex flex-col justify-center p-4">
              <h3 className="text-lg font-montserrat text-[#E6C78B] mb-2 tracking-wider uppercase">A culinary journey</h3>
              <h2 className="text-2xl font-playfair text-white mb-3 relative">
                Experience the Flavors of India
                <div className="absolute -bottom-2 left-0 w-16 h-0.5 bg-gradient-to-r from-[#E6C78B] to-transparent"></div>
              </h2>
            </div>
          </div>

          <p className="font-montserrat text-white/90 mb-4 text-sm leading-relaxed">
            {"Our menu celebrates India's diverse culinary landscape, from aromatic North Indian spices to South Indian coconut-infused curries. Each dish reflects our commitment to tradition and quality."}
          </p>

          {/* Fancy animated button */}
          <Link href="/reservations" className="block w-full">
            <MobilePrimaryButton className="w-full">
              Reserve a Table
            </MobilePrimaryButton>
          </Link>
        </div>

        {/* Right Side - Culinary Philosophy - mobile optimized */}
        <div className="mb-6">
          <h2 className="text-2xl font-playfair text-white mb-3 relative">
            Our Culinary Philosophy
            <div className="absolute -bottom-2 left-0 w-16 h-0.5 bg-gradient-to-r from-[#E6C78B] to-transparent"></div>
          </h2>

          <p className="text-white/90 font-montserrat mb-4 text-sm leading-relaxed">
            {"At Akasa, food is a celebration of culture and tradition. Our menu is guided by three principles that honor the rich heritage of Indian cuisine while embracing modern techniques and presentations."}
          </p>
        </div>

        {/* Philosophy cards - stacked for mobile */}
        <div className="flex flex-col gap-4 mb-6">
          {/* Tradition card */}
          <div className="relative overflow-hidden bg-black/30 backdrop-blur-sm border border-white/10 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 rounded-full bg-[#E6C78B]/10 flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-[#E6C78B]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,3L1,9L12,15L21,10.09V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z" />
                </svg>
              </div>
              <h3 className="text-[#E6C78B] text-lg font-playfair">Tradition</h3>
            </div>

            <p className="text-white/80 font-montserrat text-sm leading-relaxed pl-11">
              {"Honoring authentic recipes passed down through generations, preserving the essence of regional Indian cuisines."}
            </p>
          </div>

          {/* Quality card */}
          <div className="relative overflow-hidden bg-black/30 backdrop-blur-sm border border-white/10 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 rounded-full bg-[#E6C78B]/10 flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-[#E6C78B]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
                </svg>
              </div>
              <h3 className="text-[#E6C78B] text-lg font-playfair">Quality</h3>
            </div>

            <p className="text-white/80 font-montserrat text-sm leading-relaxed pl-11">
              {"Sourcing the finest ingredients and authentic spices, ensuring every dish meets our exacting standards of excellence."}
            </p>
          </div>

          {/* Innovation card */}
          <div className="relative overflow-hidden bg-black/30 backdrop-blur-sm border border-white/10 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 rounded-full bg-[#E6C78B]/10 flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-[#E6C78B]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,3C7.03,3 3,7.03 3,12C3,16.97 7.03,21 12,21C16.97,21 21,16.97 21,12C21,7.03 16.97,3 12,3M12,19C8.13,19 5,15.87 5,12C5,8.13 8.13,5 12,5C15.87,5 19,8.13 19,12C19,15.87 15.87,19 12,19M12,15.5C14,15.5 15.5,14 15.5,12C15.5,10 14,8.5 12,8.5C10,8.5 8.5,10 8.5,12C8.5,14 10,15.5 12,15.5M12,7C9.24,7 7,9.24 7,12C7,14.76 9.24,17 12,17C14.76,17 17,14.76 17,12C17,9.24 14.76,7 12,7Z" />
                </svg>
              </div>
              <h3 className="text-[#E6C78B] text-lg font-playfair">Innovation</h3>
            </div>

            <p className="text-white/80 font-montserrat text-sm leading-relaxed pl-11">
              {"Elevating classic flavors with creative techniques, presenting familiar tastes in surprising and delightful new ways."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});

export default MobileFlavorExperienceSection;

