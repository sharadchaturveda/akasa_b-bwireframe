"use client";

import { memo } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useImageCarousel } from "@/hooks/useImageCarousel";
import { IMAGES, LOGO } from "@/constants";
import Icon from "@/components/ui/icon";

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

/**
 * HeroLogo Component
 *
 * The logo displayed in the hero section
 */
const HeroLogo = memo(function HeroLogo() {
  return (
    <div className="hero-logo-container relative mb-12">
      <div className="relative h-[180px] w-[360px]">
        <Image
          src="/images/brand/logo-white.png"
          alt="Akasa Logo"
          width={600}
          height={240}
          priority
          loading="eager"
          quality={IMAGES.HIGH_QUALITY}
          className="w-full h-full object-contain opacity-100 absolute top-0 left-0"
        />
      </div>
    </div>
  );
});

/**
 * HeroContent Component
 *
 * The text content displayed in the hero section
 */
const HeroContent = memo(function HeroContent() {
  return (
    <div className="hero-text-container">
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
          <Icon name="clock" size={24} color="white" strokeWidth={1} />
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
  );
});

/**
 * ImageCarousel Component
 *
 * The image carousel displayed in the hero section
 */
const ImageCarousel = memo(function ImageCarousel() {
  const {
    registerElementRef,
    transitionDuration
  } = useImageCarousel({
    images: HERO_IMAGES,
    interval: 2000,
    transitionDuration: 1000,
    autoplay: true,
    loop: true
  });

  return (
    <div className="absolute inset-0">
      {HERO_IMAGES.map((image, index) => (
        <div
          key={index}
          ref={(el) => registerElementRef(el, index)}
          className="absolute inset-0 transition-opacity ease-in-out"
          style={{
            opacity: index === 0 ? 1 : 0,
            zIndex: index === 0 ? 1 : 0,
            transitionDuration: `${transitionDuration}ms`
          }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority={index === 0}
            loading={index === 0 ? "eager" : "lazy"}
            sizes="100vw"
            quality={IMAGES.DEFAULT_QUALITY}
            className="object-cover opacity-60"
          />
        </div>
      ))}
      {/* Bottom gradient for smooth transition */}
      <div className="absolute left-0 right-0 bottom-0 h-[120px] bg-gradient-to-t from-black via-black/90 to-transparent z-[2]"></div>
    </div>
  );
});

/**
 * DesktopHero Component
 *
 * Desktop-only hero section with image carousel.
 * This component is completely separate from the mobile hero
 * and will only be rendered on desktop devices.
 *
 * @returns {JSX.Element} The rendered component
 */
const DesktopHero = memo(function DesktopHero() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
      {/* Background Image Carousel */}
      <ImageCarousel />

      {/* Structural container to enforce vertical layout */}
      <div className="absolute inset-0 flex flex-col items-stretch z-10">
        {/* Logo - Fixed at top with height constraint */}
        <HeroLogo />

        {/* Content Container - Part of the flex column layout */}
        <div className="flex-grow flex items-center justify-center z-30">
          {/* Text Content */}
          <HeroContent />
        </div>
      </div>
    </div>
  );
});

export default DesktopHero;
