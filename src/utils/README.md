# Utilities

This directory contains utility functions that can be used throughout the application. These utilities provide common functionality that is not specific to any particular component or feature.

## Available Utilities

### Mobile Utilities

Located in `mobileUtils.ts`, these utilities handle mobile-specific functionality:

```tsx
import { isMobileDevice, optimizeImagesForMobile, debounce } from "@/utils/mobileUtils";

// Check if the device is mobile
const isMobile = isMobileDevice();

// Optimize images for mobile
optimizeImagesForMobile();

// Debounce a function
const debouncedFunction = debounce(() => {
  // Function logic
}, 250);
```

### Performance Monitoring

Located in `performanceMonitor.ts`, these utilities handle performance monitoring:

```tsx
import { initPerformanceMonitoring, monitorLCP, monitorCLS } from "@/utils/performanceMonitor";

// Initialize all performance monitoring
initPerformanceMonitoring();

// Monitor specific metrics
monitorLCP();
monitorCLS();
```

### Page Style Loading

Located in `loadPageStyles.ts`, these utilities handle loading page-specific styles:

```tsx
import { loadPageStyles, preloadPageStyles } from "@/utils/loadPageStyles";

// Load styles for the current page
loadPageStyles("home");

// Preload styles for pages that might be visited next
preloadPageStyles(["menu", "events"]);
```

## Utility Guidelines

### Naming Conventions

- Use camelCase for function names (e.g., `isMobileDevice`, `debounce`).
- Use descriptive names that reflect the function's purpose.
- Group related functions in the same file.

### Function Structure

All utility functions should follow this structure:

```tsx
/**
 * Function name and description
 * 
 * Detailed description of the function's purpose and functionality.
 * 
 * @param {ParamType} param - Description of the parameter
 * @returns {ReturnType} Description of the return value
 * 
 * @example
 * ```tsx
 * const result = functionName(param);
 * ```
 */
export function functionName(param: ParamType): ReturnType {
  // Function logic

  return result;
}
```

### Best Practices

1. **Use TypeScript**: Define proper types for function parameters and return values.

2. **Use JSDoc Comments**: Document the function's purpose, parameters, return value, and provide examples.

3. **Handle Errors**: Use try-catch blocks to handle errors gracefully.

4. **Keep Functions Pure**: When possible, make functions pure (no side effects).

5. **Keep Functions Focused**: Each function should have a single responsibility.

6. **Test Functions**: Write tests for functions to ensure they work correctly.

7. **Document Functions**: Add comments and documentation to explain complex logic.

8. **Export Functions**: Export functions as named exports, not default exports.

9. **Group Related Functions**: Group related functions in the same file.

10. **Use Constants**: Use constants for magic values.

## Creating New Utilities

1. Create a new file in the `utils/` directory with a descriptive name (e.g., `newUtils.ts`).
2. Follow the function structure and guidelines.
3. Export the functions as named exports.
4. Import and use the functions where needed.
5. Write tests for the functions.
6. Document the functions with JSDoc comments.

## Using Utilities

### Importing Utilities

```tsx
import { functionName } from "@/utils/fileName";
```

### Using Utilities

```tsx
const result = functionName(param);
```

### Combining Utilities

```tsx
import { functionA } from "@/utils/fileA";
import { functionB } from "@/utils/fileB";

const resultA = functionA(param);
const resultB = functionB(resultA);
```

### Error Handling

```tsx
try {
  const result = functionName(param);
} catch (error) {
  console.error("Error calling functionName:", error);
}
```
