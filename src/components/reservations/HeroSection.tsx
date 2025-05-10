"use client";

import { memo, useEffect, useState } from "react";
import Image from "next/image"
;

const HeroSection = memo(function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="h-[80vh] w-full relative overflow-hidden">
      {/* Background image with parallax effect */}
      <div className="absolute inset-0">
        <Image src="/images/reservations/hero/hero.jpg"
          alt="Elegant dining table setting"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={80} /* Balanced for performance and quality */
        />
      </div>

      {/* Overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"></div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-8 relative z-10 h-full flex flex-col items-center justify-center">
        <div className="max-w-3xl mx-auto text-center">
          {/* Decorative elements */}
          <div className={`mb-6 opacity-0 ${isVisible ? 'animate-fadeIn' : ''}`} style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
            <div className="flex items-center justify-center">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#E6C78B]/80"></div>
              <div className="mx-4">
                <svg className="w-8 h-8 text-[#E6C78B]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                </svg>
              </div>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#E6C78B]/80"></div>
            </div>
          </div>

          <h1
            className={`text-4xl md:text-6xl lg:text-7xl font-playfair mb-6 text-white opacity-0 ${isVisible ? 'animate-fadeSlideUp' : ''}`}
            style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
          >
            Reserve Your Table
          </h1>

          <p
            className={`text-lg md:text-xl font-montserrat text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto opacity-0 ${isVisible ? 'animate-fadeSlideUp' : ''}`}
            style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}
          >
            Secure your dining experience at Akasa. We look forward to serving you the finest Indian cuisine in an elegant atmosphere.
          </p>

          {/* Decorative separator */}
          <div
            className={`w-24 h-1 mx-auto bg-gradient-to-r from-transparent via-[#E6C78B] to-transparent opacity-0 ${isVisible ? 'animate-fadeIn' : ''}`}
            style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}
          ></div>
        </div>
      </div>

      {/* Decorative bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
    </section>
  );
});

export default HeroSection;



