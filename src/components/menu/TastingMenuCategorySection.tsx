"use client";

import { memo } from 'react';
import { MenuCategory } from '@/types/menu';
import TastingMenuItemCard from './TastingMenuItemCard';
import CategoryNotes from './CategoryNotes';

interface TastingMenuCategorySectionProps {
  category: MenuCategory;
  isVegan?: boolean;
}

const TastingMenuCategorySection = memo(function TastingMenuCategorySection({ category, isVegan }: TastingMenuCategorySectionProps) {
  // Check if the category has only one item or no items
  const totalItmes = category.items.length
  const showOptinal = category.showOptinal && category.showOptinal
  const hasSingleItem = category.items.length === 1;
  const hasNoItems = category.items.length === 0;

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

      {/* Skip rendering the grid if there are no items */}
      {!hasNoItems && (
        <div className={`grid grid-cols-1 ${hasSingleItem ? '' : 'md:grid-cols-2 lg:grid-cols-3'} gap-6`}>
          {category.items.map((item, index) => (
            <TastingMenuItemCard
              key={`${category.category_name}-${index}`}
              item={item}
              totalItems={totalItmes}
              isSingleItem={hasSingleItem}
              showOptional = {showOptinal}
            />
          ))}
        </div>
      )}
    </div>
  );
});

export default TastingMenuCategorySection;
