"use client";

import Image from "next/image";
import { memo, useEffect } from "react";

const ChefSection = memo(function ChefSection() {
  // Optimize LCP image loading
  useEffect(() => {
    // Mark when the LCP image is loaded
    const lcpImage = document.getElementById('lcp-image');
    if (lcpImage) {
      if (lcpImage.complete) {
        lcpImage.classList.add('loaded');
        markLCPLoaded();
      } else {
        lcpImage.onload = () => {
          lcpImage.classList.add('loaded');
          markLCPLoaded();
        };
      }
    }

    // Mark LCP as loaded for performance measurement
    function markLCPLoaded() {
      if (window.performance && window.performance.mark) {
        window.performance.mark('lcp-loaded');

        // Measure time from navigation to LCP
        window.performance.measure('time-to-lcp', 'navigationStart', 'lcp-loaded');

        const lcpMeasure = window.performance.getEntriesByName('time-to-lcp')[0];
        console.log('Time to LCP:', lcpMeasure.duration, 'ms');
      }
    }
  }, []);
  return (
    <section className="min-h-screen w-full bg-black flex flex-col items-center justify-center relative overflow-hidden py-20">
      {/* Parallax background effect */}
      <div className="absolute inset-0 z-0 transform scale-110" style={{
        willChange: 'transform',
        transform: 'translateZ(-1px) scale(2)',
        zIndex: -1
      }}>
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

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black to-transparent"></div>
      <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-[#E6C78B]/10 blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-[#E6C78B]/5 blur-3xl"></div>

      {/* Decorative spice illustrations */}
      <div className="absolute top-10 right-10 opacity-20 rotate-12">
        <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#E6C78B" strokeWidth="0.5"/>
          <path d="M12 2V22M2 12H22M4.93 4.93L19.07 19.07M19.07 4.93L4.93 19.07" stroke="#E6C78B" strokeWidth="0.5"/>
        </svg>
      </div>
      <div className="absolute bottom-10 left-10 opacity-20 -rotate-12">
        <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#E6C78B" strokeWidth="0.5"/>
          <path d="M12 2V22M2 12H22M4.93 4.93L19.07 19.07M19.07 4.93L4.93 19.07" stroke="#E6C78B" strokeWidth="0.5"/>
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-[40%_60%] gap-12 items-center">
          {/* Chef image with fancy border and effects */}
          <div className="relative group">
            {/* Decorative frame */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#E6C78B] to-[#D4B679] rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-lg chef-image border border-[#E6C78B]/20">
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#E6C78B] opacity-70"></div>
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#E6C78B] opacity-70"></div>

              <Image
                src="/images/menu/chef.jpg"
                alt="Chef Akhilesh Pathak"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                priority
                fetchPriority="high"
                quality={80}
                id="lcp-image"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

              {/* Chef name overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <div className="text-center">
                  <h2 className="text-2xl font-playfair text-white">Chef Akhilesh Pathak</h2>
                  <div className="w-16 h-1 bg-[#E6C78B] mx-auto mt-2"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Chef description with elegant styling */}
          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute -top-6 left-0 w-20 h-1 bg-gradient-to-r from-[#E6C78B] to-transparent"></div>
            <div className="absolute -bottom-6 right-0 w-20 h-1 bg-gradient-to-l from-[#E6C78B] to-transparent"></div>

            <div className="p-8 bg-black/40 backdrop-blur-md border border-white/5 rounded-lg shadow-2xl">
              <h1 className="text-4xl md:text-6xl font-playfair mb-6 relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">Meet Our Chef</span>
                <div className="absolute -bottom-3 left-0 w-full h-0.5 bg-gradient-to-r from-[#E6C78B] to-transparent"></div>
              </h1>

              <h2 className="text-2xl md:text-3xl font-playfair mb-8 text-[#E6C78B]">Chef Akhilesh Pathak</h2>

              <p className="text-base md:text-lg font-montserrat mb-6 text-white/90 leading-relaxed first-letter:text-4xl first-letter:font-playfair first-letter:text-[#E6C78B] first-letter:mr-1 first-letter:float-left">
                {"Hailing from the vibrant culinary melting pot of Kolkata, Chef Akhilesh's culinary journey spans over two decades, initially nurtured by his mother's guidance and refined through extensive exploration of India's diverse gastronomic landscape."}
              </p>

              <p className="text-base md:text-lg font-montserrat mb-8 text-white/90 leading-relaxed">
                {"His philosophy is simple: respect the ingredients, honor the tradition, and push the boundaries of what's possible. Every dish at Akasa tells a story of heritage, innovation, and passion."}
              </p>

              {/* Elegant achievement badges without gold hover */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="group relative overflow-hidden">
                  <div className="relative px-5 py-3 bg-[#1A2A3A] border border-[#E6C78B]/30 rounded-full flex items-center hover:bg-[#1A2A3A]/80 transition-colors duration-300">
                    <span className="w-2 h-2 rounded-full bg-[#E6C78B] mr-2"></span>
                    <span className="text-sm text-white/90">Michelin Star Chef</span>
                  </div>
                </div>
                <div className="group relative overflow-hidden">
                  <div className="relative px-5 py-3 bg-[#1A2A3A] border border-[#E6C78B]/30 rounded-full flex items-center hover:bg-[#1A2A3A]/80 transition-colors duration-300">
                    <span className="w-2 h-2 rounded-full bg-[#E6C78B] mr-2"></span>
                    <span className="text-sm text-white/90">Asia's 50 Best</span>
                  </div>
                </div>
                <div className="group relative overflow-hidden">
                  <div className="relative px-5 py-3 bg-[#1A2A3A] border border-[#E6C78B]/30 rounded-full flex items-center hover:bg-[#1A2A3A]/80 transition-colors duration-300">
                    <span className="w-2 h-2 rounded-full bg-[#E6C78B] mr-2"></span>
                    <span className="text-sm text-white/90">James Beard Finalist</span>
                  </div>
                </div>
              </div>

              {/* Decorative element instead of signature */}
              <div className="mt-8 text-right">
                <div className="inline-block w-16 h-0.5 bg-gradient-to-r from-[#E6C78B] to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default ChefSection;
