"use client";

import Image from "next/image";
import Link from "next/link";
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
    <section className="w-full bg-black relative overflow-hidden py-10">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black to-transparent z-10"></div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black to-transparent z-10"></div>
      <div className="absolute top-40 right-0 w-80 h-80 rounded-full bg-[#E6C78B]/5 blur-3xl"></div>
      <div className="absolute bottom-40 left-0 w-80 h-80 rounded-full bg-[#E6C78B]/5 blur-3xl"></div>

      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5 z-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e6c78b' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
          animation: 'slideBackground 60s linear infinite'
        }}></div>
      </div>

      <div className="w-full relative z-10">
        {filteredEvents.map((event, index) => (
          <div
            key={event.id}
            className={`flex flex-col md:flex-row w-full relative ${
              index % 2 === 1 ? 'md:flex-row-reverse' : ''
            }`}
          >
            {/* Event Image - Exactly 40% width with no gaps */}
            <div className="relative h-[350px] md:h-[500px] w-full md:w-[40%] group overflow-hidden">
              {/* Decorative corner accents that appear on hover - fixed positioning */}
              <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-[#E6C78B]/0 group-hover:border-[#E6C78B]/50 transition-colors duration-500 z-10"></div>
              <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-[#E6C78B]/0 group-hover:border-[#E6C78B]/50 transition-colors duration-500 z-10"></div>

              <Image
                src={event.image}
                alt={event.title}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                quality={80}
              />

              {/* Elegant gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${
                index % 2 === 1 ? 'from-transparent via-black/30 to-black/70' : 'from-black/70 via-black/30 to-transparent'
              }`}></div>

              {/* Category badge with animation */}
              <div className="absolute top-6 right-6 z-10 transform group-hover:scale-105 transition-transform duration-300">
                <div className="bg-[#E6C78B] text-black px-4 py-2 rounded-full text-xs font-medium shadow-lg">
                  {eventCategories.find(cat => cat.id === event.category)?.name}
                </div>
              </div>
            </div>

            {/* Event Description - Exactly 60% width with no gaps */}
            <div className={`p-10 md:p-16 bg-black w-full md:w-[60%] flex flex-col justify-center relative ${
              index % 2 === 1 ? 'bg-black' : 'bg-black'
            }`}>
              {/* Decorative element */}
              <div className={`absolute top-10 ${index % 2 === 1 ? 'right-10' : 'left-10'} w-20 h-1 bg-gradient-to-r ${
                index % 2 === 1 ? 'from-[#E6C78B] to-transparent' : 'from-transparent to-[#E6C78B]'
              }`}></div>

              <h2 className="text-3xl md:text-4xl font-playfair mb-6 relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">{event.title}</span>
                <div className="absolute -bottom-3 left-0 w-24 h-0.5 bg-gradient-to-r from-[#E6C78B] to-transparent"></div>
              </h2>

              <p className="text-base md:text-lg font-montserrat mb-8 text-white/90 leading-relaxed">
                {event.description}
              </p>

              <div className="mb-8">
                <h3 className="text-xl font-playfair mb-4 text-[#E6C78B]">Features</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {event.features.map((feature, i) => (
                    <li key={i} className="flex items-start group/feature">
                      <div className="w-6 h-6 rounded-full bg-[#1A2A3A] flex items-center justify-center mr-3 group-hover/feature:bg-[#E6C78B]/20 transition-colors duration-300">
                        <svg className="w-3 h-3 text-[#E6C78B]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                        </svg>
                      </div>
                      <span className="text-white/80 group-hover/feature:text-white transition-colors duration-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap items-center justify-between">
                <div className="mb-6 md:mb-0">
                  <span className="text-sm text-white/60 block mb-1">Starting from</span>
                  <span className="text-2xl text-[#E6C78B] font-medium">{event.price}</span>
                </div>

                <Link href="#inquiry">
                  <button className="group relative overflow-hidden inline-flex items-center px-8 py-4 bg-transparent border-2 border-[#E6C78B] text-white text-sm font-medium transition-all duration-300 rounded-md">
                    {/* Button background animation */}
                    <span className="absolute inset-0 rounded-md bg-gradient-to-r from-[#E6C78B] to-[#D4B679] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>

                    <span className="relative flex items-center group-hover:text-black transition-colors duration-300">
                      Inquire Now
                      <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add custom CSS for animations */}
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
