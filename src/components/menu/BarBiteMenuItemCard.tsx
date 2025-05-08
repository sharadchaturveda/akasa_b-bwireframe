"use client";

import { memo, ReactNode } from 'react';
import { MenuItem } from '@/types/menu';
import BaseMenuItemCard from './BaseMenuItemCard';

interface BarBiteMenuItemCardProps {
  item: MenuItem;
}

/**
 * BarBiteMenuItemCard Component
 *
 * A component for displaying bar bite menu items.
 * Uses the BaseMenuItemCard component with custom renderers for special cases.
 *
 * @param {BarBiteMenuItemCardProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
const BarBiteMenuItemCard = memo(function BarBiteMenuItemCard({ item }: BarBiteMenuItemCardProps) {
  // Special case for Kathi Roll which has both veg and non-veg options
  const isKathiRoll = item.name === "Kathi Roll";

  // Custom renderer for vegetarian indicator
  const renderVegetarianIndicator = (isVegetarian: boolean): ReactNode => {
    if (isKathiRoll) {
      return (
        <span className="mr-2 text-lg">
          🟢/🔴
        </span>
      );
    }

    return (
      <span className="mr-2 text-lg">
        {isVegetarian ? '🟢' : '🔴'}
      </span>
    );
  };

  // Custom renderer for additional content
  const renderAdditionalContent = (item: MenuItem): ReactNode => {
    if (isKathiRoll) {
      return (
        <p className="text-[#E6C78B]/80 font-montserrat text-xs italic mt-2">
          Available in vegetarian and non-vegetarian options
        </p>
      );
    }

    return null;
  };

  return (
    <BaseMenuItemCard
      item={item}
      renderVegetarianIndicator={renderVegetarianIndicator}
      renderAdditionalContent={renderAdditionalContent}
    />
  );
});

export default BarBiteMenuItemCard;
