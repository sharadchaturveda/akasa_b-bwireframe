import type { Metadata } from "next";
// Import the fonts we need
import { Playfair_Display, Montserrat } from "next/font/google";
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

// Import components
import MobileNavigation from '@/components/navigation/MobileNavigation';
import FloatingActionButtons from '@/components/ui/FloatingActionButtons';
import ScrollBehavior from '@/components/home/ScrollBehavior';

// Limit to only the fonts we need
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700"], // Only the weights we need
  display: 'swap',
  preload: true,
  fallback: ['serif'], // Fallback font if Google Fonts fails
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500"], // Only the weights we need
  display: 'swap',
  fallback: ['sans-serif'], // Fallback font if Google Fonts fails
});

export const metadata: Metadata = {
  title: "Akasa | Finest Indian Cuisine in Singapore",
  description: "Experience the finest Indian cuisine at Akasa. Located at 79 Robinson Road, Singapore. Open Monday to Saturday, 11:30am to 10:30pm.",
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

        {/* Local fonts CSS as fallback */}
        <link rel="stylesheet" href="/fonts/fonts.css" />

        {/* Preload critical images */}
        <link
          rel="preload"
          href="/images/brand/logo-white.png"
          as="image"
          type="image/png"
          fetchPriority="high"
        />

        {/* Preload testimonial background image */}
        <link
          rel="preload"
          href="/images/home/testimonials/background-alt.jpg"
          as="image"
          type="image/jpeg" // Assuming it's a JPEG, adjust if needed
          fetchPriority="high"
        />

        {/* Preload VisitUs background image */}
        <link
          rel="preload"
          href="/images/home/gallery/location.jpg?quality=75"
          as="image"
          type="image/jpeg"
          fetchPriority="high"
        />

        {/* Preload WebM video for mobile */}
        <link
          rel="preload"
          href="/images/home/hero/mobile-video/heromobilevid.webm"
          as="video"
          type="video/webm"
          media="(max-width: 767px)"
          fetchPriority="high"
        />

        {/* Critical CSS moved to external file for better performance */}

        {/* External script for mobile video optimization - moved from inline for better performance */}
        <script src="/scripts/mobileVideoOptimization.js" async></script>

        {/* Script for scroll optimization */}
        <script src="/scripts/scrollOptimization.js" async></script>

        {/* Script for font fallbacks */}
        <script src="/scripts/fontFallback.js" async></script>
      </head>
      <body
        className={`${playfair.variable} ${montserrat.variable} antialiased bg-black`}
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
