# Component Templates

This directory contains standardized templates for creating new components in the project.

## Usage

When creating a new component, you can use these templates as a starting point to ensure consistency across the codebase.

### StandardComponent

Use this template for creating new desktop components:

```tsx
import { memo } from "react";

interface YourComponentProps {
  // Define your props here
}

/**
 * YourComponent
 * 
 * Description of your component
 */
const YourComponent = memo(function YourComponent(props: YourComponentProps) {
  return (
    // Your component JSX
  );
});

export default YourComponent;
```

### MobileStandardComponent

Use this template for creating new mobile-specific components:

```tsx
import { memo } from "react";

interface MobileYourComponentProps {
  // Define your props here
}

/**
 * MobileYourComponent
 * 
 * Description of your mobile component
 */
const MobileYourComponent = memo(function MobileYourComponent(props: MobileYourComponentProps) {
  return (
    // Your mobile component JSX
  );
});

export default MobileYourComponent;
```

## Best Practices

1. Always use the `memo` function to prevent unnecessary re-renders
2. Use descriptive interface names for props
3. Include a JSDoc comment describing the component
4. Use PascalCase for component names
5. Export the component as default
6. Keep components focused on a single responsibility
7. Separate mobile components from desktop components
