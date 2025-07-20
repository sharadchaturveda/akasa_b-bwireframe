"use client";

import { memo } from "react";

const LoyaltyTermsConditions = memo(function LoyaltyTermsConditions() {
  const termsAndConditions = [
    {
      number: "1",
      tier: "Sky Tier (1-5 visits)",
      description: "Enjoy 5% off on your 2nd to 5th visits.",
    },
    {
      number: "2",
      tier: "Horizon Tier (6+ visits)",
      description: "Enjoy 5% off lunch & 10% off dinner and weekends",
    },
    {
      number: "3",
      tier: "Drinks Benefit",
      description:
        "Members enjoy beer on tap Asahi and Peroni and house wines for $10 from opening to 2000hrs.",
    },
    {
      number: "4",
      tier: "Early Access",
      description: "Early access to special menus or seasonal offers.",
    },
    {
      number: "5",
      tier: "Exclusive Events",
      description: "Invitations to tasting events or loyalty-only promotions.",
    },
    {
      number: "6",
      tier: "Promotion Exclusions",
      description:
        "Discounts not applicable on special promotions and rate e.g. happy hours, set meals, event menu.",
    },
    {
      number: "7",
      tier: "Single Use",
      description:
        "It cannot be used in conjunction with any other promotion or discount.",
    },
    {
      number: "8",
      tier: "Maximum Discount",
      description: "Maximum discount $50 per visit.",
    },
    {
      number: "9",
      tier: "Contact Information",
      description:
        "Each member must provide a valid email address and mobile number.",
    },
    {
      number: "10",
      tier: "Program Modifications",
      description:
        "The Company reserves the right to modify, suspend, or cancel the Program at any time without prior notice.",
    },
    {
      number: "11",
      tier: "Acceptance of Changes",
      description:
        "Continued participation in the Program following any changes constitutes acceptance of the new terms.",
    },
    {
      number: "12",
      tier: "Privacy Policy",
      description:
        "Member data will be collected and used in accordance with our Privacy Policy.",
    },
    {
      number: "13",
      tier: "Communications",
      description:
        "By joining, members consent to receive communications related to the Program, including promotional offers.",
    },
    {
      number: "14",
      tier: "Termination",
      description:
        "The Company reserves the right to terminate any membership for misuse, fraud, or violation of these Terms & Conditions.",
    },
    {
      number: "15",
      tier: "Forfeiture",
      description:
        "If a membership is terminated, all points and benefits will be forfeited.",
    },
  ];

  return (
    <section className="w-full py-20 relative">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair mb-6 relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E6C78B] to-[#D4B679]">
                Terms & Conditions
              </span>
              <div className="absolute -bottom-3 left-0 w-full h-0.5 bg-gradient-to-r from-[#E6C78B] to-transparent"></div>
            </h2>
            <p className="text-lg font-montserrat text-white/80 max-w-3xl mx-auto">
              Please read these terms and conditions carefully before joining
              our loyalty program. By participating, you agree to be bound by
              these terms.
            </p>
          </div>

          <div className="space-y-6">
            {termsAndConditions.map((term, index) => (
              <div key={index} className="group relative block animate-fadeIn">
                {/* Card background with subtle glow effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#E6C78B]/0 via-[#E6C78B]/30 to-[#E6C78B]/0 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

                <div className="relative bg-black/80 backdrop-blur-sm border border-white/5 rounded-lg overflow-hidden transition-all duration-500 group-hover:shadow-[0_0_25px_rgba(230,199,139,0.2)]">
                  <div className="p-6 relative">
                    {/* Decorative corner accent */}
                    <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-[#E6C78B]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="flex items-start space-x-6">
                      {/* Number badge with premium styling */}
                      <div className="relative flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#E6C78B] to-[#D4B679] flex items-center justify-center shadow-lg group-hover:shadow-[0_0_20px_rgba(230,199,139,0.4)] transition-all duration-300 group-hover:scale-110">
                          <span className="text-black text-lg font-bold font-montserrat">
                            {term.number}
                          </span>
                        </div>
                        {/* Subtle glow behind badge */}
                        <div className="absolute inset-0 w-12 h-12 rounded-full bg-[#E6C78B]/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl md:text-2xl font-playfair text-white mb-3 group-hover:text-[#E6C78B] transition-colors duration-300 leading-tight">
                          {term.tier}
                        </h3>
                        <p className="text-white/70 font-montserrat leading-relaxed text-base group-hover:text-white/80 transition-colors duration-300">
                          {term.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Important Notice */}
          <div className="mt-16 group relative block animate-fadeIn">
            {/* Card background with subtle glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#E6C78B]/0 via-[#E6C78B]/40 to-[#E6C78B]/0 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

            <div className="relative bg-gradient-to-r from-[#1A2A3A]/90 to-[#1A2A3A]/90 backdrop-blur-sm border border-[#E6C78B]/20 rounded-lg overflow-hidden transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(230,199,139,0.3)]">
              <div className="p-8 relative">
                {/* Decorative corner accent */}
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-[#E6C78B]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="flex items-start space-x-6">
                  <div className="relative flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#E6C78B] to-[#D4B679] flex items-center justify-center shadow-lg group-hover:shadow-[0_0_25px_rgba(230,199,139,0.5)] transition-all duration-300 group-hover:scale-110">
                      <svg
                        className="w-8 h-8 text-black"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M11,7H13A2,2 0 0,1 15,9V15A2,2 0 0,1 13,17H11A2,2 0 0,1 9,15V9A2,2 0 0,1 11,7M11,9V15H13V9H11Z" />
                      </svg>
                    </div>
                    {/* Subtle glow behind icon */}
                    <div className="absolute inset-0 w-16 h-16 rounded-full bg-[#E6C78B]/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-playfair text-[#E6C78B] mb-4 group-hover:text-[#D4B679] transition-colors duration-300">
                      Important Notice
                    </h3>
                    <p className="text-white/90 font-montserrat leading-relaxed text-lg group-hover:text-white transition-colors duration-300">
                      Please update your respective apps via Play/App Store to see
                      the fresh updates. For any questions about the loyalty
                      program, please contact our team or visit us at the
                      restaurant.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default LoyaltyTermsConditions;
