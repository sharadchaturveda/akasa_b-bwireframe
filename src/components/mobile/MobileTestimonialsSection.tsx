"use client";

import { memo } from "react";
import { TESTIMONIALS } from "@/data/testimonials";
import MobileTestimonialCard from "./MobileTestimonialCard";

/**
 * MobileTestimonialsSection Component
 *
 * A mobile-optimized version of the TestimonialsSection component without hover animations
 * that were causing vertical movement when scrolling
 */
const MobileTestimonialsSection = memo(function MobileTestimonialsSection() {
  return (
    <section className="w-full relative py-16 overflow-hidden bg-black mobile-container">
      {/* Background image */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: "url('/images/testimonials/testimonial-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: '100%',
          height: '150%', // Extend beyond the container to avoid gaps
          top: '-25%' // Offset to ensure coverage at the top
        }}
      ></div>

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content container */}
      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-mobile-2xl text-2xl font-playfair text-white mb-2">Through the Grapevine</h2>
          <div className="w-16 h-[1px] bg-gradient-to-r from-[#E6C78B]/80 to-transparent mx-auto"></div>
          <p className="text-mobile-sm text-sm text-white/70 mt-2 max-w-xs mx-auto">What our guests have to say</p>
        </div>

        {/* Testimonials grid - Single column for mobile */}
        <div className="grid grid-cols-1 gap-6">
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
