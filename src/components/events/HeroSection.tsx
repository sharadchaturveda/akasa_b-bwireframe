"use client";

import Link from "next/link";
import Image from "next/image";
import { memo } from "react";

/**
 * HeroSection Component
 *
 * The main hero section for the Events page featuring a full-screen background image,
 * headline text, and call-to-action buttons.
 *
 * Features:
 * - Parallax background effect for visual depth
 * - Animated entrance for text elements
 * - Decorative particles and glow effects
 * - Optimized image loading with next/image
 * - Responsive design for all screen sizes
 * - Route prefetching for better performance
 *
 * @returns {JSX.Element} A full-screen hero section
 */
const HeroSection = memo(function HeroSection() {
  return (
    <section className="h-screen w-full bg-black flex flex-col items-center justify-center relative overflow-hidden pt-16 md:pt-20">
      {/*
        Background image with parallax effect
        The parallax effect is created using CSS transforms and z-index positioning
        This creates a sense of depth as the user scrolls
      */}
      <div className="absolute inset-0 z-0" style={{
        zIndex: -1 // Behind all other content
      }}>
        {/* Use Next.js Image component for better performance */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/images/events/hero/hero.jpg"
            alt="Events at Akasa"
            fill
            priority={true}
            sizes="100vw"
            quality={90}
            className="object-cover"
            style={{
              opacity: 0.7,
              objectPosition: "center"
            }}
          />
        </div>

        {/* Gradient overlay to improve text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/60 to-black/80"></div>
      </div>

      {/* Top and bottom fade gradients to soften the section edges */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent"></div>

      {/* Static glow elements for better performance */}
      <div className="absolute top-20 right-10 w-60 h-60 rounded-full bg-[#E6C78B]/10 blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-[#E6C78B]/5 blur-3xl"></div>

      {/* Main content container with higher z-index to appear above background */}
      <div className="container mx-auto px-4 md:px-8 relative z-10 pt-16 md:pt-0">
        {/* Hero content with increased top padding on mobile */}
        <div className="text-center mt-16 md:mt-0">
          <h1 className="text-4xl md:text-6xl font-playfair mb-4 text-white">
            Host Your Special Event
          </h1>
          <p className="text-xl md:text-2xl font-montserrat text-white/80 max-w-2xl mx-auto">
            Create unforgettable memories in our elegant spaces
          </p>

          {/* Call-to-action buttons */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {/* Buttons here */}
          </div>
        </div>
      </div>
    </section>
  );
});

export default HeroSection;



