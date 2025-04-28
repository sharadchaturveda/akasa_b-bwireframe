"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { memo } from "react";

interface EventListingsSectionProps {
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

const EventListingsSection = memo(function EventListingsSection({
  filteredEvents,
  eventCategories
}: EventListingsSectionProps) {
  return (
    <section className="w-full bg-[url('/images/gallery5.jpg')] bg-cover bg-fixed py-16 relative">
      <div className="absolute inset-0 bg-black/75"></div>
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 gap-16">
          {filteredEvents.map((event, index) => (
            <div 
              key={event.id} 
              className={`grid grid-cols-1 md:grid-cols-[40%_60%] gap-8 items-center ${
                index % 2 === 1 ? 'md:grid-cols-[60%_40%] md:grid-flow-dense' : ''
              }`}
            >
              {/* Event Image */}
              <div className={`relative h-[300px] md:h-[400px] overflow-hidden rounded-lg ${
                index % 2 === 1 ? 'md:col-start-2' : ''
              }`}>
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-[#E6C78B] text-black px-3 py-1 rounded-full text-xs font-medium">
                  {eventCategories.find(cat => cat.id === event.category)?.name}
                </div>
              </div>
              
              {/* Event Description */}
              <div className="p-6 md:p-8 bg-black/80 rounded-lg backdrop-blur-sm">
                <h2 className="text-2xl md:text-3xl font-playfair mb-4">{event.title}</h2>
                <p className="text-base md:text-lg font-montserrat mb-6 text-white/90 leading-relaxed">
                  {event.description}
                </p>
                
                <div className="mb-6">
                  <h3 className="text-lg font-playfair mb-3 text-[#E6C78B]">Features</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {event.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <svg className="w-5 h-5 text-[#E6C78B] mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-white/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex flex-wrap items-center justify-between">
                  <span className="text-[#E6C78B] font-medium mb-4 md:mb-0">{event.price}</span>
                  <Link href="#inquiry">
                    <Button className="bg-[#1A2A3A] text-white hover:bg-[#0A1A2A]" showArrow>
                      {"Inquire Now"}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default EventListingsSection;
