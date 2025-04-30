import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Playfair_Display, Lora, Montserrat } from "next/font/google";
import "./globals.css";

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
  viewport: "width=device-width, initial-scale=1.0, maximum-scale=5.0",
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
        <link rel="preload" href="/images/home/hero.jpg?quality=60&width=1200" as="image" fetchpriority="high" />
        <link rel="preload" href="/images/common/logo.svg" as="image" type="image/svg+xml" fetchpriority="high" />

        {/* Add preconnect for faster resource loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

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
        `}} />

        {/* Defer non-critical JavaScript */}
        <script dangerouslySetInnerHTML={{ __html: `
          // Defer non-critical JavaScript
          if (typeof window !== 'undefined') {
            document.addEventListener('DOMContentLoaded', function() {
              // Add a small delay to prioritize rendering
              setTimeout(function() {
                // Load non-critical resources after page is interactive
                var links = document.querySelectorAll('link[data-defer]');
                for (var i = 0; i < links.length; i++) {
                  var link = links[i];
                  if (link.getAttribute('data-href')) {
                    link.setAttribute('href', link.getAttribute('data-href'));
                    link.removeAttribute('data-defer');
                  }
                }
              }, 1000);
            });
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
        {children}
      </body>
    </html>
  );
}
