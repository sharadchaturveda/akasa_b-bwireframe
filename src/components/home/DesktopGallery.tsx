"use client";

import { memo } from "react";
import Image from "next/image";

// Gallery images array
const GALLERY_IMAGES = [
  { src: "/images/gallery1.jpg", alt: "Gallery Image 1" },
  { src: "/images/gallery2.jpg", alt: "Gallery Image 2" },
  { src: "/images/gallery3.jpg", alt: "Gallery Image 3" },
  { src: "/images/gallery5.jpg", alt: "Gallery Image 5" },
  { src: "/images/gallery6.jpg", alt: "Gallery Image 6" },
];

// Memoized gallery image component
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
        quality={75}
        priority={priority}
      />
    </div>
  );
});

// Desktop gallery component with auto-scrolling
const DesktopGallery = memo(function DesktopGallery() {
  return (
    <div className="hidden sm:block overflow-hidden">
      <div className="flex animate-scroll will-change-transform hardware-accelerated">
        {/* First set of images */}
        {GALLERY_IMAGES.map((image, index) => (
          <GalleryImage
            key={index}
            src={image.src}
            alt={image.alt}
            priority={index < 3}
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
