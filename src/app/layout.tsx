import type { Metadata } from "next";
// Import only the fonts we need
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import "./performance-styles.css";
import '@/styles/mobile-navigation-fix.css';
import '@/styles/mobile-section-fix.css';
import '@/styles/mobile-hero-fix.css';
import '../styles/hero-position-fix.css';
import '@/styles/scroll-performance.css';

// Import components
import MobileNavigation from '@/components/navigation/MobileNavigation';
import FloatingActionButtons from '@/components/ui/FloatingActionButtons';

// Limit to only the fonts we actually need
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700"], // Only the weights we need
  display: 'swap',
  preload: true,
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500"], // Only the weights we need
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Akasa | Finest Indian Cuisine in Singapore",
  description: "Experience the finest Indian cuisine at Akasa. Located at 79 Robinson Road, Singapore. Open Monday to Saturday, 11:30am to 10:00pm.",
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

        {/* Preload critical images */}
        <link
          rel="preload"
          href="/images/brand/logo-white.png"
          as="image"
          type="image/png"
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

        {/* Critical CSS for immediate loading - prevents flash of content on mobile */}
        <style dangerouslySetInnerHTML={{ __html: `
          @media (max-width: 767px) {
            /* Hide desktop content */
            .hero-section > div.hidden {
              display: none !important;
            }

            /* Hide logo on mobile */
            .hero-section .logo,
            .hero-section [alt="Akasa Logo"] {
              display: none !important;
            }

            /* Background image */
            .hero-section {
              background-color: #000 !important;
              background-image: url('/images/home/hero/hero-home.jpg') !important;
              background-size: cover !important;
              background-position: center !important;
              background-repeat: no-repeat !important;
            }

            /* Style text in mobile hero */
            .hero-section h1 {
              font-size: 2rem !important;
              line-height: 1.2 !important;
              margin-bottom: 1rem !important;
              text-shadow: 0 2px 4px rgba(0,0,0,0.5) !important;
            }

            /* No video styling */
          }

          /* Critical hero positioning - ensures logo and text are properly positioned */
          .hero-logo-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 40;
            display: flex;
            justify-content: center;
            padding-top: 6rem;
            height: 180px;
            min-height: 180px;
            overflow: visible;
          }

          .hero-text-container {
            margin-top: 8rem;
            padding-top: 2rem;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
        ` }} />

        {/* External script for mobile video optimization - moved from inline for better performance */}
        <script src="/scripts/mobileVideoOptimization.js" async></script>
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

        {children}
      </body>
    </html>
  );
}
