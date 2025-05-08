import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Playfair_Display, Lora, Montserrat } from "next/font/google";
import "./globals.css";
import "./performance-styles.css";
import '@/styles/mobile-navigation-fix.css';
import '@/styles/mobile-section-fix.css';
import '@/styles/mobile-hero-fix.css';

// Import the ClientPerformanceWrapper component
import ClientPerformanceWrapper from '@/components/performance/ClientPerformanceWrapper';
import MobileNavigation from '@/components/navigation/MobileNavigation';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap', // Add display swap for better font loading
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: 'swap',
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: 'swap',
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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
        {/* Critical CSS for immediate loading - prevents flash of content on mobile */}
        <style dangerouslySetInnerHTML={{ __html: `
          @media (max-width: 767px) {
            /* Hide text and buttons, but not video */
            .hero-section h1, .hero-section p, .hero-section button, .hero-section svg, .hero-section a,
            .hero-section .logo, .hero-section [alt="Akasa Logo"] {
              display: none !important;
            }
            /* Background image as fallback */
            .hero-section {
              background-image: url('/images/home/hero/hero-home.jpg') !important;
              background-size: cover !important;
              background-position: center !important;
            }
            /* Ensure video is visible */
            .hero-section video, video {
              display: block !important;
              visibility: visible !important;
              z-index: 2 !important;
              opacity: 1 !important;
            }
          }
        ` }} />

        {/* Inline script to ensure video plays */}
        <script dangerouslySetInnerHTML={{ __html: `
          // Function to ensure video plays on mobile
          function ensureMobileVideoPlays() {
            if (window.innerWidth >= 768) return; // Only run on mobile

            // Create a video element
            const video = document.createElement('video');
            video.muted = true;
            video.playsInline = true;
            video.autoplay = true;
            video.loop = true;
            video.src = '/images/home/hero/mobile-video/heromobilevid.mp4?nocache=' + Date.now();
            video.style.position = 'absolute';
            video.style.top = '0';
            video.style.left = '0';
            video.style.width = '100%';
            video.style.height = '100%';
            video.style.objectFit = 'cover';
            video.style.zIndex = '10';

            // Add to body temporarily to trigger autoplay
            document.body.appendChild(video);

            // Try to play
            video.play().catch(function() {
              console.log('Video play failed in preload');
            });

            // Remove after 1 second
            setTimeout(function() {
              if (document.body.contains(video)) {
                document.body.removeChild(video);
              }
            }, 1000);
          }

          // Run on page load
          if (document.readyState === 'complete') {
            ensureMobileVideoPlays();
          } else {
            window.addEventListener('load', ensureMobileVideoPlays);
          }
        ` }} />
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
        {/* Mobile Navigation - Fixed at the top of every page */}
        <MobileNavigation />

        {children}
      </body>
    </html>
  );
}
