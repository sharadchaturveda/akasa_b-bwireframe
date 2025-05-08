# Hero Carousel Images

This directory contains the images used for the homepage hero carousel on desktop view.

## Image Requirements

- Place 4 high-quality images in this directory with the following names:
  - `hero1.jpg`
  - `hero2.jpg`
  - `hero3.jpg`
  - `hero4.jpg`
- Recommended image dimensions: 1920x1080px (16:9 ratio)
- Optimal file size: 200-500KB per image (compressed for web)
- Format: JPG or WEBP for better performance

## Image Optimization

For best performance, consider optimizing your images before adding them:
1. Resize to appropriate dimensions (1920x1080px)
2. Compress using a tool like TinyPNG, ImageOptim, or Squoosh
3. Consider using WEBP format for better compression with high quality

## Carousel Behavior

- The carousel automatically transitions between images every 1.5 seconds
- The transition uses a smooth fade effect
- The carousel only runs on desktop view (screens wider than 768px)
- On mobile devices, a static hero image is shown instead

## Customization

If you need to modify the carousel timing or add more images:
1. Open `src/components/home/CarouselHeroSection.tsx`
2. Update the `HERO_IMAGES` array to add/remove images
3. Adjust the interval timing (currently 1500ms) in the useEffect hook
