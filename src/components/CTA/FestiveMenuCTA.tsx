"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { memo } from "react";

/**
 * FestiveMenuCTA Component
 *
 * A Call-to-Action section highlighting the festive menus: Satwik & Diwali
 */
const FestiveMenuCTA = memo(function FestiveMenuCTA() {
  return (
    <section className="relative w-full min-h-[50vh] sm:min-h-[60vh] overflow-hidden py-16 sm:py-24">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/menu/festive/image.png" // same background as GallerySection
          alt="Festive background"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "center" }}
          quality={75}
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Decorative floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/3 left-1/4 w-2 h-2 rounded-full bg-[#E6C78B] animate-float"
          style={{ animationDuration: "18s" }}
        ></div>
        <div
          className="absolute top-2/3 right-1/3 w-2 h-2 rounded-full bg-[#E6C78B] animate-float"
          style={{ animationDuration: "22s" }}
        ></div>
      </div>

      {/* Content container */}
      <div className="relative z-10 max-w-5xl mx-auto text-center px-6 sm:px-12">
        <h2 className="text-4xl md:text-6xl font-playfair mb-6 relative inline-block">
          <span className="text-[#E6C78B]">Festive Specials</span>
          <div className="absolute -bottom-3 left-0 w-full h-0.5 bg-[#E6C78B]/50"></div>
        </h2>
        <h3 className="text-3xl sm:text-4xl font-playfair text-white/90 mb-4 sm:mb-6">
          Celebrate with Diwali Menus
        </h3>
        <p className="text-white/80 font-montserrat text-sm sm:text-base mb-8 sm:mb-12 leading-relaxed">
          Experience the richness of flavors this festive season. Carefully
          curated Satwik and Diwali menus to make your celebration
          unforgettable.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-stretch gap-8 mt-8">
          {/* Satwik Menu */}
          {/* <div className="flex flex-col items-center sm:items-stretch flex-1 space-y-4">
            <Link href="/menu/satwik" className="w-full sm:w-auto">
              <Button className="bg-[#1A2A3A] text-white hover:bg-[#0A1A2A] px-6 py-3 sm:px-8 sm:py-4 shadow-lg text-sm sm:text-base w-full sm:w-auto">
                Explore Satwik Menu
              </Button>
            </Link>
            <div className="bg-[#232B38] text-[#E6C78B] px-4 py-2 rounded-md text-xs font-medium shadow border border-[#E6C78B]/30 w-fit sm:w-full mx-auto sm:mx-0">
              <span className="inline-block align-middle mr-1">🛈</span>
              {`Valid from 27th Aug - 1st Oct`}
            </div>
          </div> */}
          {/* Diwali Menu */}
          <div className="flex flex-col items-center sm:items-stretch flex-1 space-y-4">
            <Link href="/menu/diwali" className="w-full sm:w-auto">
              <Button className="bg-[#1A2A3A] text-white hover:bg-[#0A1A2A] px-6 py-3 sm:px-8 sm:py-4 shadow-lg text-sm sm:text-base w-full sm:w-auto">
                Explore Diwali Menu
              </Button>
            </Link>
            <div className="bg-[#232B38] text-[#E6C78B] px-4 py-2 rounded-md text-xs font-medium shadow border border-[#E6C78B]/30 w-fit sm:w-full mx-auto sm:mx-0">
              <span className="inline-block align-middle mr-1">🛈</span>
              {`Valid from 2nd Oct - 8th Nov`}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default FestiveMenuCTA;
