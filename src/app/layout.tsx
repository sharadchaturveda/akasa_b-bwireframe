import type { Metadata } from "next";
// Remove Google Fonts imports to fix font loading issues
import "./globals.css";
import "./performance-styles.css";
import '@/styles/mobile-navigation-fix.css';
import '@/styles/mobile-section-fix.css';
import '@/styles/mobile-hero-fix.css';
import '../styles/hero-position-fix.css';
import '@/styles/scroll-performance.css';
// Add our new image loading fix CSS
import '../styles/image-loading-fix.css';
// Add font fallbacks CSS
import '../styles/font-fallbacks.css';
// Add hero loading fix CSS
import '../styles/hero-loading-fix.css';
// Add critical CSS
import '../styles/critical.css';
// Add mobile video brightness fix CSS
import '../styles/mobile-video-brightness.css';
// Add audio button animations CSS
import '../styles/audio-button-animations.css';

// Import components
import MobileNavigation from '@/components/navigation/MobileNavigation';
import FloatingActionButtons from '@/components/ui/FloatingActionButtons';
import ScrollBehavior from '@/components/home/ScrollBehavior';

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

        {/* Simple audio button script */}
        <script src="/scripts/simple-audio-button.js"></script>

        {/* Script for scroll optimization */}
        <script src="/scripts/scrollOptimization.js" async></script>

        {/* Script for font fallbacks */}
        <script src="/scripts/fontFallback.js" async></script>

        {/* Mobile video fixes */}
        <link rel="stylesheet" href="/styles/mobile-video-brightness.css" />
        <link rel="stylesheet" href="/styles/video-playback-fix.css" />

        {/* Video fix scripts */}
        <script src="/scripts/videoFix.js" async></script>
        <script src="/scripts/videoPlaybackFix.js" async></script>
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
