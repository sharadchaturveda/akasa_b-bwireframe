# SEO Implementation Guide

This document explains the SEO implementation for the Akasa website.

## Overview

The website utilizes Next.js App Router's metadata API for SEO, including basic meta tags, Open Graph, Twitter Cards, canonical URLs, and structured metadata.

## Implementation Details

### Root Layout Metadata

`src/app/layout.tsx` defines default site-wide metadata, serving as a fallback for all pages.

### Page-Specific Metadata

Individual pages can define their own metadata by creating a `metadata.ts` file in their respective directories, overriding the root layout.

### SEO Utility Function

`src/utils/seo.ts` provides a `generateMetadata` utility function to ensure consistent metadata structure across pages while allowing customization.

## SEO Assets

SEO-specific images are stored in the `public/images/seo/` directory:

- `og-image.jpg` - Default Open Graph image (1200x630px)
- `twitter-card.jpg` - Default Twitter Card image (1200x600px)

## Best Practices

### Titles

-   Keep titles under 60 characters.
-   Include important keywords early.
-   Use "Page Title – Akasa" format (except homepage).

### Descriptions

-   Keep descriptions between 150-160 characters.
-   Include relevant keywords naturally.
-   Make them compelling.

### Images

-   Optimize for fast loading (compress, proper dimensions).
-   Include descriptive alt text.
-   Use high-quality, visually appealing images.

### Keywords

-   Include 5-10 relevant keywords per page.
-   Avoid keyword stuffing.
-   Focus on natural language and user intent.

## Testing SEO

To test SEO implementation, use:

1.  [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
2.  [Twitter Card Validator](https://cards-dev.twitter.com/validator)
3.  [Google's Rich Results Test](https://search.google.com/test/rich-results)
4.  [Google's Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)

## Maintenance

When adding new pages:

1.  Create a `metadata.ts` file.
2.  Use `generateMetadata` function.
3.  Include relevant, unique title and description.
4.  Add page-specific Open Graph images if appropriate.

## Structured Data

For pages benefiting from structured data (e.g., restaurant info), add JSON-LD scripts directly in the page component. This helps search engines understand content and can lead to rich results.
