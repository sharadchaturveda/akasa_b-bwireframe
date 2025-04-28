"use client";

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
    <section className="w-full bg-[url('/images/gallery2.jpg')] bg-cover bg-center py-8 sticky top-0 z-30">
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-wrap justify-center gap-4">
          {eventCategories.map((category) => (
            <button
              key={category.id}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category.id 
                  ? 'bg-[#E6C78B] text-black' 
                  : 'bg-[#1A2A3A] text-white hover:bg-[#2A3A4A]'
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
});

export default CategoriesSection;
