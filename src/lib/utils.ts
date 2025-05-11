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

/**
 * Formats a price as a string with currency symbol
 *
 * @param {number} price - The price to format
 * @param {string} currency - The currency symbol
 * @returns {string} Formatted price string
 */
export function formatPrice(price: number, currency: string = '$'): string {
  return `${currency}${price.toFixed(2)}`;
}

/**
 * Truncates a string to a specified length and adds an ellipsis
 *
 * @param {string} str - The string to truncate
 * @param {number} length - Maximum length before truncation
 * @returns {string} Truncated string
 */
export function truncateString(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

/**
 * Generates a unique ID
 *
 * @returns {string} Unique ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

/**
 * Checks if the code is running in a browser environment
 *
 * @returns {boolean} True if running in a browser
 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Safely parses JSON with error handling
 *
 * @param {string} json - JSON string to parse
 * @param {T} fallback - Fallback value if parsing fails
 * @returns {T} Parsed object or fallback
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch (error) {
    return fallback;
  }
}