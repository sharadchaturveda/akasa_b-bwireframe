import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Playfair_Display, Lora, Montserrat } from "next/font/google";
import "./globals.css";

// Import the ClientPerformanceWrapper component
import ClientPerformanceWrapper from '@/components/performance/ClientPerformanceWrapper';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Akasa | Finest Indian Cuisine in Singapore",
  description: "Experience the finest Indian cuisine at Akasa. Located at 79 Robinson Road, Singapore. Open Monday to Saturday, 11:30am to 10:00pm.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 5.0,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preload critical assets */}
        <link rel="preload" href="/images/home/hero.jpg?quality=60&width=1200" as="image" fetchPriority="high" />
        <link rel="preload" href="/images/common/logo.svg" as="image" type="image/svg+xml" fetchPriority="high" />
        <link rel="preload" href="/images/home/philosophy-bg.jpg?quality=60&width=800" as="image" fetchPriority="high" />
        <link rel="preload" href="/images/home/drink.jpg?quality=60&width=800" as="image" fetchPriority="high" />

        {/* Preload critical fonts */}
        <link rel="preload" href="/_next/static/media/c9a5bc6a7c948fb0-s.p.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

        {/* Add preconnect for faster resource loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Add preconnect for analytics and other third-party resources */}
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* Add viewport-based image dimensions to prevent layout shifts */}
        <style dangerouslySetInnerHTML={{ __html: `
          /* Prevent layout shifts during image loading */
          .image-container {
            position: relative;
            background-color: #111;
            overflow: hidden;
          }

          /* Ensure images maintain aspect ratio */
          img {
            max-width: 100%;
            height: auto;
          }

          /* Disable smooth scrolling for better performance */
          @media (prefers-reduced-motion: reduce) {
            html {
              scroll-behavior: auto !important;
            }
          }

          /* Advanced performance optimizations */
          @media screen and (min-width: 1024px) {
            /* Only apply these optimizations on desktop */
            img[loading="lazy"] {
              content-visibility: auto;
            }

            /* Optimize paint performance for fixed elements */
            .fixed, .absolute {
              will-change: transform;
              transform: translateZ(0);
            }

            /* Optimize paint performance for sections */
            section {
              contain: content;
            }
          }

          /* Optimize image decoding */
          img {
            decoding: async;
          }

          /* Optimize font display */
          @font-face {
            font-display: swap;
          }
        `}} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${lora.variable} ${montserrat.variable} antialiased bg-black`}
        style={{
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          textRendering: 'optimizeLegibility',
          overscrollBehavior: 'none',
          overflowX: 'hidden'
        }}
      >
        {/* Add the ClientPerformanceWrapper component */}
        <ClientPerformanceWrapper />
        {children}
      </body>
    </html>
  );
}
