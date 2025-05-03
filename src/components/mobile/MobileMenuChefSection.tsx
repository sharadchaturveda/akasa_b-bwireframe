"use client";

import { memo, useEffect } from "react";
import Image from "next/image";

/**
 * MobileMenuChefSection Component
 *
 * A mobile-optimized version of the Menu page chef section
 * Using the same content as the desktop version
 */
const MobileMenuChefSection = memo(function MobileMenuChefSection() {
  // Optimize LCP image loading
  useEffect(() => {
    // Mark when the LCP image is loaded
    const lcpImage = document.getElementById('mobile-lcp-image') as HTMLImageElement;
    if (lcpImage) {
      if (lcpImage.complete) {
        lcpImage.classList.add('loaded');
      } else {
        lcpImage.onload = () => {
          lcpImage.classList.add('loaded');
        };
      }
    }
  }, []);

  return (
    <section className="w-full bg-black relative overflow-hidden py-16">
      {/* Background with mobile optimization */}
      <div className="absolute inset-0 z-0" style={{ zIndex: -1 }}>
        <Image
          src="/images/home/drink.jpg"
          alt="Chef background"
          fill
          sizes="100vw"
          className="object-cover"
          quality={60}
          priority
          loading="eager"
          style={{
            objectPosition: "center",
            opacity: 0.4
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/90"></div>
      </div>

      {/* Decorative elements - simplified for mobile */}
      <div className="absolute top-0 left-0 w-full h-10 bg-gradient-to-b from-black to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-black to-transparent"></div>

      <div className="px-4 relative z-10">
        {/* Chef image with optimized size for mobile */}
        <div className="relative group mb-6">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#E6C78B] to-[#D4B679] rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative h-[300px] overflow-hidden rounded-lg chef-image border border-[#E6C78B]/20">
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-[#E6C78B] opacity-70"></div>
            <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-[#E6C78B] opacity-70"></div>

            <Image
              src="/images/menu/chef-portrait.jpg"
              alt="Chef Akhilesh Pathak"
              fill
              sizes="100vw"
              className="object-cover object-center"
              priority
              fetchPriority="high"
              quality={75}
              id="mobile-lcp-image"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

            {/* Chef name overlay at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="text-center">
                <h2 className="text-xl font-playfair text-white">Chef Akhilesh Pathak</h2>
                <div className="w-12 h-1 bg-[#E6C78B] mx-auto mt-2"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Chef description - same content as desktop but optimized layout */}
        <div className="relative">
          <div className="p-4 bg-black/40 backdrop-blur-md border border-white/5 rounded-lg shadow-xl">
            <h1 className="text-3xl font-playfair mb-4 relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">Meet Our Chef</span>
              <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-[#E6C78B] to-transparent"></div>
            </h1>

            <h2 className="text-xl font-playfair mb-4 text-[#E6C78B]">Chef Akhilesh Pathak</h2>

            <p className="text-sm font-montserrat mb-4 text-white/90 leading-relaxed first-letter:text-2xl first-letter:font-playfair first-letter:text-[#E6C78B] first-letter:mr-1 first-letter:float-left">
              {"Hailing from the vibrant culinary melting pot of Kolkata, Chef Akhilesh's culinary journey spans over two decades, initially nurtured by his mother's guidance and refined through extensive exploration of India's diverse gastronomic landscape."}
            </p>

            <p className="text-sm font-montserrat mb-6 text-white/90 leading-relaxed">
              {"His philosophy is simple: respect the ingredients, honor the tradition, and push the boundaries of what's possible. Every dish at Akasa tells a story of heritage, innovation, and passion."}
            </p>

            {/* Elegant achievement badges - mobile optimized */}
            <div className="flex flex-wrap gap-3 mb-4">
              <div className="group relative overflow-hidden">
                <div className="relative px-3 py-2 bg-[#1A2A3A] border border-[#E6C78B]/30 rounded-full flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E6C78B] mr-1.5"></span>
                  <span className="text-xs text-white/90">Taste Guru</span>
                </div>
              </div>
              <div className="group relative overflow-hidden">
                <div className="relative px-3 py-2 bg-[#1A2A3A] border border-[#E6C78B]/30 rounded-full flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E6C78B] mr-1.5"></span>
                  <span className="text-xs text-white/90">Curry Architect</span>
                </div>
              </div>
              <div className="group relative overflow-hidden">
                <div className="relative px-3 py-2 bg-[#1A2A3A] border border-[#E6C78B]/30 rounded-full flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E6C78B] mr-1.5"></span>
                  <span className="text-xs text-white/90">Culinary Trendsetter</span>
                </div>
              </div>
            </div>

            {/* Decorative element instead of signature */}
            <div className="mt-4 text-right">
              <div className="inline-block w-12 h-0.5 bg-gradient-to-r from-[#E6C78B] to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default MobileMenuChefSection;
