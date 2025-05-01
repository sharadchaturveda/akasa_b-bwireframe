"use client";

import { memo } from "react";
import Image from "next/image";

/**
 * MobileMenuChefSection Component
 * 
 * A mobile-optimized version of the Menu page chef section
 */
const MobileMenuChefSection = memo(function MobileMenuChefSection() {
  return (
    <section className="w-full relative overflow-hidden">
      {/* Background image with proper mobile sizing */}
      <div className="relative w-full min-h-[70vh]">
        <Image
          src="/images/menu/chef.jpg"
          alt="Chef Akhilesh"
          fill
          sizes="100vw"
          className="object-cover"
          quality={75}
          priority
          style={{ objectPosition: "center" }}
        />
        
        {/* Enhanced overlay with gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40"></div>
        
        {/* Content container - positioned at the bottom for mobile */}
        <div className="absolute bottom-0 left-0 right-0 p-6 pb-12">
          <div className="w-full max-w-[100%] mx-auto">
            <span className="text-[#E6C78B] text-xs tracking-widest uppercase mb-2 block font-montserrat">Our Culinary Vision</span>
            <h1 className="text-3xl font-playfair mb-2 text-white" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
              Chef Akhilesh
            </h1>
            
            <div className="w-12 h-[1px] bg-gradient-to-r from-[#E6C78B]/80 to-transparent mb-3"></div>
            
            <p className="text-sm font-montserrat mb-4 text-white/90">
              "My passion is to create dishes that honor traditional Indian flavors while embracing modern techniques. Each plate tells a story of heritage and innovation."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});

export default MobileMenuChefSection;
