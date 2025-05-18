import type { Metadata } from 'next';

/**
 * Interface for page-specific SEO metadata
 */
export interface PageSEOProps {
  /**
   * Page title (without site name)
   */
  title: string;
  
  /**
   * Page description
   */
  description: string;
  
  /**
   * Page-specific keywords
   */
  keywords?: string;
  
  /**
   * Page path (relative to domain root, e.g., "/menu/a-la-carte")
   */
  path?: string;
  
  /**
   * Open Graph image path (relative to domain root, e.g., "/images/menu/og-image.jpg")
   */
  ogImagePath?: string;
  
  /**
   * Twitter Card image path (relative to domain root, e.g., "/images/menu/twitter-card.jpg")
   */
  twitterImagePath?: string;
  
  /**
   * Whether this is the homepage
   */
  isHomePage?: boolean;
}

/**
 * Default SEO values
 */
const DEFAULT_SEO = {
  siteName: 'Akasa',
  domain: 'https://akasa.sg',
  defaultTitle: 'Finest Indian Cuisine in Singapore',
  defaultDescription: 'Experience the finest Indian cuisine at Akasa. Located at 79 Robinson Road, Singapore. Open Monday to Saturday, 11:30am to 10:30pm.',
  defaultKeywords: 'Indian cuisine, Singapore restaurant, fine dining, Akasa, Indian food, Robinson Road, authentic Indian, luxury dining',
  defaultOgImage: '/images/seo/og-image.jpg',
  defaultTwitterImage: '/images/seo/twitter-card.jpg',
};

/**
 * Generate metadata for a page
 * 
 * @param props - Page-specific SEO properties
 * @returns Metadata object for Next.js
 */
export function generateMetadata({
  title,
  description,
  keywords,
  path = '',
  ogImagePath,
  twitterImagePath,
  isHomePage = false,
}: PageSEOProps): Metadata {
  // Full title with or without site name
  const fullTitle = isHomePage 
    ? `${DEFAULT_SEO.siteName} | ${DEFAULT_SEO.defaultTitle}`
    : `${title} – ${DEFAULT_SEO.siteName}`;
  
  // Full URL for canonical and OG
  const url = `${DEFAULT_SEO.domain}${path}`;
  
  // OG image URL
  const ogImageUrl = ogImagePath 
    ? `${DEFAULT_SEO.domain}${ogImagePath}` 
    : `${DEFAULT_SEO.domain}${DEFAULT_SEO.defaultOgImage}`;
  
  // Twitter image URL
  const twitterImageUrl = twitterImagePath 
    ? `${DEFAULT_SEO.domain}${twitterImagePath}` 
    : `${DEFAULT_SEO.domain}${DEFAULT_SEO.defaultTwitterImage}`;
  
  // Combined keywords
  const combinedKeywords = keywords 
    ? `${keywords}, ${DEFAULT_SEO.defaultKeywords}`
    : DEFAULT_SEO.defaultKeywords;
  
  return {
    title: fullTitle,
    description: description,
    keywords: combinedKeywords,
    authors: [{ name: DEFAULT_SEO.siteName }],
    
    // Open Graph metadata
    openGraph: {
      title: fullTitle,
      description: description,
      url: url,
      siteName: DEFAULT_SEO.siteName,
      locale: 'en_SG',
      type: isHomePage ? 'website' : 'article',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${title} - ${DEFAULT_SEO.siteName}`,
        },
      ],
    },
    
    // Twitter Card metadata
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: description,
      images: [twitterImageUrl],
      creator: '@akasa_singapore',
      site: '@akasa_singapore',
    },
    
    // Canonical URL
    alternates: {
      canonical: url,
    },
  };
}
