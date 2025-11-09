"use client";

import { useEffect } from "react";
import Navigation from "@/components/home/Navigation";
import Footer from "@/components/home/Footer";
import NewResponsiveHero from "@/components/home/NewResponsiveHero";
import BrandPhilosophy from "@/components/home/BrandPhilosophy";
import SpicesSection from "@/components/home/SpicesSection";
import GallerySection from "@/components/home/GallerySection";
import WhatsHappeningSection from "@/components/home/WhatsHappeningSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import LocationSection from "@/components/home/LocationSection";
import RestaurantStructuredData from "@/components/seo/RestaurantStructuredData";
import { applyScrollPerformanceOptimizations } from "@/utils/optimizedScrollUtils";
import FestiveMenuCTA from "@/components/CTA/FestiveMenuCTA";

export default function HomePage() {
  useEffect(() => {
    // Apply scroll performance optimizations
    applyScrollPerformanceOptimizations();

    // Add loaded class to images when they finish loading for better performance
    const images = document.querySelectorAll("img");
    images.forEach((img) => {
      if (img.complete) {
        img.classList.add("loaded");
      } else {
        img.onload = () => {
          img.classList.add("loaded");
        };
      }
    });
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Add structured data for SEO */}
      <RestaurantStructuredData />

      <Navigation />

      {/* Hero and Brand Philosophy Sections - Wrapped to eliminate gap on mobile */}
      <div
        className="flex flex-col section-wrapper"
        style={{ marginBottom: "-2px" }}
      >
        {/* New responsive hero component with mobile video support */}
        <NewResponsiveHero />

        {/* <FestiveMenuCTA /> */}
        
        <BrandPhilosophy />
      </div>

      {/* Spices Section */}
      <SpicesSection />

      {/* Gallery Section */}
      <GallerySection />

      {/* What's Happening Section */}
      <WhatsHappeningSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Visit Us Section */}
      <LocationSection />

      <Footer />
    </main>
  );
}
