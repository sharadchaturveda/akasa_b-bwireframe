"use client";

import { memo } from "react";
import Navigation from "@/components/home/Navigation";
import Footer from "@/components/home/Footer";
import MobileOptimizer from "@/components/mobile/MobileOptimizer";
import MobileMenuChefSection from "@/components/mobile/MobileMenuChefSection";
import MobileMenusSection from "@/components/mobile/MobileMenusSection";
import MobileFlavorExperienceSection from "@/components/mobile/MobileFlavorExperienceSection";
import MobileFeaturedDishesSection from "@/components/mobile/MobileFeaturedDishesSection";

/**
 * MobileMenuPageClient Component
 * 
 * A mobile-optimized version of the Menu page
 */
const MobileMenuPageClient = memo(function MobileMenuPageClient() {
  return (
    <main className="min-h-screen bg-black text-white">
      <MobileOptimizer />
      <Navigation />
      <MobileMenuChefSection />
      <MobileMenusSection />
      <MobileFlavorExperienceSection />
      <MobileFeaturedDishesSection />
      <Footer />
    </main>
  );
});

export default MobileMenuPageClient;
