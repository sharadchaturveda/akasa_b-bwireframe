# Sanity CMS Integration and Data Flow

This document provides a comprehensive overview of how Sanity Content Management System (CMS) is integrated into the Akasa Restaurant website, detailing its configuration, data modeling, data fetching patterns, and overall data flow.

## Overview

Sanity CMS is utilized in this project as a headless content management system, primarily for managing blog-related content such as posts, categories, and authors. It provides a flexible and scalable solution for content creators to manage website content independently of the development process. The integration allows for dynamic content updates without requiring code deployments.

## Key Components and Configuration

The Sanity CMS integration involves several key files and concepts:

### 1. Sanity Studio Configuration (`sanity.config.ts`)
-   **Purpose**: Defines the overall configuration for the Sanity Studio, which is the web-based content authoring environment.
-   **Location**: `sanity.config.ts` at the project root.
-   **Details**: Specifies the base path for the studio (`/studio`), loads project ID and dataset from environment variables, imports content schema definitions, and includes essential plugins like `structureTool` and `visionTool`.

### 2. Environment Variables (`src/sanity/env.ts`)
-   **Purpose**: Securely manages sensitive Sanity project credentials and API versions.
-   **Location**: `src/sanity/env.ts`.
-   **Details**: Exports `NEXT_PUBLIC_SANITY_API_VERSION`, `NEXT_PUBLIC_SANITY_DATASET`, and `NEXT_PUBLIC_SANITY_PROJECT_ID`. These are public environment variables accessible on the client-side. An assertion function ensures their presence.

### 3. Sanity Client (`src/sanity/lib/client.ts`)
-   **Purpose**: Initializes the Sanity client for fetching data from the CMS.
-   **Location**: `src/sanity/lib/client.ts`.
-   **Details**: Sets up the client with the project ID, dataset, and API version. `useCdn` is set to `false`, which is common for statically generated pages or ISR.

### 4. Content Schemas (`src/sanity/schemaTypes/`)
-   **Purpose**: Defines the structure and types of content that can be managed in Sanity.
-   **Location**: `src/sanity/schemaTypes/index.ts` (main entry point) and individual schema files (e.g., `authorType.ts`, `blockContentType.ts`, `categoryType.ts`, `postType.ts`).
-   **Details**: Defines document types like `postType` (for blog posts with fields like title, slug, image, body), `categoryType`, and `authorType`. `blockContentType` is a reusable schema for rich text.

### 5. Sanity Studio Structure (`src/sanity/structure.ts`)
-   **Purpose**: Customizes the navigation and organization of document types within the Sanity Studio interface.
-   **Location**: `src/sanity/structure.ts`.
-   **Details**: Uses Sanity's Structure Builder to define a custom list of items in the studio's sidebar, prioritizing `Posts`, `Categories`, and `Authors`.

## Data Flow and Usage

The data flow from Sanity CMS to the Next.js application typically follows these steps:

1.  **Content Creation**: Content creators use the Sanity Studio (accessible at `/studio`) to create and manage documents.
2.  **Data Storage**: Content is stored in the Sanity backend.
3.  **Data Fetching in Next.js**:
    -   **Server Components**: Data is fetched using the `sanityClient` in server components for pages requiring fresh data at build time or on request.
    -   **Client Components**: The `sanityClient` can also be used within client-side data fetching mechanisms.
    -   **GROQ Queries**: Data is retrieved using GROQ (Graph-Relational Object Queries). For example, blog pages use GROQ to list posts or fetch a single post by slug.
4.  **Image Handling**: Images uploaded to Sanity are served via Sanity's image CDN. The `urlFor` utility is used to generate optimized image URLs for use with Next.js's `Image` component.
5.  **Dynamic Metadata**: For dynamic pages (like blog posts), `generateMetadata` functions in Next.js pages fetch data from Sanity to create SEO-friendly metadata, including Open Graph and Twitter card images.

## Example Data Flow (Blog Posts)

-   **Blog Index Page (`src/app/blog/page.tsx`)**: Fetches a list of all `post` documents, ordered by `publishedAt`. It uses Incremental Static Regeneration (ISR) with a revalidation period of 60 seconds.
-   **Blog Post Page (`src/app/blog/[slug]/page.tsx`)**: Fetches a single `post` document based on the URL slug. It dynamically generates metadata for the specific blog post.

## Future Considerations

-   **Expanding CMS Usage**: Sanity could be extended to manage other dynamic content like menu items, event details, or offers, reducing reliance on static data files.
-   **Webhooks for Instant Revalidation**: Implementing Sanity webhooks would allow for instant revalidation of pages whenever content is published or updated in the CMS, providing even fresher content.