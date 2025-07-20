# Loyalty Program Components

This directory contains the components for the Akasa Loyalty Program page. Each component is designed to be modular, reusable, and follows the established design patterns of the project.

## Components

### 1. `LoyaltyHero.tsx`
- **Purpose**: Hero section for the loyalty program page
- **Features**: 
  - Full-screen hero with background image (no parallax)
  - Elegant typography with gradient text effects
  - Decorative elements and blur effects
  - Responsive design
- **Props**: None
- **Usage**: `<LoyaltyHero />`

### 2. `LoyaltyQRCode.tsx`
- **Purpose**: QR code section with program benefits preview
- **Features**:
  - Animated background pattern
  - QR code placeholder with decorative frame
  - Benefits preview with numbered list
  - Responsive layout (stacked on mobile, side-by-side on desktop)
- **Props**: None
- **Usage**: `<LoyaltyQRCode />`

### 3. `LoyaltyTermsConditions.tsx`
- **Purpose**: Terms and conditions section with one term per line
- **Features**:
  - Vertical list layout (one term per line)
  - Hover effects and interactive elements
  - Numbered badges for easy reference
  - Important notice section with app update reminder
- **Props**: None
- **Usage**: `<LoyaltyTermsConditions />`

### 4. `LoyaltyNewsletter.tsx`
- **Purpose**: Newsletter subscription section
- **Features**:
  - Background image with overlay
  - Email subscription form
  - Responsive design
  - Privacy notice
- **Props**: None
- **Usage**: `<LoyaltyNewsletter />`

## Design System

All components follow the established design system:

- **Colors**: Uses project color constants (GOLD: #E6C78B, DEEP_BLUE: #1A2A3A)
- **Typography**: Playfair Display for headings, Montserrat for body text
- **Animations**: Subtle hover effects and transitions
- **Layout**: Container-based responsive design
- **Backgrounds**: Animated SVG patterns and gradient overlays

## Performance Optimizations

- **Memoized Components**: All components use React.memo for performance
- **Image Loading**: Optimized image loading with Next.js Image component
- **CSS Animations**: Hardware-accelerated animations using transform properties

## Responsive Behavior

- **Mobile (< 768px)**: Single column layout, stacked sections
- **Tablet (768px - 1024px)**: Side-by-side QR section, single column terms
- **Desktop (> 1024px)**: Full layout optimization

## Integration

These components are used in the main loyalty program page (`src/app/loyalty-program/page.tsx`) and can be easily imported and used in other parts of the application if needed.

## Future Enhancements

Potential improvements for the loyalty components:

1. **Real QR Code Integration**: Replace placeholder with actual QR code generation
2. **Dynamic Content**: Connect to CMS for terms & conditions management
3. **Interactive Elements**: Add animations and micro-interactions
4. **Analytics**: Track QR code scans and page engagement
5. **Accessibility**: Improve keyboard navigation and screen reader support 