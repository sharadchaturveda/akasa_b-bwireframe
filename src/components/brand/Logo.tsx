"use client";

import { memo } from 'react';
import Image from 'next/image'
;
import Link from 'next/link';
import { cn } from '@/lib/utils';

/**
 * Logo sizes
 */
export type LogoSize = 'small' | 'medium' | 'large' | 'custom';

/**
 * Props for the Logo component
 */
export interface LogoProps {
  /**
   * The size of the logo
   * @default "medium"
   */
  size?: LogoSize;

  /**
   * Custom width for the logo (only used when size is "custom")
   */
  width?: number;

  /**
   * Custom height for the logo (only used when size is "custom")
   */
  height?: number;

  /**
   * Whether to link to the homepage
   * @default true
   */
  withLink?: boolean;

  /**
   * Whether to use priority loading
   * @default true
   */
  priority?: boolean;

  /**
   * The opacity of the logo
   * @default 1
   */
  opacity?: number;

  /**
   * The scale of the logo
   * @default 1
   */
  scale?: number;

  /**
   * Additional CSS classes for the container
   */
  className?: string;

  /**
   * Additional CSS classes for the image
   */
  imageClassName?: string;
}

/**
 * Logo Component
 *
 * A component for displaying the brand logo.
 *
 * @param {LogoProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
const Logo = memo(function Logo({
  size = 'medium',
  width,
  height,
  withLink = true,
  priority = true,
  opacity = 1,
  scale = 1,
  className,
  imageClassName
}: LogoProps) {
  // Size configuration
  const sizeConfig = {
    small: {
      width: 120,
      height: 60
    },
    medium: {
      width: 180,
      height: 90
    },
    large: {
      width: 240,
      height: 120
    },
    custom: {
      width: width || 180,
      height: height || 90
    }
  };

  const { width: logoWidth, height: logoHeight } = sizeConfig[size];

  // Logo content
  const logoContent = (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 flex items-center">
        <Image src="/images/brand/logo-white.png"
          alt="Logo"
          fill
          priority={priority}
          sizes={`${logoWidth}px`}
          quality={85} /* High quality for logo, balanced for performance */
          className={cn("object-contain object-left", imageClassName)}
          style={{
            maxWidth: '100%',
            transform: `scale(${scale})`,
            opacity
          }}
        />
      </div>
    </div>
  );

  // Container classes
  const containerClasses = cn(
    "relative",
    className
  );

  // Return with or without link
  if (withLink) {
    return (
      <Link
        href="/"
        className={containerClasses}
        style={{ height: `${logoHeight}px`, width: `${logoWidth}px` }}
      >
        {logoContent}
      </Link>
    );
  }

  return (
    <div
      className={containerClasses}
      style={{ height: `${logoHeight}px`, width: `${logoWidth}px` }}
    >
      {logoContent}
    </div>
  );
});

export default Logo;


