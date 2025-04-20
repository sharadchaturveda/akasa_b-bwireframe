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

// Simple, reliable mobile gallery component
const MobileGallery = memo(function MobileGallery() {
  return (
    <div className="block sm:hidden w-full overflow-x-auto">
      <div className="flex">
        {GALLERY_IMAGES.map((image, index) => (
          <div key={index} className="w-[80vw] h-[250px] flex-shrink-0 relative">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="80vw"
              className="object-cover"
              priority={index < 2}
              quality={75}
            />
          </div>
        ))}
      </div>
    </div>
  );
});

export default MobileGallery;
