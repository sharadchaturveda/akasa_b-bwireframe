# Loyalty Program Page (`src/app/loyalty-program/page.tsx`)

This document provides a comprehensive overview of the Loyalty Program Page, detailing its features, layout, and the structure of its components.

## Overview

The Loyalty Program Page is a client-side rendered page designed to showcase Akasa Restaurant's exclusive loyalty program. It features a visually engaging design with hero section, QR code integration, comprehensive terms & conditions, and newsletter subscription. The page follows the same premium aesthetic and responsive design patterns as other pages in the project.

## Features

- **Hero Section**: Full-screen hero with parallax background and elegant typography
- **QR Code Integration**: Prominent QR code display for easy program enrollment
- **Program Benefits Preview**: Visual overview of loyalty tiers and benefits
- **Comprehensive Terms & Conditions**: All 15 terms displayed in an organized grid layout
- **Newsletter Subscription**: Email signup for loyalty program updates
- **Responsive Design**: Optimized for all screen sizes from mobile to desktop
- **Performance Optimized**: Image loading optimizations and memoized components
- **SEO Optimized**: Proper metadata and structured content

## Layout and Structure

The page is structured into four main sections, each implemented as a separate memoized component:

### 1. `HeroSection` (Local Component)
- **Purpose**: The main introductory section for the loyalty program
- **Features**: 
  - Full-screen hero with parallax background image
  - Elegant typography with gradient text effects
  - Decorative elements and blur effects
  - Responsive design with mobile optimization
- **Integration**: First content section after global navigation

### 2. `QRCodeSection` (Local Component)
- **Purpose**: Displays the QR code for program enrollment and previews key benefits
- **Features**:
  - Animated background pattern
  - QR code placeholder with decorative frame
  - Benefits preview with numbered list
  - Responsive layout (stacked on mobile, side-by-side on desktop)
- **Integration**: Follows the hero section

### 3. `TermsConditionsSection` (Local Component)
- **Purpose**: Displays all 15 terms and conditions in an organized format
- **Features**:
  - Grid layout (1 column on mobile, 2 on tablet, 3 on desktop)
  - Hover effects and interactive elements
  - Numbered badges for easy reference
  - Important notice section with app update reminder
- **Integration**: Follows the QR code section

### 4. `NewsletterSection` (Local Component)
- **Purpose**: Encourages users to subscribe for loyalty program updates
- **Features**:
  - Background image with overlay
  - Email subscription form
  - Responsive design
  - Privacy notice
- **Integration**: Follows the terms & conditions section

## Data Structure

The page uses static data for the terms and conditions:

```typescript
const termsAndConditions = [
  {
    number: "1-5",
    tier: "Sky Tier",
    description: "Enjoy 5% off on your 2nd to 5th visits."
  },
  // ... 15 total terms
];
```

## Styling and Design

The page follows the established design system:

- **Colors**: Uses the project's color constants (GOLD: #E6C78B, DEEP_BLUE: #1A2A3A)
- **Typography**: Playfair Display for headings, Montserrat for body text
- **Animations**: Subtle hover effects and transitions
- **Layout**: Container-based responsive design
- **Backgrounds**: Animated SVG patterns and gradient overlays

## Performance Optimizations

- **Memoized Components**: All major sections use React.memo for performance
- **Image Loading**: Optimized image loading with 'loaded' class addition
- **Lazy Loading**: Images use Next.js Image component with proper sizing
- **CSS Animations**: Hardware-accelerated animations using transform properties

## SEO Features

- **Metadata**: Comprehensive meta tags for search engines
- **Open Graph**: Social media sharing optimization
- **Twitter Cards**: Twitter-specific meta tags
- **Canonical URL**: Proper canonical URL specification
- **Structured Content**: Semantic HTML structure

## Responsive Behavior

- **Mobile (< 768px)**: Single column layout, stacked sections
- **Tablet (768px - 1024px)**: Two-column grid for terms, side-by-side QR section
- **Desktop (> 1024px)**: Three-column grid for terms, full layout optimization

## Integration Points

- **Navigation**: Uses global Navigation component
- **Footer**: Uses global Footer component
- **Constants**: Imports color constants from the project
- **Images**: Uses existing loyalty program images from the public directory

## Future Enhancements

Potential improvements for the loyalty program page:

1. **Real QR Code Integration**: Replace placeholder with actual QR code generation
2. **Dynamic Content**: Connect to CMS for terms & conditions management
3. **User Authentication**: Add member login/registration functionality
4. **Points Display**: Show current member points and tier status
5. **Interactive Elements**: Add animations and micro-interactions
6. **Analytics**: Track QR code scans and page engagement 