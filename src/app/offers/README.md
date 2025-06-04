# Offers Page (`src/app/offers/page.tsx`)

This document provides a comprehensive overview of the Offers Page, detailing its features, data handling, layout, and the structure of its components, many of which are defined directly within this file.

## Overview

The Offers Page is a client-side rendered page designed to showcase Akasa Restaurant's special promotions, seasonal offers, and upcoming loyalty program. It features a visually rich design with parallax effects and animated backgrounds, aiming to attract users to explore and redeem offers. The page is structured using several memoized functional components defined directly within `page.tsx` for modularity and potential performance benefits.

## Features

-   **Dynamic Promotions Display**: Presents current special offers and promotions in an engaging card format.
-   **Loyalty Program Preview**: Provides information about an upcoming loyalty program, building anticipation.
-   **Newsletter Subscription**: Includes a form for users to subscribe to the restaurant's newsletter.
-   **Visually Rich Hero Section**: Features a hero section with a background image and parallax effect, creating depth.
-   **Animated Background Patterns**: Subtle animated SVG patterns are used in content sections to add visual interest.
-   **Responsive Design**: Layouts adapt to various screen sizes, from mobile to large desktops.
-   **Memoized Components**: Key sections are implemented as `memo`ized components to optimize re-renders.

## Data Handling

The Offers Page currently uses static, hardcoded data for its promotions.

-   **`offers` Array**: Defined directly within the `CurrentOffersSection` component, this array holds all the details for each promotion, including `title`, `description`, `details`, `footnote`, `image` path, `validUntil` date, `code`, and `link`.
-   **No External Data Fetching**: All promotional content is managed directly within this file, meaning no API calls or CMS integrations are used for offers data on this page.

## Layout and Structure

The page is structured as a series of distinct sections, each implemented as a separate memoized component, rendered sequentially within the main content area.

The overall structure is as follows:
1.  **`Navigation`**: The global navigation bar is rendered at the top.
2.  **`HeroSection`**: The initial full-screen section with a background image, parallax effect, and a prominent title and call to action to view offers.
3.  **`CurrentOffersSection`**: This section displays the list of current promotions.
    -   It features an animated background pattern and decorative elements.
    -   Offers are rendered in a responsive grid (1 column on mobile, 2 on medium screens, 3 on large screens) using `OfferCard` components.
4.  **`LoyaltyProgramSection`**: This section provides details about the upcoming loyalty program.
    -   It includes a "Coming Soon" banner.
    -   Features an image with decorative borders and an overlay badge.
    -   A descriptive text block with decorative elements and a grid of key benefits.
    -   A "Learn More" button.
5.  **`NewsletterSection`**: A section for newsletter subscription.
    -   Features a background image with an overlay.
    -   Includes a title, description, and an email subscription form with an input field and a subscribe button.
6.  **`Footer`**: The global footer is rendered at the bottom of the page.

Custom CSS for `slideBackground` animation is embedded using `style jsx` within `CurrentOffersSection` and `LoyaltyProgramSection`.

## Component Breakdown

The Offers Page is primarily composed of the following memoized functional components, all defined within `src/app/offers/page.tsx`:

### 1. `HeroSection` (Local Component)
-   **Purpose**: The main introductory section for the Offers page.
-   **Features**: Background image with parallax, decorative elements, elegant title with gradient text, descriptive paragraph, and a "View Offers" button that scrolls to the `CurrentOffersSection`.
-   **Integration**: First content section after global navigation.

### 2. `OfferCard` (Local Component)
-   **Purpose**: Renders an individual promotional offer.
-   **Props**: `title` (with `text` and `emphasize` parts), `description`, `details` (optional bullet points), `footnote` (optional), `image` path, `validUntil` string, `code` (promo code), `link` (for redemption).
-   **Features**: Displays offer image with hover effects, validity badge, detailed description, promo code display, and a "Redeem Offer" button. Includes subtle glow and corner accents on hover.
-   **Integration**: Used within `CurrentOffersSection` to display each offer.

### 3. `CurrentOffersSection` (Local Component)
-   **Purpose**: Displays a collection of current special offers.
-   **Features**: Contains the hardcoded `offers` data, renders them using `OfferCard` in a responsive grid, and includes a section title with decorative elements.
-   **Integration**: Follows the `HeroSection`.

### 4. `LoyaltyProgramSection` (Local Component)
-   **Purpose**: Provides information about the upcoming loyalty program.
-   **Features**: "Coming Soon" banner, an image with decorative frame and hover effects, a detailed description of the program, a grid of benefits, and a "Learn More" button.
-   **Integration**: Follows the `CurrentOffersSection`.

### 5. `NewsletterSection` (Local Component)
-   **Purpose**: Encourages users to subscribe to the restaurant's newsletter.
-   **Features**: Background image, title, descriptive text, and an email subscription form.
-   **Integration**: Follows the `LoyaltyProgramSection`.

### Global Components:
-   **`Navigation` (`@/components/home/Navigation`)**: Global navigation bar.
-   **`Footer` (`@/components/home/Footer`)**: Global footer.
-   **`Image` (`next/image`)**: Next.js optimized image component used extensively for performance.
-   **`Link` (`next/link`)**: For client-side transitions between pages.
-   **`Button` (`@/components/ui/button`)**: Reusable UI button component.

## Performance Considerations

-   **Client-Side Rendering (`"use client"`)**: The page is a client component, enabling interactive elements and dynamic content updates.
-   **`memo`ization**: Components like `HeroSection`, `OfferCard`, etc., are wrapped in `memo` to prevent unnecessary re-renders, improving performance.
-   **Image Optimization (`next/image`)**: Used for all images with `fill`, `sizes`, `quality`, `priority`, and `loading="eager"`/`"lazy"` attributes for efficient loading and responsiveness.
-   **Static Data**: While the offers data is hardcoded, for a real-world application, this would ideally be fetched from a CMS or API to allow for easier content updates without code changes.