# Components

This directory contains all the React components used in the application. The components are organized by their purpose and functionality.

## Directory Structure

- **events/**: Components for the events page
- **home/**: Components for the homepage
- **layout/**: Layout components used across multiple pages
- **menu/**: Components for the menu pages
- **mobile/**: Mobile-specific components
- **pages/**: Page-specific client components
- **performance/**: Performance optimization components
- **reservations/**: Components for the reservations page
- **templates/**: Component templates for creating new components
- **ui/**: Reusable UI components

## Component Guidelines

### Naming Conventions

- Use PascalCase for component names (e.g., `Button.tsx`, `Navigation.tsx`)
- Use descriptive names that reflect the component's purpose
- Prefix mobile-specific components with "Mobile" (e.g., `MobileNavigation.tsx`)

### Component Structure

All components should follow this structure:

```tsx
"use client";

import { memo } from "react";
import { SomeProps } from "@/types/common";

interface ComponentNameProps extends SomeProps {
  // Component-specific props
}

/**
 * ComponentName
 * 
 * Description of the component's purpose and functionality.
 * 
 * @param {ComponentNameProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
const ComponentName = memo(function ComponentName({
  // Destructured props with default values
}: ComponentNameProps) {
  // Component logic

  return (
    // JSX
  );
});

export default ComponentName;
```

### Best Practices

1. **Use memo for Performance**: Wrap components with `memo` to prevent unnecessary re-renders.

2. **Use TypeScript**: Define proper interfaces for component props.

3. **Use JSDoc Comments**: Document the component's purpose, props, and return value.

4. **Keep Components Focused**: Each component should have a single responsibility.

5. **Handle Errors**: Use error boundaries to catch and handle errors gracefully.

6. **Optimize for Performance**: Use performance optimization techniques like lazy loading.

7. **Separate Mobile Components**: Create separate components for mobile devices when necessary.

8. **Use Reusable Components**: Extract common UI elements into reusable components.

9. **Test Components**: Write tests for components to ensure they work correctly.

10. **Document Components**: Add comments and documentation to explain complex logic.

## Component Categories

### Layout Components

Layout components provide the overall structure for pages:

- **PageLayout**: A shared layout component that includes navigation and footer.

### UI Components

UI components are reusable elements used across the application:

- **Button**: A customizable button component.
- **ErrorBoundary**: A component that catches errors in its children.
- **Loading**: A loading spinner component.

### Page Components

Page components are specific to certain pages:

- **HomePage**: The main homepage component.
- **MenuPage**: The main menu page component.
- **EventsPage**: The main events page component.
- **ReservationsPage**: The main reservations page component.

### Mobile Components

Mobile components are specifically optimized for mobile devices:

- **MobileClassProvider**: Provides mobile-specific functionality.
- **MobileNavigation**: Mobile-specific navigation component.
- **MobileButton**: Mobile-optimized button component.

### Performance Components

Performance components handle performance optimization:

- **ClientPerformanceMonitor**: Monitors client-side performance metrics.
- **ClientPerformanceWrapper**: Wraps performance monitoring components.
- **PreloadLinks**: Preloads critical resources.

## Using Components

### Importing Components

```tsx
import ComponentName from "@/components/path/to/ComponentName";
```

### Using Components

```tsx
<ComponentName prop1="value1" prop2="value2" />
```

### Conditional Rendering

```tsx
{condition && <ComponentName />}
```

### Rendering Lists

```tsx
{items.map((item) => (
  <ComponentName key={item.id} item={item} />
))}
```

### Using with Hooks

```tsx
const { data } = useHook();
return <ComponentName data={data} />;
```

## Creating New Components

1. Use the component templates in the `templates/` directory as a starting point.
2. Follow the component structure and guidelines.
3. Add the component to the appropriate directory.
4. Import and use the component where needed.
5. Write tests for the component.
6. Document the component with JSDoc comments.
