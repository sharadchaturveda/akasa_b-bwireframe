"use client";

import { memo } from 'react';
import { MenuItem } from '@/types/menu';

interface MobileMenuItemCardProps {
  item: MenuItem;
}

const MobileMenuItemCard = memo(function MobileMenuItemCard({ item }: MobileMenuItemCardProps) {
  return (
    <div className="relative bg-black/60 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden transition-all duration-300 active:bg-black/70 p-4">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center">
          {/* Vegetarian/Non-vegetarian indicator */}
          <span className="mr-2 text-base">
            {item.vegetarian ? '🟢' : '🔴'}
          </span>
          <h3 className="text-lg font-playfair text-white">{item.name}</h3>
        </div>
        <span className="text-[#E6C78B] font-medium text-base">{item.price as string}</span>
      </div>

      <p className="text-white/70 font-montserrat text-xs pl-6 leading-relaxed">{item.description}</p>
    </div>
  );
});

export default MobileMenuItemCard;
