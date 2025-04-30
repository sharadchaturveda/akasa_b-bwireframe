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
    <section className="w-full bg-black relative overflow-hidden py-16">
      {/* Enhanced decorative elements */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black to-transparent z-10"></div>
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent z-10"></div>
      <div className="absolute top-40 right-0 w-96 h-96 rounded-full bg-[#E6C78B]/5 blur-3xl animate-pulse-slow" style={{ animationDuration: '15s' }}></div>
      <div className="absolute bottom-40 left-0 w-96 h-96 rounded-full bg-[#E6C78B]/5 blur-3xl animate-pulse-slow" style={{ animationDuration: '20s' }}></div>

      {/* Subtle animated particles */}
      <div className="absolute inset-0 opacity-20 pointer-events-none z-0">
        <div className="absolute top-1/4 right-1/4 w-1 h-1 rounded-full bg-[#E6C78B] animate-float" style={{ animationDuration: '15s' }}></div>
        <div className="absolute top-3/4 right-1/3 w-1 h-1 rounded-full bg-[#E6C78B] animate-float" style={{ animationDuration: '20s' }}></div>
        <div className="absolute top-1/3 left-1/4 w-1 h-1 rounded-full bg-[#E6C78B] animate-float" style={{ animationDuration: '25s' }}></div>
      </div>

      {/* Enhanced animated background pattern */}
      <div className="absolute inset-0 opacity-5 z-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e6c78b' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
          animation: 'slideBackground 60s linear infinite'
        }}></div>
      </div>

      {/* Section heading */}
      <div className="container mx-auto px-4 md:px-8 relative z-10 mb-12">
        <div className="text-center">
          <span className="text-[#E6C78B] text-sm tracking-widest uppercase mb-2 block font-montserrat">Our Offerings</span>
          <h2 className="text-3xl md:text-4xl font-playfair mb-4 relative inline-block">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">Exceptional Event Experiences</span>
            <div className="absolute -bottom-3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#E6C78B]/80 to-transparent"></div>
          </h2>
        </div>
      </div>

      <div className="w-full relative z-10">
        {filteredEvents.map((event, index) => (
          <div
            key={event.id}
            className={`flex flex-col md:flex-row w-full relative ${
              index % 2 === 1 ? 'md:flex-row-reverse' : ''
            }`}
          >
            {/* Enhanced Event Image - Exactly 40% width with no gaps */}
            <div className="relative h-[350px] md:h-[500px] w-full md:w-[40%] group overflow-hidden">
              {/* Enhanced decorative corner accents that appear on hover */}
              <div className="absolute top-6 left-6 w-20 h-20 border-t-2 border-l-2 border-[#E6C78B]/0 group-hover:border-[#E6C78B]/60 transition-all duration-700 z-10 group-hover:w-24 group-hover:h-24"></div>
              <div className="absolute bottom-6 right-6 w-20 h-20 border-b-2 border-r-2 border-[#E6C78B]/0 group-hover:border-[#E6C78B]/60 transition-all duration-700 z-10 group-hover:w-24 group-hover:h-24"></div>

              <Image
                src={event.image}
                alt={event.title}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover transition-transform duration-1000 group-hover:scale-110 filter group-hover:brightness-110"
                quality={85}
              />

              {/* Enhanced gradient overlay with animation */}
              <div className={`absolute inset-0 bg-gradient-to-r transition-opacity duration-700 ${
                index % 2 === 1
                  ? 'from-transparent via-black/40 to-black/80 group-hover:opacity-80'
                  : 'from-black/80 via-black/40 to-transparent group-hover:opacity-80'
              }`}></div>

              {/* Enhanced category badge with animation */}
              <div className="absolute top-8 right-8 z-10 transform group-hover:scale-110 transition-all duration-500 group-hover:translate-y-1">
                <div className="bg-[#E6C78B] text-black px-5 py-2 rounded-full text-xs font-medium tracking-wide shadow-xl">
                  {eventCategories.find(cat => cat.id === event.category)?.name}
                </div>
              </div>

              {/* Subtle shine effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-20 transition-opacity duration-700"></div>
            </div>

            {/* Enhanced Event Description - Exactly 60% width with no gaps */}
            <div className={`p-10 md:p-16 bg-black w-full md:w-[60%] flex flex-col justify-center relative group/desc ${
              index % 2 === 1 ? 'bg-black' : 'bg-black'
            }`}>
              {/* Enhanced decorative elements */}
              <div className={`absolute top-12 ${index % 2 === 1 ? 'right-12' : 'left-12'} w-24 h-1 bg-gradient-to-r ${
                index % 2 === 1 ? 'from-[#E6C78B] to-transparent' : 'from-transparent to-[#E6C78B]'
              } transition-all duration-700 group-hover/desc:w-32`}></div>

              {/* Decorative corner accents */}
              <div className="absolute top-6 left-6 w-16 h-16 border-t border-l border-[#E6C78B]/10 opacity-0 group-hover/desc:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute bottom-6 right-6 w-16 h-16 border-b border-r border-[#E6C78B]/10 opacity-0 group-hover/desc:opacity-100 transition-opacity duration-700"></div>

              <span className="text-[#E6C78B] text-sm tracking-widest uppercase mb-2 block font-montserrat">Event Package</span>

              <h2 className="text-3xl md:text-4xl font-playfair mb-6 relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)' }}>{event.title}</span>
                <div className="absolute -bottom-3 left-0 w-24 h-0.5 bg-gradient-to-r from-[#E6C78B] to-transparent transition-all duration-700 group-hover/desc:w-32"></div>
              </h2>

              <p className="text-base md:text-lg font-montserrat mb-8 text-white/90 leading-relaxed">
                {event.description}
              </p>

              <div className="mb-8">
                <h3 className="text-xl font-playfair mb-4 text-[#E6C78B]">Features</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {event.features.map((feature, i) => (
                    <li key={i} className="flex items-start group/feature">
                      <div className="w-7 h-7 rounded-full bg-[#1A2A3A] flex items-center justify-center mr-3 group-hover/feature:bg-[#E6C78B]/20 transition-all duration-300 transform group-hover/feature:scale-110">
                        <svg className="w-3.5 h-3.5 text-[#E6C78B]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                        </svg>
                      </div>
                      <span className="text-white/80 group-hover/feature:text-white transition-colors duration-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap items-center justify-between">
                <div className="mb-6 md:mb-0 transform transition-all duration-300 group-hover/desc:translate-y-[-5px]">
                  <span className="text-sm text-[#E6C78B]/60 block mb-1">Starting from</span>
                  <span className="text-2xl text-[#E6C78B] font-medium">{event.price}</span>
                </div>

                <Link href="#inquiry">
                  <button className="group inline-flex items-center justify-center rounded-full text-sm font-montserrat font-medium tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden shadow-md hover:shadow-lg bg-[#1A2A3A] text-white px-8 py-4">
                    {/* Gold fill animation */}
                    <span className="absolute inset-0 rounded-full bg-[#E6C78B] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>

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
