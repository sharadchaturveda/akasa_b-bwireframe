"use client";

import { memo } from "react";
import { SPICE_SVG_PATH, CHEF_COLORS } from "@/constants/chefConstants";

interface DecorativeSpiceProps {
  /**
   * Width of the SVG in pixels
   */
  width: number;
  
  /**
   * Height of the SVG in pixels
   */
  height: number;
  
  /**
   * Rotation angle in degrees
   */
  rotation: number;
  
  /**
   * CSS class for positioning
   */
  className: string;
}

/**
 * DecorativeSpice Component
 * 
 * Renders a decorative spice SVG illustration.
 * 
 * @param {DecorativeSpiceProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
const DecorativeSpice = memo(function DecorativeSpice({
  width,
  height,
  rotation,
  className
}: DecorativeSpiceProps) {
  const { gold } = CHEF_COLORS;
  
  return (
    <div className={`absolute opacity-20 ${className}`} style={{ transform: `rotate(${rotation}deg)` }}>
      <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d={SPICE_SVG_PATH} stroke={gold} strokeWidth="0.5"/>
      </svg>
    </div>
  );
});

export default DecorativeSpice;
