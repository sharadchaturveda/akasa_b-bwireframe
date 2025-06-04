# Image Optimization Strategy

This document outlines the comprehensive image optimization strategy implemented in the Akasa Restaurant website. The goal is to deliver high-quality images efficiently across various devices and network conditions, contributing significantly to faster page load times and an improved user experience.

## Overview

The project leverages Next.js's built-in Image Optimization capabilities, complemented by custom configurations and utility components. The strategy focuses on serving modern image formats, responsive sizing, and intelligent loading techniques to minimize bandwidth usage and enhance visual performance.

## Key Aspects of Image Optimization

### 1. Next.js Image Component (`next/image`)

The primary tool for image optimization is the `next/image` component. It automatically handles:
-   **Image Resizing**: Images are automatically resized to match the `sizes` attribute and the viewport, serving only the necessary dimensions.
-   **Format Conversion**: Images are converted to modern, efficient formats like AVIF and WebP where supported by the browser.
-   **Lazy Loading**: Images outside the viewport are loaded only when they are about to enter it, reducing initial page load time.
-   **Placeholder Images**: Provides blur-up or color placeholders to prevent layout shifts while images are loading.

### 2. `next.config.js` Configuration

The `next.config.js` file plays a crucial role in defining the global image optimization settings:

-   **`images.formats: ['image/avif', 'image/webp']`**: Prioritizes serving images in AVIF format (for superior compression) and WebP format (for broad modern browser support). If neither is supported, it falls back to the original format.
-   **`images.deviceSizes`**: `[320, 420, 640, 768, 1024, 1280, 1536, 1920, 2048, 3840]`
    -   Defines a comprehensive set of breakpoints representing common device widths. Next.js uses these to generate image sources (`srcset`) that are optimized for different screen sizes.
-   **`images.imageSizes`**: `[16, 32, 48, 64, 96, 128, 256, 384, 512, 1024, 2048]`
    -   Defines a set of fixed image widths that Next.js can generate. These are used in conjunction with `deviceSizes` and the `sizes` attribute on the `Image` component to serve the most appropriate image resolution.
-   **`images.dangerouslyAllowSVG: true`**: Allows the use of SVG images, which are vector-based and scale without loss of quality.
-   **`images.remotePatterns`**: Configures a whitelist of external domains from which images can be loaded and optimized by Next.js. This includes:
    -   `akasa-restaurant.vercel.app`: For images served from the deployed application.
    -   `localhost:3000`: For images served during local development.
    -   `cdn.sanity.io`: For images managed and served via the Sanity CMS.
-   **`images.unoptimized: false`**: Explicitly ensures that Next.js's image optimization features are enabled.

### 3. Custom Image Components and Utilities

The project includes custom components and utility functions to further enhance image handling:

-   **`src/components/ui/OptimizedImage.tsx`**: Likely a wrapper around `next/image` that applies common props or additional logic for consistent optimization.
-   **`src/components/ui/OptimizedAvifImage.tsx`**: A specialized component that might enforce AVIF usage or provide specific handling for AVIF images.
-   **`src/components/ui/OptimizedBackgroundImage.tsx`**: A component designed to handle background images efficiently, potentially using `next/image` internally or optimizing CSS `background-image` properties.
-   **`src/utils/imageOptimization.ts`**: Contains general image optimization utility functions.
-   **`src/utils/imageUtils.ts`**: Provides various image-related utility functions.
-   **`src/utils/optimizedImageLoader.ts`**: Might contain a custom image loader for Next.js, allowing for more granular control over image requests or integration with external image services.

### 4. Image Preloading

Critical images (e.g., hero images on main pages) are often preloaded to ensure they are available as quickly as possible, improving Largest Contentful Paint (LCP). This is typically achieved using:
-   `priority` and `fetchPriority="high"` props on the `next/image` component.
-   `useEffect` hooks with `requestIdleCallback` or `setTimeout` to preload images in the background during browser idle time (as seen in `src/app/menu/page.tsx` and `src/app/examples/DocumentedPage.tsx`).

### 5. Image Directory Structure (`public/images/`)

Images are organized logically within the `public/images/` directory, categorized by page or section (e.g., `home/`, `menu/`, `events/`, `offers/`, `chef/`, `testimonials/`, `seo/`, `blog/`, `brand/`, `common/`, `unused/`). This structure helps in managing assets and understanding their context.

## Performance Benefits

The implemented image optimization strategy contributes to:
-   **Faster Page Load Times**: By serving smaller, optimized images.
-   **Reduced Bandwidth Consumption**: Less data transferred, especially beneficial for users on slower networks.
-   **Improved Core Web Vitals**: Specifically, a better Largest Contentful Paint (LCP) score due to efficient loading of primary images.
-   **Reduced Layout Shift (CLS)**: Proper image sizing and placeholders help prevent content from jumping around during loading.
-   **Enhanced User Experience**: Visually appealing and fast-loading images create a more engaging and professional website.