"use client";

import { memo } from "react";
import Navigation from "@/components/home/Navigation";
import Footer from "@/components/home/Footer";
import MobileOptimizer from "@/components/mobile/MobileOptimizer";
import MobileOffersHeroSection from "@/components/mobile/MobileOffersHeroSection";
import MobileCurrentOffersSection from "@/components/mobile/MobileCurrentOffersSection";
import MobileLoyaltyProgramSection from "@/components/mobile/MobileLoyaltyProgramSection";
import MobileNewsletterSection from "@/components/mobile/MobileNewsletterSection";

/**
 * MobileOffersPage Component
 * 
 * A mobile-optimized version of the Offers page
 */
const MobileOffersPage = memo(function MobileOffersPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <MobileOptimizer />
      <Navigation />
      <MobileOffersHeroSection />
      <MobileCurrentOffersSection />
      <MobileLoyaltyProgramSection />
      <MobileNewsletterSection />
      <Footer />
    </main>
  );
});

export default MobileOffersPage;
