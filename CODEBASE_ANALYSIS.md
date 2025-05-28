# Codebase Analysis

This project is a website for a restaurant called Akasa, built with Next.js and Sanity. It uses Tailwind CSS for styling and includes various components and sections to display information about the restaurant, its menu, events, and location. The website also includes performance optimizations and SEO enhancements.

## Key Technologies

- **Next.js:** A React framework for building web applications.
- **Sanity:** A headless CMS for managing content.
- **Tailwind CSS:** A utility-first CSS framework.
- **React:** A JavaScript library for building user interfaces.

## Project Structure

The project is structured as follows:

- `package.json`: Contains the project's dependencies and scripts.
- `next.config.js` or `next.config.ts`: Configures the Next.js application.
- `sanity.config.ts`: Configures the Sanity Studio.
- `src/app/page.tsx`: Defines the main page of the website.
- `src/components/`: Contains the React components used in the website.
- `src/styles/`: Contains the CSS styles for the website.
- `public/`: Contains static assets such as images and fonts.

## Key Components

The main page of the website (`src/app/page.tsx`) includes the following components:

- `Navigation`: The navigation bar.
- `Footer`: The footer.
- `NewResponsiveHero`: The hero section.
- `BrandPhilosophy`: The brand philosophy section.
- `SpicesSection`: The spices section.
- `GallerySection`: The gallery section.
- `WhatsHappeningSection`: The "What's Happening" section.
- `TestimonialsSection`: The testimonials section.
- `LocationSection`: The location section.
- `RestaurantStructuredData`: For SEO.

## Performance Optimizations

The website includes various performance optimizations, such as:

- Scroll performance optimizations using `applyScrollPerformanceOptimizations` in `src/utils/optimizedScrollUtils.ts`.
- Lazy loading of images using the `Lazy` component in `src/components/performance/Lazy.tsx`.
- Image optimization using the `MobileImageOptimizer` component in `src/components/performance/MobileImageOptimizer.tsx`.
- Code splitting and prefetching using Next.js features.

## SEO Enhancements

The website includes SEO enhancements, such as:

- Structured data for the restaurant using the `RestaurantStructuredData` component.
- Metadata for each page using the `metadata` object in the `src/app` directory.
- Optimized images using the `optimizedImageLoader` in `src/utils/optimizedImageLoader.ts`.

## Sanity CMS

The website uses Sanity as a headless CMS to manage content. The Sanity Studio is configured in `sanity.config.ts` and the schema types are defined in `src/sanity/schemaTypes`. The `structure` is defined in `src/sanity/structure.ts`.

This analysis provides a good overview of the codebase and can be used as a starting point for further exploration and development.
