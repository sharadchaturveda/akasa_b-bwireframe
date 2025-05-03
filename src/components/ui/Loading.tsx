"use client";

import { memo } from "react";
import { BaseComponentProps } from "@/types/common";

interface LoadingProps extends BaseComponentProps {
  /** Size of the loading spinner */
  size?: "small" | "medium" | "large";
  /** Text to display below the spinner */
  text?: string;
}

/**
 * Loading Component
 * 
 * A simple loading spinner component that can be used during loading states.
 * 
 * @param {LoadingProps} props - The component props
 * @returns {JSX.Element} The rendered component
 * 
 * @example
 * ```tsx
 * <Loading size="medium" text="Loading..." />
 * ```
 */
const Loading = memo(function Loading({
  size = "medium",
  text,
  className = "",
}: LoadingProps) {
  // Determine the size of the spinner
  const sizeClass = {
    small: "w-4 h-4 border-2",
    medium: "w-8 h-8 border-3",
    large: "w-12 h-12 border-4",
  }[size];

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div
        className={`${sizeClass} rounded-full border-t-transparent border-white animate-spin`}
        role="status"
        aria-label="Loading"
      />
      {text && (
        <p className="mt-2 text-sm text-white/80 font-montserrat">{text}</p>
      )}
    </div>
  );
});

export default Loading;
