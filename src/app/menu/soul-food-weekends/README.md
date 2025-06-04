# Soul Food Weekends Menu Page (`src/app/menu/soul-food-weekends/page.tsx`)

This document provides a comprehensive overview of the Soul Food Weekends Menu Page, detailing its features, data handling, layout, and the structure of its components.

## Overview

The Soul Food Weekends Menu Page is a client-side rendered page dedicated to showcasing Akasa Restaurant's special weekend offering of soul-warming North Indian dishes. It presents the menu items organized by categories, includes dietary information, highlights special offers like unlimited chaat, and features a visually engaging hero section with an animated background pattern in the main content area. Its structure is consistent with other food menu subpages.

## Features

-   **Category-Based Menu Display**: Organizes and displays Soul Food Weekend dishes under distinct categories.
-   **Dietary Legend**: Provides a clear legend for vegetarian (🟢) and non-vegetarian (🔴) indicators.
-   **Special Offer Highlight**: Clearly mentions special offers, such as "Unlimited Chaat for just $32++ per person."
-   **Availability Information**: Specifies the days and times the Soul Food Weekends menu is available (e.g., "Available from 5pm Friday & all day Saturday").
-   **Hero Section**: A prominent visual introduction to the Soul Food Weekends menu with a background image and detailed descriptive text.
-   **Animated Background**: Features a subtle, animated SVG background pattern in the menu content section.
-   **Navigation to All Menus**: Includes a dedicated button to easily navigate back to the main menu overview page.
-   **Image Loading Optimization**: Implements client-side JavaScript to add a `loaded` class to images once they are fully loaded.

## Data Handling

The Soul Food Weekends Menu Page retrieves its menu data from a static JavaScript file.

-   **`soulFoodMenu`**: This object, imported from `@/data/soulFoodMenu`, contains the structured data for all Soul Food Weekend categories and their respective menu items.
-   **Category Iteration**: The page iterates through `soulFoodMenu.categories` to dynamically render each menu category section.

## Layout and Structure

The page is structured into a hero section followed by the main menu content area, and concludes with a global footer.

The overall structure is as follows:
1.  **`Navigation`**: The global navigation bar is rendered at the top.
2.  **Hero Section**: A `<section>` element with a background image (`/images/menu/soul-food-weekends/hero/hero.jpg`) and a semi-transparent black overlay. It contains a centered title ("Soul Food Weekends") and detailed descriptive paragraphs about the culinary journey, unlimited chaat offer, and availability.
3.  **Menu Content Section**: Another `<section>` element that houses the main menu content.
    -   It features an `absolute` positioned `div` with an animated SVG background pattern.
    -   A "Menu Legend" is displayed at the top, indicating vegetarian and non-vegetarian options.
    -   Each menu category is rendered using the `MenuCategorySection` component, iterating through the `soulFoodMenu.categories` data.
    -   A "Back to All Menus" button (`next/link` wrapped in a `Button` component) is positioned at the bottom center of this section.
4.  **`Footer`**: The global footer is rendered at the bottom of the page.

## Component Breakdown

The Soul Food Weekends Menu Page is composed of the following key components:

### 1. `Navigation` (`@/components/home/Navigation`)
-   **Purpose**: Provides the main navigation links for the website.
-   **Integration**: Global component, placed at the top of the page.

### 2. `Button` (`@/components/ui/button`)
-   **Purpose**: A reusable UI component for interactive buttons.
-   **Features**: Styled with Tailwind CSS for consistent appearance and hover effects.
-   **Integration**: Used for the "Back to All Menus" link.

### 3. `MenuCategorySection` (`@/components/menu/MenuCategorySection`)
-   **Purpose**: Renders a single category of soul food weekend menu items.
-   **Props**: Expects a `category` object from `soulFoodMenu.categories`, which includes the category name and an array of menu items.
-   **Features**: Displays the category title and then iterates through its items, likely rendering individual `MenuItemCard` components.
-   **Integration**: Multiple instances are rendered, one for each category in the Soul Food Weekends menu.

### 4. `Footer` (`@/components/home/Footer`)
-   **Purpose**: The global footer of the website.
-   **Integration**: Global component, placed at the bottom of the page.

## Performance Considerations

-   **Client-Side Rendering (`"use client"`)**: The page is a client component, enabling interactive elements and client-side JavaScript execution.
-   **Image Loading Class (`useEffect`)**: The `useEffect` hook adds a `loaded` class to images once they are fully loaded. This is a common pattern to prevent layout shifts and enable CSS-based animations (e.g., fade-in) for images, improving perceived performance.
-   **Static Data**: Using static data (`soulFoodMenu`) means no server-side data fetching is required for the menu content, contributing to faster initial load times.