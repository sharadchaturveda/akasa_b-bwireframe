# Akasa Restaurant Website Documentation

## Table of Contents

1. [Introduction](#introduction)
2. [Project Structure](#project-structure)
3. [Technology Stack](#technology-stack)
4. [Getting Started](#getting-started)
5. [Architecture](#architecture)
6. [Menu Structure and Signature Dishes](#menu-structure-and-signature-dishes)
7. [Components](#components)
8. [Hooks](#hooks)
9. [Utilities](#utilities)
10. [Performance Optimization](#performance-optimization)
11. [Mobile Optimization](#mobile-optimization)
12. [Testing](#testing)
13. [Deployment](#deployment)
14. [Best Practices](#best-practices)
15. [Troubleshooting](#troubleshooting)
16. [Contributing](#contributing)

## Additional Documentation

- [Image Optimization Guide](./docs/image-optimization.md)
- [Mobile Optimization Guide](./docs/mobile-optimization.md)

## Introduction

The Akasa Restaurant Website is a Next.js application that showcases Akasa, an upscale Indian restaurant in Singapore. The website features the restaurant's offerings, including menus, events, and reservation capabilities. The website is designed to be fast, responsive, and provide an excellent user experience on both desktop and mobile devices.

### Key Features

- Responsive design for desktop and mobile
- Performance-optimized for fast loading
- Menu browsing with 5 different categories (À La Carte, Soul Food Weekends, Drinks, Bar Bites, 3 Course Set Lunch)
- Events section with 5 categories (Birthday, Anniversary, Office Lunch, Office Parties, Networking)
- Offers section with current promotions
- Reservation system
- Mobile-specific optimizations

### Restaurant Information

- **Location**: 79 Robinson Road, Singapore
- **Opening Hours**: Monday to Saturday, 11:30am to 10:00pm
- **Phone**: +65 6123 4567
- **Email**: info@akasa.sg
- **Website**: https://akasa.sg

## Project Structure

The project follows a modular structure with clear separation of concerns:

```
akasa_b-bwireframe/
├── public/               # Static assets
│   ├── images/           # Image assets
│   ├── mobile.css        # Mobile-specific CSS (dynamically loaded)
│   └── styles/           # Page-specific CSS
├── src/                  # Source code
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components
│   │   ├── events/       # Event page components
│   │   ├── home/         # Homepage components
│   │   ├── layout/       # Layout components
│   │   ├── menu/         # Menu page components
│   │   ├── mobile/       # Mobile-specific components
│   │   ├── pages/        # Page-specific client components
│   │   ├── performance/  # Performance optimization components
│   │   ├── reservations/ # Reservation page components
│   │   ├── templates/    # Component templates
│   │   └── ui/           # Reusable UI components
│   ├── data/             # Data files
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Library code
│   ├── pages/            # Next.js Pages Router (legacy)
│   ├── styles/           # Global styles
│   ├── types/            # TypeScript type definitions
│   └── utils/            # Utility functions
├── .eslintrc.json        # ESLint configuration
├── .gitignore            # Git ignore file
├── jest.config.js        # Jest configuration
├── next.config.js        # Next.js configuration
├── package.json          # NPM package configuration
├── README.md             # Project README
├── tailwind.config.js    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## Technology Stack

The project uses the following technologies:

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

## Architecture

The application follows a component-based architecture with a clear separation between:

- **Pages**: Next.js pages that define routes
- **Components**: Reusable UI components
- **Hooks**: Custom React hooks for shared logic
- **Utilities**: Helper functions
- **Data**: Static data used throughout the application

### Key Architectural Decisions

1. **Mobile-First Approach**: The application is designed with mobile users in mind, with specific optimizations for mobile devices.

2. **Performance Optimization**: The application uses various techniques to optimize performance, including:
   - Code splitting
   - Image optimization
   - CSS optimization
   - Lazy loading
   - Performance monitoring

3. **Component Modularization**: Components are highly modularized for better maintainability and reusability.

4. **Error Handling**: The application uses error boundaries to catch and handle errors gracefully.

5. **TypeScript**: The application uses TypeScript for type safety and better developer experience.

## Menu Structure and Signature Dishes

The website features 5 distinct menu sections, each with its own page:

### Menu Categories

1. **À La Carte Menu**
   - Comprehensive menu with all regular offerings
   - Organized by categories: Soup and Appetizer, Main Course, Bread, Rice, etc.

2. **Soul Food Weekends Menu**
   - Special weekend offerings
   - Features unlimited Chaat (Fri & Sat, 12 PM - 3 PM)

3. **Drinks Menu**
   - Signature cocktails
   - Fine wines
   - Non-alcoholic beverages

4. **Bar Bites Menu**
   - Small plates and appetizers
   - Perfect for pairing with drinks

5. **3 Course Set Lunch Menu**
   - Fixed price lunch offering
   - Includes starter, main course, and dessert
   - Daily sides rotation

### Signature Dishes

Akasa's signature dishes that should be highlighted throughout the website:

1. **Paronthia Naan** ($8)
   - Traditional Indian bread with a modern twist

2. **AKASA-E-Dum Biryani** ($25)
   - Fragrant rice dish with choice of protein

3. **Akasa-E-Lobster** ($72)
   - Premium lobster preparation

4. **Tandoori Prawns** ($32)
   - Char-grilled prawns with special spice blend

5. **Dal-E-Akasa** ($22)
   - House special lentil preparation

6. **Tandoori Pomfret Kebab** ($34)
   - Whole fish marinated and cooked in tandoor

Note: The restaurant doesn't have a children's menu but accommodates children.

## Components

The application uses a variety of components, organized by their purpose:

### Layout Components

Located in `src/components/layout/`, these components provide the overall structure for pages:

- **PageLayout**: A shared layout component that includes navigation and footer.

### UI Components

Located in `src/components/ui/`, these are reusable UI components:

- **Button**: A customizable button component.
- **ErrorBoundary**: A component that catches errors in its children.
- **Loading**: A loading spinner component.

### Page Components

Located in various directories under `src/components/`, these components are specific to certain pages:

- **Home**: Components for the homepage.
- **Menu**: Components for the menu pages.
- **Events**: Components for the events page.
- **Reservations**: Components for the reservations page.

### Mobile Components

Located in `src/components/mobile/`, these components are specifically optimized for mobile devices:

- **MobileClassProvider**: Provides mobile-specific functionality.
- **MobileNavigation**: Mobile-specific navigation component.
- **MobileButton**: Mobile-optimized button component.

### Performance Components

Located in `src/components/performance/`, these components handle performance optimization:

- **ClientPerformanceMonitor**: Monitors client-side performance metrics.
- **ClientPerformanceWrapper**: Wraps performance monitoring components.
- **PreloadLinks**: Preloads critical resources.

### Component Templates

Located in `src/components/templates/`, these are templates for creating new components:

- **StandardComponent**: A template for creating new components.
- **MobileStandardComponent**: A template for creating new mobile components.

## Hooks

The application uses custom React hooks to share logic across components:

### useDeviceDetection

Located in `src/hooks/useDeviceDetection.ts`, this hook detects whether the current device is a mobile device:

```tsx
const { isMobile, isDetectionComplete } = useDeviceDetection();

if (!isDetectionComplete) {
  return <Loading />;
}

return isMobile ? <MobileComponent /> : <DesktopComponent />;
```

### Other Hooks

- **useScrollPosition**: Tracks the scroll position of the page.
- **useMediaQuery**: Detects whether a media query matches.

## Utilities

The application uses various utility functions:

### Mobile Utilities

Located in `src/utils/mobileUtils.ts`, these utilities handle mobile-specific functionality:

- **isMobileDevice**: Detects whether the current device is a mobile device.
- **optimizeImagesForMobile**: Optimizes images for mobile devices.
- **debounce**: Limits the rate at which a function can fire.

### Performance Utilities

Located in `src/utils/performanceMonitor.ts`, these utilities handle performance monitoring:

- **monitorLCP**: Monitors the Largest Contentful Paint metric.
- **monitorCLS**: Monitors the Cumulative Layout Shift metric.
- **monitorInteractions**: Monitors user interactions.
- **initPerformanceMonitoring**: Initializes all performance monitoring.

## Performance Optimization

The application uses various techniques to optimize performance:

### Code Splitting

The application uses dynamic imports to split the code into smaller chunks:

```tsx
const DynamicComponent = dynamic(() => import("@/components/DynamicComponent"), {
  loading: () => <Loading />,
  ssr: false
});
```

### Image Optimization

The application uses Next.js Image component to optimize images:

```tsx
<Image
  src="/images/home/hero.jpg"
  alt="Hero background"
  fill
  priority={true}
  fetchPriority="high"
  sizes="100vw"
  quality={60}
  className="object-cover"
/>
```

### CSS Optimization

The application uses CSS optimization techniques:

- **CSS Modules**: For component-specific styles.
- **Tailwind CSS**: For utility-first styling.
- **Critical CSS**: For loading critical styles first.

### Lazy Loading

The application uses lazy loading for non-critical content:

```tsx
<img
  src="placeholder.jpg"
  data-src="actual-image.jpg"
  loading="lazy"
  decoding="async"
/>
```

### Performance Monitoring

The application monitors performance metrics:

- **Largest Contentful Paint (LCP)**: Measures loading performance.
- **Cumulative Layout Shift (CLS)**: Measures visual stability.
- **First Input Delay (FID)**: Measures interactivity.

## Mobile Optimization

The application is optimized for mobile devices:

### Mobile Detection

The application uses the `useDeviceDetection` hook to detect mobile devices:

```tsx
const { isMobile, isDetectionComplete } = useDeviceDetection();
```

This hook uses the `isMobileDevice` function from `deviceUtils.ts` which checks screen size and user agent:

```typescript
export const isMobileDevice = (options: DeviceDetectionOptions = {}): boolean => {
  // Return false if running on the server
  if (typeof window === 'undefined') return false;

  // Set default options
  const {
    mobileMaxWidth = BREAKPOINTS.MOBILE,
  } = options;

  // Check screen size
  const isSmallScreen = window.innerWidth <= mobileMaxWidth;

  // Check user agent for mobile devices
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobileUserAgent = /android|webos|iphone|ipod|blackberry|iemobile|opera mini/i.test(userAgent);

  return isSmallScreen || isMobileUserAgent;
};
```

### Mobile-Specific Components

The application uses mobile-specific components:

```tsx
{isMobile ? <MobileComponent /> : <DesktopComponent />}
```

### Mobile CSS

The application dynamically loads mobile-specific CSS using the `applyMobileOptimizations` function:

```typescript
export const applyMobileOptimizations = (): void => {
  // Return if running on the server
  if (typeof window === 'undefined' || !document) return;

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

The `mobile.css` file contains mobile-specific styles that are only loaded on mobile devices:

```css
/* Mobile-specific optimizations */
html.mobile-device {
  -webkit-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Improve touch targets */
html.mobile-device button,
html.mobile-device a,
html.mobile-device input {
  touch-action: manipulation;
}
```

### Touch Optimization

The application optimizes for touch interactions:

```css
html.mobile-device button,
html.mobile-device a,
html.mobile-device input,
html.mobile-device select,
html.mobile-device textarea {
  touch-action: manipulation;
}
```

### Mobile Hero Video

The mobile hero section uses a video background with a fallback image:

```tsx
<video
  ref={videoRef}
  autoPlay
  muted
  loop
  playsInline
  className="absolute inset-0 h-full w-full object-cover"
  poster="/images/home/hero/mobile-video/placeholder.jpg"
>
  <source src="/videos/heromobilevid.webm" type="video/webm" />
  <source src="/videos/heromobilevid.mp4" type="video/mp4" />
</video>
```

For more details on mobile optimization, see [Mobile Optimization Guide](./mobile-optimization.md).

## Testing

The application uses Jest for testing:

### Unit Tests

Located in `src/__tests__/`, these tests verify that individual components work correctly:

```tsx
describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

### Integration Tests

These tests verify that components work together correctly:

```tsx
describe('HomePage', () => {
  it('renders the home page with all critical components', () => {
    render(<HomePage />);
    expect(screen.getByTestId('navigation')).toBeInTheDocument();
    expect(screen.getByTestId('hero-section')).toBeInTheDocument();
  });
});
```

### Accessibility Tests

These tests verify that the application is accessible:

```tsx
describe('HomePage', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<HomePage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

## Deployment

The application is deployed to Vercel:

### Deployment Process

1. Push changes to the GitHub repository.
2. Vercel automatically builds and deploys the application.
3. The application is available at the Vercel URL.

### Environment Variables

The application uses environment variables for configuration:

- **NEXT_PUBLIC_API_URL**: The URL of the API.
- **NEXT_PUBLIC_GOOGLE_ANALYTICS_ID**: The Google Analytics ID.

## Best Practices

The application follows these best practices:

### Code Style

- Use TypeScript for type safety.
- Use ESLint for code linting.
- Use Prettier for code formatting.
- Use JSDoc comments for documentation.
- Avoid using 'any' type (strict TypeScript linting).
- Use PascalCase for component names and interfaces.
- Use camelCase for variables, functions, and file names.

### Component Design

- Use functional components with hooks.
- Use memo for performance optimization.
- Use proper prop types.
- Use error boundaries for error handling.
- Separate mobile-specific code completely from desktop code.
- Use clean, modular architecture with proper imports/exports.
- Minimize complexity and avoid code bloat.

### Performance

- Optimize images for performance.
- Use code splitting for faster loading.
- Monitor performance metrics.
- Optimize for mobile devices.
- Use next/image for optimized images.
- Use dynamic imports for heavy components.
- Implement route prefetching.
- Use clean Tailwind classes with @apply for reuse.
- Optimize bundle size through tree-shaking.

### Accessibility

- Use semantic HTML.
- Use ARIA attributes when necessary.
- Test for accessibility violations.
- Ensure keyboard navigation works.
- Provide proper vegetarian indicators (🔴 non-veg, 🟢 veg).

### Mobile

- Use mobile-specific components.
- Optimize for touch interactions.
- Disable hover effects on mobile.
- Test on real mobile devices.
- Ensure proper sizing of tap targets.
- Prevent horizontal scrolling issues.
- Scale typography appropriately down to 320px screens.

### Design Preferences

- Use consistent button styling with rounded buttons throughout the website.
- Use blue buttons with bright gold fill animations on hover (no right arrows).
- Maintain a consistent no-gap design philosophy between elements.
- Use asymmetric layouts (Brand Philosophy: 40/60 split, What's Happening: 60/40 split).
- Position the logo in the center on homepage mobile view, upper left on other pages.
- Display vegetarian dishes before non-vegetarian dishes in featured sections.
- Use subtle filter effects on the homepage.
- Use larger card images in offer displays.

## Troubleshooting

### Common Issues

#### Hydration Errors

If you encounter hydration errors, make sure that the server-rendered HTML matches the client-rendered HTML:

```tsx
// Use useEffect to avoid hydration errors
useEffect(() => {
  setIsMobile(isMobileDevice());
}, []);
```

#### Performance Issues

If you encounter performance issues, check the performance metrics:

```tsx
// Monitor performance metrics
const { lcpScore, clsScore, fidScore } = usePerformanceMetrics();
```

#### Mobile Issues

If you encounter issues on mobile devices, check the mobile detection:

```tsx
// Check if the device is mobile
const { isMobile, isDetectionComplete } = useDeviceDetection();
```

## Contributing

### Development Workflow

1. Create a new branch for your feature or bug fix.
2. Make your changes.
3. Write tests for your changes.
4. Run the tests to make sure they pass.
5. Submit a pull request.

### Code Review Process

1. All pull requests must be reviewed by at least one team member.
2. All tests must pass before merging.
3. Code must follow the project's coding standards.

### Documentation

1. Update the documentation when making changes.
2. Use JSDoc comments for code documentation.
3. Update the README.md file when necessary.
