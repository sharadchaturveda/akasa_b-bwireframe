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

Pages are typically React components, often wrapped in `PageLayout`. Client components use `"use client";` directive.

## Layout Structure

Layouts are React components that wrap child content (`{children}`).

## Page Guidelines

### Naming Conventions

- Use `page.tsx` for page components.
- Use `layout.tsx` for layout components.
- Use `loading.tsx` for loading components.
- Use `error.tsx` for error components.
- Use `not-found.tsx` for not found components.

### Best Practices

1.  **Server Components**: Use Server Components when possible (rendered on the server, no client-side JavaScript).
2.  **Client Components**: Use `"use client"` directive for client-side logic.
3.  **Layouts**: Use layouts for shared UI.
4.  **Loading Components**: Add `loading.tsx` for loading states.
5.  **Error Components**: Add `error.tsx` to handle errors.
6.  **Not Found Components**: Add `not-found.tsx` to handle 404 errors.
7.  **Page Simplicity**: Keep pages simple; move complex logic to components.
8.  **TypeScript**: Define proper types for props and state.
9.  **Documentation**: Add JSDoc comments to explain page purpose.
10. **PageLayout**: Use `PageLayout` for consistent page structure.

## Creating New Pages

1.  Create a new directory in `app/` (e.g., `newPage/`).
2.  Create a `page.tsx` file within the new directory.
3.  Follow page structure and guidelines.
4.  Add to navigation if needed.

## Using Layouts

### Root Layout

The root layout is defined in `app/layout.tsx` and applies to all pages.

### Nested Layouts

Nested layouts can be defined in subdirectories (e.g., `app/menu/layout.tsx`).

## Using Loading States

Add a `loading.tsx` file (e.g., `app/menu/loading.tsx`) to show a loading state for a route segment.

## Using Error Handling

Add an `error.tsx` file (e.g., `app/menu/error.tsx`) to handle errors within a route segment.

## Using Not Found Handling

Add a `not-found.tsx` file (e.g., `app/menu/not-found.tsx`) to handle 404 errors for a route segment.
