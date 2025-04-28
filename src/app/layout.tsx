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
        <link rel="preload" href="/images/hero.jpg?quality=60&width=1200" as="image" />
        <link rel="preload" href="/images/logo.svg" as="image" type="image/svg+xml" />

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
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${lora.variable} ${montserrat.variable} antialiased`}
        style={{
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          textRendering: 'optimizeLegibility'
        }}
      >
        {children}
      </body>
    </html>
  );
}
