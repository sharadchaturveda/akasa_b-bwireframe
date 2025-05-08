"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { memo, useState, useEffect, useCallback } from "react";
import { LOGO } from "@/constants";

// Hero carousel images for desktop
const HERO_IMAGES = [
  {
    src: "/images/home/hero/carousel/hero1.jpg",
    alt: "Akasa restaurant ambiance"
  },
  {
    src: "/images/home/hero/carousel/hero2.jpg",
    alt: "Exquisite Indian cuisine"
  },
  {
    src: "/images/home/hero/carousel/hero3.jpg",
    alt: "Fine dining experience"
  },
  {
    src: "/images/home/hero/carousel/hero4.jpg",
    alt: "Elegant restaurant setting"
  }
];

// A hero section with autoflipping carousel for desktop and static image for mobile
const CarouselHeroSection = memo(function CarouselHeroSection() {
  // State to track current image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // State to track if we're on mobile
  const [isMobile, setIsMobile] = useState(false);

  // Function to handle window resize and check if we're on mobile
  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Set up resize listener and initial check
  useEffect(() => {
    // Check if we're on mobile initially
    handleResize();

    // Add resize listener
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  // Set up autoflipping carousel
  useEffect(() => {
    // Only run carousel on desktop
    if (isMobile) return;

    // Set up interval to change image every 1.5 seconds
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === HERO_IMAGES.length - 1 ? 0 : prevIndex + 1
      );
    }, 1500);

    // Clean up interval
    return () => clearInterval(interval);
  }, [isMobile]);

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden">
      {/* Background Image - Mobile (static) */}
      <div className="md:hidden absolute inset-0">
        <Image
          src="/images/home/hero/hero-home.jpg"
          alt="Hero background"
          fill
          priority={true}
          sizes="100vw"
          className="object-cover opacity-60"
        />
      </div>

      {/* Background Image Carousel - Desktop only */}
      <div className="hidden md:block absolute inset-0">
        {HERO_IMAGES.map((image, index) => (
          <div
            key={index}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{
              opacity: currentImageIndex === index ? 1 : 0,
              zIndex: currentImageIndex === index ? 1 : 0
            }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover opacity-60"
            />
          </div>
        ))}
      </div>

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
      <div className="absolute inset-0 flex items-center justify-center z-20">
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

export default CarouselHeroSection;
