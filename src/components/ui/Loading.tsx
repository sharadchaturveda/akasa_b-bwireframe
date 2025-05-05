"use client";

import { memo } from "react";
import { cn } from "@/lib/utils";
import { COLORS } from "@/constants";
import { BaseComponentProps } from "@/types/common";

/**
 * Loading sizes
 */
export type LoadingSize = "small" | "medium" | "large";

/**
 * Props for the Loading component
 */
export interface LoadingProps extends BaseComponentProps {
  /**
   * The loading size
   * @default "medium"
   */
  size?: LoadingSize;

  /**
   * The loading text
   */
  text?: string;

  /**
   * The color of the spinner
   * @default COLORS.GOLD
   */
  color?: string;

  /**
   * Whether to center the loading indicator
   * @default true
   */
  centered?: boolean;

  /**
   * Whether to use full height
   * @default false
   */
  fullHeight?: boolean;
}

/**
 * Loading Component
 *
 * A reusable loading component with spinner and optional text.
 * This component provides consistent styling for loading states.
 *
 * @param {LoadingProps} props - The component props
 * @returns {JSX.Element} The rendered component
 *
 * @example
 * ```tsx
 * <Loading size="medium" text="Loading..." />
 * ```
 *
 * @example
 * ```tsx
 * <Loading size="large" text="Processing..." color="#ff0000" fullHeight />
 * ```
 */
const Loading = memo(function Loading({
  size = "medium",
  text,
  color = COLORS.GOLD,
  centered = true,
  fullHeight = false,
  className = "",
}: LoadingProps) {
  // Size classes
  const sizeClasses = {
    small: "w-4 h-4 border-2",
    medium: "w-8 h-8 border-3",
    large: "w-12 h-12 border-4",
  };

  // Text size classes
  const textSizeClasses = {
    small: "text-xs",
    medium: "text-sm",
    large: "text-base"
  };

  // Container classes
  const containerClasses = cn(
    "flex flex-col items-center",
    centered && "justify-center",
    fullHeight && "min-h-screen",
    className
  );

  return (
    <div className={containerClasses}>
      {/* Spinner */}
      <div
        className={cn(
          "rounded-full border-t-transparent animate-spin",
          sizeClasses[size]
        )}
        style={{ borderColor: `${color} transparent transparent transparent` }}
        role="status"
        aria-label="Loading"
      />

      {/* Text */}
      {text && (
        <p className={cn(
          "mt-4 font-montserrat text-white/80",
          textSizeClasses[size]
        )}>
          {text}
        </p>
      )}
    </div>
  );
});

export default Loading;
