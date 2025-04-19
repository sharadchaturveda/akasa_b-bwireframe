"use client";

import { useEffect, useRef, memo, useCallback } from "react";
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
  setKey = ""
}: {
  src: string;
  alt: string;
  priority?: boolean;
  setKey?: string;
}) {
  return (
    <div
      key={`${setKey}-${src}`}
      className="w-[90vw] h-[250px] flex-shrink-0 snap-center p-2"
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
        />
      </div>
    </div>
  );
});

const GallerySection = memo(function GallerySection() {
  // Refs for mobile gallery scrolling
  const mobileGalleryRef = useRef<HTMLDivElement>(null);
  const mobileContainerRef = useRef<HTMLDivElement>(null);

  // Memoized scroll handler for better performance
  const handleScroll = useCallback(() => {
    const galleryScroll = mobileGalleryRef.current;
    const galleryContainer = mobileContainerRef.current;

    if (!galleryScroll || !galleryContainer) return;

    const scrollLeft = galleryScroll.scrollLeft;
    const containerWidth = galleryContainer.scrollWidth;
    const viewportWidth = galleryScroll.clientWidth;

    // If we're near the beginning, jump to the middle set
    if (scrollLeft < viewportWidth / 2) {
      // Calculate position of the middle set
      const middleSetPosition = containerWidth / 3;
      // Use requestAnimationFrame for smoother visual updates
      requestAnimationFrame(() => {
        galleryScroll.scrollLeft = scrollLeft + middleSetPosition;
      });
    }

    // If we're near the end, jump to the beginning of the last set
    if (scrollLeft > containerWidth - viewportWidth * 1.5) {
      // Calculate position of the first set
      const firstSetPosition = containerWidth / 3;
      // Use requestAnimationFrame for smoother visual updates
      requestAnimationFrame(() => {
        galleryScroll.scrollLeft = scrollLeft - firstSetPosition;
      });
    }
  }, []);

  // Set up bidirectional infinite scrolling for mobile gallery
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const galleryScroll = mobileGalleryRef.current;
    const galleryContainer = mobileContainerRef.current;

    if (!galleryScroll || !galleryContainer) return;

    // Initialize scroll position to the middle set
    // This ensures we can scroll both left and right
    requestAnimationFrame(() => {
      const containerWidth = galleryContainer.scrollWidth;
      const middlePosition = containerWidth / 3;
      galleryScroll.scrollLeft = middlePosition;
    });

    // Use passive event listener for better performance
    galleryScroll.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      galleryScroll.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);
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

      {/* Mobile gallery - bidirectional infinite scroll */}
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

          {/* Bidirectional infinite scrollable container */}
          <div
            className="overflow-x-auto snap-x snap-mandatory scrollbar-hide touch-pan-x"
            ref={mobileGalleryRef}
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            <div
              className="flex"
              ref={mobileContainerRef}
            >
              {/* First set of images */}
              {GALLERY_IMAGES.map((image, index) => (
                <MobileGalleryImage
                  key={`first-${index}`}
                  src={image.src}
                  alt={image.alt}
                  priority={index < 2}
                  setKey="first"
                />
              ))}

              {/* Middle set of images (duplicated) */}
              {GALLERY_IMAGES.map((image, index) => (
                <MobileGalleryImage
                  key={`middle-${index}`}
                  src={image.src}
                  alt={image.alt}
                  setKey="middle"
                />
              ))}

              {/* Last set of images (duplicated) */}
              {GALLERY_IMAGES.map((image, index) => (
                <MobileGalleryImage
                  key={`last-${index}`}
                  src={image.src}
                  alt={image.alt}
                  setKey="last"
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
