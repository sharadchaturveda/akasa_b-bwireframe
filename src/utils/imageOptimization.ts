/**
 * Image Optimization Utilities
 *
 * This module provides utilities for optimizing images in the Next.js application.
 * It leverages Next.js built-in image optimization to serve AVIF format where supported.
 */

import { StaticImageData } from 'next/image';
import type { StaticImport } from 'next/dist/shared/lib/get-img-props';

/**
 * Get optimized image props for Next.js Image component
 *
 * This function returns props that can be spread into a Next.js Image component
 * to ensure optimal image loading and format selection.
 *
 * @param {Object} options - Configuration options
 * @param {string|StaticImageData} options.src - Image source
 * @param {number} [options.quality=75] - Image quality (1-100)
 * @param {boolean} [options.priority=false] - Whether the image is critical
 * @returns {Object} Props for Next.js Image component
 */
export function getOptimizedImageProps({
  src,
  quality = 75,
  priority = false,
}: {
  src: string | StaticImageData | StaticImport;
  quality?: number | string;
  priority?: boolean;
}) {
  // Ensure quality is a number
  const numericQuality = typeof quality === 'string' ? parseInt(quality, 10) : quality;
  return {
    src,
    quality: numericQuality,
    priority,
    // These props ensure Next.js will serve AVIF where supported
    // The formats order in next.config.js determines priority
    unoptimized: false,
  };
}

/**
 * Get image dimensions based on device type
 *
 * @param {Object} options - Configuration options
 * @param {Object} options.desktop - Desktop dimensions
 * @param {Object} options.mobile - Mobile dimensions
 * @param {boolean} options.isMobile - Whether the current device is mobile
 * @returns {Object} Image dimensions
 */
export function getResponsiveImageDimensions({
  desktop,
  mobile,
  isMobile,
}: {
  desktop: { width: number; height: number };
  mobile: { width: number; height: number };
  isMobile: boolean;
}) {
  return isMobile ? mobile : desktop;
}

/**
 * Generate sizes attribute for responsive images
 *
 * @param {Object} options - Configuration options
 * @param {number} options.mobileWidth - Width on mobile devices
 * @param {number} options.tabletWidth - Width on tablet devices
 * @param {number} options.desktopWidth - Width on desktop devices
 * @returns {string} Sizes attribute value
 */
export function getResponsiveSizes({
  mobileWidth,
  tabletWidth,
  desktopWidth,
}: {
  mobileWidth: number;
  tabletWidth: number;
  desktopWidth: number;
}) {
  return `
    (max-width: 640px) ${mobileWidth}px,
    (max-width: 1024px) ${tabletWidth}px,
    ${desktopWidth}px
  `.trim();
}

/**
 * Get image path with AVIF extension if available
 *
 * This is a utility function for background images in CSS
 * where Next.js Image component is not available.
 *
 * @param {string} path - Original image path
 * @returns {string} Path with AVIF extension if available
 */
export function getAvifPath(path: string): string {
  // Check if path already has an extension
  if (/\.(jpe?g|png|gif|webp)$/i.test(path)) {
    // For static images, we can suggest the AVIF version
    // This assumes the AVIF version exists at the same path
    return path.replace(/\.(jpe?g|png|gif|webp)$/i, '.avif');
  }

  // If no extension or not a format we can convert, return original
  return path;
}
