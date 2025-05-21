# Codebase Analysis Report

## 1. Project Overview

*   **Technology Stack:**
    *   Next.js (React Framework)
    *   React (UI Library)
    *   TypeScript (Static Typing)
    *   Tailwind CSS (Utility-first CSS Framework)
*   **Main Purpose:**
    *   The project is a website for "Akasa Restaurant," an Indian fine-dining establishment.
    *   It aims to provide information about the restaurant, showcase its menus (food and beverages), allow users to make inquiries, and highlight events.

## 2. Project Structure

*   **Key Directories:**
    *   `src/app`: Contains the main application logic, routing (using Next.js App Router), and page components. Each route typically has its own `page.tsx` and potentially `layout.tsx`, `loading.tsx`, `error.tsx`, and `template.tsx`.
    *   `src/components`: Houses reusable UI components. These are further organized into:
        *   `common`: General-purpose components used across multiple features (e.g., `Button`, `Modal`).
        *   `layout`: Components defining the overall page structure (e.g., `Header`, `Footer`, `PageLayout`).
        *   `ui`: More specific UI elements, often tied to particular features or sections (e.g., `HeroSection`, `MenuCard`).
    *   `src/data`: Stores static data used throughout the application, such as menu items, testimonials, and event details. This data is typically exported as JavaScript/TypeScript objects or arrays.
    *   `src/hooks`: Contains custom React hooks for reusable logic.
    *   `src/lib`: Utility functions and helper modules.
    *   `src/styles`: Global styles and Tailwind CSS base configuration.
    *   `public`: Static assets like images, fonts, and favicons.
    *   `emails`: Templates for emails sent by the application (e.g., inquiry confirmations).
*   **Routing Strategy:**
    *   The project uses the Next.js App Router, introduced in Next.js 13. Routes are defined by the directory structure within `src/app`.
    *   Dynamic routes are handled using bracket notation (e.g., `src/app/blog/[slug]/page.tsx`).
*   **Key Configuration Files:**
    *   `next.config.js`:
        *   Configures Next.js behavior, including image optimization, ESLint and TypeScript settings, and redirects.
        *   **Important Settings:**
            *   `eslint.ignoreDuringBuilds`: Set to `true` for production builds (VERCEL or NODE_ENV === 'production'), meaning ESLint errors won't fail the build.
            *   `typescript.ignoreBuildErrors`: Set to `true` for production builds, meaning TypeScript errors won't fail the build.
            *   `images`: Extensive configuration for image optimization, including formats (`image/avif`, `image/webp`), device sizes, image sizes, and remote patterns.
            *   `experimental.optimizeCss`: Enabled for better CSS performance.
            *   `compiler.removeConsole`: Removes `console.*` calls in production (excluding `error` and `warn`).
            *   `webpack` customizations: Includes rules for handling image files and optimizes chunk splitting for production builds.
            *   **Redirect Rule (Newly Added):**
                ```javascript
                async redirects() {
                  return [
                    {
                      source: '/blog/:slug*',
                      destination: 'https://blog.akasa.sg/blog/:slug*',
                      permanent: true,
                    },
                  ];
                }
                ```
    *   `tailwind.config.js`:
        *   Configures Tailwind CSS, including custom theme settings (colors, fonts, spacing), plugins, and content paths.
        *   **Important Settings:**
            *   `content`: Specifies the files Tailwind should scan for utility classes (`./src/**/*.{js,ts,jsx,tsx}`).
            *   `theme.extend`: Customizes and extends the default Tailwind theme with project-specific design tokens.
    *   `tsconfig.json`:
        *   Configures the TypeScript compiler options.
        *   **Important Settings:**
            *   `target`: "es5" (compiles to ES5 JavaScript).
            *   `lib`: Includes "dom", "dom.iterable", "esnext".
            *   `allowJs`: `true` (allows JavaScript files to be compiled).
            *   `skipLibCheck`: `true` (skips type checking of declaration files).
            *   `strict`: `true` (enables all strict type-checking options).
            *   `noEmit`: `true` (TypeScript does not emit output files, Next.js handles this).
            *   `esModuleInterop`: `true` (enables interoperability between CommonJS and ES modules).
            *   `module`: "esnext".
            *   `moduleResolution`: "bundler" (aligns with modern bundler behavior).
            *   `resolveJsonModule`: `true` (allows importing JSON files).
            *   `isolatedModules`: `true`.
            *   `jsx`: "preserve" (TypeScript does not transform JSX, Next.js handles it).
            *   `incremental`: `true` (enables incremental compilation).
            *   `plugins`: Includes `@ianvs/prettier-plugin-sort-imports` for import sorting.
            *   `paths`: Defines path aliases (e.g., `@/*` maps to `src/*`).
    *   `.eslintrc.json`:
        *   Configures ESLint for code linting and style checking.
        *   **Important Settings:**
            *   Extends recommended ESLint and Next.js Core Web Vitals configurations.
            *   Includes TypeScript ESLint parser and plugins.
            *   Rules: Many specific rules are configured, including some that are turned off or set to "warn" (e.g., `@typescript-eslint/no-explicit-any` is "warn", `@typescript-eslint/no-unused-vars` has `argsIgnorePattern`).

