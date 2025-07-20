"use client";

import Image from "next/image";
import { memo } from "react";

const LoyaltyHero = memo(function LoyaltyHero() {
  return (
    <section className="h-screen w-full bg-black flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background image without parallax */}
      <div className="absolute inset-0 z-0">
        <Image src="/images/offers/loyalty_program/loyalty.jpg"
          alt="Loyalty Program background"
          fill
          sizes="100vw"
          className="object-cover"
          quality={70}
          priority
          loading="eager"
          style={{
            objectPosition: "center",
            opacity: 0.6
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-black/80"></div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black to-transparent"></div>
      <div className="absolute top-20 right-10 w-40 h-40 rounded-full bg-[#E6C78B]/10 blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-60 h-60 rounded-full bg-[#E6C78B]/5 blur-3xl"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Elegant heading with decorative elements */}
          <div className="mb-6 relative">
            <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-20 h-1 bg-gradient-to-r from-transparent via-[#E6C78B] to-transparent"></div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair mb-6 relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">Akasa Loyalty Program</span>
              <div className="absolute -bottom-3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#E6C78B]/80 to-transparent"></div>
            </h1>
          </div>

          <p className="text-lg md:text-xl font-montserrat text-white/90 mb-10 leading-relaxed max-w-2xl mx-auto">
            Join our exclusive loyalty program and enjoy exclusive benefits, discounts, and special treats based on your visits to Akasa.
          </p>

          {/* Decorative element */}
          <div className="flex justify-center mt-16">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-[#1A2A3A] opacity-30"></div>
              <svg className="w-8 h-8 text-[#E6C78B]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default LoyaltyHero; 