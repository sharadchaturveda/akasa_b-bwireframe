"use client";

import { memo } from 'react';
import { MenuCategory } from '@/types/menu';
import MobileMenuItemCard from './MobileMenuItemCard';

interface MobileMenuCategorySectionProps {
  category: MenuCategory;
}

const MobileMenuCategorySection = memo(function MobileMenuCategorySection({ category }: MobileMenuCategorySectionProps) {
  return (
    <div className="mb-10">
      {/* Category heading with decorative elements */}
      <div className="text-center mb-4 relative">
        <h2 className="text-xl font-playfair mb-3 relative inline-block">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E6C78B] to-[#D4B679]">
            {category.category_name}
          </span>
          <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#E6C78B]/80 to-transparent"></div>
        </h2>
      </div>
      
      {/* Menu items stack */}
      <div className="flex flex-col gap-3">
        {category.items.map((item, index) => (
          <MobileMenuItemCard key={`${category.category_name}-${index}`} item={item} />
        ))}
      </div>
    </div>
  );
});

export default MobileMenuCategorySection;
