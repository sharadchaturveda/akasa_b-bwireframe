"use client";

import { useState, useEffect } from "react";
import { TESTIMONIALS } from "./testimonials/TestimonialData";
import TestimonialCard from "./testimonials/TestimonialCard";
import TestimonialsBackground from "./testimonials/TestimonialsBackground";
import TestimonialAnimations from "./testimonials/TestimonialAnimations";

export default function TestimonialsSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Initialize scrollY to 0 to avoid hydration mismatch
    setScrollY(0);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="w-full relative py-32 overflow-hidden" style={{ minHeight: '700px' }}>
      {/* Background and decorative elements */}
      <TestimonialsBackground scrollY={scrollY} />

      {/* Content container */}
      <div className="relative flex flex-col items-center justify-center px-4 sm:px-8 z-10">
        <div className="w-full max-w-6xl mx-auto text-center">
          {/* Elegant heading with decorative elements */}
          <div className="mb-6 relative">
            <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-20 h-1 bg-gradient-to-r from-transparent via-[#E6C78B] to-transparent"></div>
            <h2 className="text-4xl md:text-6xl font-playfair mb-6 relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">Through the Grapevine</span>
              <div className="absolute -bottom-3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#E6C78B]/80 to-transparent"></div>
            </h2>
          </div>

          <p className="text-lg md:text-xl font-montserrat text-white/80 max-w-2xl mx-auto mb-16 leading-relaxed italic">
            {"What our distinguished guests are saying about their experience at Akasa"}
          </p>

          {/* Testimonials container with enhanced layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {TESTIMONIALS.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                quote={testimonial.quote}
                author={testimonial.author}
                title={testimonial.title}
                avatar={testimonial.avatar}
                rating={testimonial.rating}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <TestimonialAnimations />
    </section>
  );
}
