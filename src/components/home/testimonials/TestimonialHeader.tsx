"use client";

import { memo } from 'react';
import { COLORS } from './constants';

const TestimonialHeader = memo(function TestimonialHeader() {
  return (
    <div className="text-center mb-16">
      {/* Section heading */}
      <h2 className="text-4xl md:text-5xl font-playfair mb-6 relative inline-block">
        <span className="text-white">Through the Grapevine</span>
        <div
          className="absolute -bottom-3 left-0 w-full h-0.5"
          style={{
            backgroundImage: `linear-gradient(to right, transparent, ${COLORS.GOLD_TRANSPARENT_30}, transparent)`
          }}
        ></div>
      </h2>
      <p
        className="text-lg md:text-xl font-montserrat max-w-2xl mx-auto leading-relaxed italic"
        style={{ color: COLORS.WHITE_TRANSPARENT_80 }}
      >
        What our distinguished guests are saying about their experience at Akasa
      </p>
    </div>
  );
});

export default TestimonialHeader;
