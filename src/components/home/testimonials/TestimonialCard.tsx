"use client";

import { memo } from 'react';
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
      className="relative bg-black/40 backdrop-blur-sm p-8 rounded-lg border border-[#E6C78B]/10 hover:border-[#E6C78B]/30 transition-all duration-500 hover:shadow-[0_0_25px_rgba(230,199,139,0.2)] group hover:-translate-y-2 opacity-0 animate-fadeIn"
      style={{
        animationDelay: `${index * ANIMATIONS.CARD_DELAY_MS}ms`,
        animationFillMode: 'forwards'
      }}
    >
      {/* Card background with enhanced glow effect */}
      <div
        className="absolute -inset-0.5 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
        style={{
          backgroundImage: `linear-gradient(to right, ${COLORS.GOLD_TRANSPARENT_10}, ${COLORS.GOLD_TRANSPARENT_30}, ${COLORS.GOLD_TRANSPARENT_10})`
        }}
      ></div>

      <div className="relative">
        {/* Quote icon */}
        <div
          className="text-6xl font-serif leading-none mb-4 transition-all duration-500"
          style={{
            color: COLORS.GOLD_TRANSPARENT_20,
            transition: 'color 0.5s ease'
          }}
        >&ldquo;</div>

        {/* Star rating component */}
        <StarRating rating={testimonial.rating} />

        {/* Quote text */}
        <blockquote
          className="text-base sm:text-lg italic font-lora mb-6 relative z-10 transition-all duration-500 group-hover:text-white"
          style={{ color: COLORS.WHITE_TRANSPARENT_90 }}
        >
          "{testimonial.quote}"
        </blockquote>

        {/* Author info */}
        <div className="mt-6 transition-transform duration-500 group-hover:translate-x-1">
          <div
            className="font-medium text-sm transition-all duration-500"
            style={{ color: COLORS.GOLD }}
          >{testimonial.author}</div>
          <div
            className="text-xs transition-all duration-500 group-hover:text-white/80"
            style={{ color: COLORS.WHITE_TRANSPARENT_60 }}
          >{testimonial.title}</div>
        </div>
      </div>

      {/* Decorative corner accents */}
      <div
        className="absolute top-4 left-4 w-12 h-12 border-t border-l transition-all duration-500 opacity-0 group-hover:opacity-100 group-hover:w-16 group-hover:h-16"
        style={{ borderColor: `${COLORS.GOLD_TRANSPARENT_30}` }}
      ></div>
      <div
        className="absolute bottom-4 right-4 w-12 h-12 border-b border-r transition-all duration-500 opacity-0 group-hover:opacity-100 group-hover:w-16 group-hover:h-16"
        style={{ borderColor: `${COLORS.GOLD_TRANSPARENT_30}` }}
      ></div>
    </div>
  );
});

export default TestimonialCard;
