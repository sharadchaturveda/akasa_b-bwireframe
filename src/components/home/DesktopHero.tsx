"use client";

import { memo } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useImageCarousel } from "@/hooks/useImageCarousel";
import { IMAGES } from "@/constants";
import Icon from "@/components/ui/icon";
import HydrationSafeImage from "@/components/ui/HydrationSafeImage";
import {
  DESKTOP_HERO_IMAGES,
  HERO_CAROUSEL_SETTINGS,
  HERO_LOGO_SETTINGS,
  HERO_TEXT_SHADOW
} from "@/constants/heroConstants";

/**
 * HeroLogo Component
 *
 * The logo displayed in the hero section
 */
const HeroLogo = memo(function HeroLogo() {
  const { width, height, src, alt } = HERO_LOGO_SETTINGS;

  return (
    <div className="flex justify-center items-center w-full mx-auto text-center">
      <div className="h-[180px] w-[360px] mx-auto relative">
        {/*
          Restore original size while fixing aspect ratio warning:
          1. Use explicit width/height that match the original dimensions
          2. Don't use CSS classes that modify width/height
          3. Use layout="intrinsic" to maintain aspect ratio
        */}
        <HydrationSafeImage
          src={src}
          alt={alt}
          width={720} // Original width * 2 for high resolution
          height={360} // Original height * 2 for high resolution
          priority
          quality={IMAGES.HIGH_QUALITY}
          className="opacity-100 mx-auto"
          style={{
            objectFit: "contain",
            maxWidth: "100%",
            height: "auto",
            margin: "0 auto"
          }}
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
    <div className="text-center w-full max-w-2xl mx-auto desktop-hero-content" style={{ margin: "0 auto", padding: "0" }}>
      <p className="text-white/90 uppercase tracking-widest text-sm md:text-base mb-4 text-center">
        Experience
      </p>

      <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-playfair italic mb-6 text-center"
          style={{...HERO_TEXT_SHADOW, textAlign: "center"}}>
        Exquisite Indian Cuisine
      </h1>

      <div className="flex items-center w-full max-w-xs md:max-w-md justify-center mb-6 mx-auto">
        <div className="h-px bg-white/50 flex-1"></div>
        <div className="mx-4">
          <Icon name="clock" size={24} color="white" strokeWidth={1} />
        </div>
        <div className="h-px bg-white/50 flex-1"></div>
      </div>

      <p className="text-white/80 mb-8 text-sm md:text-base text-center">
        Fine Dining at the Heart of Singapore
      </p>

      <div className="text-center w-full">
        <Link href="/menu" className="inline-block mx-auto">
          <Button className="bg-[#1A2A3A] hover:bg-[#0A1A2A] text-white uppercase px-8 py-2">
            Explore Menu
          </Button>
        </Link>
      </div>
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
    images: DESKTOP_HERO_IMAGES,
    ...HERO_CAROUSEL_SETTINGS
  });

  return (
    <div className="absolute inset-0">
      {DESKTOP_HERO_IMAGES.map((image, index) => (
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
          <HydrationSafeImage
            src={image.src}
            alt={image.alt}
            fill
            priority={true} // Mark all hero images as priority to fix LCP warning
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
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-black hero-section desktop-hero-section">
      {/* Background Image Carousel */}
      <ImageCarousel />

      {/* Logo - Fixed at top */}
      <div className="hero-logo-container desktop-hero-logo">
        <HeroLogo />
      </div>

      {/* Text Content - Positioned below the logo */}
      <div className="hero-text-container desktop-hero-text">
        <HeroContent />
      </div>
    </div>
  );
});

export default DesktopHero;
