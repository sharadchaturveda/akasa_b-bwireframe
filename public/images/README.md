# Image Organization

This document outlines the organization and naming conventions for images in the Akasa Restaurant website.

## Directory Structure

```
public/images/
├── brand/              # Brand assets like logos
├── home/               # Homepage-specific images
│   ├── hero/           # Hero section images
│   ├── philosophy/     # Brand philosophy section images
│   ├── gallery/        # Gallery section images
│   ├── whats-happening/ # What's happening section images
│   └── testimonials/   # Testimonials section images
├── menu/               # Menu page images
│   ├── hero/           # Menu page hero images
│   ├── chef/           # Chef section images
│   ├── a-la-carte/     # À La Carte menu images
│   │   ├── hero/       # À La Carte hero images
│   │   └── items/      # À La Carte menu item images
│   ├── bar-bites/      # Bar Bites menu images
│   │   ├── hero/       # Bar Bites hero images
│   │   └── items/      # Bar Bites menu item images
│   ├── drinks/         # Drinks menu images
│   │   ├── hero/       # Drinks hero images
│   │   └── items/      # Drinks menu item images
│   ├── set-lunch/      # Set Lunch menu images
│   │   ├── hero/       # Set Lunch hero images
│   │   └── items/      # Set Lunch menu item images
│   ├── soul-food-weekends/ # Soul Food Weekends menu images
│   │   ├── hero/       # Soul Food Weekends hero images
│   │   └── items/      # Soul Food Weekends menu item images
│   └── featured-dishes/ # Featured dishes images
├── events/             # Events page images
│   ├── hero/           # Events hero images
│   ├── categories/     # Event category images
│   └── listings/       # Event listing images
├── offers/             # Offers page images
│   ├── hero/           # Offers hero images
│   └── promotions/     # Promotion images
├── reservations/       # Reservations page images
│   ├── hero/           # Reservations hero images
│   └── gallery/        # Reservations gallery images
├── chef/               # Chef page images
│   ├── hero/           # Chef hero images
│   └── gallery/        # Chef gallery images
└── common/             # Common images used across multiple pages
```

## Naming Conventions

### Menu Item Images

For menu item images, follow this naming convention:

```
[item-name].jpg
```

Where:
- `[item-name]` is the name of the menu item with hyphens instead of spaces

Examples:
- `/images/menu/a-la-carte/items/butter-chicken.jpg`
- `/images/menu/soul-food-weekends/items/papadi-chaat.jpg`
- `/images/menu/drinks/items/signature-cocktail.jpg`
- `/images/menu/bar-bites/items/garlic-prawn-tempura.jpg`

### Hero Images

For hero images, follow this naming convention:

```
hero.jpg
```

Examples:
- `/images/home/hero/hero-home.jpg`
- `/images/menu/a-la-carte/hero/hero.jpg`
- `/images/events/hero/hero.jpg`
- `/images/offers/hero/hero.jpg`
- `/images/reservations/hero/hero.jpg`

### Gallery Images

For gallery images, follow this naming convention:

```
gallery-[number].jpg
```

Examples:
- `/images/menu/hero/gallery-1.jpg`
- `/images/events/listings/event-1.jpg`
- `/images/home/gallery/gallery-1.jpg`

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

## Featured Dishes

For featured dishes, follow this naming convention:

```
[dish-name].jpg
```

Examples:
- `/images/menu/featured-dishes/akasa-e-dum-biryani.jpg`
- `/images/menu/featured-dishes/tandoori-prawns.jpg`

## Event Images

For event images, follow this naming convention:

```
event-[number].jpg
```

Examples:
- `/images/events/listings/event-1.jpg`
- `/images/events/listings/event-2.jpg`

## Offer Images

For offer images, follow this naming convention:

```
[offer-name].jpg
```

Examples:
- `/images/offers/promotions/weekday-lunch.jpg`
- `/images/offers/promotions/anniversary.jpg`

## Testimonial Images

For testimonial images, follow this naming convention:

```
avatar-[number].jpg
```

Examples:
- `/images/home/testimonials/avatar-1.jpg`
- `/images/home/testimonials/avatar-2.jpg`

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
  src="/images/menu/a-la-carte/items/butter-chicken.jpg"
  alt="Butter Chicken"
  width={800}
  height={600}
  quality={80}
  loading="lazy"
/>
```

## Background Images in CSS

When using background images in CSS, use the following format:

```css
.element {
  background-image: url('/images/home/hero/hero-home.jpg');
}
```

## Responsive Images

For responsive images, use the `sizes` attribute to specify different image sizes for different screen sizes:

```jsx
<Image
  src="/images/menu/a-la-carte/hero/hero.jpg"
  alt="À La Carte Menu"
  fill
  sizes="(max-width: 768px) 100vw, 50vw"
  className="object-cover"
  quality={80}
/>
```

## Image Preloading

For critical images that should be loaded as soon as possible, use the `priority` attribute:

```jsx
<Image
  src="/images/home/hero/hero-home.jpg"
  alt="Hero background"
  fill
  priority
  sizes="100vw"
  quality={70}
  className="object-cover"
/>
```

## Lazy Loading

For images that are below the fold, use the `loading="lazy"` attribute:

```jsx
<Image
  src="/images/menu/featured-dishes/akasa-e-dum-biryani.jpg"
  alt="Akasa-E-Dum Biryani"
  fill
  sizes="(max-width: 768px) 100vw, 33vw"
  className="object-cover"
  loading="lazy"
  quality={75}
/>
```
