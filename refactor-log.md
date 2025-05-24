# Refactoring Log

This document summarizes the refactoring changes made to the Akasa Restaurant website codebase. The goal was to improve code readability, maintainability, and modularity without changing the layout, appearance, or functionality of the site.

## Refactoring Approach

The refactoring followed these principles:

1. **Visual Integrity First**: No changes to layout, style, or visual output on mobile or desktop
2. **Functionality is Sacred**: No removal, renaming, or modification of props, state, or hooks in use
3. **Structural Refactors Only if Proven Safe**: Extract logic, hooks, and components only if behavior remains unchanged
4. **No File Deletion Without Traceability**: Code marked as unused is preserved for reference

## Files Refactored

### 1. MobileVideoWithAudio.tsx

-   **After Refactoring**: Video styles and sources extracted to constants. Uses existing utility functions from `videoUtils.ts`. Improved error handling with `logVideoError`.

### 2. MobileNavigation.tsx

-   **After Refactoring**: Header styles extracted to constants. Uses `injectMobileNavStyles` utility from `navigationUtils.ts`. Added JSDoc documentation. Improved component organization.

### 3. useNavigationState.ts

-   **After Refactoring**: Uses `trackScrollPosition` and `preventBodyScrolling` utilities from `scrollUtils.ts`. Added JSDoc documentation. Simplified code with better separation of concerns.

### 4. DesktopHero.tsx

-   **After Refactoring**: Hero images extracted to `heroConstants.ts`. Text shadow style and carousel settings extracted to constants. Improved component organization.

### 5. MenusSection.tsx

-   **After Refactoring**: Split into smaller components (`DesktopMenuCard.tsx`, `MobileMenuCard.tsx`). Menu data extracted to `menuConstants.ts`. Device detection and click handling logic extracted to `menuUtils.ts`. Improved component organization, readability, and added JSDoc documentation.

### 6. ChefSection.tsx

-   **After Refactoring**: Split into smaller components (`ChefBackground.tsx`, `ChefPortrait.tsx`, `ChefBio.tsx`, `DecorativeSpice.tsx`). Chef data extracted to `chefConstants.ts`. Reusable LCP optimization utility created in `lcpUtils.ts`. Improved component organization, readability, and added JSDoc documentation. Enhanced performance optimization.

## New Files Created

1. **src/constants/heroConstants.ts**: Constants for hero sections
2. **src/constants/menuConstants.ts**: Constants for menu sections
3. **src/constants/chefConstants.ts**: Constants for chef section
4. **src/utils/menuUtils.ts**: Utilities for menu functionality
5. **src/utils/lcpUtils.ts**: Utilities for LCP optimization
6. **src/components/menu/DesktopMenuCard.tsx**: Component for desktop menu cards
7. **src/components/menu/MobileMenuCard.tsx**: Component for mobile menu cards
8. **src/components/menu/ChefBackground.tsx**: Component for chef section background
9. **src/components/menu/ChefPortrait.tsx**: Component for chef portrait
10. **src/components/menu/ChefBio.tsx**: Component for chef biography
11. **src/components/menu/DecorativeSpice.tsx**: Component for decorative spice SVG

## Existing Files Enhanced

1. **src/utils/scrollUtils.ts**: Added scroll position tracking and body scroll prevention utilities
2. **src/utils/videoUtils.ts**: Used existing utilities for video handling
3. **src/utils/navigationUtils.ts**: Used existing utilities for navigation

## Benefits of Refactoring

1. **Improved Code Organization**: Related code is now grouped together
2. **Better Separation of Concerns**: UI components focus on rendering, utilities handle logic
3. **Enhanced Maintainability**: Constants and utilities can be reused across components
4. **Improved Documentation**: Added JSDoc comments for better code understanding
5. **Reduced Duplication**: Extracted repeated patterns into reusable utilities
6. **Smaller Components**: Easier to understand and maintain
7. **Better Type Safety**: Improved TypeScript interfaces and type definitions

## Visual Verification

All refactored components maintain the exact same visual appearance and functionality.

## Bug Fixes

### 1. Desktop Hero Logo Issue
-   Fixed logo display in `DesktopHero.tsx` by replacing dynamic `className` with hardcoded values.

### 2. Mobile Video Error Handling
-   Improved error handling for mobile video playback, including power-saving mode errors.
-   Added visibility state detection to prevent unnecessary error logging.
-   Enhanced retry logic for playback resumption.

### 3. Hydration Error Fixes
-   Fixed hydration errors in `GalleryImage` and `DesktopGallery` components using a robust approach (e.g., `useRef` for mounted state, consistent initial HTML, `suppressHydrationWarning`).
-   Added `suppressHydrationWarning` to `LocationSection` image.
-   Removed dynamic styles causing hydration mismatches.
-   Fixed missing `useRef` import.
-   Fixed Next.js image aspect ratio warning by using explicit `width`/`height` props with `height: 'auto'`.

### 4. Quandoo Reservation Widget Fix
-   Fixed console errors related to OneTrust cookie banner in the Quandoo reservation widget.
-   Added proper sandbox permissions to the iframe.
-   Added `loading="lazy"` attribute for performance.

## Next Steps

1. Continue refactoring other large components using the same approach
2. Extract more common patterns into utilities
3. Improve test coverage for refactored components
4. Document the refactoring patterns for future reference
