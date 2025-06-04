# Chaat & Bar Bites Menu Page (`src/app/menu/bar-bites/page.tsx`)

This document provides a comprehensive overview of the Chaat & Bar Bites Menu Page, detailing its features, data handling, layout, and the structure of its components.

## Overview

The Chaat & Bar Bites Menu Page is a client-side rendered page dedicated to showcasing the small plates and appetizers available at Akasa Restaurant. It presents the menu items organized by categories, includes a clear legend for dietary information, and features a visually engaging hero section with an animated background pattern in the main content area. Its structure is very similar to the À La Carte Menu Page, ensuring consistency across menu subpages.

## Features

-   **Category-Based Menu Display**: Organizes and displays Chaat & Bar Bites dishes under distinct categories.
-   **Dietary Legend**: Provides a clear legend for vegetarian (🟢) and non-vegetarian (🔴) indicators, assisting users with dietary preferences.
-   **Hero Section**: A prominent visual introduction to the Bar Bites menu with a background image and descriptive text.
-   **Animated Background**: Features a subtle, animated SVG background pattern in the menu content section, adding a dynamic visual element.
-   **Navigation to All Menus**: Includes a dedicated button to easily navigate back to the main menu overview page.
-   **Image Loading Optimization**: Implements client-side JavaScript to add a `loaded` class to images once they are fully loaded, enabling CSS-driven loading animations or preventing content shifts.

## Data Handling

The Chaat & Bar Bites Menu Page retrieves its menu data from a static JavaScript file.

-   **`barBitesMenu`**: This object, imported from `@/data/barBitesMenu`, contains the structured data for all Chaat & Bar Bites categories and their respective menu items.
-   **Category Iteration**: The page iterates through `barBitesMenu.categories` to dynamically render each menu category section.

## Layout and Structure

The page is structured into a hero section followed by the main menu content area, and concludes with a global footer.

The overall structure is as follows:
1.  **`Navigation`**: The global navigation bar is rendered at the top.
2.  **Hero Section**: A `<section>` element with a background image (`/images/menu/bar-bites/hero/hero.jpg`) and a semi-transparent black overlay. It contains a centered title ("Chaat & Bar Bites") and a brief description.
3.  **Menu Content Section**: Another `<section>` element that houses the main menu content.
    -   It features an `absolute` positioned `div` with an animated SVG background pattern, creating a subtle visual effect.
    -   A "Menu Legend" is displayed at the top, indicating vegetarian and non-vegetarian options.
    -   Each menu category is rendered using the `BarBiteCategorySection` component, iterating through the `barBitesMenu.categories` data.
    -   A "Back to All Menus" button (`next/link` wrapped in a `Button` component) is positioned at the bottom center of this section.
4.  **`Footer`**: The global footer is rendered at the bottom of the page.

## Component Breakdown

The Chaat & Bar Bites Menu Page is composed of the following key components:

### 1. `Navigation` (`@/components/home/Navigation`)
-   **Purpose**: Provides the main navigation links for the website.
-   **Integration**: Global component, placed at the top of the page.

### 2. `Button` (`@/components/ui/button`)
-   **Purpose**: A reusable UI component for interactive buttons.
-   **Features**: Styled with Tailwind CSS for consistent appearance and hover effects.
-   **Integration**: Used for the "Back to All Menus" link.

### 3. `BarBiteCategorySection` (`@/components/menu/BarBiteCategorySection`)
-   **Purpose**: Renders a single category of bar bites menu items.
-   **Props**: Expects a `category` object from `barBitesMenu.categories`, which includes the category name and an array of menu items.
-   **Features**: Displays the category title and then iterates through its items, likely rendering individual `BarBiteMenuItemCard` components (though not directly imported here, it's implied by the structure of `BarBiteCategorySection`).
-   **Integration**: Multiple instances are rendered, one for each category in the Bar Bites menu.

### 4. `Footer` (`@/components/home/Footer`)
-   **Purpose**: The global footer of the website.
-   **Integration**: Global component, placed at the bottom of the page.

## Performance Considerations

-   **Client-Side Rendering (`"use client"`)**: The page is a client component, enabling interactive elements and client-side JavaScript execution.
-   **Image Loading Class (`useEffect`)**: The `useEffect` hook adds a `loaded` class to images once they are fully loaded. This is a common pattern to prevent layout shifts and enable CSS-based animations (e.g., fade-in) for images, improving perceived performance.
-   **Static Data**: Using static data (`barBitesMenu`) means no server-side data fetching is required for the menu content, contributing to faster initial load times.