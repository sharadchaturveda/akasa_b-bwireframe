# Blog Index Page (`src/app/blog/page.tsx`)

This document provides a comprehensive overview of the Blog Index Page, detailing its features, data handling, layout, and the structure of its components.

## Overview

The Blog Index Page serves as the main listing page for all blog posts published on the Akasa Restaurant website. It fetches blog content from the Sanity Content Management System (CMS) and displays them as a collection of cards, allowing users to browse available articles. The page is configured for Incremental Static Regeneration (ISR) to ensure fresh content while maintaining performance benefits.

## Features

-   **Dynamic Blog Post Listing**: Fetches and displays a list of blog posts from Sanity CMS.
-   **Incremental Static Regeneration (ISR)**: The page is revalidated every 60 seconds, ensuring that new or updated blog posts are reflected on the site without requiring a full redeploy.
-   **Dedicated Blog Hero Section**: A unique hero component tailored for the blog section, providing an engaging visual introduction.
-   **Responsive Grid Layout**: Blog posts are presented in a responsive grid, adapting to various screen sizes for optimal readability.

## Data Handling

The page retrieves blog post data directly from the Sanity CMS using `sanityClient.fetch`.

-   **Query**: A GraphQL-like query is used to fetch all documents of type "post", specifically retrieving `_id`, `title`, `slug`, `publishedAt`, `excerpt`, and `mainImage`.
-   **Ordering**: Posts are ordered by their `publishedAt` field in descending order, ensuring the most recent posts appear first.

## Layout and Structure

The Blog Index Page utilizes a straightforward layout, starting with a hero section followed by a main content area that houses the blog post listings.

The page structure is as follows:
1.  **`BlogHeroSection`**: This component is rendered at the top, serving as the visual introduction to the blog.
2.  **`main` element**: This element acts as the main content container.
    -   It applies responsive styling for centering and padding (`container mx-auto px-4 py-12 md:px-8 lg:px-16`).
    -   Inside the `main` element, a `section` is used to create a grid layout for the blog posts.
    -   **`BlogPostCard`**: Each fetched blog post is mapped to a `BlogPostCard` component, which is rendered within the grid.

## Component Breakdown

The Blog Index Page is primarily composed of the following components:

### 1. `BlogHeroSection` (`@/components/blog/BlogHeroSection`)
-   **Purpose**: Serves as the introductory hero section for the blog.
-   **Features**: Likely includes a title (e.g., "Our Blog"), a brief description, and potentially a background image or visual element relevant to the blog.
-   **Integration**: Placed at the top of the page, before the main content area.

### 2. `BlogPostCard` (`@/components/blog/BlogPostCard`)
-   **Purpose**: Renders a concise preview of an individual blog post.
-   **Props**: Expects a `post` object containing `_id`, `title`, `slug`, `publishedAt`, `excerpt`, and `mainImage`.
-   **Features**: Displays the post's title, a short excerpt, publication date, and a featured image. It also provides a link to the full blog post.
-   **Integration**: Rendered within a grid layout, with one card per blog post fetched from Sanity.

## Performance Considerations

-   **ISR (Incremental Static Regeneration)**: The `revalidate = 60` export ensures that the page is statically generated at build time but can be revalidated (re-generated) on the server in the background at most every 60 seconds. This provides the benefits of static sites (fast load times) with the freshness of server-rendered content.
-   **Sanity Client**: The `sanityClient` is configured to fetch data efficiently.