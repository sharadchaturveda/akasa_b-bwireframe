"use client";

import { memo } from "react";

// Testimonial data
const TESTIMONIALS = [
  {
    quote: "Every bite was a revelation. The space, the staff, the food—everything sings.",
    author: "Sarah Johnson, Food Critic"
  },
  {
    quote: "An unforgettable dining experience that blends tradition with innovation.",
    author: "Michael Chen, Regular Patron"
  },
  {
    quote: "The flavors transported me back to my grandmother's kitchen in Delhi. Authentic yet elevated.",
    author: "Priya Patel, Food Blogger"
  }
];

// Memoized testimonial card component
const TestimonialCard = memo(function TestimonialCard({ quote, author }: { quote: string; author: string }) {
  return (
    <div className="bg-[#0D0D0D]/90 p-4 sm:p-6 rounded-lg border border-[#8B4513]/30 shadow-lg">
      <div className="text-5xl sm:text-6xl text-[#8B4513] font-lora leading-none mb-3">&quot;</div>
      <blockquote className="text-base sm:text-lg italic font-lora text-white">
        {quote}
        <footer className="mt-4 text-sm not-italic text-gray-300 flex items-center justify-center font-montserrat">
          <span className="w-6 h-[1px] bg-[#8B4513] mr-2"></span>
          {author}
        </footer>
      </blockquote>
    </div>
  );
});

export default function TestimonialsSection() {
  return (
    <section className="w-full relative py-16">
      {/* Full-width background image - using CSS background for better performance */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/testimonial.jpg?quality=75&width=1200')" }}></div>

      {/* Overlay with gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/70"></div>

      {/* Content container */}
      <div className="relative flex flex-col items-center justify-center px-4 sm:px-8 py-16 z-10">
        <div className="w-full max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair mb-4 text-white">{"Through the Grapevine"}</h2>
          <p className="text-lg font-montserrat text-gray-200 mb-8 italic">{"What our guests are saying"}</p>

          {/* Simplified decorative element for better performance */}
          <div className="flex items-center justify-center mb-8">
            <div className="w-16 h-[1px] bg-[#8B4513]"></div>
            <div className="w-3 h-3 mx-2 rounded-full bg-[#8B4513]"></div>
            <div className="w-16 h-[1px] bg-[#8B4513]"></div>
          </div>

          {/* Testimonials container - single column on mobile, 3 columns on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {TESTIMONIALS.map((testimonial, index) => (
              <TestimonialCard 
                key={index}
                quote={testimonial.quote}
                author={testimonial.author}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
