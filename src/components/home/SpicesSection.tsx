"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SpicesSection() {
  return (
    <section className="min-h-screen sm:h-screen w-full bg-cover bg-center relative py-16 sm:py-0 overflow-hidden" style={{ backgroundImage: "url('/images/home/gallery/awards.jpg')" }}>
      {/* Enhanced overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30"></div>

      {/* Subtle animated particles */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 rounded-full bg-[#E6C78B] animate-float" style={{ animationDuration: '15s' }}></div>
        <div className="absolute top-1/3 left-2/3 w-1 h-1 rounded-full bg-[#E6C78B] animate-float" style={{ animationDuration: '20s' }}></div>
        <div className="absolute top-2/3 left-1/3 w-1 h-1 rounded-full bg-[#E6C78B] animate-float" style={{ animationDuration: '25s' }}></div>
      </div>

      {/* Content container */}
      <div className="relative h-full w-full flex items-center justify-center z-10">
        <div className="container mx-auto px-4 md:px-8">
          {/* Grid for the three cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Card 1: Rooted in Purity */}
            <div className="bg-black/70 p-8 rounded-lg border border-[#E6C78B]/20 shadow-2xl backdrop-blur-sm animate-fadeSlideUp relative flex flex-col h-full" style={{ animationDelay: '0.1s' }}>
              {/* Decorative corner accents */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-[#E6C78B]/30"></div>
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-[#E6C78B]/30"></div>

              <h2 className="text-[#E6C78B] text-sm tracking-widest uppercase mb-2 block font-montserrat">{"Rooted in Purity"}</h2>

              <div className="w-16 h-[1px] bg-gradient-to-r from-[#E6C78B]/80 to-transparent mb-4"></div>

              <h3 className="text-xl font-playfair mb-2 text-white/90">{"The Origin of Flavor"}</h3>
              <p className="text-base font-montserrat mb-8 text-white/90">{"We handpick ingredients from trusted ethical suppliers, sustainable sources, and time-honored markets. From sun-dried turmeric to wild-foraged pepper, every flavor begins with care."}</p>

              <div className="flex flex-col gap-4 w-full mt-auto">
                <Link href="/menu" className="w-full flex justify-center">
                  <Button className="bg-[#1A2A3A] text-white hover:bg-[#0A1A2A] w-full px-4 sm:px-6 py-2 sm:py-3 text-center shadow-lg text-sm sm:text-base">
                    {"Explore Our Menus"}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Card 2: Regions of Spice */}
            <div className="bg-black/70 p-8 rounded-lg border border-[#E6C78B]/20 shadow-2xl backdrop-blur-sm animate-fadeSlideUp relative flex flex-col h-full" style={{ animationDelay: '0.3s' }}>
              {/* Decorative corner accents */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-[#E6C78B]/30"></div>
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-[#E6C78B]/30"></div>

              <h2 className="text-[#E6C78B] text-sm tracking-widest uppercase mb-2 block font-montserrat">{"Regions of Spice"}</h2>

              <div className="w-16 h-[1px] bg-gradient-to-r from-[#E6C78B]/80 to-transparent mb-4"></div>

              <h3 className="text-xl font-playfair mb-2 text-white/90">{"Flavors That Travel"}</h3>
              <p className="text-base font-montserrat mb-8 text-white/90">{"India is a mosaic of spice cultures. Our dishes carry notes from Rajasthan's red chili heat, Punjab's rich warmth, and Kashmir's fragrant saffron."}<br />{"Every plate is a journey."}</p>

              <div className="flex flex-col gap-4 w-full mt-auto">
                <Link href="/menu" className="w-full flex justify-center">
                  <Button className="bg-[#1A2A3A] text-white hover:bg-[#0A1A2A] w-full px-4 sm:px-6 py-2 sm:py-3 text-center shadow-lg text-sm sm:text-base">
                    {"Explore Our Menus"}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Card 3: Crafted With Fire */}
            <div className="bg-black/70 p-8 rounded-lg border border-[#E6C78B]/20 shadow-2xl backdrop-blur-sm animate-fadeSlideUp relative flex flex-col h-full" style={{ animationDelay: '0.5s' }}>
              {/* Decorative corner accents */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-[#E6C78B]/30"></div>
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-[#E6C78B]/30"></div>

              <h2 className="text-[#E6C78B] text-sm tracking-widest uppercase mb-2 block font-montserrat">{"Crafted With Fire"}</h2>

              <div className="w-16 h-[1px] bg-gradient-to-r from-[#E6C78B]/80 to-transparent mb-4"></div>

              <h3 className="text-xl font-playfair mb-2 text-white/90">{"The Akasa Method"}</h3>
              <p className="text-base font-montserrat mb-8 text-white/90">{"We roast, grind, toast, and temper spices in-house. No shortcuts."} 
              <br /> 
              {"Just ancient techniques along with our instinct-driven craft."}<br />{"It's not just food—it's a ritual."}</p>

              <div className="flex flex-col gap-4 w-full mt-auto">
                <Link href="/menu" className="w-full flex justify-center">
                  <Button className="bg-[#1A2A3A] text-white hover:bg-[#0A1A2A] w-full px-4 sm:px-6 py-2 sm:py-3 text-center shadow-lg text-sm sm:text-base">
                    {"Explore Our Menus"}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