## 3. Components

*   **Overview of Component Organization:**
    *   **Feature-based:** Some components in `src/components/ui` are specific to certain features or sections of the website (e.g., `MenuContent`, `ReservationForm`).
    *   **UI Elements:** Generic, reusable UI elements like `Button`, `Input`, `Modal` are typically found in `src/components/common`.
    *   **Layout Components:** Components responsible for the overall page structure, such as `Header`, `Footer`, `Sidebar`, and `PageLayout`, are located in `src/components/layout`.
*   **Examples of Key Components and Their Roles:**
    *   `src/app/layout.tsx`: The root layout for the entire application. It sets up the basic HTML structure, includes global styles, and wraps content with necessary providers.
    *   `src/components/layout/PageLayout.tsx`: A wrapper component used for most pages to provide a consistent layout structure, often including the `Header` and `Footer`.
    *   `src/components/layout/Header.tsx`: Renders the main navigation bar, including the logo and links to different sections of the site.
    *   `src/components/layout/Footer.tsx`: Renders the site footer, typically containing copyright information, social media links, and other contact details.
    *   `src/components/ui/HeroSection.tsx`: A component used on the homepage and potentially other pages to display a prominent hero image or video with a call to action.
    *   `src/components/common/Button.tsx`: A general-purpose button component with various styles and states.
    *   `src/components/ui/Menu/MenuCard.tsx`: Displays individual menu items with details like name, description, and price.
    *   `src/app/(routes)/inquire/components/InquiryForm.tsx`: Handles the user input for inquiries and submits the data.

## 4. Data Handling

*   **Static Data Management:**
    *   Static data, such as menu details (food, beverages), testimonials, team member information, and event descriptions, is primarily stored in TypeScript files within the `src/data` directory.
    *   For example, `src/data/menu.ts` might export an array of menu item objects.
    *   This data is then imported directly into components that need to display it.
*   **Dynamic Data Handling:**
    *   **Inquiry Form Submissions:** The inquiry form (`src/app/(routes)/inquire/components/InquiryForm.tsx`) collects user data.
    *   Upon submission, this data is typically sent to a Next.js API route (defined in `src/app/api/...`).
    *   The API route (`src/app/api/inquire/route.ts`) processes the data (e.g., validation) and then uses a service like `resend` (as indicated in `package.json` and email templates) to send an email notification with the inquiry details.
    *   The email templates are located in the `emails` directory and are rendered using React Email.

## 5. Performance Optimization

*   **Next.js Built-in Optimizations Used:**
    *   **Automatic Code Splitting:** Next.js automatically splits JavaScript bundles by page, loading only the necessary code for each page. The webpack configuration further optimizes this with custom chunk splitting strategies.
    *   **Image Optimization:** `next/image` component is used for automatic image optimization, resizing, and serving images in modern formats like WebP and AVIF. Configuration in `next.config.js` specifies device sizes, image sizes, and remote patterns.
    *   **Static Site Generation (SSG) / Server-Side Rendering (SSR):** While the specific rendering strategy per page isn't detailed here, Next.js allows for SSG, SSR, or Incremental Static Regeneration (ISR) to optimize page load times and SEO. The App Router generally favors server components, which can be rendered on the server.
    *   **Caching:** Next.js provides various caching mechanisms for assets and page data.
    *   **Route Prefetching:** `next/link` component automatically prefetches linked pages in the background for faster navigation.
    *   **Optimized CSS:** `experimental.optimizeCss` is enabled in `next.config.js`.
