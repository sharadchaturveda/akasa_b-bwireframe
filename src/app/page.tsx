"use client";

import { useEffect } from 'react';
import Image from "next/image";
import Navigation from "@/components/home/Navigation";
import Footer from "@/components/home/Footer";
import ResponsiveHero from "@/components/home/ResponsiveHero";
import BrandPhilosophy from "@/components/home/BrandPhilosophy";
import SpicesSection from "@/components/home/SpicesSection";
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

      {/* Hero and Brand Philosophy Sections - Wrapped to eliminate gap on mobile */}
      <div className="flex flex-col section-wrapper" style={{ marginBottom: '-2px' }}>
        {/* Direct video element for mobile */}
        <div className="md:hidden relative w-full h-screen overflow-hidden bg-black">
          {/* Fallback image */}
          <div className="absolute inset-0">
            <Image
              src="/images/home/hero/mobile-video/placeholder.jpg"
              alt="Akasa restaurant ambiance"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>

          {/* Direct video element - optimized for performance */}
          <video
            className="absolute inset-0 w-full h-full z-10"
            muted
            playsInline
            loop
            autoPlay
            preload="auto"
            style={{
              objectFit: 'cover',
              width: '100%',
              height: '100%',
              transform: 'translateZ(0)' // Hardware acceleration
            }}
          >
            {/* WebM format first for better performance */}
            <source src="/images/home/hero/mobile-video/heromobilevid.webm" type="video/webm" />
            {/* MP4 as fallback */}
            <source src="/images/home/hero/mobile-video/heromobilevid.mp4" type="video/mp4" />
          </video>

          {/* No text overlay on mobile as per client request */}
        </div>

        {/* Desktop hero */}
        <div className="hidden md:block">
          <ResponsiveHero />
        </div>

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
      <VisitUsSection />

      <Footer />
    </main>
  );
}
