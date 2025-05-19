"use client";

import { memo } from "react";
import Image from "next/image";
import { CHEF_IMAGES, PARALLAX_BACKGROUND_STYLES } from "@/constants/chefConstants";

/**
 * ChefBackground Component
 * 
 * Renders the parallax background for the chef section.
 * 
 * @returns {JSX.Element} The rendered component
 */
const ChefBackground = memo(function ChefBackground() {
  const { background } = CHEF_IMAGES;
  
  return (
    <>
      {/* Parallax background effect */}
      <div className="absolute inset-0 z-0 transform scale-110" style={PARALLAX_BACKGROUND_STYLES}>
        <Image 
          src={background.src}
          alt={background.alt}
          fill
          sizes="100vw"
          className="object-cover"
          quality={background.quality}
          priority
          loading="eager"
          style={{
            objectPosition: "center",
            opacity: 0.4
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/90"></div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black to-transparent"></div>
      <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-[#E6C78B]/10 blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-[#E6C78B]/5 blur-3xl"></div>
    </>
  );
});

export default ChefBackground;
