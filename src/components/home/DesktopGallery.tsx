"use client";

import { memo, useState, useEffect } from "react";
import Image from "next/image";

// Gallery images array
const GALLERY_IMAGES = [
  { src: "/images/gallery1.jpg", alt: "Gallery Image 1" },
  { src: "/images/gallery2.jpg", alt: "Gallery Image 2" },
  { src: "/images/gallery3.jpg", alt: "Gallery Image 3" },
  { src: "/images/gallery5.jpg", alt: "Gallery Image 5" },
  { src: "/images/gallery6.jpg", alt: "Gallery Image 6" },
];

// Optimized gallery image component
const GalleryImage = memo(function GalleryImage({
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
        quality={60}
        priority={priority}
      />
    </div>
  );
});

// Desktop gallery component with optimized scrolling
const DesktopGallery = memo(function DesktopGallery() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Only enable animation when component is in viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        setIsVisible(entry.isIntersecting);
      });
    }, { threshold: 0.1 });
    
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
  
  return (
    <div id="desktop-gallery" className="hidden sm:block overflow-hidden">
      <div 
        className={`flex ${isVisible ? 'animate-scroll' : ''}`}
        style={{ 
          transform: 'translateZ(0)',
          willChange: isVisible ? 'transform' : 'auto'
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
