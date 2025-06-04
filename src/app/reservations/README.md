# Reservations Page (`src/app/reservations/page.tsx`)

This document provides a comprehensive overview of the Reservations Page, detailing its features, performance optimizations, layout, and the structure of its components.

## Overview

The Reservations Page is a client-side rendered page designed to facilitate online table bookings at Akasa Restaurant. It provides a user-friendly reservation form, essential restaurant information, and a frequently asked questions (FAQ) section. The page is optimized for performance through memoization and dynamic style loading, ensuring a smooth and efficient booking experience.

## Features

-   **Online Reservation Form**: A dedicated form for users to submit their booking requests.
-   **Restaurant Information**: Displays key details such as contact information, opening hours, and location relevant to making a reservation.
-   **Frequently Asked Questions (FAQ)**: Addresses common queries related to the reservation process.
-   **Hero Section**: A prominent visual introduction to the Reservations section.
-   **Animated Background**: Features a subtle, animated background pattern in the main content area, enhancing visual appeal.
-   **Responsive Two-Column Layout**: Organizes the reservation form and information side-by-side on larger screens, adapting to a single column on mobile.
-   **Dynamic Style Loading**: Loads page-specific CSS dynamically to optimize initial page load.
-   **Memoized Component**: The entire page component is memoized to prevent unnecessary re-renders.

## Performance Optimizations

The `ReservationsPage` component incorporates several performance strategies:

-   **Client-Side Rendering (`"use client"`)**: Enables interactive form elements and client-side JavaScript execution.
-   **`memo`ization**: The `ReservationsPage` component is wrapped in `memo` to prevent re-rendering when its props (which are none in this case, as it's the top-level page component) do not change, contributing to overall application performance.
-   **Dynamic Style Loading (`useEffect` with `loadPageStyles`)**: The `useEffect` hook calls `loadPageStyles('reservations')`, which dynamically loads CSS specific to the reservations page. This ensures that only necessary styles are loaded, reducing the initial CSS payload.
-   **Animated Background**: While visually appealing, the animated background is implemented using CSS animations and a `style` attribute, which is generally performant. The opacity is set to `0.13` to keep it subtle and non-distracting.

## Layout and Structure

The page is structured into a hero section, followed by a main content area containing the reservation form and information, and concludes with a global footer.

The overall structure is as follows:
1.  **`Navigation`**: The global navigation bar is rendered at the top.
2.  **`HeroSection`**: The primary visual introduction to the Reservations section.
3.  **Main Content Area**: A `div` with responsive padding (`pt-24 pb-8 md:pb-12`) and a decorative animated background.
    -   It contains a responsive `grid` layout (`grid-cols-1 lg:grid-cols-2`) for its primary content.
    -   **`ReservationForm`**: Placed in the first column, designed to appear at the top on mobile (`order-1`).
    -   **`ReservationInfo`**: Placed in the second column, designed to appear below the form on mobile (`order-2`). It specifically imports `ReservationInfoClean` for a cleaner implementation.
    -   **`ReservationFAQ`**: A dedicated section for frequently asked questions, positioned below the main form and info grid.
    -   A decorative separator `div` is used for visual separation.
4.  **`Footer`**: The global footer is rendered at the bottom of the page.

Custom CSS for `fadeIn`, `fadeSlideUp` animations, and `BACKGROUND_ANIMATION_KEYFRAMES` (imported from `src/constants/menuConstants`) is embedded using `style jsx` for various visual effects.

## Component Breakdown

The Reservations Page is composed of the following key components:

### 1. `Navigation` (`@/components/home/Navigation`)
-   **Purpose**: Provides the main navigation links for the website.
-   **Integration**: Global component, placed at the top of the page.

### 2. `HeroSection` (`@/components/reservations/HeroSection`)
-   **Purpose**: Serves as the introductory hero section for the reservations page.
-   **Features**: Likely includes a title (e.g., "Make a Reservation"), a brief description, and a background image or visual element.
-   **Integration**: The first major content section after global navigation.

### 3. `ReservationForm` (`@/components/reservations/ReservationForm`)
-   **Purpose**: Provides the interactive form for users to input their reservation details (date, time, number of guests, etc.).
-   **Features**: Handles user input, form validation (basic, as per `README.md`'s limitations), and potentially submission logic.
-   **Integration**: A core interactive element of the page, positioned prominently.

### 4. `ReservationInfo` (`@/components/reservations/ReservationInfoClean`)
-   **Purpose**: Displays essential restaurant information relevant to making a reservation.
-   **Features**: Includes contact details, opening hours, and possibly location map or address. The `Clean` suffix suggests a streamlined or updated version of this component.
-   **Integration**: Provides context and alternative contact methods alongside the form.

### 5. `ReservationFAQ` (`@/components/reservations/ReservationFAQ`)
-   **Purpose**: Addresses common questions users might have before or during the reservation process.
-   **Features**: Presents questions and answers in an organized, easy-to-read format (e.g., accordion).
-   **Integration**: Provides self-service support for users.

### 6. `Footer` (`@/components/home/Footer`)
-   **Purpose**: The global footer of the website.
-   **Integration**: Global component, placed at the bottom of the page.