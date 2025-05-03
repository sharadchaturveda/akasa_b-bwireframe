# Hooks

This directory contains custom React hooks that can be reused across the application. Hooks are functions that let you "hook into" React state and lifecycle features from function components.

## Available Hooks

### useDeviceDetection

A hook for detecting mobile devices:

```tsx
import { useDeviceDetection } from "@/hooks/useDeviceDetection";

function YourComponent() {
  const { isMobile, isDetectionComplete } = useDeviceDetection();

  if (!isDetectionComplete) {
    return <Loading />;
  }

  return isMobile ? <MobileComponent /> : <DesktopComponent />;
}
```

#### Return Value

- `isMobile`: A boolean indicating whether the current device is a mobile device.
- `isDetectionComplete`: A boolean indicating whether the device detection has completed.

### useScrollPosition

A hook for tracking the scroll position of the page:

```tsx
import { useScrollPosition } from "@/hooks/useScrollPosition";

function YourComponent() {
  const { scrollY, isMounted } = useScrollPosition();

  return (
    <div style={{ opacity: scrollY > 100 ? 1 : 0 }}>
      Scroll position: {scrollY}
    </div>
  );
}
```

#### Return Value

- `scrollY`: The current vertical scroll position.
- `scrollX`: The current horizontal scroll position.
- `isMounted`: A boolean indicating whether the component is mounted.

## Hook Guidelines

### Naming Conventions

- Use the `use` prefix for all hook names (e.g., `useDeviceDetection`, `useScrollPosition`).
- Use descriptive names that reflect the hook's purpose.

### Hook Structure

All hooks should follow this structure:

```tsx
"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * Interface for the return value of the hook
 */
interface HookResult {
  // Return value properties
}

/**
 * Hook name and description
 *
 * Detailed description of the hook's purpose and functionality.
 *
 * @param {HookParams} params - The hook parameters
 * @returns {HookResult} The hook result
 *
 * @example
 * ```tsx
 * const result = useHook(params);
 * ```
 */
export function useHook(params): HookResult {
  // Hook logic

  return {
    // Return values
  };
}
```

## Best Practices

1. **Keep hooks focused on a single responsibility**: Each hook should do one thing and do it well.

2. **Use the `use` prefix for all hook names**: This is a React convention and helps identify hooks.

3. **Include TypeScript types for all parameters and return values**: This improves code quality and developer experience.

4. **Add JSDoc comments to explain the hook's purpose and usage**: This helps other developers understand how to use the hook.

5. **Handle cleanup in useEffect to prevent memory leaks**: Always return a cleanup function from useEffect when necessary.

6. **Use debouncing for event listeners that might fire frequently**: This improves performance.

7. **Export hooks as named exports, not default exports**: This makes it easier to import multiple hooks from the same file.

8. **Memoize functions with useCallback**: This prevents unnecessary re-renders.

9. **Memoize values with useMemo**: This prevents expensive recalculations.

10. **Handle errors gracefully**: Use try-catch blocks to handle errors.

## Creating New Hooks

1. Create a new file in the `hooks/` directory with the hook name (e.g., `useNewHook.ts`).
2. Follow the hook structure and guidelines.
3. Export the hook as a named export.
4. Import and use the hook where needed.
5. Write tests for the hook.
6. Document the hook with JSDoc comments.
