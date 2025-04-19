"use client";

import { useEffect, useRef, memo } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Simple gallery images array - defined outside component to prevent re-creation
const GALLERY_IMAGES = [
  { src: "/images/gallery1.jpg", alt: "Gallery Image 1" },
  { src: "/images/gallery2.jpg", alt: "Gallery Image 2" },
  { src: "/images/gallery3.jpg", alt: "Gallery Image 3" },
  { src: "/images/gallery5.jpg", alt: "Gallery Image 5" },
  { src: "/images/gallery6.jpg", alt: "Gallery Image 6" },
  { src: "/images/gallery7.jpg", alt: "Gallery Image 7" },
];

// Memoized desktop gallery image component
const DesktopGalleryImage = memo(function DesktopGalleryImage({ 
  src, 
  alt, 
  priority = false 
}: { 
  src: string; 
  alt: string; 
  priority?: boolean;
}) {
  return (
    <div className="flex-none w-[400px] h-[400px] relative overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="400px"
        loading={priority ? "eager" : "lazy"}
        quality={75}
        priority={priority}
      />
    </div>
  );
});

// Memoized mobile gallery image component
const MobileGalleryImage = memo(function MobileGalleryImage({
  src, 
  alt, 
  priority = false,
  index = 0
}: { 
  src: string; 
  alt: string; 
  priority?: boolean;
  index?: number;
}) {
  return (
    <div 
      className="min-w-[80vw] h-[250px] flex-shrink-0 snap-center px-2"
      style={{ scrollSnapAlign: 'center' }}
    >
      <div className="w-full h-full relative rounded-lg overflow-hidden">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          loading={priority ? "eager" : "lazy"}
          width="640"
          height="250"
          fetchPriority={priority ? "high" : "auto"}
          draggable="false"
        />
      </div>
    </div>
  );
});

const GallerySection = memo(function GallerySection() {
  // Simple ref for the mobile gallery
  const mobileGalleryRef = useRef<HTMLDivElement>(null);
  
  // Simple initialization for mobile gallery
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const galleryScroll = mobileGalleryRef.current;
    if (!galleryScroll) return;
    
    // Add proper smooth scrolling behavior
    galleryScroll.style.scrollBehavior = 'smooth';
    
    // Center the gallery on the first item
    const firstItem = galleryScroll.querySelector('.snap-center');
    if (firstItem) {
      const scrollLeft = firstItem.getBoundingClientRect().left + 
        galleryScroll.scrollLeft - 
        (galleryScroll.getBoundingClientRect().width - firstItem.getBoundingClientRect().width) / 2;
      
      // Use requestAnimationFrame for smoother visual updates
      requestAnimationFrame(() => {
        galleryScroll.scrollLeft = scrollLeft;
      });
    }
    
    // Add proper touch handling for mobile devices
    const preventBodyScroll = (e: TouchEvent) => {
      // Only prevent default if we're swiping horizontally
      if (Math.abs(e.touches[0].clientX - e.touches[0].clientX) > 
          Math.abs(e.touches[0].clientY - e.touches[0].clientY)) {
        e.preventDefault();
      }
    };
    
    // Add event listener with passive: false to allow preventDefault
    galleryScroll.addEventListener('touchmove', preventBodyScroll, { passive: false });
    
    return () => {
      galleryScroll.removeEventListener('touchmove', preventBodyScroll);
    };
  }, []);

  return (
    <section className="w-full overflow-hidden p-0 m-0 flex flex-col">
      {/* Desktop gallery - Auto-scrolling with optimized rendering */}
      <div className="hidden sm:block overflow-hidden">
        <div className="flex animate-scroll will-change-transform hardware-accelerated">
          {/* First set of images */}
          {GALLERY_IMAGES.map((image, index) => (
            <DesktopGalleryImage
              key={index}
              src={image.src}
              alt={image.alt}
              priority={index < 3}
            />
          ))}
          
          {/* Duplicate first few images for seamless scrolling */}
          {GALLERY_IMAGES.slice(0, 3).map((image, index) => (
            <DesktopGalleryImage
              key={`dup-${index}`}
              src={image.src}
              alt={image.alt}
            />
          ))}
        </div>
      </div>

      {/* Mobile gallery - Simple, reliable touch-friendly scroll */}
      <div className="sm:hidden block">
        <div className="relative">
          {/* Left arrow indicator */}
          <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 pointer-events-none">
            <span className="bg-black/30 text-white p-2 rounded-full inline-flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6"></path>
              </svg>
            </span>
          </div>

          {/* Right arrow indicator */}
          <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 pointer-events-none">
            <span className="bg-black/30 text-white p-2 rounded-full inline-flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6"></path>
              </svg>
            </span>
          </div>

          {/* Simple scrollable container with proper snapping */}
          <div 
            className="overflow-x-auto snap-x snap-mandatory scrollbar-hide touch-pan-x pb-4"
            ref={mobileGalleryRef}
            style={{ 
              WebkitOverflowScrolling: 'touch',
              scrollPadding: '0 10%'
            }}
          >
            <div className="flex px-[10vw]">
              {/* Gallery images with proper spacing and snap points */}
              {GALLERY_IMAGES.map((image, index) => (
                <MobileGalleryImage
                  key={index}
                  src={image.src}
                  alt={image.alt}
                  priority={index < 2}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Private Dining Promotion */}
      <div className="h-[40vh] w-full bg-[#1e1e1e] text-white">
        <div className="h-full w-full bg-cover bg-center flex items-center justify-center p-8" style={{ backgroundImage: "url('/images/event3.jpg?quality=75&width=1000')" }}>
          <div className="text-center">
            <h2 className="text-3xl font-playfair mb-2">We Host. You Toast.</h2>
            <p className="mb-4 font-montserrat">Let us craft your private dining experience with flavor and flair.</p>
            <Link href="/events">
              <Button className="uppercase bg-[#1A2A3A] text-white hover:bg-[#0A1A2A] w-[240px] text-center">View All</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
});

export default GallerySection;
