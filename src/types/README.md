# Types

This directory contains TypeScript type definitions used throughout the application. These types provide a consistent way to define the shape of data and props.

## Available Types

### Common Types

Located in `common.ts`, these types are used across the application:

```tsx
import { BaseComponentProps, WithChildrenProps, ImageProps } from "@/types/common";

// Define component props
interface YourComponentProps extends BaseComponentProps {
  // Component-specific props
}

// Define component props with children
interface YourContainerProps extends WithChildrenProps {
  // Container-specific props
}

// Define image props
interface YourImageProps extends ImageProps {
  // Image-specific props
}
```

## Type Guidelines

### Naming Conventions

- Use PascalCase for interface and type names (e.g., `BaseComponentProps`, `ImageProps`).
- Use descriptive names that reflect the type's purpose.
- Suffix interfaces for component props with `Props` (e.g., `ButtonProps`).
- Suffix interfaces for hook results with `Result` (e.g., `DeviceDetectionResult`).

### Type Structure

All types should follow this structure:

```tsx
/**
 * Interface/Type name and description
 * 
 * Detailed description of the interface/type's purpose.
 */
export interface InterfaceName {
  /** Property description */
  property1: PropertyType;
  /** Property description */
  property2?: OptionalPropertyType;
}
```

### Best Practices

1. **Use Interfaces for Objects**: Use interfaces for objects with a specific shape.

2. **Use Type Aliases for Unions and Intersections**: Use type aliases for union types and intersection types.

3. **Document Types**: Add JSDoc comments to explain the purpose of types and properties.

4. **Use Optional Properties**: Use the `?` suffix for optional properties.

5. **Use Readonly Properties**: Use the `readonly` modifier for properties that should not be modified.

6. **Extend Interfaces**: Use interface extension to build on existing interfaces.

7. **Use Generics**: Use generics to create reusable types.

8. **Export Types**: Export types as named exports, not default exports.

9. **Group Related Types**: Group related types in the same file.

10. **Use Type Guards**: Use type guards to narrow types at runtime.

## Creating New Types

1. Create a new file in the `types/` directory with a descriptive name (e.g., `newTypes.ts`).
2. Follow the type structure and guidelines.
3. Export the types as named exports.
4. Import and use the types where needed.
5. Document the types with JSDoc comments.

## Using Types

### Importing Types

```tsx
import { TypeName } from "@/types/fileName";
```

### Using Types for Props

```tsx
interface ComponentProps extends BaseComponentProps {
  // Component-specific props
}

function Component(props: ComponentProps) {
  // Component logic
}
```

### Using Types for State

```tsx
interface ComponentState {
  // State properties
}

const [state, setState] = useState<ComponentState>({
  // Initial state
});
```

### Using Types for Functions

```tsx
function functionName(param: ParamType): ReturnType {
  // Function logic
}
```

### Using Type Guards

```tsx
function isType(value: unknown): value is TypeName {
  return (value as TypeName).property !== undefined;
}
```
