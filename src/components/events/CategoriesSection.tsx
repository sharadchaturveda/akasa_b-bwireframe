"use client";

import Image from "next/image";
import { memo } from "react";

interface CategoriesSectionProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  eventCategories: Array<{ id: string; name: string }>;
}

const CategoriesSection = memo(function CategoriesSection({
  activeCategory,
  setActiveCategory,
  eventCategories
}: CategoriesSectionProps) {
  return (
    <section className="w-full bg-black sticky top-0 z-30 py-6 backdrop-blur-md border-b border-[#E6C78B]/10 shadow-lg">
      {/* Enhanced subtle background image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/images/menu/gallery2.jpg"
          alt="Background"
          fill
          sizes="100vw"
          className="object-cover"
          quality={40}
          style={{
            objectPosition: "center",
            opacity: 0.15,
            filter: "contrast(1.1)"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black"></div>
      </div>

      {/* Enhanced decorative elements */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-[#E6C78B]/10 to-transparent rounded-full blur-xl animate-pulse-slow" style={{ animationDuration: '8s' }}></div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-l from-[#E6C78B]/10 to-transparent rounded-full blur-xl animate-pulse-slow" style={{ animationDuration: '10s' }}></div>

      {/* Subtle shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#E6C78B]/5 to-transparent bg-[length:200%_100%] animate-shimmer"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-wrap justify-center gap-4">
          {eventCategories.map((category) => (
            <div key={category.id}>
              <button
                className={`group relative overflow-hidden px-7 py-3 rounded-full text-sm font-medium tracking-wide transition-all duration-300 shadow-md hover:shadow-lg ${
                  activeCategory === category.id
                    ? 'text-black'
                    : 'text-white hover:text-white/90'
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {/* Button background and effects */}
                <span className={`absolute inset-0 rounded-full ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-[#E6C78B] to-[#D4B679]'
                    : 'bg-[#1A2A3A] group-hover:bg-[#1A2A3A]/80'
                } transition-all duration-300`}></span>

                {/* Subtle glow effect for active button */}
                {activeCategory === category.id && (
                  <span className="absolute inset-0 rounded-full bg-[#E6C78B]/20 blur-sm"></span>
                )}

                {/* Active indicator dot with animation */}
                {activeCategory === category.id && (
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-black animate-pulse"></span>
                )}

                {/* Button text with proper spacing for active state */}
                <span className={`relative ${activeCategory === category.id ? 'ml-3' : ''} transition-all duration-300`}>
                  {category.name}
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default CategoriesSection;
