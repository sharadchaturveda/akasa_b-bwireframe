"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { memo } from "react";
import { useDeviceDetection } from "@/hooks/useDeviceDetection";
import { MobileHeroButton } from "@/components/mobile/MobileHeroButton";

// Memoized logo component for better performance and CLS
const Logo = memo(function Logo() {
  return (
    <div
      className="relative w-[180px] xs:w-[220px] sm:w-[280px] md:w-[350px] lg:w-[450px] h-[180px] xs:h-[220px] sm:h-[280px] md:h-[350px] lg:h-[450px]"
      style={{
        // Fixed dimensions to prevent CLS
        aspectRatio: '1/1',
        contain: 'layout'
      }}
    >
      <Image
        src="/images/common/logo.svg"
        alt="Akasa Logo"
        fill
        sizes="(max-width: 640px) 250px, (max-width: 768px) 350px, 450px"
        className="object-contain"
        priority
        loading="eager"
        fetchPriority="high"
      />
    </div>
  );
});

// Memoized hero section for better performance
const HeroSection = memo(function HeroSection() {
  // Use the custom hook for device detection
  const { isMobile } = useDeviceDetection();
  return (
    <section
      className="h-screen w-full bg-black flex flex-col items-center justify-center relative pt-16"
    >
      {/* LCP Image - Using Image component for better optimization */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/home/hero.jpg"
          alt="Hero background"
          fill
          priority={true}
          fetchPriority="high"
          sizes="100vw"
          quality={60}
          className="object-cover"
          style={{
            objectPosition: "center",
          }}
          id="lcp-image" // Add ID for LCP tracking
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30 z-10"></div>

      {/* Logo - Optimized for mobile */}
      <div className="absolute inset-0 flex items-start justify-center pt-6 sm:pt-8 md:pt-12 z-20" style={{ top: '-5%', bottom: '50%' }}>
        <Logo />
      </div>

      {/* Content - Optimized for mobile */}
      <div className="text-center relative z-20 mt-12 sm:mt-16 md:mt-24 animate-fadeIn px-4">
        <div className="mb-6 sm:mb-10">
          <div className="flex flex-col items-center">
            <span className="text-xs sm:text-sm md:text-base text-white/90 font-montserrat tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-1 sm:mb-2 animate-fadeSlideUp" style={{ animationDelay: '0.3s' }}>{"Experience"}</span>
            <h1 className="relative font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white italic mb-2 animate-fadeSlideUp px-2" style={{ animationDelay: '0.5s', textShadow: '0 4px 6px rgba(0, 0, 0, 0.3)', lineHeight: '1.2' }}>
              {"Exquisite Indian Cuisine"}
            </h1>
            <div className="flex items-center justify-center w-full mb-3 sm:mb-4 animate-fadeSlideUp" style={{ animationDelay: '0.7s' }}>
              <div className="h-[1px] w-8 sm:w-12 md:w-20 bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
              <div className="mx-2 sm:mx-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-80 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="1" />
                  <path d="M12 6V12L16 14" stroke="white" strokeWidth="1" strokeLinecap="round" />
                </svg>
              </div>
              <div className="h-[1px] w-8 sm:w-12 md:w-20 bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
            </div>
            <span className="text-xs md:text-sm text-white/80 font-montserrat tracking-wider animate-fadeSlideUp max-w-[90%] mx-auto" style={{ animationDelay: '0.9s', letterSpacing: '0.1em' }}>{"Fine Dining at the Heart of Singapore"}</span>
          </div>
        </div>
        <div className="animate-fadeSlideUp" style={{ animationDelay: '1.1s' }}>
          <Link href="/menu">
            {isMobile ? (
              <MobileHeroButton className="uppercase text-center shadow-lg w-[200px] sm:w-[240px]">
                Explore Menu
              </MobileHeroButton>
            ) : (
              <Button variant="default" className="uppercase bg-[#1A2A3A] text-white hover:bg-[#0A1A2A] w-[200px] sm:w-[240px] text-center shadow-lg text-sm sm:text-base">{"Explore Menu"}</Button>
            )}
          </Link>
        </div>
      </div>

      {/* Add subtle animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 z-5 opacity-70"></div>

      {/* Add subtle animated particles */}
      <div className="absolute inset-0 z-5 opacity-30 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 rounded-full bg-white animate-float" style={{ animationDuration: '15s' }}></div>
        <div className="absolute top-1/3 left-2/3 w-1 h-1 rounded-full bg-white animate-float" style={{ animationDuration: '20s' }}></div>
        <div className="absolute top-2/3 left-1/3 w-1 h-1 rounded-full bg-white animate-float" style={{ animationDuration: '25s' }}></div>
        <div className="absolute top-1/2 left-3/4 w-1 h-1 rounded-full bg-white animate-float" style={{ animationDuration: '18s' }}></div>
        <div className="absolute top-3/4 left-1/2 w-1 h-1 rounded-full bg-white animate-float" style={{ animationDuration: '22s' }}></div>
      </div>
    </section>
  );
});

export default HeroSection;