# À La Carte Menu Page (`src/app/menu/a-la-carte/page.tsx`)

This document provides a comprehensive overview of the À La Carte Menu Page, detailing its features, data handling, layout, and the structure of its components.

## Overview

The À La Carte Menu Page is a client-side rendered page dedicated to showcasing the individual signature dishes available at Akasa Restaurant. It presents the menu items organized by categories, includes a clear legend for dietary information, and features a visually engaging hero section with an animated background pattern in the main content area.

## Features

-   **Category-Based Menu Display**: Organizes and displays À La Carte dishes under distinct categories, making navigation intuitive.
-   **Dietary Legend**: Provides a clear legend for vegetarian (🟢) and non-vegetarian (🔴) indicators, assisting users with dietary preferences.
-   **Hero Section**: A prominent visual introduction to the À La Carte menu with a background image and descriptive text.
-   **Animated Background**: Features a subtle, animated SVG background pattern in the menu content section, adding a dynamic visual element.
-   **Navigation to All Menus**: Includes a dedicated button to easily navigate back to the main menu overview page.
-   **Image Loading Optimization**: Implements client-side JavaScript to add a `loaded` class to images once they are fully loaded, enabling CSS-driven loading animations or preventing content shifts.

## Data Handling

The À La Carte Menu Page retrieves its menu data from a static JavaScript file.

-   **`alacarteMenu`**: This object, imported from `@/data/alacarteMenu`, contains the structured data for all À La Carte categories and their respective menu items.
-   **Category Iteration**: The page iterates through `alacarteMenu.categories` to dynamically render each menu category section.

## Layout and Structure

The page is structured into a hero section followed by the main menu content area, and concludes with a global footer.

The overall structure is as follows:
1.  **`Navigation`**: The global navigation bar is rendered at the top.
2.  **Hero Section**: A `<section>` element with a background image (`/images/menu/a-la-carte/hero/hero.jpg`) and a semi-transparent black overlay. It contains a centered title ("À La Carte Menu") and a brief description.
3.  **Menu Content Section**: Another `<section>` element that houses the main menu content.
    -   It features an `absolute` positioned `div` with an animated SVG background pattern, creating a subtle visual effect.
    -   A "Menu Legend" is displayed at the top, indicating vegetarian and non-vegetarian options.
    -   Each menu category is rendered using the `MenuCategorySection` component, iterating through the `alacarteMenu.categories` data.
    -   A "Back to All Menus" button (`next/link` wrapped in a `Button` component) is positioned at the bottom center of this section.
4.  **`Footer`**: The global footer is rendered at the bottom of the page.

## Component Breakdown

The À La Carte Menu Page is composed of the following key components:

### 1. `Navigation` (`@/components/home/Navigation`)
-   **Purpose**: Provides the main navigation links for the website.
-   **Integration**: Global component, placed at the top of the page.

### 2. `Button` (`@/components/ui/button`)
-   **Purpose**: A reusable UI component for interactive buttons.
-   **Features**: Styled with Tailwind CSS for consistent appearance and hover effects.
-   **Integration**: Used for the "Back to All Menus" link.

### 3. `MenuCategorySection` (`@/components/menu/MenuCategorySection`)
-   **Purpose**: Renders a single category of menu items.
-   **Props**: Expects a `category` object from `alacarteMenu.categories`, which includes the category name and an array of menu items.
-   **Features**: Displays the category title and then iterates through its items, likely rendering individual `MenuItemCard` components (though not directly imported here, it's implied by the structure of `MenuCategorySection`).
-   **Integration**: Multiple instances are rendered, one for each category in the À La Carte menu.

### 4. `Footer` (`@/components/home/Footer`)
-   **Purpose**: The global footer of the website.
-   **Integration**: Global component, placed at the bottom of the page.

## Performance Considerations

-   **Client-Side Rendering (`"use client"`)**: The page is a client component, enabling interactive elements and client-side JavaScript execution.
-   **Image Loading Class (`useEffect`)**: The `useEffect` hook adds a `loaded` class to images once they are fully loaded. This is a common pattern to prevent layout shifts and enable CSS-based animations (e.g., fade-in) for images, improving perceived performance.
-   **Static Data**: Using static data (`alacarteMenu`) means no server-side data fetching is required for the menu content, contributing to faster initial load times.