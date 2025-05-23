# Sanity CMS Blog Integration

This document outlines the integration of a Sanity CMS-powered blog into the Next.js project.

## Overview

The blog functionality has been integrated with the following features:
- Blog listing page at `/blog` fetching posts from Sanity.
- Dynamic individual blog post pages at `/blog/[slug]` rendering rich text content.
- Reusable `BlogPostCard` component for displaying post previews.

## Key Files and Components

- `src/utils/sanityClient.ts`: Sanity client setup. **Remember to update `projectId` in this file.**
- `src/app/blog/page.tsx`: Blog listing page.
- `src/app/blog/[slug]/page.tsx`: Individual blog post page.
- `src/components/blog/BlogPostCard.tsx`: Reusable component for blog post previews.

## New Dependencies

The following new dependency was added:
- `@portabletext/react`: Used for rendering rich text content from Sanity.

## Styling

The blog pages and components are styled using Tailwind CSS, consistent with the existing site aesthetics.

## Constraints Adhered To

- Existing API routes (e.g., `/api/send-inquiry`) remain untouched.
- Current global and page layouts are preserved.
- Existing code style, TypeScript conventions, and project structure have been followed.

## Testing

To test the integration:
1. Ensure your Sanity project is running and has some blog posts.
2. Update the `projectId` in `src/utils/sanityClient.ts` with your actual Sanity project ID.
3. Run the Next.js development server: `npm run dev`
4. Navigate to `/blog` to see the list of posts.
5. Click on a post to view its individual page.
6. Verify that existing API routes (e.g., form submissions) still function correctly.
