"use client";

import { memo } from 'react';
import { MenuCategory, MenuItem } from '@/types/menu';
import BarBiteMenuItemCard from './BarBiteMenuItemCard';
import BaseMenuCategorySection from './BaseMenuCategorySection';

interface BarBiteCategorySectionProps {
  category: MenuCategory;
}

/**
 * BarBiteCategorySection Component
 *
 * A component for displaying bar bite menu categories.
 * Uses the BaseMenuCategorySection component with bar bite menu item cards.
 *
 * @param {BarBiteCategorySectionProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
const BarBiteCategorySection = memo(function BarBiteCategorySection({ category }: BarBiteCategorySectionProps) {
  // Render function for menu items
  const renderMenuItem = (item: MenuItem, index: number, categoryName: string) => (
    <BarBiteMenuItemCard key={`${categoryName}-${index}`} item={item} />
  );

  return (
    <BaseMenuCategorySection
      category={category}
      renderMenuItem={renderMenuItem}
    />
  );
});

export default BarBiteCategorySection;
