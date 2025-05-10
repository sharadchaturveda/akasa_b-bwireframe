"use client";

import { memo } from 'react';
import Image from 'next/image';
import { Testimonial } from '@/data/testimonials';
import StarRating from './StarRating';
import { ANIMATIONS, COLORS } from './constants';

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

const TestimonialCard = memo(function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
  return (
    <div
      className="relative bg-black/40 p-6 sm:p-8 rounded-lg border border-[#E6C78B]/10 hover:border-[#E6C78B]/30 transition-colors duration-300 group opacity-0 animate-fadeIn touch-manipulation"
      style={{
        animationDelay: `${index * ANIMATIONS.CARD_DELAY_MS}ms`,
        animationFillMode: 'forwards'
      }}
    >

      <div className="relative">
        {/* Quote icon */}
        <div
          className="text-4xl sm:text-5xl md:text-6xl font-serif leading-none mb-3 sm:mb-4"
          style={{
            color: COLORS.GOLD_TRANSPARENT_20
          }}
        >&ldquo;</div>

        {/* Star rating component */}
        <StarRating rating={testimonial.rating} />

        {/* Quote text */}
        <blockquote
          className="text-sm sm:text-base md:text-lg italic font-lora mb-4 sm:mb-6 relative z-10 text-white/90"
        >
          "{testimonial.quote}"
        </blockquote>

        {/* Author info */}
        <div className="mt-4 sm:mt-6">
          <div
            className="font-medium text-xs sm:text-sm"
            style={{ color: COLORS.GOLD }}
          >{testimonial.author}</div>
          <div
            className="text-xs text-white/60"
          >{testimonial.title}</div>
        </div>
      </div>

      {/* Decorative corner accents - simplified for better performance */}
      <div
        className="absolute top-4 left-4 w-12 h-12 border-t border-l opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ borderColor: `${COLORS.GOLD_TRANSPARENT_30}` }}
      ></div>
      <div
        className="absolute bottom-4 right-4 w-12 h-12 border-b border-r opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ borderColor: `${COLORS.GOLD_TRANSPARENT_30}` }}
      ></div>
    </div>
  );
});

export default TestimonialCard;
