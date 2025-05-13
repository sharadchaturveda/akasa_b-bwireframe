# Akasa Restaurant Website Refactoring Plan

## Overview

This document outlines the comprehensive refactoring plan for the Akasa Restaurant website codebase. The goal is to improve readability, maintainability, and modularity without changing the layout, appearance, or functionality of the site on any screen size.

## High-Level Goals

- Break large components into smaller, reusable, well-named parts
- Move inline logic or duplicate structures into utility functions or custom hooks
- Rename ambiguous variables, props, or files for clarity
- Use consistent folder structure and naming conventions
- Remove dead code, unused imports, and redundant state
- Group related components logically (e.g., by feature or layout)
- Extract Tailwind class sets into reusable class helpers or components if repeated

## Mobile-First Awareness

- Ensure all changes preserve the current mobile layout as top priority
- Verify that the desktop layout remains unchanged
- Do not adjust breakpoints, spacing, or visual structure unless absolutely necessary

## Refactoring Approach

### 1. Component Structure Improvements

#### Navigation Components

- **MobileNavigation.tsx**:
  - Extract inline styles to constants or Tailwind classes
  - Move the style injection logic to a separate utility function
  - Improve prop typing and documentation

- **NavigationBase.tsx**:
  - Enhance type definitions
  - Add proper JSDoc comments

- **HamburgerButton.tsx**:
  - Extract style constants to a separate file
  - Improve accessibility attributes

- **MobileMenuOverlay.tsx**:
  - Enhance animation handling
  - Improve semantic HTML structure

#### Layout Components

- **PageLayout.tsx**:
  - Ensure consistent error boundary usage
  - Add performance optimizations

#### UI Components

- **Logo.tsx**:
  - Extract size configurations to constants
  - Improve image loading strategy

### 2. Hooks Refactoring

- **useNavigationState.ts**:
  - Split into smaller, focused hooks
  - Improve scroll performance handling
  - Add proper error handling

- **useDeviceDetection.ts**:
  - Enhance detection logic
  - Add caching mechanism

- **useScrollPosition.ts**:
  - Optimize performance
  - Add throttling options

### 3. Utility Functions

- **Create new utility files**:
  - `navigationUtils.ts` for navigation-specific utilities
  - `styleUtils.ts` for style-related utilities
  - `domUtils.ts` for DOM manipulation utilities

- **Enhance existing utilities**:
  - Improve type safety
  - Add comprehensive documentation

### 4. Constants Organization

- **Reorganize constants**:
  - Group related constants
  - Add proper typing
  - Improve naming conventions

### 5. Type Definitions

- **Create dedicated type files**:
  - `navigationTypes.ts` for navigation-related types
  - `componentTypes.ts` for shared component types

- **Enhance existing types**:
  - Add proper JSDoc comments
  - Ensure consistency across the codebase

## Implementation Plan

### Phase 1: Analysis and Preparation

1. Identify large components (>100 lines)
2. Map component dependencies
3. Identify duplicate code patterns
4. Document current behavior for verification

### Phase 2: Core Refactoring

1. Refactor navigation components
2. Refactor hooks
3. Create utility functions
4. Reorganize constants
5. Enhance type definitions

### Phase 3: Testing and Verification

1. Verify mobile layouts
2. Verify desktop layouts
3. Test interactive elements
4. Ensure performance is maintained or improved

## Components to Refactor

1. **Navigation Components**:
   - MobileNavigation.tsx
   - NavigationBase.tsx
   - HamburgerButton.tsx
   - MobileMenuOverlay.tsx

2. **Layout Components**:
   - PageLayout.tsx
   - Footer.tsx
   - Header.tsx

3. **Home Page Components**:
   - HeroSection.tsx
   - BrandPhilosophy.tsx
   - SpicesSection.tsx
   - GallerySection.tsx
   - WhatsHappeningSection.tsx

4. **Menu Components**:
   - MenuCard.tsx
   - MenuSection.tsx
   - MenuNavigation.tsx

5. **Events Components**:
   - EventCard.tsx
   - EventsSection.tsx

6. **Offers Components**:
   - OfferCard.tsx
   - OffersSection.tsx

7. **Reservation Components**:
   - ReservationForm.tsx
   - DiningInfo.tsx

## Hooks to Refactor

1. useNavigationState.ts
2. useDeviceDetection.ts
3. useScrollPosition.ts
4. useDisableOptimizations.ts (mark as deprecated)

## Utilities to Create/Refactor

1. styleUtils.ts
2. navigationUtils.ts
3. domUtils.ts
4. imageUtils.ts
5. performanceUtils.ts

## Constants to Reorganize

1. navigation.ts
2. layout.ts
3. breakpoints.ts
4. colors.ts
5. images.ts
6. performance.ts

## Success Criteria

- No visual changes to the website on any screen size
- Improved code organization and readability
- Reduced component size (aim for <100 lines per component)
- Consistent naming conventions and documentation
- Improved type safety
- Maintained or improved performance
