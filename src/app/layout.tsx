import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Playfair_Display, Lora, Montserrat } from "next/font/google";
import "./globals.css";
import "./performance-styles.css";

// Import the ClientPerformanceWrapper component
import ClientPerformanceWrapper from '@/components/performance/ClientPerformanceWrapper';
import MobileClassProvider from '@/components/mobile/MobileClassProvider';

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
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="stylesheet" href="/fix-black-bar.css" />
        <link rel="stylesheet" href="/remove-overlays.css" />
        <link rel="stylesheet" href="/fix-testimonials.css" />
        <link rel="stylesheet" href="/force-hero-position.css" />
        <link rel="stylesheet" href="/logo-styles.css" />
        <link rel="stylesheet" href="/logo-sizing.css" />
        <link rel="stylesheet" href="/mobile-logo-position.css" />
        <script src="/detect-homepage.js" defer></script>
        <script src="/force-logo-size.js" defer></script>
        <script src="/force-hero-position.js" defer></script>
        <script src="/fix-logo-size.js" defer></script>
        <link rel="preload" as="fetch" href="/hero-fix.html" />
        <script dangerouslySetInnerHTML={{ __html: `
          fetch('/hero-fix.html')
            .then(response => response.text())
            .then(html => {
              document.head.insertAdjacentHTML('beforeend', html);
            });

          // Immediate logo sizing fix - with !important flags
          document.addEventListener('DOMContentLoaded', function() {
            const isMobile = window.innerWidth <= 767;
            const logoContainers = document.querySelectorAll('.logo-container');

            logoContainers.forEach(function(container) {
              if (isMobile) {
                // Use cssText to apply all styles at once with !important
                container.style.cssText = 'width: 300px !important; height: 120px !important; max-width: 300px !important; max-height: 120px !important;';

                if (window.innerWidth <= 375) {
                  container.style.cssText = 'width: 250px !important; height: 100px !important; max-width: 250px !important; max-height: 100px !important;';
                }

                // Force the image inside to be properly sized
                const img = container.querySelector('img');
                if (img) {
                  img.style.cssText = 'width: 100% !important; height: 100% !important; object-fit: contain !important;';
                }
              } else {
                // Desktop - use cssText with !important
                container.style.cssText = 'width: 500px !important; height: 200px !important; min-width: 500px !important; min-height: 200px !important;';

                if (window.innerWidth <= 1024) {
                  container.style.cssText = 'width: 450px !important; height: 180px !important; min-width: 450px !important; min-height: 180px !important;';
                }

                // Force the image inside to be properly sized
                const img = container.querySelector('img');
                if (img) {
                  img.style.cssText = 'width: 100% !important; height: 100% !important; object-fit: contain !important;';
                }
              }
            });
          });
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
        suppressHydrationWarning
      >
        {/* Add the ClientPerformanceWrapper component */}
        <ClientPerformanceWrapper />
        {/* Wrap children with MobileClassProvider */}
        <MobileClassProvider>
          {children}
        </MobileClassProvider>
      </body>
    </html>
  );
}
