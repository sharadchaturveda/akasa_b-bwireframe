"use client";

import Image from "next/image"
;
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
    <section className="w-full bg-black sticky top-0 z-30 py-6 border-b border-[#E6C78B]/10 shadow-lg">
      {/* Simplified background for better performance */}
      <div className="absolute inset-0 z-0 bg-black/95"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-wrap justify-center gap-4">
          {eventCategories.map((category) => (
            <div key={category.id}>
              <button
                className={`relative px-7 py-3 rounded-full text-sm font-medium tracking-wide transition-colors duration-300 ${
                  activeCategory === category.id
                    ? 'bg-[#E6C78B] text-black'
                    : 'bg-[#1A2A3A] text-white hover:bg-[#1A2A3A]/80'
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {/* Button text with proper spacing for active state */}
                <span className={`${activeCategory === category.id ? 'ml-3' : ''}`}>
                  {category.name}
                </span>

                {/* Simple active indicator dot */}
                {activeCategory === category.id && (
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-black"></span>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default CategoriesSection;



