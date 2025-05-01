"use client";

import { memo } from "react";
import { TESTIMONIALS } from "@/data/testimonials";
import TestimonialBackground from "./testimonials/TestimonialBackground";
import TestimonialHeader from "./testimonials/TestimonialHeader";
import TestimonialCard from "./testimonials/TestimonialCard";
import { useScrollPosition } from "@/hooks/useScrollPosition";

// Use memo to prevent unnecessary re-renders
const TestimonialsSection = memo(function TestimonialsSection() {
  // Use custom hook for scroll position tracking
  const { scrollY, isMounted } = useScrollPosition();

  return (
    <section className="w-full relative py-24 overflow-hidden min-h-[80vh] bg-black">
      {/* Background component */}
      <TestimonialBackground isMounted={isMounted} scrollY={scrollY} />

      {/* Content container */}
      <div className="relative z-10 container mx-auto px-4 md:px-8">
        {/* Header component */}
        <TestimonialHeader />

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <TestimonialCard
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

export default TestimonialsSection;
