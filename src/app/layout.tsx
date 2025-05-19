import type { Metadata } from "next";
// Import essential CSS files
import "./globals.css";
// Import consolidated performance CSS
import "../styles/performance-optimizations.css";
// Import hero position fix CSS
import "../styles/hero-position-fix.css";

// Import components
import MobileNavigation from '@/components/navigation/MobileNavigation';
import FloatingActionButtons from '@/components/ui/FloatingActionButtons';
import ScrollBehavior from '@/components/home/ScrollBehavior';
import FacebookPixel from '@/components/tracking/FacebookPixel';

// Define CSS variables for font fallbacks
const fontVariables = {
  playfair: "--font-playfair",
  montserrat: "--font-montserrat"
};

export const metadata: Metadata = {
  title: "Akasa | Finest Indian Cuisine in Singapore",
  description: "Experience the finest Indian cuisine at Akasa. Located at 79 Robinson Road, Singapore. Open Monday to Saturday, 11:30am to 10:30pm.",
  keywords: "Indian cuisine, Singapore restaurant, fine dining, Akasa, Indian food, Robinson Road, authentic Indian, luxury dining",
  authors: [{ name: "Akasa" }],

  // Open Graph metadata
  openGraph: {
    title: "Akasa | Finest Indian Cuisine in Singapore",
    description: "Experience the finest Indian cuisine at Akasa. Located at 79 Robinson Road, Singapore. Open Monday to Saturday, 11:30am to 10:30pm.",
    url: "https://akasa.sg",
    siteName: "Akasa",
    locale: "en_SG",
    type: "website",
    images: [
      {
        url: "https://akasa.sg/images/seo/og-image.jpg", // Primary OG image
        width: 1200,
        height: 630,
        alt: "Akasa Restaurant - Finest Indian Cuisine in Singapore",
      },
      {
        url: "https://akasa.sg/images/home/hero/carousel/hero1.jpg", // Fallback image
        width: 1200,
        height: 630,
        alt: "Akasa Restaurant - Finest Indian Cuisine in Singapore",
      },
    ],
  },

  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    title: "Akasa | Finest Indian Cuisine in Singapore",
    description: "Experience the finest Indian cuisine at Akasa. Located at 79 Robinson Road, Singapore. Open Monday to Saturday, 11:30am to 10:30pm.",
    images: [
      "https://akasa.sg/images/seo/twitter-card.jpg", // Primary Twitter Card image
      "https://akasa.sg/images/home/hero/carousel/hero1.jpg", // Fallback image
    ],
    creator: "@akasa_singapore",
    site: "@akasa_singapore",
  },

  // Canonical URL
  alternates: {
    canonical: "https://akasa.sg",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 5.0,
  minimumScale: 1.0,
  userScalable: true,
  viewportFit: "cover",
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Safari-specific viewport fix */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />

        {/* Additional SEO meta tags */}
        <meta name="author" content="Akasa" />
        <meta name="robots" content="index, follow" />
        <meta name="geo.region" content="SG" />
        <meta name="geo.placename" content="Singapore" />
        <link rel="icon" href="/favicon.ico" />

        {/* Local fonts CSS as fallback */}
        <link rel="stylesheet" href="/fonts/fonts.css" />

        {/* System font fallbacks */}
        <style dangerouslySetInnerHTML={{ __html: `
          /* System font fallbacks */
          :root {
            --font-playfair: Georgia, 'Times New Roman', Times, serif;
            --font-montserrat: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          }

          .font-playfair,
          .font-playfair-display,
          [class*="font-playfair"],
          h1, h2, h3, h4, h5, h6 {
            font-family: var(--font-playfair) !important;
          }

          .font-montserrat,
          [class*="font-montserrat"],
          body, p, div, span, button, a {
            font-family: var(--font-montserrat) !important;
          }
        `}} />

        {/* Removed preload links that were causing warnings */}

        {/* Critical CSS moved to external file for better performance */}

        {/* Consolidated performance optimizations */}
        <link rel="stylesheet" href="/styles/performance-optimizations.css" />
        <script src="/scripts/performance-optimizations.js" async></script>

        {/* Mobile video autoplay helper */}
        <script src="/scripts/mobile-video-autoplay.js" async></script>

        {/* Hero text positioning */}
        <link rel="stylesheet" href="/styles/hero-text-position.css" />

        {/* Desktop hero fix - load last to override other styles */}
        <link rel="stylesheet" href="/styles/desktop-hero-fix.css" />
      </head>
      <body
        className="antialiased bg-black font-system"
        style={{
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          textRendering: 'optimizeLegibility',
          overscrollBehavior: 'none',
          overflowX: 'hidden'
        }}
      >
        {/* Facebook Pixel - Global tracking */}
        <FacebookPixel />

        {/* Mobile Navigation - Fixed at the top of every page */}
        <MobileNavigation />

        {/* Floating Action Buttons - Fixed on all pages */}
        <FloatingActionButtons />

        {/* Apply scroll behavior optimizations */}
        <ScrollBehavior />

        {children}
      </body>
    </html>
  );
}
