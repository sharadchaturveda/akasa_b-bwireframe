/**
 * Featured Dishes Section Component
 *
 * This file contains a fully documented component for displaying featured dishes.
 * This component demonstrates proper JSDoc comments, TypeScript types, and code organization.
 * It is used in the DocumentedPage example.
 */

"use client";

import { memo, useState } from 'react';
import Image from 'next/image';
import { useDeviceDetection } from '@/hooks/useDeviceDetection';
import { FeaturedDish } from '@/data/examples/documentedFeaturedDishes';
import DocumentedButton from './DocumentedButton';

/**
 * Props for the FeaturedDishesSection component
 */
interface FeaturedDishesSectionProps {
  /**
   * Title for the section
   * @required
   */
  title: string;
  
  /**
   * Subtitle for the section
   */
  subtitle?: string;
  
  /**
   * Array of featured dishes to display
   * @required
   */
  dishes: FeaturedDish[];
  
  /**
   * Maximum number of dishes to display
   * @default 4
   */
  maxDishes?: number;
  
  /**
   * Additional CSS classes to apply to the section
   */
  className?: string;
}

/**
 * Props for the DishCard component
 */
interface DishCardProps {
  /**
   * The dish to display
   * @required
   */
  dish: FeaturedDish;
  
  /**
   * Whether this is a mobile view
   * @required
   */
  isMobile: boolean;
  
  /**
   * Function to call when the dish is clicked
   */
  onClick?: (dish: FeaturedDish) => void;
}

