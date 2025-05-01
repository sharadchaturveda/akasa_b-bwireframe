"use client";

import Link from "next/link";
import Image from "next/image";
import { memo } from "react";

const HeroSection = memo(function HeroSection() {
  return (
    <section className="h-screen w-full bg-black flex flex-col items-center justify-center relative overflow-hidden pt-16 md:pt-20">
      {/* Enhanced background image with parallax effect */}
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
          quality={80}
          priority
          loading="eager"
          style={{
            objectPosition: "center",
            opacity: 0.7,
            filter: "contrast(1.1) brightness(0.9)"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/60 to-black/80"></div>
      </div>

      {/* Enhanced decorative elements */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent"></div>

      {/* Animated glow elements */}
      <div className="absolute top-20 right-10 w-60 h-60 rounded-full bg-[#E6C78B]/10 blur-3xl animate-pulse-slow" style={{ animationDuration: '8s' }}></div>
      <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-[#E6C78B]/5 blur-3xl animate-pulse-slow" style={{ animationDuration: '12s' }}></div>
      <div className="absolute top-1/3 left-1/4 w-40 h-40 rounded-full bg-[#E6C78B]/5 blur-3xl animate-pulse-slow" style={{ animationDuration: '10s' }}></div>

      {/* Subtle animated particles */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 rounded-full bg-[#E6C78B] animate-float" style={{ animationDuration: '15s' }}></div>
        <div className="absolute top-1/3 left-2/3 w-1 h-1 rounded-full bg-[#E6C78B] animate-float" style={{ animationDuration: '20s' }}></div>
        <div className="absolute top-2/3 left-1/3 w-1 h-1 rounded-full bg-[#E6C78B] animate-float" style={{ animationDuration: '25s' }}></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 mt-6 md:mt-8">
        <div className="max-w-3xl mx-auto text-center">
          {/* Enhanced elegant heading with decorative elements */}
          <div className="mb-8 relative animate-fadeSlideUp" style={{ animationDelay: '0.3s' }}>
            <span className="text-[#E6C78B] text-sm tracking-widest uppercase mb-4 block font-montserrat">Unforgettable Experiences</span>
            <div className="absolute left-1/2 top-12 -translate-x-1/2 -translate-y-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-[#E6C78B] to-transparent"></div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair mb-6 relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80" style={{ textShadow: '0 4px 6px rgba(0, 0, 0, 0.3)' }}>Host Your Event at Akasa</span>
              <div className="absolute -bottom-3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#E6C78B]/80 to-transparent"></div>
            </h1>
          </div>

          <p className="text-lg md:text-xl font-montserrat text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto animate-fadeSlideUp" style={{ animationDelay: '0.5s', letterSpacing: '0.02em' }}>
            {"From intimate private dinners to grand celebrations, Akasa offers the perfect setting for your special occasions. Our dedicated events team will work with you to create a memorable experience tailored to your needs."}
          </p>

          {/* Decorative divider */}
          <div className="flex items-center justify-center w-full mb-6 animate-fadeSlideUp" style={{ animationDelay: '0.7s' }}>
            <div className="h-[1px] w-16 md:w-24 bg-gradient-to-r from-transparent via-[#E6C78B]/60 to-transparent"></div>
            <div className="mx-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#E6C78B]/80">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1" />
                <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              </svg>
            </div>
            <div className="h-[1px] w-16 md:w-24 bg-gradient-to-r from-transparent via-[#E6C78B]/60 to-transparent"></div>
          </div>

          {/* Standardized buttons with animation */}
          <div className="flex flex-wrap justify-center gap-6 animate-fadeSlideUp" style={{ animationDelay: '0.9s' }}>
            <Link href="#inquiry">
              <button className="group inline-flex items-center justify-center rounded-full text-sm font-montserrat font-medium tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden shadow-md hover:shadow-lg bg-[#1A2A3A] text-white px-8 py-4 min-w-[180px]">
                {/* Gold fill animation */}
                <span className="absolute inset-0 rounded-full bg-[#E6C78B] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>

                <span className="relative flex-1 text-center group-hover:text-black transition-colors duration-300">
                  Inquire Now
                </span>
              </button>
            </Link>

            <Link href="/reservations">
              <button className="group inline-flex items-center justify-center rounded-full text-sm font-montserrat font-medium tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden shadow-md hover:shadow-lg bg-[#1A2A3A] text-white px-8 py-4 min-w-[180px]">
                {/* Gold fill animation */}
                <span className="absolute inset-0 rounded-full bg-[#E6C78B] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>

                <span className="relative flex-1 text-center group-hover:text-black transition-colors duration-300">
                  Make a Reservation
                </span>
              </button>
            </Link>
          </div>

          {/* Scroll indicator */}
          <div className="flex justify-center mt-10 animate-bounce">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-[#E6C78B]/10"></div>
              <svg className="w-6 h-6 text-[#E6C78B]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default HeroSection;
