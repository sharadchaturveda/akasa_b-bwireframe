"use client";

import { memo } from 'react';
import { Testimonial } from '@/data/testimonials';
import MobileStarRating from './MobileStarRating';
import { COLORS } from '../home/testimonials/constants';

interface MobileTestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

/**
 * MobileTestimonialCard Component
 * 
 * A mobile-optimized version of the TestimonialCard component without hover animations
 * that were causing vertical movement when scrolling
 */
const MobileTestimonialCard = memo(function MobileTestimonialCard({ testimonial, index }: MobileTestimonialCardProps) {
  return (
    <div
      className="relative bg-black/40 backdrop-blur-sm p-6 rounded-lg border border-[#E6C78B]/10 transition-all duration-500 touch-manipulation"
      style={{
        animationFillMode: 'forwards'
      }}
    >
      <div className="relative">
        {/* Quote icon */}
        <div
          className="text-4xl font-serif leading-none mb-3"
          style={{
            color: COLORS.GOLD_TRANSPARENT_20
          }}
        >&ldquo;</div>

        {/* Star rating component - using mobile version without animations */}
        <MobileStarRating rating={testimonial.rating} />

        {/* Quote text */}
        <blockquote
          className="text-sm italic font-lora mb-4 relative z-10"
          style={{ color: COLORS.WHITE_TRANSPARENT_90 }}
        >
          "{testimonial.quote}"
        </blockquote>

        {/* Author info */}
        <div className="mt-4">
          <div
            className="font-medium text-xs"
            style={{ color: COLORS.GOLD }}
          >{testimonial.author}</div>
          <div
            className="text-xs"
            style={{ color: COLORS.WHITE_TRANSPARENT_60 }}
          >{testimonial.title}</div>
        </div>
      </div>

      {/* Decorative corner accents - static on mobile */}
      <div
        className="absolute top-4 left-4 w-12 h-12 border-t border-l opacity-30"
        style={{ borderColor: `${COLORS.GOLD_TRANSPARENT_30}` }}
      ></div>
      <div
        className="absolute bottom-4 right-4 w-12 h-12 border-b border-r opacity-30"
        style={{ borderColor: `${COLORS.GOLD_TRANSPARENT_30}` }}
      ></div>
    </div>
  );
});

export default MobileTestimonialCard;
