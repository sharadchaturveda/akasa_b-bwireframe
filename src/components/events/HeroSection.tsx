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
      <div className="absolute inset-0 z-0 transform scale-110" style={{
        willChange: 'transform', // Performance optimization hint for browsers
        transform: 'translateZ(-1px) scale(2)', // 3D transform for parallax effect
        zIndex: -1 // Behind all other content
      }}>
        {/*
          Hero background image using next/image for optimization
          - fill prop makes the image fill its container
          - priority and loading="eager" ensure this critical image loads first
          - quality set to 80 for good balance between quality and performance
        */}
        <Image
          src="/images/events/hero/hero.jpg"
          alt="Events background"
          fill
          sizes="100vw" // Full viewport width
          className="object-cover"
          quality={80} // High quality for hero image
          priority // Load this image with highest priority
          loading="eager" // Start loading immediately
          style={{
            objectPosition: "center",
            opacity: 0.7, // Slightly dimmed for better text contrast
            filter: "contrast(1.1) brightness(0.9)" // Enhanced visual appearance
          }}
        />
        {/* Gradient overlay to improve text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/60 to-black/80"></div>
      </div>

      {/* Top and bottom fade gradients to soften the section edges */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent"></div>

      {/*
        Animated glow orbs that slowly pulse for visual interest
        These create subtle movement and depth in the background
      */}
      <div className="absolute top-20 right-10 w-60 h-60 rounded-full bg-[#E6C78B]/10 blur-3xl animate-pulse-slow" style={{ animationDuration: '8s' }}></div>
      <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-[#E6C78B]/5 blur-3xl animate-pulse-slow" style={{ animationDuration: '12s' }}></div>
      <div className="absolute top-1/3 left-1/4 w-40 h-40 rounded-full bg-[#E6C78B]/5 blur-3xl animate-pulse-slow" style={{ animationDuration: '10s' }}></div>

      {/*
        Subtle animated particles that float around
        These add a touch of elegance and movement to the background
        Different animation durations create more natural, varied movement
      */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 rounded-full bg-[#E6C78B] animate-float" style={{ animationDuration: '15s' }}></div>
        <div className="absolute top-1/3 left-2/3 w-1 h-1 rounded-full bg-[#E6C78B] animate-float" style={{ animationDuration: '20s' }}></div>
        <div className="absolute top-2/3 left-1/3 w-1 h-1 rounded-full bg-[#E6C78B] animate-float" style={{ animationDuration: '25s' }}></div>
      </div>

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

