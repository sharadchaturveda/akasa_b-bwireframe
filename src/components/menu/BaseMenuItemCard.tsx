"use client";

import { memo, ReactNode } from 'react';
import { MenuItem, PriceOption } from '@/types/menu';
import { cn } from '@/lib/utils';

export interface BaseMenuItemCardProps {
  /**
   * The menu item to display
   */
  item: MenuItem;
  
  /**
   * Custom renderer for the vegetarian indicator
   */
  renderVegetarianIndicator?: (isVegetarian: boolean) => ReactNode;
  
  /**
   * Custom renderer for the price
   */
  renderPrice?: (price: string | PriceOption) => ReactNode;
  
  /**
   * Custom renderer for additional content
   */
  renderAdditionalContent?: (item: MenuItem) => ReactNode;
  
  /**
   * Additional CSS classes for the card
   */
  className?: string;
}

/**
 * BaseMenuItemCard Component
 * 
 * A base component for menu item cards that can be extended for different menu types.
 * 
 * @param {BaseMenuItemCardProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
const BaseMenuItemCard = memo(function BaseMenuItemCard({
  item,
  renderVegetarianIndicator,
  renderPrice,
  renderAdditionalContent,
  className
}: BaseMenuItemCardProps) {
  // Determine if the item is vegetarian
  const isVegetarian = item.vegetarian !== undefined 
    ? item.vegetarian 
    : item.is_vegetarian !== undefined 
      ? item.is_vegetarian 
      : true;
  
  return (
    <div className={cn("group relative", className)}>
      {/* Card background with subtle glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#E6C78B]/0 via-[#E6C78B]/30 to-[#E6C78B]/0 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
      
      <div className="relative bg-black/80 backdrop-blur-sm border border-white/5 rounded-lg overflow-hidden transition-all duration-500 group-hover:shadow-[0_0_25px_rgba(230,199,139,0.2)]">
        <div className="p-6 relative">
          {/* Decorative corner accent */}
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-[#E6C78B]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center">
              {/* Vegetarian/Non-vegetarian indicator */}
              {renderVegetarianIndicator ? (
                renderVegetarianIndicator(isVegetarian)
              ) : (
                <span className="mr-2 text-lg">
                  {isVegetarian ? '🟢' : '🔴'}
                </span>
              )}
              <h3 className="text-xl font-playfair text-white group-hover:text-[#E6C78B] transition-colors duration-300">{item.name}</h3>
            </div>
            
            {/* Price */}
            {renderPrice ? (
              renderPrice(item.price)
            ) : (
              <span className="text-[#E6C78B] font-medium text-lg">{item.price as string}</span>
            )}
          </div>
          
          {/* Description */}
          {item.description && (
            <p className="text-white/70 font-montserrat text-sm mb-2 leading-relaxed">{item.description}</p>
          )}
          
          {/* Additional content */}
          {renderAdditionalContent && renderAdditionalContent(item)}
        </div>
      </div>
    </div>
  );
});

export default BaseMenuItemCard;
