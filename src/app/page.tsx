"use client";

import { useEffect } from 'react';
import Navigation from "@/components/home/Navigation";
import Footer from "@/components/home/Footer";
import CleanHeroSection from "@/components/home/CleanHeroSection";
import BrandPhilosophy from "@/components/home/BrandPhilosophy";
import AccoladesSection from "@/components/home/AccoladesSection";
import GallerySection from "@/components/home/GallerySection";
import WhatsHappeningSection from "@/components/home/WhatsHappeningSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import VisitUsSection from "@/components/home/VisitUsSection";

export default function HomePage() {
  useEffect(() => {
    // Add loaded class to images when they finish loading for better performance
    const images = document.querySelectorAll('img');
    images.forEach((img) => {
      if (img.complete) {
        img.classList.add('loaded');
      } else {
        img.onload = () => {
          img.classList.add('loaded');
        };
      }
    });
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Hero Section */}
      <CleanHeroSection />

      {/* Brand Philosophy Section */}
      <BrandPhilosophy />

      {/* Accolades Section */}
      <AccoladesSection />

      {/* Gallery Section */}
      <GallerySection />

      {/* What's Happening Section */}
      <WhatsHappeningSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Visit Us Section */}
      <VisitUsSection />

      <Footer />
    </main>
  );
}
