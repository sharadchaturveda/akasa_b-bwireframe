"use client";

import { memo } from 'react';
import { cn } from '@/lib/utils';

/**
 * Particle configuration
 */
export interface Particle {
  /**
   * The position of the particle (top)
   */
  top: string;
  
  /**
   * The position of the particle (left or right)
   */
  position: string;
  
  /**
   * The value of the position (left or right)
   */
  value: string;
  
  /**
   * The size of the particle in pixels
   * @default 1
   */
  size?: number;
  
  /**
   * The animation duration in seconds
   */
  duration: number;
}

/**
 * Props for the AnimatedParticles component
 */
export interface AnimatedParticlesProps {
  /**
   * The particles to display
   */
  particles?: Particle[];
  
  /**
   * The color of the particles
   * @default "bg-[#E6C78B]"
   */
  color?: string;
  
  /**
   * The opacity of the particles container
   * @default 0.2
   */
  opacity?: number;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * AnimatedParticles Component
 * 
 * A component for displaying animated particles.
 * 
 * @param {AnimatedParticlesProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
const AnimatedParticles = memo(function AnimatedParticles({
  particles = [
    { top: 'top-1/4', position: 'right', value: 'right-1/4', size: 1, duration: 15 },
    { top: 'top-3/4', position: 'right', value: 'right-1/3', size: 1, duration: 20 }
  ],
  color = "bg-[#E6C78B]",
  opacity = 0.2,
  className
}: AnimatedParticlesProps) {
  return (
    <div 
      className={cn(
        "absolute inset-0 pointer-events-none",
        className
      )}
      style={{ opacity }}
    >
      {particles.map((particle, index) => {
        const { top, position, value, size = 1, duration } = particle;
        
        return (
          <div
            key={index}
            className={cn(
              "absolute rounded-full animate-float",
              top,
              position === 'left' ? `left-${value}` : `right-${value}`,
              color
            )}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              animationDuration: `${duration}s`
            }}
          ></div>
        );
      })}
    </div>
  );
});

export default AnimatedParticles;
