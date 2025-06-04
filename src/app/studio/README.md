# Sanity Studio Page (`src/app/studio/[[...tool]]/page.tsx`)

This document provides a comprehensive overview of the Sanity Studio Page, detailing its purpose, integration with Sanity CMS, routing, and specific customizations.

## Overview

The Sanity Studio Page serves as the built-in content authoring environment for the Akasa Restaurant website. It provides a user-friendly interface for content creators to manage and update various types of content, such as blog posts, menu items, events, and offers, directly through the Sanity Content Management System (CMS). This page leverages Next.js's catch-all routes to handle all paths under the `/studio` URL.

## Features

-   **Content Authoring Environment**: Provides a full-fledged interface for creating, editing, and publishing content via Sanity CMS.
-   **Catch-All Routing**: Utilizes Next.js's `[[...tool]]` dynamic route to capture all sub-paths under `/studio`, allowing the Sanity Studio to handle its internal routing seamlessly.
-   **Static Generation**: Configured with `export const dynamic = 'force-static'`, ensuring that the studio page is statically generated at build time. This can contribute to faster initial loads for the studio itself.
-   **Dynamic Metadata and Viewport**: Exports `metadata` and `viewport` directly from `next-sanity/studio`, ensuring proper SEO and responsive behavior for the studio interface.
-   **UI Customization (CSS Injection)**: Includes a specific client-side CSS injection to hide certain floating action buttons (like WhatsApp and "Book Now") that are part of the main website's UI, preventing them from appearing within the studio environment. This ensures a clean and focused content management experience.

## Integration

The Sanity Studio is integrated into the Next.js application using the `next-sanity` package.

-   **`NextStudio` Component**: The core component from `next-sanity/studio` that renders the entire Sanity Studio UI.
-   **Sanity Configuration**: The studio's behavior and content schemas are defined in `../../../../sanity.config.ts` (or `sanity.config.js`), which is imported and passed to the `NextStudio` component. This configuration dictates the types of content that can be managed (e.g., `postType`, `categoryType`, `authorType` as seen in `src/sanity/schemaTypes/index.ts`).

## Layout and Structure

The Sanity Studio Page is a minimalist wrapper around the `NextStudio` component.

The overall structure is as follows:
1.  **CSS Injection**: A `<style dangerouslySetInnerHTML>` block is included at the top level to inject custom CSS. This CSS specifically targets and hides floating action buttons that might otherwise appear on the studio interface, ensuring they do not interfere with the content management experience.
2.  **`NextStudio` Component**: This is the primary component rendered, taking the imported `config` as a prop. It is responsible for rendering the entire Sanity Studio UI, including its navigation, content editors, and dashboard.

## Component Breakdown

The Sanity Studio Page primarily relies on the `NextStudio` component:

### 1. `NextStudio` (`next-sanity/studio`)
-   **Purpose**: The main component provided by the `next-sanity` library to embed the Sanity Studio into a Next.js application.
-   **Props**: Requires a `config` object, which is the main Sanity configuration defining schemas, plugins, and other studio settings.
-   **Features**: Renders the complete Sanity Studio interface, allowing content creators to interact with the CMS.
-   **Integration**: It is the central element of this page, responsible for the entire content management experience.

## Customizations

-   **Hiding Floating Action Buttons**: The injected CSS targets specific Tailwind CSS classes (`.fixed.left-4.md\\:left-6.z-50.transition-all.duration-300` and `.fixed.right-4.md\\:right-6.z-50.transition-all.duration-300`) to set their `display` property to `none !important`. This ensures that the WhatsApp and "Book Now" buttons, which are part of the main website's UI, do not appear within the Sanity Studio, providing a cleaner and more focused environment for content management.