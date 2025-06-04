# Akasa Restaurant Website

A modern, performance-optimized website for Akasa, a fine dining Indian restaurant in Singapore.

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Directory Structure](#directory-structure)
- [Sanity CMS Integration](#sanity-cms-integration)
- [Image Optimization Strategy](#image-optimization-strategy)
- [Overall Performance Optimization Strategy](#overall-performance-optimization-strategy)
- [Routing and Pages](#routing-and-pages)
- [Components and UI Design](#components-and-ui-design)
- [State & Logic](#state--logic)
- [Styling](#styling)
- [Deployment](#deployment)
- [Setup](#setup)
- [Future Work / Known Issues](#future-work--known-issues)

## Project Overview

This project is the official website for Akasa, a fine dining Indian restaurant in Singapore. It showcases the restaurant's culinary offerings, special events, promotional offers, and reservation capabilities. The website is built with modern web technologies, following a mobile-first approach to ensure a fast, responsive, and excellent user experience across all devices.

### Key Features

- **Responsive Design**: Optimized for desktop and mobile.
- **Menu System**: Five distinct menu categories with detailed dish information.
- **Events Section**: Five event categories with detailed information and an inquiry form.
- **Offers Section**: Displays current promotions and special offers.
- **Reservation System**: User-friendly online reservation form.
- **Brand Philosophy**: Dedicated section detailing the restaurant's story and values.
- **Testimonials**: Customer reviews and ratings.

## Tech Stack

- **Next.js ^15.3.0**: React framework for server-rendered applications
- **React ^19.1.0**: JavaScript library for building user interfaces
- **TypeScript 5.8.3**: Typed superset of JavaScript for enhanced code quality
- **Tailwind CSS ^4**: Utility-first CSS framework for responsive styling
- **Jest ^29.7.0**: Testing framework for unit and integration tests
- **ESLint ^9**: Code linting tool for maintaining code quality
- **Vercel**: Deployment platform optimized for Next.js applications
- **GitHub**: Version control and collaboration platform

## Directory Structure

```
akasa_b-bwireframe/
├── public/                 # Static assets
│   ├── images/             # Image assets organized by page and section
│   │   ├── blog/           # Images for blog posts and hero sections
│   │   ├── brand/          # Brand assets like logos
│   │   ├── chef/           # Images related to the chef section
│   │   ├── common/         # Common images used across multiple pages (e.g., footer background)
│   │   ├── events/         # Images for events, including backgrounds and listings
│   │   ├── home/           # Homepage-specific images, including gallery, hero carousels, and mobile videos
│   │   ├── menu/           # Menu page images
│   │   ├── offers/         # Images for promotions and loyalty programs
│   │   ├── reservations/   # Images for the reservations page
│   │   ├── seo/            # Images related to SEO (e.g., social share images)
│   │   ├── testimonials/   # Images for testimonials (avatars, backgrounds)
│   │   └── unused/         # Unused or deprecated image assets
│   ├── scripts/            # Client-side JavaScript for performance and fixes
│   └── *.css               # Various global and page-specific CSS files
├── docs/                   # Project documentation
│   ├── mobile-optimization.md # Mobile optimization guide
│   ├── seo-implementation.md # SEO implementation guide
│   ├── sanity-cms-integration.md # Sanity CMS Integration and Data Flow
│   └── image-optimization-strategy.md # Comprehensive image optimization strategy
├── src/                    # Source code
│   ├── app/                # Next.js App Router pages and API routes
│   │   ├── page.tsx        # Home page
│   │   ├── blog/           # Blog pages and individual post pages
│   │   ├── events/         # Events page
│   │   ├── offers/         # Offers page
│   │   ├── reservations/   # Reservations page
│   │   ├── studio/         # Sanity Studio CMS interface
│   │   └── menu/           # Menu pages and subpages (e.g., a-la-carte, drinks)
│   ├── components/         # React components organized by feature or type
│   │   ├── blog/           # Blog-related components
│   │   ├── brand/          # Brand-specific components (e.g., Logo)
│   │   ├── events/         # Event page components
│   │   ├── examples/       # Example components for documentation
│   │   ├── home/           # Homepage components
│   │   ├── layout/         # Layout components (e.g., Container, Section)
│   │   ├── menu/           # Menu page components
│   │   ├── mobile/         # Mobile-specific components
│   │   ├── navigation/     # Navigation components
│   │   ├── pages/          # Page-specific client components
│   │   ├── performance/    # Performance optimization components
│   │   ├── reservations/   # Reservation page components
│   │   ├── seo/            # SEO-related components
│   │   ├── templates/      # Component templates
│   │   ├── tracking/       # Analytics and tracking components
│   │   └── ui/             # Reusable UI components (e.g., Button, Card)
│   ├── constants/          # Application-wide constants
│   ├── data/               # Static data files (e.g., menu data, testimonials)
│   ├── emails/             # Email templates
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions and helpers
│   ├── sanity/             # Sanity CMS configuration and schema definitions
│   ├── styles/             # Global styles and module CSS
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions
│   └── __tests__/          # Test files
├── .eslintrc.json          # ESLint configuration
├── eslint.config.mjs       # ESLint flat configuration
├── jest.config.js          # Jest test runner configuration
├── jest.setup.js           # Jest setup file
├── next.config.js          # Main Next.js configuration (active)
├── next.config.ts          # Alternative Next.js configuration (not active by default)
├── package.json            # Project dependencies and scripts
├── package-lock.json       # Exact dependency versions
├── postcss.config.mjs      # PostCSS configuration
├── sanity.cli.ts           # Sanity CLI configuration
├── sanity.config.ts        # Sanity Studio configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## Routing and Pages

The website uses Next.js App Router for routing and consists of the following main pages:

### Main Pages

1. **Home Page** (`src/app/page.tsx`)
   - Hero section with restaurant introduction
   - Brand philosophy section
   - What's happening section
   - Featured dishes section
   - Testimonials section

2. **Menu Page** (`src/app/menu/page.tsx`)
   - Menu types section with links to subpages
   - Flavor experience section
   - Featured dishes section

3. **Events Page** (`src/app/events/page.tsx`)
   - Hero section
   - Categories section (Birthday, Anniversary, Office Lunch, Office Parties, Networking)
   - Event listings section
   - Testimonials section
   - Inquiry form section

4. **Offers Page** (`src/app/offers/page.tsx`)
   - Current promotions and special offers
   - Seasonal offerings

5. **Reservations Page** (`src/app/reservations/page.tsx`)
   - Reservation form
   - Contact information
   - Opening hours

### Menu Subpages

1. **À La Carte** (`src/app/menu/a-la-carte/page.tsx`)
2. **Soul Food Weekends** (`src/app/menu/soul-food-weekends/page.tsx`)
3. **Drinks** (`src/app/menu/drinks/page.tsx`)
4. **Bar Bites** (`src/app/menu/bar-bites/page.tsx`)
5. **3 Course Set Lunch** (`src/app/menu/set-lunch/page.tsx`)
6. **Tasting Menu** (`src/app/menu/tasting-menu/page.tsx`)
7. **Vegan Menu** (`src/app/menu/vegan/page.tsx`)

### Other Pages

1. **Blog Pages** (`src/app/blog/page.tsx` and `src/app/blog/[slug]/page.tsx`)
   - Displays blog posts fetched from the CMS.
   - Includes an index page and individual post pages.

2. **Sanity Studio** (`src/app/studio/[[...tool]]/page.tsx`)
   - Interface for managing content via the Sanity CMS.

3. **Error Page** (`src/app/error.tsx`)
   - Custom error page for handling unexpected errors.

4. **Loading Page** (`src/app/loading.tsx`)
   - Custom loading UI for pages.

5. **Not Found Page** (`src/app/not-found.tsx`)
   - Custom 404 page for handling unfound routes.

6. **Example Documented Page** (`src/app/examples/DocumentedPage.tsx`)
   - An example page demonstrating documentation practices.

## Components and UI Design

### Mobile-First Design Strategy

The website adopts a mobile-first design approach, ensuring optimal performance and user experience on smaller screens before scaling up to larger displays. Key aspects include:

1.  **Component Separation**: Mobile-specific components are distinct from desktop components, simplifying debugging and maintenance.
2.  **Device Detection**: The `useDeviceDetection` hook dynamically renders components based on device type.
3.  **Touch Optimization**: Interactions are optimized for touch, with appropriate targets and gestures.
4.  **Hover Effects**: Hover effects are disabled on mobile to prevent unintended behavior.
5.  **Responsive Typography**: Font sizes scale appropriately for various screen sizes, down to 320px.
6.  **Image Optimization**: Images are optimized for mobile, ensuring efficient loading.
7.  **Layout Adaptations**: Includes single-column layouts, horizontal scrolling for menus, adjusted spacing, and consistent button sizing.

### Key UI Components

- **Button**: Reusable button component with various styles and consistent sizing
- **Container**: Layout component for consistent spacing and centering
- **Grid**: Responsive grid layout component
- **Spacer**: Component for adding consistent vertical or horizontal space
- **MobileNavigation**: Mobile-specific navigation with hamburger menu
- **HeroSection**: Hero section with separate mobile and desktop implementations

## State & Logic

### Custom Hooks

The application uses several custom hooks to manage state and logic:

- **useDeviceDetection**: Detects mobile devices and provides device information
- **useScrollPosition**: Tracks scroll position for scroll-based animations
- **useDisableOptimizations**: Disables performance optimizations for specific components (deprecated)

### Data Management

Data is currently managed using static data files in the `src/data` directory. Each data file exports constants that are imported and used by components.

## Styling

### Tailwind CSS

Tailwind CSS is used for utility-first styling, with custom configuration in `tailwind.config.js`. The configuration includes:

- Custom colors for the Akasa brand
- Custom breakpoints for responsive design
- Custom spacing values for consistent layout

### Mobile-Specific CSS

Mobile-specific CSS is dynamically loaded based on device detection, ensuring that styles relevant only to mobile devices are applied efficiently.

### Performance Optimizations

The project is heavily optimized for performance, focusing on fast loading times and a smooth user experience. Key optimizations include:

- **Image Optimization**:
    - Next.js Image Optimization is enabled, with `image/avif` and `image/webp` formats prioritized for better compression.
    - `deviceSizes` and `imageSizes` are configured to serve responsive images across various screen resolutions (from 320px to 4K).
    - Remote patterns are configured for image loading from Vercel, localhost, and Sanity CDN.
- **CSS Optimization**:
    - CSS is minimized, and critical CSS is inlined for faster loading.
    - Unused CSS is purged during the build process.
    - Mobile-specific CSS loads dynamically only on mobile devices.
- **Code Splitting and Bundling (Webpack)**:
    - Webpack is configured for aggressive code splitting, creating separate chunks for framework, libraries, pages, and components to improve caching and reduce initial load times.
    - Console logs (except errors and warnings) are removed in production builds to reduce bundle size.
- **Build Process Enhancements**:
    - ESLint and TypeScript errors are ignored during production builds (`process.env.VERCEL` or `process.env.NODE_ENV === 'production'`) to prevent build failures in deployment environments.
    - Webpack cache is disabled in development to prevent corruption.
- **Video Optimization**:
    - WebM format is used for video files to optimize performance.
    - Video elements include fallback images for reliability.
- **Core Web Vitals**:
    - Optimizations are in place for Largest Contentful Paint (LCP) and Cumulative Layout Shift (CLS).

## Image Optimization Strategy

For a detailed understanding of the project's image optimization techniques, including Next.js Image component usage, configuration, and custom utilities, please refer to the dedicated documentation:

- [Image Optimization Strategy](docs/image-optimization-strategy.md)

## Overall Performance Optimization Strategy

For a detailed understanding of the project's comprehensive performance optimization techniques, including build-time, client-side, and monitoring strategies, please refer to the dedicated documentation:

- [Overall Performance Optimization Strategy](docs/overall-performance-strategy.md)

## Deployment

The website is deployed to Vercel using a GitHub-based workflow:

1. Code is pushed to the `master` branch on GitHub
2. Vercel automatically builds and deploys the application
3. The application is available at the production URL

### Environment Variables

The application uses environment variables for configuration:

- `NEXT_PUBLIC_API_URL`: The URL of the API (if applicable)
- `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID`: The Google Analytics ID (if applicable)

## Setup

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/akasa_b-bwireframe.git
   cd akasa_b-bwireframe
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file with required environment variables (if any).

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
```

### Running Tests

```bash
npm test
```


## Sanity CMS Integration

For a detailed understanding of the Sanity CMS setup, data modeling, and data flow within the application, please refer to the dedicated documentation:

- [Sanity CMS Integration and Data Flow](docs/sanity-cms-integration.md)

## Future Work / Known Issues

### Current Limitations

1. **Limited Form Validation**: The reservation and inquiry forms have basic validation but could be enhanced.
2. **No Authentication**: There is no user authentication or admin panel for content management.
3. **No Internationalization**: The website is currently only available in English.

### Future Improvements

1. **API Integration**: Implement server-side data fetching for menus and events (currently Sanity CMS is used for blog posts).
2. **Form Validation and Submission**: Enhance form validation and implement form submission handling.
3. **Accessibility Enhancements**: Improve accessibility for screen readers and keyboard navigation.
4. **Internationalization**: Add support for multiple languages.
5. **Analytics Integration**: Implement analytics tracking.
6. **Performance Optimization**: Further optimize performance for faster loading times.
7. **Enhanced Mobile Experience**: Further improve the mobile experience.
