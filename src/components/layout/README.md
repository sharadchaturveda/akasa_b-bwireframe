# Layout Components

This directory contains layout components that can be used to structure pages in the application.

## Available Layouts

### PageLayout

A shared layout component that includes the Navigation and Footer components:

```tsx
import PageLayout from "@/components/layout/PageLayout";

function YourPage() {
  return (
    <PageLayout className="your-page-class" withMobileOptimizer={true}>
      {/* Your page content */}
    </PageLayout>
  );
}
```

#### Props

- `children`: The content to render inside the layout
- `className`: Additional CSS classes to apply to the main element
- `withMobileOptimizer`: Whether to include the MobileOptimizer component (default: true)

## Best Practices

1. Use layout components to reduce duplication across pages
2. Keep layouts simple and focused on structure
3. Use props to customize the layout as needed
4. Include mobile optimizations in layouts when appropriate
5. Use semantic HTML elements for better accessibility
