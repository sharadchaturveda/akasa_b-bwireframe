# 3 Course Set Lunch Menu Page (`src/app/menu/set-lunch/page.tsx`)

This document provides a comprehensive overview of the 3 Course Set Lunch Menu Page, detailing its features, data handling, layout, and the structure of its components.

## Overview

The 3 Course Set Lunch Menu Page is a client-side rendered page dedicated to showcasing the special set lunch offering at Akasa Restaurant. It presents the menu organized by courses, includes dietary information, displays pricing and availability details, and features a visually engaging hero section with an animated background pattern in the main content area.

## Features

-   **Course-Based Menu Display**: Organizes and displays lunch items by courses (e.g., Appetizers, Main Course, Desserts).
-   **Dietary Legend**: Provides a clear legend for vegetarian (🟢) and non-vegetarian (🔴) indicators.
-   **Price and Description Display**: Clearly shows the set lunch price, a brief description, and its availability (days and times).
-   **Daily Sides Information**: Includes a dedicated section for daily included sides.
-   **Hero Section**: A prominent visual introduction to the Set Lunch menu with a background image and descriptive text.
-   **Animated Background**: Features a subtle, animated SVG background pattern in the menu content section.
-   **Navigation to All Menus**: Includes a dedicated button to easily navigate back to the main menu overview page.
-   **Image Loading Optimization**: Implements client-side JavaScript to add a `loaded` class to images once they are fully loaded.

## Data Handling

The 3 Course Set Lunch Menu Page retrieves its menu data from a static JavaScript file.

-   **`setLunchMenu`**: This object, imported from `@/data/setLunchMenu`, contains the structured data for the set lunch, including its `price`, `description`, `courses`, and `included_sides`.
-   **Course Iteration**: The page iterates through `setLunchMenu.courses` to dynamically render each course section.

## Layout and Structure

The page is structured into a hero section followed by the main menu content area, and concludes with a global footer.

The overall structure is as follows:
1.  **`Navigation`**: The global navigation bar is rendered at the top.
2.  **Hero Section**: A `<section>` element with a background image (`/images/menu/set-lunch/hero/hero.jpg`) and a semi-transparent black overlay. It contains a centered title ("3 Course Set Lunch") and a brief description.
3.  **Menu Content Section**: Another `<section>` element that houses the main menu content.
    -   It features an `absolute` positioned `div` with an animated SVG background pattern.
    -   A "Menu Legend" is displayed at the top, indicating vegetarian and non-vegetarian options.
    -   A dedicated `div` displays the `setLunchMenu.price`, `setLunchMenu.description`, and availability information.
    -   Each menu course is rendered using the `SetLunchCourseSection` component, iterating through the `setLunchMenu.courses` data.
    -   The `DailySidesSection` component is rendered to display the `setLunchMenu.included_sides`.
    -   A "Back to All Menus" button (`next/link` wrapped in a `Button` component) is positioned at the bottom center of this section.
4.  **`Footer`**: The global footer is rendered at the bottom of the page.

## Component Breakdown

The 3 Course Set Lunch Menu Page is composed of the following key components:

### 1. `Navigation` (`@/components/home/Navigation`)
-   **Purpose**: Provides the main navigation links for the website.
-   **Integration**: Global component, placed at the top of the page.

### 2. `Button` (`@/components/ui/button`)
-   **Purpose**: A reusable UI component for interactive buttons.
-   **Features**: Styled with Tailwind CSS for consistent appearance and hover effects.
-   **Integration**: Used for the "Back to All Menus" link.

### 3. `SetLunchCourseSection` (`@/components/menu/SetLunchCourseSection`)
-   **Purpose**: Renders a single course of the set lunch menu.
-   **Props**: Expects a `course` object from `setLunchMenu.courses`, which includes the course name and an array of menu items.
-   **Features**: Displays the course title and then iterates through its items, likely rendering individual `SetLunchFixedItemCard` or `SetLunchMenuOptionCard` components.
-   **Integration**: Multiple instances are rendered, one for each course in the Set Lunch menu.

### 4. `DailySidesSection` (`@/components/menu/DailySidesSection`)
-   **Purpose**: Displays the daily included sides for the set lunch.
-   **Props**: Expects `includedSides` data.
-   **Features**: Lists the available sides.
-   **Integration**: Placed after the main menu courses.

### 5. `Footer` (`@/components/home/Footer`)
-   **Purpose**: The global footer of the website.
-   **Integration**: Global component, placed at the bottom of the page.

## Performance Considerations

-   **Client-Side Rendering (`"use client"`)**: The page is a client component, enabling interactive elements and client-side JavaScript execution.
-   **Image Loading Class (`useEffect`)**: The `useEffect` hook adds a `loaded` class to images once they are fully loaded. This is a common pattern to prevent layout shifts and enable CSS-based animations (e.g., fade-in) for images, improving perceived performance.
-   **Static Data**: Using static data (`setLunchMenu`) means no server-side data fetching is required for the menu content, contributing to faster initial load times.