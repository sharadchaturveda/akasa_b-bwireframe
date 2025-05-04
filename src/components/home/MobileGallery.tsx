"use client";

import { memo, useState, useEffect } from "react";
import Image from "next/image";

// Gallery images array with optimized paths and descriptive alt text
const GALLERY_IMAGES = [
  { src: "/images/events/listings/birthday.jpg", alt: "Elegant dining setup with traditional Indian decor" },
  { src: "/images/unused/gallery2.jpg", alt: "Chef preparing authentic Indian cuisine" },
  { src: "/images/events/listings/anniversary.jpg", alt: "Signature cocktail with exotic spices" },
  { src: "/images/unused/gallery5.jpg", alt: "Beautifully plated Indian dish with garnish" },
  { src: "/images/events/listings/office-lunch.jpg", alt: "Restaurant interior with ambient lighting" },
];

// Optimized mobile gallery component with performance enhancements
const MobileGallery = memo(function MobileGallery() {
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Use Intersection Observer to detect when gallery is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const galleryElement = document.getElementById('mobile-gallery');
    if (galleryElement) {
      observer.observe(galleryElement);
    }

    return () => {
      if (galleryElement) {
        observer.unobserve(galleryElement);
      }
    };
  }, []);

  // Track visible slide for optimized rendering
  useEffect(() => {
    if (!isVisible) return;

    const handleScroll = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute('data-index') || '0', 10);
          setVisibleIndex(index);
        }
      });
    };

    const options = {
      root: document.getElementById('mobile-gallery'),
      threshold: 0.7,
    };

    const observer = new IntersectionObserver(handleScroll, options);

    // Observe all slides
    document.querySelectorAll('.gallery-slide').forEach(slide => {
      observer.observe(slide);
    });

    return () => {
      observer.disconnect();
    };
  }, [isVisible]);

  return (
    <div id="mobile-gallery" className="block sm:hidden w-full overflow-x-auto scrollbar-hide">
      <div className="flex snap-x snap-mandatory">
        {GALLERY_IMAGES.map((image, index) => {
          const isPriority = index < 2;
          const isNearVisible = Math.abs(index - visibleIndex) <= 1;

          return (
            <div
              key={index}
              data-index={index}
              className="w-[85vw] h-[280px] flex-shrink-0 relative snap-start bg-black gallery-slide"
              style={{
                scrollSnapAlign: 'center',
                scrollSnapStop: 'always',
                marginRight: index === GALLERY_IMAGES.length - 1 ? '0' : '10px'
              }}
            >
              {/* Placeholder to maintain layout before image loads */}
              <div className="absolute inset-0 bg-black"></div>

              {/* Only render nearby images for better performance */}
              {(isPriority || isVisible) && (
                <>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="85vw"
                    className="object-cover"
                    loading="eager" // Always use eager to avoid hydration mismatch
                    quality={75}
                    priority={isPriority}
                    fetchPriority={isPriority ? "high" : "auto"}
                    style={{
                      transform: "translateZ(0)", // Hardware acceleration
                    }}
                  />
                  {/* Add subtle gradient overlay for better visibility */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40"></div>

                  {/* Add subtle indicator dots */}
                  <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                    {GALLERY_IMAGES.map((_, dotIndex) => (
                      <div
                        key={dotIndex}
                        className={`w-1.5 h-1.5 rounded-full ${dotIndex === index ? 'bg-white' : 'bg-white/40'}`}
                      ></div>
                    ))}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default MobileGallery;

