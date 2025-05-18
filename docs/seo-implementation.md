# SEO Implementation Guide

This document explains the SEO implementation for the Akasa website.

## Overview

The website uses Next.js App Router's built-in metadata API to implement SEO best practices across all pages. This includes:

1. Basic meta tags (title, description, keywords)
2. Open Graph meta tags for social media sharing
3. Twitter Card meta tags for Twitter sharing
4. Canonical URLs
5. Structured metadata for search engines

## Implementation Details

### Root Layout Metadata

The root layout file (`src/app/layout.tsx`) contains the default site-wide metadata:

```typescript
export const metadata: Metadata = {
  title: "Akasa | Finest Indian Cuisine in Singapore",
  description: "Experience the finest Indian cuisine at Akasa...",
  keywords: "Indian cuisine, Singapore restaurant, fine dining...",
  // ... other metadata
};
```

This provides fallback metadata for all pages.

### Page-Specific Metadata

Each page can define its own metadata by creating a `metadata.ts` file in its directory:

```typescript
// src/app/menu/a-la-carte/metadata.ts
import { Metadata } from "next";
import { generateMetadata } from "@/utils/seo";

export const metadata: Metadata = generateMetadata({
  title: "À la Carte Menu",
  description: "Explore our exquisite à la carte dishes at Akasa...",
  keywords: "à la carte, Indian menu, fine dining menu...",
  path: "/menu/a-la-carte",
  ogImagePath: "/images/menu/a-la-carte/hero/hero.jpg",
});
```

### SEO Utility Function

The `src/utils/seo.ts` file contains a utility function to generate consistent metadata:

```typescript
export function generateMetadata({
  title,
  description,
  keywords,
  path = '',
  ogImagePath,
  twitterImagePath,
  isHomePage = false,
}: PageSEOProps): Metadata {
  // ... implementation
}
```

This ensures all pages follow the same metadata structure while allowing for customization.

## SEO Assets

SEO-specific images are stored in the `public/images/seo/` directory:

- `og-image.jpg` - Default Open Graph image (1200x630px)
- `twitter-card.jpg` - Default Twitter Card image (1200x600px)

## Best Practices

### Titles

- Keep titles under 60 characters
- Include the most important keywords near the beginning
- Use the format "Page Title – Akasa" for consistency (except homepage)

### Descriptions

- Keep descriptions between 150-160 characters
- Include relevant keywords naturally
- Make them compelling and descriptive

### Images

- Optimize images for fast loading (compress, proper dimensions)
- Include descriptive alt text
- Use high-quality, visually appealing images

### Keywords

- Include 5-10 relevant keywords per page
- Don't keyword stuff
- Focus on natural language and user intent

## Testing SEO

To test the SEO implementation:

1. Use the [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
2. Use the [Twitter Card Validator](https://cards-dev.twitter.com/validator)
3. Use [Google's Rich Results Test](https://search.google.com/test/rich-results)
4. Use [Google's Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)

## Maintenance

When adding new pages:

1. Create a `metadata.ts` file in the page directory
2. Use the `generateMetadata` function to generate metadata
3. Include relevant, unique content in the title and description
4. Add page-specific Open Graph images when appropriate

## Structured Data

For pages that benefit from structured data (like restaurant information), add JSON-LD scripts in the page component:

```typescript
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "Akasa",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "79 Robinson Road",
        "addressLocality": "Singapore",
        "postalCode": "068897",
        "addressCountry": "SG"
      },
      // ... other restaurant data
    })
  }}
/>
```

This helps search engines understand the content and can lead to rich results in search listings.
