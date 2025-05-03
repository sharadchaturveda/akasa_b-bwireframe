# Akasa Restaurant Website

A modern, performance-optimized website for Akasa, a fine dining Indian restaurant in Singapore.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Documentation](#documentation)
- [Performance Optimization](#performance-optimization)
- [Mobile Optimization](#mobile-optimization)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)

## Overview

The Akasa Restaurant Website is a Next.js application that showcases the restaurant's offerings, including menus, events, and reservation capabilities. The website is designed to be fast, responsive, and provide an excellent user experience on both desktop and mobile devices.

## Features

- **Responsive Design**: Optimized for both desktop and mobile devices
- **Performance Optimized**: Fast loading times and smooth interactions
- **Menu Browsing**: Browse different menu categories
- **Events Section**: View upcoming events
- **Offers Section**: View current offers
- **Reservation System**: Make reservations online
- **Mobile-Specific Optimizations**: Tailored experience for mobile users

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
├── public/               # Static assets
├── src/                  # Source code
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components
│   ├── data/             # Data files
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Library code
│   ├── pages/            # Next.js Pages Router (legacy)
│   ├── styles/           # Global styles
│   ├── types/            # TypeScript type definitions
│   └── utils/            # Utility functions
├── DOCUMENTATION.md      # Comprehensive documentation
├── next.config.js        # Next.js configuration
├── package.json          # NPM package configuration
└── tsconfig.json         # TypeScript configuration
```

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

## Contributing

1. Create a new branch for your feature or bug fix
2. Make your changes
3. Write tests for your changes
4. Run the tests to make sure they pass
5. Submit a pull request
