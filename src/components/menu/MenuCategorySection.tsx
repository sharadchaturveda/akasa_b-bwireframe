"use client";

import { memo } from 'react';
import { MenuCategory } from '@/types/menu';
import MenuItemCard from './MenuItemCard';

interface MenuCategorySectionProps {
  category: MenuCategory;
}

const MenuCategorySection = memo(function MenuCategorySection({ category }: MenuCategorySectionProps) {
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
      
      {/* Menu items grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.items.map((item, index) => (
          <MenuItemCard key={`${category.category_name}-${index}`} item={item} />
        ))}
      </div>
    </div>
  );
});

export default MenuCategorySection;
