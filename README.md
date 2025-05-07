# Akasa Restaurant Website

A modern, performance-optimized website for Akasa, a fine dining Indian restaurant in Singapore.

## Table of Contents

- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Routing and Pages](#routing-and-pages)
- [Components](#components)
- [Mobile-First Design](#mobile-first-design)
- [Styling](#styling)
- [Performance Optimization](#performance-optimization)
- [Deployment](#deployment)
- [Known Issues and Future Work](#known-issues-and-future-work)

## Overview

The Akasa Restaurant Website is a Next.js application that showcases Akasa, an upscale Indian restaurant located at 79 Robinson Road, Singapore. The website features the restaurant's culinary offerings, special events, promotional offers, and reservation capabilities. Built with modern web technologies and following a mobile-first approach, the website is designed to be fast, responsive, and provide an excellent user experience on both desktop and mobile devices.

### Key Features

- **Responsive Design**: Fully optimized for both desktop and mobile devices
- **Menu System**: 5 distinct menu categories with detailed dish information
- **Events Section**: 5 event categories with detailed information and inquiry form
- **Offers Section**: Current promotions and special offers
- **Reservation System**: User-friendly online reservation form
- **Brand Philosophy**: Dedicated section showcasing the restaurant's story and values
- **Testimonials**: Customer reviews and ratings

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
│   ├── menus/              # Menu-related static assets
│   └── styles/             # Page-specific CSS
├── src/                    # Source code
│   ├── app/                # Next.js App Router pages
│   │   ├── page.tsx        # Home page
│   │   ├── events/         # Events page
│   │   ├── offers/         # Offers page
│   │   ├── reservations/   # Reservations page
│   │   └── menu/           # Menu pages and subpages
│   ├── components/         # React components
│   │   ├── events/         # Event page components
│   │   ├── home/           # Homepage components
│   │   ├── layout/         # Layout components
│   │   ├── menu/           # Menu page components
│   │   ├── mobile/         # Mobile-specific components
│   │   ├── navigation/     # Navigation components
│   │   ├── pages/          # Page-specific client components
│   │   ├── performance/    # Performance optimization components
│   │   ├── reservations/   # Reservation page components
│   │   └── ui/             # Reusable UI components
│   ├── data/               # Static data files
│   ├── hooks/              # Custom React hooks
│   ├── styles/             # Global styles
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions
│   └── __tests__/          # Test files
├── next.config.js          # Next.js configuration
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

## Components

The application uses a variety of components, organized by their purpose:

### Layout Components

- **PageLayout**: Shared layout with navigation and footer

### UI Components

- **Button**: Reusable button component with various styles
- **Loading**: Loading indicator component

### Mobile Components

- **MobileOptimizer**: Mobile-specific optimizations
- **MobileNavigation**: Mobile navigation menu
- **MobileClassProvider**: Provides mobile-specific classes

## Mobile-First Design

The website follows a mobile-first design approach, with specific considerations for mobile users:

### Core Mobile-First Principles

1. **Separate Mobile Components**: Mobile-specific components are completely separated from desktop components for easier debugging and maintenance.

2. **Device Detection**: The `useDeviceDetection` hook is used to detect mobile devices and render appropriate components.

3. **Touch Optimization**: Touch interactions are optimized for mobile devices.

4. **Disabled Hover Effects**: Hover effects are disabled on mobile devices.

5. **Responsive Typography**: Font sizes are responsive and scale appropriately down to 320px screens.

6. **Optimized Images**: Images are optimized for mobile devices with appropriate sizes and loading strategies.

7. **Layout Adaptations**:
   - Logo positioning is centered on homepage mobile view, upper left on other pages
   - Navigation uses a hamburger menu on mobile
   - Sections stack vertically on mobile with appropriate spacing
   - Hero image spans full width on mobile

## Styling

The website uses a combination of Tailwind CSS and custom CSS for styling:

### Tailwind CSS

Tailwind CSS is used for utility-first styling, with custom configuration in `tailwind.config.js`.

### Custom CSS

Custom CSS is used for specific components and pages, with files organized in the `src/styles` directory.

### Mobile-Specific CSS

Mobile-specific CSS is loaded conditionally based on device detection.

## Performance Optimization

The website is optimized for performance using various techniques:

- **Code Splitting**: Dynamic imports for better loading performance
- **Image Optimization**: Next.js Image component for optimized images
- **CSS Optimization**: Minimized CSS and critical CSS loading
- **Lazy Loading**: Components and images are loaded only when needed
- **Performance Monitoring**: Real-time monitoring of performance metrics

## Deployment

The website is deployed to Vercel:

1. Push changes to the GitHub repository
2. Vercel automatically builds and deploys the application
3. The application is available at the Vercel URL

## Known Issues and Future Work

### Current Limitations

1. **Static Data**: The website currently uses static data files instead of fetching data from an API.
2. **Limited Form Validation**: The reservation and inquiry forms have basic validation but could be enhanced.
3. **No Authentication**: There is no user authentication or admin panel for content management.
4. **No Internationalization**: The website is currently only available in English.

### Future Improvements

1. **API Integration**: Implement server-side data fetching for menus and events.
2. **Form Validation and Submission**: Enhance form validation and implement form submission handling.
3. **Accessibility Enhancements**: Improve accessibility for screen readers and keyboard navigation.
4. **Internationalization**: Add support for multiple languages.
5. **Analytics Integration**: Implement analytics tracking.
6. **Content Management System**: Add a CMS for content management.
7. **Performance Optimization**: Further optimize performance for faster loading times.
8. **Enhanced Mobile Experience**: Further improve the mobile experience.
