"use client";

import { memo, useState } from "react";
import Image from "next/image";
import { MobilePrimaryButton } from "./MobilePrimaryButton";

/**
 * MobileCurrentOffersSection Component
 *
 * A mobile-optimized version of the Offers page current offers section
 */
const MobileCurrentOffersSection = memo(function MobileCurrentOffersSection() {
  // Offers data - same as desktop version
  const offers = [
    {
      id: "weekday-lunch",
      title: { text: "Weekday Lunch Special", emphasize: "" },
      description: "Enjoy 20% off on all lunch menu items Monday through Thursday. Perfect for business lunches or midday treats.",
      image: "/images/offers/promotions/weekday-lunch.jpg",
      validUntil: "December 31, 2025",
      discount: "20% off",
      code: "LUNCH20"
    },
    {
      id: "akasa-turns-1",
      title: { text: "Akasa Turns 1", emphasize: "1" },
      description: "10% Discount applicable on Happy Hour, Drinks and A La Carte Menu. Exclusively for Capitasky tenants.",
      image: "/images/offers/promotions/akasa-turns-1.jpg",
      validUntil: "15th May to 30th June 2025",
      discount: "10% Discount",
      code: "AKASA1YR"
    },
    {
      id: "family-feast",
      title: { text: "Weekend Family Feast", emphasize: "" },
      description: "Family-style dining package for groups of 4 or more. Includes appetizers, main courses, and desserts at a special price.",
      image: "/images/menu/hero/gallery-3.jpg",
      validUntil: "January 15, 2026",
      discount: "Special package",
      code: "FAMILY4+"
    }
  ];

  // State for expanded offers
  const [expandedOffers, setExpandedOffers] = useState<string[]>([]);

  // Toggle expanded state for an offer
  const toggleExpand = (offerId: string) => {
    setExpandedOffers(prev =>
      prev.includes(offerId)
        ? prev.filter(id => id !== offerId)
        : [...prev, offerId]
    );
  };

  return (
    <section id="current-offers" className="w-full bg-black py-12 relative overflow-hidden mobile-container">
      {/* Animated background pattern - simplified for mobile */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e6c78b' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
          animation: 'slideBackground 60s linear infinite'
        }}></div>
      </div>

      {/* Decorative elements - simplified for mobile */}
      <div className="absolute top-0 left-0 w-full h-10 bg-gradient-to-b from-black to-transparent z-10"></div>
      <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-black to-transparent z-10"></div>
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-[#E6C78B]/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-[#E6C78B]/10 to-transparent rounded-full blur-3xl"></div>

      <div className="px-4 relative z-10">
        {/* Elegant heading with decorative elements - mobile optimized */}
        <div className="text-center mb-8 relative">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-16 h-0.5 bg-gradient-to-r from-transparent via-[#E6C78B] to-transparent"></div>
          <h2 className="text-mobile-2xl text-2xl font-playfair mb-4 relative inline-block">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E6C78B] to-[#D4B679]">Current Offers</span>
            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#E6C78B]/80 to-transparent"></div>
          </h2>
          <p className="text-mobile-sm text-sm font-montserrat text-white/80 max-w-xs mx-auto leading-relaxed italic text-container">
            {"Take advantage of these limited-time promotions to experience the best of Akasa at exceptional value."}
          </p>

          {/* Decorative tag icon */}
          <div className="flex justify-center mt-6 mb-2">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-[#1A2A3A] opacity-30"></div>
              <svg className="w-6 h-6 text-[#E6C78B]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21.41,11.58L12.41,2.58C12.04,2.21 11.53,2 11,2H4C2.9,2 2,2.9 2,4V11C2,11.53 2.21,12.04 2.59,12.41L3,12.81C3.9,12.27 4.94,12 6,12A6,6 0 0,1 12,18C12,19.06 11.73,20.1 11.19,21L11.59,21.4C11.96,21.78 12.47,22 13,22H20C21.1,22 22,21.1 22,20V13C22,12.47 21.79,11.96 21.41,11.58M5.5,7A1.5,1.5 0 0,1 4,5.5A1.5,1.5 0 0,1 5.5,4A1.5,1.5 0 0,1 7,5.5A1.5,1.5 0 0,1 5.5,7Z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Offers cards - stacked for mobile but with same content as desktop */}
        <div className="flex flex-col gap-6 flex-container">
          {offers.map((offer) => {
            const isExpanded = expandedOffers.includes(offer.id);

            return (
              <div
                key={offer.id}
                className="relative bg-black/80 backdrop-blur-sm border border-white/5 rounded-lg overflow-hidden shadow-lg"
              >
                {/* Card background with subtle glow effect */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r from-[#E6C78B]/0 via-[#E6C78B]/30 to-[#E6C78B]/0 rounded-lg blur opacity-0 transition duration-1000 ${isExpanded ? 'opacity-100' : ''}`}></div>

                <div className="relative">
                  {/* Offer image */}
                  <div className="relative h-64 w-full overflow-hidden">
                    {/* Decorative corner accent */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#E6C78B]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#E6C78B]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>

                    <Image
                      src={offer.image}
                      alt={offer.title}
                      fill
                      sizes="100vw"
                      className="object-cover"
                      quality={75}
                      loading="lazy"
                    />

                    {/* Elegant gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60"></div>

                    {/* Validity badge */}
                    <div className="absolute top-3 right-3 z-10">
                      <div className="bg-[#E6C78B] text-black px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                        {offer.discount}
                      </div>
                    </div>
                  </div>

                  {/* Offer details */}
                  <div className="p-4">
                    <h3 className="text-mobile-lg text-lg font-playfair text-white mb-2">
                      {offer.title.emphasize ? (
                        <>
                          {offer.title.text.split(offer.title.emphasize)[0]}
                          <span className="text-4xl font-bold text-[#E6C78B]">{offer.title.emphasize}</span>
                          {offer.title.text.split(offer.title.emphasize)[1]}
                        </>
                      ) : (
                        offer.title.text
                      )}
                    </h3>

                    <p className="text-mobile-sm text-sm text-white/80 mb-3 text-container">
                      {offer.description}
                    </p>

                    {/* Expandable content */}
                    {isExpanded && (
                      <div className="mt-3 animate-fadeIn">
                        {/* Fancy promo code display */}
                        <div className="bg-[#1A2A3A] p-3 rounded-lg mb-4 border border-[#E6C78B]/20 relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#E6C78B]/0 via-[#E6C78B]/30 to-[#E6C78B]/0"></div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-white/80">Promo Code:</span>
                            <span className="font-medium text-[#E6C78B] text-sm tracking-wider">{offer.code}</span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center mb-4">
                          <span className="text-xs text-white/60">Valid Until:</span>
                          <span className="text-sm text-white">{offer.validUntil}</span>
                        </div>

                        <MobilePrimaryButton className="w-full">
                          Redeem Offer
                        </MobilePrimaryButton>
                      </div>
                    )}

                    {/* Toggle button */}
                    <button
                      onClick={() => toggleExpand(offer.id)}
                      className="text-mobile-sm text-xs text-[#E6C78B] mt-3 underline touch-manipulation min-h-[44px] px-4 py-2 flex items-center"
                    >
                      {isExpanded ? 'Show Less' : 'Show More'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Terms and conditions note */}
        <p className="text-xs text-white/50 text-center mt-8">
          All offers are subject to availability and cannot be combined with other promotions.
          Please mention the promo code when making your reservation.
        </p>
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

export default MobileCurrentOffersSection;

