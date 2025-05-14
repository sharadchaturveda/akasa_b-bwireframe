/**
 * Icon Component
 *
 * A reusable component for rendering SVG icons with consistent styling.
 * This component centralizes icon rendering across the application.
 */
import { memo } from 'react';
import { cn } from '@/lib/utils';

export type IconName = 'clock' | 'location' | 'phone' | 'email' | 'menu' | 'close' | 'map-pin' | 'calendar';

export interface IconProps {
  /**
   * The name of the icon to render
   */
  name: IconName;

  /**
   * The size of the icon in pixels
   * @default 24
   */
  size?: number;

  /**
   * The color of the icon
   * @default "currentColor"
   */
  color?: string;

  /**
   * The stroke width of the icon
   * @default 1.5
   */
  strokeWidth?: number;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Icon Component
 *
 * Renders an SVG icon based on the provided name.
 *
 * @param {IconProps} props - The component props
 * @returns {JSX.Element} The rendered icon
 */
const Icon = memo(function Icon({
  name,
  size = 24,
  color = "currentColor",
  strokeWidth = 1.5,
  className
}: IconProps) {
  const iconProps = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: cn(className),
    stroke: color,
    strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const
  };

  switch (name) {
    case 'clock':
      return (
        <svg {...iconProps}>
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
          <path d="M12 6V12L16 14" />
        </svg>
      );
    case 'location':
      return (
        <svg {...iconProps}>
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      );
    case 'phone':
      return (
        <svg {...iconProps}>
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
        </svg>
      );
    case 'email':
      return (
        <svg {...iconProps}>
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      );
    case 'menu':
      return (
        <svg {...iconProps}>
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      );
    case 'close':
      return (
        <svg {...iconProps}>
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      );
    case 'map-pin':
      return (
        <svg {...iconProps}>
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      );
    case 'calendar':
      return (
        <svg {...iconProps}>
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      );
    default:
      return null;
  }
});

export default Icon;
