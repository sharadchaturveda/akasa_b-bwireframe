# Image Optimization Guide

This document explains the image optimization strategy used in the Akasa website project.

## Overview

The website leverages Next.js built-in image optimization to automatically serve images in the most efficient format (AVIF, WebP, or original fallback).

## Implementation

### Next.js Configuration

`next.config.js` prioritizes AVIF and WebP formats, and defines `deviceSizes` and `imageSizes` for responsive image generation.

### Optimization Utilities

`src/utils/imageOptimization.ts` provides utilities like `getOptimizedImageProps` for generating props for the Next.js `Image` component.

### OptimizedImage Component

`src/components/ui/OptimizedImage.tsx` wraps the Next.js `Image` component, handling AVIF optimization, placeholders, loading states, errors, and priority-based loading.

## Usage

### Basic Usage

```tsx
<OptimizedImage
  src="/images/home/hero/hero-home.jpg"
  alt="Hero background"
  width={800}
  height={600}
/>
```

### With Additional Options

```tsx
<OptimizedImage
  src="/images/home/hero/hero-home.jpg"
  alt="Hero background"
  width={800}
  height={600}
  isCritical={true}
  quality={80}
  showPlaceholder={true}
  placeholderColor="#222"
/>
```

## Best Practices

1.  **Use `OptimizedImage`**: Ensure consistent optimization.
2.  **Set `width` and `height`**: Prevent layout shifts.
3.  **Use `sizes` attribute**: For responsive images.
4.  **Set `priority={true}` or `isCritical={true}`**: For above-the-fold images.
5.  **Use appropriate quality settings**: `quality={75}` (default), `quality={85}` (high-quality), `quality={60}` (background).

## Performance Benefits

-   **Smaller file sizes**: AVIF reduces file size significantly.
-   **Better quality**: AVIF offers improved quality at smaller sizes.
-   **Automatic format selection**: Browser receives the most efficient supported format.
-   **Lazy loading**: Images load only when in viewport.
-   **Prevents layout shifts**: Achieved by setting `width` and `height`.

## Browser Support

-   **AVIF**: Chrome 85+, Firefox 93+, Edge 92+.
-   **WebP**: All modern browsers.
-   **JPEG/PNG**: All browsers (fallback).

## Troubleshooting

If images are not loading or performance is slow:

1.  Verify correct image path.
2.  Ensure `width` and `height` are set correctly.
3.  For critical images, set `priority={true}`.
4.  For CSS background images, consider `getAvifPath` utility.
