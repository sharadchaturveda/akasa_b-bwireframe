"use client";

import { memo, useState, useEffect } from "react";
import Image from "next/image";

/**
 * Testimonials data for the Events page mobile view
 */
const testimonials = [
  {
    id: 1,
    quote: "Our corporate event at Akasa was flawlessly executed. The team went above and beyond to accommodate our requests.",
    author: "Sarah Chen",
    position: "Marketing Director, TechVision",
    image: "/images/home/testimonials/avatar-1.jpg"
  },
  {
    id: 2,
    quote: "We celebrated our anniversary at Akasa and it was magical. The private dining room was intimate and the food was exceptional.",
    author: "James & Emily Wilson",
    position: "Private Dining Guests",
    image: "/images/home/testimonials/avatar-2.jpg"
  },
  {
    id: 3,
    quote: "The attention to detail for our product launch was impressive. Our clients were thoroughly impressed with the venue and service.",
    author: "Michael Rodriguez",
    position: "CEO, Innovate Solutions",
    image: "/images/home/testimonials/avatar-3.jpg"
  }
];

/**
 * MobileEventsTestimonialsSection Component
 *
 * A mobile-optimized version of the Events page testimonials section that
 * displays testimonials in a carousel format with auto-rotation.
 */
const MobileEventsTestimonialsSection = memo(function MobileEventsTestimonialsSection() {

  // State to track which testimonial is currently displayed in the carousel
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate testimonials effect
  useEffect(() => {
    const testimonialsCount = testimonials.length;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % testimonialsCount);
    }, 5000);

    // Cleanup function to clear the interval when component unmounts
    return () => clearInterval(interval);
  }, []); // No dependencies needed as testimonials is defined outside the component

  return (
    <section className="w-full bg-black py-12 relative overflow-hidden mobile-container">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/events/testimonials/background.jpg"
          alt="Testimonials background"
          fill
          sizes="100vw"
          className="object-cover"
          quality={60}
          loading="lazy"
          priority={false}
        />
      </div>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black z-[1]"></div>

      {/* Animated particles */}
      <div className="absolute inset-0 opacity-20 pointer-events-none z-[2]">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 rounded-full bg-[#E6C78B] animate-float" style={{ animationDuration: '15s' }}></div>
        <div className="absolute top-1/3 left-2/3 w-1 h-1 rounded-full bg-[#E6C78B] animate-float" style={{ animationDuration: '20s' }}></div>
        <div className="absolute top-2/3 left-1/3 w-1 h-1 rounded-full bg-[#E6C78B] animate-float" style={{ animationDuration: '25s' }}></div>
      </div>

      {/* Main content container */}
      <div className="container mx-auto px-4 relative z-[3]">
        {/* Section heading with mobile-specific text sizes */}
        <div className="text-center mb-8">
          <h2 className="text-mobile-2xl text-2xl font-playfair text-white mb-2">What Our Guests Say</h2>
          <div className="w-16 h-[1px] bg-gradient-to-r from-[#E6C78B]/80 to-transparent mx-auto"></div>
        </div>

        {/* Testimonial carousel */}
        <div className="max-w-sm mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`transition-opacity duration-500 ${
                index === currentIndex ? 'opacity-100' : 'opacity-0 hidden'
              }`}
            >
              <div className="bg-black/40 border border-white/10 rounded-lg p-5 text-center">
                <div className="w-16 h-16 mx-auto mb-4 relative rounded-full overflow-hidden border-2 border-[#E6C78B]/30">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.author}
                    fill
                    sizes="64px"
                    className="object-cover"
                    quality={75}
                  />
                </div>

                <p className="text-mobile-sm text-sm italic text-white/90 mb-4 text-container">"{testimonial.quote}"</p>

                <p className="text-mobile-sm text-sm font-medium text-white">{testimonial.author}</p>
                <p className="text-mobile-xs text-xs text-white/60">{testimonial.position}</p>
              </div>
            </div>
          ))}

          {/* Carousel navigation dots */}
          <div className="flex justify-center gap-3 mt-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)} // Change to this testimonial when clicked
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-[#E6C78B]' : 'bg-white/30'
                } touch-manipulation min-w-[24px] min-h-[24px] flex items-center justify-center p-3`}
                aria-label={`Go to testimonial ${index + 1}`} // Accessibility label
              >
                <span className={`w-3 h-3 rounded-full ${
                  index === currentIndex ? 'bg-[#E6C78B]' : 'bg-white/30'
                }`}></span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

export default MobileEventsTestimonialsSection;
