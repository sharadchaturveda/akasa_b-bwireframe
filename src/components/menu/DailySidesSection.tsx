"use client";

import { memo } from 'react';
import { IncludedSides } from '@/types/setLunchMenu';

interface DailySidesSectionProps {
  includedSides: IncludedSides;
}

const DailySidesSection = memo(function DailySidesSection({ includedSides }: DailySidesSectionProps) {
  return (
    <div className="mb-16">
      {/* Section heading with decorative elements */}
      <div className="text-center mb-8 relative">
        <h2 className="text-2xl md:text-3xl font-playfair mb-4 relative inline-block">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E6C78B] to-[#D4B679]">
            Daily Sides
          </span>
          <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#E6C78B]/80 to-transparent"></div>
        </h2>
      </div>
      
      {/* Description */}
      <div className="text-center mb-8">
        <p className="text-white/80 font-montserrat text-base italic">{includedSides.description}</p>
      </div>
      
      {/* Daily menu table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[#E6C78B]/30">
              <th className="py-3 px-4 text-left text-[#E6C78B] font-playfair">Day</th>
              <th className="py-3 px-4 text-left text-[#E6C78B] font-playfair">Side Vegetable</th>
              <th className="py-3 px-4 text-left text-[#E6C78B] font-playfair">Dal</th>
              <th className="py-3 px-4 text-left text-[#E6C78B] font-playfair">Rice</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
              <td className="py-3 px-4 font-medium text-white">Monday</td>
              <td className="py-3 px-4 text-white/80">{includedSides.daily_menu.monday.side_vegetable}</td>
              <td className="py-3 px-4 text-white/80">{includedSides.daily_menu.monday.dal}</td>
              <td className="py-3 px-4 text-white/80">{includedSides.daily_menu.monday.rice}</td>
            </tr>
            <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
              <td className="py-3 px-4 font-medium text-white">Tuesday</td>
              <td className="py-3 px-4 text-white/80">{includedSides.daily_menu.tuesday.side_vegetable}</td>
              <td className="py-3 px-4 text-white/80">{includedSides.daily_menu.tuesday.dal}</td>
              <td className="py-3 px-4 text-white/80">{includedSides.daily_menu.tuesday.rice}</td>
            </tr>
            <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
              <td className="py-3 px-4 font-medium text-white">Wednesday</td>
              <td className="py-3 px-4 text-white/80">{includedSides.daily_menu.wednesday.side_vegetable}</td>
              <td className="py-3 px-4 text-white/80">{includedSides.daily_menu.wednesday.dal}</td>
              <td className="py-3 px-4 text-white/80">{includedSides.daily_menu.wednesday.rice}</td>
            </tr>
            <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
              <td className="py-3 px-4 font-medium text-white">Thursday</td>
              <td className="py-3 px-4 text-white/80">{includedSides.daily_menu.thursday.side_vegetable}</td>
              <td className="py-3 px-4 text-white/80">{includedSides.daily_menu.thursday.dal}</td>
              <td className="py-3 px-4 text-white/80">{includedSides.daily_menu.thursday.rice}</td>
            </tr>
            <tr className="hover:bg-white/5 transition-colors">
              <td className="py-3 px-4 font-medium text-white">Friday</td>
              <td className="py-3 px-4 text-white/80">{includedSides.daily_menu.friday.side_vegetable}</td>
              <td className="py-3 px-4 text-white/80">{includedSides.daily_menu.friday.dal}</td>
              <td className="py-3 px-4 text-white/80">{includedSides.daily_menu.friday.rice}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      {/* Vegetarian indicator */}
      <div className="mt-4 text-center">
        <span className="inline-flex items-center text-sm text-white/60">
          <span className="mr-1 text-base">🟢</span> All sides are vegetarian
        </span>
      </div>
    </div>
  );
});

export default DailySidesSection;
