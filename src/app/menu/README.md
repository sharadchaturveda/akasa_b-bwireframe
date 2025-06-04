# Menu Page (`src/app/menu/page.tsx` and `src/components/pages/MenuPageClient.tsx`)

This document provides a comprehensive overview of the Menu Page, detailing its features, performance optimizations, layout, and the structure of its components.

## Overview

The Menu Page serves as the central hub for exploring Akasa Restaurant's diverse culinary offerings. While `src/app/menu/page.tsx` acts as a simple server component wrapper, the core logic and rendering are handled by the client component `src/components/pages/MenuPageClient.tsx`. This page is heavily optimized for performance, utilizing dynamic imports and image preloading to ensure a fast and smooth browsing experience for users exploring the various menu categories.

## Features

-   **Comprehensive Menu Overview**: Provides access to various menu categories (e.g., À La Carte, Drinks, Bar Bites, Set Lunch, Tasting Menu, Vegan).
-   **Chef Section**: Features information about the restaurant's chef, adding a personal touch.
-   **Featured Dishes**: Highlights signature or popular dishes.
-   **Flavor Experience**: A dedicated section to describe the unique culinary journey offered.
-   **Performance Monitoring**: Implements `PerformanceObserver` to monitor Core Web Vitals like Largest Contentful Paint (LCP) and long tasks.
-   **Dynamic Component Loading**: Utilizes `next/dynamic` with `Suspense` to lazily load components that are typically below the fold, reducing initial bundle size.
-   **Image Preloading**: Proactively loads critical menu-related images in the background to improve perceived loading speed.

## Performance Optimizations

The `MenuPageClient` component incorporates several advanced performance strategies:

-   **Client-Side Rendering (`"use client"`)**: Enables interactive features and client-side JavaScript execution for dynamic content and optimizations.
-   **`PerformanceObserver`**:
    -   Monitors `largest-contentful-paint` (LCP) to track the rendering performance of the largest content element visible in the viewport.
    -   Monitors `longtask` to identify and track long-running JavaScript tasks that might block the main thread and impact responsiveness.
    -   These observers help in identifying and debugging performance bottlenecks.
-   **Dynamic Imports (`next/dynamic`)**:
    -   `MenusSection`, `FlavorExperienceSection`, and `FeaturedDishesSection` are dynamically imported. This means their JavaScript bundles are loaded only when they are needed, reducing the initial load time of the page.
    -   `Suspense` is used with a simple `div` fallback to provide a placeholder while the dynamic components are loading.
-   **Image Preloading (`useEffect` with `requestIdleCallback`)**:
    -   A `useEffect` hook is used to preload specific critical images (e.g., hero images for different menu subpages like A La Carte, Drinks, Bar Bites, and Chef portrait).
    -   `requestIdleCallback` is preferred for preloading, allowing the browser to perform this task during idle periods, minimizing impact on user interaction. A `setTimeout` fallback is provided for browsers that do not support `requestIdleCallback`.
    -   Images are preloaded with a `quality` and `width` parameter in the URL, suggesting server-side image optimization or a CDN that supports on-the-fly transformations.

## Layout and Structure

The Menu Page is structured within a `PageLayout` component, providing a consistent wrapper. The content sections are arranged vertically, with some components loaded dynamically.

The page structure is as follows:
1.  **`MenusSection`**: This is the first major content section, likely displaying an overview or links to different menu categories. It is dynamically loaded.
2.  **`ChefSection`**: This section provides information about the chef.
3.  **`FeaturedDishesSection`**: This section highlights specific dishes and is dynamically loaded.
4.  **`FlavorExperienceSection`**: This section describes the overall culinary experience and is dynamically loaded.

## Component Breakdown

The Menu Page (`MenuPageClient`) is composed of the following key components:

### 1. `PageLayout` (`@/components/layout/PageLayout`)
-   **Purpose**: A wrapper component that provides a consistent layout structure for pages, including global elements like navigation and footer (which are likely rendered by `PageLayout` or its parent).
-   **Integration**: Encapsulates the entire content of the `MenuPageClient`.

### 2. `ChefSection` (`@/components/menu/ChefSection`)
-   **Purpose**: Displays information about the restaurant's chef, potentially including a bio, philosophy, or portrait.
-   **Integration**: A static component rendered directly within the page.

### 3. `MenusSection` (`@/components/menu/MenusSection`)
-   **Purpose**: Presents the main menu categories or an overview of the different menu types available.
-   **Features**: May include links to subpages for each menu category (e.g., À La Carte, Drinks).
-   **Integration**: Dynamically imported and rendered as a critical above-the-fold content.

### 4. `FlavorExperienceSection` (`@/components/menu/FlavorExperienceSection`)
-   **Purpose**: Describes the unique culinary experience offered by Akasa Restaurant.
-   **Features**: Likely includes descriptive text, imagery, and highlights of the dining philosophy.
-   **Integration**: Dynamically imported, appearing towards the end of the page flow.

### 5. `FeaturedDishesSection` (`@/components/menu/FeaturedDishesSection`)
-   **Purpose**: Showcases a selection of signature or highly recommended dishes.
-   **Features**: Presents dish names, descriptions, and images.
-   **Integration**: Dynamically imported, providing visual appeal and highlighting key menu items.