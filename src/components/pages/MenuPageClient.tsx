"use client";

import { useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import ChefSection from "@/components/menu/ChefSection";


// Add TypeScript declaration for requestIdleCallback
interface RequestIdleCallbackOptions {
  timeout: number;
}

interface Window {
  requestIdleCallback(
    callback: (deadline: RequestIdleCallbackDeadline) => void,
    opts?: RequestIdleCallbackOptions
  ): number;
}

interface RequestIdleCallbackDeadline {
  didTimeout: boolean;
  timeRemaining: () => number;
}

// Dynamically import below-the-fold components
const MenusSection = dynamic(() => import("@/components/menu/MenusSection"), {
  loading: () => <div className="h-[50vh] bg-black"></div>
});
const FlavorExperienceSection = dynamic(() => import("@/components/menu/FlavorExperienceSection"), {
  loading: () => <div className="h-[50vh] bg-black"></div>
});
const FeaturedDishesSection = dynamic(() => import("@/components/menu/FeaturedDishesSection"), {
  loading: () => <div className="h-[50vh] bg-black"></div>
});
const Footer = dynamic(() => import("@/components/home/Footer"), {
  loading: () => <div className="h-[100px] bg-black"></div>
});

// Import the PageLayout component
import PageLayout from "@/components/layout/PageLayout";

export default function MenuPageClient() {
  // Optimize performance metrics
  useEffect(() => {
    // Monitor LCP
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      // Create a performance observer for LCP
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lcpEntry = entries[entries.length - 1];
        console.log('LCP:', lcpEntry.startTime);
      });

      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

      // Create a performance observer for long tasks
      const longTaskObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach(entry => {
          // Log long tasks (over 50ms)
          if (entry.duration > 50) {
            console.log('Long task:', entry.duration, 'ms');
          }
        });
      });

      longTaskObserver.observe({ type: 'longtask', buffered: true });

      return () => {
        lcpObserver.disconnect();
        longTaskObserver.disconnect();
      };
    }

    // Preload images that will be needed soon
    const preloadImages = () => {
      const imagesToPreload = [
        '/images/menu/hero/gallery-1.jpg',
        '/images/menu/hero/gallery-2.jpg'
      ];

      imagesToPreload.forEach(src => {
        const img = new Image();
        img.src = src + '?quality=60&width=800';
      });
    };

    // Use requestIdleCallback to preload images during idle time
    interface WindowWithIdleCallback extends Window {
      requestIdleCallback: (
        callback: IdleRequestCallback,
        options?: { timeout: number }
      ) => number;
    }

    if ('requestIdleCallback' in window) {
      const windowWithIdle = window as WindowWithIdleCallback;
      windowWithIdle.requestIdleCallback(preloadImages, { timeout: 2000 });
    } else {
      setTimeout(preloadImages, 1000);
    }
  }, []);

  // Render the desktop version with the PageLayout component
  return (
    <PageLayout className="menu-page">
      {/* Critical above-the-fold content */}
      <ChefSection />

      {/* Below-the-fold content with Suspense */}
      <Suspense fallback={<div className="h-[50vh] bg-black"></div>}>
        <MenusSection />
      </Suspense>

      <Suspense fallback={<div className="h-[50vh] bg-black"></div>}>
        <FlavorExperienceSection />
      </Suspense>

      <Suspense fallback={<div className="h-[50vh] bg-black"></div>}>
        <FeaturedDishesSection />
      </Suspense>
    </PageLayout>
  );
}

