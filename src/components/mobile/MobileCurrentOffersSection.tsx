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
  // Offers data
  const offers = [
    {
      id: "weekday-lunch",
      title: "Weekday Lunch Special",
      description: "Enjoy our 3-course set lunch menu at a special price, available Monday to Friday, 11:30am to 2:30pm.",
      image: "/images/offers/lunch-special.jpg",
      validUntil: "Ongoing",
      discount: "25% off",
      code: "LUNCH25"
    },
    {
      id: "anniversary",
      title: "Anniversary Celebration",
      description: "Celebrating our 5th anniversary with a complimentary glass of champagne for all dinner reservations.",
      image: "/images/offers/anniversary.jpg",
      validUntil: "June 30, 2025",
      discount: "Complimentary champagne",
      code: "5YEARS"
    },
    {
      id: "wine-pairing",
      title: "Wine Pairing Experience",
      description: "Add our curated wine pairing to any dinner menu at a special price.",
      image: "/images/offers/wine-pairing.jpg",
      validUntil: "Ongoing",
      discount: "20% off",
      code: "WINE20"
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
    <section className="w-full bg-black py-12 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute top-40 right-0 w-64 h-64 rounded-full bg-[#E6C78B]/5 blur-3xl"></div>
      <div className="absolute bottom-40 left-0 w-64 h-64 rounded-full bg-[#E6C78B]/5 blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        {/* Section heading */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-playfair text-white mb-2">Current Offers</h2>
          <div className="w-16 h-[1px] bg-gradient-to-r from-[#E6C78B]/80 to-transparent mx-auto mb-4"></div>
          <p className="text-sm text-white/80 max-w-md mx-auto">
            Take advantage of these limited-time promotions
          </p>
        </div>
        
        {/* Offers cards - stacked for mobile */}
        <div className="flex flex-col gap-6">
          {offers.map((offer) => {
            const isExpanded = expandedOffers.includes(offer.id);
            
            return (
              <div 
                key={offer.id}
                className="bg-black/40 border border-white/10 rounded-lg overflow-hidden shadow-lg"
              >
                {/* Offer image */}
                <div className="relative h-48 w-full">
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    fill
                    sizes="100vw"
                    className="object-cover"
                    quality={75}
                    loading="lazy"
                  />
                  
                  {/* Discount badge */}
                  <div className="absolute top-3 right-3 bg-[#E6C78B] text-black text-xs px-2 py-1 rounded-full font-medium">
                    {offer.discount}
                  </div>
                </div>
                
                {/* Offer details */}
                <div className="p-4">
                  <h3 className="text-lg font-playfair text-white mb-2">{offer.title}</h3>
                  
                  <p className="text-sm text-white/80 mb-3">
                    {offer.description}
                  </p>
                  
                  {/* Expandable content */}
                  {isExpanded && (
                    <div className="mt-3 animate-fadeIn">
                      <div className="bg-black/30 p-3 rounded mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs text-white/60">Promo Code:</span>
                          <span className="text-sm font-medium text-[#E6C78B]">{offer.code}</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-white/60">Valid Until:</span>
                          <span className="text-sm text-white">{offer.validUntil}</span>
                        </div>
                      </div>
                      
                      <MobilePrimaryButton className="w-full">
                        Make a Reservation
                      </MobilePrimaryButton>
                    </div>
                  )}
                  
                  {/* Toggle button */}
                  <button
                    onClick={() => toggleExpand(offer.id)}
                    className="text-xs text-[#E6C78B] mt-2 underline touch-manipulation"
                  >
                    {isExpanded ? 'Show Less' : 'Show More'}
                  </button>
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
    </section>
  );
});

export default MobileCurrentOffersSection;