*   **Custom Performance Techniques Implemented:**
    *   **Lazy Loading:** While not explicitly detailed for all components, Next.js's dynamic import (`next/dynamic`) can be used for lazy loading components that are not immediately visible.
    *   **Client-Side Monitoring:** The project includes `Sentry` for error monitoring and performance tracking in production environments, which helps identify and address performance bottlenecks.
    *   **Deferred Loading:** Some non-critical scripts or components might be loaded with a delay or after the main content has loaded (a common pattern, though specific implementations aren't detailed here).
    *   **Webpack Optimizations:** The `next.config.js` includes webpack customizations for chunk splitting to create more granular chunks for better caching (framework, libraries, pages, components).

## 6. Testing and Quality Assurance

*   **Testing Framework:**
    *   **Jest:** The project is configured to use Jest (`jest.config.js`) as the JavaScript testing framework.
    *   **React Testing Library:** Used alongside Jest for testing React components (`@testing-library/react`).
*   **Types of Tests (based on setup and common practices):**
    *   **Unit Tests:** Likely used for testing individual functions, utilities, and potentially smaller components in isolation.
    *   **Component Tests:** Testing individual React components to ensure they render correctly and respond to user interactions as expected.
    *   **Integration Tests:** Testing how multiple components work together, or how components interact with hooks or services.
    *   **Accessibility Tests:** The setup includes `jest-axe` for running automated accessibility tests within Jest, ensuring components meet a11y standards.
*   **Linting:**
    *   **ESLint:** Used to enforce code style, identify potential bugs, and maintain code quality. Configuration is in `.eslintrc.json`.
    *   Integrates with Prettier for code formatting.
*   **Type Checking:**
    *   **TypeScript:** Used throughout the project for static type checking, which helps catch errors during development and improves code maintainability. Configuration is in `tsconfig.json`.

## 7. Potential Areas of Concern/Improvement

*   **Ignoring Errors in Production Builds:**
    *   `next.config.js` is set to `eslint.ignoreDuringBuilds = true` and `typescript.ignoreBuildErrors = true` for production environments.
    *   **Concern:** This means that ESLint or TypeScript errors will not prevent a production build from succeeding. While this can be a pragmatic choice to avoid blocking deployments due to minor linting/typing issues, it also risks deploying code with underlying problems that could manifest at runtime.
    *   **Recommendation:** Ideally, build pipelines should enforce that all ESLint and TypeScript errors are fixed before deployment. If not feasible, these flags should be used with caution and a process should be in place to review and address these ignored errors regularly.
*   **`@typescript-eslint/no-explicit-any` Rule:**
    *   In `.eslintrc.json`, the rule `@typescript-eslint/no-explicit-any` is set to `"warn"`.
    *   **Concern:** Using `any` defeats the purpose of TypeScript by opting out of type checking for those variables/expressions. While sometimes necessary for working with third-party libraries or complex types, its overuse can lead to a less robust and more error-prone codebase.
    *   **Recommendation:** Encourage developers to use more specific types or `unknown` instead of `any` where possible. The "warn" level means these instances are flagged but don't break the build; consider moving to "error" in the future or gradually refactoring `any` usages.
*   **Webpack Cache Disabled in Development:**
    *   `next.config.js` sets `config.cache = false` in development.
    *   **Note:** The comment states this is to "prevent corruption." While this might solve a specific issue, disabling the webpack cache can lead to slower build and rebuild times in development. It might be worth investigating the root cause of the "corruption" to see if the cache can be re-enabled for a better development experience.

This analysis provides a snapshot of the codebase's architecture, tools, and practices.
It highlights a well-structured project leveraging modern web development technologies.
The areas of concern are typical for many projects and represent opportunities for further refinement.
