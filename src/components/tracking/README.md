# Tracking Components

This directory contains components related to analytics and tracking implementations for the Akasa website.

## Available Components

### FacebookPixel

The `FacebookPixel` component implements the Facebook Pixel tracking code for the website. It uses the Next.js `Script` component to load the Facebook Pixel script with the `afterInteractive` strategy.

```tsx
import FacebookPixel from "@/components/tracking/FacebookPixel";

// Use in layout or _app.tsx
<FacebookPixel />
```

#### Configuration

- **Pixel ID**: 1062892492087271
- **Loading Strategy**: afterInteractive (loads after the page becomes interactive)
- **Events**: Automatically tracks PageView events

## Implementation Details

The tracking components are implemented in a way that:

1. Minimizes performance impact by using appropriate loading strategies
2. Works with both App Router and Pages Router
3. Follows best practices for analytics implementation
4. Includes fallbacks for users with JavaScript disabled (where applicable)

## Adding New Tracking Components

When adding new tracking components:

1. Create a new file in this directory
2. Use the `'use client'` directive for client-side components
3. Use the Next.js `Script` component for loading external scripts
4. Document the component in this README
5. Add the component to the appropriate layout or app file
