# Hydration Error Fixes

This document summarizes the changes made to fix hydration errors in the website.

## What are Hydration Errors?

Hydration errors occur when the HTML generated on the server doesn't match what React tries to render on the client. This can happen for several reasons:

1. Client-side JavaScript modifying the DOM before React hydration is complete
2. Using client-side only attributes or properties
3. Using variable input like `Date.now()` or `Math.random()`
4. Conditional rendering based on client-side only information (like `window` or `document`)

## Changes Made

### 1. Updated `HeroSection.tsx` Component

- Replaced the standard Next.js `Image` component with `HydrationSafeImage` component
- Removed client-side only attributes that were causing hydration mismatches
- Added proper `style` object with `objectFit` property

```tsx
// Before
<Image
  src="/images/reservations/hero/hero.jpg"
  alt="Elegant dining table setting"
  fill
  priority
  className="object-cover"
  sizes="100vw"
  quality={80}
/>

// After
<HydrationSafeImage
  src="/images/reservations/hero/hero.jpg"
  alt="Elegant dining table setting"
  fill
  priority
  className="object-cover"
  sizes="100vw"
  quality={80}
  style={{
    objectFit: 'cover',
  }}
/>
```

### 2. Updated Performance Optimization Script

- Modified the image selector to exclude Next.js Image components:
  ```js
  // Before
  imageSelector: 'img:not([data-no-optimization])',
  
  // After
  imageSelector: 'img:not([data-no-optimization]):not([data-nimg])',
  ```

- Delayed script initialization to allow React hydration to complete:
  ```js
  // Before
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }
  
  // After
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(initialize, 500);
    });
  } else {
    setTimeout(initialize, 500);
  }
  ```

### 3. Updated Mobile Video Autoplay Script

- Delayed script initialization to avoid hydration issues:
  ```js
  // Before
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ensureMobileVideoAutoplay);
  } else {
    ensureMobileVideoAutoplay();
  }
  
  // After
  const initWithDelay = () => {
    setTimeout(ensureMobileVideoAutoplay, 500);
  };
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWithDelay);
  } else {
    initWithDelay();
  }
  ```

- Delayed mutation observer callbacks to avoid conflicts with React hydration:
  ```js
  // Before
  if (hasNewVideos) {
    ensureMobileVideoAutoplay();
  }
  
  // After
  if (hasNewVideos) {
    setTimeout(ensureMobileVideoAutoplay, 100);
  }
  ```

## How These Changes Fix the Issues

1. **Using `HydrationSafeImage`**: This component ensures that client-side enhancements are only applied after hydration is complete, preventing mismatches between server and client rendering.

2. **Excluding Next.js Image Components**: By excluding Next.js Image components from our performance optimization script, we prevent it from modifying attributes that would cause hydration mismatches.

3. **Delaying Script Execution**: By delaying the execution of our scripts, we ensure that React hydration is complete before any DOM modifications are made.

## Testing the Changes

To verify that the hydration errors are fixed:

1. Clear your browser cache
2. Reload the page
3. Check the browser console for any hydration warnings or errors
4. Navigate to different pages to ensure the fix works across the site

## Additional Recommendations

1. **Use `suppressHydrationWarning`**: For components where hydration mismatches are expected and harmless, use the `suppressHydrationWarning` prop.

2. **Avoid Client-Side Only Attributes**: Avoid adding attributes or styles that are only available on the client side.

3. **Use `useEffect` for Client-Side Logic**: Always wrap client-side only logic in `useEffect` hooks to ensure it only runs after hydration.

4. **Consistent Initial Render**: Ensure the initial render is the same on both server and client by avoiding conditional rendering based on client-side only information.
