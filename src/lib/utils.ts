import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names into a single string
 * Uses clsx for conditional classes and twMerge for Tailwind class merging
 *
 * @param {...ClassValue[]} inputs - Class names to combine
 * @returns {string} Combined class string
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}