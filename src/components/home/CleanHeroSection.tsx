"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { memo } from "react";
import { LOGO } from "@/constants";

// A clean hero section with centered content
const HeroSection = memo(function HeroSection() {
  return (
    <section className="relative w-full h-screen bg-black overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/home/hero/hero-home.jpg"
        alt="Hero background"
        fill
        priority={true}
        sizes="100vw"
        className="object-cover opacity-60"
      />

      {/* Logo - Only visible on desktop */}
      <div className="absolute top-0 left-0 w-full z-10 hidden md:flex justify-center pt-16 md:pt-24">
        <div className="relative h-[120px] w-[240px]">
          <Image
            src="/images/brand/logo-white.png"
            alt="Akasa Logo"
            width={LOGO.SIZES.LARGE.width}
            height={LOGO.SIZES.LARGE.height}
            priority
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Content Container */}
      <div className="absolute inset-0 flex items-center justify-center">

        {/* Text Content */}
        <div className="flex flex-col items-center justify-center px-4 text-center md:mt-16">
          <p className="text-white/90 uppercase tracking-widest text-sm md:text-base mb-4">
            Experience
          </p>

          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-playfair italic mb-6"
              style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
            Exquisite Indian Cuisine
          </h1>

          <div className="flex items-center w-full max-w-xs md:max-w-md justify-center mb-6">
            <div className="h-px bg-white/50 flex-1"></div>
            <div className="mx-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1" />
                <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              </svg>
            </div>
            <div className="h-px bg-white/50 flex-1"></div>
          </div>

          <p className="text-white/80 mb-8 text-sm md:text-base">
            Fine Dining at the Heart of Singapore
          </p>

          <Link href="/menu">
            <Button className="bg-[#1A2A3A] hover:bg-[#0A1A2A] text-white uppercase px-8 py-2">
              Explore Menu
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
});

export default HeroSection;
