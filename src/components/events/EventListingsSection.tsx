"use client";

import Image from "next/image";
import Link from "next/link";
import { memo, useEffect } from "react";

/**
 * Props interface for the EventListingsSection component
 *
 * @property {Array} filteredEvents - Array of event objects filtered by the selected category
 * @property {Array} eventCategories - Array of category objects for mapping category IDs to display names
 */
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

/**
 * EventListingsSection Component
 *
 * Displays a list of event offerings in an alternating layout.
 * Each event is displayed with an image on one side and details on the other,
 * with the layout alternating for each consecutive event.
 *
 * Features:
 * - Responsive design (stacked on mobile, side-by-side on desktop)
 * - Alternating layout for visual interest
 * - Hover animations for interactive elements
 * - Optimized image loading with next/image
 * - Route prefetching for the inquiry form link
 *
 * @param {EventListingsSectionProps} props - Component props
 * @returns {JSX.Element} A section containing the event listings
 */
const EventListingsSection = memo(function EventListingsSection({
  filteredEvents,
  eventCategories
}: EventListingsSectionProps) {
  useEffect(() => {
    // Force pattern visibility after component mounts
    const forcePatternVisibility = () => {
      document.querySelectorAll('[data-exclude-optimization="true"]').forEach(el => {
        // Force the element to be visible
        (el as HTMLElement).style.display = 'block';
        (el as HTMLElement).style.visibility = 'visible';
        (el as HTMLElement).style.opacity = '0.1';
      });
    };

    // Run immediately and then every second for 5 seconds to ensure visibility
    forcePatternVisibility();
    const interval = setInterval(forcePatternVisibility, 1000);

    // Clean up after 5 seconds
    setTimeout(() => clearInterval(interval), 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full py-0 pt-0 bg-black relative overflow-hidden">
      {/*
        Subtle animated particles that float around
        These add a touch of elegance and movement to the background
      */}
      <div className="absolute inset-0 opacity-20 pointer-events-none z-0">
        <div className="absolute top-1/4 right-1/4 w-1 h-1 rounded-full bg-[#E6C78B] animate-float" style={{ animationDuration: '15s' }}></div>
        <div className="absolute top-3/4 right-1/3 w-1 h-1 rounded-full bg-[#E6C78B] animate-float" style={{ animationDuration: '20s' }}></div>
        <div className="absolute top-1/3 left-1/4 w-1 h-1 rounded-full bg-[#E6C78B] animate-float" style={{ animationDuration: '25s' }}></div>
      </div>

      {/* Event listings container */}
      <div className="w-full relative z-10">
        {/*
          Map through filtered events and create a card for each with alternating layout
          Even-indexed events (0, 2, 4, etc.) → image left, text right
          Odd-indexed events (1, 3, 5, etc.) → image right, text left
        */}
        {filteredEvents.map((event, index) => {
          // Use standard flex-row for all, but control order for specific categories
          const isSpecialCategory = event.category === 'anniversary' || event.category === 'office-parties';

          return (
            <div
              key={event.id}
              className="w-full flex flex-col md:flex-row md:flex-nowrap md:items-stretch"
            >
              {/* Event Image Container */}
              <div className={`relative h-[350px] md:h-auto w-full md:w-2/5 group overflow-hidden ${
                isSpecialCategory ? 'md:order-2' : index % 2 === 0 ? 'md:order-1' : 'md:order-2'
              }`}>
                {/* Image content */}
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-110 filter group-hover:brightness-110"
                  quality={85}
                />

                {/* Gradient overlay */}
                <div
                  className="absolute inset-0 bg-gradient-to-r transition-opacity duration-700"
                  style={{
                    background: isSpecialCategory
                      ? 'linear-gradient(to left, rgba(0,0,0,0.8), rgba(0,0,0,0.4), transparent)'
                      : index % 2 === 0
                        ? 'linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.4), transparent)'
                        : 'linear-gradient(to left, rgba(0,0,0,0.8), rgba(0,0,0,0.4), transparent)'
                  }}
                ></div>

                {/* Category badge */}
                <div className="absolute top-8 right-8 z-10 transform group-hover:scale-110 transition-all duration-500 group-hover:translate-y-1">
                  <div className="bg-[#E6C78B] text-black px-5 py-2 rounded-full text-xs font-medium tracking-wide shadow-xl">
                    {eventCategories.find(cat => cat.id === event.category)?.name}
                  </div>
                </div>

                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-20 transition-opacity duration-700"></div>

                {/* Decorative corner accents */}
                <div className="absolute top-6 left-6 w-20 h-20 border-t-2 border-l-2 border-[#E6C78B]/0 group-hover:border-[#E6C78B]/60 transition-all duration-700 z-10 group-hover:w-24 group-hover:h-24"></div>
                <div className="absolute bottom-6 right-6 w-20 h-20 border-b-2 border-r-2 border-[#E6C78B]/0 group-hover:border-[#E6C78B]/60 transition-all duration-700 z-10 group-hover:w-24 group-hover:h-24"></div>
              </div>

              {/* Event Description Container */}
              <div
                className={`p-6 md:p-16 bg-black w-full md:w-3/5 flex flex-col justify-center relative group/desc ${
                  isSpecialCategory ? 'md:order-1' : index % 2 === 0 ? 'md:order-2' : 'md:order-1'
                }`}
              >
                {/* Custom background pattern based on event category with fallback */}
                <div
                  className="absolute inset-0 opacity-15 pointer-events-none z-0"
                  style={{
                    backgroundImage: `url('/images/events/backgrounds/${event.category}-pattern.png'), url('/images/events/backgrounds/default-pattern.png')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'repeat',
                    backgroundBlendMode: 'overlay'
                  }}
                ></div>

                {/* Event package label */}
                <span className="text-[#E6C78B] text-xs md:text-sm tracking-widest uppercase block font-montserrat mb-1 md:mb-2">Event Package</span>

                {/* Event title with decorative underline */}
                <h2 className="text-2xl md:text-4xl font-playfair relative inline-block mt-4 md:mt-8 mb-4 md:mb-8">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)' }}>{event.title}</span>
                  <div className="absolute -bottom-2 md:-bottom-3 left-0 w-16 md:w-24 h-0.5 bg-gradient-to-r from-[#E6C78B] to-transparent transition-all duration-700 group-hover/desc:w-24 md:group-hover/desc:w-32"></div>
                </h2>

                {/* Event description paragraph */}
                <p className="text-sm md:text-lg font-montserrat text-white/90 leading-relaxed mt-2 mb-4 md:mb-6">
                  {event.description}
                </p>

                {/* Features list section */}
                <div className="mb-4 md:mb-6">
                  <h3 className="text-lg md:text-xl font-playfair text-[#E6C78B] mt-4 md:mt-8 mb-4 md:mb-8">Features</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4">
                    {/* Map through features array to create list items */}
                    {event.features.map((feature, i) => (
                      <li key={i} className="flex items-start group/feature">
                        {/* Checkmark icon with hover effect */}
                        <div className="w-5 h-5 md:w-7 md:h-7 rounded-full bg-[#1A2A3A] flex items-center justify-center mr-2 md:mr-3 group-hover/feature:bg-[#E6C78B]/20 transition-all duration-300 transform group-hover/feature:scale-110">
                          <svg className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 text-[#E6C78B]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                          </svg>
                        </div>
                        {/* Feature text with hover effect */}
                        <span className="text-sm md:text-base text-white/80 group-hover/feature:text-white transition-colors duration-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer section with price and CTA button */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mt-2 md:mt-8">
                  {/* Price display */}
                  <div className="text-white/90 font-montserrat mb-4 md:mb-0">
                    <span className="text-xs md:text-sm uppercase tracking-wider">Starting at</span>
                    <div className="text-xl md:text-2xl font-medium">${event.price}</div>
                  </div>

                  {/* Inquiry button with proper mobile spacing and gold fill animation */}
                  <Link href="#inquiry" prefetch={true}>
                    <button className="group inline-flex items-center justify-center rounded-full text-xs md:text-sm font-montserrat font-medium tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden shadow-md hover:shadow-lg bg-[#1A2A3A] text-white px-4 md:px-6 py-2 md:py-3 min-w-[120px] md:min-w-[160px]">
                      {/* Gold fill animation */}
                      <span className="absolute inset-0 rounded-full bg-[#E6C78B] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>

                      {/* Button text that changes color on hover */}
                      <span className="relative flex-1 text-center group-hover:text-black transition-colors duration-300">
                        Inquire Now
                      </span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/*
        Custom CSS for animations
        This defines the slideBackground animation used by the decorative pattern
        The animation gradually moves the background pattern for subtle visual interest
      */}
      <style jsx>{`
        @keyframes slideBackground {
          0% { background-position: 0 0; }
          100% { background-position: 100% 100%; }
        }
      `}</style>
    </section>
  );
});

export default EventListingsSection;
