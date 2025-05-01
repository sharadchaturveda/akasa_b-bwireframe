"use client";

// Import critical components directly
import Navigation from "@/components/home/Navigation";
import ScrollBehavior from "@/components/home/ScrollBehavior";
import HeroSection from "@/components/home/HeroSection";
import HomePerformanceOptimizer from "@/components/home/HomePerformanceOptimizer";

// Import non-critical components with dynamic imports and optimized loading
import dynamic from 'next/dynamic';
import { useEffect, Suspense } from 'react';
import { loadPageStyles, preloadPageStyles } from '@/utils/loadPageStyles';

// Dynamically import components that are below the fold with optimized loading
const BrandPhilosophy = dynamic(() => import("@/components/home/BrandPhilosophy"), {
  loading: () => <div className="min-h-[45vh] w-full bg-black"></div>,
  ssr: false
});

const AccoladesSection = dynamic(() => import("@/components/home/AccoladesSection"), {
  loading: () => <div className="min-h-[30vh] w-full bg-black"></div>,
  ssr: false
});

const GallerySection = dynamic(() => import("@/components/home/GallerySection"), {
  loading: () => <div className="min-h-[40vh] w-full bg-black"></div>,
  ssr: false
});

const WhatsHappeningSection = dynamic(() => import("@/components/home/WhatsHappeningSection"), {
  loading: () => <div className="min-h-[50vh] w-full bg-black"></div>,
  ssr: false
});

const TestimonialsSection = dynamic(() => import("@/components/home/TestimonialsSection"), {
  loading: () => <div className="min-h-[40vh] w-full bg-black"></div>,
  ssr: false
});

const VisitUsSection = dynamic(() => import("@/components/home/VisitUsSection"), {
  loading: () => <div className="min-h-[30vh] w-full bg-black"></div>,
  ssr: false
});

const Footer = dynamic(() => import("@/components/home/Footer"), {
  loading: () => <div className="min-h-[20vh] w-full bg-black"></div>,
  ssr: false
});

// Optimized homepage component with code splitting and CSS optimization
export default function HomePage() {
  // Load page-specific CSS
  useEffect(() => {
    // Load home page styles
    loadPageStyles('home');

    // Preload styles for pages that might be visited next
    preloadPageStyles(['menu', 'events', 'offers', 'reservations']);

    // Mark the start of page load for performance measurement
    if (typeof window !== 'undefined' && window.performance && window.performance.mark) {
      window.performance.mark('homepage_start');

      // Measure when the page is fully loaded
      window.addEventListener('load', () => {
        window.performance.mark('homepage_loaded');
        window.performance.measure('homepage_load_time', 'homepage_start', 'homepage_loaded');

        const measure = window.performance.getEntriesByName('homepage_load_time')[0];
        console.log('Homepage load time:', measure.duration, 'ms');
      });
    }

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
      {/* Performance optimizations */}
      <ScrollBehavior />
      <HomePerformanceOptimizer />

      {/* Navigation */}
      <Navigation />

      {/* Critical above-the-fold content */}
      <HeroSection />

      {/* Non-critical below-the-fold content with Suspense boundaries */}
      <Suspense fallback={<div className="min-h-[45vh] w-full bg-black"></div>}>
        <BrandPhilosophy />
      </Suspense>

      <Suspense fallback={<div className="min-h-[30vh] w-full bg-black"></div>}>
        <AccoladesSection />
      </Suspense>

      <Suspense fallback={<div className="min-h-[40vh] w-full bg-black"></div>}>
        <GallerySection />
      </Suspense>

      <Suspense fallback={<div className="min-h-[50vh] w-full bg-black"></div>}>
        <WhatsHappeningSection />
      </Suspense>

      <Suspense fallback={<div className="min-h-[40vh] w-full bg-black"></div>}>
        <TestimonialsSection />
      </Suspense>

      <Suspense fallback={<div className="min-h-[30vh] w-full bg-black"></div>}>
        <VisitUsSection />
      </Suspense>

      <Suspense fallback={<div className="min-h-[20vh] w-full bg-black"></div>}>
        <Footer />
      </Suspense>
    </main>
  );
}
