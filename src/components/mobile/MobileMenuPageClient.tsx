"use client";

import { memo } from "react";
import PageLayout from "@/components/layout/PageLayout";
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
    <PageLayout withMobileOptimizer={true}>
      <MobileMenuChefSection />
      <MobileMenusSection />
      <MobileFlavorExperienceSection />
      <MobileFeaturedDishesSection />
    </PageLayout>
  );
});

export default MobileMenuPageClient;
