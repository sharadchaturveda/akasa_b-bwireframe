"use client";

import { memo } from "react";

const TestimonialsSection = memo(function TestimonialsSection() {
  const testimonials = [
    {
      quote: "The private dining experience at Akasa exceeded all our expectations. The attention to detail was impeccable.",
      author: "Sarah Chen",
      event: "Anniversary Dinner"
    },
    {
      quote: "Our corporate event was a huge success thanks to the Akasa team. The food was exceptional and the service was flawless.",
      author: "Michael Wong",
      event: "Annual Company Dinner"
    },
    {
      quote: "Chef Akhilesh created a custom menu for our wedding that perfectly reflected our tastes. Our guests are still talking about it!",
      author: "Priya & Raj Mehta",
      event: "Wedding Reception"
    }
  ];

  return (
    <section className="w-full bg-black py-16 relative">
      {/* Background image with optimized loading */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0 opacity-30"
        style={{
          backgroundImage: "url('/images/menu/hero/gallery-3.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      ></div>
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair mb-4">{"What Our Clients Say"}</h2>
          <p className="text-lg font-montserrat text-white/70 max-w-2xl mx-auto">
            {"Hear from those who have hosted their special events with us."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-black/80 backdrop-blur-sm p-6 border border-[#1A2A3A]">
              <svg className="w-10 h-10 text-[#E6C78B] mb-4 opacity-50" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-white/90 mb-4 italic">"{testimonial.quote}"</p>
              <div>
                <p className="font-medium text-white">{testimonial.author}</p>
                <p className="text-sm text-white/60">{testimonial.event}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default TestimonialsSection;

