# Akasa Restaurant Website

A modern, performance-optimized website for Akasa, a fine dining Indian restaurant in Singapore.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Page and Component Structure](#page-and-component-structure)
- [Mobile-First Design Strategy](#mobile-first-design-strategy)
- [Documentation](#documentation)
- [Performance Optimization](#performance-optimization)
- [Mobile Optimization](#mobile-optimization)
- [Testing](#testing)
- [Deployment](#deployment)
- [Known Limitations and TODOs](#known-limitations-and-todos)
- [Contributing](#contributing)

## Overview

The Akasa Restaurant Website is a Next.js application that showcases Akasa, an upscale Indian restaurant located at 79 Robinson Road, Singapore. The website features the restaurant's culinary offerings, special events, promotional offers, and reservation capabilities. Built with modern web technologies and following a mobile-first approach, the website is designed to be fast, responsive, and provide an excellent user experience on both desktop and mobile devices.

The primary purpose of this website is to:
- Showcase the restaurant's unique culinary experience and brand philosophy
- Provide detailed information about various menu offerings
- Highlight special events and promotional offers
- Enable online reservations
- Present the restaurant's story, ambiance, and signature dishes

## Features

- **Responsive Design**: Fully optimized for both desktop and mobile devices with device-specific components
- **Performance Optimized**: Fast loading times (LCP < 2.5s) and smooth interactions with minimal JavaScript
- **Menu System**:
  - 5 distinct menu categories (À La Carte, Soul Food Weekends, Drinks, Bar Bites, 3 Course Set Lunch)
  - Detailed dish information with vegetarian indicators (🔴 non-veg, 🟢 veg)
  - Featured signature dishes section
- **Events Section**:
  - 5 event categories (Birthday, Anniversary, Office Lunch, Office Parties, Networking)
  - Detailed event information with pricing and features
  - Event inquiry form
- **Offers Section**: Current promotions and special offers with visually appealing cards
- **Reservation System**: User-friendly online reservation form
- **Brand Philosophy**: Dedicated section showcasing the restaurant's story and values
- **Testimonials**: Customer reviews and ratings
- **Mobile-Specific Optimizations**:
  - Tailored experience for mobile users with optimized navigation
  - Touch-friendly interface with properly sized tap targets
  - Disabled hover effects on mobile
  - Performance optimizations for mobile networks

## Technology Stack

- **Next.js 15.3.0**: React framework for server-rendered applications
- **React 19.0.0**: JavaScript library for building user interfaces
- **TypeScript**: Typed superset of JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Jest**: Testing framework
- **ESLint**: Code linting tool
- **Vercel**: Deployment platform

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sharadchaturveda/akasa_b-bwireframe.git
   cd akasa_b-bwireframe
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
```

### Running Tests

```bash
npm test
```

## Project Structure

The project follows a modular structure with clear separation of concerns:

```
akasa_b-bwireframe/
├── public/                 # Static assets
│   ├── images/             # Image assets organized by page and section
│   │   ├── brand/          # Brand assets like logos
│   │   ├── home/           # Homepage-specific images
│   │   │   ├── hero/       # Hero section images
│   │   │   ├── philosophy/ # Brand philosophy section images
│   │   │   ├── gallery/    # Gallery section images
│   │   │   ├── whats-happening/ # What's happening section images
│   │   │   └── testimonials/ # Testimonials section images
│   │   ├── menu/           # Menu page images
│   │   │   ├── hero/       # Menu page hero images
│   │   │   ├── chef/       # Chef section images
│   │   │   ├── a-la-carte/ # À La Carte menu images
│   │   │   ├── bar-bites/  # Bar Bites menu images
│   │   │   ├── drinks/     # Drinks menu images
│   │   │   ├── set-lunch/  # Set Lunch menu images
│   │   │   ├── soul-food-weekends/ # Soul Food Weekends menu images
│   │   │   └── featured-dishes/ # Featured dishes images
│   │   ├── events/         # Events page images
│   │   └── offers/         # Offers page images
│   ├── styles/             # Page-specific CSS
│   └── *.css, *.js         # Global static assets
├── src/                    # Source code
│   ├── app/                # Next.js App Router pages
│   │   ├── page.tsx        # Home page
│   │   ├── events/         # Events page
│   │   ├── offers/         # Offers page
│   │   ├── reservations/   # Reservations page
│   │   └── menu/           # Menu pages and subpages
│   │       ├── page.tsx    # Main menu page
│   │       ├── a-la-carte/ # À La Carte menu page
│   │       ├── bar-bites/  # Bar Bites menu page
│   │       ├── drinks/     # Drinks menu page
│   │       ├── set-lunch/  # Set Lunch menu page
│   │       └── soul-food-weekends/ # Soul Food Weekends menu page
│   ├── components/         # React components
│   │   ├── events/         # Event page components
│   │   ├── home/           # Homepage components
│   │   ├── layout/         # Layout components
│   │   ├── menu/           # Menu page components
│   │   ├── mobile/         # Mobile-specific components
│   │   ├── pages/          # Page-specific client components
│   │   ├── performance/    # Performance optimization components
│   │   ├── reservations/   # Reservation page components
│   │   └── ui/             # Reusable UI components
│   ├── data/               # Static data files
│   │   ├── aLaCarteMenu.ts # À La Carte menu data
│   │   ├── barBitesMenu.ts # Bar Bites menu data
│   │   ├── drinksMenu.ts   # Drinks menu data
│   │   ├── setLunchMenu.ts # Set Lunch menu data
│   │   ├── soulFoodMenu.ts # Soul Food Weekends menu data
│   │   ├── events.ts       # Events data
│   │   └── testimonials.ts # Testimonials data
│   ├── hooks/              # Custom React hooks
│   │   ├── useDeviceDetection.ts # Hook for detecting mobile devices
│   │   └── README.md       # Documentation for hooks
│   ├── styles/             # Global styles
│   │   ├── globals.css     # Global CSS
│   │   └── mobile.css      # Mobile-specific CSS
│   ├── types/              # TypeScript type definitions
│   │   ├── menu.ts         # Menu types
│   │   ├── events.ts       # Event types
│   │   └── README.md       # Documentation for types
│   ├── utils/              # Utility functions
│   │   ├── mobileUtils.ts  # Mobile utility functions
│   │   ├── performanceMonitor.ts # Performance monitoring utilities
│   │   └── README.md       # Documentation for utilities
│   └── __tests__/          # Test files
├── DOCUMENTATION.md        # Comprehensive documentation
├── next.config.js          # Next.js configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── jest.config.js          # Jest configuration
├── eslint.config.mjs       # ESLint configuration
└── package.json            # NPM package configuration
```

### Folder Hierarchy and Conventions

- **PascalCase**: Used for React components and TypeScript interfaces
- **camelCase**: Used for variables, functions, and file names
- **kebab-case**: Used for CSS class names and static asset files

#### Key Conventions:

1. **Component Organization**: Components are organized by feature/page
2. **Mobile Separation**: Mobile-specific code is completely separated from desktop code
3. **Type Safety**: TypeScript is used throughout the project for type safety
4. **Documentation**: Each directory contains a README.md file with specific documentation
5. **Image Organization**: Images are organized by page and section with descriptive names
6. **Data Structure**: Data files export typed constants with clear interfaces
7. **CSS Modules**: Component-specific styles use CSS modules
8. **Tailwind Utilities**: Common styles use Tailwind utility classes

## Page and Component Structure

The website consists of the following main pages and components:

### Main Pages

1. **Home Page** (`src/app/page.tsx`)
   - Hero section with restaurant introduction
   - Brand philosophy section (40/60 split)
   - What's happening section (60/40 split)
   - Featured dishes section
   - Testimonials section

2. **Menu Page** (`src/app/menu/page.tsx`)
   - Chef section
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

### Key Components

#### Layout Components

- **PageLayout** (`src/components/layout/PageLayout.tsx`): Shared layout with navigation and footer
  - Props: `children`, `className`, `withMobileOptimizer`
  - Usage: Wraps page content with common elements

- **Navigation** (`src/components/home/Navigation.tsx`): Main navigation menu
  - Features: Different navigation items for homepage vs. other pages
  - Mobile: Uses `MobileNavigation` component on mobile devices

- **Footer** (`src/components/home/Footer.tsx`): Site footer
  - Sections: Contact information, opening hours, social media links

#### UI Components

- **Button** (`src/components/ui/button.tsx`): Reusable button component
  - Props: `children`, `className`, `onClick`, `disabled`, etc.
  - Variants: Primary, secondary, outline

- **Loading** (`src/components/ui/Loading.tsx`): Loading indicator
  - Props: `size`, `text`
  - Variants: Small, medium, large

#### Mobile Components

- **MobileOptimizer** (`src/components/mobile/MobileOptimizer.tsx`): Mobile-specific optimizations
- **MobileNavigation** (`src/components/mobile/MobileNavigation.tsx`): Mobile navigation menu
- **MobileClassProvider** (`src/components/mobile/MobileClassProvider.tsx`): Provides mobile-specific classes

## Mobile-First Design Strategy

The website follows a mobile-first design approach, with specific considerations for mobile users:

### Core Mobile-First Principles

1. **Separate Mobile Components**: Mobile-specific components are completely separated from desktop components for easier debugging and maintenance.

2. **Device Detection**: The `useDeviceDetection` hook is used to detect mobile devices and render appropriate components:

   ```typescript
   const { isMobile, isDetectionComplete } = useDeviceDetection();

   if (!isDetectionComplete) {
     return <Loading />;
   }

   return isMobile ? <MobileComponent /> : <DesktopComponent />;
   ```

3. **Touch Optimization**: Touch interactions are optimized for mobile devices:

   ```css
   html.mobile-device button,
   html.mobile-device a,
   html.mobile-device input {
     touch-action: manipulation;
   }
   ```

4. **Disabled Hover Effects**: Hover effects are disabled on mobile devices:

   ```css
   html.mobile-device button:hover,
   html.mobile-device a:hover {
     background-color: initial !important;
     color: initial !important;
   }
   ```

5. **Responsive Typography**: Font sizes are responsive and scale appropriately down to 320px screens.

6. **Optimized Images**: Images are optimized for mobile devices with appropriate sizes and loading strategies.

7. **Performance Considerations**: Mobile-specific performance optimizations include:
   - Reduced animation complexity
   - Smaller asset sizes
   - Deferred loading of non-critical resources
   - Touch event optimization

8. **Layout Adaptations**:
   - Logo positioning is centered on homepage mobile view, upper left on other pages
   - Navigation uses a hamburger menu on mobile
   - Sections stack vertically on mobile with appropriate spacing
   - Hero image spans full width on mobile

## Documentation

For detailed documentation, see the [DOCUMENTATION.md](DOCUMENTATION.md) file. This includes:

- Comprehensive architecture overview
- Component documentation
- Hook documentation
- Utility documentation
- Performance optimization details
- Mobile optimization details
- Testing strategy
- Deployment process
- Best practices
- Menu structure and signature dishes
- Design preferences and guidelines

Each directory also contains its own README.md file with specific documentation for that directory.

## Performance Optimization

The website is optimized for performance using various techniques:

- **Code Splitting**: Dynamic imports for better loading performance
- **Image Optimization**: Next.js Image component for optimized images
- **CSS Optimization**: Minimized CSS and critical CSS loading
- **Lazy Loading**: Components and images are loaded only when needed
- **Performance Monitoring**: Real-time monitoring of performance metrics

## Mobile Optimization

The website is optimized for mobile devices:

- **Responsive Design**: Adapts to different screen sizes
- **Touch Optimization**: Optimized for touch interactions
- **Mobile-Specific Components**: Components designed specifically for mobile
- **Reduced Motion**: Respects user preferences for reduced motion
- **Optimized Images**: Smaller images for mobile devices

## Testing

The website is tested using Jest:

- **Unit Tests**: Test individual components
- **Integration Tests**: Test component interactions
- **Accessibility Tests**: Test for accessibility compliance

## Deployment

The website is deployed to Vercel:

1. Push changes to the GitHub repository
2. Vercel automatically builds and deploys the application
3. The application is available at the Vercel URL

## Known Limitations and TODOs

### Current Limitations

1. **No Server-Side Data Fetching**: The website currently uses static data files instead of fetching data from an API.

2. **Limited Form Validation**: The reservation and inquiry forms have basic validation but could be enhanced.

3. **No Authentication**: There is no user authentication or admin panel for content management.

4. **No Internationalization**: The website is currently only available in English.

5. **No Analytics Integration**: There is no analytics tracking implemented yet.

6. **Limited Accessibility Testing**: While basic accessibility features are implemented, comprehensive testing is needed.

### Future Improvements

1. **API Integration**: Implement server-side data fetching for menus and events.
   ```typescript
   // TODO: Replace static data with API calls
   export async function getServerSideProps() {
     const menuData = await fetch('https://api.akasa.sg/menu').then(res => res.json());
     return { props: { menuData } };
   }
   ```

2. **Form Validation and Submission**: Enhance form validation and implement form submission handling.
   ```typescript
   // TODO: Implement form validation and submission
   const validateForm = (data) => {
     // Validation logic
   };
   ```

3. **Accessibility Enhancements**: Improve accessibility for screen readers and keyboard navigation.
   ```typescript
   // TODO: Add ARIA attributes and keyboard navigation
   <button aria-label="Close menu" tabIndex={0}>Close</button>
   ```

4. **Internationalization**: Add support for multiple languages.
   ```typescript
   // TODO: Implement i18n
   import { useTranslation } from 'next-i18next';
   ```

5. **Analytics Integration**: Implement analytics tracking.
   ```typescript
   // TODO: Add analytics tracking
   import { trackEvent } from '@/utils/analytics';
   ```

6. **Content Management System**: Add a CMS for content management.
   ```typescript
   // TODO: Integrate with a headless CMS
   import { getContent } from '@/lib/cms';
   ```

7. **Performance Optimization**: Further optimize performance for faster loading times.
   ```typescript
   // TODO: Implement advanced performance optimizations
   import { optimizeImages } from '@/utils/imageOptimizer';
   ```

8. **Enhanced Mobile Experience**: Further improve the mobile experience.
   ```typescript
   // TODO: Implement advanced mobile optimizations
   import { optimizeMobileExperience } from '@/utils/mobileOptimizer';
   ```

## Contributing

1. Create a new branch for your feature or bug fix
2. Make your changes
3. Write tests for your changes
4. Run the tests to make sure they pass
5. Submit a pull request

### Code Documentation Standards

When contributing to this project, please follow these documentation standards:

1. **Component Documentation**: Add JSDoc comments to all components explaining their purpose and usage.
   ```typescript
   /**
    * Button Component
    *
    * A reusable button component with various styles and states.
    *
    * @param {ButtonProps} props - The component props
    * @returns {JSX.Element} The rendered component
    */
   ```

2. **Prop Documentation**: Document all props with their types and descriptions.
   ```typescript
   interface ButtonProps {
     /**
      * The button content
      */
     children: React.ReactNode;

     /**
      * Additional CSS classes
      */
     className?: string;

     /**
      * Whether the button is disabled
      * @default false
      */
     disabled?: boolean;
   }
   ```

3. **Function Documentation**: Document all functions with their purpose, parameters, and return values.
   ```typescript
   /**
    * Formats a price string
    *
    * @param {string|number} price - The price to format
    * @returns {string} The formatted price
    */
   ```

4. **File Headers**: Add a header comment to each file explaining its purpose.
   ```typescript
   /**
    * Button Component
    *
    * This file contains the Button component and its related types.
    * The Button component is used throughout the application for user interactions.
    */
   ```
