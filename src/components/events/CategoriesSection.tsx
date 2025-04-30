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
    <section className="w-full bg-black sticky top-0 z-30 py-6 backdrop-blur-md border-b border-[#1A2A3A]/50">
      {/* Subtle background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/menu/gallery2.jpg"
          alt="Background"
          fill
          sizes="100vw"
          className="object-cover"
          quality={30}
          style={{
            objectPosition: "center",
            opacity: 0.15
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black"></div>
      </div>

      {/* Decorative elements */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-r from-[#E6C78B]/10 to-transparent rounded-full blur-xl"></div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-l from-[#E6C78B]/10 to-transparent rounded-full blur-xl"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-wrap justify-center gap-3">
          {eventCategories.map((category) => (
            <div key={category.id}>
              <button
                className={`group relative overflow-hidden px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
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
                } transition-colors duration-300`}></span>

                {/* Active indicator dot */}
                {activeCategory === category.id && (
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-black"></span>
                )}

                {/* Button text with proper spacing for active state */}
                <span className={`relative ${activeCategory === category.id ? 'ml-2' : ''}`}>
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
