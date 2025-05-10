/**
 * Featured Dishes Section Component
 *
 * This file contains a fully documented component for displaying featured dishes.
 * This component demonstrates proper JSDoc comments, TypeScript types, and code organization.
 * It is used in the DocumentedPage example.
 */

"use client";

import { useState } from "react";
import Image from "next/image"
;

export interface FeaturedDish {
  id: string;
  name: string;
  description: string;
  price: string;
  imagePath: string;
  imageAlt: string;
  vegetarian: boolean;
  isSignature?: boolean;
  ingredients?: string[];
  chefNotes?: string;
  tags?: string[];
  spiceLevel?: number;
}

interface FeaturedDishesSectionProps {
  title: string;
  subtitle: string;
  dishes: FeaturedDish[];
}

export default function FeaturedDishesSection({ title, subtitle, dishes }: FeaturedDishesSectionProps) {
  const [showAllDishes, setShowAllDishes] = useState(false);
  const [selectedDish, setSelectedDish] = useState<FeaturedDish | null>(null);
  const maxDishes = 6;

  // Handle showing all dishes
  const handleShowAllDishes = () => {
    setShowAllDishes(true);
  };

  // Handle dish click - show modal for all devices
  const handleClick = (dish: FeaturedDish) => {
    setSelectedDish(dish);
  };

  // Close modal
  const closeModal = () => {
    setSelectedDish(null);
  };

  // Dishes are now passed as props

  // Responsive button with hover effects
  const renderButton = (text: string, onClick: () => void) => {
    return (
      <button
        onClick={onClick}
        className="w-full rounded-full font-montserrat font-medium tracking-wider bg-[#1A2A3A] text-white px-4 py-2 text-sm shadow-md hover:bg-[#2A3A4A] transition-colors duration-300"
      >
        <span className="text-center font-medium tracking-wide w-full">
          {text}
        </span>
      </button>
    );
  };

  return (
    <section className="w-full bg-black py-20 relative overflow-hidden">
      {/* Section content */}
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-playfair mb-6 relative inline-block">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E6C78B] to-[#D4B679]">{title}</span>
            <div className="absolute -bottom-3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#E6C78B]/80 to-transparent"></div>
          </h2>

          <p className="text-lg md:text-xl font-montserrat text-white/80 max-w-3xl mx-auto leading-relaxed italic">
            {subtitle}
          </p>
        </div>

        {/* Dish grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {dishes.slice(0, showAllDishes ? dishes.length : maxDishes).map((dish, index) => (
            <DishCard
              key={dish.id}
              dish={dish}
              onClick={() => handleClick(dish)}
            />
          ))}
        </div>

        {/* Show More Button - Only shown if there are more dishes to display */}
        {!showAllDishes && dishes.length > maxDishes && (
          <div className="text-center mt-8">
            {renderButton("View All Dishes", handleShowAllDishes)}
          </div>
        )}

        {/* Dish Details Modal - Responsive for all devices */}
        {selectedDish && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="bg-[#0A0A0A] rounded-lg overflow-hidden shadow-lg w-full max-w-md">
              {/* Dish Image */}
              <div className="relative w-full aspect-square">
                <Image src={selectedDish.imagePath}
                  alt={selectedDish.imageAlt}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>

              {/* Dish Details */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-playfair text-white">{selectedDish.name}</h3>
                  <span className="text-xl font-montserrat text-[#E6C78B]">{selectedDish.price}</span>
                </div>

                <p className="text-white/80 mb-4">{selectedDish.description}</p>

                <div className="mb-4">
                  <h4 className="text-sm font-montserrat uppercase tracking-wider text-white/60 mb-2">Ingredients</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedDish.ingredients?.map((ingredient, idx) => (
                      <span key={idx} className="bg-[#1A2A3A] text-white/80 text-xs px-2 py-1 rounded">
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Close button */}
                {renderButton("Close", closeModal)}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// Dish Card Component
function DishCard({ dish, onClick }: { dish: FeaturedDish; onClick: () => void }) {
  return (
    <div
      className="bg-[#0A0A0A] rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-[1.02]"
      onClick={onClick}
    >
      {/* Dish Image */}
      <div className="relative w-full aspect-square">
        <Image src={dish.imagePath}
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

      {/* Dish Details */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-playfair text-white">{dish.name}</h3>
          <span className="text-base font-montserrat text-[#E6C78B]">{dish.price}</span>
        </div>
        <p className="text-white/70 text-sm mb-4">{dish.description}</p>

        {/* View Details Button - Responsive for all devices */}
        <button className="w-full group inline-flex items-center justify-center rounded-full text-sm font-montserrat font-medium tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden shadow-md hover:shadow-lg bg-[#1A2A3A] text-white px-4 py-2">
          <span className="absolute inset-0 rounded-full bg-[#E6C78B] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
          <span className="relative flex-1 text-center font-medium tracking-wide w-full group-hover:text-black transition-colors duration-300">
            View Details
          </span>
        </button>
      </div>
    </div>
  );
}


