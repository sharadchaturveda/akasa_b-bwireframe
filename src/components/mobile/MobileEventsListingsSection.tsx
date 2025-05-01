"use client";

import { memo, useState } from "react";
import Image from "next/image";
import { MobilePrimaryButton } from "./MobilePrimaryButton";

interface MobileEventsListingsSectionProps {
  filteredEvents: Array<{
    id: number;
    title: string;
    description: string;
    image: string;
    category: string;
    features: string[];
    price: string;
  }>;
  eventCategories: Array<{ id: string; name: string }>;
}

/**
 * MobileEventsListingsSection Component
 * 
 * A mobile-optimized version of the Events page listings section
 */
const MobileEventsListingsSection = memo(function MobileEventsListingsSection({
  filteredEvents,
  eventCategories
}: MobileEventsListingsSectionProps) {
  // State to track expanded event cards
  const [expandedEvents, setExpandedEvents] = useState<number[]>([]);

  // Toggle expanded state for an event
  const toggleExpand = (eventId: number) => {
    setExpandedEvents(prev => 
      prev.includes(eventId) 
        ? prev.filter(id => id !== eventId) 
        : [...prev, eventId]
    );
  };

  return (
    <section className="w-full bg-black relative overflow-hidden py-8">
      {/* Subtle background elements */}
      <div className="absolute top-40 right-0 w-64 h-64 rounded-full bg-[#E6C78B]/5 blur-3xl"></div>
      <div className="absolute bottom-40 left-0 w-64 h-64 rounded-full bg-[#E6C78B]/5 blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        {/* Event count */}
        <p className="text-xs text-white/60 mb-6 text-center">
          Showing {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''}
        </p>
        
        {/* Event cards - stacked for mobile */}
        <div className="flex flex-col gap-6">
          {filteredEvents.map((event) => {
            const isExpanded = expandedEvents.includes(event.id);
            const categoryName = eventCategories.find(cat => cat.id === event.category)?.name || '';
            
            return (
              <div 
                key={event.id}
                className="bg-black/40 border border-white/10 rounded-lg overflow-hidden shadow-lg"
              >
                {/* Event image */}
                <div className="relative h-48 w-full">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    sizes="100vw"
                    className="object-cover"
                    quality={75}
                    loading="lazy"
                  />
                  
                  {/* Category badge */}
                  <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                    {categoryName}
                  </div>
                </div>
                
                {/* Event details */}
                <div className="p-4">
                  <h3 className="text-lg font-playfair text-white mb-2">{event.title}</h3>
                  
                  <p className="text-sm text-white/80 mb-3 line-clamp-2">
                    {event.description}
                  </p>
                  
                  {/* Expandable content */}
                  {isExpanded && (
                    <div className="mt-3 animate-fadeIn">
                      <h4 className="text-xs uppercase tracking-wider text-[#E6C78B] mb-2">Features</h4>
                      <ul className="text-xs text-white/80 mb-4">
                        {event.features.map((feature, index) => (
                          <li key={index} className="mb-1 flex items-start">
                            <span className="text-[#E6C78B] mr-2">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="text-sm font-medium text-white mb-4">
                        {event.price}
                      </div>
                      
                      <MobilePrimaryButton className="w-full">
                        Inquire Now
                      </MobilePrimaryButton>
                    </div>
                  )}
                  
                  {/* Toggle button */}
                  <button
                    onClick={() => toggleExpand(event.id)}
                    className="text-xs text-[#E6C78B] mt-2 underline touch-manipulation"
                  >
                    {isExpanded ? 'Show Less' : 'Show More'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Empty state */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/60">No events found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
});

export default MobileEventsListingsSection;
