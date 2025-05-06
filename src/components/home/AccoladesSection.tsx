"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";



export default function AccoladesSection() {
  // Use the device detection hook
  

  // Render mobile-specific component for mobile devices
  

  // Desktop version
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
      <div className="relative h-full w-full flex items-end justify-start p-17 z-10">
        <div className="max-w-sm ml-8 mb-24 bg-black/70 p-8 rounded-lg border border-[#E6C78B]/20 shadow-2xl backdrop-blur-sm animate-fadeSlideUp">
          {/* Decorative corner accents */}
          <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-[#E6C78B]/30"></div>
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-[#E6C78B]/30"></div>

          <span className="text-[#E6C78B] text-sm tracking-widest uppercase mb-2 block font-montserrat">Awards & Recognition</span>
          <h2 className="text-3xl font-playfair mb-2 text-white" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>{"Celebrated & Savored"}</h2>

          <div className="w-16 h-[1px] bg-gradient-to-r from-[#E6C78B]/80 to-transparent mb-4"></div>

          <p className="text-base italic font-montserrat mb-8 text-white/90">{"Where spice meets soul – Indian cuisine, reimagined with passion and precision."}</p>

          <div className="flex flex-col gap-4 w-full">
            <Link href="https://akasa.oddle.me/en_SG/" target="_blank" rel="noopener noreferrer">
              <Button className="bg-[#1A2A3A] text-white hover:bg-[#0A1A2A] w-full px-6 py-3 text-center shadow-lg">
                {"Order Online"}
              </Button>
            </Link>
            <Link href="/reservations">
              <Button className="bg-[#1A2A3A] text-white hover:bg-[#0A1A2A] w-full px-6 py-3 text-center shadow-lg">
                {"Make a Reservation"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

