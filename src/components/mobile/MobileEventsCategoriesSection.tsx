"use client";

import { memo } from "react";

interface MobileEventsCategoriesSectionProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  eventCategories: Array<{ id: string; name: string }>;
}

/**
 * MobileEventsCategoriesSection Component
 * 
 * A mobile-optimized version of the Events page categories section
 */
const MobileEventsCategoriesSection = memo(function MobileEventsCategoriesSection({
  activeCategory,
  setActiveCategory,
  eventCategories
}: MobileEventsCategoriesSectionProps) {
  return (
    <section className="w-full bg-black py-6">
      <div className="container mx-auto px-4">
        {/* Mobile-optimized category tabs */}
        <div className="flex flex-wrap justify-center gap-2">
          {eventCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-3 py-2 text-xs font-montserrat rounded-full transition-colors duration-300 touch-manipulation ${
                activeCategory === category.id
                  ? "bg-[#1A2A3A] text-white"
                  : "bg-black text-white/70 border border-white/20"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
});

export default MobileEventsCategoriesSection;
