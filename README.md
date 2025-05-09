# Akasa Restaurant Website

A modern, performance-optimized website for Akasa, a fine dining Indian restaurant in Singapore.

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Directory Structure](#directory-structure)
- [Routing and Pages](#routing-and-pages)
- [Components and UI Design](#components-and-ui-design)
- [State & Logic](#state--logic)
- [Styling](#styling)
- [Deployment](#deployment)
- [Setup](#setup)
- [Future Work / Known Issues](#future-work--known-issues)

## Project Overview

The Akasa Restaurant Website showcases an upscale Indian restaurant located at 79 Robinson Road, Singapore. The website features the restaurant's culinary offerings, special events, promotional offers, and reservation capabilities. Built with modern web technologies and following a mobile-first approach, the website is designed to be fast, responsive, and provide an excellent user experience on both desktop and mobile devices.

### Key Features

- **Responsive Design**: Fully optimized for both desktop and mobile devices
- **Menu System**: 5 distinct menu categories with detailed dish information
- **Events Section**: 5 event categories with detailed information and inquiry form
- **Offers Section**: Current promotions and special offers
- **Reservation System**: User-friendly online reservation form
- **Brand Philosophy**: Dedicated section showcasing the restaurant's story and values
- **Testimonials**: Customer reviews and ratings

## Tech Stack

- **Next.js 15.3.0**: React framework for server-rendered applications
- **React 19.0.0**: JavaScript library for building user interfaces
- **TypeScript**: Typed superset of JavaScript for enhanced code quality
- **Tailwind CSS**: Utility-first CSS framework for responsive styling
- **Jest**: Testing framework for unit and integration tests
- **ESLint**: Code linting tool for maintaining code quality
- **Vercel**: Deployment platform optimized for Next.js applications
- **GitHub**: Version control and collaboration platform

## Directory Structure

```
akasa_b-bwireframe/
├── public/                 # Static assets
│   ├── images/             # Image assets organized by page and section
│   │   ├── brand/          # Brand assets like logos
│   │   ├── home/           # Homepage-specific images
│   │   ├── menu/           # Menu page images
│   │   ├── events/         # Events page images
│   │   └── offers/         # Offers page images
│   ├── mobile.css          # Mobile-specific CSS (dynamically loaded)
│   └── styles/             # Page-specific CSS
├── docs/                   # Documentation files
│   ├── image-optimization.md # Image optimization guide
│   └── mobile-optimization.md # Mobile optimization guide
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

## Components and UI Design

### Mobile-First Design Strategy

The website follows a strict mobile-first design approach:

1. **Separate Mobile Components**: Mobile-specific components are completely separated from desktop components for easier debugging and maintenance.

2. **Device Detection**: The `useDeviceDetection` hook is used to detect mobile devices and render appropriate components:
   ```tsx
   const { isMobile, isDetectionComplete } = useDeviceDetection();

   if (isMobile) {
     return <MobileComponent />;
   } else {
     return <DesktopComponent />;
   }
   ```

3. **Touch Optimization**: Touch interactions are optimized for mobile devices with appropriate touch targets and gestures.

4. **Disabled Hover Effects**: Hover effects are disabled on mobile devices to prevent unwanted behavior.

5. **Responsive Typography**: Font sizes are responsive and scale appropriately down to 320px screens.

6. **Optimized Images**: Images are optimized for mobile devices with appropriate sizes and loading strategies.

7. **Layout Adaptations**:
   - Single-column layouts for narrow screens
   - Horizontal scrolling for menu cards on mobile
   - Adjusted spacing and typography for mobile readability
   - Consistent button sizing across mobile views

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

Mobile-specific CSS is loaded dynamically based on device detection:

```typescript
// In deviceUtils.ts
export const applyMobileOptimizations = (): void => {
  // Add mobile class to html element
  document.documentElement.classList.add('mobile-device');

  // Load mobile CSS dynamically
  if (!document.getElementById('mobile-css')) {
    const link = document.createElement('link');
    link.id = 'mobile-css';
    link.rel = 'stylesheet';
    link.href = '/mobile.css';
    document.head.appendChild(link);
  }
};
```

The mobile.css file contains optimizations specifically for mobile devices and is only loaded when needed.

### Performance Optimizations

- CSS is minimized and critical CSS is inlined for faster loading
- Unused CSS is purged during the build process
- Mobile-specific CSS is loaded dynamically only on mobile devices
- Responsive images are used to reduce bandwidth usage on mobile devices
- WebM format is used for video files to optimize performance
- Video elements use appropriate fallback images when videos fail to load

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

## Documentation

The project includes comprehensive documentation:

1. **README.md**: This file, providing an overview of the project.
2. **DOCUMENTATION.md**: Detailed documentation of the project.
3. **docs/image-optimization.md**: Guide for image optimization.
4. **docs/mobile-optimization.md**: Guide for mobile optimization.

## Future Work / Known Issues

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
