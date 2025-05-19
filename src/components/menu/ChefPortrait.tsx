"use client";

import { memo } from "react";
import Image from "next/image";
import { CHEF_IMAGES, CHEF_INFO, CHEF_COLORS } from "@/constants/chefConstants";

/**
 * ChefPortrait Component
 * 
 * Renders the chef's portrait with decorative frame and hover effects.
 * 
 * @returns {JSX.Element} The rendered component
 */
const ChefPortrait = memo(function ChefPortrait() {
  const { portrait } = CHEF_IMAGES;
  const { name } = CHEF_INFO;
  const { gold } = CHEF_COLORS;
  
  return (
    <div className="relative group">
      {/* Decorative frame */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#E6C78B] to-[#D4B679] rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
      <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-lg chef-image border border-[#E6C78B]/20">
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#E6C78B] opacity-70"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#E6C78B] opacity-70"></div>

        <Image 
          src={portrait.src}
          alt={portrait.alt}
          fill
          sizes="(max-width: 768px) 100vw, 40vw"
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          priority
          fetchPriority="high"
          quality={portrait.quality}
          id="lcp-image"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

        {/* Chef name overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <div className="text-center">
            <h2 className="text-2xl font-playfair text-white">{name}</h2>
            <div className={`w-16 h-1 bg-[${gold}] mx-auto mt-2`}></div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ChefPortrait;
