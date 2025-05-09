"use client";

import { memo } from 'react';
import { MenuCategory } from '@/types/menu';
import DrinkMenuItemCard from './DrinkMenuItemCard';
import CategoryNotes from './CategoryNotes';

interface DrinkCategorySectionProps {
  category: MenuCategory;
}

const DrinkCategorySection = memo(function DrinkCategorySection({ category }: DrinkCategorySectionProps) {
  return (
    <div className="mb-16">
      {/* Category heading with decorative elements */}
      <div className="text-center mb-8 relative">
        <h2 className="text-2xl md:text-3xl font-playfair mb-4 relative inline-block">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E6C78B] to-[#D4B679]">
            {category.category_name}
          </span>
          <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#E6C78B]/80 to-transparent"></div>
        </h2>
      </div>

      {/* Category notes if available */}
      {category.category_notes && <CategoryNotes notes={category.category_notes} />}

      {/* Pour note if available */}
      {category.pourNote && (
        <div className="mb-6 text-center">
          <div className="inline-block bg-[#1A2A3A]/80 backdrop-blur-sm px-6 py-3 rounded-lg border border-[#E6C78B]/20">
            <p className="text-white/90 font-montserrat text-sm italic">
              {category.pourNote}
            </p>
          </div>
        </div>
      )}

      {/* Menu items grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.items.map((item, index) => (
          <DrinkMenuItemCard key={`${category.category_name}-${index}`} item={item} />
        ))}
      </div>
    </div>
  );
});

export default DrinkCategorySection;
