"use client";

import TestimonialBackgroundImage from "./TestimonialBackgroundImage";

interface TestimonialsBackgroundProps {
  scrollY: number;
}

const TestimonialsBackground = ({ scrollY }: TestimonialsBackgroundProps) => {
  return (
    <>
      {/* Background image with parallax effect */}
      <TestimonialBackgroundImage scrollY={scrollY} />

      {/* Enhanced decorative elements */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black to-transparent z-10"></div>
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent z-10"></div>
      <div className="absolute top-20 right-10 w-60 h-60 rounded-full bg-[#E6C78B]/5 blur-3xl animate-pulse" style={{ animationDuration: '8s' }}></div>
      <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-[#E6C78B]/5 blur-3xl animate-pulse" style={{ animationDuration: '12s' }}></div>
      <div className="absolute top-1/3 left-1/4 w-40 h-40 rounded-full bg-[#E6C78B]/3 blur-3xl animate-pulse" style={{ animationDuration: '10s' }}></div>
    </>
  );
};

export default TestimonialsBackground;
