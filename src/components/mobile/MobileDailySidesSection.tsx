"use client";

import { memo } from 'react';
import { IncludedSides } from '@/types/setLunchMenu';

interface MobileDailySidesSectionProps {
  includedSides: IncludedSides;
}

const MobileDailySidesSection = memo(function MobileDailySidesSection({ includedSides }: MobileDailySidesSectionProps) {
  return (
    <div className="mb-10">
      {/* Section heading with decorative elements */}
      <div className="text-center mb-4 relative">
        <h2 className="text-xl font-playfair mb-3 relative inline-block">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E6C78B] to-[#D4B679]">
            Daily Sides
          </span>
          <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#E6C78B]/80 to-transparent"></div>
        </h2>
      </div>
      
      {/* Description */}
      <div className="text-center mb-4">
        <p className="text-white/80 font-montserrat text-sm italic">{includedSides.description}</p>
      </div>
      
      {/* Daily menu cards */}
      <div className="flex flex-col gap-3">
        <div className="bg-black/60 backdrop-blur-sm border border-white/10 rounded-lg p-4">
          <h3 className="text-[#E6C78B] font-medium text-base mb-2">Monday</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-white/60">Side Vegetable:</div>
            <div className="text-white">{includedSides.daily_menu.monday.side_vegetable}</div>
            <div className="text-white/60">Dal:</div>
            <div className="text-white">{includedSides.daily_menu.monday.dal}</div>
            <div className="text-white/60">Rice:</div>
            <div className="text-white">{includedSides.daily_menu.monday.rice}</div>
          </div>
        </div>
        
        <div className="bg-black/60 backdrop-blur-sm border border-white/10 rounded-lg p-4">
          <h3 className="text-[#E6C78B] font-medium text-base mb-2">Tuesday</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-white/60">Side Vegetable:</div>
            <div className="text-white">{includedSides.daily_menu.tuesday.side_vegetable}</div>
            <div className="text-white/60">Dal:</div>
            <div className="text-white">{includedSides.daily_menu.tuesday.dal}</div>
            <div className="text-white/60">Rice:</div>
            <div className="text-white">{includedSides.daily_menu.tuesday.rice}</div>
          </div>
        </div>
        
        <div className="bg-black/60 backdrop-blur-sm border border-white/10 rounded-lg p-4">
          <h3 className="text-[#E6C78B] font-medium text-base mb-2">Wednesday</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-white/60">Side Vegetable:</div>
            <div className="text-white">{includedSides.daily_menu.wednesday.side_vegetable}</div>
            <div className="text-white/60">Dal:</div>
            <div className="text-white">{includedSides.daily_menu.wednesday.dal}</div>
            <div className="text-white/60">Rice:</div>
            <div className="text-white">{includedSides.daily_menu.wednesday.rice}</div>
          </div>
        </div>
        
        <div className="bg-black/60 backdrop-blur-sm border border-white/10 rounded-lg p-4">
          <h3 className="text-[#E6C78B] font-medium text-base mb-2">Thursday</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-white/60">Side Vegetable:</div>
            <div className="text-white">{includedSides.daily_menu.thursday.side_vegetable}</div>
            <div className="text-white/60">Dal:</div>
            <div className="text-white">{includedSides.daily_menu.thursday.dal}</div>
            <div className="text-white/60">Rice:</div>
            <div className="text-white">{includedSides.daily_menu.thursday.rice}</div>
          </div>
        </div>
        
        <div className="bg-black/60 backdrop-blur-sm border border-white/10 rounded-lg p-4">
          <h3 className="text-[#E6C78B] font-medium text-base mb-2">Friday</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-white/60">Side Vegetable:</div>
            <div className="text-white">{includedSides.daily_menu.friday.side_vegetable}</div>
            <div className="text-white/60">Dal:</div>
            <div className="text-white">{includedSides.daily_menu.friday.dal}</div>
            <div className="text-white/60">Rice:</div>
            <div className="text-white">{includedSides.daily_menu.friday.rice}</div>
          </div>
        </div>
      </div>
      
      {/* Vegetarian indicator */}
      <div className="mt-3 text-center">
        <span className="inline-flex items-center text-xs text-white/60">
          <span className="mr-1 text-sm">🟢</span> All sides are vegetarian
        </span>
      </div>
    </div>
  );
});

export default MobileDailySidesSection;
