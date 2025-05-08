"use client";

import { memo, ReactNode } from 'react';
import { MenuCategory, MenuItem } from '@/types/menu';
import CategoryNotes from './CategoryNotes';
import { cn } from '@/lib/utils';

export interface BaseMenuCategorySectionProps {
  /**
   * The menu category to display
   */
  category: MenuCategory;
  
  /**
   * Custom renderer for menu items
   */
  renderMenuItem: (item: MenuItem, index: number, categoryName: string) => ReactNode;
  
  /**
   * Additional CSS classes for the container
   */
  className?: string;
  
  /**
   * Grid columns configuration
   */
  gridCols?: {
    mobile?: string;
    tablet?: string;
    desktop?: string;
  };
}

/**
 * BaseMenuCategorySection Component
 * 
 * A base component for menu category sections that can be extended for different menu types.
 * 
 * @param {BaseMenuCategorySectionProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
const BaseMenuCategorySection = memo(function BaseMenuCategorySection({
  category,
  renderMenuItem,
  className,
  gridCols = {
    mobile: "grid-cols-1",
    tablet: "md:grid-cols-2",
    desktop: "lg:grid-cols-3"
  }
}: BaseMenuCategorySectionProps) {
  return (
    <div className={cn("mb-16", className)}>
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
      
      {/* Menu items grid */}
      <div className={cn(
        "grid gap-6",
        gridCols.mobile,
        gridCols.tablet,
        gridCols.desktop
      )}>
        {category.items.map((item, index) => (
          renderMenuItem(item, index, category.category_name)
        ))}
      </div>
    </div>
  );
});

export default BaseMenuCategorySection;
