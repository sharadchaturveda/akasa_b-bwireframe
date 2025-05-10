"use client";

import Image from "next/image"
;
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { memo, useState, useEffect, useCallback, useRef } from "react";
import { LOGO } from "@/constants";
import { useDeviceDetection } from "@/hooks/useDeviceDetection";

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

// A hero section with autoflipping carousel for desktop and video background for mobile
const CarouselHeroSection = memo(function CarouselHeroSection() {
  // State to track current image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // State to track if we're on mobile - using both manual check and hook
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const { isMobile } = useDeviceDetection();

  // Reference to video element
  const videoRef = useRef<HTMLVideoElement>(null);

  // Function to handle window resize and check if we're on mobile
  const handleResize = useCallback(() => {
    if (typeof window !== 'undefined') {
      setIsSmallScreen(window.innerWidth < 768);
    }
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

  // Set up autoflipping carousel for desktop
  useEffect(() => {
    // Only run carousel on desktop
    if (isMobile || isSmallScreen) {
      // Log for debugging
      if (process.env.NODE_ENV !== 'production') {
        console.log('Carousel disabled: Mobile view detected');
      }
      return;
    }

    // Log for debugging
    if (process.env.NODE_ENV !== 'production') {
      console.log('Carousel enabled: Desktop view detected');
    }

    // Set up interval to change image every 2 seconds
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        const newIndex = prevIndex === HERO_IMAGES.length - 1 ? 0 : prevIndex + 1;

        // Log for debugging
        if (process.env.NODE_ENV !== 'production') {
          console.log(`Carousel image changed: ${prevIndex} -> ${newIndex}`);
        }

        return newIndex;
      });
    }, 2000);

    // Clean up interval
    return () => clearInterval(interval);
  }, [isMobile, isSmallScreen]);

  // Minimal effect for video playback
  useEffect(() => {
    if (!isSmallScreen || !videoRef.current) return;

    const video = videoRef.current;

    // Just try to play the video
    video.play().catch(error => {
      console.log('Video autoplay failed:', error);
    });

    // Clean up
    return () => {
      video.pause();
    };
  }, [isSmallScreen]);





  return (
    <section className={`relative w-full ${isSmallScreen ? 'h-[100dvh] mobile-height-fix hero-section mobile-hero-no-content' : 'h-screen'} bg-black overflow-hidden m-0 p-0`} style={{ margin: 0, padding: 0 }}>
      {/* Mobile Hero Section - Video only */}
      {isSmallScreen && (
        <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
          {/* Absolutely minimal video element */}
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full"
            playsInline
            muted
            loop
            autoPlay
          >
            <source src="/images/home/hero/mobile-video/heromobilevid.webm" type="video/webm" />
          </video>

          {/* Text content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center justify-center px-4 text-center">
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
            </div>
          </div>
        </div>
      )}

      {/* Background Image Carousel - Desktop only */}
      <div className={`${isSmallScreen && 'hidden'} absolute inset-0`}>
        {HERO_IMAGES.map((image, index) => (
          <div
            key={index}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{
              opacity: currentImageIndex === index ? 1 : 0,
              zIndex: currentImageIndex === index ? 1 : 0
            }}
          >
            <Image src={image.src}
              alt={image.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              quality={80} /* Balanced for performance and quality */
              className="object-cover opacity-60"
            />
          </div>
        ))}
        {/* Bottom gradient for smooth transition on desktop */}
        <div className="absolute left-0 right-0 bottom-0 h-[120px] bg-gradient-to-t from-black via-black/90 to-transparent z-[2]"></div>
      </div>

      {/* Logo - Desktop only - Hidden by default on small screens */}
      <div className="absolute top-0 left-0 w-full z-40 hidden md:flex justify-center pt-24">
        <div className="relative h-[120px] w-[240px]">
          <Image src="/images/brand/logo-white.png"
            alt="Akasa Logo"
            width={LOGO.SIZES.LARGE.width}
            height={LOGO.SIZES.LARGE.height}
            priority
            quality={85} /* High quality for logo, balanced for performance */
            className="w-full h-full object-contain opacity-100"
          />
        </div>
      </div>

      {/* Content Container - Desktop only - Hidden by default on small screens */}
      <div className="absolute inset-0 flex items-center justify-center z-30 hidden md:flex">
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


