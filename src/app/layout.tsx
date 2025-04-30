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

        {/* Performance monitoring script */}
        <script dangerouslySetInnerHTML={{ __html: `
          // Simple performance monitoring
          if (typeof window !== 'undefined' && window.performance && window.performance.mark) {
            // Mark the start of page load
            window.performance.mark('page_start');

            // Listen for when the page is fully loaded
            window.addEventListener('load', function() {
              window.performance.mark('page_loaded');

              // Measure the time between start and load
              window.performance.measure('page_load_time', 'page_start', 'page_loaded');

              // Get the measurement
              const pageLoadMeasure = window.performance.getEntriesByName('page_load_time')[0];

              // Log the measurement (could be sent to analytics in production)
              console.log('Page load time: ' + pageLoadMeasure.duration.toFixed(2) + 'ms');

              // Measure First Contentful Paint if available
              const paintEntries = window.performance.getEntriesByType('paint');
              const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');

              if (fcpEntry) {
                console.log('First Contentful Paint: ' + fcpEntry.startTime.toFixed(2) + 'ms');
              }
            });
          }
        `}} />

        {/* Defer non-critical JavaScript */}
        <script dangerouslySetInnerHTML={{ __html: `
          // Defer non-critical JavaScript
          if (typeof window !== 'undefined') {
            // Use requestIdleCallback for better performance
            const scheduleTask = window.requestIdleCallback || window.setTimeout;

            document.addEventListener('DOMContentLoaded', function() {
              // Add a small delay to prioritize rendering
              scheduleTask(function() {
                // Load non-critical resources after page is interactive
                var links = document.querySelectorAll('link[data-defer]');
                for (var i = 0; i < links.length; i++) {
                  var link = links[i];
                  if (link.getAttribute('data-href')) {
                    link.setAttribute('href', link.getAttribute('data-href'));
                    link.removeAttribute('data-defer');
                  }
                }

                // Optimize image loading for visible images
                if ('IntersectionObserver' in window) {
                  const lazyImageObserver = new IntersectionObserver((entries) => {
                    entries.forEach((entry) => {
                      if (entry.isIntersecting) {
                        const lazyImage = entry.target;
                        if (lazyImage.dataset.src) {
                          lazyImage.src = lazyImage.dataset.src;
                          lazyImage.removeAttribute('data-src');
                          lazyImageObserver.unobserve(lazyImage);
                        }
                      }
                    });
                  });

                  document.querySelectorAll('img[data-src]').forEach((img) => {
                    lazyImageObserver.observe(img);
                  });
                }

                // Optimize background images
                if ('IntersectionObserver' in window) {
                  const lazyBackgroundObserver = new IntersectionObserver((entries) => {
                    entries.forEach((entry) => {
                      if (entry.isIntersecting) {
                        const element = entry.target;
                        if (element.dataset.background) {
                          element.style.backgroundImage = element.dataset.background;
                          element.removeAttribute('data-background');
                          lazyBackgroundObserver.unobserve(element);
                        }
                      }
                    });
                  });

                  document.querySelectorAll('[data-background]').forEach((el) => {
                    lazyBackgroundObserver.observe(el);
                  });
                }
              }, { timeout: 1000 });
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
