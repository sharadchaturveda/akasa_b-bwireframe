"use client";

import { memo, useState, useEffect, useRef } from "react";
// Import with a different name to avoid conflict with the native Image constructor
import NextImage from "next/image";

// Gallery images array with optimized paths
const GALLERY_IMAGES = [
  { src: "/images/home/gallery/gallery1.jpg", alt: "Gallery image 1" },
  { src: "/images/home/gallery/gallery2.jpg", alt: "Gallery image 2" },
  { src: "/images/home/gallery/gallery3.jpg", alt: "Gallery image 3" },
  { src: "/images/home/gallery/gallery4.jpg", alt: "Gallery image 4" },
  { src: "/images/home/gallery/gallery5.jpg", alt: "Gallery image 5" },
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
  // Use a ref to track if component is mounted to avoid hydration issues
  const hasMounted = useRef(false);
  // Use state for loaded status, but don't render different HTML based on it initially
  const [isLoaded, setIsLoaded] = useState(false);

  // Effect to mark component as mounted after hydration
  useEffect(() => {
    hasMounted.current = true;
  }, []);

  // Handle image load event
  const handleImageLoad = () => {
    if (hasMounted.current) {
      setIsLoaded(true);
    }
  };

  return (
    <div className="flex-none w-[400px] h-[400px] relative overflow-hidden bg-black">
      {/* Placeholder while image loads - always render with opacity-100 for SSR */}
      <div
        className="absolute inset-0 bg-black transition-opacity duration-500 opacity-100"
        style={{
          opacity: hasMounted.current && isLoaded ? 0 : 1,
        }}
        suppressHydrationWarning
      ></div>

      <NextImage
        src={src}
        alt={alt}
        fill
        className="object-cover transition-opacity duration-500 opacity-0"
        style={{
          opacity: hasMounted.current && isLoaded ? 1 : 0,
          transform: "translateZ(0)", // Hardware acceleration
        }}
        sizes="400px"
        loading="eager" // Always use eager to avoid hydration mismatch
        quality={75}
        priority={priority}
        onLoad={handleImageLoad}
        fetchPriority={priority ? "high" : "auto"}
        suppressHydrationWarning
      />
    </div>
  );
});

// Desktop gallery component with optimized scrolling and performance
const DesktopGallery = memo(function DesktopGallery() {
  // Use a ref to track if component is mounted to avoid hydration issues
  const hasMounted = useRef(false);

  useEffect(() => {
    // Mark as mounted after hydration
    hasMounted.current = true;

    // Preload images for better performance
    const preloadImages = () => {
      if (typeof window !== 'undefined') {
        GALLERY_IMAGES.forEach((image) => {
          const img = new window.Image();
          img.src = image.src;
        });
      }
    };

    preloadImages();
  }, []);

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
        className="flex animate-scroll"
        style={{
          transform: 'translateZ(0)', // Hardware acceleration
          willChange: 'transform',
          transition: 'opacity 0.5s ease-in-out',
          // Always render with opacity 1 for SSR, then use inline style for client
          opacity: 1
        }}
        suppressHydrationWarning
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

