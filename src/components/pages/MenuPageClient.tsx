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


// Import the PageLayout component
import PageLayout from "@/components/layout/PageLayout";

export default function MenuPageClient() {
  // Optimize performance metrics
  useEffect(() => {
    // Monitor LCP
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      // Create a performance observer for LCP
      const lcpObserver = new PerformanceObserver(() => {
        // Performance measurement: LCP time recorded
      });

      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

      // Create a performance observer for long tasks
      const longTaskObserver = new PerformanceObserver(() => {
        // Performance measurement: Long task duration recorded
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
        '/images/menu/a-la-carte/hero/hero.jpg',
        '/images/menu/drinks/hero/hero.jpg',
        '/images/menu/bar-bites/hero/hero.jpg',
        '/images/menu/chef/portrait.jpg'
      ];

      imagesToPreload.forEach(src => {
        if (typeof window !== 'undefined') {
          const img = new window.Image();
          img.src = src + '?quality=60&width=800';
        }
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
      {/* Menu pages section now as critical above-the-fold content */}
      <Suspense fallback={<div className="h-[50vh] bg-black"></div>}>
        <MenusSection />
      </Suspense>

      {/* Chef section moved below */}
      <ChefSection />

      <Suspense fallback={<div className="h-[50vh] bg-black"></div>}>
        <FeaturedDishesSection />
      </Suspense>

      <Suspense fallback={<div className="h-[50vh] bg-black"></div>}>
        <FlavorExperienceSection />
      </Suspense>
    </PageLayout>
  );
}
