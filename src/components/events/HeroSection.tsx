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

      {/* Main content container */}
      <div className="container mx-auto px-4 md:px-8 relative z-10 mt-6 md:mt-8">
        <div className="max-w-3xl mx-auto text-center">
          {/*
            Hero heading with animated entrance
            The animate-fadeSlideUp class provides a smooth entrance animation
            Animation delay staggers the entrance of different elements
          */}
          <div className="mb-8 relative animate-fadeSlideUp" style={{ animationDelay: '0.3s' }}>
            <span className="text-[#E6C78B] text-sm tracking-widest uppercase mb-4 block font-montserrat">Unforgettable Experiences</span>
            {/* Decorative accent line above heading */}
            <div className="absolute left-1/2 top-12 -translate-x-1/2 -translate-y-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-[#E6C78B] to-transparent"></div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair mb-6 relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80" style={{ textShadow: '0 4px 6px rgba(0, 0, 0, 0.3)' }}>Host Your Event at Akasa</span>
              {/* Decorative underline below heading */}
              <div className="absolute -bottom-3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#E6C78B]/80 to-transparent"></div>
            </h1>
          </div>

          {/*
            Hero description paragraph with animated entrance
            Delayed slightly after the heading for a staggered effect
          */}
          <p className="text-lg md:text-xl font-montserrat text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto animate-fadeSlideUp" style={{ animationDelay: '0.5s', letterSpacing: '0.02em' }}>
            From intimate private dinners to grand celebrations, Akasa offers the perfect setting for your special occasions. Our dedicated events team will work with you to create a memorable experience tailored to your needs.
          </p>

          {/*
            Decorative divider with clock icon
            Provides visual separation between text and buttons
          */}
          <div className="flex items-center justify-center w-full mb-6 animate-fadeSlideUp" style={{ animationDelay: '0.7s' }}>
            <div className="h-[1px] w-16 md:w-24 bg-gradient-to-r from-transparent via-[#E6C78B]/60 to-transparent"></div>
            <div className="mx-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#E6C78B]/80" aria-hidden="true">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1" />
                <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              </svg>
            </div>
            <div className="h-[1px] w-16 md:w-24 bg-gradient-to-r from-transparent via-[#E6C78B]/60 to-transparent"></div>
          </div>

          {/*
            Call-to-action buttons with animated entrance
            Displayed in a row on desktop, stacked on mobile
            Both use Link with prefetch for better performance
          */}
          <div className="flex flex-wrap justify-center gap-6 animate-fadeSlideUp" style={{ animationDelay: '0.9s' }}>
            {/* Inquiry button with prefetching */}
            <Link href="#inquiry" prefetch={true}>
              <button className="group inline-flex items-center justify-center rounded-full text-sm font-montserrat font-medium tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden shadow-md hover:shadow-lg bg-[#1A2A3A] text-white px-8 py-4 min-w-[180px]">
                {/* Gold fill animation that slides in from left on hover */}
                <span className="absolute inset-0 rounded-full bg-[#E6C78B] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>

                {/* Button text that changes color on hover */}
                <span className="relative flex-1 text-center group-hover:text-black transition-colors duration-300">
                  Inquire Now
                </span>
              </button>
            </Link>

            {/* Reservation button with prefetching */}
            <Link href="/reservations" prefetch={true}>
              <button className="group inline-flex items-center justify-center rounded-full text-sm font-montserrat font-medium tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden shadow-md hover:shadow-lg bg-[#1A2A3A] text-white px-8 py-4 min-w-[180px]">
                {/* Gold fill animation that slides in from left on hover */}
                <span className="absolute inset-0 rounded-full bg-[#E6C78B] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>

                {/* Button text that changes color on hover */}
                <span className="relative flex-1 text-center group-hover:text-black transition-colors duration-300">
                  Make a Reservation
                </span>
              </button>
            </Link>
          </div>

          {/*
            Scroll indicator with bounce animation
            Provides a visual cue that there's more content below
          */}
          <div className="flex justify-center mt-10 animate-bounce">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-[#E6C78B]/10"></div>
              <svg className="w-6 h-6 text-[#E6C78B]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default HeroSection;

