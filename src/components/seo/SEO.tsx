import { memo } from 'react';
import Head from 'next/head';

/**
 * Props for the SEO component
 */
export interface SEOProps {
  /**
   * The page title
   */
  title: string;
  
  /**
   * The page description
   */
  description: string;
  
  /**
   * The canonical URL
   */
  canonical?: string;
  
  /**
   * The page image
   */
  image?: string;
  
  /**
   * The page type
   * @default "website"
   */
  type?: string;
  
  /**
   * Whether the page is the homepage
   * @default false
   */
  isHomePage?: boolean;
  
  /**
   * Additional meta tags
   */
  additionalMetaTags?: Array<{
    name?: string;
    property?: string;
    content: string;
  }>;
}

/**
 * SEO Component
 *
 * A component for adding SEO metadata to pages.
 * This component uses Next.js Head component.
 *
 * @param {SEOProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
const SEO = memo(function SEO({
  title,
  description,
  canonical,
  image,
  type = 'website',
  isHomePage = false,
  additionalMetaTags = []
}: SEOProps) {
  // Base title
  const baseTitle = 'Akasa Restaurant';
  
  // Full title
  const fullTitle = isHomePage ? baseTitle : `${title} | ${baseTitle}`;
  
  // Base URL
  const baseUrl = 'https://akasa.sg';
  
  // Full canonical URL
  const fullCanonical = canonical ? `${baseUrl}${canonical}` : baseUrl;
  
  // Full image URL
  const fullImage = image ? `${baseUrl}${image}` : `${baseUrl}/images/og-image.jpg`;
  
  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullCanonical} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:site_name" content={baseTitle} />
      
      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      
      {/* Additional Meta Tags */}
      {additionalMetaTags.map((tag, index) => (
        <meta
          key={index}
          {...(tag.name && { name: tag.name })}
          {...(tag.property && { property: tag.property })}
          content={tag.content}
        />
      ))}
    </Head>
  );
});

export { SEO };
export default SEO;
