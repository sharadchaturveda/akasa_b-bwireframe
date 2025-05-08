"use client";

import { memo, ReactNode } from 'react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LOGO } from "@/constants";
import { cn } from '@/lib/utils';

export interface BaseHeroProps {
  /**
   * The background content (image or video)
   */
  backgroundContent: ReactNode;

  /**
   * Whether to show the hero content (text, buttons, etc.)
   */
  showContent?: boolean;

  /**
   * Whether to show the logo
   */
  showLogo?: boolean;

  /**
   * Additional CSS classes for the container
   */
  className?: string;

  /**
   * Additional CSS classes for the content container
   */
  contentClassName?: string;

  /**
   * Additional CSS classes for the logo container
   */
  logoClassName?: string;

  /**
   * Additional CSS classes for the text container
   */
  textClassName?: string;

  /**
   * Additional CSS classes for the buttons container
   */
  buttonsClassName?: string;

  /**
   * Custom content to render
   */
  customContent?: ReactNode;
}

/**
 * BaseHero Component
 *
 * A base component for hero sections that can be extended for different hero types.
 *
 * @param {BaseHeroProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
const BaseHero = memo(function BaseHero({
  backgroundContent,
  showContent = true,
  showLogo = true,
  className,
  contentClassName,
  logoClassName,
  textClassName,
  buttonsClassName,
  customContent
}: BaseHeroProps) {
  return (
    <section className={cn(
      "relative w-full h-screen overflow-hidden",
      className
    )}>
      {/* Background content (image or video) */}
      {backgroundContent}

      {/* Gradient overlay at the bottom */}
      <div className="absolute left-0 right-0 bottom-0 h-[120px] bg-gradient-to-t from-black via-black/90 to-transparent z-[2]"></div>

      {/* Content container */}
      {showContent && (
        <div className={cn(
          "absolute inset-0 flex flex-col items-center justify-center z-[3] px-4",
          contentClassName
        )}>
          {/* Logo */}
          {showLogo && (
            <div className={cn(
              "mb-8 sm:mb-12",
              logoClassName
            )}>
              <img
                src="/images/brand/logo-white.png"
                alt="Akasa Logo"
                className="w-48 sm:w-64 md:w-72 opacity-90"
              />
            </div>
          )}

          {/* Custom content or default content */}
          {customContent || (
            <>
              {/* Text content */}
              <div className={cn(
                "text-center mb-8 sm:mb-10",
                textClassName
              )}>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-playfair text-white mb-4 sm:mb-6">
                  Modern Indian Cuisine
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl font-montserrat text-white/80 max-w-2xl mx-auto">
                  A culinary journey through the diverse flavors of India
                </p>
              </div>

              {/* Buttons */}
              <div className={cn(
                "flex flex-col sm:flex-row gap-4",
                buttonsClassName
              )}>
                <Link href="/menu">
                  <Button className="bg-[#1A2A3A] text-white hover:bg-[#0A1A2A] px-6 py-3 text-center shadow-lg">
                    Explore Our Menu
                  </Button>
                </Link>
                <Link href="/reservations">
                  <Button className="bg-[#1A2A3A] text-white hover:bg-[#0A1A2A] px-6 py-3 text-center shadow-lg">
                    Reserve Table
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </section>
  );
});

export default BaseHero;
