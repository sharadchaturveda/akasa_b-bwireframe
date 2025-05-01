"use client";

import { memo, useState, useEffect } from "react";
// Import with a different name to avoid conflict with the native Image constructor
import NextImage from "next/image";

// Gallery images array with optimized paths
const GALLERY_IMAGES = [
  { src: "/images/gallery1.jpg", alt: "Elegant dining setup with traditional Indian decor" },
  { src: "/images/gallery2.jpg", alt: "Chef preparing authentic Indian cuisine" },
  { src: "/images/gallery3.jpg", alt: "Signature cocktail with exotic spices" },
  { src: "/images/gallery5.jpg", alt: "Beautifully plated Indian dish with garnish" },
  { src: "/images/gallery6.jpg", alt: "Restaurant interior with ambient lighting" },
];

// Optimized gallery image component with performance enhancements
const GalleryImage = memo(function GalleryImage({
  src,
  alt,
  priority = false
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="flex-none w-[400px] h-[400px] relative overflow-hidden bg-black">
      {/* Placeholder while image loads */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-500 ${isLoaded ? 'opacity-0' : 'opacity-100'}`}
      ></div>

      <NextImage
        src={src}
        alt={alt}
        fill
        className={`object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        sizes="400px"
        loading={priority ? "eager" : "lazy"}
        quality={75}
        priority={priority}
        onLoad={() => setIsLoaded(true)}
        fetchPriority={priority ? "high" : "auto"}
        style={{
          transform: "translateZ(0)", // Hardware acceleration
        }}
      />
    </div>
  );
});

// Desktop gallery component with optimized scrolling and performance
const DesktopGallery = memo(function DesktopGallery() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Only enable animation when component is in viewport
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);

        // Start animation after a short delay to ensure smooth performance
        setTimeout(() => {
          setIsLoaded(true);
        }, 100);
      } else {
        setIsVisible(false);
      }
    }, {
      threshold: 0.1,
      rootMargin: '100px' // Start observing before the element is in view
    });

    const galleryElement = document.getElementById('desktop-gallery');
    if (galleryElement) {
      observer.observe(galleryElement);
    }

    return () => {
      if (galleryElement) {
        observer.unobserve(galleryElement);
      }
    };
  }, []);

  // Preload images for smoother experience
  useEffect(() => {
    if (isVisible && typeof window !== 'undefined') {
      // Preload the next set of images when gallery becomes visible
      const preloadImages = () => {
        GALLERY_IMAGES.forEach((image) => {
          // Use the native browser Image constructor, not the Next.js Image component
          const img = new window.Image();
          img.src = image.src;
        });
      };

      // Use requestIdleCallback for better performance
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(preloadImages, { timeout: 2000 });
      } else {
        setTimeout(preloadImages, 1000);
      }
    }
  }, [isVisible]);

  return (
    <div
      id="desktop-gallery"
      className="hidden sm:block overflow-hidden"
      style={{
        height: '400px',
        backgroundColor: '#000'
      }}
    >
      <div
        className={`flex ${isLoaded ? 'animate-scroll' : ''}`}
        style={{
          transform: 'translateZ(0)', // Hardware acceleration
          willChange: isLoaded ? 'transform' : 'auto',
          transition: 'opacity 0.5s ease-in-out',
          opacity: isVisible ? 1 : 0
        }}
      >
        {/* First set of images */}
        {GALLERY_IMAGES.map((image, index) => (
          <GalleryImage
            key={index}
            src={image.src}
            alt={image.alt}
            priority={index < 2}
          />
        ))}

        {/* Duplicate first few images for seamless scrolling */}
        {GALLERY_IMAGES.slice(0, 3).map((image, index) => (
          <GalleryImage
            key={`dup-${index}`}
            src={image.src}
            alt={image.alt}
          />
        ))}
      </div>
    </div>
  );
});

export default DesktopGallery;
