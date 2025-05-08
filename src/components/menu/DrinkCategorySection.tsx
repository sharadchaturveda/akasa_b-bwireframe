"use client";

import { memo } from 'react';
import { MenuCategory, MenuItem } from '@/types/menu';
import DrinkMenuItemCard from './DrinkMenuItemCard';
import BaseMenuCategorySection from './BaseMenuCategorySection';

interface DrinkCategorySectionProps {
  category: MenuCategory;
}

/**
 * DrinkCategorySection Component
 *
 * A component for displaying drink menu categories.
 * Uses the BaseMenuCategorySection component with drink menu item cards.
 *
 * @param {DrinkCategorySectionProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
const DrinkCategorySection = memo(function DrinkCategorySection({ category }: DrinkCategorySectionProps) {
  // Render function for menu items
  const renderMenuItem = (item: MenuItem, index: number, categoryName: string) => (
    <DrinkMenuItemCard key={`${categoryName}-${index}`} item={item} />
  );

  return (
    <BaseMenuCategorySection
      category={category}
      renderMenuItem={renderMenuItem}
    />
  );
});

export default DrinkCategorySection;
