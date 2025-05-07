"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useDeviceDetection } from "@/hooks/useDeviceDetection";

export default function VisitUsSection() {
  // Use the device detection hook instead of implementing our own logic
  const { isMobile, isDetectionComplete } = useDeviceDetection();


  return (
    <section
      id="visit-us"
      className="min-h-[80vh] w-full bg-cover bg-center flex items-center justify-center text-center px-4 sm:px-8 py-12 sm:py-16 relative overflow-hidden"
      style={{
        backgroundImage: `url('/images/home/gallery/location.jpg?quality=${isMobile ? '60' : '75'}&width=${isMobile ? '800' : '1200'}')`,
        backgroundPosition: isMobile ? 'center center' : 'center'
      }}
    >
      {/* Enhanced overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/40"></div>

      {/* Subtle animated particles - hidden on mobile for better performance */}
      {!isMobile && (
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-1 h-1 rounded-full bg-white animate-float" style={{ animationDuration: '15s' }}></div>
          <div className="absolute top-1/3 left-2/3 w-1 h-1 rounded-full bg-white animate-float" style={{ animationDuration: '20s' }}></div>
          <div className="absolute top-2/3 left-1/3 w-1 h-1 rounded-full bg-white animate-float" style={{ animationDuration: '25s' }}></div>
        </div>
      )}

      <div className={`relative z-10 bg-black/70 ${isMobile ? 'p-4' : 'p-5 sm:p-8 md:p-12'} rounded-lg border border-[#E6C78B]/20 shadow-2xl ${isMobile ? 'w-[95%]' : 'w-[92%] sm:w-[90%]'} max-w-lg backdrop-blur-sm animate-fadeSlideUp`}>
        {/* Decorative corner accents - smaller on mobile */}
        <div className={`absolute top-0 left-0 ${isMobile ? 'w-6 h-6' : 'w-8 h-8 sm:w-12 md:w-16 sm:h-12 md:h-16'} border-t border-l border-[#E6C78B]/30`}></div>
        <div className={`absolute bottom-0 right-0 ${isMobile ? 'w-6 h-6' : 'w-8 h-8 sm:w-12 md:w-16 sm:h-12 md:h-16'} border-b border-r border-[#E6C78B]/30`}></div>

        <span className="text-[#E6C78B] text-xs sm:text-sm tracking-widest uppercase mb-1 sm:mb-2 block font-montserrat">Location</span>
        <h2 className="text-2xl sm:text-3xl font-playfair mb-2 sm:mb-4 text-white" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>{"Visit Us"}</h2>

        <div className="w-16 sm:w-24 h-[1px] bg-gradient-to-r from-[#E6C78B]/80 to-transparent mx-auto mb-3 sm:mb-6"></div>

        <p className="text-sm sm:text-base lg:text-lg font-montserrat text-white/90 mb-1 sm:mb-2">{"79 Robinson Road, #01-03 Capitasky,"}</p>
        <p className="text-sm sm:text-base lg:text-lg font-montserrat text-white/90 mb-4 sm:mb-6">{"Tanjong Pagar, Singapore 068897"}</p>

        {isMobile ? (
          <div className="flex flex-col items-center justify-center mb-4 sm:mb-6">
            <div className="w-7 h-7 rounded-full bg-[#1A2A3A]/80 flex items-center justify-center mb-2 flex-shrink-0">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#E6C78B" strokeWidth="1.5" />
                <path d="M12 6V12L16 14" stroke="#E6C78B" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-xs font-montserrat text-white/90 mb-1">{"Monday to Saturday:"}</p>
              <p className="text-xs font-montserrat text-white/90">{"11:30am to 10:00pm"}</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center mb-4 sm:mb-6">
            <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-[#1A2A3A]/80 flex items-center justify-center mr-2 sm:mr-4 flex-shrink-0">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="sm:w-5 sm:h-5"
              >
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#E6C78B" strokeWidth="1.5" />
                <path d="M12 6V12L16 14" stroke="#E6C78B" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <p className="text-xs sm:text-sm lg:text-base font-montserrat text-white/90">
              {"Monday to Saturday: 11:30am to 10:00pm"}
            </p>
          </div>
        )}

        <div className={`flex ${isMobile ? 'flex-col' : 'flex-col sm:flex-row'} gap-3 sm:gap-4 justify-center`}>
          <Link href="https://akasa.oddle.me/en_SG/" className="w-full flex justify-center" target="_blank" rel="noopener noreferrer">
            <Button
              className={`uppercase bg-[#1A2A3A] text-white ${!isMobile && 'hover:bg-[#0A1A2A]'} w-full sm:w-[200px] md:w-[240px] px-3 sm:px-6 py-2 sm:py-3 text-center shadow-lg text-xs sm:text-sm`}
              style={{
                minHeight: isMobile ? '44px' : 'auto',
                touchAction: isMobile ? 'manipulation' : 'auto'
              }}
            >
              {"Order Online"}
            </Button>
          </Link>
          <Link href="/reservations" className="w-full flex justify-center">
            <Button
              className={`uppercase bg-[#1A2A3A] text-white ${!isMobile && 'hover:bg-[#0A1A2A]'} w-full sm:w-[200px] md:w-[240px] px-3 sm:px-6 py-2 sm:py-3 text-center shadow-lg text-xs sm:text-sm`}
              style={{
                minHeight: isMobile ? '44px' : 'auto',
                touchAction: isMobile ? 'manipulation' : 'auto'
              }}
            >
              {"Reserve Table"}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

