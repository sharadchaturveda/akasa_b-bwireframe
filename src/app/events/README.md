# Events Page (`src/app/events/page.tsx`)

This document provides a comprehensive overview of the Events Page, detailing its features, data handling, layout, and the structure of its components.

## Overview

The Events Page is a client-side rendered page dedicated to showcasing various event types offered by Akasa Restaurant. It allows users to browse different event categories, view detailed listings, and submit inquiries. The page incorporates performance optimizations through dynamic component imports and image preloading to ensure a smooth user experience.

## Features

-   **Event Category Filtering**: Users can filter events by predefined categories (e.g., Birthday, Anniversary, Office Lunch, Office Parties, Networking, All Events).
-   **Detailed Event Listings**: Each event type is presented with a title, description, image, key features, and pricing information.
-   **Dynamic Component Loading**: Below-the-fold components like `TestimonialsSection` and `InquiryFormSection` are dynamically imported to improve initial page load performance.
-   **Image Preloading**: Critical event images are preloaded using `requestIdleCallback` (or `setTimeout` as a fallback) to enhance perceived performance.
-   **Responsive Design**: Adapts its layout and component visibility for both desktop and mobile devices.

## Data Handling

The Events Page currently manages its event categories and event data directly within the component as static JavaScript constants.

-   **`eventCategories` Array**: Defines the available categories for filtering, each with an `id` and `name`.
-   **`events` Array**: Contains comprehensive information for each event type, including `id`, `title`, `description`, `image` path, `category`, `features`, and `price`.
-   **`activeCategory` State**: A `useState` hook manages the currently selected category, which drives the filtering logic.
-   **`filteredEvents`**: A derived array that contains only the events matching the `activeCategory` or all events if "all" is selected.

## Layout and Structure

The Events Page follows a vertical flow, presenting a hero section, followed by category filters (desktop only), event listings, testimonials, and an inquiry form.

```tsx
// src/app/events/page.tsx
"use client";

import { useState, useEffect } from "react";
import Navigation from "@/components/home/Navigation";
import Footer from "@/components/home/Footer";
import HeroSection from "@/components/events/HeroSection";
import CategoriesSection from "@/components/events/CategoriesSection";
import EventListingsSection from "@/components/events/EventListingsSection";
import dynamic from 'next/dynamic';

// Dynamically imported components for performance
const TestimonialsSection = dynamic(() => import("@/components/events/TestimonialsSection"), { ssr: false });
const InquiryFormSection = dynamic(() => import("@/components/events/InquiryFormSection"), { ssr: false });

export default function EventsPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    // Preload critical event images
    // ... (image preloading logic) ...
  }, []);

  const eventCategories = [ /* ... */ ];
  const events = [ /* ... */ ];
  const filteredEvents = activeCategory === "all" ? events : events.filter(event => event.category === activeCategory);

  return (
    <main className="min-h-screen bg-black text-white">
      <Navigation />
      <HeroSection />

      {/* Desktop-only Categories Section */}
      <div className="hidden md:block">
        <CategoriesSection
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          eventCategories={eventCategories}
        />
      </div>

      <EventListingsSection
        filteredEvents={filteredEvents}
        eventCategories={eventCategories}
      />

      {/* Dynamically loaded sections */}
      <TestimonialsSection />
      <InquiryFormSection />

      <Footer />
    </main>
  );
}
```

## Component Breakdown

The Events Page is composed of the following key components:

### 1. `Navigation` (`@/components/home/Navigation`)
-   **Purpose**: Provides the main navigation links for the website.
-   **Integration**: Global component, placed at the top of the page.

### 2. `HeroSection` (`@/components/events/HeroSection`)
-   **Purpose**: The primary visual introduction to the Events section.
-   **Features**: Likely includes a background image/video, a prominent title, and a brief overview of events.
-   **Integration**: The first major content section after navigation.

### 3. `CategoriesSection` (`@/components/events/CategoriesSection`)
-   **Purpose**: Allows users to filter event listings by category.
-   **Props**: `activeCategory` (current filter), `setActiveCategory` (function to update filter), `eventCategories` (array of available categories).
-   **Features**: Displays clickable category buttons or tabs.
-   **Integration**: Conditionally rendered (`hidden md:block`), meaning it's visible only on desktop screens.

### 4. `EventListingsSection` (`@/components/events/EventListingsSection`)
-   **Purpose**: Displays the list of events, filtered by the active category.
-   **Props**: `filteredEvents` (array of events to display), `eventCategories` (for context or display within listings).
-   **Features**: Renders individual event cards or detailed event descriptions, potentially with an alternating layout.
-   **Integration**: The main content area for event details.

### 5. `TestimonialsSection` (`@/components/events/TestimonialsSection`)
-   **Purpose**: Showcases customer reviews and feedback related to events.
-   **Features**: Displays testimonials, building trust and credibility.
-   **Integration**: Dynamically imported, typically appearing below the fold.

### 6. `InquiryFormSection` (`@/components/events/InquiryFormSection`)
-   **Purpose**: Provides a form for users to submit inquiries about events.
-   **Features**: Collects user details and event preferences.
-   **Integration**: Dynamically imported, appearing towards the end of the page to facilitate user interaction.

### 7. `Footer` (`@/components/home/Footer`)
-   **Purpose**: The global footer of the website.
-   **Integration**: Global component, placed at the bottom of the page.

## Performance Considerations

-   **Client-Side Rendering (`"use client"`)**: The page is a client component, meaning much of its rendering and interactivity happens on the client-side after initial load.
-   **Dynamic Imports (`next/dynamic`)**: `TestimonialsSection` and `InquiryFormSection` are loaded lazily, reducing the initial JavaScript bundle size and improving Time to Interactive (TTI). `ssr: false` ensures these components are not rendered on the server.
-   **Image Preloading**: The `useEffect` hook proactively loads critical event images in the background, making them available faster when the user scrolls or interacts with the page. `requestIdleCallback` is used for non-essential background work, falling back to `setTimeout`.