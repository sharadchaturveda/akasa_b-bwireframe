# Akasa Restaurant Website Documentation

## Table of Contents

1. [Introduction](#introduction)
2. [Project Structure](#project-structure)
3. [Technology Stack](#technology-stack)
4. [Getting Started](#getting-started)
5. [Architecture](#architecture)
6. [Components](#components)
7. [Hooks](#hooks)
8. [Utilities](#utilities)
9. [Performance Optimization](#performance-optimization)
10. [Mobile Optimization](#mobile-optimization)
11. [Testing](#testing)
12. [Deployment](#deployment)
13. [Best Practices](#best-practices)
14. [Troubleshooting](#troubleshooting)
15. [Contributing](#contributing)

## Introduction

The Akasa Restaurant Website is a Next.js application that showcases the restaurant's offerings, including menus, events, and reservation capabilities. The website is designed to be fast, responsive, and provide an excellent user experience on both desktop and mobile devices.

### Key Features

- Responsive design for desktop and mobile
- Performance-optimized for fast loading
- Menu browsing with different categories
- Events and offers sections
- Reservation system
- Mobile-specific optimizations

## Project Structure

The project follows a modular structure with clear separation of concerns:

```
akasa_b-bwireframe/
├── public/               # Static assets
│   ├── images/           # Image assets
│   ├── mobile.css        # Mobile-specific CSS
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

### Mobile-Specific Components

The application uses mobile-specific components:

```tsx
{isMobile ? <MobileComponent /> : <DesktopComponent />}
```

### Mobile CSS

The application loads mobile-specific CSS:

```tsx
<link rel="stylesheet" href="/mobile.css" />
```

### Touch Optimization

The application optimizes for touch interactions:

```css
html.mobile-device button,
html.mobile-device a {
  touch-action: manipulation;
}
```

### Disabling Hover Effects

The application disables hover effects on mobile devices:

```css
html.mobile-device button:hover,
html.mobile-device a:hover {
  background-color: initial !important;
  color: initial !important;
}
```

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

### Component Design

- Use functional components with hooks.
- Use memo for performance optimization.
- Use proper prop types.
- Use error boundaries for error handling.

### Performance

- Optimize images for performance.
- Use code splitting for faster loading.
- Monitor performance metrics.
- Optimize for mobile devices.

### Accessibility

- Use semantic HTML.
- Use ARIA attributes when necessary.
- Test for accessibility violations.
- Ensure keyboard navigation works.

### Mobile

- Use mobile-specific components.
- Optimize for touch interactions.
- Disable hover effects on mobile.
- Test on real mobile devices.

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
