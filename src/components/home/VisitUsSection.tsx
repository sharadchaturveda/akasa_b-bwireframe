"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function VisitUsSection() {
  return (
    <section className="min-h-[80vh] w-full bg-cover bg-center flex items-center justify-center text-center px-8 py-16 relative overflow-hidden" style={{ backgroundImage: "url('/images/location.jpg?quality=75&width=1200')" }}>
      {/* Enhanced overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/40"></div>

      {/* Subtle animated particles */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 rounded-full bg-white animate-float" style={{ animationDuration: '15s' }}></div>
        <div className="absolute top-1/3 left-2/3 w-1 h-1 rounded-full bg-white animate-float" style={{ animationDuration: '20s' }}></div>
        <div className="absolute top-2/3 left-1/3 w-1 h-1 rounded-full bg-white animate-float" style={{ animationDuration: '25s' }}></div>
      </div>

      <div className="relative z-10 bg-black/70 p-8 sm:p-12 rounded-lg border border-[#E6C78B]/20 shadow-2xl w-[90%] max-w-lg backdrop-blur-sm animate-fadeSlideUp">
        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-[#E6C78B]/30"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-[#E6C78B]/30"></div>

        <span className="text-[#E6C78B] text-sm tracking-widest uppercase mb-2 block font-montserrat">Location</span>
        <h2 className="text-3xl font-playfair mb-4 text-white" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>{"Visit Us"}</h2>

        <div className="w-24 h-[1px] bg-gradient-to-r from-[#E6C78B]/80 to-transparent mx-auto mb-6"></div>

        <p className="text-lg font-montserrat text-white/90 mb-4">{"79 Robinson Road, #01-03 Capitasky,"}</p>
        <p className="text-lg font-montserrat text-white/90 mb-8">{"Tanjong Pagar, Singapore 068897"}</p>

        <div className="flex items-center justify-center mb-8">
          <div className="w-10 h-10 rounded-full bg-[#1A2A3A]/80 flex items-center justify-center mr-4">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#E6C78B" strokeWidth="1.5" />
              <path d="M12 6V12L16 14" stroke="#E6C78B" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <p className="text-base font-montserrat text-white/90">{"Monday to Saturday: 11:30am to 10:00pm"}</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link href="/order">
            <Button className="uppercase bg-[#1A2A3A] text-white hover:bg-[#0A1A2A] w-full sm:w-[240px] text-center shadow-lg">{"Order Online"}</Button>
          </Link>
          <Link href="/reservations">
            <Button className="uppercase bg-[#1A2A3A] text-white hover:bg-[#0A1A2A] w-full sm:w-[240px] text-center shadow-lg">{"Reserve"}</Button>
          </Link>
        </div>
      </div>

    </section>
  );
}
