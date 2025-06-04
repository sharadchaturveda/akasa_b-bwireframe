# Blog Post Page (`src/app/blog/[slug]/page.tsx`)

This document provides a comprehensive overview of the Blog Post Page, detailing its features, data handling, dynamic metadata generation, layout, and the structure of its components.

## Overview

The Blog Post Page is a dynamic route responsible for displaying individual blog posts in full detail. It fetches specific blog content from the Sanity Content Management System (CMS) based on the URL slug. This page also dynamically generates SEO-friendly metadata for each post, ensuring optimal visibility in search results and social media sharing.

## Features

-   **Dynamic Content Display**: Fetches and renders the full content of a single blog post based on its unique slug.
-   **Dynamic SEO Metadata**: Generates custom `Metadata` (title, description, Open Graph, Twitter cards) for each blog post, improving its shareability and search engine ranking.
-   **Error Handling**: Gracefully handles cases where a blog post is not found by redirecting to the Next.js `notFound()` page.
-   **Rich Content Rendering**: Utilizes a dedicated component (`BlogPostContent`) to parse and display the rich text body of the blog post, including images and other embedded content.

## Data Handling

The page retrieves individual blog post data directly from the Sanity CMS.

-   **`getPost(slug: string)` function**:
    -   **Query**: `*[_type == "post" && slug.current == $slug][0]{ title, description, slug, publishedAt, mainImage, body, author }` is used to fetch a single post matching the provided slug.
    -   **Fields Fetched**: Retrieves `title`, `description`, `slug`, `publishedAt`, `mainImage`, `body` (rich text content), and `author` details.
    -   **Error Handling**: If no post is found for the given slug, the function returns `null`.

## Dynamic Metadata Generation (`generateMetadata`)

The `generateMetadata` function is an asynchronous Next.js function that dynamically creates SEO metadata for each blog post.

-   **Purpose**: To provide search engines and social media platforms with accurate and rich information about the content of the page.
-   **Process**:
    1.  Fetches the blog post data using `getPost(slug)`.
    2.  If the post is not found, it returns an empty `Metadata` object.
    3.  Utilizes the `generateSEOMetadata` utility function (from `@/utils/seo`) to construct the `Metadata` object.
    -   **Key Metadata Fields**:
        -   `title`: The title of the blog post.
        -   `description`: A brief summary or excerpt of the post.
        -   `path`: The canonical URL path for the blog post (e.g., `/blog/my-post-slug`).
        -   `ogImagePath` and `twitterImagePath`: URLs for the Open Graph and Twitter card images, derived from the `mainImage` using Sanity's `urlFor` utility.

## Layout and Structure

The Blog Post Page has a simple layout focused on presenting the blog content clearly.

```tsx
// src/app/blog/[slug]/page.tsx
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  // ... Data fetching and notFound() logic ...

  return (
    <main className="container mx-auto px-4 pt-24 pb-12 md:px-8 lg:px-16">
      {/* Blog Post Content: Renders the full details of the blog post */}
      <BlogPostContent post={post} />
    </main>
  );
}
```

## Component Breakdown

The Blog Post Page primarily relies on one main component for rendering its content:

### 1. `BlogPostContent` (`@/components/blog/BlogPostContent`)
-   **Purpose**: Responsible for rendering the detailed content of a single blog post.
-   **Props**: Expects a `post` object, which includes the `body` (Portable Text) and other post details.
-   **Features**:
    -   Parses and displays the rich text content (`body`) of the blog post, which is typically in Sanity's Portable Text format.
    -   May include rendering of embedded images, code blocks, lists, and other rich media.
    -   Often displays the post title, author information, and publication date.
-   **Integration**: Occupies the main content area of the page.