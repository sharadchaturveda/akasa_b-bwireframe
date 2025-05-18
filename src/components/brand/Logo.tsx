"use client";

import { memo } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import HydrationSafeImage from '@/components/ui/HydrationSafeImage';

export type LogoSize = 'small' | 'medium' | 'large' | 'custom';

export interface LogoProps {
  size?: LogoSize;
  width?: number;
  height?: number;
  withLink?: boolean;
  priority?: boolean;
  opacity?: number;
  scale?: number;
  className?: string;
  imageClassName?: string;
}

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

  const logoContent = (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 flex items-center">
        <HydrationSafeImage
          src="/images/brand/logo-white.png"
          alt="Logo"
          fill
          priority={priority}
          sizes={`${logoWidth}px`}
          quality={85}
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

  const containerClasses = cn("relative", className);

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