/**
 * DishCard Component
 *
 * A card component for displaying a featured dish.
 * This component is used within the FeaturedDishesSection.
 *
 * @param {DishCardProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
const DishCard = memo(function DishCard({
  dish,
  isMobile,
  onClick
}: DishCardProps): JSX.Element {
  // Handle click on the dish card
  const handleClick = () => {
    if (onClick) {
      onClick(dish);
    }
  };
  
  return (
    <div 
      className="bg-[#0A0A0A] rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-[1.02]"
      onClick={handleClick}
    >
      {/* Dish Image */}
      <div className="relative w-full aspect-square">
        <Image
          src={dish.imagePath}
          alt={dish.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover"
        />
        
        {/* Vegetarian Indicator */}
        {dish.vegetarian && (
          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white">
            🟢
          </div>
        )}
        
        {/* Signature Dish Badge */}
        {dish.isSignature && (
          <div className="absolute top-2 left-2 bg-[#E6C78B] text-[#1A2A3A] text-xs font-bold px-2 py-1 rounded">
            SIGNATURE
          </div>
        )}
      </div>
      
      {/* Dish Information */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-playfair text-white">{dish.name}</h3>
          <span className="text-[#E6C78B] font-montserrat font-bold">{dish.price}</span>
        </div>
        
        <p className="text-white/70 text-sm mb-4">{dish.description}</p>
        
        {/* Spice Level Indicator */}
        {dish.spiceLevel && (
          <div className="flex items-center mb-4">
            <span className="text-white/70 text-xs mr-2">Spice Level:</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <span 
                  key={i} 
                  className={`w-2 h-2 rounded-full mx-0.5 ${
                    i < (dish.spiceLevel || 0) ? 'bg-red-500' : 'bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
        
        {/* Chef's Notes - Only shown on desktop or if specifically clicked on mobile */}
        {!isMobile && dish.chefNotes && (
          <p className="text-white/60 text-xs italic mt-2">
            <span className="font-bold">Chef's Note:</span> {dish.chefNotes}
          </p>
        )}
      </div>
    </div>
  );
});

/**
 * FeaturedDishesSection Component
 *
 * A section component for displaying featured dishes in a grid layout.
 * This component is used in the DocumentedPage example.
 * 
 * Design considerations:
 * - Uses a grid layout that adapts to different screen sizes
 * - Displays vegetarian dishes first, followed by non-vegetarian dishes
 * - Includes indicators for vegetarian dishes and spice levels
 * - Shows additional information like chef's notes on desktop
 *
 * @param {FeaturedDishesSectionProps} props - The component props
 * @returns {JSX.Element} The rendered component
 * 
 * @example
 * // Basic usage
 * <FeaturedDishesSection
 *   title="Our Signature Dishes"
 *   dishes={FEATURED_DISHES}
 * />
 * 
 * @example
 * // With all props
 * <FeaturedDishesSection
 *   title="Our Signature Dishes"
 *   subtitle="Experience the finest flavors of Akasa"
 *   dishes={FEATURED_DISHES}
 *   maxDishes={6}
 *   className="my-custom-class"
 * />
 */
const FeaturedDishesSection = memo(function FeaturedDishesSection({
  title,
  subtitle,
  dishes,
  maxDishes = 4,
  className = ""
}: FeaturedDishesSectionProps): JSX.Element {
  // Use the device detection hook to determine if we're on mobile
  const { isMobile } = useDeviceDetection();
  
  // State for tracking selected dish (for mobile view details)
  const [selectedDish, setSelectedDish] = useState<FeaturedDish | null>(null);
  
  // State for tracking if we're showing all dishes or just the limited set
  const [showAllDishes, setShowAllDishes] = useState(false);
  
  // Handle click on a dish card
  const handleDishClick = (dish: FeaturedDish) => {
    if (isMobile) {
      setSelectedDish(dish);
    }
  };
  
  // Handle closing the dish details modal
  const handleCloseDetails = () => {
    setSelectedDish(null);
  };
  
  // Handle showing all dishes
  const handleShowAllDishes = () => {
    setShowAllDishes(true);
  };
  
  // Limit the number of dishes to display if not showing all
  const displayedDishes = showAllDishes ? dishes : dishes.slice(0, maxDishes);
  
  return (
    <section className={`py-16 bg-black ${className}`}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair text-white mb-4">{title}</h2>
          {subtitle && (
            <p className="text-lg font-montserrat text-white/70">{subtitle}</p>
          )}
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#E6C78B] to-transparent mx-auto mt-6"></div>
        </div>
        
        {/* Dishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {displayedDishes.map((dish) => (
            <DishCard
              key={dish.id}
              dish={dish}
              isMobile={isMobile}
              onClick={handleDishClick}
            />
          ))}
        </div>
        
        {/* Show More Button - Only shown if there are more dishes to display */}
        {!showAllDishes && dishes.length > maxDishes && (
          <div className="text-center mt-8">
            <DocumentedButton
              variant="primary"
              onClick={handleShowAllDishes}
            >
              View All Dishes
            </DocumentedButton>
          </div>
        )}
        
        {/* Mobile Dish Details Modal */}
        {isMobile && selectedDish && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="bg-[#0A0A0A] rounded-lg overflow-hidden shadow-lg w-full max-w-md">
              {/* Dish Image */}
              <div className="relative w-full aspect-square">
                <Image
                  src={selectedDish.imagePath}
                  alt={selectedDish.imageAlt}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
              
              {/* Dish Information */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-playfair text-white">{selectedDish.name}</h3>
                  <span className="text-[#E6C78B] font-montserrat font-bold text-xl">{selectedDish.price}</span>
                </div>
                
                <p className="text-white/70 mb-4">{selectedDish.description}</p>
                
                {/* Vegetarian Indicator */}
                <p className="text-white/70 mb-4">
                  {selectedDish.vegetarian ? '🟢 Vegetarian' : '🔴 Non-Vegetarian'}
                </p>
                
                {/* Spice Level */}
                {selectedDish.spiceLevel && (
                  <div className="flex items-center mb-4">
                    <span className="text-white/70 mr-2">Spice Level:</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span 
                          key={i} 
                          className={`w-3 h-3 rounded-full mx-0.5 ${
                            i < (selectedDish.spiceLevel || 0) ? 'bg-red-500' : 'bg-gray-500'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Chef's Notes */}
                {selectedDish.chefNotes && (
                  <div className="bg-[#1A2A3A] p-4 rounded-lg mt-4">
                    <p className="text-white/80 text-sm italic">
                      <span className="font-bold">Chef's Note:</span> {selectedDish.chefNotes}
                    </p>
                  </div>
                )}
                
                {/* Tags */}
                {selectedDish.tags && selectedDish.tags.length > 0 && (
                  <div className="mt-4">
                    <p className="text-white/70 text-sm mb-2">Tags:</p>
                    <div className="flex flex-wrap">
                      {selectedDish.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="bg-[#1A2A3A] text-white/70 text-xs px-2 py-1 rounded mr-2 mb-2"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Close Button */}
                <div className="text-center mt-6">
                  <DocumentedButton
                    variant="primary"
                    onClick={handleCloseDetails}
                  >
                    Close
                  </DocumentedButton>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
});

export default FeaturedDishesSection;
