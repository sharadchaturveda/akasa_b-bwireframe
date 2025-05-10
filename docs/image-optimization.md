# Image Optimization Guide

This document explains the image optimization strategy used in the Akasa website project.

## Overview

The website uses Next.js built-in image optimization to automatically serve images in the most efficient format based on browser support. The priority order is:

1. AVIF (best compression, smaller file sizes)
2. WebP (good compression, wide support)
3. Original format (JPEG/PNG as fallback)

## Implementation

### Next.js Configuration

The `next.config.js` file is configured to prioritize AVIF format:

```js
images: {
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [320, 420, 640, 768, 1024, 1280, 1536, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512, 1024, 2048],
  dangerouslyAllowSVG: true,
  contentDispositionType: 'attachment',
  minimumCacheTTL: 60,
},
```

### Optimization Utilities

The `src/utils/imageOptimization.ts` file provides utilities for optimizing images:

```typescript
// Get optimized image props for Next.js Image component
export function getOptimizedImageProps({
  src,
  quality = 75,
  priority = false,
}) {
  return {
    src,
    quality,
    priority,
    unoptimized: false,
  };
}
```

### OptimizedImage Component

The `src/components/ui/OptimizedImage.tsx` component is a wrapper around Next.js Image component that:

- Uses Next.js built-in image optimization for AVIF format
- Shows a placeholder while the image is loading
- Handles loading state and errors
- Optimizes image loading based on priority

## Usage

### Basic Usage

```tsx
import OptimizedImage from '@/components/ui/OptimizedImage';

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

1. **Use the OptimizedImage component** for all images to ensure consistent optimization.

2. **Set appropriate width and height** to prevent layout shifts.

3. **Use the `sizes` attribute** for responsive images:

   ```tsx
   <OptimizedImage
     src="/images/example.jpg"
     alt="Example"
     width={1200}
     height={800}
     sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
   />
   ```

4. **Set `priority={true}` or `isCritical={true}`** for above-the-fold images.

5. **Use appropriate quality settings**:
   - `quality={75}` for most images (default)
   - `quality={85}` for high-quality images where detail is important
   - `quality={60}` for background images where quality is less critical

## Performance Benefits

- **Smaller file sizes**: AVIF typically reduces file size by 50% compared to JPEG.
- **Better quality**: AVIF provides better quality at the same file size.
- **Automatic format selection**: The browser gets the best format it supports.
- **Lazy loading**: Images are loaded only when they enter the viewport.
- **Prevents layout shifts**: By setting width and height attributes.

## Browser Support

- **AVIF**: Chrome 85+, Firefox 93+, Edge 92+
- **WebP**: All modern browsers
- **JPEG/PNG**: All browsers (fallback)

## Troubleshooting

If images are not loading or performance is slow:

1. Check that the image path is correct
2. Verify that the width and height are set correctly
3. For critical images, set `priority={true}`
4. For background images in CSS, consider using the `getAvifPath` utility
