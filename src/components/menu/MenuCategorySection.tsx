"use client";

import { memo } from 'react';
import { MenuCategory, MenuItem } from '@/types/menu';
import MenuItemCard from './MenuItemCard';
import BaseMenuCategorySection from './BaseMenuCategorySection';

interface MenuCategorySectionProps {
  category: MenuCategory;
}

/**
 * MenuCategorySection Component
 *
 * A component for displaying standard menu categories.
 * Uses the BaseMenuCategorySection component with standard menu item cards.
 *
 * @param {MenuCategorySectionProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
const MenuCategorySection = memo(function MenuCategorySection({ category }: MenuCategorySectionProps) {
  // Render function for menu items
  const renderMenuItem = (item: MenuItem, index: number, categoryName: string) => (
    <MenuItemCard key={`${categoryName}-${index}`} item={item} />
  );

  return (
    <BaseMenuCategorySection
      category={category}
      renderMenuItem={renderMenuItem}
    />
  );
});

export default MenuCategorySection;
