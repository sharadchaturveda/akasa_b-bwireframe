"use client";

// Import critical components directly
import Navigation from "@/components/home/Navigation";
import ScrollBehavior from "@/components/home/ScrollBehavior";
import HeroSection from "@/components/home/HeroSection";

// Import non-critical components with dynamic imports
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { loadPageStyles, preloadPageStyles } from '@/utils/loadPageStyles';

// Dynamically import components that are below the fold
const BrandPhilosophy = dynamic(() => import("@/components/home/BrandPhilosophy"));
const AccoladesSection = dynamic(() => import("@/components/home/AccoladesSection"));
const GallerySection = dynamic(() => import("@/components/home/GallerySection"));
const WhatsHappeningSection = dynamic(() => import("@/components/home/WhatsHappeningSection"));
const TestimonialsSection = dynamic(() => import("@/components/home/TestimonialsSection"));
const VisitUsSection = dynamic(() => import("@/components/home/VisitUsSection"));
const Footer = dynamic(() => import("@/components/home/Footer"));

// Optimized homepage component with code splitting and CSS optimization
export default function HomePage() {
  // Load page-specific CSS
  useEffect(() => {
    // Load home page styles
    loadPageStyles('home');

    // Preload styles for pages that might be visited next
    preloadPageStyles(['menu', 'events', 'offers', 'reservations']);

    // Report LCP for monitoring
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lcpEntry = entries[entries.length - 1];
        console.log('LCP:', lcpEntry.startTime);

        // You could send this to your analytics
      });

      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

      return () => {
        lcpObserver.disconnect();
      };
    }
  }, []);

  return (
    <main className="w-full min-h-screen bg-black text-white">
      <ScrollBehavior />
      <Navigation />

      {/* Critical above-the-fold content */}
      <HeroSection />

      {/* Non-critical below-the-fold content */}
      <BrandPhilosophy />
      <AccoladesSection />
      <GallerySection />
      <WhatsHappeningSection />
      <TestimonialsSection />
      <VisitUsSection />
      <Footer />
    </main>
  );
}
