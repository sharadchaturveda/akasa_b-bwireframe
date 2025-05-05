# Component Documentation Template

This file provides a template for documenting components in the Akasa website project. Use this template when creating new components or updating existing ones.

## File Header Template

```typescript
/**
 * ComponentName Component
 *
 * Brief description of what this component does and where it's used.
 * Include any important context or usage notes.
 *
 * @example
 * // Basic usage
 * <ComponentName prop1="value" prop2={value} />
 *
 * // With all props
 * <ComponentName
 *   prop1="value"
 *   prop2={value}
 *   optionalProp="optional value"
 * />
 */
```

## Interface/Type Documentation Template

```typescript
/**
 * Props for the ComponentName component
 */
interface ComponentNameProps {
  /**
   * Description of what this prop does
   * @required
   */
  prop1: string;
  
  /**
   * Description of what this prop does
   * Include any constraints or special considerations
   * @required
   */
  prop2: number;
  
  /**
   * Description of what this optional prop does
   * @default defaultValue
   */
  optionalProp?: boolean;
  
  /**
   * Description of what this callback does
   * Include when it's called and what parameters are passed
   */
  onSomeEvent?: (param: EventType) => void;
  
  /**
   * Additional CSS classes to apply to the component
   */
  className?: string;
  
  /**
   * Child elements to render within the component
   */
  children?: React.ReactNode;
}
```

## Component Documentation Template

```typescript
/**
 * ComponentName Component
 *
 * Detailed description of the component's purpose and functionality.
 * Include information about:
 * - When to use this component
 * - Any important design considerations
 * - Any performance considerations
 * - Mobile-specific behavior if applicable
 *
 * @param {ComponentNameProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
export default function ComponentName({
  prop1,
  prop2,
  optionalProp = defaultValue,
  onSomeEvent,
  className = "",
  children
}: ComponentNameProps): JSX.Element {
  // Component implementation
}
```

## Function Documentation Template

```typescript
/**
 * Function name
 *
 * Description of what this function does.
 * Include any important details about the implementation.
 *
 * @param {ParamType} paramName - Description of the parameter
 * @returns {ReturnType} Description of the return value
 */
function functionName(paramName: ParamType): ReturnType {
  // Function implementation
}
```

## Hook Documentation Template

```typescript
/**
 * Custom hook name
 *
 * Description of what this hook does and when to use it.
 * Include any important details about the implementation.
 *
 * @param {ParamType} paramName - Description of the parameter
 * @returns {ReturnType} Description of the return value and its properties
 *
 * @example
 * // Basic usage
 * const result = useHookName(param);
 */
function useHookName(paramName: ParamType): ReturnType {
  // Hook implementation
}
```

## Layout Decision Documentation

When making layout decisions, document them with comments:

```typescript
// Using asymmetric layout (40/60 split) for brand philosophy section
// as per design requirements
<div className="grid grid-cols-1 md:grid-cols-10">
  <div className="md:col-span-4">
    {/* Left content (40%) */}
  </div>
  <div className="md:col-span-6">
    {/* Right content (60%) */}
  </div>
</div>

// Mobile-specific layout adjustment
// On mobile, we stack these elements vertically instead of side-by-side
{isMobile ? (
  <MobileLayout />
) : (
  <DesktopLayout />
)}

// Performance optimization for image loading
// Using next/image for automatic optimization and responsive sizing
<Image
  src={imageSrc}
  alt={imageAlt}
  width={width}
  height={height}
  priority={isPriority} // Set to true for above-the-fold images
  loading={isPriority ? undefined : "lazy"} // Lazy load below-the-fold images
/>
```

## Mobile-Specific Documentation

When implementing mobile-specific code, document the reasoning:

```typescript
// Completely separate mobile implementation to ensure optimal mobile experience
// This follows our mobile-first design strategy
if (isMobile) {
  return <MobileComponent />;
}

// Disable hover effects on mobile to prevent sticky hover states
// and improve performance
const hoverClass = isMobile ? "" : "hover:bg-blue-600";

// Adjust touch targets for better mobile usability
// Minimum size of 44x44px as per accessibility guidelines
const buttonSize = isMobile ? "min-h-[44px] min-w-[44px]" : "";
```

## Example Component with Documentation

```typescript
/**
 * Button Component
 *
 * A reusable button component with various styles and states.
 * This component is used throughout the application for user interactions.
 *
 * @example
 * // Primary button
 * <Button variant="primary">Click me</Button>
 *
 * // Secondary button with onClick handler
 * <Button variant="secondary" onClick={handleClick}>Click me</Button>
 */

import { memo } from 'react';
import { cn } from '@/utils/classNames';

/**
 * Props for the Button component
 */
interface ButtonProps {
  /**
   * The button content
   * @required
   */
  children: React.ReactNode;
  
  /**
   * The button variant that determines its appearance
   * @default "primary"
   */
  variant?: 'primary' | 'secondary' | 'outline';
  
  /**
   * Additional CSS classes to apply to the button
   */
  className?: string;
  
  /**
   * Function to call when the button is clicked
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  
  /**
   * Whether the button is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * The type of the button
   * @default "button"
   */
  type?: 'button' | 'submit' | 'reset';
}

/**
 * Button Component
 *
 * A reusable button component with various styles and states.
 * The button has rounded corners and different visual styles based on the variant.
 * On mobile, the button has larger touch targets and disabled hover effects.
 *
 * @param {ButtonProps} props - The component props
 * @returns {JSX.Element} The rendered button
 */
const Button = memo(function Button({
  children,
  variant = 'primary',
  className = '',
  onClick,
  disabled = false,
  type = 'button'
}: ButtonProps): JSX.Element {
  // Determine the base classes based on the variant
  const baseClasses = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    outline: 'bg-transparent border border-blue-500 text-blue-500 hover:bg-blue-50'
  };
  
  // Common classes for all button variants
  const commonClasses = 'px-4 py-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300';
  
  return (
    <button
      type={type}
      className={cn(
        commonClasses,
        baseClasses[variant],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
});

export default Button;
```

## Conclusion

Following these documentation standards ensures that all components are well-documented and easy to understand for new developers joining the project. Consistent documentation also makes maintenance easier and helps prevent bugs caused by misunderstanding component behavior.
