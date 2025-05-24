# Mobile Optimization Guide

This document explains the mobile optimization strategy used in the Akasa website project.

## Overview

The website employs a mobile-first approach with specific optimizations:

1.  **Device Detection**: Identifies mobile devices via screen size and user agent.
2.  **Mobile-Specific CSS**: Dynamically loads CSS tailored for mobile.
3.  **Mobile-Specific Components**: Utilizes separate components for mobile and desktop views.
4.  **Touch Optimization**: Enhances interactions for touchscreens.
5.  **Performance Optimization**: Improves performance specifically for mobile devices.

## Implementation

### Device Detection

`src/utils/deviceUtils.ts` provides utilities for detecting mobile devices based on screen size and user agent.

### Mobile CSS Loading

The `applyMobileOptimizations` function in `deviceUtils.ts` dynamically loads `public/mobile.css` and applies mobile-specific DOM manipulations (e.g., `overflowX: 'hidden'`, `touchAction: 'manipulation'`).

### Mobile CSS File

`public/mobile.css` contains styles specifically for mobile devices, loaded conditionally.

### Mobile-Specific Components

The application renders separate components for mobile and desktop views based on device detection (e.g., `MobileHero` vs. `DesktopHero`).

## Mobile Hero Video Implementation

The mobile hero video uses a direct `<video>` element with a fallback image. Key attributes like `autoplay`, `muted`, `loop`, and `playsInline` are used, along with WebM and MP4 sources.

## Best Practices

### Mobile-First Design

1.  **Start with Mobile**: Design for mobile first, then enhance for larger screens.
2.  **Responsive Units**: Use relative units (rem, em, %) over fixed (px).
3.  **Test on Real Devices**: Verify on actual mobile devices.
4.  **Optimize Touch Targets**: Ensure touch targets are at least 44x44 pixels.
5.  **Simplify Navigation**: Use a hamburger menu for mobile.

### Performance Optimization

1.  **Optimize Images**: Use responsive images and WebP/AVIF.
2.  **Minimize JavaScript**: Reduce bundle size for faster loading.
3.  **Code Splitting**: Load only necessary code.
4.  **Optimize CSS**: Use mobile-specific CSS conditionally.
5.  **Lazy Load**: Defer loading of non-critical resources.

### Mobile Video Optimization

1.  **Use WebM**: Provides better compression than MP4.
2.  **Provide Fallback**: Always include a fallback image.
3.  **Appropriate Attributes**: Use `autoplay`, `muted`, `loop`, `playsInline`.
4.  **Optimize Video Size**: Keep dimensions suitable for mobile screens.
5.  **Monitor Performance**: Track video playback performance.

## Troubleshooting

### Common Mobile Issues

1.  **Video Playback**: Verify video format support and encoding.
2.  **Layout**: Check for fixed widths or horizontal scrolling.
3.  **Touch**: Ensure touch targets are adequately sized and spaced.
4.  **Performance**: Identify large images, heavy JavaScript, or other bottlenecks.
5.  **Device Detection**: Confirm correct device detection.

### Debugging Mobile Issues

1.  **Chrome DevTools**: Utilize device emulation mode.
2.  **Console Logs**: Review for errors.
3.  **Real Devices**: Test on actual mobile devices for accuracy.
4.  **Performance Monitoring**: Monitor LCP, CLS, FID.
5.  **Network Requests**: Identify slow-loading resources.
