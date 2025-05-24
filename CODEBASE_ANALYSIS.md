# Codebase Overview

## 1. Project Overview

*   **Technology Stack:**
    *   Next.js (React Framework)
    *   React (UI Library)
    *   TypeScript (Static Typing)
    *   Tailwind CSS (Utility-first CSS Framework)
*   **Purpose:**
    *   The project is the official website for Akasa Restaurant, an Indian fine-dining establishment.
    *   It provides information about the restaurant, showcases menus, handles inquiries, and highlights events.

## 2. Project Structure

*   **Key Directories:**
    *   `src/app`: Main application logic, Next.js App Router, and page components.
    *   `src/components`: Reusable UI components, organized by `common` (general-purpose), `layout` (page structure), and `ui` (feature-specific).
    *   `src/data`: Static data (menus, testimonials, events).
    *   `src/hooks`: Custom React hooks for reusable logic.
    *   `src/lib`: Utility functions and helper modules.
    *   `src/styles`: Global styles and Tailwind CSS base configuration.
    *   `public`: Static assets (images, fonts, favicons).
    *   `emails`: Email templates (e.g., inquiry confirmations).
*   **Routing Strategy:**
    *   Uses Next.js App Router, with routes defined by the directory structure in `src/app`.
    *   Dynamic routes use bracket notation (e.g., `src/app/blog/[slug]/page.tsx`).
*   **Key Configuration Files:**
    *   `next.config.js`: Configures Next.js behavior, including:
        *   `eslint.ignoreDuringBuilds`: `true` for production builds (ESLint errors won't fail the build).
        *   `typescript.ignoreBuildErrors`: `true` for production builds (TypeScript errors won't fail the build).
        *   `images`: Extensive configuration for image optimization (formats, sizes, remote patterns).
        *   `experimental.optimizeCss`: Enabled for CSS performance.
        *   `compiler.removeConsole`: Removes `console.*` calls in production (excluding `error` and `warn`).
        *   `webpack` customizations: Rules for image handling and chunk splitting optimization.
        *   **Redirect Rule:** Includes a redirect for `/blog/:slug*` to `https://blog.akasa.sg/blog/:slug*`.
    *   `tailwind.config.js`: Configures Tailwind CSS, including:
        *   `content`: Specifies files to scan for utility classes.
        *   `theme.extend`: Customizes the default Tailwind theme with project-specific design tokens.
    *   `tsconfig.json`: Configures TypeScript compiler options, including:
        *   `target`: "es5".
        *   `strict`: `true`.
        *   `moduleResolution`: "bundler".
        *   `plugins`: Includes `@ianvs/prettier-plugin-sort-imports`.
        *   `paths`: Defines path aliases (e.g., `@/*` maps to `src/*`).
    *   `.eslintrc.json`: Configures ESLint for code linting and style checking, including:
        *   Extends recommended ESLint and Next.js Core Web Vitals configurations.
        *   Includes TypeScript ESLint parser and plugins.
        *   Configures specific rules (e.g., `@typescript-eslint/no-explicit-any` is "warn").

## 3. Components

*   **Organization:** Components are organized into:
    *   `src/components/common`: Generic, reusable UI elements (e.g., `Button`, `Modal`).
    *   `src/components/layout`: Overall page structure components (e.g., `Header`, `Footer`).
    *   `src/components/ui`: Feature-specific UI elements (e.g., `MenuContent`, `HeroSection`).
*   **Key Components:**
    *   `src/app/layout.tsx`: Root layout, sets up HTML structure and global styles.
    *   `src/components/layout/PageLayout.tsx`: Wrapper for consistent page layout.
    *   `src/components/layout/Header.tsx`: Main navigation bar.
    *   `src/components/layout/Footer.tsx`: Site footer.
    *   `src/components/ui/HeroSection.tsx`: Prominent hero image/video with call to action.
    *   `src/components/common/Button.tsx`: General-purpose button.
    *   `src/components/ui/Menu/MenuCard.tsx`: Displays individual menu items.
    *   `src/app/(routes)/inquire/components/InquiryForm.tsx`: Handles inquiry form submissions.

## 4. Data Handling

*   **Static Data:** Stored in TypeScript files within `src/data` (e.g., `src/data/menu.ts`). Imported directly into components.
*   **Dynamic Data (Inquiry Form):**
    *   The inquiry form (`src/app/(routes)/inquire/components/InquiryForm.tsx`) collects user data.
    *   Data is sent to a Next.js API route (`src/app/api/inquire/route.ts`).
    *   The API route processes data and uses `resend` to send email notifications.
    *   Email templates are in `emails` and rendered using React Email.

## 5. Performance Optimization

*   **Next.js Built-in Optimizations:**
    *   Automatic Code Splitting.
    *   Image Optimization using `next/image` (WebP, AVIF formats).
    *   Support for SSG/SSR/ISR.
    *   Caching mechanisms.
    *   Route Prefetching with `next/link`.
    *   Optimized CSS (`experimental.optimizeCss`).
*   **Custom Performance Techniques:**
    *   Lazy Loading with `next/dynamic`.
    *   Client-Side Monitoring with Sentry.
    *   Webpack Optimizations for chunk splitting.

## 6. Testing and Quality Assurance

*   **Testing Frameworks:** Jest and React Testing Library.
*   **Types of Tests:** Unit, Component, Integration, and Accessibility (using `jest-axe`).
*   **Linting:** ESLint (configured in `.eslintrc.json`) for code style and quality, integrates with Prettier.
*   **Type Checking:** TypeScript (configured in `tsconfig.json`) for static type checking.

## 7. Potential Areas of Concern/Improvement

*   **Ignoring Errors in Production Builds:** `eslint.ignoreDuringBuilds` and `typescript.ignoreBuildErrors` are `true` in `next.config.js` for production. This can lead to deploying code with underlying issues. Recommendation: Enforce error-free builds or establish a rigorous review process for ignored errors.
*   **`@typescript-eslint/no-explicit-any` Rule:** Set to `"warn"` in `.eslintrc.json`. Overuse of `any` reduces type safety. Recommendation: Prefer specific types or `unknown`; consider changing to `"error"` in the future.
*   **Webpack Cache Disabled in Development:** `config.cache = false` in `next.config.js` for development. This can slow down development build times. Recommendation: Investigate the root cause of "corruption" to re-enable caching if possible.
