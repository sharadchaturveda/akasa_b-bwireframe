"use client";

export const TestimonialAnimations = () => {
  return (
    <style jsx>{`
      @keyframes fadeIn {
        0% { opacity: 0; transform: translateY(20px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      
      @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0px); }
      }
      
      @keyframes glow {
        0% { box-shadow: 0 0 5px rgba(230,199,139,0.3); }
        50% { box-shadow: 0 0 20px rgba(230,199,139,0.5); }
        100% { box-shadow: 0 0 5px rgba(230,199,139,0.3); }
      }
      
      @keyframes shimmer {
        0% { background-position: -100% 0; }
        100% { background-position: 200% 0; }
      }
    `}</style>
  );
};

export default TestimonialAnimations;
