# App Directory

This directory contains the Next.js App Router pages and layouts. The App Router is a new routing system introduced in Next.js 13 that uses React Server Components by default.

## Directory Structure

- **chef/**: Chef page
- **events/**: Events page
- **menu/**: Menu pages
  - **a-la-carte/**: À la carte menu page
  - **bar-bites/**: Bar bites menu page
  - **drinks/**: Drinks menu page
  - **set-lunch/**: Set lunch menu page
  - **soul-food-weekends/**: Soul food weekends menu page
- **offers/**: Offers page
- **reservations/**: Reservations page
- **globals.css**: Global CSS
- **layout.tsx**: Root layout
- **loading.tsx**: Loading component
- **not-found.tsx**: Not found page
- **page.tsx**: Home page

## Page Structure

Each page should follow this structure:

```tsx
// For client components
"use client";

import { useEffect, useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { useDeviceDetection } from "@/hooks/useDeviceDetection";

/**
 * PageName Component
 * 
 * Description of the page's purpose.
 * 
 * @returns {JSX.Element} The rendered page
 */
export default function PageName() {
  // Page logic
  const { isMobile, isDetectionComplete } = useDeviceDetection();

  // Show loading state if device detection is not complete
  if (!isDetectionComplete) {
    return <Loading text="Loading..." />;
  }

  return (
    <PageLayout>
      {/* Page content */}
    </PageLayout>
  );
}
```

## Layout Structure

Layouts should follow this structure:

```tsx
import { ReactNode } from "react";

/**
 * LayoutName Component
 * 
 * Description of the layout's purpose.
 * 
 * @param {Object} props - The component props
 * @param {ReactNode} props.children - The content to render inside the layout
 * @returns {JSX.Element} The rendered layout
 */
export default function LayoutName({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div>
      {/* Layout content */}
      {children}
    </div>
  );
}
```

## Page Guidelines

### Naming Conventions

- Use `page.tsx` for page components.
- Use `layout.tsx` for layout components.
- Use `loading.tsx` for loading components.
- Use `error.tsx` for error components.
- Use `not-found.tsx` for not found components.

### Best Practices

1. **Use Server Components When Possible**: Server Components are rendered on the server and don't include client-side JavaScript.

2. **Use "use client" for Client Components**: Add the "use client" directive at the top of files that need to run on the client.

3. **Use Layouts for Shared UI**: Use layouts to share UI between pages.

4. **Use Loading Components**: Add loading components to show loading states.

5. **Use Error Components**: Add error components to handle errors.

6. **Use Not Found Components**: Add not found components to handle 404 errors.

7. **Keep Pages Simple**: Move complex logic to components.

8. **Use TypeScript**: Define proper types for props and state.

9. **Document Pages**: Add JSDoc comments to explain the purpose of pages.

10. **Use the PageLayout Component**: Use the PageLayout component for consistent page structure.

## Creating New Pages

1. Create a new directory in the `app/` directory with the page name (e.g., `newPage/`).
2. Create a `page.tsx` file in the new directory.
3. Follow the page structure and guidelines.
4. Add the page to the navigation if necessary.

## Using Layouts

### Root Layout

The root layout is defined in `app/layout.tsx` and applies to all pages:

```tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
```

### Nested Layouts

Nested layouts can be defined in subdirectories:

```tsx
// app/menu/layout.tsx
export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <nav>Menu Navigation</nav>
      {children}
    </div>
  );
}
```

## Using Loading States

Add a `loading.tsx` file to show a loading state:

```tsx
// app/menu/loading.tsx
import Loading from "@/components/ui/Loading";

export default function MenuLoading() {
  return <Loading text="Loading menu..." />;
}
```

## Using Error Handling

Add an `error.tsx` file to handle errors:

```tsx
// app/menu/error.tsx
"use client";

import { useEffect } from "react";

export default function MenuError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

## Using Not Found Handling

Add a `not-found.tsx` file to handle 404 errors:

```tsx
// app/menu/not-found.tsx
export default function MenuNotFound() {
  return (
    <div>
      <h2>Menu not found</h2>
      <p>The menu you're looking for doesn't exist.</p>
    </div>
  );
}
```
