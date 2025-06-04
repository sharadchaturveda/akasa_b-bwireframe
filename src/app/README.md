# Home Page (`src/app/page.tsx`)

This document provides a comprehensive overview of the Home Page, detailing its features, layout, and the structure of its components and elements.

## Overview

The Home Page serves as the primary entry point for the Akasa Restaurant website. It is designed to provide a visually engaging and informative introduction to the restaurant, its culinary philosophy, and key offerings. The page prioritizes performance and responsiveness, ensuring an optimal user experience across all devices.

## Features

-   **Dynamic Hero Section**: A responsive hero area that adapts to different screen sizes, potentially featuring videos or high-quality images.
-   **Brand Philosophy**: Dedicated section highlighting the restaurant's core values and story.
-   **Visual Gallery**: A section showcasing the restaurant's ambiance, dishes, or events through a curated image gallery.
-   **"What's Happening" Section**: Displays current events, promotions, or news to keep visitors informed.
-   **Customer Testimonials**: Features reviews and feedback from satisfied customers.
-   **Location Information**: Provides essential details about the restaurant's address and contact information.
-   **SEO Optimization**: Includes structured data for improved search engine visibility.
-   **Performance Enhancements**: Implements client-side optimizations for smooth scrolling and efficient image loading.

## Layout and Structure

The Home Page follows a clear, vertical layout, guiding the user through various sections of the restaurant's offerings. The page is built using a combination of global and page-specific components, ensuring modularity and maintainability.

```tsx
// src/app/page.tsx
"use client";

import { useEffect } from 'react';
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

export default function HomePage() {
  useEffect(() => {
    // Apply scroll performance optimizations
    applyScrollPerformanceOptimizations();

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
      {/* Add structured data for SEO */}
      <RestaurantStructuredData />

      <Navigation />

      {/* Hero and Brand Philosophy Sections - Wrapped to eliminate gap on mobile */}
      <div className="flex flex-col section-wrapper" style={{ marginBottom: '-2px' }}>
        {/* New responsive hero component with mobile video support */}
        <NewResponsiveHero />

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
```

## Component Breakdown

The Home Page is composed of the following key components:

### 1. `Navigation` (`@/components/home/Navigation`)
-   **Purpose**: Provides the main navigation links for the website, allowing users to easily navigate to different sections.
-   **Features**: Typically includes a logo, menu links, and potentially a hamburger menu for mobile views.
-   **Integration**: Placed at the top of the `main` element, ensuring it's always accessible.

### 2. `RestaurantStructuredData` (`@/components/seo/RestaurantStructuredData`)
-   **Purpose**: Embeds structured data (Schema.org markup) into the page for SEO purposes. This helps search engines understand the content and context of the restaurant.
-   **Features**: Provides details like restaurant name, address, contact information, ratings, etc., in a machine-readable format.
-   **Integration**: Rendered early in the page to ensure structured data is available for crawlers.

### 3. `NewResponsiveHero` (`@/components/home/NewResponsiveHero`)
-   **Purpose**: The primary visual introduction to the restaurant. It's designed to be highly responsive and performant.
-   **Features**: Likely includes a background image or video, a prominent title, and a call to action. It handles different assets for mobile and desktop.
-   **Integration**: The first major content section after navigation, wrapped with `BrandPhilosophy` to manage spacing.

### 4. `BrandPhilosophy` (`@/components/home/BrandPhilosophy`)
-   **Purpose**: Conveys the unique story, values, and culinary philosophy of the Akasa Restaurant.
-   **Features**: Typically contains text, possibly an image, and is designed to resonate with the brand's identity.
-   **Integration**: Follows the `NewResponsiveHero` section, often visually connected.

### 5. `SpicesSection` (`@/components/home/SpicesSection`)
-   **Purpose**: A dedicated section that likely highlights the use of spices in Indian cuisine, or the unique flavor profiles of the restaurant.
-   **Features**: Could involve imagery of spices, descriptive text, or interactive elements.
-   **Integration**: A distinct content block within the main page flow.

### 6. `GallerySection` (`@/components/home/GallerySection`)
-   **Purpose**: Showcases high-quality images of the restaurant's interior, dishes, or events.
-   **Features**: Presents a visual collection, possibly with a carousel or grid layout.
-   **Integration**: Provides a visual break and highlights the aesthetic appeal of the restaurant.

### 7. `WhatsHappeningSection` (`@/components/home/WhatsHappeningSection`)
-   **Purpose**: Informs visitors about current events, special promotions, or recent news from the restaurant.
-   **Features**: May include event cards, dates, descriptions, and links to more details.
-   **Integration**: Keeps the content fresh and encourages repeat visits.

### 8. `TestimonialsSection` (`@/components/home/TestimonialsSection`)
-   **Purpose**: Builds trust and credibility by displaying positive reviews and feedback from customers.
-   **Features**: Typically includes customer quotes, names, and possibly star ratings.
-   **Integration**: Reinforces the restaurant's reputation.

### 9. `LocationSection` (`@/components/home/LocationSection`)
-   **Purpose**: Provides essential practical information for visitors, such as the restaurant's address, opening hours, and contact details.
-   **Features**: May include an embedded map, contact form, or direct links for reservations.
-   **Integration**: Placed towards the end of the page to facilitate planning a visit.

### 10. `Footer` (`@/components/home/Footer`)
-   **Purpose**: The global footer of the website, containing copyright information, quick links, and social media icons.
-   **Features**: Consistent across all pages, providing essential navigation and branding elements.
-   **Integration**: The final element on the page, ensuring a complete user experience.

## Client-Side Optimizations (`useEffect` Hook)

The `HomePage` component includes a `useEffect` hook that runs client-side after the component mounts. This hook is responsible for two key performance optimizations:

1.  **Scroll Performance Optimizations**:
    -   `applyScrollPerformanceOptimizations()`: This utility function (imported from `@/utils/optimizedScrollUtils`) is called to apply various techniques that enhance scrolling smoothness and responsiveness. This might involve debouncing scroll events, using passive event listeners, or optimizing scroll-triggered animations.

2.  **Image Loading Class**:
    -   The code iterates through all `<img>` elements on the page.
    -   For images that have already completed loading (`img.complete`), the `loaded` class is immediately added.
    -   For images still loading, an `onload` event listener is attached to add the `loaded` class once the image finishes.
    -   **Purpose**: This mechanism is often used in conjunction with CSS to apply visual effects (e.g., fade-in animations, removing loading placeholders) once an image is fully loaded, preventing content shifts and improving perceived performance.
