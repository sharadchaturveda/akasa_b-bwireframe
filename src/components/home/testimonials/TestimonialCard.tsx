"use client";

import { memo, useState, useEffect } from "react";
import Image from "next/image";
import StarRating from "./StarRating";
import { TestimonialType } from "./TestimonialData";

interface TestimonialCardProps extends TestimonialType {
  index: number;
}

const TestimonialCard = memo(function TestimonialCard({
  quote,
  author,
  title,
  avatar,
  rating,
  index
}: TestimonialCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className={`group relative overflow-hidden transition-all duration-700 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      } hover:-translate-y-2`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Card background with enhanced glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#E6C78B]/0 via-[#E6C78B]/30 to-[#E6C78B]/0 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

      <div className="relative bg-black/80 backdrop-blur-sm border border-[#E6C78B]/10 rounded-lg overflow-hidden transition-all duration-500 group-hover:shadow-[0_0_25px_rgba(230,199,139,0.3)] p-8 group-hover:border-[#E6C78B]/30">
        {/* Decorative corner accents with enhanced animations */}
        <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-[#E6C78B]/30 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:w-16 group-hover:h-16"></div>
        <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-[#E6C78B]/30 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:w-16 group-hover:h-16"></div>

        {/* Quote icon with animation */}
        <div className="absolute top-6 right-6 text-6xl text-[#E6C78B]/10 font-lora leading-none transition-all duration-500 group-hover:text-[#E6C78B]/20 group-hover:scale-110">&quot;</div>

        {/* Star rating with animation */}
        <div className="transform transition-transform duration-500 group-hover:scale-105">
          <StarRating rating={rating} />
        </div>

        {/* Quote text with animation */}
        <blockquote className="text-base sm:text-lg italic font-lora text-white/90 mb-6 relative z-10 transition-all duration-500 group-hover:text-white">
          "{quote}"
        </blockquote>

        {/* Author info with avatar and animations */}
        <div className="flex items-center mt-6 transition-transform duration-500 group-hover:translate-x-1">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#E6C78B]/30 mr-4 shadow-lg transition-all duration-500 group-hover:border-[#E6C78B]/70 group-hover:shadow-[0_0_15px_rgba(230,199,139,0.3)]">
            <Image
              src={avatar}
              alt={author}
              fill
              sizes="48px"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
          <div className="text-left">
            <div className="font-medium text-[#E6C78B] text-sm transition-all duration-500 group-hover:text-[#E6C78B]">{author}</div>
            <div className="text-xs text-white/60 transition-all duration-500 group-hover:text-white/80">{title}</div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default TestimonialCard;
