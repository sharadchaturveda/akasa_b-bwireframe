# Overall Performance Optimization Strategy

This document provides a comprehensive overview of the performance optimization strategies implemented across the Akasa Restaurant website. The primary goal is to achieve fast loading times, smooth interactions, and excellent Core Web Vitals scores, ensuring a superior user experience on all devices.

## Overview

The project employs a multi-faceted approach to performance, combining Next.js built-in optimizations, custom utility functions, and strategic component loading. This includes aggressive image and CSS optimization, intelligent code splitting, efficient scroll handling, and continuous performance monitoring.

## Key Pillars of Performance Optimization

### 1. Build-Time and Server-Side Optimizations (`next.config.js`)

The `next.config.js` file is central to many performance enhancements applied during the build process and server-side rendering:

-   **Image Optimization**:
    -   Next.js Image Optimization is enabled (`images.unoptimized: false`).
    -   Prioritizes modern formats (`image/avif`, `image/webp`) for better compression.
    -   Configures `deviceSizes` and `imageSizes` to serve responsive images tailored to various screen resolutions.
    -   Allows images from specific remote patterns (Vercel, localhost, Sanity CDN).
-   **CSS Optimization**:
    -   `experimental.optimizeCss: true` enables CSS minimization and critical CSS inlining.
    -   Unused CSS is purged during the build process (handled by Tailwind CSS and PostCSS configuration).
-   **Code Splitting and Bundling (Webpack)**:
    -   Webpack is configured for aggressive chunk splitting (`config.optimization.splitChunks`), creating separate bundles for:
        -   `framework` (React, Next.js)
        -   `lib` (larger third-party libraries)
        -   `pages` (page-specific code)
        -   `components` (reusable components)
    -   This improves caching and reduces the initial JavaScript payload.
-   **Compiler Optimizations**:
    -   `compiler.removeConsole`: Removes `console.log` statements (excluding `error` and `warn`) in production builds, reducing bundle size and preventing unnecessary console output.
-   **Build Process Robustness**:
    -   ESLint and TypeScript errors are ignored during production builds (`ignoreDuringBuilds`, `ignoreBuildErrors`) to prevent build failures in CI/CD environments, ensuring deployments are not blocked by non-critical issues.
    -   Webpack cache is disabled in development to prevent corruption.

### 2. Client-Side Runtime Optimizations

Various client-side JavaScript utilities and component loading strategies ensure smooth performance after the initial page load:

-   **Dynamic Component Imports (`next/dynamic` with `Suspense`)**:
    -   Components that are typically "below the fold" (not immediately visible on page load) are dynamically imported. This reduces the initial JavaScript bundle size and improves Time to Interactive (TTI).
    -   `Suspense` provides a fallback UI (e.g., a loading spinner or placeholder `div`) while the dynamic component is being loaded.
    -   Examples: `TestimonialsSection`, `InquiryFormSection` on Events page; `MenusSection`, `FlavorExperienceSection`, `FeaturedDishesSection` on Menu page.
-   **Image Loading Class (`useEffect`)**:
    -   A `useEffect` hook on many pages (e.g., Home, Menu subpages) adds a `loaded` class to `<img>` elements once they are fully loaded.
    -   This enables CSS-driven animations (e.g., fade-in) or removal of loading placeholders, preventing layout shifts and improving perceived performance.
-   **Critical Resource Preloading (`src/utils/performanceMonitor.ts`, `src/utils/performanceUtils.ts`)**:
    -   `preloadCriticalResources` function dynamically adds `<link rel="preload">` tags for essential images, styles, scripts, and fonts.
    -   This preloading occurs during browser idle time using `requestIdleCallback` (with `setTimeout` as a fallback), ensuring critical assets are available faster when needed.
-   **Font Loading Optimization (`src/utils/performanceUtils.ts`)**:
    -   `optimizeFontLoading` uses the Font Loading API (`document.fonts.ready`) to add a `fonts-loaded` class to the `<html>` element once all fonts are loaded. This allows for CSS to apply font-dependent styles only after fonts are ready, preventing FOUT (Flash of Unstyled Text) or FOIT (Flash of Invisible Text).
-   **Scroll Performance Optimizations (`src/utils/optimizedScrollUtils.ts`)**:
    -   **Throttling**: The `throttle` utility limits the frequency of function calls (e.g., scroll event handlers) to prevent performance bottlenecks.
    -   **Passive Event Listeners**: `applyPassiveScrollListeners` adds `passive: true` to `wheel`, `touchstart`, and `touchmove` event listeners. This signals to the browser that the listener will not call `preventDefault()`, allowing the browser to scroll smoothly without waiting for the listener to complete.
    -   **General Scroll Optimizations (`applyScrollPerformanceOptimizations`)**:
        -   Disables smooth scrolling (`scroll-behavior: auto`) for immediate response.
        -   Prevents overscroll effects (`overscroll-behavior: none`).
        -   Prevents horizontal overflow (`overflow-x: hidden`).
        -   For mobile, enables momentum-based scrolling (`-webkit-overflow-scrolling: touch`) and disables hover effect transitions to prevent jank.
    -   **Intersection Observer**: `createScrollObserver` provides a performant alternative to scroll event listeners for detecting when elements enter the viewport, useful for lazy loading or animations.

### 3. Performance Monitoring (`src/utils/performanceMonitor.ts`, `src/utils/performanceUtils.ts`)

The project includes utilities for monitoring Core Web Vitals and other key performance metrics:

-   **`PerformanceObserver`**: Used to track:
    -   **Largest Contentful Paint (LCP)**: Measures the time it takes for the largest content element to become visible.
    -   **Cumulative Layout Shift (CLS)**: Quantifies unexpected layout shifts of visual page content.
    -   **First Input Delay (FID)** / **Interaction to Next Paint (INP)**: Measures the responsiveness of the page to user input.
    -   **Long Tasks**: Identifies long-running JavaScript tasks that can block the main thread and cause UI unresponsiveness.
-   **Development Logging**: In development environments, these monitors log performance metrics to the console, aiding developers in identifying and debugging performance issues. In production, these logs are typically suppressed or sent to an analytics service.

## Overall Impact

This comprehensive performance strategy ensures that the Akasa Restaurant website is not only visually appealing but also exceptionally fast and responsive, providing an optimal experience for all users, regardless of their device or network conditions.