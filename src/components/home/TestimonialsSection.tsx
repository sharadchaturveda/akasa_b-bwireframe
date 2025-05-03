"use client";

import { memo } from "react";
import { TESTIMONIALS } from "@/data/testimonials";
import TestimonialBackground from "./testimonials/TestimonialBackground";
import TestimonialHeader from "./testimonials/TestimonialHeader";
import TestimonialCard from "./testimonials/TestimonialCard";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { useDeviceDetection } from "@/hooks/useDeviceDetection";
import dynamic from "next/dynamic";

// Dynamically import the mobile version to avoid loading it on desktop
const MobileTestimonialsSection = dynamic(
  () => import("@/components/mobile/MobileTestimonialsSection"),
  { ssr: false }
);

// Use memo to prevent unnecessary re-renders
const TestimonialsSection = memo(function TestimonialsSection() {
  // Use custom hook for scroll position tracking
  const { scrollY, isMounted } = useScrollPosition();
  // Use custom hook for device detection
  const { isMobile } = useDeviceDetection();

  // Render the mobile version on mobile devices
  if (isMobile) {
    return <MobileTestimonialsSection />;
  }

  // Render the desktop version on desktop devices
  return (
    <section className="w-full relative py-24 overflow-hidden min-h-[80vh] bg-black">
      {/* Background component */}
      <TestimonialBackground isMounted={isMounted} scrollY={scrollY} />

      {/* Content container */}
      <div className="relative z-10 container mx-auto px-4 md:px-8">
        {/* Header component */}
        <TestimonialHeader />

        {/* Testimonials grid - Desktop only */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
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
