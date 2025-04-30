"use client";

import Link from "next/link";
import Image from "next/image";
import { memo } from "react";

const HeroSection = memo(function HeroSection() {
  return (
    <section className="h-screen w-full bg-black flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background image with parallax effect */}
      <div className="absolute inset-0 z-0 transform scale-110" style={{
        willChange: 'transform',
        transform: 'translateZ(-1px) scale(2)',
        zIndex: -1
      }}>
        <Image
          src="/images/events/event3.jpg"
          alt="Events background"
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
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">Host Your Event at Akasa</span>
              <div className="absolute -bottom-3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#E6C78B]/80 to-transparent"></div>
            </h1>
          </div>

          <p className="text-lg md:text-xl font-montserrat text-white/90 mb-10 leading-relaxed max-w-2xl mx-auto">
            {"From intimate private dinners to grand celebrations, Akasa offers the perfect setting for your special occasions. Our dedicated events team will work with you to create a memorable experience tailored to your needs."}
          </p>

          {/* Fancy buttons */}
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="#inquiry">
              <button className="group relative overflow-hidden inline-flex items-center px-8 py-4 bg-transparent border-2 border-[#E6C78B] text-white text-sm font-medium transition-all duration-300 min-w-[180px] rounded-md">
                {/* Button background animation */}
                <span className="absolute inset-0 rounded-md bg-gradient-to-r from-[#E6C78B] to-[#D4B679] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>

                <span className="relative flex items-center justify-center w-full group-hover:text-black transition-colors duration-300">
                  Inquire Now
                </span>
              </button>
            </Link>

            <Link href="/reservations">
              <button className="group relative overflow-hidden inline-flex items-center px-8 py-4 bg-transparent border-2 border-white/30 text-white text-sm font-medium transition-all duration-300 min-w-[180px] rounded-md">
                {/* Button background animation */}
                <span className="absolute inset-0 rounded-md bg-white/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>

                <span className="relative flex items-center justify-center w-full">
                  Make a Reservation
                </span>
              </button>
            </Link>
          </div>

          {/* Decorative element */}
          <div className="flex justify-center mt-16">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-[#1A2A3A] opacity-30"></div>
              <svg className="w-8 h-8 text-[#E6C78B]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default HeroSection;
