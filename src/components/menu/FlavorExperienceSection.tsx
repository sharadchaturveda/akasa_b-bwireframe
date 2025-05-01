"use client";

import Link from "next/link";
import Image from "next/image";
import { memo } from "react";

const FlavorExperienceSection = memo(function FlavorExperienceSection() {
  return (
    <section className="w-full relative overflow-hidden">
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black to-transparent z-10"></div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black to-transparent z-10"></div>

      <div className="min-h-[60vh] w-full grid grid-cols-1 md:grid-cols-[40%_60%] relative z-10">
        {/* Left Side - Experience the Flavors with elegant styling */}
        <div className="relative overflow-hidden group">
          {/* Background image with parallax effect */}
          <div className="absolute inset-0 transform scale-110 transition-transform duration-10000 group-hover:scale-105">
            <Image
              src="/images/home/philosophy-bg.jpg"
              alt="Culinary journey"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
              quality={80}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
          </div>

          {/* Content with elegant styling */}
          <div className="relative h-full flex flex-col justify-center p-8 md:p-12 lg:p-16">
            {/* Decorative corner accent */}
            <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-[#E6C78B]/50"></div>
            <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-[#E6C78B]/50"></div>

            <div className="max-w-md">
              <h3 className="text-xl md:text-2xl font-montserrat text-[#E6C78B] mb-2 tracking-wider uppercase">A culinary journey</h3>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair text-white mb-6 relative">
                Experience the Flavors of India
                <div className="absolute -bottom-3 left-0 w-24 h-0.5 bg-gradient-to-r from-[#E6C78B] to-transparent"></div>
              </h2>

              <p className="font-montserrat text-white/90 mb-8 text-base md:text-lg leading-relaxed">
                {"Our menu celebrates India's diverse culinary landscape, from aromatic North Indian spices to South Indian coconut-infused curries. Each dish reflects our commitment to tradition and quality."}
              </p>

              {/* Fancy animated button */}
              <Link href="/reservations">
                <button className="group relative overflow-hidden inline-flex items-center px-8 py-4 bg-transparent border-2 border-[#E6C78B] text-white text-sm font-medium transition-all duration-300 rounded-full">
                  {/* Button background animation */}
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#E6C78B] to-[#D4B679] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>

                  <span className="relative flex-1 text-center group-hover:text-black transition-colors duration-300">
                    Reserve a Table
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side - Culinary Highlights with elegant styling */}
        <div className="relative overflow-hidden group">
          {/* Background image with parallax effect */}
          <div className="absolute inset-0 transform scale-110 transition-transform duration-10000 group-hover:scale-105">
            <Image
              src="/images/home/drink.jpg"
              alt="Culinary philosophy"
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover"
              quality={80}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-black via-black/70 to-transparent"></div>
          </div>

          {/* Content with elegant styling */}
          <div className="relative h-full flex flex-col justify-center p-8 md:p-12 lg:p-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair text-white mb-6 relative">
              Our Culinary Philosophy
              <div className="absolute -bottom-3 left-0 w-24 h-0.5 bg-gradient-to-r from-[#E6C78B] to-transparent"></div>
            </h2>

            <p className="text-white/90 font-montserrat mb-8 text-base md:text-lg leading-relaxed max-w-2xl">
              {"At Akasa, food is a celebration of culture and tradition. Our menu is guided by three principles that honor the rich heritage of Indian cuisine while embracing modern techniques and presentations."}
            </p>

            {/* Elegant philosophy cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Tradition card */}
              <div className="group/card relative overflow-hidden bg-black/30 backdrop-blur-sm border border-white/10 p-6 transition-all duration-500 hover:border-[#E6C78B]/30 hover:bg-black/40">
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#E6C78B]/0 group-hover/card:border-[#E6C78B]/50 transition-colors duration-500"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#E6C78B]/0 group-hover/card:border-[#E6C78B]/50 transition-colors duration-500"></div>

                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#E6C78B]/10 flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-[#E6C78B]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,3L1,9L12,15L21,10.09V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z" />
                    </svg>
                  </div>
                  <h3 className="text-[#E6C78B] text-xl font-playfair">Tradition</h3>
                </div>

                <p className="text-white/80 font-montserrat text-sm leading-relaxed pl-11">
                  {"Honoring authentic recipes passed down through generations, preserving the essence of regional Indian cuisines."}
                </p>
              </div>

              {/* Quality card */}
              <div className="group/card relative overflow-hidden bg-black/30 backdrop-blur-sm border border-white/10 p-6 transition-all duration-500 hover:border-[#E6C78B]/30 hover:bg-black/40">
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#E6C78B]/0 group-hover/card:border-[#E6C78B]/50 transition-colors duration-500"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#E6C78B]/0 group-hover/card:border-[#E6C78B]/50 transition-colors duration-500"></div>

                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#E6C78B]/10 flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-[#E6C78B]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
                    </svg>
                  </div>
                  <h3 className="text-[#E6C78B] text-xl font-playfair">Quality</h3>
                </div>

                <p className="text-white/80 font-montserrat text-sm leading-relaxed pl-11">
                  {"Sourcing the finest ingredients and authentic spices, ensuring every dish meets our exacting standards of excellence."}
                </p>
              </div>

              {/* Innovation card */}
              <div className="group/card relative overflow-hidden bg-black/30 backdrop-blur-sm border border-white/10 p-6 transition-all duration-500 hover:border-[#E6C78B]/30 hover:bg-black/40">
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#E6C78B]/0 group-hover/card:border-[#E6C78B]/50 transition-colors duration-500"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#E6C78B]/0 group-hover/card:border-[#E6C78B]/50 transition-colors duration-500"></div>

                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#E6C78B]/10 flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-[#E6C78B]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,3C7.03,3 3,7.03 3,12C3,16.97 7.03,21 12,21C16.97,21 21,16.97 21,12C21,7.03 16.97,3 12,3M12,19C8.13,19 5,15.87 5,12C5,8.13 8.13,5 12,5C15.87,5 19,8.13 19,12C19,15.87 15.87,19 12,19M12,15.5C14,15.5 15.5,14 15.5,12C15.5,10 14,8.5 12,8.5C10,8.5 8.5,10 8.5,12C8.5,14 10,15.5 12,15.5M12,7C9.24,7 7,9.24 7,12C7,14.76 9.24,17 12,17C14.76,17 17,14.76 17,12C17,9.24 14.76,7 12,7Z" />
                    </svg>
                  </div>
                  <h3 className="text-[#E6C78B] text-xl font-playfair">Innovation</h3>
                </div>

                <p className="text-white/80 font-montserrat text-sm leading-relaxed pl-11">
                  {"Elevating classic flavors with creative techniques, presenting familiar tastes in surprising and delightful new ways."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default FlavorExperienceSection;
