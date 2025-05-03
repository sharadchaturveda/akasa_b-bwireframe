# Image Organization

This document outlines the organization and naming conventions for images in the Akasa Restaurant website.

## Directory Structure

```
public/images/
├── common/           # Common images like logos, backgrounds
├── home/             # Homepage-specific images
├── menu/             # Menu-related images
│   ├── a-la-carte/   # À La Carte menu images
│   │   └── items/    # À La Carte menu item images
│   ├── bar-bites/    # Bar Bites menu images
│   │   └── items/    # Bar Bites menu item images
│   ├── drinks/       # Drinks menu images
│   │   └── items/    # Drinks menu item images
│   ├── featured-dishes/ # Featured dishes images
│   ├── set-lunch/    # Set Lunch menu images
│   │   └── items/    # Set Lunch menu item images
│   └── soul-food-weekends/ # Soul Food Weekends menu images
│       └── items/    # Soul Food Weekends menu item images
├── events/           # Events-related images
├── offers/           # Offers-related images
├── reservations/     # Reservations-related images
├── testimonials/     # Testimonial avatars and backgrounds
└── unused/           # Images that appear to be unused
```

## Naming Conventions

### Menu Item Images

For menu item images, follow this naming convention:

```
menu-[menu-type]-[item-name].jpg
```

Where:
- `[menu-type]` is the type of menu (a-la-carte, soul-food, drinks, bar-bites, set-lunch)
- `[item-name]` is the name of the menu item with hyphens instead of spaces

Examples:
- `menu-a-la-carte-butter-chicken.jpg`
- `menu-soul-food-papadi-chaat.jpg`
- `menu-drinks-signature-cocktail.jpg`
- `menu-bar-bites-garlic-prawn-tempura.jpg`

### Hero Images

For hero images, follow this naming convention:

```
hero-[page-name].jpg
```

Examples:
- `hero-home.jpg`
- `hero-menu.jpg`
- `hero-events.jpg`
- `hero-offers.jpg`
- `hero-reservations.jpg`

### Gallery Images

For gallery images, follow this naming convention:

```
gallery-[section]-[number].jpg
```

Examples:
- `gallery-menu-1.jpg`
- `gallery-events-2.jpg`
- `gallery-home-3.jpg`

## Image Specifications

### Menu Item Images

- **Dimensions**: 800x600 pixels (4:3 ratio) or 600x600 pixels (1:1 ratio)
- **Format**: JPG for photographs, PNG for images with transparency
- **Quality**: 80% for JPG to balance quality and file size
- **File size**: Keep under 200KB per image for optimal performance

### Hero Images

- **Dimensions**: 1920x1080 pixels (16:9 ratio) for full-width hero images
- **Format**: JPG for photographs
- **Quality**: 80% for JPG to balance quality and file size
- **File size**: Keep under 500KB per image for optimal performance

### Gallery Images

- **Dimensions**: 800x800 pixels (1:1 ratio) for gallery images
- **Format**: JPG for photographs
- **Quality**: 80% for JPG to balance quality and file size
- **File size**: Keep under 300KB per image for optimal performance

## Unused Images

The `unused/` directory contains images that appear to be duplicates or are not referenced in the codebase. These images are kept for reference but should not be used in new code.

## Adding New Images

1. Place the image in the appropriate directory based on its purpose
2. Follow the naming conventions outlined above
3. Optimize the image for web use (compress, resize)
4. Update the code to reference the new image

## Image Optimization

All images should be optimized for web use:

1. Resize images to the appropriate dimensions
2. Compress images to reduce file size
3. Use the appropriate format (JPG for photographs, PNG for images with transparency)
4. Use the Next.js Image component for automatic optimization

```jsx
import Image from "next/image";

<Image
  src="/images/menu/items/menu-a-la-carte-butter-chicken.jpg"
  alt="Butter Chicken"
  width={800}
  height={600}
  quality={80}
  loading="lazy"
/>
```
