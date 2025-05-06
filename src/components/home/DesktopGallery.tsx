"use client";

import { memo, useState, useEffect } from "react";
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
        loading="eager" // Always use eager to avoid hydration mismatch
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

  useEffect(() => {
    // Set gallery to visible immediately
    setIsVisible(true);

    // Preload images for better performance
    const preloadImages = () => {
      GALLERY_IMAGES.forEach((image) => {
        const img = new Image();
        img.src = image.src;
      });
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

