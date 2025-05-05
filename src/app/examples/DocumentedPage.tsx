/**
 * Documented Page Example
 *
 * This file contains a fully documented page component that serves as an example
 * for how pages should be documented in the Akasa website project.
 * This page demonstrates proper JSDoc comments, TypeScript types, and code organization.
 */

"use client";

import { useEffect, useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useDeviceDetection } from '@/hooks/useDeviceDetection';
import PageLayout from '@/components/layout/PageLayout';
import Loading from '@/components/ui/Loading';
import { FEATURED_DISHES } from '@/data/examples/documentedFeaturedDishes';

// Dynamically import below-the-fold components for better performance
// This reduces the initial bundle size and improves page load time
const FeaturedDishesSection = dynamic(
  () => import('@/components/examples/FeaturedDishesSection'),
  {
    loading: () => <div className="h-[50vh] bg-black flex items-center justify-center">
      <Loading text="Loading featured dishes..." />
    </div>
  }
);

/**
 * DocumentedPage Component
 *
 * This example page demonstrates how to properly document a page component
 * in the Akasa website project. It includes a hero section and a dynamically
 * imported featured dishes section.
 * 
 * Key sections:
 * - Hero section with background image and title
 * - Featured dishes section showcasing signature dishes
 * 
 * Design considerations:
 * - Uses asymmetric layout for the hero section (40/60 split)
 * - Follows Akasa's design language with proper typography and colors
 * - Implements mobile-specific components for better mobile experience
 * 
 * Performance considerations:
 * - Uses dynamic imports for below-the-fold content to improve initial load time
 * - Preloads critical images for better user experience
 * - Implements proper image optimization with next/image
 *
 * @returns {JSX.Element} The rendered page
 */
export default function DocumentedPage(): JSX.Element {
  // Use the device detection hook to determine if we're on mobile
  const { isMobile, isDetectionComplete } = useDeviceDetection();
  
  // State for tracking if critical resources are loaded
  const [criticalResourcesLoaded, setCriticalResourcesLoaded] = useState(false);
  
  // Preload critical resources when the page loads
  useEffect(() => {
    // Function to preload critical images
    const preloadCriticalImages = () => {
      // Get the first two featured dish images for preloading
      const criticalImages = FEATURED_DISHES.slice(0, 2).map(dish => dish.imagePath);
      
      // Add the hero image
      criticalImages.push('/images/examples/hero-background.jpg');
      
      // Preload each image
      Promise.all(
        criticalImages.map(src => {
          return new Promise<void>((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = () => resolve();
            img.onerror = () => resolve(); // Resolve even on error to avoid blocking
          });
        })
      ).then(() => {
        setCriticalResourcesLoaded(true);
      });
    };
    
    // Use requestIdleCallback for better performance
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(preloadCriticalImages, { timeout: 2000 });
    } else {
      // Fallback for browsers that don't support requestIdleCallback
      setTimeout(preloadCriticalImages, 1000);
    }
  }, []);
  
  // Show loading state if device detection is not complete
  if (!isDetectionComplete) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loading text="Loading page..." />
      </div>
    );
  }
  
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative w-full min-h-screen bg-black">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/examples/hero-background.jpg"
            alt="Akasa restaurant interior"
            fill
            priority={true}
            fetchPriority="high"
            sizes="100vw"
            quality={80}
            className="object-cover opacity-70"
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-20 container mx-auto px-4 h-screen flex items-center">
          {/* 
            Using asymmetric layout (40/60 split) for hero content
            as per Akasa's design requirements
          */}
          <div className={`grid grid-cols-1 ${isMobile ? '' : 'md:grid-cols-10'} gap-8 items-center`}>
            {/* Left Content (40%) */}
            <div className={`${isMobile ? '' : 'md:col-span-4'}`}>
              <h1 className="text-4xl md:text-6xl font-playfair text-white mb-6">
                Documented Example Page
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#E6C78B] to-transparent mb-6"></div>
              <p className="text-lg md:text-xl font-montserrat text-white/80 mb-8">
                This example page demonstrates how to properly document a page component
                in the Akasa website project.
              </p>
            </div>
            
            {/* Right Content (60%) - Only shown on desktop */}
            {!isMobile && (
              <div className="md:col-span-6 flex justify-center">
                <div className="relative w-full max-w-lg aspect-square">
                  <Image
                    src="/images/examples/hero-feature.jpg"
                    alt="Signature dish presentation"
                    fill
                    priority={true}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Featured Dishes Section - Dynamically imported */}
      <Suspense fallback={
        <div className="h-[50vh] bg-black flex items-center justify-center">
          <Loading text="Loading featured dishes..." />
        </div>
      }>
        <FeaturedDishesSection 
          title="Our Signature Dishes"
          subtitle="Experience the finest flavors of Akasa"
          dishes={FEATURED_DISHES}
        />
      </Suspense>
    </PageLayout>
  );
}
