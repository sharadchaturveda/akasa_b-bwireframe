"use client";

import { memo } from "react";
import Image from "next/image";
import { MobilePrimaryButton } from "./MobilePrimaryButton";

/**
 * MobileLoyaltyProgramSection Component
 * 
 * A mobile-optimized version of the Offers page loyalty program section
 */
const MobileLoyaltyProgramSection = memo(function MobileLoyaltyProgramSection() {
  // Loyalty tiers data
  const loyaltyTiers = [
    {
      name: "Silver",
      visits: "5+ visits",
      benefits: [
        "5% discount on all bills",
        "Priority waitlist"
      ]
    },
    {
      name: "Gold",
      visits: "10+ visits",
      benefits: [
        "10% discount on all bills",
        "Priority reservations",
        "Complimentary dessert on your birthday"
      ]
    },
    {
      name: "Platinum",
      visits: "20+ visits",
      benefits: [
        "15% discount on all bills",
        "VIP reservations",
        "Complimentary chef's special on your birthday",
        "Exclusive invitations to tasting events"
      ]
    }
  ];

  return (
    <section className="w-full bg-black py-12 relative overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 opacity-10">
        <Image
          src="/images/offers/loyalty-bg.jpg"
          alt="Loyalty program background"
          fill
          sizes="100vw"
          className="object-cover"
          quality={60}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/90"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section heading */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-playfair text-white mb-2">Loyalty Program</h2>
          <div className="w-16 h-[1px] bg-gradient-to-r from-[#E6C78B]/80 to-transparent mx-auto mb-4"></div>
          <p className="text-sm text-white/80 max-w-md mx-auto">
            Join our loyalty program and enjoy exclusive benefits with every visit
          </p>
        </div>
        
        {/* Loyalty tiers - stacked for mobile */}
        <div className="flex flex-col gap-4 mb-8">
          {loyaltyTiers.map((tier, index) => (
            <div 
              key={tier.name}
              className="bg-black/40 border border-white/10 rounded-lg p-4"
            >
              {/* Tier header */}
              <div className="flex items-center mb-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                  tier.name === 'Silver' ? 'bg-gray-300' :
                  tier.name === 'Gold' ? 'bg-yellow-500' :
                  'bg-gray-400'
                }`}>
                  <span className="text-black text-xs font-bold">{index + 1}</span>
                </div>
                
                <div>
                  <h3 className="text-base font-playfair text-white">{tier.name}</h3>
                  <p className="text-xs text-white/60">{tier.visits}</p>
                </div>
              </div>
              
              {/* Benefits list */}
              <ul className="text-xs text-white/80 mb-0">
                {tier.benefits.map((benefit, i) => (
                  <li key={i} className="mb-1 flex items-start">
                    <span className="text-[#E6C78B] mr-2">•</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Join now button */}
        <div className="text-center">
          <MobilePrimaryButton className="mx-auto max-w-xs">
            Join Now
          </MobilePrimaryButton>
          
          <p className="text-xs text-white/50 mt-4">
            Membership is free. Your tier is determined by the number of visits in a 12-month period.
          </p>
        </div>
      </div>
    </section>
  );
});

export default MobileLoyaltyProgramSection;
