"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { memo, useRef, useEffect } from "react";
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

// A simplified hero section with no state changes for mobile
const SimpleHeroSection = memo(function SimpleHeroSection() {
  // Refs to avoid state changes
  const currentImageIndexRef = useRef(0);
  const isSmallScreenRef = useRef(false);
  const carouselIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const carouselElementsRef = useRef<HTMLDivElement[]>([]);
  
  // Set up everything on mount only
  useEffect(() => {
    // Function to check screen size
    const checkScreenSize = () => {
      isSmallScreenRef.current = window.innerWidth < 768;
      
      // Update visibility based on screen size
      document.querySelectorAll('.desktop-only').forEach(el => {
        (el as HTMLElement).style.display = isSmallScreenRef.current ? 'none' : '';
      });
      
      document.querySelectorAll('.mobile-only').forEach(el => {
        (el as HTMLElement).style.display = isSmallScreenRef.current ? '' : 'none';
      });
      
      // Start or stop carousel based on screen size
      if (isSmallScreenRef.current) {
        if (carouselIntervalRef.current) {
          clearInterval(carouselIntervalRef.current);
          carouselIntervalRef.current = null;
        }
      } else {
        startCarousel();
      }
    };
    
    // Function to start carousel
    const startCarousel = () => {
      if (carouselIntervalRef.current) {
        clearInterval(carouselIntervalRef.current);
      }
      
      // Update carousel images
      const updateCarousel = () => {
        const prevIndex = currentImageIndexRef.current;
        currentImageIndexRef.current = (prevIndex + 1) % HERO_IMAGES.length;
        
        // Update visibility
        carouselElementsRef.current.forEach((el, index) => {
          if (index === currentImageIndexRef.current) {
            el.style.opacity = '1';
            el.style.zIndex = '1';
          } else {
            el.style.opacity = '0';
            el.style.zIndex = '0';
          }
        });
      };
      
      // Set interval
      carouselIntervalRef.current = setInterval(updateCarousel, 2000);
    };
    
    // Initial check
    checkScreenSize();
    
    // Set up resize listener
    window.addEventListener('resize', checkScreenSize);
    
    // Try to play video if it exists
    const videoElement = document.getElementById('heroVideo') as HTMLVideoElement;
    if (videoElement) {
      videoElement.play().catch(error => {
        console.log('Video autoplay failed:', error);
      });
    }
    
    // Clean up
    return () => {
      window.removeEventListener('resize', checkScreenSize);
      if (carouselIntervalRef.current) {
        clearInterval(carouselIntervalRef.current);
      }
    };
  }, []);
  
  // Store carousel elements ref
  const storeCarouselRef = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      carouselElementsRef.current[index] = el;
    }
  };
  
  return (
    <section className="relative w-full h-screen bg-black overflow-hidden m-0 p-0 hero-section">
      {/* Mobile Hero Section - Video only */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-black mobile-only">
        {/* Absolutely minimal video element */}
        <video
          id="heroVideo"
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
            <p className="text-white/90 uppercase tracking-widest text-sm mb-4">
              Experience
            </p>
            
            <h1 className="text-white text-4xl font-playfair italic mb-6"
                style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
              Exquisite Indian Cuisine
            </h1>
            
            <div className="flex items-center w-full max-w-xs justify-center mb-6">
              <div className="h-px bg-white/50 flex-1"></div>
              <div className="mx-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1" />
                  <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                </svg>
              </div>
              <div className="h-px bg-white/50 flex-1"></div>
            </div>
            
            <p className="text-white/80 mb-8 text-sm">
              Fine Dining at the Heart of Singapore
            </p>
          </div>
        </div>
      </div>

      {/* Background Image Carousel - Desktop only */}
      <div className="absolute inset-0 desktop-only">
        {HERO_IMAGES.map((image, index) => (
          <div
            key={index}
            ref={(el) => storeCarouselRef(el, index)}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{
              opacity: index === 0 ? 1 : 0,
              zIndex: index === 0 ? 1 : 0
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
        {/* Bottom gradient for smooth transition on desktop */}
        <div className="absolute left-0 right-0 bottom-0 h-[120px] bg-gradient-to-t from-black via-black/90 to-transparent z-[2]"></div>
      </div>

      {/* Logo - Desktop only */}
      <div className="absolute top-0 left-0 w-full z-40 desktop-only flex justify-center pt-24">
        <div className="relative h-[120px] w-[240px]">
          <Image
            src="/images/brand/logo-white.png"
            alt="Akasa Logo"
            width={LOGO.SIZES.LARGE.width}
            height={LOGO.SIZES.LARGE.height}
            priority
            className="w-full h-full object-contain opacity-100"
          />
        </div>
      </div>

      {/* Content Container - Desktop only */}
      <div className="absolute inset-0 flex items-center justify-center z-30 desktop-only">
        {/* Text Content */}
        <div className="flex flex-col items-center justify-center px-4 text-center mt-16">
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

export default SimpleHeroSection;
