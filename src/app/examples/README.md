# Documented Example Page (`src/app/examples/DocumentedPage.tsx`)

This document provides a comprehensive overview of the `DocumentedPage` component, which serves as a living example and template for how all pages within the Akasa website project should be structured and documented. It showcases best practices for component organization, data handling, layout design, and performance considerations.

## Overview

The `DocumentedPage` is a client-side rendered component designed to illustrate a well-documented page structure. Its primary purpose is to serve as a reference for developers, demonstrating the application of JSDoc comments, TypeScript types, and modular code organization. It features a hero section and a dynamically loaded section for featured dishes, embodying common patterns found throughout the project.

## Features

-   **Example Documentation**: Provides a clear template for documenting page components, including JSDoc, TypeScript, and code organization.
-   **Dynamic Component Loading**: Demonstrates the use of `next/dynamic` with `Suspense` for lazy loading components (e.g., `FeaturedDishesSection`) to improve initial page load performance.
-   **Optimized Image Handling**: Utilizes `next/image` for responsive and performant image rendering, including `priority` and `fetchPriority` attributes for critical images.
-   **Client-Side Performance Optimizations**: Implements `useEffect` for preloading critical resources (images) using `requestIdleCallback` for efficient background loading.
-   **Asymmetric Layout Design**: Showcases a hero section with an asymmetric (40/60 split) layout on desktop, adhering to specific design requirements.
-   **Responsive Design**: Adapts content and component visibility based on device type (e.g., right content of hero hidden on mobile).

## Data Handling

This example page uses static data for its featured dishes, imported from a dedicated data file.

-   **`FEATURED_DISHES`**: An array of dish objects imported from `@/data/examples/documentedFeaturedDishes`, providing content for the `FeaturedDishesSection`.

## Layout and Structure

The `DocumentedPage` is wrapped within a `PageLayout` component, providing a consistent overall structure. The page itself is divided into a prominent hero section and a subsequent section for featured dishes.

The hero section (`<section className="relative w-full min-h-screen bg-black">`) contains a background image (`next/image`) with an overlay. The content within the hero is structured using a responsive grid, which on desktop, creates an asymmetric 40/60 split. The left column contains the page title and a description, while the right column (hidden on mobile) displays a featured image.

Following the hero section, the `FeaturedDishesSection` is dynamically loaded using `Suspense`, which displays a `Loading` component as a fallback.

## Component Breakdown

The `DocumentedPage` utilizes the following key components:

### 1. `PageLayout` (`@/components/layout/PageLayout`)
-   **Purpose**: A wrapper component that provides a consistent layout structure for pages, potentially including global elements like navigation or footer (though not directly rendered within this page's JSX, it implies a higher-level layout).
-   **Integration**: Encapsulates the entire page content.

### 2. `Loading` (`@/components/ui/Loading`)
-   **Purpose**: Displays a loading indicator or message.
-   **Features**: Used as a fallback for `Suspense` during dynamic component loading and for initial device detection.
-   **Integration**: Provides visual feedback to the user during asynchronous operations.

### 3. `Image` (`next/image`)
-   **Purpose**: Next.js's optimized image component for efficient and responsive image delivery.
-   **Props**: `src`, `alt`, `fill`, `priority`, `fetchPriority`, `sizes`, `quality`, `className`.
-   **Features**: Handles image optimization (resizing, format conversion), lazy loading, and preloading.
-   **Integration**: Used for both background hero images and featured content images.

### 4. `FeaturedDishesSection` (`@/components/examples/FeaturedDishesSection`)
-   **Purpose**: Displays a collection of signature dishes.
-   **Props**: `title`, `subtitle`, `dishes` (array of dish data).
-   **Features**: Presents dish information, potentially with images and descriptions.
-   **Integration**: Dynamically imported, appearing below the hero section.

## Performance Considerations

-   **Client-Side Rendering (`"use client"`)**: The page is a client component, allowing for interactive features and client-side optimizations.
-   **Dynamic Imports (`next/dynamic`)**: Components like `FeaturedDishesSection` are loaded lazily, reducing the initial JavaScript bundle size and improving Time to Interactive (TTI). The `loading` option provides a fallback UI during the loading phase.
-   **`Suspense`**: Works in conjunction with `dynamic` imports to show a fallback UI while a component is being loaded.
-   **Image Optimization (`next/image`)**:
    -   `priority={true}` and `fetchPriority="high"` are used for critical images (e.g., hero background) to ensure they are loaded as quickly as possible.
    -   `sizes` attribute helps Next.js generate optimal image sizes for different viewports.
-   **`useEffect` for Preloading**: The `useEffect` hook with `requestIdleCallback` (or `setTimeout`) is used to preload non-critical but important images in the background, improving the user experience by making them available faster when needed.