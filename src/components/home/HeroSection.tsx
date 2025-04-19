"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { memo } from "react";

// Memoized logo component for better performance
const Logo = memo(function Logo() {
  return (
    <Image
      src="/images/logo.png"
      alt="Akasa Logo"
      width={450}
      height={450}
      className="w-[250px] sm:w-[350px] md:w-[450px] h-auto"
      priority
      quality={75}
    />
  );
});

// Memoized hero section for better performance
const HeroSection = memo(function HeroSection() {
  return (
    <section className="h-screen w-full bg-cover bg-center flex items-center justify-center relative" style={{ backgroundImage: "url('/images/hero.jpg?quality=75&width=1920')" }}>
      <div className="absolute inset-0 flex items-center justify-center" style={{ top: '-15%', bottom: '40%' }}>
        <Logo />
      </div>
      <div className="text-center relative z-20">
        <div className="mb-10">
          <div className="flex flex-col items-center">
            <span className="text-sm md:text-base text-white/80 font-montserrat tracking-[0.3em] uppercase mb-2">{"Experience"}</span>
            <h1 className="relative font-playfair text-4xl sm:text-5xl md:text-6xl text-white italic mb-2">
              {"Exquisite Indian Cuisine"}
            </h1>
            <div className="flex items-center justify-center w-full mb-4">
              <div className="h-[1px] w-12 md:w-16 bg-white/40"></div>
              <div className="mx-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="1" />
                  <path d="M12 6V12L16 14" stroke="white" strokeWidth="1" strokeLinecap="round" />
                </svg>
              </div>
              <div className="h-[1px] w-12 md:w-16 bg-white/40"></div>
            </div>
            <span className="text-xs md:text-sm text-white/70 font-montserrat tracking-wider">{"Fine Dining at the Heart of Singapore"}</span>
          </div>
        </div>
        <Link href="/menu">
          <Button variant="default" className="uppercase bg-[#1A2A3A] text-white hover:bg-[#0A1A2A] w-[240px] text-center">{"Explore Menu"}</Button>
        </Link>
      </div>
      <div className="absolute inset-0 bg-black/30"></div>
    </section>
  );
});

export default HeroSection;