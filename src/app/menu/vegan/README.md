# Vegan Menu Page (`src/app/menu/vegan/page.tsx`)

This document provides a comprehensive overview of the Vegan Menu Page, detailing its features, unique data handling approach, layout, and the structure of its components.

## Overview

The Vegan Menu Page is a client-side rendered page dedicated to showcasing Akasa Restaurant's plant-based culinary options. Unlike other menu pages that import data from external files, this page's menu data is directly embedded and transformed within the component itself. It presents the vegan dishes organized by categories, includes dietary information, and features a visually engaging hero section with an animated background pattern in the main content area.

## Features

-   **Embedded and Transformed Menu Data**: The vegan menu data is defined directly within the page component and then transformed to fit the expected structure for display components.
-   **Category-Based Menu Display**: Organizes and displays vegan dishes under distinct categories (e.g., Appetizer, Main Course, Indian Bread, Dessert).
-   **Dietary Legend**: Provides a clear legend for vegetarian (🟢) and non-vegetarian (🔴) indicators, although all items on this page are inherently vegetarian/vegan.
-   **Dynamic Price Assignment**: Includes logic to assign prices to menu items based on their names during data transformation.
-   **Hero Section**: A prominent visual introduction to the Vegan Menu with a background image and descriptive text.
-   **Animated Background**: Features a subtle, animated SVG background pattern in the menu content section.
-   **Navigation to All Menus**: Includes a dedicated button to easily navigate back to the main menu overview page.
-   **Image Loading Optimization**: Implements client-side JavaScript to add a `loaded` class to images once they are fully loaded.

## Data Handling

The Vegan Menu Page's data handling is unique as the menu content is embedded directly within the `page.tsx` file.

-   **`veganMenuData`**: A JavaScript object defined directly in the file, containing the raw structure of the vegan menu with `restaurant_name`, `menu_type`, and `sections` (categories).
-   **`categories` Transformation**: The `veganMenuData.sections` array is mapped to a new `categories` array. This transformation:
    -   Renames `section.name` to `category_name` to match the `MenuCategorySection` component's prop.
    -   Iterates through `section.items` and assigns a `price` to each item based on conditional logic (e.g., if `item.name` includes "Broccoli", set price to "$23").
    -   Sets `description` to `null` for all items.
-   **Category Iteration**: The page iterates through this transformed `categories` array to dynamically render each menu category section.

## Layout and Structure

The page is structured into a hero section followed by the main menu content area, and concludes with a global footer.

The overall structure is as follows:
1.  **`Navigation`**: The global navigation bar is rendered at the top.
2.  **Hero Section**: A `<section>` element with a background image (`/images/menu/vegan/hero/hero.jpg`) and a semi-transparent black overlay. It contains a centered title ("Vegan Menu") and a brief description.
3.  **Menu Content Section**: Another `<section>` element that houses the main menu content.
    -   It features an `absolute` positioned `div` with an animated SVG background pattern.
    -   A "Menu Legend" is displayed at the top, indicating vegetarian and non-vegetarian options.
    -   Each menu category is rendered using the `MenuCategorySection` component, iterating through the `categories` data.
    -   A "Back to All Menus" button (`next/link` wrapped in a `Button` component) is positioned at the bottom center of this section.
4.  **`Footer`**: The global footer is rendered at the bottom of the page.

## Component Breakdown

The Vegan Menu Page is composed of the following key components:

### 1. `Navigation` (`@/components/home/Navigation`)
-   **Purpose**: Provides the main navigation links for the website.
-   **Integration**: Global component, placed at the top of the page.

### 2. `Button` (`@/components/ui/button`)
-   **Purpose**: A reusable UI component for interactive buttons.
-   **Features**: Styled with Tailwind CSS for consistent appearance and hover effects.
-   **Integration**: Used for the "Back to All Menus" link.

### 3. `MenuCategorySection` (`@/components/menu/MenuCategorySection`)
-   **Purpose**: Renders a single category of vegan menu items.
-   **Props**: Expects a `category` object (from the transformed `categories` array), which includes the category name and an array of menu items with their assigned prices.
-   **Features**: Displays the category title and then iterates through its items, likely rendering individual `MenuItemCard` components.
-   **Integration**: Multiple instances are rendered, one for each category in the Vegan menu.

### 4. `Footer` (`@/components/home/Footer`)
-   **Purpose**: The global footer of the website.
-   **Integration**: Global component, placed at the bottom of the page.

## Performance Considerations

-   **Client-Side Rendering (`"use client"`)**: The page is a client component, enabling interactive elements and client-side JavaScript execution.
-   **Image Loading Class (`useEffect`)**: The `useEffect` hook adds a `loaded` class to images once they are fully loaded. This is a common pattern to prevent layout shifts and enable CSS-based animations (e.g., fade-in) for images, improving perceived performance.
-   **Embedded Data**: While convenient for small, static datasets, embedding data directly in the page component can increase bundle size. For larger or frequently updated menus, fetching from an external source (like Sanity CMS) would be more scalable.