"use client";

import { memo, useState, useEffect } from "react";
import Image from "next/image";

/**
 * MobileEventsTestimonialsSection Component
 *
 * A mobile-optimized version of the Events page testimonials section
 */
const MobileEventsTestimonialsSection = memo(function MobileEventsTestimonialsSection() {
  // Testimonials data
  const testimonials = [
    {
      id: 1,
      quote: "Our corporate event at Akasa was flawlessly executed. The team went above and beyond to accommodate our requests.",
      author: "Sarah Chen",
      position: "Marketing Director, TechVision",
      image: "/images/testimonial1.jpg"
    },
    {
      id: 2,
      quote: "We celebrated our anniversary at Akasa and it was magical. The private dining room was intimate and the food was exceptional.",
      author: "James & Emily Wilson",
      position: "Private Dining Guests",
      image: "/images/testimonial2.jpg"
    },
    {
      id: 3,
      quote: "The attention to detail for our product launch was impressive. Our clients were thoroughly impressed with the venue and service.",
      author: "Michael Rodriguez",
      position: "CEO, Innovate Solutions",
      image: "/images/testimonial3.jpg"
    }
  ];

  // State for current testimonial
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="w-full bg-black py-12 relative overflow-hidden mobile-container">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black"></div>

      {/* Subtle animated particles */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 rounded-full bg-[#E6C78B] animate-float" style={{ animationDuration: '15s' }}></div>
        <div className="absolute top-1/3 left-2/3 w-1 h-1 rounded-full bg-[#E6C78B] animate-float" style={{ animationDuration: '20s' }}></div>
        <div className="absolute top-2/3 left-1/3 w-1 h-1 rounded-full bg-[#E6C78B] animate-float" style={{ animationDuration: '25s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section heading */}
        <div className="text-center mb-8">
          <h2 className="text-mobile-2xl text-2xl font-playfair text-white mb-2">What Our Guests Say</h2>
          <div className="w-16 h-[1px] bg-gradient-to-r from-[#E6C78B]/80 to-transparent mx-auto"></div>
        </div>

        {/* Testimonial carousel - simplified for mobile */}
        <div className="max-w-sm mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`transition-opacity duration-500 ${
                index === currentIndex ? 'opacity-100' : 'opacity-0 hidden'
              }`}
            >
              <div className="bg-black/40 border border-white/10 rounded-lg p-5 text-center">
                {/* Author image */}
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

                {/* Quote */}
                <p className="text-mobile-sm text-sm italic text-white/90 mb-4 text-container">"{testimonial.quote}"</p>

                {/* Author info */}
                <p className="text-mobile-sm text-sm font-medium text-white">{testimonial.author}</p>
                <p className="text-mobile-xs text-xs text-white/60">{testimonial.position}</p>
              </div>
            </div>
          ))}

          {/* Dots indicator - improved for touch */}
          <div className="flex justify-center gap-3 mt-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-[#E6C78B]' : 'bg-white/30'
                } touch-manipulation min-w-[24px] min-h-[24px] flex items-center justify-center p-3`}
                aria-label={`Go to testimonial ${index + 1}`}
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
