"use client";

import { memo } from "react";
import { TESTIMONIALS } from "@/data/testimonials";
import MobileTestimonialCard from "./MobileTestimonialCard";
import Image from "next/image";

/**
 * MobileTestimonialsSection Component
 *
 * A mobile-optimized version of the TestimonialsSection component specifically designed
 * for smaller screens. This component removes hover animations that were causing
 * layout shifts and vertical movement when scrolling on touch devices.
 *
 * Key differences from desktop version:
 * - Simplified layout with single column
 * - No hover effects or animations that could cause layout shifts
 * - Optimized image loading for mobile devices
 * - Adjusted font sizes and spacing for better mobile readability
 * - Only shows first 3 testimonials to reduce page weight
 *
 * @returns {JSX.Element} A mobile-optimized testimonials section
 */
const MobileTestimonialsSection = memo(function MobileTestimonialsSection() {
  return (
    <section className="w-full relative py-16 overflow-hidden bg-black mobile-container">
      {/* Background image - Using next/image for better performance and optimization */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/*
          Extended background container (150% height, offset by -25%)
          This technique prevents gaps at the edges when scrolling
        */}
        <div className="absolute inset-0 w-full h-[150%] top-[-25%]">
          <Image
            src="/images/home/testimonials/background-alt.jpg"
            alt="Testimonials background"
            fill
            sizes="100vw" // Full viewport width since this is a background
            className="object-cover"
            quality={60} // Lower quality is acceptable for a dimmed background
            loading="lazy" // This component is below the fold
            priority={false}
          />
        </div>
      </div>

      {/* Dark overlay to improve text readability over the background image */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Main content container with higher z-index to appear above background */}
      <div className="relative z-10 container mx-auto px-4">
        {/* Section heading with mobile-specific text sizes */}
        <div className="text-center mb-8">
          <h2 className="text-mobile-2xl text-2xl font-playfair text-white mb-2">Through the Grapevine</h2>
          <div className="w-16 h-[1px] bg-gradient-to-r from-[#E6C78B]/80 to-transparent mx-auto"></div>
          <p className="text-mobile-sm text-sm text-white/70 mt-2 max-w-xs mx-auto">What our guests have to say</p>
        </div>

        {/* Testimonials grid - Single column for mobile */}
        <div className="grid grid-cols-1 gap-6">
          {/*
            Only show first 3 testimonials to reduce page weight on mobile
            Each testimonial is rendered using the MobileTestimonialCard component
          */}
          {TESTIMONIALS.slice(0, 3).map((testimonial, index) => (
            <MobileTestimonialCard
              key={index}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

export default MobileTestimonialsSection;

