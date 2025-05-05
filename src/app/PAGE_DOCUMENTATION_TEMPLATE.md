# Page Documentation Template

This file provides a template for documenting page components in the Akasa website project. Use this template when creating new pages or updating existing ones.

## File Header Template

```typescript
/**
 * Page Name
 *
 * This file contains the page component for [specific page].
 * This page is responsible for [specific purpose].
 */
```

## Page Component Documentation Template

```typescript
/**
 * Page Component
 *
 * Detailed description of the page's purpose and functionality.
 * Include information about:
 * - The page's role in the application
 * - Key sections or features of the page
 * - Any important design considerations
 * - Any performance considerations
 * - Mobile-specific behavior
 *
 * @returns {JSX.Element} The rendered page
 */
export default function PageName(): JSX.Element {
  // Page implementation
}
```

## Client Component Documentation Template

For client components that use "use client" directive:

```typescript
"use client";

/**
 * Client Page Component
 *
 * Detailed description of the page's purpose and functionality.
 * Include information about:
 * - Why this needs to be a client component
 * - Client-side interactions or state management
 * - Any performance considerations
 * - Mobile-specific behavior
 *
 * @returns {JSX.Element} The rendered page
 */
export default function ClientPageName(): JSX.Element {
  // Client component implementation
}
```

## Data Fetching Documentation Template

For pages that fetch data:

```typescript
/**
 * Page with Data Fetching
 *
 * Detailed description of the page's purpose and functionality.
 * Include information about:
 * - What data is being fetched
 * - How the data is used on the page
 * - Any caching or revalidation strategies
 *
 * @returns {Promise<JSX.Element>} The rendered page
 */
export default async function PageWithData(): Promise<JSX.Element> {
  // Data fetching implementation
}
```

## Example Page with Documentation

```typescript
/**
 * Menu Page
 *
 * This file contains the page component for the main menu page.
 * This page displays the different menu categories and featured dishes.
 */

"use client";

import { useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useDeviceDetection } from "@/hooks/useDeviceDetection";
import PageLayout from "@/components/layout/PageLayout";
import HeroSection from "@/components/menu/HeroSection";
import ChefSection from "@/components/menu/ChefSection";
import Loading from "@/components/ui/Loading";

// Dynamically import below-the-fold components for better performance
const MenusSection = dynamic(() => import("@/components/menu/MenusSection"), {
  loading: () => <div className="h-[50vh] bg-black"></div>
});
const FlavorExperienceSection = dynamic(() => import("@/components/menu/FlavorExperienceSection"), {
  loading: () => <div className="h-[50vh] bg-black"></div>
});
const FeaturedDishesSection = dynamic(() => import("@/components/menu/FeaturedDishesSection"), {
  loading: () => <div className="h-[50vh] bg-black"></div>
});

/**
 * Menu Page Component
 *
 * The Menu page serves as the main entry point for exploring Akasa's various menus.
 * It showcases the chef, different menu categories, flavor experiences, and featured dishes.
 * 
 * Key sections:
 * - Hero section with background image and title
 * - Chef section highlighting the culinary team
 * - Menu categories section with links to specific menu pages
 * - Flavor experience section describing the culinary philosophy
 * - Featured dishes section showcasing signature items
 *
 * Design considerations:
 * - Uses dynamic imports for below-the-fold content to improve initial load time
 * - Implements mobile-specific components for better mobile experience
 * - Follows the restaurant's brand guidelines for typography and colors
 *
 * @returns {JSX.Element} The rendered Menu page
 */
export default function MenuPage(): JSX.Element {
  const { isMobile, isDetectionComplete } = useDeviceDetection();

  // Preload critical resources when the page loads
  useEffect(() => {
    // Preload images for better user experience
    const preloadImages = () => {
      const imageUrls = [
        '/images/menu/featured-dishes/akasa-e-lobster.jpg',
        '/images/menu/featured-dishes/tandoori-prawns.jpg',
        '/images/menu/featured-dishes/dal-e-akasa.jpg'
      ];
      
      imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
      });
    };
    
    // Use requestIdleCallback for better performance
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(preloadImages, { timeout: 2000 });
    } else {
      setTimeout(preloadImages, 1000);
    }
  }, []);

  // Show loading state if device detection is not complete
  if (!isDetectionComplete) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loading text="Loading menu page..." />
      </div>
    );
  }

  return (
    <PageLayout>
      {/* Hero Section */}
      <HeroSection />
      
      {/* Chef Section */}
      <ChefSection />
      
      {/* Menu Categories Section - Dynamically imported */}
      <Suspense fallback={<div className="h-[50vh] bg-black"></div>}>
        <MenusSection />
      </Suspense>
      
      {/* Flavor Experience Section - Dynamically imported */}
      <Suspense fallback={<div className="h-[50vh] bg-black"></div>}>
        <FlavorExperienceSection />
      </Suspense>
      
      {/* Featured Dishes Section - Dynamically imported */}
      <Suspense fallback={<div className="h-[50vh] bg-black"></div>}>
        <FeaturedDishesSection />
      </Suspense>
    </PageLayout>
  );
}
```

## Layout Decision Documentation

When making layout decisions, document them with comments:

```typescript
// Using a full-width hero section for visual impact
<section className="w-full h-screen relative">
  {/* Hero content */}
</section>

// Using a grid layout for the menu categories
// This creates a responsive grid that adjusts based on screen size
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Menu category cards */}
</div>

// Using dynamic imports for below-the-fold content
// This improves initial page load performance
const BelowTheFoldComponent = dynamic(() => import("@/components/BelowTheFoldComponent"), {
  loading: () => <Loading />
});
```

## Mobile-Specific Documentation

When implementing mobile-specific code, document the reasoning:

```typescript
// Render different components based on device type
// This provides an optimized experience for each device type
{isMobile ? (
  <MobileHeroSection />
) : (
  <DesktopHeroSection />
)}

// Adjust layout for mobile devices
// On mobile, we stack these elements vertically instead of side-by-side
<div className="flex flex-col md:flex-row">
  {/* Content */}
</div>

// Use smaller images on mobile for better performance
const imageSrc = isMobile
  ? '/images/mobile/hero.jpg'
  : '/images/desktop/hero.jpg';
```

## Performance Considerations Documentation

When implementing performance optimizations, document them:

```typescript
// Use dynamic imports for below-the-fold content
// This reduces the initial bundle size and improves page load time
const BelowTheFoldComponent = dynamic(() => import("@/components/BelowTheFoldComponent"), {
  loading: () => <Loading />
});

// Preload critical resources
// This improves the perceived performance by loading resources before they're needed
useEffect(() => {
  const preloadResources = () => {
    // Preload code implementation
  };
  
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(preloadResources, { timeout: 2000 });
  } else {
    setTimeout(preloadResources, 1000);
  }
}, []);

// Use the Image component for optimized images
// This provides automatic image optimization, responsive sizing, and lazy loading
<Image
  src={imageSrc}
  alt={imageAlt}
  width={width}
  height={height}
  priority={isPriority}
  loading={isPriority ? undefined : "lazy"}
/>
```

## Conclusion

Following these documentation standards ensures that all pages are well-documented and easy to understand for new developers joining the project. Consistent documentation also makes maintenance easier and helps prevent bugs caused by misunderstanding page behavior.
