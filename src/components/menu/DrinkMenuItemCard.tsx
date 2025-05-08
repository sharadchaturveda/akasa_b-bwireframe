"use client";

import { memo, ReactNode } from 'react';
import { MenuItem, PriceOption } from '@/types/menu';
import BaseMenuItemCard from './BaseMenuItemCard';

interface DrinkMenuItemCardProps {
  item: MenuItem;
}

/**
 * DrinkMenuItemCard Component
 *
 * A component for displaying drink menu items.
 * Uses the BaseMenuItemCard component with custom renderers for complex prices.
 *
 * @param {DrinkMenuItemCardProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
const DrinkMenuItemCard = memo(function DrinkMenuItemCard({ item }: DrinkMenuItemCardProps) {
  // Check if price is a complex object (glass/bottle)
  const hasComplexPrice = typeof item.price === 'object';
  const priceObj = hasComplexPrice ? (item.price as PriceOption) : null;

  // Custom renderer for vegetarian indicator (drinks don't show vegetarian indicators)
  const renderVegetarianIndicator = (): ReactNode => {
    // Return empty span to maintain layout but hide indicator
    return <span className="mr-2 hidden"></span>;
  };

  // Custom renderer for price
  const renderPrice = (price: string | PriceOption): ReactNode => {
    if (!hasComplexPrice) {
      return <span className="text-[#E6C78B] font-medium text-lg">{price as string}</span>;
    }

    return (
      <div className="flex flex-col items-end min-w-[100px] text-right">
        {priceObj?.glass && (
          <div className="flex justify-between items-center gap-2 mb-1">
            <span className="text-white/60 text-xs uppercase tracking-wider">Glass</span>
            <span className="text-[#E6C78B] font-medium text-sm">{priceObj.glass}</span>
          </div>
        )}
        {priceObj?.bottle && (
          <div className="flex justify-between items-center gap-2">
            <span className="text-white/60 text-xs uppercase tracking-wider">Bottle</span>
            <span className="text-[#E6C78B] font-medium text-sm">{priceObj.bottle}</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <BaseMenuItemCard
      item={item}
      renderVegetarianIndicator={renderVegetarianIndicator}
      renderPrice={renderPrice}
    />
  );
});

export default DrinkMenuItemCard;
